

<template>
    <div class="flex items-center justify-between py-4">
        <button class="bg-indigo-500 text-white p-2 rounded" v-on:click.prevent="addToCart">Ajouter au panier</button>

    </div>

    <ComponentA />
</template>

<script setup>
import { inject } from 'vue';
import axios from 'axios';
import useProduct from '@/composables/products';
import useEventBus from '../eventBus.js';
const { add } = useProduct();
const toast = inject('toast');
const productId = defineProps(['productId']);
const { emit } = useEventBus();
const addToCart = async () => {

    await axios.get('/sanctum/csrf-cookie');
    await axios.get('/api/user')
        .then(async (res) => {
            console.log('res',res)
            // recuperation du cartCount
            let cartCount = await add(productId);
            emit('cartCountUpdated', cartCount);
            toast.success('Produit ajouté au panier');
        })
        .catch(() => {
            toast.error('Merci de vous connecter pour ajouter un produit.') });
};
</script>

