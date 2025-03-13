<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\Domain\Actions;

use Illuminate\Pagination\LengthAwarePaginator;
use Lightit\Backoffice\Flights\Domain\Models\Flight;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final readonly class ListFlightsAction
{
    /**
     * @return LengthAwarePaginator<Flight>
     */
    public function execute(int $pageSize = 10): LengthAwarePaginator
    {
        /** @var LengthAwarePaginator<Flight> $flights */

        $flights = QueryBuilder::for(Flight::class)
            ->allowedFilters([
                AllowedFilter::exact('originCityId'),
                AllowedFilter::exact('destinationCityId'),
                AllowedFilter::exact('airlineId'),
                AllowedFilter::exact('departure'),
                AllowedFilter::exact('arrival'),
            ])
            ->allowedSorts([
                'departure',
                'arrival',
            ])
            ->paginate($pageSize);

        return $flights;
    }
}
