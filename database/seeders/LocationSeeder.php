<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         //
        Location::create([
            'name' => 'A1',
        ]);
        Location::create([
            'name' => 'A2',
        ]);
        Location::create([
            'name' => 'A3',
        ]);
        Location::create([
            'name' => 'A4',
        ]);
        Location::create([
            'name' => 'A5',
        ]);
    }
}
