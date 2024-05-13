<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookAPIController;
use App\Http\Controllers\API\BorrowAPIController;
use App\Http\Controllers\API\CategoryAPIController;
use App\Http\Controllers\API\PublisherAPIController;
use App\Http\Controllers\API\StudentAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Student API
Route::get('/students', [StudentAPIController::class, 'getStudentList']);

//Category API
Route::get('/categories', [CategoryAPIController::class, 'getCategoryList']);

//Publisher API
Route::get('/publishers', [PublisherAPIController::class, 'getPublisherList']);

//Book API
Route::get('/books', [BookAPIController::class, 'getBookList']);

//Borrow API
Route::get('/borrows', [BorrowAPIController::class, 'getBorrowList']);
Route::post('/borrow', [BorrowAPIController::class, 'createBorrow']);

//Auth Login
Route::post('/auth/login', [AuthController::class, 'login']);
