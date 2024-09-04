<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refeicao extends Model
{
    use HasFactory;
    protected $table = 'refeicoes';
    public $timestamps = false;

    protected $fillable = [
        'nome',
        'horario',
    ];

    public function opcoes() {
        return $this->hasMany(Opcao::class);
    }
}
