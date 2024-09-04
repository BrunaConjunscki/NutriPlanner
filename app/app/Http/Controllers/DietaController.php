<?php

namespace App\Http\Controllers;

use App\Http\Requests\Dieta\StoreDietaRequest;
use App\Http\Requests\Dieta\UpdateDietaRequest;
use App\Models\Dieta;
use App\Models\ItemOpcao;
use App\Models\Opcao;
use App\Models\Paciente;
use App\Models\Refeicao;
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

    public function store(StoreDietaRequest $request, Paciente $paciente) {
        $dieta_atual = Dieta::where('paciente_id', $paciente->id)
            ->where('atual', true)
            ->first();

        if($dieta_atual) {
            $dieta_atual->atual = false;
            $dieta_atual->save();
        }

        $dieta = $this->atualizaDados($request->validated(), $paciente, new Dieta());

        return response()->json([
            'success' => true,
            'dieta' => $dieta
        ]);
    }

    public function update(UpdateDietaRequest $request, Paciente $paciente, Dieta $dieta) {
        $dieta = $this->atualizaDados($request->validated(), $paciente, $dieta);

        return response()->json([
            'success' => true,
            'dieta' => $dieta
        ]);
    }

    private function atualizaDados(array $validated_request, Paciente $paciente, Dieta $dieta) : Dieta {
        $dieta->paciente_id = $paciente->id;
        $dieta->atual = true;
        $dieta->nome = $validated_request['nome'];
        $dieta->save();

        foreach($validated_request['refeicoes'] as $refeicao) {
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

        return $dieta;
    }

    public function show(Paciente $paciente, Dieta $dieta) {
        if($paciente->id !== Auth::user()->nutricionista->id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para acessar as dietas desse paciente',
            ]);
        }

        $dieta->load('refeicoes');

        return response()->json([$dieta]);
    }
}
