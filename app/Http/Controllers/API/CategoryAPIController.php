<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryAPIController extends Controller
{
    public function getCategoryList(Request $request)
    {
        $categories = Category::searchCategory($request->q ?? "")->latest()->paginate(5);
        return response()->json($categories,200);
    }
}
