<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Support\Collection;

class CartRepository
{
    public function add(Product $product): int
    {
        \Cart::session(auth()->user()->id)->add(array(
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'quantity' => 1,
                'attributes' => [],
                'associatedModel' => $product,
        ));

        return $this->count();
    }

    public function delete(string $rowId): int
    {
        \Cart::session(auth()->user()->id)->remove($rowId);

        return $this->count();
    }

    public function content(): Collection
    {
        return \Cart::session(auth()->user()->id)
            ->getContent();
    }

    public function jsonOrderItems(): string
    {
        return $this
            ->content()
            ->map(function ($orderItem) {
                return [
                    'name' => $orderItem->name,
                    'quantity' => $orderItem->quantity,
                    'price' => $orderItem->price,
                ];
            })
            ->toJson();
    }

    public function count(): int
    {
        return $this->content()
            ->sum('quantity');//nombre de produits dans le panier vrai
    }

    public function total(): int
    {
        return \Cart::session(auth()->user()->id)
            ->getTotal();
    }


// creation de la methode clear


    public function clear()
    {
        \Cart::session(auth()->user()->id)->clear();
    }

    // private function getItem(int $id)
    // {
    //     return \Cart::session(auth()->user()->id)
    //         ->get($id);
    // }

    public function increase($rowId)
    {
        \Cart::session(auth()->user()->id)
        ->update($rowId, [
            'quantity' => +1,
        ]);
    }

    public function decrease(int $id)
    {
        $item = \Cart::session(auth()->user()->id)->get($id);

        if ($item->quantity === 1) {
            $this->remove($id);
            return ;
        }

        \Cart::session(auth()->user()->id)
            ->update($id, array(
                'quantity' => - 1
            ));
    }



    public function remove($id)
    {
        \Cart::session(auth()->user()->id)->remove($id);
    }
}
