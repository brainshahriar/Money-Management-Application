<?php

namespace App\Http\Resources\Category;

use App\Models\Category\Category;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
        /**
     *
     * @param string|null $classification
     * @return array
     */
    public function getCategoryType(string $category_type=null):array
    {
        $output = [];
        if($category_type == 1){
            $output['id'] = 1;
            $output['name'] = 'Expense';
        }
        else{
            $output['id'] = 2;
            $output['name'] = 'Income';
        }
        return $output;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'category_type' => $this->getCategoryType($this->category_type),
            'category_name' => $this->category_name,
            'icon' => $this->icon,
            'color' => $this->color,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
