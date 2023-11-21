<?php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::inRandomOrder()
            ->whereActive(true)
            ->take(16)
            ->get();

        return view('products.index', compact('products'));
    }
    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }
    public function search()
    {
        $search = request()->input('search');
        $products = Product::where('name', 'like', "%$search%")
            ->orWhere('description', 'like', "%$search%")
            ->paginate(9);

        return view('products.search', compact('products'));
    }
    // public function category($slug)
    // {
    //     $category = Category::whereSlug($slug)->firstOrFail();
    //     $products = $category->products()->paginate(9);

    //     return view('products.category', compact('category', 'products'));
    // }
    public function create()
    {
        return view('products.create');
    }
}
