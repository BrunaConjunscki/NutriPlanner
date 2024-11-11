<?php

namespace App\Http\Requests\Dieta;

use Illuminate\Foundation\Http\FormRequest;

class StoreDietaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->paciente->nutricionista_id === $this->user()->nutricionista->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
//            'nome' => ['required'],
//            'refeicoes.*.nome' => ['required', 'string'],
//            'refeicoes.*.horario' => ['required', 'date_format:H:i'],
//            'refeicoes.*.opcoes.*.nome' => ['required', 'string'],
//            'refeicoes.*.opcoes.*.alimentos.*.alimento_id' => ['required', 'integer', 'exists:alimentos,id'],
//            'refeicoes.*.opcoes.*.alimentos.*.medida_id' => ['required', 'integer', 'exists:medidas,id'],
//            'refeicoes.*.opcoes.*.alimentos.*.quantidade' => ['required', 'decimal:0,3'],
//            'refeicoes.*.opcoes.*.alimentos.*.observacao' => ['string'],
            'dieta' => 'required',
        ];
    }

    public function messages() {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string' => 'O campo :attribute deve ser do tipo texto.',
            'date_format' => 'O campo horario deve ser do tipo Hora:Minuto',
            'integer' => 'O campo :attribute deve ser um número inteiro.',
            'decimal' => 'O campo quantidade deve um número com, no máximo 3 casas decimais.',
        ];
    }
}
