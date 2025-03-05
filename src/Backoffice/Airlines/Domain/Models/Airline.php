<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Lightit\Backoffice\Cities\Domain\Models\City;

/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int, City> $cities
 * @property-read int|null $cities_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline query()
 *
 * @property int                             $id
 * @property string                          $name
 * @property string                          $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Airline extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function cities(): BelongsToMany
    {
        return $this->belongsToMany(City::class);
    }
}
