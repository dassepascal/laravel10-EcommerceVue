import { ref } from "vue";

export default function useStripe() {

    const elements = ref(null);
    const stripe = ref(null);

    const initialise = async () => {
        // on appelle directement notre clé publis Stripe depuis notre fichier .env

         stripe.value = Stripe(import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY);

        const clientSecret = await axios.post('/paymentIntent')
            .then(response => response.data.clientSecret)
            .catch(error => console.log(error));

        elements.value = stripe.value.elements({ clientSecret });

        const paymentElement = elements.value.create("payment");
        paymentElement.mount("#payment-element");
    }

    const checkStatus = async () => {
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        const { paymentIntent } = await stripe.value.retrievePaymentIntent(clientSecret);

        switch (paymentIntent.status) {
            case "succeeded":
                showMessage("Payment succeeded!");
                await registerOrder();
                window.location = '/thankyou';
                break;
            case "processing":
                showMessage("Your payment is processing.");
                break;
            case "requires_payment_method":
                showMessage("Your payment was not successful, please try again.");
                break;
            default:
                showMessage("Something went wrong.");
                break;
        }


    }
    /**
    * UI Helpers
    */
    const showMessage = (messageText) => {
        const messageContainer = document.querySelector("#payment-message");

        messageContainer.classList.remove("hidden");
        messageContainer.textContent = messageText;

        setTimeout(function () {
            messageContainer.classList.add("hidden");
            messageText.textContent = "";
        }, 4000);
    }

    const setLoading = (isLoading) => {
        if (isLoading) {
            // Disable the button and show a spinner
            document.querySelector("#submit").disabled = true;
            document.querySelector("#spinner").classList.remove("hidden");
            document.querySelector("#button-text").classList.add("hidden");
        } else {
            document.querySelector("#submit").disabled = false;
            document.querySelector("#spinner").classList.add("hidden");
            document.querySelector("#button-text").classList.remove("hidden");
        }
    }

    return {
        initialise,
        checkStatus,

    }

}

