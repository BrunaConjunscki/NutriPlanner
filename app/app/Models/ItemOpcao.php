<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemOpcao extends Model
{
    use HasFactory;
    protected $table = 'item_opcao';
    public $timestamps = false;

    public function alimento() {
        return $this->belongsTo(Alimento::class);
    }

    public function medida() {
        return $this->belongsTo(Medida::class);
    }

}
