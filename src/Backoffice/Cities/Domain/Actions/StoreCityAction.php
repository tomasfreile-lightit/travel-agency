<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\Domain\Actions;

use Lightit\Backoffice\Cities\Domain\DataTransferObjects\CreateCityDTO;
use Lightit\Backoffice\Cities\Domain\Models\City;

final readonly class StoreCityAction
{
    public function execute(CreateCityDTO $data): City
    {
        return City::create([
            'name' => $data->name,
        ]);
    }
}
