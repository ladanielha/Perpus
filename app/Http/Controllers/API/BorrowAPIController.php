<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrow;
use App\Models\Setting;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BorrowAPIController extends Controller
{
    public function getBorrowList(Request $request)
    {
        $books = Borrow::latest()->paginate(5);
        return response()->json($books);
    }

    public function createBorrow (Request $request) {
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
            return response()->json($borrow,201);
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json($exception,500);
        }
    }
}
