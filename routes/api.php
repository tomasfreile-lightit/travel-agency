<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Lightit\Backoffice\Users\App\Controllers\{
    DeleteUserController, GetUserController, ListUserController, StoreUserController
};
use Lightit\Backoffice\Airlines\App\Controllers\{
    DeleteAirlineController, GetAirlineController, ListAirlineController, StoreAirlineController, UpdateAirlineController
};
use Lightit\Backoffice\Cities\App\Controllers\{
    DeleteCityController, GetCityController, ListCitiesController, StoreCityController, UpdateCityController
};
use Lightit\Backoffice\Flights\App\Controllers\DeleteFlightController;
use Lightit\Backoffice\Flights\App\Controllers\GetFlightController;
use Lightit\Backoffice\Flights\App\Controllers\ListFlightsController;
use Lightit\Backoffice\Flights\App\Controllers\StoreFlightController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Users Routes
|--------------------------------------------------------------------------
*/
Route::prefix('users')
    ->middleware([])
    ->group(static function () {
        Route::get('/', ListUserController::class);
        Route::get('/{user}', GetUserController::class);
        Route::post('/', StoreUserController::class);
        Route::delete('/{user}', DeleteUserController::class);
    });


/*
|--------------------------------------------------------------------------
| Flights Routes
|--------------------------------------------------------------------------
*/
Route::prefix('flights')
    ->middleware([])
    ->group(static function () {
        Route::get('/', ListFlightsController::class);
        Route::post('/', StoreFlightController::class);
        Route::prefix('{flight}')
            ->group(static function () {
                Route::get('/', GetFlightController::class);
                Route::delete('/', DeleteFlightController::class);
            });
    });


/*
|--------------------------------------------------------------------------
| Airlines Routes
|--------------------------------------------------------------------------
*/
Route::prefix('cities')
    ->middleware([])
    ->group(static function () {
        Route::get('/', ListCitiesController::class);
        Route::post('/', StoreCityController::class);
        Route::prefix('{city}')
            ->group(static function () {
                Route::get('/', GetCityController::class);
                Route::put('/', UpdateCityController::class);
                Route::delete('/', DeleteCityController::class);
            });
    });

/*
|--------------------------------------------------------------------------
| Airlines Routes
|--------------------------------------------------------------------------
*/
Route::prefix('airlines')
    ->middleware([])
    ->group(static function () {
        Route::get('/', ListAirlineController::class);
        Route::post('/', StoreAirlineController::class);
        Route::prefix('{airline}')
            ->group(static function () {
                Route::get('/', GetAirlineController::class);
                Route::put('/', UpdateAirlineController::class);
                Route::delete('/', DeleteAirlineController::class);
            });
    });
