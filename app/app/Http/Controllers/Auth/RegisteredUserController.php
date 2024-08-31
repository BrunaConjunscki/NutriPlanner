<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Nutricionista;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'confirmed', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', /*'confirmed',*/ Rules\Password::defaults()],
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        $nutricionista = Nutricionista::create([
            'nome' => $request->name,
            'user_id' => $user->id,
//            'crn' => $request->crn,
        ]);

        event(new Registered($user));


        return response()->json([
            'success' => true,
            'message' => 'Usuário cadastrado com sucesso.',
            'nutricionista' => $nutricionista,
            'user' => $user,
        ], 200);
    }
}
