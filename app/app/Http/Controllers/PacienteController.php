<?php

namespace App\Http\Controllers;

use App\Http\Requests\Paciente\StorePacienteRequest;
use App\Http\Requests\Paciente\UpdatePacienteRequest;
use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function index(Request $request) {
        $query = Paciente::query()
            ->where('nutricionista_id', $request->user()->nutricionista->id);

        if(!$request->has('limit')) {
            return response()->json([
                'success' => false,
                'message' => 'É obrigatório informar a quantidade de itens por página e o número da página'
            ]);
        }

        $query->limit($request->limit);

        $page = $request->page ?? 1;
        $query->offset(($page - 1) * $request->limit);

        foreach ($request->all() as $filtro => $valor) {

            if(str_contains('nome nome_responsavel sexo', $filtro)) {
                $query->where($filtro, 'ilike', '%' . $valor . '%');
            }

        }

        $pacientes = $query->orderBy('data_cadastro', 'desc')->get();

        return response()->json($pacientes, 200);
    }

    public function store(StorePacienteRequest $request) {
        $dados = $request->validated();
        $dados['nutricionista_id'] = $request->user()->nutricionista->id;

        $this->unmaskVariables($dados);

        $paciente = Paciente::create($dados);

        return response()->json([
            'success' => true,
            'paciente' => $paciente,
        ], 200);
    }

    private function unmaskVariables(&$dados) {
        $dados['telefone'] = str_replace('(', '', $dados['telefone']);
        $dados['telefone'] = str_replace(') ', '', $dados['telefone']);
        $dados['telefone'] = str_replace('-', '', $dados['telefone']);
    }
    public function show(Paciente $paciente) {
        return response()->json($paciente, 200);
    }

    public function update(UpdatePacienteRequest $request, Paciente $paciente) {
        if($request->user()->nutricionista->id !== $paciente->nutricionista_id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para editar esse paciente',
            ], 403);
        }

        $dados = $request->validated();
        $this->unmaskVariables($dados);
        $paciente->update($dados);

        return response()->json([
            'success' => true,
            'paciente' => $paciente,
        ]);
    }
}
