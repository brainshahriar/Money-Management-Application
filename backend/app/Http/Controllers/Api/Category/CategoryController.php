<?php

namespace App\Http\Controllers\Api\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category\Category;
use App\Traits\Common\RespondsWithHttpStatus;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    use RespondsWithHttpStatus;
    /**
     * list of categories.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories =  Category::all();
        return $this->success(__('Category Lists'), CategoryResource::collection($categories));
    }

    /**
     * store newly created resource in database
     * 
     * @param CategoryRequest $request
     * @return JsonResponse
     */
    public function store(CategoryRequest $request): JsonResponse
    {
        $data = $request->only([
            'category_name',
            'category_type',
            'icon',
            'color'
        ]);
        $categories = Category::create($data);
        return $this->success(__('Category Created Successfully'), new CategoryResource($categories), Response::HTTP_CREATED);
    }

    /**
     * 
     * get category details
     * 
     * @param Account $account
     * @return JsonResponse
     */
    public function show(Category $category): JsonResponse
    {
        return $this->success('Category Details', new CategoryResource($category), Response::HTTP_OK);
    }

    /**
     * 
     * update accounts details
     * 
     * @param Category $category
     * @param CategoryUpdateRequest $request
     * @return JsonResponse
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        $data = $request->only([
            'category_name',
            'icon',
            'color',
        ]);
        $category->update($data);
        $category = $category->fresh();
        return $this->success(__('Category Updated Successfully'), new CategoryResource($category), Response::HTTP_OK);
    }

    /**
     * 
     * delete category details
     * 
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Category $category): JsonResponse
    {
        $result = $category->delete();
        if ($result) {
            return $this->success(__('Category Deleted Successfully'));
        }
        return $this->failure(__('Category Deleted Failurefully'));
    }
}
