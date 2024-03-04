<?php

namespace App\Models\Expense;

use App\Models\Account\Account;
use App\Models\Category\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'amount',
        'account_id',
        'category_id',
        'comments',
        'photo',
    ];

    /**
     * Each expense belongs to only one category
     *
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Each expense belongs to only one account
     *
     * @return BelongsTo
     */
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
}
