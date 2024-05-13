<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    use HasFactory, HasUlids;
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Get the book that owns the book_issue
     */
    protected $casts = [
        'created_at' => 'datetime:d-m-Y',
        'updated_at' => 'datetime:d-m-Y',
    ];

    public function book(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
