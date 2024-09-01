<?php

namespace App\Http\Controllers;

use App\Models\ItemOpcao;
use App\Models\Opcao;
use App\Models\Paciente;
use App\Models\Refeicao;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RefeicaoController extends Controller
{
    public function store(Request $request, Paciente $paciente) {
        $num_dieta = Refeicao::where('paciente_id', $paciente->id)
            ->orderBy('id', 'DESC')
            ->first()
            ->num_dieta ?? 0;
        $num_dieta++;

        foreach($request->all() as $refeicao) {
            $newRefeicao = new Refeicao();
            $newRefeicao->num_dieta = $num_dieta;
            $newRefeicao->horario = Carbon::createFromFormat('H:i', $refeicao['horario'])->parse('H:i');
            $newRefeicao->nome = $refeicao['nome'];
            $newRefeicao->paciente_id = $paciente->id;
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
                    $newItemOpcao->observacao = $alimento['observacao'];
                    $newItemOpcao->save();
                }
            }
        }

        return response()->json([
            'success' => true,
            'refeicao' => $newRefeicao
        ]);
    }

    public function show(Paciente $paciente, Refeicao $refeicao) {
        $refeicao->load('opcoes');
        $refeicao->opcoes->load('item_opcao');

        foreach ($refeicao->opcoes as $opcao) {
            $opcao->item_opcao->load('alimento');

            $opcao->item_opcao->load('medida');
        }

        return response()->json([
            'refeicao' => $refeicao,
        ]);
    }

}
