<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Categoria;
use File;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         // Categoria::truncate();

         $json = File::get("database/data/categories.json");
         $categories = json_decode($json);

         foreach ($categories as $key => $value) {
             Categoria::create([
                 "nome" => $value->name
             ]);
         }
    }
}
