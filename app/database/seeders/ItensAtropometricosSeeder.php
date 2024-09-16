<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ItemAntropometrico;
use File;

class ItensAtropometricosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $itens = [
            ["descricao" => "altura", "unidade_medida_completa" => "centímetros", "unidade_medida_abreviada" => "cm"],
            ["descricao" => "peso", "unidade_medida_completa" => "quilogramas", "unidade_medida_abreviada" => "kg"],
            ["descricao" => "imc", "unidade_medida_completa" => "não se aplica", "unidade_medida_abreviada" => "na"],
            ["descricao" => "circunferência do braço", "unidade_medida_completa" => "centímetros", "unidade_medida_abreviada" => "cm"],
            ["descricao" => "circunferência do quadril", "unidade_medida_completa" => "centímetros", "unidade_medida_abreviada" => "cm"],
            ["descricao" => "circunferência da cintura", "unidade_medida_completa" => "centímetros", "unidade_medida_abreviada" => "cm"],
            ["descricao" => "circunferência da perna", "unidade_medida_completa" => "centímetros", "unidade_medida_abreviada" => "cm"],
            ["descricao" => "dobra peito", "unidade_medida_completa" => "milímetros", "unidade_medida_abreviada" => "mm"]
        ];


        foreach ($itens as $item) {
            ItemAntropometrico::create($item);
        }
    }
}
