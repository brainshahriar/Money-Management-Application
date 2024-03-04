<?php

namespace App\Models\Account;

use App\Models\Expense\Expense;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_name',
        'account_icon',
        'total_balance',
        'color',
        'currency',
        'amount',
        'is_included'
    ];

    /**
     * Each account can have multiple expenses
     * 
     * @return HasMany
     */

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
