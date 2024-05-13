<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookAPIController;
use App\Http\Controllers\API\BorrowAPIController;
use App\Http\Controllers\API\CategoryAPIController;
use App\Http\Controllers\API\PublisherAPIController;
use App\Http\Controllers\API\StudentAPIController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->group(function () {

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

    Route::get('/me', [AuthController::class, 'me']);

});

//Auth Login
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
