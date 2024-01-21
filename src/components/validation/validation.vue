<template></template>

<script lang="ts" >


export default {
    props:{
        redirectActive: Boolean,
    },
    data(){
        return{}
    },
    methods: {
        isLogged() {
            const userId = localStorage.getItem('profileData');
            userId !== null ? this.globalIsLoggedUser.value = true : this.globalIsLoggedUser;
        },
        redirect(){
            this.globalIsLoggedUser.value === false ? window.location.href = '/signup': null;
        }
    },
    mounted() {
        this.redirectActive === true ? this.redirect() : null;
        this.isLogged();
    }
}
</script>