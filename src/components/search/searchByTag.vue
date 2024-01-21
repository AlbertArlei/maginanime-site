<template>
    <Validation></Validation>
    <div>
        <button id="search-btn" @click="getCardContent()">PESQUISAR</button>
    </div>
    <div id="result-container">
        <span>RESULTADO:</span>
        <div id="result-div">
            <Card v-for="item in card" :id="item.id" :name="item.manga_name" :cover="item.manga_cover" :views="item.views"
                :like="item.like" :dislike="item.dislike" :userLiked="item.userLiked" :userDisliked="item.userDisliked">
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import Card from '@/components/card.vue'
import Validation from '@/components/validation/validation.vue'

interface ICard {
    id: number;
    manga_name: string;
    manga_cover: string;
    views: number;
    like: number;
    dislike: number;
    userDisliked: boolean;
    userLiked: boolean;
}
export default {
    name: 'SearchByTag',
    props: {
        list: {
            default: () => [] as string[]
        }
    },
    data() {
        return {
            card: [] as ICard[],
        }
    },
    methods: {
        async getCardContent() {
            const json = { tagList: this.list }
            const req = await fetch(`${this.globalApiUrl}/gender/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json)
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
            return this.card = mangaData;
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
            return res;
        }
    },
    components: {
        Card,
        Validation
    },
    mounted() {

    }

}
</script>

<style scoped>
#result-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
}

#result-container>span {
    font-weight: 600;
    font-size: 1.5em;
    color: var(--white-color);
}

#result-div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

#search-btn {
    padding: 15px;
    background-color: var(--white-color);
    color: var(--black-color);
    border: 1px solid var(--white-color);
    border-radius: 3px;
    cursor: pointer;
    transition: 200ms;
}

#search-btn:hover {
    background-color: var(--black-color);
    color: var(--white-color);


}
</style>