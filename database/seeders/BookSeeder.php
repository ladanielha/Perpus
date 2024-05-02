<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Student;
use Database\Factories\BookFactory;
use Database\Factories\StudentsFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::factory(20)->create();

    }
}
