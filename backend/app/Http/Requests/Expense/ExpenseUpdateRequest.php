<?php

namespace App\Http\Requests\Expense;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'amount' => [
                'numeric'
            ],
            'account_id' => [
                'numeric', 'exists:accounts,id'
            ],
            'category_id' => [
                'exists:categories,id'
            ],
            'comments' => [
                'string', 'nullable'
            ],
            'expense_date' => [
                'string','nullable'
            ],
            'photo.*' => [
                'nullable', 'image', 'mimes:jpg,jpeg,png'
            ],
            'photo_ids.*' => [
                'nullable'
            ]
        ];
    }
}
