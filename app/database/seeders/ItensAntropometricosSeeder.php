<?php

namespace Database\Seeders;

use App\Models\ItemAntropometrico;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItensAntropometricosSeeder extends Seeder
{
    private $itens = [
        [
            "descricao" => "Peso",
            "unidade_medida_completa" => "kilograma",
            "unidade_medida_abreviada" => "kg",
            "tipo_item" => "peso",
        ],
        [
            "descricao" => "Altura",
            "unidade_medida_completa" => "metros",
            "unidade_medida_abreviada" => "m",
            "tipo_item" => "altura",
        ],
        [
            "descricao" => "Índice de Massa Múscular (IMC)",
            "unidade_medida_completa" => null,
            "unidade_medida_abreviada" => null,
            "tipo_item" => "imc",
        ],
        [
            "descricao" => "Classificação IMC",
            "unidade_medida_completa" => null,
            "unidade_medida_abreviada" => null,
            "tipo_item" => "imc",
        ],
        [
            "descricao" => "Dobra Tricipital",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Abdominal",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Axilar Média",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Torácica",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Panturrilha",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Bicipital",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Supraescapular",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Coxa",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Dobra Suprailíaca",
            "unidade_medida_completa" => "milímetros",
            "unidade_medida_abreviada" => "mm",
            "tipo_item" => "dobra",
        ],
        [
            "descricao" => "Circunferência Quadril",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Pescoço",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Panturrilha",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Braço Relaxado",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Braço Contraído",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Antebraço",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Coxa Medial",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Cefálica",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Tórax",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Cintura",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Abdomen",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Circunferência Coxa Proximal",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Diâmetro Punho",
            "unidade_medida_completa" => "centímetros",
            "unidade_medida_abreviada" => "cm",
            "tipo_item" => "circunferencia",
        ],
        [
            "descricao" => "Porcentagem de Gordura Corporal",
            "unidade_medida_completa" => "%",
            "unidade_medida_abreviada" => "%",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Massa Gorda",
            "unidade_medida_completa" => "kilogramas",
            "unidade_medida_abreviada" => "km",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Porcentagem de Massa Magra",
            "unidade_medida_completa" => "%",
            "unidade_medida_abreviada" => "%",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Massa Magra",
            "unidade_medida_completa" => "kilogramas",
            "unidade_medida_abreviada" => "km",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Massa Livre de Gordura",
            "unidade_medida_completa" => "kilogramas",
            "unidade_medida_abreviada" => "km",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Pesso Ósseo",
            "unidade_medida_completa" => "kilogramas",
            "unidade_medida_abreviada" => "km",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Gordura Visceral",
            "unidade_medida_completa" => "kilogramas",
            "unidade_medida_abreviada" => "km",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Água Corporal",
            "unidade_medida_completa" => "%",
            "unidade_medida_abreviada" => "%",
            "tipo_item" => "bioimpedância",
        ],
        [
            "descricao" => "Taxa Metabólica Basal",
            "unidade_medida_completa" => "kilocalorias",
            "unidade_medida_abreviada" => "kcal",
            "tipo_item" => "bioimpedância",
        ],
    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->itens as $item) {
            ItemAntropometrico::create($item);
        }
    }
}
