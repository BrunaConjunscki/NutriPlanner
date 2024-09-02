<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Medida;
use File;

class MeasurementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()

    {
        // Medida::truncate();

        $json = File::get("database/data/measurements.json");
        $measurements = json_decode($json);

        foreach ($measurements as $key => $value) {
            Medida::create([
                "codigo" => $value->code,
                "nome" => $value->name
            ]);
        }
    }
}
