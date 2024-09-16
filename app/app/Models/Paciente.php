<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'nome',
        'sexo',
        'data_nascimento',
        'anamnese',
        'tipo_paciente',
        'objetivo',
        'tipo_paciente',
        'email',
        'telefone',
        'nutricionista_id',
    ];

    public function dietas() {
        return $this->hasMany(Dieta::class);
    }
}
