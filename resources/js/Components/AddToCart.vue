

<template>
    <div class="flex items-center justify-between py-4">
        <button class="bg-indigo-500 text-white p-2 rounded" v-on:click.prevent="addToCart">Ajouter au panier</button>

    </div>
</template>

<script setup>
import axios from 'axios';
import useProduct from '@/composables/products';
import Emitter from 'pico-emitter';

const { add } = useProduct();
const productId = defineProps(['productId']);

const emitter = new Emitter();


//dd(productId)
const addToCart = async () => {

    await axios.get('/sanctum/csrf-cookie');
    await axios.get('/api/user')
        .then(async () => {
            // recuperation du cartCount
           let cartCount = await add(productId);
           emitter.emit('cartCountUpdated', cartCount);
         console.log(cartCount)
        })


        .catch ((err) => { console.log(err) });
};


</script>
