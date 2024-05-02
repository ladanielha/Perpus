<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Category::create([
            'name' => 'Sejarah',
        ]);
        Category::create([
            'name' => 'Komputer',
        ]);
        Category::create([
            'name' => 'IPA',
        ]);
        Category::create([
            'name' => 'Bahasa',
        ]);
        Category::create([
            'name' => 'Akuntansi',
        ]);
    }
}
