<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\Domain\Actions;

use Lightit\Backoffice\Airlines\Domain\Models\Airline;

final readonly class DeleteAirlineAction
{
    public function execute(Airline $airline): void
    {
        $airline->delete();
    }
}
