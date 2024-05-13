<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class GlobalScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('status', 'like', '%' . 'NOTRETURN' . '%');
    }
    public function searchName(Builder $builder, Model $model, string $params)
    {
        $builder->where('name', 'like', '%' . $params . '%');
    }

}
