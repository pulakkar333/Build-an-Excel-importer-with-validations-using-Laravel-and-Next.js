<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Support\Collection;

class FailedRowsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $failedRows;

    /**
     * @param array $failedRows
     */
    public function __construct(array $failedRows)
    {
        $this->failedRows = $failedRows;
    }

    /**
     * Return a collection of rows to export.
     */
    public function collection()
    {
        return new Collection($this->failedRows);
    }

    /**
     * Map each row to the desired format for the export.
     */
    public function map($row): array
    {
        return [
            $row['row'] ?? '',
            $row['attribute'] ?? '',
            implode(', ', $row['errors'] ?? []),
            json_encode($row['values'] ?? []),
        ];
    }

    /**
     * Define headings for the Excel file.
     */
    public function headings(): array
    {
        return [
            'Row Number',
            'Column',
            'Errors',
            'Row Values',
        ];
    }
}
