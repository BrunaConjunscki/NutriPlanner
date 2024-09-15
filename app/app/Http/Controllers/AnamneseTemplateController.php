<?php

namespace App\Http\Controllers;

use App\Http\Requests\Anamnese\StoreAnamneseRequest;
use App\Http\Requests\Anamnese\UpdateAnamneseRequest;
use App\Models\AnamneseTemplate;
use Illuminate\Support\Facades\Auth;

class AnamneseTemplateController extends Controller
{
    public function store(StoreAnamneseRequest $request) {
        $dados = $request->validated();
        $dados['nutricionista_id'] = $request->user()->nutricionista->id;

        $anamnese = AnamneseTemplate::create($dados);

        return response()->json([
            'success' => true,
            'anamnese' => $anamnese,
        ]);
    }

    public function index() {
        $anamneses = AnamneseTemplate::where('nutricionista_id', Auth::user()->nutricionista->id)->get();

        return response()->json($anamneses);
    }

    public function show(AnamneseTemplate $anamnese_template) {
        if($anamnese_template->nutricionista_id !== Auth::user()->nutricionista->id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para acessar esse template.',
            ]);
        }

        return response()->json($anamnese_template);
    }

    public function update(UpdateAnamneseRequest $request, AnamneseTemplate $anamnese_template) {
        $dados = $request->validated();

        $anamnese_template->update($dados);

        return response()->json([
            'success' => true,
            'anamnese' => $anamnese_template,
        ]);
    }
}
