<?php

namespace App\Http\Controllers;

use App\Models\ItemOpcao;
use App\Models\Opcao;
use Illuminate\Http\Request;

class ItemOpcaoController extends Controller
{
    public static function create(Request | array $dados_item_opcao, Opcao $opcao) : void {
        $newItemOpcao = new ItemOpcao();
        $newItemOpcao->opcao_id = $opcao->id;
        $newItemOpcao->alimento_id = $dados_item_opcao['alimento_id'];
        $newItemOpcao->medida_id = $dados_item_opcao['medida_id'];
        $newItemOpcao->quantidade = $dados_item_opcao['quantidade'];
        $newItemOpcao->observacao = $dados_item_opcao['observacao'] ?? null;
        $newItemOpcao->save();
    }
}
