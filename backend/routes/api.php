<?php

use App\Http\Controllers\Api\Account\AccountController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Category\CategoryController;
use App\Http\Controllers\Api\Expense\ExpenseController;
use App\Http\Middleware\AuthGates;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::prefix('global')->group(function () {
    Route::post('login', [LoginController::class, 'login'])->name('login');
    
});

Route::middleware(['auth:api', AuthGates::class])->group(function () {
    Route::post('logout', [LoginController::class, 'logout']);

    // account routes
    Route::post('account', [AccountController::class, 'store']);
    Route::get('account', [AccountController::class, 'getAll']);
    Route::get('account/{account}', [AccountController::class, 'accountDetails']);
    Route::delete('account/{account}', [AccountController::class, 'accountDelete']);
    Route::put('account/{account}', [AccountController::class, 'accountUpdate']);

    // category routes
    Route::resource('categories',CategoryController::class);
    // expense routes
    Route::resource('expenses', ExpenseController::class);
    // search expenses route
    Route::post('expenses/search', [ExpenseController::class,'searchByDate']);

});


