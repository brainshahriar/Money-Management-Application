<?php

namespace App\Models\Media;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_path'
    ];

    /**
     * As Media can be both expense and income
     *
     * @return MorphTo
     */
    public function mediable(): MorphTo
    {
        return $this->morpTo();
    }
}
