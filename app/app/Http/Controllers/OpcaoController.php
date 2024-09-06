<?php

namespace App\Http\Controllers;

use App\Models\Opcao;
use App\Models\Refeicao;
use Illuminate\Http\Request;

class OpcaoController extends Controller
{
    public static function create(Request | array $dados_opcao, Refeicao $refeicao) : Opcao {
        $newOpcao = new Opcao();
        $newOpcao->nome = $dados_opcao['nome'];
        $newOpcao->refeicao_id = $refeicao->id;
        $newOpcao->save();

        return $newOpcao;
    }
}
