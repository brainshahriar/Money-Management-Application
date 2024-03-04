<?php

namespace App\Models\Expense;

use App\Models\Account\Account;
use App\Models\Category\Category;
use App\Models\Media\Media;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'account_id',
        'category_id',
        'comments'
    ];

    /**
     * model observer
     * - Delete media according to the expense id
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::deleting(function ($expenses) {
            $expenses->media->delete();
        });
    }

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

    /**
     * Each expense has multiple media and media hold both expense and income media
     *
     * @return morphMany
     */
    public function media(): MorphMany
    {
        return $this->morphMany(Media::class,'mediable');
    }
}
