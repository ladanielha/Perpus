<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the student.
     */   
    public function index()
    {
        $student = Student::when(request()->q, function ($student) {
            $student = $student->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);
        $student->appends(['q' => request()->q]);
        return Inertia::render('Student/StudentList', [
            'students' => $student,
        ]);
    }

     /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('Student/StudentCreate', [
         ]);
    }

        /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        /**
         * Validate request books
         */
        $request->validate([
            'name'       => 'required',
            'email'   => 'required',
            'phone'    => 'required',
            'address'=> 'required',
            'classes'    => 'required',
        ]);
       
        //create students
        $students = Student::create([
            'name'  => $request->name,
            'email'  => $request->email,
            'phone'  => $request->phone,
            'address'  => $request->address,
            'class'  => $request->classes,
        ]);

        //redirect
        return redirect()->route('student.index');
    }

     /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $student = Student::findOrFail($id);
        return Inertia::render('Student/StudentEdit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
         /**
         * Validate request books
         */
        $request->validate([
            'name'       => 'required',
            'email'   => 'required',
            'phone'    => 'required',
            'address'=> 'required',
            'classes'    => 'required',
        ]);
        $student = Student::find($id);
        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->address = $request->address;
        $student->class = $request->classes;
        $student->save();

        //redirect
        return redirect()->route('student.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //Get books by id
        $student = Student::findOrFail($id);
        //Delete student
        $student->delete();
        //Redirect to books index
        return redirect()->route('student.index');
    }


}
