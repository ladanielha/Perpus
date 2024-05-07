<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory, HasUlids;

    protected $table = "settings";
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'return_days',
    ];
}
