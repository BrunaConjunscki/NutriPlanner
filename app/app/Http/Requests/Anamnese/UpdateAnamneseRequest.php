<?php

namespace App\Http\Requests\Anamnese;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnamneseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->anamnese_template->nutricionista_id === $this->user()->nutricionista->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => ['required', 'string'],
            'conteudo' => ['required'],
        ];
    }

    public function messages(): array {
        return [
            'required' => 'o campo :attribute é obrigatório',
        ];
    }
}
