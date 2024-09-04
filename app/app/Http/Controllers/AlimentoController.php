<?php

namespace App\Http\Controllers;

use App\Http\Requests\Alimento\StoreAlimentoRequest;
use App\Http\Requests\Alimento\UpdateAlimentoRequest;
use App\Models\Alimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Nette\Utils\Random;

class AlimentoController extends Controller
{
    public function index(Request $request) {
        $query = Alimento::query()
            ->with(['preparo', 'categoria'])
            ->where(function ($query) use ($request) {
                $query->where('nutricionista_id', $request->user()->nutricionista->id)
                    ->orWhere('nutricionista_id', null);
            });

        if($request->has('nome')) {
            $query->where('descricao', 'ilike', '%'.$request->nome.'%');
        }

        $alimentos = $query->get();

        return response()->json([$alimentos]);
    }

    public function store(StoreAlimentoRequest $request) {
        $dados = $request->validated();
        $dados['nutricionista_id'] = $request->user()->nutricionista->id;
        $dados['codigo'] = 0;

        $alimento = $this->atualizaDados($dados, new Alimento());

        return response()->json([
            'success' => true,
            'alimento' => $alimento->load('preparo', 'categoria', 'nutrientes'),
        ]);
    }

    public function update(UpdateAlimentoRequest $request, Alimento $alimento) {
        $dados = $request->validated();
        $alimento = $this->atualizaDados($dados, $alimento);

        return response()->json([
            'success' => true,
            'alimento' => $alimento->load('preparo', 'categoria', 'nutrientes'),
        ]);

    }

    private function atualizaDados(array $validated_request, Alimento $alimento) {
        $alimento = Alimento::updateOrCreate(
            ['id' => $alimento->id],
            $validated_request
        );

        $map = [];
        foreach ($validated_request['nutrientes'] as $nutriente) {
            $map[$nutriente['nutriente_id']] = ['quantidade' => $nutriente['quantidade']];
        }

        $alimento->nutrientes()->sync($map);

        return $alimento;
    }

    public function show(Alimento $alimento) {
        if($alimento->nutricionista_id === Auth::user()->nutricionista->id || $alimento->nutricionista_id === null) {
            return response()->json([
                'success' => true,
                'alimento' => $alimento->load('preparo', 'categoria', 'nutrientes'),
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Você não possui permissão para visualizar este alimento.',
        ], 403);
    }
}
