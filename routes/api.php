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
        Route::get('/{user}', GetUserController::class)->withTrashed();
        Route::post('/', StoreUserController::class);
        Route::delete('/{user}', DeleteUserController::class);
    });


/*
|--------------------------------------------------------------------------
| Flights Routes
|--------------------------------------------------------------------------
*/
//Route::prefix('flights')
//    ->middleware([])
//    ->group(static function () {
//        Route::get('/', ListFlightController::class);
//        Route::get('/{flight}', GetFlightController::class)->withTrashed();
//        Route::post('/', StoreFlightController::class);
//        Route::put('/{flight}', UpdateFlightController::class);
//        Route::delete('/{flight}', DeleteFlightController::class);
//    });
//

/*
|--------------------------------------------------------------------------
| Airlines Routes
|--------------------------------------------------------------------------
*/
Route::prefix('cities')
    ->middleware([])
    ->group(static function () {
        Route::get('/', ListCitiesController::class);
        Route::get('/{city}', GetCityController::class)->withTrashed();
        Route::post('/', StoreCityController::class);
        Route::put('/{city}', UpdateCityController::class);
        Route::delete('/{city}', DeleteCityController::class);
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
        Route::get('/{airline}', GetAirlineController::class)->withTrashed();
        Route::post('/', StoreAirlineController::class);
        Route::put('/{airline}', UpdateAirlineController::class);
        Route::delete('/{airline}', DeleteAirlineController::class);
    });
