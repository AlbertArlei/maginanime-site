<template>
    <main>
        <MainSlider></MainSlider>
        <topMangaListView title="Mangás Mais Vistos" type="topmangalist" />
        <topMangaListView title="Mangás Mais Avaliados" type="topfavoritemangalist" />
        <topMangaListView title="Mangás Adicionados Recentemente" type="listnewmanga" />
    </main>
</template>

<script setup lang="ts">
import MainSlider from '@/components/mainSlider.vue'
import topMangaListView from '@/components/topMangaList.vue';
</script>