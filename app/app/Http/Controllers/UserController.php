<?php

namespace App\Http\Controllers;


class UserController extends Controller
{
    public function show() {
        $user = auth()->user()->load('nutricionista');

        return response()->json([
            'usuario' => $user,
        ]);
    }
}
