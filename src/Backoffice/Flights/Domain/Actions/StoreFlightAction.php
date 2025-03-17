<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\Domain\Actions;

use Lightit\Backoffice\Flights\Domain\DataTransferObjects\CreateFlightDTO;
use Lightit\Backoffice\Flights\Domain\Models\Flight;

final readonly class StoreFlightAction
{
    public function execute(CreateFlightDTO $data): Flight
    {
        $flight = Flight::create([
            'origin_city_id' => $data->originCityId,
            'destination_city_id' => $data->destinationCityId,
            'departure' => $data->departure,
            'arrival' => $data->arrival,
            'airline_id' => $data->airlineId,
        ]);


        return $flight->load('airline');
    }
}
