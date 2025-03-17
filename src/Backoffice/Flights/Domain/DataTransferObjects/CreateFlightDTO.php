<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\Domain\DataTransferObjects;

final readonly class CreateFlightDTO
{
    public function __construct(
        public int $originCityId,
        public int $destinationCityId,
        public string $departure,
        public string $arrival,
        public int $airlineId,
    ) {
    }
}
