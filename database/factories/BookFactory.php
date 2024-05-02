<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Location;
use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryULID = Category::inRandomOrder()->value('id');
        $locationULID = Location::inRandomOrder()->value('id');
        $publisherULID = Publisher::inRandomOrder()->value('id');
        return [
            'name' => $this->faker->sentence,
            'author' => $this->faker->name,
            'category_id' => $categoryULID, 
            'location_id' => $locationULID ,
            'publisher_id' => $publisherULID,
            'status' => $this->faker->randomElement(['AVAILABLE']), 
        ];
    }
}
