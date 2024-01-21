<template>
    <div id="container">
        <Message :msg="formData.msg" />
        <div id="form-container">
            <form @submit="loginUser">
                <span id="form-title">Crie sua conta</span>
                <div class="input-container">
                    <span class="text-span">username</span>
                    <input type="text" id="name-input" v-model="formData.username" required>
                </div>
                <div class="input-container">
                    <span class="text-span">Senha</span>
                    <div id="password-container">
                        <input type="password" id="password-input" v-model="formData.password" required>
                        <div v-if="showPassword">
                            <i class="fa-regular fa-eye-slash" style="color: var(--white-color);"
                                @click="togglePasswordVisibility"></i>
                        </div>
                        <div v-else>
                            <i class="fa-regular fa-eye" style="color: var(--white-color);"
                                @click="togglePasswordVisibility"></i>
                        </div>
                    </div>
                </div>
                <input id="createAccount-input" type="submit" value="Criar conta">
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Message from './message.vue';

export default {
    name: 'signupForm',
    data() {
        return {
            formData: {
                username: '',
                password: '',
                msg: '',
            },
            showPassword: false,
        };
    },

    methods: {
        togglePasswordVisibility() {
            const inputPassword = document.getElementById('password-input') as HTMLInputElement | null;
            const eyeSlash = document.querySelector('.fa-eye-slash') as HTMLElement | null;
            const eye = document.querySelector('.fa-eye') as HTMLElement | null;
            if (inputPassword?.type === 'password') {
                inputPassword && (inputPassword.type = "text");
                eyeSlash && (eyeSlash.style.display = "none");
                eye && (eye.style.display = "block");
                this.showPassword = true;
                return;
            }
            inputPassword && (inputPassword.type = "password");
            eyeSlash && (eyeSlash.style.display = "block");
            eye && (eye.style.display = "none");
            this.showPassword = false;
        },
        async loginUser(e: Event) {
            e.preventDefault();
            type User = {
                username: string,
                password: string
            }
            const values: User = {
                username: this.formData.username,
                password: this.formData.password
            }
            const req = await fetch(`${this.globalApiUrl}/user/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });
            const res = req;
            if (res.status === 200) {
                const token = await res.json();

                const dayCalc = 23 * 60 * 60 * 1000 + 59 * 60 * 1000;
                this.setLocalStorage('token', token.message, dayCalc);
                window.location.href = '/';
                return
            }
            this.formData.msg = 'username ou senha incorreto';
            const message = document.querySelector('.message-container');
            message?.classList.add('active');
            setTimeout(() => {
                const message = document.querySelector('.message-container');
                message?.classList.remove('active');
                this.formData.msg = '';
            }, 3000);

        },
        setLocalStorage(key: string, value: string, ttl: number) {
            const now = new Date();
            const item = {
                value: value,
                expiry: now.getTime() + ttl
            };
            localStorage.setItem(key, JSON.stringify(item))
        }
    },
    components: {
        Message
    }
}
</script>


<style scoped>
#container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 80px);
    justify-content: center;
    align-items: center;
}

#form-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.text-span {
    color: var(--white-color);
}

form {
    display: flex;
    flex-direction: column;
    width: 30vw;
    min-width: 290px;
    /* height: 400px; */
    gap: 20px;
    border-radius: 3px;
}

.input-container {
    display: flex;
    flex-direction: column;
}

#form-title {
    font-weight: 600;
    font-size: 1.2em;
    text-align: center;
}

.input-container input {
    padding: 0 20px;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 3px;
}

#createAccount-input {
    background-color: var(--white-color);
    color: var(--black-color);
    border-radius: 1px solid var(--black-color);
    border-radius: 3px;
    height: 40px;
    cursor: pointer;
    transition: 200ms;
}

#createAccount-input:hover {
    background-color: var(--black-color);
    color: var(--white-color);
    border: 1px solid var(--white-color);
}

#password-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

#password-container input {
    width: 100%;
    border-radius: 3px 0 0 3px;
}

#password-container div {
    display: flex;
    align-items: center;
    background-color: var(--black-color);
    border-radius: 0 3px 3px 0;
    height: 40px;
    padding: 0 5px;
}

#password-container div i {
    cursor: pointer;
}
</style>