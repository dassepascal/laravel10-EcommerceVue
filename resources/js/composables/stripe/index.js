import { ref } from "vue";

export default function useStripe() {

    const elements = ref(null);

    const initialise = async () => {
        // on appelle directement notre clé publis Stripe depuis notre fichier .env

        const stripe = Stripe(import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY);

        const clientSecret = await axios.post('/paymentIntent')
            .then(response => response.data.clientSecret)
            .catch(error => console.log(error));

            elements.value = stripe.elements({ clientSecret });

            const paymentElement = elements.value.create("payment");
                 paymentElement.mount("#payment-element");
               }

        return {
            initialise,


        }

    }

