<?php

namespace App\Http\Controllers;

use App\Models\DietaTemplate;
use App\Models\RefeicaoTemplate;
use Illuminate\Http\Request;

class RefeicaoTemplateController extends Controller
{
    public static function create(Request | array $dados_refeicao, DietaTemplate $dieta) : RefeicaoTemplate {
        $newRefeicao = new RefeicaoTemplate();
        $newRefeicao->dieta_template_id = $dieta->id;
        $newRefeicao->horario = date('H:i', strtotime($dados_refeicao['horario']));
        $newRefeicao->nome = $dados_refeicao['nome'];
        $newRefeicao->save();

        return $newRefeicao;
    }
}
