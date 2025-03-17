<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Lightit\Backoffice\Flights\Domain\Models\Flight;


/**
 * @extends Factory<Flight>
 */
class FlightFactory extends Factory
{
    protected $model = Flight::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws \DateMalformedStringException
     */
    public function definition(): array
    {
        $departure = fake()->dateTimeBetween('-1 year', 'now');
        $arrival = (clone $departure)->modify('+'.fake()->numberBetween(1, 24).' hours');

        return [
            'airline_id' => AirlineFactory::new(),
            'origin_city_id' => CityFactory::new(),
            'destination_city_id' => CityFactory::new(),
            'departure' => $departure,
            'arrival' => $arrival,

        ];
    }

}
