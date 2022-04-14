<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <p class="error-message" v-if="failedToLogin">Username or password incorrect</p>

            <!-- username -->
            <label for="username" id="username">Username</label>
            <input type="text" required v-model="username" />

            <!-- password -->
            <label for="username" id="password">Password</label>
            <input type="password" required v-model="password" />

            <!-- buttons -->
            <div class="row">
                <div class="col-6 sign-in">
                    <div>
                        <button>Sign in</button>
                    </div>
                </div>
                <div class="col-6 actions">
                    <div class="row">
                        <div>
                            <router-link :to="{ name: 'Register' }">Register now</router-link>
                        </div>
                        <div>
                            <router-link :to="{ name: 'Forgot' }">Forgot password?</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginValidation } from '../composables/auth/loginValidation';
export default {
    name: 'Home',
    components: {},
    setup() {
        const router = useRouter();
        let username = ref('');
        let password = ref('');
        let failedToLogin = ref(false);

        const handleSubmit = async () => {
            const response = await loginValidation(username.value, password.value);

            // invalid username or password
            if (!response) return (failedToLogin = true);

            // redirecting to dashboard
            await router.push({ name: 'Dashboard' });
        };

        return { username, password, failedToLogin, handleSubmit };
    }
};
</script>

<style scoped>
/* mobile */
@media only screen and (max-width: 600px) {
    * {
        background: red;
    }
}

/* desktop */
form {
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

.col-6.actions {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}

.col-6.actions div {
    display: flex;
    justify-content: flex-end;
}
.col-6.actions span,
a {
    color: #746cc0;
    background: none;
    font-size: 0.7em;
    text-decoration: none;
}
</style>
