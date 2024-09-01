<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'nutricionista_id',
        'paciente_id',
    ];
    protected $with = ['paciente'];

    public function paciente() {
        return $this->belongsTo(Paciente::class);
    }

    public function nutricionista() {
        return $this->belongsTo(Nutricionista::class);
    }
}
