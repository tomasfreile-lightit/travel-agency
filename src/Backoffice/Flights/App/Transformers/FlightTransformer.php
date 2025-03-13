<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Backoffice\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Backoffice\Cities\App\Transformers\CityTransformer;
use Lightit\Backoffice\Flights\Domain\Models\Flight;

final class FlightTransformer extends Transformer
{
    protected $load = [
        'originCity' => CityTransformer::class,
        'destinationCity' => CityTransformer::class,
        'airline' => AirlineTransformer::class,
    ];

    public function transform(Flight $flight): array
    {
        return [
            'id' => $flight->id,
            'departure' => $flight->departure,
            'arrival' => $flight->arrival,
        ];
    }
}
