<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DietaTemplate extends Model
{
    use HasFactory;

    protected $table = 'dieta_templates';

    public $timestamps = false;
}
