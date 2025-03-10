<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\Domain\Actions;

use Illuminate\Database\Eloquent\Collection;
use Lightit\Backoffice\Cities\Domain\Models\City;
use Spatie\QueryBuilder\QueryBuilder;

final readonly class ListCitiesAction
{
    public function execute(): Collection
    {
        return QueryBuilder::for(City::class)
            ->allowedFilters(['name'])
            ->allowedSorts(['name'])
            ->get();
    }
}
