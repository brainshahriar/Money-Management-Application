<?php

namespace App\Http\Controllers\Api\Expense;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\ExpenseRequest;
use App\Http\Resources\Expense\ExpenseResource;
use App\Models\Account\Account;
use App\Models\Expense\Expense;
use App\Traits\Common\RespondsWithHttpStatus;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ExpenseController extends Controller
{
    use RespondsWithHttpStatus;
    /**
     * list of categories.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $expense =  Expense::all();
        return $this->success(__('Expense Lists'), ExpenseResource::collection($expense));
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
        $account = Account::findOrFail($data['account_id']);

        $total_balance = $account->amount + $data['amount'];

        $account->amount = $total_balance;

        $account->save();
        
        $expenses = Expense::create($data);
        $expenses = $expenses->fresh();
        return $this->success(__('Expense added Successfully'), new ExpenseResource($expenses), Response::HTTP_CREATED);
    }

    // /**
    //  * 
    //  * get category details
    //  * 
    //  * @param Account $account
    //  * @return JsonResponse
    //  */
    // public function show(Category $category): JsonResponse
    // {
    //     return $this->success('Category Details', new CategoryResource($category), Response::HTTP_OK);
    // }

    // /**
    //  * 
    //  * update accounts details
    //  * 
    //  * @param Category $category
    //  * @param CategoryUpdateRequest $request
    //  * @return JsonResponse
    //  */
    // public function update(CategoryUpdateRequest $request, Category $category)
    // {
    //     $data = $request->only([
    //         'category_name',
    //         'icon',
    //         'color',
    //     ]);
    //     $category->update($data);
    //     $category = $category->fresh();
    //     return $this->success(__('Category Updated Successfully'), new CategoryResource($category), Response::HTTP_OK);
    // }

    // /**
    //  * 
    //  * delete category details
    //  * 
    //  * @param Category $category
    //  * @return JsonResponse
    //  */
    // public function destroy(Category $category): JsonResponse
    // {
    //     $result = $category->delete();
    //     if ($result) {
    //         return $this->success(__('Category Deleted Successfully'));
    //     }
    //     return $this->failure(__('Category Deleted Failurefully'));
    // }
}
