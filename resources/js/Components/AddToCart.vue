

<template>
    <div class="flex items-center justify-between py-4">
        <button class="bg-indigo-500 text-white p-2 rounded" v-on:click.prevent="addToCart">Ajouter au panier</button>

    </div>

    <ComponentA />
</template>

<script setup>
import axios from 'axios';
import useProduct from '@/composables/products';
import { defineProps } from 'vue';
import EventBus from '@/EventBus';
//import ComponentA from '@/components/ComponentA.vue';

const { add } = useProduct();
const productId = defineProps(['productId']);




//dd(productId)
const addToCart = async () => {

    await axios.get('/sanctum/csrf-cookie');
    await axios.get('/api/user')
        .then(async () => {
            // recuperation du cartCount
           let cartCount = await add(productId);
          EventBus.emit('cartCountUpdated', cartCount);
         console.log(cartCount)
        })


        .catch ((err) => { console.log(err) });
};


</script>
