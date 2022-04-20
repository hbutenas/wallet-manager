<template>
    <div class="container create-wallet" v-if="!wallet">
        <CreateWallet />
    </div>
    <div class="container display-wallet" v-else>
        <div class="row">
            <div class="col-4">
                <BalanceForm />
            </div>
            <div class="col-8">
                <Balance />
            </div>
        </div>
    </div>
</template>
<script>
import { onBeforeMount, ref } from 'vue';
import { getWallet } from '../../composables/wallet/wallet';
// import { getBalance } from '../../composables/balance/balance';

// Components
import CreateWallet from '../Dashboard/CreateWallet.vue';
import Balance from '../Balance/Balance.vue';
import BalanceForm from '../Balance/BalanceForm.vue';

export default {
    name: 'Dashboard',
    components: {
        CreateWallet,
        Balance,
        BalanceForm
    },
    setup() {
        const wallet = ref([]);
        onBeforeMount(async () => {
            wallet.value = await getWallet();
        });
        return { wallet };
    }
};
</script>

<style scoped>
.container.display-wallet {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: 100px auto;
}
.container.display-wallet .row {
    background: #dcdcdc;
}
</style>
