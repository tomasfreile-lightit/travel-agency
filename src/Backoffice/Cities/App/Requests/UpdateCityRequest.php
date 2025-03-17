<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lightit\Backoffice\Cities\Domain\DataTransferObjects\CreateCityDTO;

final class UpdateCityRequest extends FormRequest
{
    public const NAME = 'name';

    public function rules(): array
    {
        return [
            self::NAME => [
                'required',
                'string',
                'max:255',
                Rule::unique('cities')->ignore($this->city),
            ],
        ];
    }

    public function toDto(): CreateCityDTO
    {
        return new CreateCityDTO(
            $this->string(self::NAME)->toString(),
        );
    }
}
