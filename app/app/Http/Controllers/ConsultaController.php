<?php

namespace App\Http\Controllers;

use App\Http\Requests\Consulta\StoreConsultaRequest;
use App\Models\Consulta;
use App\Models\Paciente;

class ConsultaController extends Controller
{
    public function store(StoreConsultaRequest $request, Paciente $paciente) {
        $consulta = Consulta::create([
            'paciente_id' => $paciente->id,
            'data' => $request->data ?? null,
            'horario' => $request->horario ?? null,
            'nutricionista_id' => $request->user()->nutricionista->id,
        ]);

        if($request-anamnese !== '') {
            $paciente->anamnese = $request->anamnese;
            $paciente->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Consulta cadastrada com sucesso!',
            'consulta' => $consulta,
        ]);
    }

    public function show(Paciente $paciente, Consulta $consulta) {
        return response()->json($consulta);
    }

    public function index(Paciente $paciente) {
        $consultas = Consulta::where('paciente_id', $paciente->id)
            ->get();
        return response()->json($consultas);
    }
}
