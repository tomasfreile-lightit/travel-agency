<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\Domain\DataTransferObjects;

final readonly class CreateCityDTO
{
    public function __construct(
        public string $name,
    ) {
    }
}
