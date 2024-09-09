<?php

namespace App\Http\Controllers;

use App\Models\DietaTemplate;
use App\Models\ItemOpcaoTemplate;
use Illuminate\Http\Request;

class DietaTemplateController extends Controller
{
    public function store(Request $request) {
        $dieta = $this->atualizaDados($request->toArray(), new DietaTemplate());

        return response()->json([
            'success' => true,
            'dieta' => $dieta
        ]);
    }

    private function atualizaDados(array $validated_request, DietaTemplate $dieta) : DietaTemplate {
        $dieta->nome = $validated_request['nome'];
        $dieta->save();

        foreach($validated_request['refeicoes'] as $refeicao) {
            $newRefeicao = RefeicaoTemplateController::create($refeicao, $dieta);

            foreach($refeicao['opcoes'] as $opcao) {
                $newOpcao = OpcaoTemplateController::create($opcao, $newRefeicao);

                foreach($opcao['alimentos'] as $alimento) {
                    ItemOpcaoTemplateController::create($alimento, $newOpcao);
                }
            }
        }

        return $dieta;
    }

}
