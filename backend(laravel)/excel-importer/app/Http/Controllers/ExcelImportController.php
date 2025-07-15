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
    /**
     * Handle the Excel import request.
     *
     * @param ImportExcelRequest $request
     * @return JsonResponse
     */
    public function import(ImportExcelRequest $request): JsonResponse
    {
        $file = $request->file('file');

        // Generate unique filename for failed rows export
        $failedFileName = 'failed_rows_' . time() . '.xlsx';

        try {
            Excel::import(new UserImport, $file);

            return response()->json(['message' => 'Import successful']);
        } catch (ValidationException $e) {
            $failures = $e->failures();
            $rows = [];

            foreach ($failures as $failure) {
                $rows[] = [
                    'row' => $failure->row(),          // Row number
                    'attribute' => $failure->attribute(),  // Column name
                    'errors' => $failure->errors(),    // Array of errors
                    'values' => $failure->values(),    // Row values
                ];
            }

            // Store failed rows with error messages in an exportable Excel file in storage/app/public
            Excel::store(new FailedRowsExport($rows), 'public/' . $failedFileName);

            // Generate download URL - assuming you serve storage from /storage URL
            $downloadUrl = url('storage/' . $failedFileName);

            return response()->json([
                'message' => 'Partial import: some rows failed validation.',
                'errors' => $rows,
                'download' => $downloadUrl,
            ], 422);
        }
    }

    /**
     * Optional: Download the failed rows Excel file by filename.
     *
     * @param string $filename
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse|\Illuminate\Http\JsonResponse
     */
    public function downloadFailed(string $filename)
    {
        $path = storage_path('app/public/' . $filename);

        if (!file_exists($path)) {
            return response()->json(['message' => 'No failed file found'], 404);
        }

        return response()->download($path, $filename);
    }
}
