<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lightit\Backoffice\Airlines\Domain\DataTransferObjects\CreateAirlineDTO;

final class UpdateAirlineRequest extends FormRequest
{
    public const NAME = 'name';

    public const DESCRIPTION = 'description';

    public function rules(): array
    {
        return [
            self::NAME => [
                'required',
                'string',
                'max:255',
                Rule::unique('airlines')->ignore($this->city),
            ],
            self::DESCRIPTION => ['required', 'string', 'max:255'],
        ];
    }

    public function toDto(): CreateAirlineDTO
    {
        return new CreateAirlineDTO(
            $this->string(self::NAME)->toString(),
            $this->string(self::DESCRIPTION)->toString(),
        );
    }
}
