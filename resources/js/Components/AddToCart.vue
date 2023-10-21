

<template>
    <div class="flex items-center justify-between py-4">
        <button class="bg-indigo-500 text-white p-2 rounded" v-on:click.prevent="addToCart">Ajouter au panier</button>

    </div>
</template>

<script setup>
import axios from 'axios';

const productId = defineProps(['productId']);
const addToCart = async () => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.get('/api/user')
        .then(async () => {
            //console.log(res)
       let response =axios.post('/api/products',{
productId: productId.value
            });
            console.log(response)
        })
        .catch((err) => { console.log(err) });
}


</script>
