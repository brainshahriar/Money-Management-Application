<?php

namespace Database\Seeders;

use App\Models\Category\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'category_name' => 'Food',
                'color' => '#FFCA33',
                'icon' => 'Entertainment',
                'category_type' => 1
            ],
            [
                'category_name' => 'Salary',
                'color' => '#FF33A5',
                'icon' => 'Entertainment',
                'category_type' => 2
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
