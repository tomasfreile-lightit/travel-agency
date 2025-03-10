<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;
use Lightit\Backoffice\Flights\Domain\Models\Flight;

/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Airline> $airlines
 * @property-read int|null $airlines_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City query()
 *
 * @property int                             $id
 * @property string                          $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereUpdatedAt($value)
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Flight> $incomingFlights
 * @property-read int|null $incoming_flights_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Flight> $outgoingFlights
 * @property-read int|null $outgoing_flights_count
 *
 * @mixin \Eloquent
 */
final class City extends Model
{
    protected $guarded = ['id'];

    /**
     * @return BelongsToMany<Airline, $this>
     */
    public function airlines(): BelongsToMany
    {
        return $this->belongsToMany(Airline::class);
    }

    /**
     * @return HasMany<Flight, $this>
     */
    public function incomingFlights(): HasMany
    {
        return $this->hasMany(Flight::class, 'destination_city_id');
    }

    /**
     * @return HasMany<Flight, $this>
     */
    public function outgoingFlights(): HasMany
    {
        return $this->hasMany(Flight::class, 'origin_city_id');
    }
}
