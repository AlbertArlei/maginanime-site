<template>
    <div class="cardSkeleton-container">
        <div class="imgSkeleton-container"></div>
        <div class="nameSkeleton-container"></div>
        <div class="itensSkeleton-container"></div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {}
    }
}
</script>

<style scoped>
.cardSkeleton-container {
    min-width: 180px;
    height: 300px;
    color: var(--white-color);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    display: flex;
    flex-direction: column;
}

.cardSkeleton-container:hover{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.imgSkeleton-container {
    width: 180px;
    height: 254.13px;
    background-position: right;
    background: linear-gradient(50deg, rgba(144,144,144,1) 29%, rgba(205,205,205,1) 60%);
    margin-bottom: 10px;
    background-size: 300%;
    animation: skeleton 5s linear infinite;
}

.nameSkeleton-container {
    width: 100%;
    height: 17px;
    background-position: right;
    background-color: rgb(172, 172, 172);
    margin-bottom: 2px;
}

.itensSkeleton-container {
    width: 100%;
    height: 18px;
    background-color: rgb(172, 172, 172);
}

@keyframes skeleton{
  0%{
    background-position: right;
  }
  50%{
    background-position: left;
  }
  100%{
    background-position: right;
  }
}
</style>