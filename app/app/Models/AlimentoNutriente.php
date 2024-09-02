<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class AlimentoNutriente extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $visible = ['food_id','nutrient_id','nutrients'];
    protected $table = 'alimento_nutriente';

    public function nutrients():BelongsToMany
    {
        return $this->belongsToMany(Nutriente::class);
    }
    public function foods(): BelongsToMany
   {
       return $this->belongsToMany(Alimento::class);
   }

}
