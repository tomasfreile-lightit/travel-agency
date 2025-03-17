<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Flights\App\Transformers\FlightTransformer;
use Lightit\Backoffice\Flights\Domain\Models\Flight;

final class GetFlightController extends Controller
{
    public function __invoke(
        Flight $flight,
    ): JsonResponse {
        return responder()
            ->success($flight, FlightTransformer::class)
            ->respond();
    }
}
