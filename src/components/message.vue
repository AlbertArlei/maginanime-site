<script lang="ts">

export default {
    name: 'Message',
    props: {
        msg: String,
    },
    data() {
        return{}
    }
}
</script>
<template>
    <div class="message-container"><span>{{ msg }}</span></div>
</template>

<style>
.message-container {
    position: absolute;
    top: 20px;
    right: 30px;
    transform: translateY(-100px);
    background-color: var(--white-color);
    color: var(--black-color);
    width: 200px;
    padding: 10px 10px;
    border-radius: 4px;
    border-left: 3px solid var(--black-color);
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    transition: all 250ms;
    z-index: 2;
}

.message-container.active {
    transform: translateX(0);
}
</style>