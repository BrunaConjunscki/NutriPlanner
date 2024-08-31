<?php

namespace App\Http\Requests\Paciente;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePacienteRequest extends FormRequest
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
            'nome' => ['required', 'string'],
            'sexo' => ['required', 'string', 'size:1', 'regex:/^[F|M]+$/'],
            'data_nascimento' => ['required', 'date', 'before_or_equal:today'],
            'nome_responsavel' => [Rule::requiredIf(Carbon::parse($this->data_nascimento)->age < 18), 'string'],
            'anamnese' => ['required', 'string'],
            'objetivo' => ['required', 'string'],
            'email' => ['required', 'unique:pacientes' ,'email:rfc,dns'],
            'telefone' => ['nullable', 'string', 'unique:pacientes'],
        ];
    }
}
