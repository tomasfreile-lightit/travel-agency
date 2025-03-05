<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;
use Lightit\Backoffice\Cities\Domain\Models\City;

/**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight query()
 *
 * @property-read Airline|null $airline
 * @property-read City|null $destinationCity
 * @property-read City|null $originCity
 * @property int                             $id
 * @property int                             $origin_city_id
 * @property int                             $destination_city_id
 * @property int                             $airline_id
 * @property string                          $departure
 * @property string                          $arrival
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereAirlineId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereArrival($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereDeparture($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereDestinationCityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereOriginCityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Flight whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Flight extends Model
{
    /**
     * @return BelongsTo<City, $this>
     */
    public function originCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'origin_city_id');
    }

    /**
     * @return BelongsTo<City, $this>
     */
    public function destinationCity(): BelongsTo
    {
        return $this->belongsTo(City::class, 'destination_city_id');
    }

    /**
     * @return BelongsTo<Airline, $this>
     */
    public function airline(): BelongsTo
    {
        return $this->belongsTo(Airline::class);
    }
}
