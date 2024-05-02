<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'password' => 'password'
        ]);
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin1@gmail.com',
            'password' => 'password'
        ]);
        
        $this->call(CategorySeeder::class);
        $this->call(LocationSeeder::class);
        $this->call(PublisherSeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(BookSeeder::class);
    }
}
