<template>
    <EditProfile :show="showEditProfile" @show-emit="showEditProfile = false"></EditProfile>
    <div id="profileHeader-container" :style="{backgroundColor: profileJSON.profile.background_color}">
        <div id="profileBanner-img" :style="{ backgroundImage: `url(${bannerURL})` }" alt=""></div>
        <div>
            <div id="profilePicture-img" :style="{ backgroundImage: `url(${profilePicture})` }" alt=""></div>
            <div>
                <span id="profileName-span" :style="{color: `${profileJSON.profile.text_color}`}">{{ profileJSON.name }}</span>
                <span class="material-symbols-outlined edit-Button" :style="{color:`${profileJSON.profile.text_color}`}" @click="showEditProfile = true">
                    edit
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import EditProfile from '@/components/editProfile.vue'

export default {
    props: {
        title: String,
    },
    data() {
        return {
            showEditProfile: false,
            bannerURL: '',
            profilePicture: '',
            profileJSON: {
                name: '',
                profile: {
                    banner_image: '',
                    profile_picture: '',
                    text_color: '',
                    background_color: '',
                },
            },
        }
    },
    methods: {
        getLocalStorage() {
            const lStorage = localStorage.getItem('profileData');
            const profileJSON = lStorage !== null ? JSON.parse(lStorage) : null;
            this.profileJSON = profileJSON;
        },
        header() {
            this.bannerURL = this.profileJSON.profile.banner_image;
            this.profilePicture = this.profileJSON.profile.profile_picture;
        },
        editProfile() {
            return 
        }
    },

    mounted() {
        this.getLocalStorage();
        this.header();
    },
    components: {
        EditProfile
    }
}
</script>

<style scoped>
#profileHeader-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    gap: 10px;
    width: 100%;
    height: 400px;
    border-radius: 0 0 5px 5px;
}

#profileBanner-img {
    width: 100%;
    height: 250px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 3px;
}

#profilePicture-img {
    width: 100px;
    background-position: center;
    height: 100px;
    background-size: cover;
    border-radius: 50%;
    background-repeat: no-repeat;
}

#profileHeader-container div {
    display: flex;
    align-items: center;
    gap: 10px;
}

#profileHeader-container div span {
    font-size: 2em;
    font-weight: 600;
}

.edit-Button {
    user-select: none;
    cursor: pointer;
}
</style>