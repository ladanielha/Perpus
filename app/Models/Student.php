<?php

namespace App\Models;
//serchable 
//trait 

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function scopeSearchStudent (Builder $query , string $name)  {
        //query student seperti nama 
        return $query->where('name', 'like', '%' .$name. '%');
        
    }

    //relasi 
    public function borrow() : HasMany {
        return $this->hasMany(Borrow::class);
    }
}
