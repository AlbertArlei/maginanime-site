<template>
    <Validation></Validation>
    <div id="mangaList-container">
        <span class="title-span">Mangás que Você Gostou</span>
        <div id="likeMangaList">
            <Carousel>
                <Card v-for="manga in likeMangaList" :key="manga.id" :id="manga.id" :name="manga.manga_name"
                    :cover="manga.manga_cover" :views="manga.views" :like="manga.like" :dislike="manga.dislike" :userLiked="manga.userLiked"
                    :userDisliked="manga.userDisliked"></Card>
            </Carousel>

        </div>
    </div>
</template>

<script lang="ts" defer>
import Validation from '@/components/validation/validation.vue'
import Card from '@/components/card.vue'
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

interface Ilike{
    like:[{mangaId: number, userId: number, like: number}],
    dislike:[{mangaId: number, userId: number, like: number}]
}
export default {

    data() {
        return {
            likeMangaList: [] as IManga[],
            likeAndDislike: {} as Ilike,
        }
    },
    methods: {
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
            return this.likeAndDislike = res.message;
        },

        getMangaListId() {
            const profileData = localStorage.getItem('profileData');
            const profileDatatoJSON = profileData !== null ? JSON.parse(profileData) : null;
            const profileMangaId = profileDatatoJSON.likeAndDislike;
            return profileMangaId;
        },
        async getAccountMangaList() {
            interface mangaID {
                id: {
                    result: object
                }
            }
            const id: mangaID = { id: this.getMangaListId() };
            const req = await fetch(`${this.globalApiUrl}/manga/likelist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(id)
            });
            const res = await req.json();
            const mangaData = res.message;
            const updateMangaData = async () => {
                for (let i = 0; i < mangaData.length; i++) {
                    const like = await this.liked(mangaData[i].id);
                    const dislike = await this.disliked(mangaData[i].id);
                    mangaData[i].userLiked = like;
                    mangaData[i].userDisliked = dislike;
                }
            }
            await updateMangaData();
            this.likeMangaList = mangaData;
        },
        async liked(id: number) {
            const found = this.likeAndDislike.like.find((element) => element.mangaId === id);
            const result = found !== undefined;
            return result;
        },
        async disliked(id: number) {
            const found = this.likeAndDislike.dislike.find((element) => element.mangaId === id);
            const result = found !== undefined;
            return result;
        }
    },
    async mounted() {
        if(this.globalIsLoggedUser.value) await this.getLikeUser();
        this.getAccountMangaList();
    },
    components: {
        Validation,
        Card,
        Carousel
    }
}
</script>

<style scoped>
#mangaList-container {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
}

#mangaList-container>span {
    font-size: 1.5em;
    font-weight: 600;
}

#likeMangaList {
    display: flex;
    gap: 10px;
    overflow-x: overlay;
    width: 100%;
}

.title-span{
    color: var(--white-color);
}

.manga-container {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 300px;
    user-select: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.manga-container>span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    pointer-events: none;
}

.mangaItens-container {
    display: flex;
    justify-content: space-around;
    gap: 10px;
}

.manga-container>img {
    pointer-events: none;
}

.view-container,
.like-container,
.dislike-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.view-container span,
.like-container span,
.dislike-container span {
    font-size: 1em;
}
</style>