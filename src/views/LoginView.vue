<script setup>
import { ref, reactive, onMounted } from 'vue'

const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const birthday = ref("");


const login = () => {
    name.value = "";
    surname.value = "";
    email.value = "";
    password.value = "";
    birthday.value = "";
}

onMounted(() => {
    console.log("%c Добро пожаловать в консоль) ", "color: green; font-size: 20px;");
});

</script>

<template>
    <section class="login">
        <div class="login__box">
            <div class="login-title">
                Let's join us
            </div>
            <form @submit.prevent="login"
                class="login__form">
                <div class="login__form-box">
                    <label for="name"
                        class="login__form-item">
                        <h3 class="login__form-title">Name</h3>
                        <input v-model="name"
                            id="name"
                            required
                            placeholder="Name"
                            type="text"
                            class="login__form-input">
                    </label>
                    <label for="surname"
                        class="login__form-item">
                        <h3 class="login__form-title">Surname <span>(Unnecessary)</span></h3>
                        <input v-model="surname"
                            id="surname"
                            placeholder="Surname"
                            type="text"
                            class="login__form-input">
                    </label>
                </div>
                <label for="email"
                    class="login__form-item">
                    <h3 class="login__form-title">Email</h3>
                    <input v-model="email"
                        id="email"
                        required
                        placeholder="Email"
                        type="text"
                        class="login__form-input w-full">
                </label>
                <label for="password"
                    class="login__form-item">
                    <h3 class="login__form-title">Password</h3>
                    <input v-model="password"
                        id="password"
                        required
                        placeholder="Password"
                        type="password"
                        class="login__form-input w-full">
                </label>
                <label for="birthday"
                    class="login__form-item">
                    <h3 class="login__form-title">Birthday</h3>
                    <input v-model="birthday"
                        id="birthday"
                        required
                        type="date"
                        class="login__form-input w-full">
                </label>
                <button class="login__form-btn">Sign Up</button>
            </form>
        </div>
    </section>
</template>

<style lang="scss" scoped>
$light-primary-bg: #f0f2f5;
$light-primary: #ffffff;
$light-btn: #D83F87;
// #2A1B3D
// #44318D
// #E98074
// #A4B3B6
$light-btn-hover: #a70d55;
$light-gray: #dadde1;
$light-text: #141313;


.w-full {
    width: 100%;
}

.login {
    width: 100%;
    height: 100vh;
    background-color: $light-primary-bg;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 470px) {
        background-color: $light-primary;
    }

    &__box {
        max-width: 440px;
        width: 100%;
        padding: 36px 0px 12px;
        background-color: $light-primary;
        border: 1px solid $light-gray;

        @media (min-width: 470px) {
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
        }

        @media (max-width: 470px) {
            border: none;
            max-width: 100%;
        }
    }

    &-title {
        text-align: center;
        font-size: 24px;
        text-transform: uppercase;
        padding-bottom: 16px;
        border-bottom: 1px solid $light-gray;
        letter-spacing: 1.4px;
    }

    &__form {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (max-width: 400px) {
            padding: 24px 18px;
        }

        &-title {
            font-size: 16px;
            color: $light-text;

            display: flex;
            align-items: center;
            gap: 6px;

            span {
                font-size: 12px;
                color: $light-gray;
            }
        }

        &-box {
            display: flex;
            gap: 8px;
        }

        &-input {
            margin-top: 6px;
            display: block;
            padding: 12px 16px;
            border: 1px solid $light-gray;
            border-radius: 6px;

            &::placeholder {
                color: $light-gray;
            }

            &:focus {
                box-shadow: 0 0 4px 1px rgba(42, 27, 61, 0.1);
            }
        }

        &-btn {
            cursor: pointer;
            margin-top: 12px;
            padding: 10px 24px 11px;
            border-radius: 10px;
            background-color: $light-btn;
            font-size: 20px;
            font-weight: 600;
            color: $light-primary;
            box-shadow: 0px 2px 10px 1px rgba(233, 128, 116, 0.8);
            transition: .3s all;

            @media (min-width: 576px) {

                &:hover {
                    transition: .3s all;
                    background-color: $light-btn-hover;
                }
            }
        }
    }

}
</style>

<style>
/* body {

#D83F87

#2A1B3D

#44318D

#E98074

#A4B3B6

} */
</style>