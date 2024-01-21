<script lang="ts">
export default {
    name: 'Popup',
    props: {
        title: String,
        text: String,
    },
    data() {
        return {
            showPopup: false,
        }
    },
    methods: {
        closeButton() {
            this.showPopup = false;
        },
        showPopupDelay() {
            setTimeout(() => {
                this.showPopup = true;
            }, 500);

        }
    },
    mounted() {
        this.showPopupDelay();
    }
}
</script>

<template>
    <div id="backgroundPopup" v-show="showPopup"></div>
    <div id="accountAlert-container" v-show="showPopup">
        <img src="@/assets/kanna-login.png" alt="kanna login image">
        <div>
            <i class="fa-solid fa-xmark" style="color: #000000;" @click="closeButton"></i>
            <div>
                <span>{{ title }}</span>
                <span>{{ text }}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
#backgroundPopup {
    background-color: var(--black-color);
    width: 100vw;
    height: 100vh;
    position: absolute;
    opacity: 0.7;
}

#accountAlert-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    z-index: 1;
}

#accountAlert-container img {
    pointer-events: none;
    width: 128px;
}

#accountAlert-container>div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 290px;
    background-color: white;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    border-bottom: 2px solid black;
    border-radius: 5px;
}

#accountAlert-container div div {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.5em;
}

#accountAlert-container div i {
    font-size: 2em;
    cursor: pointer;
}

#accountAlert-container div span:nth-child(1) {
    font-weight: 600;
    font-size: 2em;
}
</style>