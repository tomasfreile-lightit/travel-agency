<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Backoffice\Airlines\Domain\Actions\ListAirlineAction;

final class ListAirlineController extends Controller
{
    public function __invoke(
        ListAirlineAction $action,
    ): JsonResponse {
        $airlines = $action->execute();

        return responder()
            ->success($airlines, AirlineTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
