<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Borrow;
use App\Models\Setting;
use App\Models\Student;
use Exception;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

class BorrowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $borrows = Borrow::when(request()->q, function ($borrows) {
            $borrows->whereHas('student', function ($query) {
                $query->where('name', 'like', '%' . request()->q . '%');
            })->orWhereHas('book', function ($query) {
                $query->where('name', 'like', '%' . request()->q . '%');
            });
        })->with('student', 'book')->latest()->paginate(5);

        $borrows->appends(['q' => request()->q]);
        return Inertia::render('Borrow/BorrowList', [
            'borrows' => $borrows,
        ]);

    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $books = Book::where('status', 'AVAILABLE')->get();
        $students = Student::get();
        return Inertia::render('Borrow/BorrowCreate', [
            'books' => $books,
            'students' => $students,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'borrowDate' => 'required|date|before_or_equal:today',
            'selectedStudent' => 'required',
            'selectedBook' => 'required',
        ]);
        try {
            DB::beginTransaction();
            $borrowDate = $request->borrowDate;
            $returnDays = Setting::latest()->first()->return_days;
            $maxReturnDate = date('Y-m-d', strtotime("+ $returnDays days", strtotime($borrowDate)));
            $borrow = Borrow::create([
                'student_id' => $request->selectedStudent,
                'book_id' => $request->selectedBook,
                'borrow_date' => $borrowDate,
                'return_date' => null,
                'return_day' => $maxReturnDate,
                'status' => 'NOTRETURN',
            ]);
            $book = Book::find($request->selectedBook);
            $book->status = 'NOTAVAILABLE';
            $book->save();
            DB::commit();
            return redirect()->route('borrow.index');
        } catch (Exception $exception) {
            DB::rollBack();
            return redirect()->back()->withInput()->withErrors(['error' => $exception->getMessage()]);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $borrow = Borrow::with('book')->findOrFail($id);
        $books = Book::where('status', 'AVAILABLE')->get();
        $students = Student::get();
        return Inertia::render('Borrow/BorrowEdit', [
            'borrow' => $borrow,
            'books' => $books,
            'students' => $students,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'borrowDate' => 'required|date|before_or_equal:today',
            'maxReturnDate' => 'required|date|after_or_equal:borrowDate',
            'selectedStudent' => 'required',
            'selectedBook' => 'required',
        ]);
        try {
            DB::beginTransaction();
            $borrow = Borrow::findOrFail($id);
            if ($request->selectedBook !== $borrow->book_id) {
                $lastbook = Book::find($borrow->book_id);
                $lastbook->status = 'AVAILABLE';
                $lastbook->save();
                $borrow->book_id = $request->selectedBook;
                $newbook = Book::find($request->selectedBook);
                $newbook->status = 'NOTAVAILABLE';
                $newbook->save();
                //dd($lastbook);
            } 
            $borrow->student_id = $request->selectedStudent;
            $borrow->borrow_date = $request->borrowDate;
            $borrow->return_date = $request->returnDate;
            $borrow->return_day = $request->maxReturnDate;
            $borrow->save();
            DB::commit();
            return redirect()->route('borrow.index');
        } catch (Exception $exception) {
            DB::rollBack();
            return redirect()->route('borrow.create')->withInput();
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //Get books by id
        $book = Borrow::findOrFail($id);
        //Delete books
        $book->delete();
        //Redirect to books index
        return redirect()->route('borrow.index');
    }


    public function formreturn(Request $request, string $borrowid)
    {
        $borrow = Borrow::with('book', 'student')->findOrFail($borrowid);
        return Inertia::render('Borrow/BorrowDetail', [
            'borrow' => $borrow,
        ]);
    }

    /**
     * return book the specified resource from storage.
     */

    public function returnbook(Request $request, string $borrowid, string $bookid)
    {
        $request->validate([
            'returnDate' => 'required|date|after_or_equal:borrowDate',
        ]);
        try {
            DB::beginTransaction();
            $borrow = Borrow::findOrFail($borrowid);
            $borrow->return_date = $request->returnDate;
            $borrow->status = "RETURN";
            $borrow->save();
            $book = Book::findOrFail($bookid);
            $book->status = "AVAILABLE";
            $book->save();
            DB::commit();
            return redirect()->route('borrow.index');
        } catch (Exception $exception) {
            DB::rollBack();
            return redirect()->route('borrow.index')->withInput()->withErrors(['error' => $exception->getMessage()]);
        }
    }


    /**
     * Display report monthly.
     */
    public function borrowreport(Request $request)
    {
        $borrows = Borrow::when(request()->month, function ($borrows) {
            $borrows = $borrows->where('borrow_date', 'like', '%' . request()->month . '%');
        })->with('student', 'book')->latest()->paginate(5);

        $borrows->appends(['month' => request()->month]);
        return Inertia::render('Report/ReportMonthly', [
            'borrows' => $borrows,
        ]);
    }
}
