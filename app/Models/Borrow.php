<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Borrow extends Model
{
    use HasFactory, HasUlids;

    protected $table = "borrows";
         /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'student_id',
        'book_id',
        'borrow_date',
        'return_date',
        'status',
        'return_day',
    ];

    /**
    * Get the student that owns the book_issue
    */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
    /**
    * Get the book that owns the book_issue
    */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
    * Get the book that owns the book_issue
    */
    protected $casts = [
        'borrow_date' => 'datetime:Y-m-d',
        'return_date' => 'datetime:Y-m-d',
        'return_day' => 'datetime:Y-m-d',
    ];
}
