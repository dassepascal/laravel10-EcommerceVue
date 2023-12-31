<?php

use App\Http\Controllers\Api\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Route::get('/products', function(Request $request) {
    //     return [
    //         'products' => $request->user()->cart->products
    //     ];

    // });

    // placer la route count au-dessus de products sinon il va prendre products/{product} comme étant le count
    Route::get('cart/increase/{id}', [CartController::class, 'increase']);
    Route::get('cart/decrease/{id}', [CartController::class, 'decrease']);


    Route::get('cart/count', [CartController::class, 'count'])->name('cart.count');
   Route::apiResource('cart', CartController::class);
});
