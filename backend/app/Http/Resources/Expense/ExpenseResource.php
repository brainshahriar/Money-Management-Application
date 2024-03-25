<?php

namespace App\Http\Resources\Expense;

use App\Http\Resources\Account\AccountResource;
use App\Http\Resources\Category\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $rtrData = [
            'id' => $this->id,
            'amount' => $this->amount,
            'account' => new AccountResource($this->account),
            'category' => new CategoryResource($this->category),
            'comments' => $this->comments,
            'expense_date' => $this->expense_date,
            'photo' => $this->media,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        return $rtrData;
    }
}
