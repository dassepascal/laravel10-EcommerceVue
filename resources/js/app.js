
import './bootstrap';
import { createApp } from 'vue';
import AddToCart from './Components/AddToCart.vue';
import NavbarCart from './Components/NavbarCart.vue';
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();
const app = createApp();
app.component('AddToCart', AddToCart);
app.component('NavbarCart',NavbarCart);
app.mount('#app');
