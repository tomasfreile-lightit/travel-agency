<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Flights\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Flights\Domain\Models\Flight;

final class DeleteFlightController extends Controller
{
    public function __invoke(Flight $flight): JsonResponse
    {
        $flight->delete();

        return responder()
            ->success()
            ->respond();
    }
}
