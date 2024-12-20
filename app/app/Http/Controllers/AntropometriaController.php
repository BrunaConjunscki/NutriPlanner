<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use App\Models\Paciente;
use Illuminate\Http\Request;

class AntropometriaController extends Controller
{
    public function store(Request $request, Paciente $paciente, Consulta $consulta) {
        if($paciente->nutricionista_id !== $request->user()->nutricionista->id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para realizar uma antropometria nesse paciente.'
            ]);
        }


        $consulta->antropometria = $request->antropometria;
        $consulta->save();
//        foreach($request->all() as $item_antropometrico) {
//            $consulta->antropometria()->attach($item_antropometrico['item_antropometrico_id'], ['valor' => $item_antropometrico['valor']]);
//        }


        return response()->json($paciente);
    }

    public function show(Paciente $paciente, $consulta) {
        if($paciente->nutricionista_id !== auth()->user()->nutricionista->id) {
            return response()->json([
                'success' => false,
                'message' => 'Você não possui permissão para realizar uma antropometria nesse paciente.'
            ], 403);
        }


        if($consulta === '0') {
            $antropometria = Consulta::where('paciente_id', $paciente->id)
                ->orderBy('id', 'desc')
                ->first();
            return response()->json($antropometria);
        }

        $consulta = Consulta::find($consulta);

        return response()->json($consulta);
    }
}
