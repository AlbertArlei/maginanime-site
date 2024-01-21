<template>
    <Validation :redirectActive="true"></Validation>
    <main>
        <ProfileHeader></ProfileHeader>
        <profileMangaList></profileMangaList>
    </main>
</template>

<script setup lang="ts">
import ProfileHeader from '@/components/profileHeader.vue'
import profileMangaList from '@/components/profileMangaList.vue'
import Validation from '@/components/validation/validation.vue'
</script>

<style scoped></style>