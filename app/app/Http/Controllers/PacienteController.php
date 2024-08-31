<?php

namespace App\Http\Controllers;

use App\Http\Requests\Paciente\StorePacienteRequest;
use App\Http\Requests\Paciente\UpdatePacienteRequest;
use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function index(Request $request) {
        if($request->has('limit')) {
            $pacientes = Paciente::limit($request->limit)
                ->where('nutricionista_id', $request->user()->id)
                ->get();
        } else {
            $pacientes = Paciente::where('nutricionista_id', $request->user()->id)->get();
        }

        return response()->json($pacientes, 200);
    }

    public function store(StorePacienteRequest $request) {
        $dados = $request->validated();
        $dados['nutricionista_id'] = $request->user()->id;

        $paciente = Paciente::create($dados);

        return response()->json([
            'success' => true,
            'paciente' => $paciente,
        ], 200);
    }

    public function show(Paciente $paciente) {
        return response()->json($paciente, 200);
    }

    public function update(UpdatePacienteRequest $request, Paciente $paciente) {
        return response()->json($paciente, 200);
        $dados = $request->validated();
        $paciente->update($dados);
    }
}
