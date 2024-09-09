<?php

namespace App\Http\Controllers;

use App\Models\ItemOpcaoTemplate;
use App\Models\OpcaoTemplate;
use Illuminate\Http\Request;

class ItemOpcaoTemplateController extends Controller
{
    public static function create(Request | array $dados_item_opcao, OpcaoTemplate $opcao) : void {
        $newItemOpcao = new ItemOpcaoTemplate();
        $newItemOpcao->opcao_template_id = $opcao->id;
        $newItemOpcao->alimento_id = $dados_item_opcao['alimento_id'];
        $newItemOpcao->medida_id = $dados_item_opcao['medida_id'];
        $newItemOpcao->quantidade = $dados_item_opcao['quantidade'];
        $newItemOpcao->observacao = $dados_item_opcao['observacao'] ?? null;
        $newItemOpcao->save();
    }
}
