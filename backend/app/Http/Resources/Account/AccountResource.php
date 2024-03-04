<?php

namespace App\Http\Resources\Account;

use App\Models\Account\Account;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource    
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $account = Account::find($this->id);
        return [
            'id' => $this->id,
            'account_name' => $this->account_name,
            'account_icon' => $this->account_icon,
            'currency' => $this->currency,
            'amount' => $this->amount,
            'total_balance' => $this->total_balance,
            'color' => $this->color,
            'is_included' => $account->is_included,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
