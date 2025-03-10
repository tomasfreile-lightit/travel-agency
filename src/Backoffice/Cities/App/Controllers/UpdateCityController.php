<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Cities\App\Requests\UpdateCityRequest;
use Lightit\Backoffice\Cities\App\Transformers\CityTransformer;
use Lightit\Backoffice\Cities\Domain\Actions\UpdateCityAction;
use Lightit\Backoffice\Cities\Domain\Models\City;

final class UpdateCityController extends Controller
{
    public function __invoke(
        City $city,
        UpdateCityRequest $request,
        UpdateCityAction $action,
    ): JsonResponse {
        $updatedCity = $action->execute($city, $request->toDto());

        return responder()
            ->success($updatedCity, CityTransformer::class)
            ->respond();
    }
}
