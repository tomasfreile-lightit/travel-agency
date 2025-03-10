<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\Domain\Actions;

use Lightit\Backoffice\Airlines\Domain\DataTransferObjects\CreateAirlineDTO;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;

final readonly class StoreAirlineAction
{
    public function execute(CreateAirlineDTO $data): Airline
    {
        return Airline::create([
            'name' => $data->name,
            'description' => $data->description,
        ]);
    }
}
