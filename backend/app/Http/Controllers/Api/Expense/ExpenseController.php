<?php

namespace App\Http\Controllers\Api\Expense;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\ExpenseFilterRequest;
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
use Carbon\Carbon;

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
            'expense_date',
            'photo'
        ]);

        $expenses = Expense::create($data);

        // Store media for the expense if 'photo' files are provided
        if ($request->hasFile('photo')) {
            foreach ($request->file('photo') as  $file) {
                $uniqueName = date('YmdHis') . uniqid();
                $uniqueNameWithExtension = $uniqueName . '.' . $file->extension();
                // $media = new Media();
                $path = $file->storeAs('photos', $uniqueNameWithExtension, 'public');
                // $media->save();
                $expenses->media()->create(['file_path' => $path]);
            }
        }

        $account = Account::findOrFail($data['account_id']);
        $total_balance = $account->amount - $data['amount'];
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
            'expense_date',
            'photo_ids'
        ]);

        //handle phot delete
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
                $uniqueName = date('YmdHis') . uniqid();
                $uniqueNameWithExtension = $uniqueName . '.' . $file->extension();
                $path = $file->storeAs('photos', $uniqueNameWithExtension, 'public');
                $expense->media()->create(['file_path' => $path]);
            }
        }

        // if change account from existing expense 

        if ($request->has('account_id') && $expense->account->id !== (int)$data['account_id']) {
            $oldAccount = $expense->account;
            $newAccount = Account::findOrFail($data['account_id']);

            // Deduct expense amount from old account and add to new account
            $oldAccount->amount += $expense->amount;
            $oldAccount->save();

            $newAccount->amount -= $expense->amount;
            $newAccount->save();
        }
        $account = Account::findOrFail($expense->account->id);

        // update account balance if expense balance is edited
        if ($request->has('amount')) {
            if ($expense->amount > (int)$data['amount']) {
                $deductedAmount = $expense->amount - (int)$data['amount'];
                $account->amount = $account->amount + $deductedAmount;
                $account->save();
            }
            if ($expense->amount < (int)$data['amount']) {
                $addedAmount = (int)$data['amount'] - $expense->amount;
                $account->amount = $account->amount - $addedAmount;
                $account->save();
            }
        }
        $expense->update($data);
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
        $currentAccountBalance = $expense->account->amount + $expense->amount;
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
        foreach ($filePaths as $path) {
            // Adjust the file path to match the storage directory
            $storagePath = 'public/' . $path;
            // dd($storagePath);

            if ($disk == 'public') {
                Storage::delete($storagePath);
            }
        }
    }

    /**
     * Display a listing of the expenses basen on search dates.
     *
     * @param ExpenseFilterRequest $request
     * @return mixed
     */

    public function searchByDate(ExpenseFilterRequest $request): mixed
    {
        $date = Carbon::parse($request->input('date'));
        $expenses = Expense::whereDate('expense_date', $date)->get();
        return [
            'accounts' => Account::all(),
            'categories' => Category::all(),
            'expense' => ExpenseResource::collection($expenses)
        ];
    }
}
