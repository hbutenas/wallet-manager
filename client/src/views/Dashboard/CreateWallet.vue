<template>
    <div class="create-wallet">
        <form @submit.prevent="handleSubmit">
            <p :class="[failedToCreateWallet ? 'wallet-text-error' : 'wallet-text']">{{ defaultText }}</p>
            <!-- wallet name -->
            <label for="wallet-name" id="wallet-name">Wallet name</label>
            <input type="text" required v-model="walletName" />
            <!-- starting balance -->
            <label for="starting-balance" id="starting-balance">Starting balance</label>
            <input type="number" required v-model="startingBalance" />
            <button>Create wallet</button>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createWallet } from '../../composables/wallet/wallet';
import { createBalance } from '../../composables/balance/balance';

export default {
    setup() {
        const walletName = ref('');
        const startingBalance = ref(0);
        const router = useRouter();
        const defaultText = ref('Create your first wallet and start tracking money!');
        const failedToCreateWallet = ref(false);
        const handleSubmit = async () => {
            if (walletName.value.trim() === '') {
                defaultText.value = 'Invalid wallet name provided';
                failedToCreateWallet.value = !failedToCreateWallet.value;
                return;
            }

            if (startingBalance.value <= 0) {
                defaultText.value = 'Balance has to be more than 0';
                failedToCreateWallet.value = !failedToCreateWallet.value;
                return;
            }

            const walletResponse = await createWallet(walletName.value);
            const balanceResponse = await createBalance(startingBalance.value);
            if (walletResponse.length > 0 && balanceResponse.length > 0) router.go({ name: 'Dashboard' });
            /// TODO else throw error...
        };
        return { walletName, failedToCreateWallet, defaultText, handleSubmit, startingBalance };
    }
};
</script>
<style scoped>
.create-wallet {
    background: red;
    max-width: 600px;
    margin: 150px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
label {
    color: #5a4fcf;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
input:focus {
    outline: none;
}
button {
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    background: #5a4fcf;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}
.wallet-text {
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    color: #483d8b;
}
.wallet-text-error {
    color: red;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: bold;
}
</style>
