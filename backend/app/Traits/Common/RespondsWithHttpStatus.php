<?php

namespace App\Traits\Common;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\Response;

trait RespondsWithHttpStatus
{
    protected function success($message, $result = [], $status = Response::HTTP_OK): JsonResponse
    {
        $response = [
            'success' => true,
            'message' => $message
        ];

        if($this->isResultNotEmpty($result)) {
            $response['result'] = $result;
        }
        return response()->json($response, $status);
    }

    protected function failure($error, $code = Response::HTTP_NOT_FOUND): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $this->errorMessage($error),
        ];
        if ($this->hasErrors($error)) {
            $response['errors'] = $error;
        }
        return response()->json($response, $code);
    }

    protected function isResultNotEmpty($result)
    {
        if (isset($result['tokenType'])) {
            return true;
        }
        if (empty($result)) {
            return false;
        }
        if (isset($result['data']) && $result['data']->count() <= 0 ) {
            return false;
        }
        if (!isset($result['data']) && !isset($result['tokenType']) && $result instanceof Collection && $result->count() <= 0) {
            return false;
        }
        return $result;
    }

    protected function hasErrors($error): bool
    {
        if (!empty($error) && (is_array($error) || is_object($error))) {
            return true;
        }
        return false;
    }

    protected function errorMessage($error)
    {
        return (!is_array($error) && !is_object($error)) ? $error : __('The given data was invalid.');
    }
}
