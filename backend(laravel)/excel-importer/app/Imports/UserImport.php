<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsFailures;

class UserImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    use SkipsFailures;


    public function model(array $row)
    {
        return new User([
            'name'     => $row['name'],
            'email'    => $row['email'],
            'password' => Hash::make('default123'), 
        ]);
    }

 
    public function rules(): array
    {
        return [
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
        ];
    }

    // Optional: Uncomment if heading is not in first row
    // public function headingRow(): int
    // {
    //     return 1;
    // }
}
