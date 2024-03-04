<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'category_name' => [
                'required',
                'unique:categories,category_name',
                'string'
            ],
            'color' => [
                'required',
                'string'
            ],
            'icon' => [
                'required',
                'string'
            ],
            'category_type' => [
                'required',
                'integer',
                'between:1,2'
            ]
        ];
    }
}
