<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\Domain\Actions;

use Illuminate\Pagination\LengthAwarePaginator;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;
use Lightit\Backoffice\Cities\Domain\Models\City;
use Spatie\QueryBuilder\QueryBuilder;

final readonly class ListAirlineAction
{
    /**
     * @return LengthAwarePaginator<Airline>
     */
    public function execute(int $pageSize = 10): LengthAwarePaginator
    {
        /** @var LengthAwarePaginator<Airline> $airlines */

        $airlines = QueryBuilder::for(Airline::class)
            ->allowedFilters(['name', 'description'])
            ->allowedSorts(['name', 'description'])
            ->paginate($pageSize);

        return $airlines;
    }
}
