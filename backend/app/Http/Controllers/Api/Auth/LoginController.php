<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\Auth\LoginResource;
use App\Http\Resources\Auth\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\Common\RespondsWithHttpStatus;

class LoginController extends Controller
{
    use RespondsWithHttpStatus;
    /**
     * Login apo
     * 
     * @param LoginRequest $request
     * @return JsonResponse
     */ 
    public function login(LoginRequest $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $token = $user->createToken($user->email)->accessToken;
            if($user){
                $result = [
                    'tokenType' => 'Bearer',
                    'token' => $token,
                    'user' => new UserResource($user)
                ];
                return $this->success(_('Login Successfully'),new LoginResource($result));
            }
        }

        return $this->failure(_('Login Failure'),Response::HTTP_UNAUTHORIZED);
    }

    /**
     * logout
     * 
     * @return JsonResponse
     */

     public function logout(): JsonResponse
     {
         $user = auth()->user();
         if (!$user) {
             return $this->failure(_('User not authenticated'), Response::HTTP_UNAUTHORIZED);
         }
     
         $user->tokens()->delete();
         return $this->success(_('Logout Successfully and token deleted'));
     }
}
