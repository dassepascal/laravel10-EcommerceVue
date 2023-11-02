

<template>
    <div class="flex items-center justify-between py-4">
        <button class="bg-indigo-500 text-white p-2 rounded" v-on:click.prevent="addToCart">Ajouter au panier</button>

    </div>
</template>

<script setup>
import axios from 'axios';
import useProduct from '@/composables/products';
import mitt from 'mitt';

const { add } = useProduct();
const productId = defineProps(['productId']);

const emitter = mitt();


// fire an event
emitter.emit('foo', { a: 'b' })

//dd(productId)
const addToCart = async () => {

    await axios.get('/sanctum/csrf-cookie');
    await axios.get('/api/user')
        .then(async () => {
            // recuperation du cartCount
           let cartCount = await add(productId);
           console.log('addtocart',cartCount)
            // mise a jour du cartCount
          EventBus.emit('cartCountUpdated', cartCount);

        })




        .catch ((err) => { console.log(err) });
};


</script>
