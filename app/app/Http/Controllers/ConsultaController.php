<?php

namespace App\Http\Controllers;

use App\Http\Requests\Consulta\StoreConsultaRequest;
use App\Models\Consulta;
use Illuminate\Http\Request;

class ConsultaController extends Controller
{
    public function store(StoreConsultaRequest $request) {
        $consulta = Consulta::create([
            'paciente_id' => $request->paciente_id,
            'nutricionista_id' => $request->user()->nutricionista->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Consulta cadastrada com sucesso!',
            'consulta' => $consulta,
        ]);
    }

    public function show(Consulta $consulta) {
        return response()->json([
            $consulta,
        ]);
    }

    public function index(Request $request) {
        if($request->has('paciente_id')) {
            $consultas = Consulta::where('paciente_id', $request->paciente_id)
                ->get();
            return response()->json([$consultas]);
        }

        return response()->json(['success' => false, 'message' => 'Informe o paciente'], 400);
    }
}
