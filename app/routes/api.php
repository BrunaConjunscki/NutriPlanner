<?php

use App\Http\Controllers\AlimentoController;
use App\Http\Controllers\AnamneseTemplateController;
use App\Http\Controllers\AntropometriaController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\DietaController;
use App\Http\Controllers\DietaTemplateController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\UserController;
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

            Route::prefix('/{consulta}/antropometrias')->controller(AntropometriaController::class)->group(function () {
                Route::get('/', 'index');
                Route::post('/', 'store');
            });
        });

        Route::prefix('/{paciente}/dietas')->controller(DietaController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{dieta}', 'show');
            Route::put('/{dieta}', 'update');
        });
    });

    Route::prefix('/alimentos')->controller(AlimentoController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{alimento}', 'show');
        Route::put('/{alimento}', 'update');
    });

    Route::prefix('/dieta_template')->controller(DietaTemplateController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{dieta_template}', 'show');
    });

    Route::prefix('/anamnese_template')->controller(AnamneseTemplateController::class)->group(function () {
        Route::post('/', 'store');
        Route::get('/', 'index');
        Route::get('/{anamnese_template}', 'show');
        Route::put('/{anamnese_template}', 'update');
    });

    Route::prefix('/user')->controller(UserController::class)->group(function () {
        Route::get('/', 'show');
    });

});

require __DIR__.'/auth.php';

