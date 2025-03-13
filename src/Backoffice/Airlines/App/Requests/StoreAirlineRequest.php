<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lightit\Backoffice\Airlines\Domain\DataTransferObjects\CreateAirlineDTO;

final class StoreAirlineRequest extends FormRequest
{
    public const NAME = 'name';

    public const DESCRIPTION = 'description';

    public const CITIES = 'cities';

    public function rules(): array
    {
        return [
            self::NAME => ['required', 'string', 'max:255', Rule::unique('airlines')],
            self::DESCRIPTION => ['required', 'string', 'max:255'],
            self::CITIES => ['required', 'array'],
            self::CITIES . '.*' => ['integer', 'exists:cities,id'],
        ];
    }

    public function toDto(): CreateAirlineDTO
    {
        return new CreateAirlineDTO(
            $this->string(self::NAME)->toString(),
            $this->string(self::DESCRIPTION)->toString(),
            $this->array(self::CITIES),
        );
    }
}
