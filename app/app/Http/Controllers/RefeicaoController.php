<?php

namespace App\Http\Controllers;

use App\Models\Dieta;
use App\Models\ItemOpcao;
use App\Models\Opcao;
use App\Models\Paciente;
use App\Models\Refeicao;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RefeicaoController extends Controller
{
    public static function create(Request | array $dados_refeicao, Dieta $dieta) : Refeicao {
        $newRefeicao = new Refeicao();
        $newRefeicao->dieta_id = $dieta->id;
        $newRefeicao->horario = date('H:i', strtotime($dados_refeicao['horario']));
        $newRefeicao->nome = $dados_refeicao['nome'];
        $newRefeicao->save();

        return $newRefeicao;
    }
}
