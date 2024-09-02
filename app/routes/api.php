<?php

use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\PacienteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/pacientes')->controller(PacienteController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{paciente}', 'show');
        Route::put('/{paciente}', 'update');

        Route::prefix('/{paciente}/consultas')->controller(ConsultaController::class)->group(function () {
            Route::post('/', 'store');
            Route::get('/{consulta}', 'show');
            Route::get('/', 'index');
        });

        Route::prefix('/{paciente}/dietas')->controller(\App\Http\Controllers\DietaController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{dieta}', 'show');
        });
    });
});

Route::get('/addPacientes', function() {
//    $nutricionista = \App\Models\Nutricionista::create([
//        'nome' => 'Nutricionista',
//        'login' => 'nutricionista',
//        'email' => 'nutrcionista@gmail.com',
//        'senha' => 'nutricionista',
//    ]);

    $pacientes = [];
    for($i = 0; $i < 20; $i++) {
        $pacientes[] = \App\Models\Paciente::create([
           'nome' => Str::random(10),
           'sexo' => 'F',
           'data_nascimento' => '2002-03-29',
           'anamnese' => Str::random(20),
           'objetivo' => 'Massa Muscular',
           'email' => Str::random(10).'@gmail.com',
           'telefone' => '9999999' . $i,
           'nutricionista_id' => 3,
       ]);
    }

    return response()->json([
//        'nutricionista' => $nutricionista,
        'pacientes' => $pacientes,
    ]);


});

require __DIR__.'/auth.php';

