<?php

namespace Database\Seeders;

use App\Models\Publisher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PublisherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         Publisher::create([
            'name' => 'Erlangga',
        ]);
         Publisher::create([
            'name' => 'Mizan',
        ]);
         Publisher::create([
            'name' => 'Pustaka Media    ',
        ]);
        Publisher::create([
            'name' => 'Gramedia',
        ]);
    }
}
