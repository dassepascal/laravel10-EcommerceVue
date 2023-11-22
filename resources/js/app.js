
import './bootstrap';
import  Toaster  from '@meforma/vue-toaster';
import { createApp } from 'vue';
import AddToCart from './Components/AddToCart.vue';
import NavbarCart from './Components/NavbarCart.vue';
import ShoppingCart from './Components/ShoppingCart.vue';
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();
const app = createApp();

app.use(Toaster).provide('toast', app.config.globalProperties.$toast);

app.component('AddToCart', AddToCart);

app.component('NavbarCart',NavbarCart);

app.component('ShoppingCart', ShoppingCart);

app.mount('#app');



