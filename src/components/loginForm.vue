
<template>
    <div id="container">
        <Message :msg="formData.msg" />
        <div id="form-container">
            <form @submit="createUser">
                <span id="form-title">Crie sua conta</span>
                <div class="input-container">
                    <span class="text-span">Nome</span>
                    <input type="text" id="name-input" v-model="formData.name" required>
                </div>
                <div class="input-container">
                    <span class="text-span">Username</span>
                    <input type="text" id="username-input" v-model="formData.username" required>
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
                    <div id="passwordAlert-container" v-show="showPasswordAlert">
                        <ul>
                            <li>Pelo menos uma letra maiúscula</li>
                            <li>Pelo menos um número</li>
                            <li>Pelo menos um caractere especial (@!#$%¨&*)</li>
                            <li>No mínimo 12 caracteres</li>
                        </ul>
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
    name: 'loginForm',
    data() {
        return {
            formData: {
                name: '',
                username: '',
                password: '',
                msg: '',
            },
            showPassword: false,
            showPasswordAlert: false,
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

        async createUser(e: Event) {
            e.preventDefault();
            this.showPasswordAlert = true;
            const re = new RegExp("^(?=.*[0-9])(?=.*[A-Z]).{12,}$");
            re.exec(this.formData.password) !== null ? this.showPasswordAlert = false : this.showPasswordAlert = true;
            if (this.showPasswordAlert === true) return;
            type User = {
                name: string,
                username: string,
                password: string
            }
            const values: User = {
                name: this.formData.name,
                username: this.formData.username,
                password: this.formData.password
            }
            const req = await fetch(`${this.globalApiUrl}/user/create`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });
            const res = await req.status;
            res === 201 ? (this.formData.msg = 'conta criada', this.formData.name = "", this.formData.username = "", this.formData.password = "") : this.formData.msg = 'Usuario em uso';
            const message = document.querySelector('.message-container');
            message?.classList.add('active');
            setTimeout(() => {
                const message = document.querySelector('.message-container');
                message?.classList.remove('active');
                this.formData.msg = '';
            }, 3000);
        }
    },
    components: {
        Message
    }
}
</script>

<style scpoed>
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
    color: var(--white-color);
}

.text-span {
    color: var(--white-color);
}

.input-container input {
    padding: 0 20px;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 3px;
    background-color: var(--black-color);
    color: var(--white-color);

}

#createAccount-input {
    background-color: var(--white-color);
    border: 1px solid var(--black-color);
    color: var(--black-color);
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

#passwordAlert-container {
    margin-top: 10px;
    font-size: 0.8em;
    background-color: rgb(255, 204, 204);
    padding: 10px;
    border-radius: 3px;
}

#passwordAlert-container ul li {
    list-style: inside;
}
</style>