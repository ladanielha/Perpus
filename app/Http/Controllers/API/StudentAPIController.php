<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentAPIController extends Controller
{
    public function getStudentList(Request $request)
    {
        $student = Student::searchStudent($request->q ?? "")->latest()->paginate(5);
        return response()->json($student,200);
    }
}
