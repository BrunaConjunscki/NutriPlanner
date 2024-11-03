<?php

namespace App\Http\Requests\Paciente;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePacienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->nutricionista->id === $this->paciente->nutricionista_id;
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
            'sexo' => ['required', 'string', 'size:1', 'regex:/^[F|M]+$/'],
            'tipo_paciente' => ['requied', 'string'],
            'data_nascimento' => ['required', 'date', 'before_or_equal:today'],
            'tipo_paciente' => ['required', 'string'],
            'nome_responsavel' => [Rule::requiredIf(Carbon::parse($this->data_nascimento)->age < 18), 'string'],
            'anamnese' => ['string'],
            'objetivo' => ['required', 'string'],
            'email' => ['nullable', 'email:rfc,dns'],
            'telefone' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatorio.',
            'string' => 'O campo :attribute deve ser do tipo texto.',
            'date' => 'O campo :attribute deve ser uma data valida.',
            'before_or_equal' => 'O campo :attribute deve possuir uma data anterior a data de hoje.',
            'nome_responsavel.required' => 'O campo nome do responsável é obrigatório para pacientes com menos de 18 anos.'
        ];
    }
}
