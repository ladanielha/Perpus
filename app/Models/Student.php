<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory, HasUlids;

     /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'class',
    ];

    /**
    * Get the book that owns the book_issue
    */
    protected $casts = [
        'created_at' => 'datetime:d-m-Y',
        'updated_at' => 'datetime:d-m-Y',
    ];
}
