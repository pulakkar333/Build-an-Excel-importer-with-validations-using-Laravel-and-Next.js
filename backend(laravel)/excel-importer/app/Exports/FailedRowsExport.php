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

    public function collection()
    {
        return new Collection($this->failedRows);
    }

    
    public function map($row): array  //Map each row to the desired format for the export
    {
        return [
            $row['row'] ?? '',
            $row['attribute'] ?? '',
            implode(', ', $row['errors'] ?? []),
            json_encode($row['values'] ?? []),
        ];
    }

    
    public function headings(): array //Define headings for the Excel file
    {
        return [
            'Row Number',
            'Column',
            'Errors',
            'Row Values',
        ];
    }
}
