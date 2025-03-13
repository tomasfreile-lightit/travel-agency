<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\App\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lightit\Backoffice\Flights\Domain\DataTransferObjects\CreateFlightDTO;

final class StoreFlightRequest extends FormRequest
{
    public const ORIGIN = 'originCityId';

    public const DESTINATION = 'destinationCityId';

    public const DEPARTURE_DATE = 'departure';

    public const ARRIVAL_DATE = 'arrival';

    public const AIRLINE = 'airlineId';

    public function rules(): array
    {
        return [
            self::ORIGIN => ['required', 'integer', Rule::exists('cities', 'id')],
            self::DESTINATION => ['required', 'integer', Rule::exists('cities', 'id')],
            self::DEPARTURE_DATE => ['required', 'date'],
            self::ARRIVAL_DATE => ['required', 'date'],
            self::AIRLINE => ['required', 'integer', Rule::exists('airlines', 'id')],
        ];
    }

    public function toDto(): CreateFlightDTO
    {
        return new CreateFlightDTO(
            $this->integer(self::ORIGIN),
            $this->integer(self::DESTINATION),
            $this->string(self::DEPARTURE_DATE)->toString(),
            $this->string(self::ARRIVAL_DATE)->toString(),
            $this->integer(self::AIRLINE),
        );
    }
}
