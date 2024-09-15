<?php

namespace App\Http\Controllers;

use App\Models\DietaTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $dieta->nutricionista_id = Auth::user()->nutricionista->id;
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

    public function index() {
        $dietas = DietaTemplate::where('nutricionista_id', Auth::user()->nutricionista->id)->get();

        return response()->json($dietas);
    }

    public function show(DietaTemplate $dieta_template) {
        if(Auth::user()->nutricionista->id !== $dieta_template->nutricionista_id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para acessar esse template.'
            ], 403);
        }

        return response()->json($dieta_template);
    }

}
