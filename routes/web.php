<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    
    //Routing Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    //Routing Student
    Route::get('/student', [StudentController::class, 'index'])->name('student.index');
    Route::get('/student/create', [StudentController::class, 'create'])->name('student.create');
    Route::post('/student/store', [StudentController::class, 'store'])->name('student.store');
    Route::get('/student/edit/{id}', [studentController::class, 'edit'])->name('student.edit');
    Route::put('/student/edit/{id}', [studentController::class, 'update'])->name('student.update');
    Route::delete('/student/delete/{id}', [studentController::class, 'destroy'])->name('student.dstroy');
    
    //Routing Books
    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
    Route::post('/books/store', [BookController::class, 'store'])->name('books.store');
    Route::get('/books/edit/{id}', [BookController::class, 'edit'])->name('books.edit');
    Route::put('/books/update/{id}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/delete/{id}', [BookController::class, 'destroy'])->name('books.destroy');
    
    //Routing Category
    Route::get('/category', [CategoryController::class, 'index'])->name('category.index');
    Route::get('/category/create', [CategoryController::class, 'create'])->name('category.create');
    Route::post('/category/store', [CategoryController::class, 'store'])->name('category.store');
    Route::get('/category/edit/{id}', [CategoryController::class, 'edit'])->name('category.edit');
    Route::put('/category/update/{id}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
    
    //Routing Publisher
    Route::get('/publisher', [PublisherController::class, 'index'])->name('publisher.index');
    Route::get('/publisher/create', [PublisherController::class, 'create'])->name('publisher.create');
    Route::post('/publisher/store', [PublisherController::class, 'store'])->name('publisher.store');
    Route::get('/publisher/edit/{id}', [PublisherController::class, 'edit'])->name('publisher.edit');
    Route::put('/publisher/update/{id}', [PublisherController::class, 'update'])->name('publisher.update');
    Route::delete('/publisher/delete/{id}', [PublisherController::class, 'destroy'])->name('publisher.destroy');
    
    //Routing Borrow 
    Route::get('/borrow', [BorrowController::class, 'index'])->name('borrow.index');
    Route::get('/borrow/create', [BorrowController::class, 'create'])->name('borrow.create');
    Route::post('/borrow/store', [BorrowController::class, 'store'])->name('borrow.store');
    Route::get('/borrow/edit/{id}', [BorrowController::class, 'edit'])->name('borrow.edit');
    Route::put('/borrow/update/{id}', [BorrowController::class, 'update'])->name('borrow.update');
    Route::delete('/borrow/delete/{id}', [BorrowController::class, 'destroy'])->name('borrow.destroy');
    
    //Routing Report 
    Route::get('/report', [BorrowController::class, 'borrowreport'])->name('report.index');

    
    //Routing Edit Prodfile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
