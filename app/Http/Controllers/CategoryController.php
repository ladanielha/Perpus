<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the student.
     */
    public function index()
    {
        //get books
        $category = Category::when(request()->q, function ($category) {
            $category = $category->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);
        $category->appends(['q' => request()->q]);
        return Inertia::render('Category/CategoryList', [
            'categories' => $category,
        ]);
    }
    public function create()
    {
        return Inertia::render('Category/CategoryCreate', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate request books
            $request->validate([
                'name' => 'required|unique:categories,name',
            ]);
            // Create category
            $category = Category::create([
                'name' => $request->name,
            ]);
            // Redirect
            return redirect()->route('category.index');
        } catch (QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                return redirect()->back()->withInput()->withErrors(['name' => 'The category name already exists.']);
            } else {
                return redirect()->back()->withInput()->with('error', 'An error occurred while creating the category.');
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('Category/CategoryEdit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate request books
        $request->validate([
            'name' => 'required',
        ]);
        // Get category by id
        $category = Category::findOrFail($id);
        if ($category->name !== $request->name) {
            $category->name = $request->name;
            // Update category
            $category->save();
        } else {
            return redirect()->route('category.index')->with('flash', 'No changes made to the category.');
        }
        // Redirect
        return redirect()->route('category.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //Get category by id
        $category = Category::findOrFail($id);
        //Delete category
        $category->delete();
        return redirect()->route('category.index');
    }
}
