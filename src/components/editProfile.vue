<template>
    <div class="edit-container" v-show="show">
        <span class="material-symbols-outlined close-btn" @click="$emit('showEmit')">
            close
        </span>
        <span class="inputText-span">Link do seu banner</span>
        <input class="editProfile-input" v-model="bannerLink" type="text" placeholder="banner">
        <span class="inputText-span">Link do seu perfil</span>
        <input class="editProfile-input" v-model="profileLink" type="text" placeholder="perfil">
        <span class="inputText-span">Cor do nome</span>
        <input class="editProfile-input" v-model="colorInput" type="text" placeholder="cor do nome">
        <span class="inputText-span">Cor do fundo</span>
        <input class="editProfile-input" v-model="backgroundColor" type="text" placeholder="cor do fundo">
        <span class="inputText-span">Seu nome</span>
        <input class="editProfile-input" v-model="nameInput" type="text" placeholder="nome">
        <button class="send-buttton" @click="sendData">CONFIRMAR</button>
    </div>
</template>

<script lang="ts">

export default {
    props: {
        show: Boolean,
    },
    emits: ['showEmit'],
    data() {
        return {
            bannerLink: '',
            profileLink: '',
            nameInput: '',
            colorInput: '',
            backgroundColor: '',
            profileData: {},
        }
    },
    methods: {
        getProfileData() {
            const data = localStorage.getItem('profileData')
            const jsonParse = data != null ? JSON.parse(data) : null;
            return this.profileData = jsonParse;
        },
        getToken(){
            const token =  localStorage.getItem('token')
            const parse = token != null ? JSON.parse(token) : null;
            return parse.value;
        },
        fillInput() {
            const data = this.getProfileData();
            this.bannerLink = data.profile.banner_image;
            this.profileLink = data.profile.profile_picture;
            this.colorInput = data.profile.text_color;
            this.backgroundColor = data.profile.background_color;
            this.nameInput = data.name;
        },
        async sendData() {
            const data = {
                banner: this.bannerLink,
                profilePicture: this.profileLink,
                color: this.colorInput,
                backgroundColor: this.backgroundColor,
                name: this.nameInput,
            }
            const req = await fetch(`${this.globalApiUrl}/user/update`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({data:data, token: this.getToken()})
            });
            req
            location.reload();
        }
    },
    mounted() {
        this.fillInput();
    }
}
</script>

<style scoped>
.edit-container {
    position: absolute;
    z-index: 2;
    width: 290px;
    height: 550px;
    display: flex;
    border-radius: 3px;
    padding: 10px;
    background-color: var(--black-color);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.close-btn {
    color: var(--white-color);
    font-size: 2em;
    margin-left: 90%;
    cursor: pointer;
    user-select: none;
    height: 40px;
}

.editProfile-input {
    height: 40px;
    padding: 10px;
    background-color: var(--black-color);
    outline: none;
    color: var(--white-color);
    border: 1px solid var(--white-color);
    border-radius: 3px;
}

.send-buttton {
    background-color: var(--white-color);
    color: var(--black-color);
    border: 1px solid var(--black-color);
    border-radius: 3px;
    height: 40px;
    transition: 200ms;
    font-size: 1em;
    font-weight: 600;
    letter-spacing: 3px;
    -ms-flex-align: center;
    margin-top: 30px;
    cursor: pointer;
}

.send-buttton:hover {
    background-color: var(--black-color);
    color: var(--white-color);
    border: 1px solid var(--white-color);
}

.inputText-span {
    color: var(--white-color);
}
</style>