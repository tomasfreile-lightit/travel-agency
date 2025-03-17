<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Backoffice\Cities\Domain\Models\City;

final class CityTransformer extends Transformer
{
    public function transform(City $city): array
    {
        return [
            'id' => $city->id,
            'name' => $city->name,
            'incoming_flights' => $city->incomingFlights()->count(),
            'outgoing_flights' => $city->outgoingFlights()->count(),
        ];
    }
}
