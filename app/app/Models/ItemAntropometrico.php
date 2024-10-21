<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemAntropometrico extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'itens_antropometricos';
    protected $fillable = [
        'descricao',
        'unidade_medida_completa',
        'unidade_medida_abreviada',
    ];
}
