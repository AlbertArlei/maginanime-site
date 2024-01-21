
<template>
    <Validation></Validation>
    <div class="mangaList-container">
        <span class="manga-title">{{ title }}</span>
        <Carousel :card="cardMounted">
            <Card @mounted="cardMounted = true" v-for="manga in mangas" :key="manga.id" :id="manga.id" :name="manga.manga_name"
                :cover="manga.manga_cover" :views="manga.views" :like="manga.like" :dislike="manga.dislike"
                :userLiked="manga.userLiked" :userDisliked="manga.userDisliked"></Card>
        </Carousel>
    </div>
</template>

<script lang="ts" defer>
import Card from '@/components/card.vue'
import Validation from '@/components/validation/validation.vue'
import Carousel from '@/components/carousel.vue'

interface IManga {
    id: number;
    manga_name: string;
    manga_cover: string;
    views: number;
    like: number;
    userLiked: boolean;
    userDisliked: boolean;
    dislike: number;
}
interface Ilike {
    like: [{ mangaId: number, userId: number, like: number }],
    dislike: [{ mangaId: number, userId: number, like: number }]
}
export default {
    name: 'topMangaListView',
    props: {
        title: String,
        type: String,
    },
    data() {
        return {
            mangas: [] as IManga[],
            likesAndDislike: {} as Ilike,
            cardMounted: false,
        }
    },
    methods: {
        async getTopMangaList() {
            const req = await fetch(`${this.globalApiUrl}/manga/${this.type}`, { method: 'POST' });
            const res = await req.json();
            const mangaData = res.message;
            if (this.globalIsLoggedUser.value) {
                const updateMangaData = async () => {
                    for (let i = 0; i < mangaData.length; i++) {
                        const like = await this.liked(mangaData[i].id);
                        const dislike = await this.disliked(mangaData[i].id);
                        mangaData[i].userLiked = like;
                        mangaData[i].userDisliked = dislike;
                    }
                }
                await updateMangaData();
            }

            this.mangas = mangaData.map((item: any) => ({
                id: item.id,
                manga_name: item.manga_name,
                manga_cover: item.manga_cover,
                views: item.views,
                like: item.like,
                userLiked: item.userLiked,
                userDisliked: item.userDisliked,
                dislike: item.dislike
            })) as IManga[];
        },
        getMangaLink(mangaId: Number) {
            return `/manga?id=${mangaId}`
        },
        async liked(id: number) {
            const found = this.likesAndDislike.like.find((element) => element.mangaId === id);
            const result = found !== undefined;
            return result;
        },
        async disliked(id: number) {
            const found = this.likesAndDislike.dislike.find((element) => element.mangaId === id);
            const result = found !== undefined;
            return result;
        },
        async getLikeUser() {
            interface IuserId {
                profile: {
                    user_id: number
                };
            }
            const localStorageData = localStorage.getItem('profileData');
            const profileData: IuserId = localStorageData ? JSON.parse(localStorageData) : null;

            const req = await fetch(`${this.globalApiUrl}/manga/likeuser?id=${profileData.profile.user_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const res = await req.json();
            return this.likesAndDislike = res.message;
        }
    },
    async mounted() {
        if (this.globalIsLoggedUser.value) await this.getLikeUser();
        this.getTopMangaList();
    },
    components: {
        Card,
        Validation,
        Carousel,
    }
}
</script>

<style scoped>
.manga-title {
    font-size: 1.5em;
    font-weight: 600;
    color: var(--white-color);
}

.mangaList-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 360px;
    user-select: none;
    padding: 0 20px;
}

.dragging {
    pointer-events: none;
}

.mangaList {
    display: flex;
    width: 100vw;
    height: 400px;
    gap: 10px;
    overflow-x: overlay;
    padding: 0 30px;
}

.mangaList::-webkit-scrollbar {
    display: none;
}
</style>
