<?php

namespace App\Http\Requests\Expense;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseRequest extends FormRequest
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
            'amount' =>[
                'required',
                'integer'
            ],
            'account_id' => [
                'required','integer','exists:accounts,id'
            ],
            'category_id' => [
                'required','integer', 'exists:categories,id'
            ],
            'comments' => [
                'nullable', 'string'
            ],
            'expense_date' => [
                'required',
                'date_format:Y-m-d' 
            ],
            'photo.*' => [
                'nullable','image', 'mimes:jpg,jpeg,png'
            ]
        ];
    }
}