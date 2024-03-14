<?php

namespace App\Http\Controllers\Api\Expense;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\ExpenseRequest;
use App\Http\Requests\Expense\ExpenseUpdateRequest;
use App\Http\Resources\Expense\ExpenseResource;
use App\Models\Account\Account;
use App\Models\Category\Category;
use App\Models\Expense\Expense;
use App\Models\Media\Media;
use App\Traits\Common\RespondsWithHttpStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ExpenseController extends Controller
{
    use RespondsWithHttpStatus;
    /**
     * list of categories.
     *
     * @return mixed
     */
    public function index(): mixed
    {
        $expense =  Expense::all();
        return [
            'accounts' => Account::all(),
            'categories' => Category::all(),
            'expense' => ExpenseResource::collection($expense)
        ];
    }

    /**
     * store newly created resource in database
     * 
     * @param ExpenseRequest $request
     * @return JsonResponse
     */
    public function store(ExpenseRequest $request): JsonResponse
    {
        $data = $request->only([
            'amount',
            'account_id',
            'category_id',
            'comments',
            'photo'
        ]);

        $expenses = Expense::create($data);

        // Store media for the expense if 'photo' files are provided
        if ($request->hasFile('photo')) {
            foreach ($request->file('photo') as  $file) {
                $uniqueName = date('YmdHis') . uniqid();
                $uniqueNameWithExtension = $uniqueName . '.' . $file->extension();
                // $media = new Media();
                $path = $file->storeAs('photos', $uniqueNameWithExtension, 'local');
                // $media->save();
                $expenses->media()->create(['file_path' => $path]);
            }
        }

        $account = Account::findOrFail($data['account_id']);
        $total_balance = $account->amount + $data['amount'];
        $account->amount = $total_balance;
        $account->save();

        $expenses = $expenses->fresh();

        return $this->success(__('Expense added Successfully'), new ExpenseResource($expenses), Response::HTTP_CREATED);
    }

    /**
     * 
     * get expense details
     * 
     * @param Expense $account
     * @return JsonResponse
     */
    public function show(Expense $expense): JsonResponse
    {
        return $this->success('Expense Details', new ExpenseResource($expense), Response::HTTP_OK);
    }

    /**
     * 
     * update accounts details
     * 
     * @param Expense $expense
     * @param ExpenseUpdateRequest $request
     * @return JsonResponse
     */
    public function update(ExpenseUpdateRequest $request, Expense $expense)
    {
        $data = $request->only([
            'amount',
            'category_id',
            'account_id',
            'comments',
            'photo_ids'
        ]);
        if ($request->has('photo_ids')) {
            foreach ($data['photo_ids'] as $ids) {
                $photos = Media::findOrFail($ids);
                $photos->delete();
                $this->unlinkFiles([$photos->file_path]);
            }
        }
        // update media for the expense if 'photo' files are provided
        if ($request->hasFile('photo')) {
            foreach ($request->file('photo') as $file) {
                $paths[] = $file->getPathname();
                $uniqueName = date('YmdHis') . uniqid();
                $uniqueNameWithExtension = $uniqueName . '.' . $file->extension();
                $path = $file->storeAs('photos', $uniqueNameWithExtension, 'public');

                $expense->media()->create(['file_path' => $path]);
            }
        }
        if ($request->has('account_id') && (int)$expense->account->id !== (int)$request->input('account_id')) {
            $prevAmount = $expense->amount;
            $prevAccountBalance = $expense->account->amount;

            $prevAccount = Account::findOrFail($expense->account->id);

            $updatedBalance  = $prevAccountBalance - $prevAmount;
            $prevAccount->amount = $updatedBalance;
            $prevAccount->save();
        }
        $expense->update($data);
        $expense = $expense->fresh();

        $account = Account::findOrFail($expense->account->id);


        if ($request->has('amount')) {
            $total_balance = $account->amount + $data['amount'];
            $account->amount = $total_balance;
            $account->save();
        }
        $expense = $expense->fresh();
        return $this->success(__('Expense Updated Successfully'), new ExpenseResource($expense), Response::HTTP_OK);
    }

    /**
     * 
     * delete expense details
     * 
     * @param Expense $expense
     * @return JsonResponse
     */
    public function destroy(Expense $expense): JsonResponse
    {
        // Get the file paths of associated media items
        $filePaths = $expense->media->pluck('file_path')->toArray();

        // update total balance
        $currentAccountBalance = $expense->account->amount - $expense->amount;
        $expense->account->amount = $currentAccountBalance;
        $expense->account->save();

        // Delete the expense
        $result = $expense->delete();

        // If the expense was deleted successfully, unlink the associated files
        if ($result) {
            // Unlink the files
            $this->unlinkFiles($filePaths);

            // Return success response
            return $this->success(__('Expense Deleted Successfully'));
        }

        // If deletion failed, return failure response
        return $this->failure(__('Expense Deletion Failed'));
    }

    /**
     * Unlink files from storage
     * 
     * @param array $filePaths
     * @param string $disk
     * @return void
     */
    protected function unlinkFiles(array $filePaths = [], string $disk = 'public'): void
    {
        // dd($filePaths);
        foreach ($filePaths as $path) {
            // Adjust the file path to match the storage directory
            $storagePath = '/' . $path;

            if ($disk == 'public') {
                Storage::delete($storagePath);
            }
        }
    }
}
