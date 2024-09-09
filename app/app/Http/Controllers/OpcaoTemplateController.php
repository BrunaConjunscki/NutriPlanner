<?php

namespace App\Http\Controllers;

use App\Models\OpcaoTemplate;
use App\Models\RefeicaoTemplate;
use Illuminate\Http\Request;

class OpcaoTemplateController extends Controller
{
    public static function create(Request | array $dados_opcao, RefeicaoTemplate $refeicao) : OpcaoTemplate {
        $newOpcao = new OpcaoTemplate();
        $newOpcao->nome = $dados_opcao['nome'];
        $newOpcao->refeicao_template_id = $refeicao->id;
        $newOpcao->save();

        return $newOpcao;
    }
}
