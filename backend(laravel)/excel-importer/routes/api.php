<?php

use App\Http\Controllers\ExcelImportController;
use Illuminate\Support\Facades\Route;

Route::post('/import', [ExcelImportController::class, 'import']);
Route::get('/download-failed/{filename}', [ExcelImportController::class, 'downloadFailed']);