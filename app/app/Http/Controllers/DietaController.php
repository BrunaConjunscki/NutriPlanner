<?php

namespace App\Http\Controllers;

use App\Models\Dieta;
use App\Models\ItemOpcao;
use App\Models\Opcao;
use App\Models\Paciente;
use App\Models\Refeicao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DietaController extends Controller
{
    public function index(Paciente $paciente) {
        if($paciente->id !== Auth::user()->nutricionista->id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para acessar as dietas desse paciente',
            ]);
        }

        $dietas = $paciente->dietas;

        return response()->json([$dietas]);
    }

    public function store(Request $request, Paciente $paciente) {

        $dieta_atual = Dieta::where('paciente_id', $paciente->id)
            ->where('atual', true)
            ->first();

        if($dieta_atual) {
            $dieta_atual->atual = false;
            $dieta_atual->save();
        }

        $dieta = new Dieta();
        $dieta->paciente_id = $paciente->id;
        $dieta->atual = true;
        $dieta->nome = $request->nome;
        $dieta->save();

        foreach($request->all()['refeicoes'] as $refeicao) {
            $newRefeicao = new Refeicao();
            $newRefeicao->dieta_id = $dieta->id;
            $newRefeicao->horario = date('H:i', strtotime($refeicao['horario']));
            $newRefeicao->nome = $refeicao['nome'];
            $newRefeicao->save();

            foreach($refeicao['opcoes'] as $opcao) {
                $newOpcao = new Opcao();
                $newOpcao->nome = $opcao['nome'];
                $newOpcao->refeicao_id = $newRefeicao->id;
                $newOpcao->save();

                foreach($opcao['alimentos'] as $alimento) {
                    $newItemOpcao = new ItemOpcao();
                    $newItemOpcao->opcao_id = $newOpcao->id;
                    $newItemOpcao->alimento_id = $alimento['alimento_id'];
                    $newItemOpcao->medida_id = $alimento['medida_id'];
                    $newItemOpcao->quantidade = $alimento['quantidade'];
                    $newItemOpcao->observacao = $alimento['observacao'] ?? null;
                    $newItemOpcao->save();
                }
            }
        }

        return response()->json([
            'success' => true,
            'dieta' => $dieta
        ]);
    }

    public function show(Paciente $paciente, Dieta $dieta) {
        if($paciente->id !== Auth::user()->nutricionista->id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para acessar as dietas desse paciente',
            ]);
        }

        return response()->json([$dieta]);
    }
}
