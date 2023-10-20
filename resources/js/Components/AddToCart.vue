<template>
    <div class='flex items-center justify-between py-4'>
        <button class="bg-indigo-500 text-white p-2" v-on:click.prevent="addToCart">Ajouter au panier</button>

    </div>
</template>

<script setup>

const addToCart = ()=>
console.log('add to cart');


//import axios from 'axios';
//import useProduct from '../composables/products/index.js';
//destructuration
//const {add} = useProduct();

//const productId = defineProps(['productId']);

// const addToCart = async() => {
//     await axios.get('/sanctum/csrf-cookie');
//     await axios.get('/api/user')
//         .then(async(res) => {

//         console.log(res);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//}
</script>
