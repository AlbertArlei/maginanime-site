<template>
    <div id="mangaList-container">
        <span>Mangás:</span>
        <div id="mangaList-div">
            <Card v-for="manga in mangaList" :id="manga.id" :name="manga.manga_name" :cover="manga.manga_cover"
                :views="manga.views" :like="manga.like" :dislike="manga.dislike" :userLiked="manga.userLiked"
                :userDisliked="manga.userDisliked">
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import Card from '@/components/card.vue'

interface IManga {
    id: number;
    manga_name: string;
    manga_cover: string;
    views: number;
    like: number;
    dislike: number;
    userLiked: boolean;
    userDisliked: boolean;
}
export default {
    data() {
        return {
            mangaList: [] as IManga[]
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
            return res;
        },
        async getManga() {
            const url = new URL(window.location.href);
            const name = url.searchParams.get('name');
            const req = await fetch(`${this.globalApiUrl}/manga/name?name=${name}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
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

            this.mangaList = mangaData;
        },
        async liked(id: number) {
            interface IlikeAndDislike {
                message: {
                    like: [{ mangaId: number, userId: number, like: number }],
                    dislike: [{ mangaId: number, userId: number, like: number }]
                }
            }
            const likeUser: IlikeAndDislike = await this.getLikeUser();
            const found = likeUser.message.like.find((element) => element.mangaId === id);
            const result = found !== undefined;
            return result;
        },
        async disliked(id: number) {
            interface IlikeAndDislike {
                message: {
                    like: [{ mangaId: number, userId: number, like: number }],
                    dislike: [{ mangaId: number, userId: number, like: number }]
                }
            }
            const likeUser: IlikeAndDislike = await this.getLikeUser();
            const found = likeUser.message.dislike.find((element) => element.mangaId === id);
            const result = found !== undefined;
            return result;
        }
    },
    mounted() {
        this.getManga();
        if (this.globalIsLoggedUser.value) {
            this.getLikeUser();
        }

    },
    components: {
        Card
    }
}
</script>

<style scoped> #mangaList-container {
     padding: 0 20px;
     width: 100vw;
 }

 #mangaList-container>span {
     font-size: 1.5em;
     font-weight: 600;
 }

 #mangaList-div {
     display: flex;
     gap: 10px;
     justify-content: center;
     flex-wrap: wrap;
 }
</style>