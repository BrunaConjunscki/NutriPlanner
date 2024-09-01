<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Alimento extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function preparo() {
        return $this->belongsTo(Preparo::class);
    }

    public function categoria() {
        return $this->belongsTo(Categoria::class);
    }

    public function nutrientes() {
        return $this->belongsToMany(Nutriente::class)->withPivot(['quantidade']);
    }

}
