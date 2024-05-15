<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRequest;
use App\Models\Book;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentAPIController extends Controller
{
    public function getStudentList(Request $request)
    {
        $student = Student::searchStudent($request->q ?? "")->latest()->paginate(5);
        return response()->json($student,200);
    }

    public function createStudent(StudentRequest $request)
    {
        try {
            DB::beginTransaction();
            $students = Student::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'class' => $request->classes,
            ]);
            DB::commit();
            return response()->json($students, 201);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json([
                'message' => 'An error occurred while processing your request',
                'error' => $exception->getMessage()
            ], 500);
        }

    }
}
