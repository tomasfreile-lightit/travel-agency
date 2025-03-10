<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\Domain\Actions;

use Lightit\Backoffice\Cities\Domain\DataTransferObjects\CreateCityDTO;
use Lightit\Backoffice\Cities\Domain\Models\City;

final readonly class UpdateCityAction
{
    public function execute(City $city, CreateCityDTO $data): City
    {
        $city->update([
            'name' => $data->name,
        ]);

        return $city;
    }
}
