<?php

namespace App\Models\Category;

use App\Models\Expense\Expense;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'category_name',
        'icon', 
        'color',
        'category_type'
    ];

    /**
     * Each category can have multiple expenses
     * 
     * @return HasMany
     */

     public function expenses():HasMany
     {
        return $this->hasMany(Expense::class);
     }
}
