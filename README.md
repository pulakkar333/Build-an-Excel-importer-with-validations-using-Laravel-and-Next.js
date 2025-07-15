#  Excel Importer - Laravel + Next.js

A full-stack Excel importer with validations, built using **Laravel (backend)** and **Next.js (frontend)**.  
It supports importing Excel files, validating each row and column, saving valid records, skipping invalid ones, and exporting failed rows with error messages.

---

## ⚙️ Tech Stack

| Layer       | Technology                      |
|------------|----------------------------------|
| Backend     | Laravel 12, Laravel Excel (Maatwebsite) |
| Frontend    | Next.js (React)                 |
| Upload      | Axios + FormData                |
| Validation  | Laravel Validator (row-level)   |
| Export      | Laravel Excel                   |

---

##  Features

- Upload `.xlsx` or `.xls` Excel files
- Validate each row (e.g., required fields, unique emails, correct formats)
- Save only valid rows to the database
- Skip invalid rows and show detailed validation errors
- Download an Excel file with failed rows and error messages

---

##  Project Structure
excel-importer/
├── backend/ (Laravel)
│ ├── app/
│ │ ├── Http/
│ │ │ └── Controllers/ExcelImportController.php
│ │ │ └── Requests/ImportExcelRequest.php
│ │ ├── Imports/UserImport.php
│ │ ├── Exports/FailedRowsExport.php
│ ├── routes/api.php
│ └── .env
│
├── frontend/ (Next.js)
│ ├── src/
│ │ ├── app/page.js
│ │ ├── lib/api.js
│ └── public/

------------------------------------
##  Setup Backend (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Setup DB connection in .env
DB_DATABASE=your_db
DB_USERNAME=root
DB_PASSWORD=

php artisan migrate
php artisan storage:link
php artisan serve
------------------------------------
##  Setup Frontend (Next.js)
cd ../frontend
npm install
npm run dev
------------------------------------
