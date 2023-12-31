import { ref } from 'vue';

export default function useProduct() {
    //const count = ref(0);
    const products = ref([]);
    const cartCount = ref(0); // nombre de produits dans le panier

    // methode pour recuperer les produits

    const getProducts = async () => {

        let response = await axios.get('/api/cart');

        products.value = response.data.cartContent;

        cartCount.value = response.data.cartCount;
    }

    const add = async (productId) => {
        let response = await axios.post('/api/cart', {
            productId: productId
        });

        return response.data.count;
    }

    // methode
    const getCount = async () => {

        let response = await axios.get('/api/cart/count');

        return response.data.count;
    }

    const increaseQuantity = async (id) => {
        await axios.get('/api/cart/increase/' + id);
    }


    const decreaseQuantity = async (id) => {
        await axios.get('/api/cart/decrease/' + id);



    }
    const destroyProduct = async (id) => {

        await axios.delete('api/cart/' + id);

    }


    return {
        add,
        getCount,
        getProducts,
        products,
        increaseQuantity,
        decreaseQuantity,
        destroyProduct,
        cartCount

    }
}

