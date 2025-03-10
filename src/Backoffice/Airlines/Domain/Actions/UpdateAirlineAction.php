<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\Domain\Actions;

use Lightit\Backoffice\Airlines\Domain\DataTransferObjects\CreateAirlineDTO;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;

final readonly class UpdateAirlineAction
{
    public function execute(Airline $airline, CreateAirlineDTO $data): Airline
    {
        $airline->update([
            'name' => $data->name,
            'description' => $data->description,
        ]);

        return $airline;
    }
}
