<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemOpcaoTemplate extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'item_opcao_template';
}
