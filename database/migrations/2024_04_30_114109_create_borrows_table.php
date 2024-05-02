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
        Schema::create('borrows', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('student_id')->references('id')->on('students');
            $table->foreignUlid('book_id')->references('id')->on('books');
            $table->timestamp('borrow_date');
            $table->timestamp('return_date')->nullable();
            $table->enum('status', array('NOTRETURN', 'RETURN'))->default('NOTRETURN')->nullable();
            $table->timestamp('return_day')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrows');
    }
};
