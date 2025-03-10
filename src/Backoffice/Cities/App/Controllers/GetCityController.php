<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Cities\App\Transformers\CityTransformer;
use Lightit\Backoffice\Cities\Domain\Models\City;

final class GetCityController extends Controller
{
    public function __invoke(
        City $city,
    ): JsonResponse {
        return responder()
            ->success($city, CityTransformer::class)
            ->respond();
    }
}
