<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('author');
            $table->foreignUlid('category_id')->references('id')->on('categories');
            $table->foreignUlid('location_id')->references('id')->on('locations');
            $table->foreignUlid('publisher_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('status', array('AVAILABLE', 'NOTAVAILABLE'))->default('AVAILABLE');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
