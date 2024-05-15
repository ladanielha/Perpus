<?php

namespace App\Http\Requests;

use App\Models\Book;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
class BorrowRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules()
    {
        return [
            'borrowDate' => 'required|date|before_or_equal:today',
            'selectedStudent' => 'required',
            'selectedBook' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'borrowDate.required' => 'The borrow date is required.',
            'borrowDate.date' => 'The borrow date must be before or equal with today.',
            'borrowDate.before_or_equal' => 'The borrow date must be today or earlier.',
            'selectedStudent.required' => 'You must select a student.',
            'selectedBook.required' => 'You must select a book.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data'    => $validator->errors()
        ], 422));
    }
}
