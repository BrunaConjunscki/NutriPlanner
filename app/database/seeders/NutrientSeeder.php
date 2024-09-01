<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Nutriente;
use File;

class NutrientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Alimento::truncate();

       $json = File::get("database/data/nutrients.json");
       $nutrients = json_decode($json);

       foreach ($nutrients as $key => $value) {
           Nutriente::create([
               "nome" => $value->name,
               "simbolo" => $value->symbol
           ]);
       }
    }
}
