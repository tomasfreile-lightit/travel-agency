<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Airlines\App\Requests\UpdateAirlineRequest;
use Lightit\Backoffice\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Backoffice\Airlines\Domain\Actions\UpdateAirlineAction;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;

final class UpdateAirlineController extends Controller
{
    public function __invoke(
        Airline $airline,
        UpdateAirlineRequest $request,
        UpdateAirlineAction $action,
    ): JsonResponse {
        $updatedAirline = $action->execute($airline, $request->toDto());

        return responder()
            ->success($updatedAirline, AirlineTransformer::class)
            ->respond();
    }
}
