<template>
    <div>
        <button class="btn btn-danger" @click="handleDeleteWallet">Delete wallet</button>
        <!-- <p class="mb-0">{{ wal.wallet_name }}</p> -->
        <form @submit.prevent="handleSubmit" class="amount-form">
            <!-- amount -->
            <label for="amount" id="amount">{{ balanceText }}</label>
            <input type="number" required v-model="amount" />

            <!-- selector -->
            <select name="action-type" id="action-type" v-model="selected">
                <option selected disabled>Action</option>
                <option value="increase">Increase</option>
                <option value="decrease">Decrease</option>
            </select>

            <!-- button -->
            <div class="row">
                <div class="col-5">
                    <button>Update</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { deleteWallet } from '../../composables/wallet/wallet';
import { updateBalance } from '../../composables/balance/balance';

export default {
    setup() {
        const router = useRouter();
        const amount = ref(0);
        const selected = ref('Action');
        const balanceText = ref('Update balance');

        const handleDeleteWallet = async () => {
            await deleteWallet();
            await router.go({ name: 'Dashboard' });
        };

        const handleSubmit = async () => {
            let availableOptions = ['increase', 'decrease'];

            if (!availableOptions.includes(selected.value)) {
                return (balanceText.value = 'Please selected available action');
            }
            if (amount.value <= 0) {
                return (balanceText.value = 'Amount has to be more than 0');
            }

            const response = await updateBalance(amount.value, selected.value);
            console.log(response);

            response && router.go({ name: 'Dashboard' });
        };
        return { amount, selected, balanceText, handleSubmit, handleDeleteWallet };
    }
};
</script>

<style scoped>
.amount-form {
    margin: 40px auto;
    text-align: left;
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
    width: 30%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
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
.amount-form {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.amount-form select,
input {
    width: 150px;
    margin-top: 8px;
}

.col-5 button {
    width: 100px;
}
</style>
