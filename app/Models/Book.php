<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Book extends Model
{
    use HasFactory, HasUlids;

     /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'author',
        'category_id',
        'location_id',
        'publisher_id',
        'status',
    ];

    /**
     * Get the book's category 
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    /**
     * Get the book's publisher 
     */
    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }
    /**
     * Get the book's location
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    /**
    * Get the book that owns the book_issue
    */
    protected $casts = [
        'created_at' => 'datetime:d-m-Y',
        'updated_at' => 'datetime:d-m-Y',
    ];
}
