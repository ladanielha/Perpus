<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Publisher extends Model
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

    public function book(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function scopeSearchPublisher (Builder $query , $name)  {
        return $query->where('name', 'like', '%' .$name. '%');
    }
}
