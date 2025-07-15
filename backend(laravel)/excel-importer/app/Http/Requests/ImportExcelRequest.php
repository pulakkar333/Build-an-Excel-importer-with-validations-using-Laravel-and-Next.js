<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportExcelRequest extends FormRequest
{

    public function authorize(): bool
    {
        
        return true;
    }

   
    public function rules(): array
    {
        return [
            'file' => 'required|file|mimes:xlsx,xls|max:2048', // required file, must be xlsx or xls, max size 2MB
        ];
    }
}
