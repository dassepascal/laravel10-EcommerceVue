
import './bootstrap';
import { createApp } from 'vue';
import AddToCart from './components/AddToCart.vue';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


const app = createApp();
app.component('AddToCart', AddToCart)
app.mount('#app');
