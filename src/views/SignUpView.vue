<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import eyeIcon from '@/components/icons/EyeIcon.vue'
import eyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'



// VARIABLES
const router = useRouter()

const formData = reactive({
    name: '',
    sername: '',
    username: '',
    email: '',
    password: '',
    // birthday: '',
})

const userNameInput = ref(null);
const emailInput = ref(null);

const formErrors = reactive({
    username: '',
    email: '',
});

const showPassword = ref(false);

const rules = {
    name: {
        required,
        minLengthValue: minLength(3),
    },
    password: {
        required,
        minLengthValue: minLength(8),
    },
    username: {
        required,
        minLengthValue: minLength(4),
    },
    email: {
        required,
        email
    }
}



// FUNCTIONS

const changeShowPassword = () => {
    showPassword.value = !showPassword.value
};

const focusInput = (refName) => {
    refName.value.focus()
};

const signUp = async () => {
    if (!v$.value.email.email.$invalid && !v$.value.name.minLengthValue.$invalid && !v$.value.username.minLengthValue.$invalid && !v$.value.password.minLengthValue.$invalid) {
        try {
            const response = await axios.post('http://cb40778.tw1.ru/api/register', formData);
            if (response.data.success == true) {
                localStorage.setItem('token', response.data.token)
                console.log(localStorage.getItem('token'));
                for (let key in formData) {
                    formData[key] = '';
                }
                auth()
            } else {
                let data = response.data;
                if (data.code == 57) {
                    formErrors.username = data.message;
                    formData.username = ''
                    focusInput(userNameInput)
                } else if (data.code == 60) {
                    formErrors.email = data.message;
                    formData.email = ''
                    focusInput(emailInput)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
};



const auth = async () => {
    let authItem = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }
    try {
        const res = await axios.get('http://cb40778.tw1.ru/api/user', authItem);
        if (res.statusText == 'OK') {
            router.push('/')
        }
    } catch (error) {
        console.log(error);
    }
}

const v$ = useVuelidate(rules, formData)

onMounted(() => {
    console.log("%c Добро пожаловать в консоль) ", "color: blue; line-height: 60px; font-size: 20px;");
});



</script>

<template>
    <div @click="router.push('/')">sadasd</div>
    <section class="signup">
        <div class="signup-wrapper">
            <div class="signup__box">
                <div class="signup-title">
                    Let's join us
                </div>
                <form @submit.prevent="signUp"
                    class="signup__form">
                    <div class="signup__form-box">
                        <label for="name"
                            class="signup__form-item">
                            <h3 class="signup__form-title">Name</h3>
                            <input v-model="formData.name"
                                id="name"
                                required
                                autocomplete="off"
                                placeholder="Name"
                                maxlength="30"
                                type="text"
                                :class="{
                                    error: v$.name.minLengthValue.$invalid,
                                    'required-input': v$.name.required.$invalid
                                }"
                                class="signup__form-input">
                            <div class="input-errors">
                                <span class="invalid-feedback required-feedback"
                                    v-if="v$.name.required.$invalid">
                                    {{ v$.name.required.$message }}.
                                </span>
                                <span class="invalid-feedback"
                                    v-if="v$.name.minLengthValue.$invalid">
                                    {{ v$.name.minLengthValue.$message }}.
                                </span>
                            </div>
                        </label>
                        <label for="surname"
                            class="signup__form-item">
                            <h3 class="signup__form-title">Surname <span>(unnecessary)</span></h3>
                            <input v-model="formData.sername"
                                id="surname"
                                autocomplete="off"
                                maxlength="30"
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
                            maxlength="35"
                            type="text"
                            ref="userNameInput"
                            :class="{
                                error: v$.username.minLengthValue.$invalid,
                                'required-input': v$.username.required.$invalid
                            }"
                            class="signup__form-input">
                        <div class="input-errors">
                            <span class="invalid-feedback required-feedback"
                                v-if="v$.username.required.$invalid">
                                {{ v$.username.required.$message }}.
                            </span>
                            <span class="invalid-feedback "
                                v-if="formErrors.username.length && !formData.username.length">
                                {{ formErrors.username }}
                            </span>
                            <span class="invalid-feedback"
                                v-if="v$.username.minLengthValue.$invalid">
                                {{ v$.username.minLengthValue.$message }}.
                            </span>
                        </div>
                    </label>
                    <label for="email"
                        class="signup__form-item w-full">
                        <h3 class="signup__form-title">Email</h3>
                        <input v-model="formData.email"
                            id="email"
                            required
                            placeholder="Email"
                            maxlength="35"
                            type="email"
                            ref="emailInput"
                            class="signup__form-input"
                            :class="{
                                error: v$.email.email.$invalid,
                                'required-input': v$.email.required.$invalid
                            }">
                        <div class="input-errors">
                            <div class="invalid-feedback required-feedback"
                                v-if="v$.email.required.$invalid">
                                {{ v$.email.required.$message }}.
                            </div>
                            <span class="invalid-feedback "
                                v-if="formErrors.email.length && !formData.email.length">
                                {{ formErrors.email }}
                            </span>
                            <div class="invalid-feedback"
                                v-if="v$.email.email.$invalid">
                                {{ v$.email.email.$message }}.
                            </div>
                        </div>
                    </label>
                    <label for="password"
                        class="signup__form-item w-full">
                        <h3 class="signup__form-title">Password</h3>
                        <div class="signup__form-password password">
                            <input v-model="formData.password"
                                id="password"
                                required
                                maxlength="35"
                                placeholder="Password"
                                :type="showPassword ? 'text' : 'password'"
                                :class="{
                                    error: v$.password.minLengthValue.$invalid,
                                    'required-input': v$.password.required.$invalid
                                }"
                                class="signup__form-input password-input">
                            <div class="input-errors">
                                <div class="invalid-feedback required-feedback"
                                    v-if="v$.password.required.$invalid">
                                    {{ v$.password.required.$message }}.
                                </div>
                                <div class="invalid-feedback"
                                    v-if="v$.password.minLengthValue.$invalid">
                                    {{ v$.password.minLengthValue.$message }}.
                                </div>
                            </div>
                            <span v-if="formData.password.length >= 1"
                                @click="changeShowPassword"
                                class="password-show">
                                <eyeIcon v-if="!showPassword"
                                    :color="'#181818'" />
                                <eyeSlashIcon v-else
                                    :color="'#181818'" />
                            </span>
                        </div>

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
$light-primary: #ffffff;

body {
    background-color: $light-primary-bg;

    @media (max-width: 470px) {
        background: $light-primary;
    }
}
</style>

<style lang="scss" scoped>
// $light-btn: #D83F87;
// #2A1B3D
// #44318D
// #E98074
// #A4B3B6
// $light-btn-hover: #a70d55;

$light-primary-bg: #f0f2f5;
$light-primary: #ffffff;
$light-btn: #2acd00;
$light-btn-hover: #1e8803;
$error-btn: #dc3545;
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

    &-wrapper {
        padding: 140px 0px 80px;
        width: 100%;
        background: transparent;

        @media (max-width: 576px) {
            padding: 100px 0px 40px;
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
        gap: 34px;

        @media (max-width: 400px) {
            padding: 24px 12px;
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
            row-gap: 34px;
        }

        &-item {
            width: calc(50% - 4px);

            @media (max-width: 576px) {
                width: 100%;
            }

            position: relative;

            .input-errors {
                width: 100%;
                position: absolute;
                margin-top: 4px;
                margin-left: 4px;
                display: flex;
                gap: 6px;
                overflow: hidden;
            }

            .invalid-feedback {
                font-size: 10px;
                white-space: nowrap;
                color: $light-text;

                &:last-child {
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            .required-feedback {
                display: none;
            }

            .required-input {
                &:focus {
                    border-color: $error-btn;
                    box-shadow: 0 0 1px 1px $error-btn;
                }
            }
        }

        .password {
            position: relative;
            height: 42px;
            margin-top: 6px;

            &-input {
                height: 100%;
                position: absolute;
                margin-top: 0;
                z-index: 2;
                padding: 8px 40px 8px 16px;
            }

            &-show {
                position: absolute;
                z-index: 3;
                display: flex;
                align-items: center;
                height: 100%;
                right: 0;
                width: 40px;
                cursor: pointer;
                justify-content: center;
            }

            .input-errors {
                bottom: -4px;
                transform: translateY(100%);
            }
        }

        &-input {
            margin-top: 6px;
            padding: 8px 16px;
            border: 1px solid $light-gray;
            border-radius: 6px;
            font-size: 16px;
            width: 100%;
            line-height: 1.5;

            &::placeholder {
                color: $light-gray;
            }

            &:focus {
                border-color: $light-btn;
                box-shadow: 0 0 1px 1px $light-btn;
            }

            &:focus+div .required-feedback {
                display: block;
            }

            &.error {
                border-color: $error-btn;
                box-shadow: 0 0 1px 1px $error-btn;
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