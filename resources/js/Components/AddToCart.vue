

<template>
    <div class="flex items-center justify-between py-4">
        <button class="bg-indigo-500 text-white p-2 rounded" v-on:click.prevent="addToCart">Ajouter au panier</button>

    </div>
</template>

<script setup>
import axios from 'axios';
import useProduct from '@/composables/products';
import useEventBus from'../eventbus.js';
const { add } = useProduct();
const productId = defineProps(['productId']);
const { emit} = useEventBus();
const addToCart = async () => {

    await axios.get('/sanctum/csrf-cookie');
    await axios.get('/api/user')
        .then(async () => {
            // recuperation du cartCount
           let cartCount = await add(productId);
           console.log('addtocart',cartCount)
            // mise a jour du cartCount
        emit('cartCountUpdated', cartCount);
            console.log('emit ',cartCount)
        })
        .catch ((err) => { console.log(err) });
};
</script>
