<?php
namespace App\Repositories;

use Cart;
use App\Models\Product;

class CartRepository{
    public function add(Product $product)
    {
        \Cart::session(auth()->user()->id)->add([
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'quantity' => 1,
            'attributes' => [],
            'associatedModel' => $product
        ]);
    }
    public function content()
    {
        return \Cart::session(auth()->user()->id)->getContent();
    }

    public function count(){
        //si plusieur fois le meme panier il va additionner  les quantité donc on fait une somme avec sum
        return $this->content()->sum('quantity');
    }
}
