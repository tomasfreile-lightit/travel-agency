<?php

declare(strict_types=1);

namespace Database\Seeders;

use Database\Factories\AirlineFactory;
use Database\Factories\CityFactory;
use Illuminate\Database\Seeder;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;
use Lightit\Backoffice\Cities\Domain\Models\City;

class AirlineSeeder extends Seeder
{
    public function run(): void
    {
        AirlineFactory::new()->count(5)->create();
    }
}
