<?php

declare(strict_types=1);

namespace Database\Seeders;

use Database\Factories\FlightFactory;
use Illuminate\Database\Seeder;
use Lightit\Backoffice\Flights\Domain\Models\Flight;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;
use Lightit\Backoffice\Cities\Domain\Models\City;

class FlightSeeder extends Seeder
{
    public function run(): void
    {
        $airlines = Airline::all();
        $cities = City::all();

        FlightFactory::new()
            ->count(20)
            ->make()
            ->each(function (Flight $flight) use ($airlines, $cities) {
                $flight->airline_id = $airlines->random()->id;
                $flight->origin_city_id = $cities->random()->id;
                $flight->destination_city_id = $cities->random()->id;

                while ($flight->origin_city_id === $flight->destination_city_id) {
                    $flight->destination_city_id = $cities->random()->id;
                }

                $flight->save();
            });
    }
}
