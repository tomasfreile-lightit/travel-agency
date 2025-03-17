<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Cities\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Lightit\Backoffice\Cities\Domain\Actions\DeleteCityAction;
use Lightit\Backoffice\Cities\Domain\Models\City;

final class DeleteCityController extends Controller
{
    public function __invoke(
        City $city,
        DeleteCityAction $action,
    ): JsonResponse {
        $action->execute($city);

        return responder()
            ->success()
            ->respond();
    }
}
