<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Airlines\App\Requests\StoreAirlineRequest;
use Lightit\Backoffice\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Backoffice\Airlines\Domain\Actions\StoreAirlineAction;

final class StoreAirlineController extends Controller
{
    public function __invoke(
        StoreAirlineRequest $request,
        StoreAirlineAction $action,
    ): JsonResponse {
        $airline = $action->execute($request->toDto());

        return responder()
            ->success($airline, AirlineTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
