<?php

namespace App\Http\Controllers;

use App\Imports\UserImport;
use App\Exports\FailedRowsExport;
use App\Http\Requests\ImportExcelRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;

class ExcelImportController extends Controller
{

    public function import(ImportExcelRequest $request): JsonResponse
    {
        $file = $request->file('file');

        $failedFileName = 'failed_rows_' . time() . '.xlsx'; // Generate unique filename for failed rows export

        try {
            Excel::import(new UserImport, $file);

            return response()->json(['message' => 'Import successful']);
        } catch (ValidationException $e) {
            $failures = $e->failures();
            $rows = [];

            foreach ($failures as $failure) {
                $rows[] = [
                    'row' => $failure->row(),
                    'attribute' => $failure->attribute(),
                    'errors' => $failure->errors(),
                    'values' => $failure->values(),
                ];
            }


            Excel::store(new FailedRowsExport($rows), 'public/' . $failedFileName);

            $downloadUrl = url('storage/' . $failedFileName);

            return response()->json([
                'message' => 'Partial import: some rows failed validation.',
                'errors' => $rows,
                'download' => $downloadUrl,
            ], 422);
        }
    }


    public function downloadFailed(string $filename)
    {
        $path = storage_path('app/public/' . $filename);

        if (!file_exists($path)) {
            return response()->json(['message' => 'No failed file found'], 404);
        }

        return response()->download($path, $filename);
    }
}
