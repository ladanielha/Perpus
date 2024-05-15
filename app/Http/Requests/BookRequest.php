<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BookRequest extends FormRequest
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
            'name' => 'required|min:3|max:250',
            'authorname' => 'required|min:3|max:250',
            'selectedCategories' => 'required',
            'selectedLocation' => 'required',
            'selectedPublisher' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'name.min' => 'The name must be at least :min characters.',
            'name.max' => 'The name may not be greater than :max characters.',
            'authorname.required' => 'The author name field is required.',
            'authorname.min' => 'The author name must be at least :min characters.',
            'authorname.max' => 'The author name may not be greater than :max characters.',
            'selectedCategories.required' => 'You must select a category.',
            'selectedLocation.required' => 'You must select a location.',
            'selectedPublisher.required' => 'You must select a publisher.',
        ];
    }
    

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors()
        ], 422));
    }
}
