<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Airlines\Domain\Models\Airline;

final class DeleteAirlineController extends Controller
{
    public function __invoke(Airline $airline): JsonResponse
    {
        $airline->delete();

        return responder()
            ->success()
            ->respond();
    }
}
