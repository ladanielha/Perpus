<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookAPIController;
use App\Http\Controllers\API\BorrowAPIController;
use App\Http\Controllers\API\CategoryAPIController;
use App\Http\Controllers\API\PublisherAPIController;
use App\Http\Controllers\API\StudentAPIController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;



Route::middleware(['isvalidate'])->group(function () {

    //Student API
    Route::get('/students', [StudentAPIController::class, 'getStudentList']);
    Route::post('/students', [StudentAPIController::class, 'createStudent']);

    //Category API
    Route::get('/categories', [CategoryAPIController::class, 'getCategoryList']);

    //Publisher API
    Route::get('/publishers', [PublisherAPIController::class, 'getPublisherList']);

    //Book API
    Route::get('/books', [BookAPIController::class, 'getBookList']);
    Route::post('/books', [BookAPIController::class, 'createBook']);

    //Borrow API
    Route::get('/borrows', [BorrowAPIController::class, 'getBorrowList']);
    Route::post('/borrow', [BorrowAPIController::class, 'createBorrow']);
    Route::post('/borrow', [BorrowAPIController::class, 'createBorrow']);
    Route::patch('/borrow/return/{borrowid}/{bookid}', [BorrowAPIController::class, 'returnBook']);


    //Rute user 
    Route::get('/auth/user', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

//Auth Login
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
