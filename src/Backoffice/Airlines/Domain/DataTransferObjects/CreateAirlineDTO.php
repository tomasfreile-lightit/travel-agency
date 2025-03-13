<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\Domain\DataTransferObjects;

final readonly class CreateAirlineDTO
{
    public function __construct(
        public string $name,
        public string $description,
        public array $cities = [],
    ) {
    }
}
