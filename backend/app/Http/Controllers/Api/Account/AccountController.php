<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Traits\Common\RespondsWithHttpStatus;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Account\AccountRequest;
use App\Http\Requests\Account\AccountUpdateRequest;
use App\Http\Resources\Account\AccountResource;
use App\Models\Account\Account;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\Collection;

class AccountController extends Controller
{
  use RespondsWithHttpStatus;
  /**
   * store newly created resource in database
   * 
   * @param AccountRequest $request
   * @return JsonResponse
   */

  public function store(AccountRequest $request): JsonResponse
  {
    $data = $request->only([
      'account_name',
      'account_icon',
      'currency',
      'amount',
      'color',
      'is_included'
    ]);

    $currentTotalBalance = Account::where('is_included', false)->sum('amount');

    if (array_key_exists('is_included', $data)) {
      if ($data['is_included'] != true) {
        $newTotalBalance = $currentTotalBalance + $data['amount'];
        $data['total_balance'] = $newTotalBalance;
        $account = Account::create($data);
      } else {
        $newTotalBalance = $currentTotalBalance;
        $data['total_balance'] = $newTotalBalance;
        $account = Account::create($data);
      }
    } else {
      $newTotalBalance = $currentTotalBalance + $data['amount'];
      $data['total_balance'] = $newTotalBalance;
      $account = Account::create($data);
    }

    return $this->success(_('Account created successfully'), new AccountResource($account), Response::HTTP_CREATED);
  }

  /**
   * List of accounts
   *
   * @return mixed
   */

  public function getAll(): mixed
  {
    $totalBalance = Account::where('is_included', false)->sum('amount');
    $account =  Account::all();
    return [
      'total_balance' => $totalBalance,
      'accounts' => $account,
    ];
  }
  /**
   * 
   * get accounts details
   * 
   * @param Account $account
   * @return JsonResponse
   */

  public function accountDetails(Account $account)
  {
    return $this->success('Account Details', new AccountResource($account), Response::HTTP_OK);
  }

  /**
   * 
   * delete accounts details
   * 
   * @param Account $avccount
   * @return JsonResponse
   */

  public function accountDelete(Account $account): JsonResponse
  {
    $result = $account->delete();
    if ($result) {
      return $this->success(__('Account Deleted Successfully'));
    }
    return $this->failure(__('Account Deleted Fail'));
  }

  /**
   * 
   * update accounts details
   * 
   * @param Account $account
   * @param AccountUpdateRequest $request
   * @return JsonResponse
   */

  public function accountUpdate(AccountUpdateRequest $request, Account $account): JsonResponse
  {
    $data = $request->only([
      'account_name',
      'account_icon',
      'currency',
      'amount',
      'color',
      'is_included'
    ]);
    $account->update($data);
    return $this->success(__('Account Updated Successfully'),new AccountResource($account), Response::HTTP_OK);
  }
}
