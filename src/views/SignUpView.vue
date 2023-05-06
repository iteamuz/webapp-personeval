<script>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, minLength, email } from '@vuelidate/validators'

export default {
    setup() {
        const formData = reactive({
            name: '',
            sername: '',
            username: '',
            email: '',
            password: '',
            // birthday: '',
        })


        const signup = async () => {
            if (!v$.email.email.$invalid && !v$.username.minLengthValue.$invalid && !v$.password.minLengthValue.$invalid) {
                try {
                    const response = await axios.post('http://cb40778.tw1.ru/api/register', formData);
                    console.log(response.data);
                    formData.value = {
                        name: '',
                        sername: '',
                        username: '',
                        email: '',
                        password: '',
                        // birthday: '',
                    };
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const rules = {
            name: { required },
            password: {
                required,
                minLengthValue: minLength(8),
            },
            username: {
                required,
                minLengthValue: minLength(4),
            },
            email: { required, email }
        }

        const v$ = useVuelidate(rules, formData)

        onMounted(() => {
            console.log("%c Добро пожаловать в консоль) ", "color: green; font-size: 20px;");
        });

        return { formData, v$, signup }
    }
}





</script>

<template>
    <section class="signup">
        <div class="signup-wrapper">
            <div class="signup__box">
                <div class="signup-title">
                    Let's join us
                </div>
                <form @submit.prevent="signup"
                    class="signup__form">
                    <div class="signup__form-box">
                        <label for="name"
                            class="signup__form-item">
                            <h3 class="signup__form-title">Name</h3>
                            <input v-model="formData.name"
                                id="name"
                                required
                                placeholder="Name"
                                type="text"
                                :class="{ 'required-input': v$.name.required.$invalid }"
                                class="signup__form-input">
                            <div class="invalid-feedback required-feedback"
                                v-if="v$.name.required.$invalid">
                                {{ v$.name.required.$message }}
                            </div>
                            <!-- <pre>
                                {{ v$.name }}
                            </pre> -->
                        </label>
                        <label for="surname"
                            class="signup__form-item">
                            <h3 class="signup__form-title">Surname <span>(Unnecessary)</span></h3>
                            <input v-model="formData.sername"
                                id="surname"
                                placeholder="Surname"
                                type="text"
                                class="signup__form-input">
                        </label>
                    </div>
                    <label for="username"
                        class="signup__form-item w-full">
                        <h3 class="signup__form-title">Username <span>(come of with nickname)</span></h3>
                        <input v-model="formData.username"
                            id="username"
                            required
                            placeholder="Username"
                            type="text"
                            :class="{
                                error: v$.username.minLengthValue.$invalid,
                                'required-input': v$.username.required.$invalid
                            }"
                            class="signup__form-input">
                        <div class="invalid-feedback required-feedback"
                            v-if="v$.username.required.$invalid">
                            {{ v$.username.required.$message }}
                        </div>
                        <div class="invalid-feedback"
                            v-if="v$.username.minLengthValue.$invalid">
                            {{ v$.username.minLengthValue.$message }}
                        </div>
                    </label>
                    <!-- <pre>
                                {{ v$.username }}
                            </pre> -->
                    <label for="email"
                        class="signup__form-item w-full">
                        <h3 class="signup__form-title">Email</h3>
                        <input v-model="formData.email"
                            id="email"
                            required
                            placeholder="Email"
                            type="email"
                            class="signup__form-input"
                            :class="{
                                error: v$.email.email.$invalid,
                                'required-input': v$.email.required.$invalid
                            }">
                        <div class="invalid-feedback required-feedback"
                            v-if="v$.email.required.$invalid">
                            {{ v$.email.required.$message }}
                        </div>
                        <div class="invalid-feedback"
                            v-if="v$.email.email.$invalid">
                            {{ v$.email.email.$message }}
                        </div>
                        <!-- <pre>
                                {{ v$.email }}
                            </pre> -->
                    </label>
                    <label for="password"
                        class="signup__form-item w-full">
                        <h3 class="signup__form-title">Password</h3>
                        <input v-model="formData.password"
                            id="password"
                            required
                            placeholder="Password"
                            type="password"
                            :class="{
                                error: v$.password.minLengthValue.$invalid,
                                'required-input': v$.password.required.$invalid
                            }"
                            class="signup__form-input">
                        <div class="invalid-feedback required-feedback"
                            v-if="v$.password.required.$invalid">
                            {{ v$.password.required.$message }}
                        </div>
                        <div class="invalid-feedback"
                            v-if="v$.password.minLengthValue.$invalid">
                            {{ v$.password.minLengthValue.$message }}
                        </div>
                        <!-- <pre> {{ v$.password }}</pre> -->
                    </label>
                    <!-- <label for="birthday"
                        class="signup__form-item w-full">
                        <h3 class="signup__form-title">Birthday</h3>
                        <input v-model="formData.birthday"
                            id="birthday"
                            required
                            type="date"
                            class="signup__form-input">
                    </label> -->
                    <button class="signup__form-btn">Sign Up</button>
                </form>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
$light-primary-bg: #f0f2f5;

body {
    background-color: $light-primary-bg !important;
}
</style>

<style lang="scss" scoped>
$light-primary-bg: #f0f2f5;
$light-primary: #ffffff;
// $light-btn: #D83F87;
$light-btn: #2acd00;
// #2A1B3D
// #44318D
// #E98074
// #A4B3B6
// $light-btn-hover: #a70d55;
$light-btn-hover: #1e8803;
$light-gray: #dadde1;
$light-text: #181818;


.w-full {
    width: 100% !important;
}

.signup {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;

    @media (max-width: 470px) {
        background-color: $light-primary;
    }

    &-wrapper {
        padding: 140px 0px;
        width: 100%;
        background: transparent;

        @media (max-width: 576px) {
            padding: 100px 0px;
        }
    }

    &__box {
        margin: auto;
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
        gap: 28px;

        @media (max-width: 400px) {
            padding: 24px 18px;
        }

        .invalid-feedback {
            margin-top: 4px;
            margin-left: 4px;
            font-size: 10px;
            position: absolute;
            color: $light-text ;
        }

        .required-feedback {
            display: none;
        }

        .required-input {
            &:focus {
                border-color: #dc3545;
                box-shadow: 0 0 1px 1px #dc3545;
            }
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
            flex-wrap: wrap;
        }

        &-item {
            width: calc(50% - 4px);
        }

        &-input {
            margin-top: 6px;
            padding: 12px 16px;
            border: 1px solid $light-gray;
            border-radius: 6px;
            font-size: 16px;
            width: 100%;

            &::placeholder {
                color: $light-gray;
            }

            &:focus {
                border-color: #2acd00;
                box-shadow: 0 0 1px 1px #2acd00;
            }

            &:focus+div {
                display: block;
            }

            &.error {
                border-color: #dc3545;
                box-shadow: 0 0 1px 1px #dc3545;
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
            // box-shadow: 0px 2px 10px 1px rgba(233, 128, 116, 0.8);
            box-shadow: 0px 2px 10px 1px rgba(41, 205, 0, 0.8);
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