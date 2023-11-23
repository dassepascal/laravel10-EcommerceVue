import { ref } from "vue";

export default function useStripe() {

    const elements = ref(null);

    const initialise = async () => {
        // on appelle directement notre clé publis Stripe depuis notre fichier .env

        const stripe = Stripe(process.env.MIX_STRIPE_TEST_PUBLIC_KEY);

        const clientSecret = axios.post('/paymentIntent')
            .then(response => console.log(response))
            .catch(error => console.log(error));

            elements.value = stripe.elements({ clientSecret });

            const paymentElement = elements.value.create("payment", paymentElementOptions);
                 paymentElement.mount("#payment-element");
               }

        return {
            initialise,
            elements,
            
        }

    }

