<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BorrowRequest;
use App\Models\Book;
use App\Models\Borrow;
use App\Models\Setting;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BorrowAPIController extends Controller
{
    public function getBorrowList(Request $request)
    {
        $books = Borrow::latest()->paginate(5);
        return response()->json($books);
    }

    public function createBorrow(BorrowRequest $request)
    {
        try {
            DB::beginTransaction();
            $book = Book::find($request->input('selectedBook'));
            if (!$book || $book->status == 'NOTAVAILABLE') {
                return response()->json([
                    'message' => 'The selected book does not available.'
                ], 404);
            }
           
            $borrowDate = $request->input('borrowDate');
            $returnDays = Setting::latest()->first()->return_days;
            $maxReturnDate = date('Y-m-d', strtotime("+$returnDays days", strtotime($borrowDate)));
            $borrow = Borrow::create([
                'student_id' => $request->input('selectedStudent'),
                'book_id' => $request->input('selectedBook'),
                'borrow_date' => $borrowDate,
                'return_date' => null,
                'return_day' => $maxReturnDate,
                'status' => 'NOTRETURN',
            ]);
            $book->status = 'NOTAVAILABLE';
            $book->save();
            DB::commit();
            return response()->json($borrow, 201);
        } catch (Exception $exception) {
            DB::rollBack();    
            return response()->json([
                'message' => 'An error occurred while processing your request',
                'error' => $exception->getMessage()
            ], 500);
        }
    }





}
