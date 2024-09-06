<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opcao extends Model
{
    use HasFactory;
    protected $table = 'opcoes';

    public $timestamps = false;
    protected $fillable = [
        'nome',
        'refeicao_id',
    ];

    public function refeicao() {
        return $this->belongsTo(Refeicao::class);
    }

    public function item_opcao() {
        return $this->hasMany(ItemOpcao::class);
    }

    public function alimentos() {
        return $this->belongsToMany(Alimento::class, 'item_opcao', 'opcao_id', 'alimento_id')->withPivot('quantidade', 'medida_id', 'observacao');
    }
}
