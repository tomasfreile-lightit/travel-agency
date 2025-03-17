<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;
use Lightit\Backoffice\Cities\App\Transformers\CityTransformer;

final class AirlineTransformer extends Transformer
{
    protected $load = [
        'cities' => CityTransformer::class,
    ];

    public function transform(Airline $airline): array
    {
        return [
            'id' => $airline->id,
            'name' => $airline->name,
            'description' => $airline->description,
            'number_of_flights' => $airline->flights()->count(),
        ];
    }
}
