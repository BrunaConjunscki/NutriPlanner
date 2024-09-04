<?php

namespace App\Http\Requests\Alimento;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlimentoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'descricao' => ['required', 'string'],
            'categoria_id' => ['required', 'exists:categorias,id'],
            'preparo_id' => ['required', 'exists:preparos,id'],
            'nutrientes' => ['required', 'array'],
            'nutrientes.*.nutriente_id' => ['required', 'exists:nutrientes,id'],
            'nutrientes.*.quantidade' => ['required']
        ];
    }

    public function messages(): array {
        return [
            'required' => 'O campo :attribute é obrigatório',
        ];
    }
}
