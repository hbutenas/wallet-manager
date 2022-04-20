<template>
    <div class="row">
        <div class="col-4 text-header mt-1">
            <p>Action</p>
        </div>
        <div class="col-4 text-header mt-1">
            <p>Amount</p>
        </div>
        <div class="col-4 text-header mt-1">
            <p>Balance</p>
        </div>
        <div class="row balance-content">
            <div class="row balance-content" v-for="bal in balance" :key="bal.balance_id">
                <!-- action -->
                <div class="col-4 text-balance">
                    <div :class="bal.action === 'decrease' ? 'balance-action text-danger mb-2' : 'balance-action text-success mb-2'">
                        {{ bal.action }}
                    </div>
                </div>
                <!-- amount -->
                <div class="col-4 text-balance">
                    <div :class="bal.action === 'decrease' ? 'balance-action text-danger mb-2' : 'balance-action text-success mb-2'">
                        {{ bal.action === 'decrease' ? `-${bal.amount}` : `+${bal.amount}` }}
                    </div>
                </div>
                <!-- balance -->
                <div class="col-4 text-balance">
                    <div class="balance-action">{{ bal.total_balance }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBalance } from '../../composables/balance/balance';
import { onBeforeMount, ref } from 'vue';

export default {
    setup() {
        const balance = ref([]);

        onBeforeMount(async () => {
            balance.value = await getBalance();
        });

        return { balance };
    }
};
</script>

<style scoped>
.col-4.text-header {
    color: #746cc0;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    text-align: center;
}
.col-4.wallet-name {
    font-size: 1em;
    color: #746cc0;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
.row.balance-content {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
}
.col-4.text-balance {
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    text-align: center;
}
</style>
