<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthGates
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // $user = Auth::user();

        // foreach ($user->roles as $role) {
        //     foreach ($role->permissions as $permission) {
        //         Gate::define(
        //             $permission->title,
        //             function (User $user) {
        //                 return true;
        //             }
        //         );
        //     }
        // }

        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return $next($request);
    }
}
