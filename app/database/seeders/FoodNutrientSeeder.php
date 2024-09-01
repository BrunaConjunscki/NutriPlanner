<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\AlimentoNutriente;
use File;
// use App\Models\Alimento;

class FoodNutrientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/foods_nutrients.json");
        $nutrientsValues = json_decode($json);

        foreach ($nutrientsValues as $k => $value) {
            $k++;

            foreach ($value as $j => $v) {
                // $food = Alimento::find($k);

                // $food->nutrients()->create([
                //     "food_id" => $k,
                //     "nutrient_id" => $j,
                //      "amount" => $v
                // ]);

                AlimentoNutriente::create([
                    "alimento_id" => $k,
                    "nutriente_id" => $j,
                    "quantidade" => $v
                ]);

                // if($k > 10){
                //     break;
                // }

            // print_r($k);
            // print_r($j);
            // print_r($v);

            }
        }
    }
}
