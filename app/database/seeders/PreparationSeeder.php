<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Preparo;
use File;

class PreparationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Preparo::truncate();

        $json = File::get("database/data/preparations.json");
        $preparations = json_decode($json);

        foreach ($preparations as $key => $value) {
            Preparo::create([
                "codigo" => $value->code,
                "nome" => $value->name
            ]);
        }
    }
}
