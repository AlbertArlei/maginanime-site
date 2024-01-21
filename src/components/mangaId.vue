<template>
    <Validation></Validation>
    <div id="manga-container">
        <div id="mangaCover-container">
            <img :src="manga.manga_cover" alt="">
        </div>
        <div id="mangaInfo-container">
            <div>
                <span class="header-span">Título: </span>
                <span>{{ manga.manga_name }}</span>
            </div>
            <div>
                <span class="header-span">Data de lançamento: </span>
                <span>{{ manga.manga_release }}</span>
            </div>
            <div>
                <span class="header-span">Author: </span>
                <span>{{ manga.manga_author }}</span>
            </div>
            <div>
                <span class="header-span">Editora: </span>
                <span>{{ manga.publishing_company }}</span>
            </div>
            <div id="mangaGender-container">
                <div v-for="gender in manga.gender">
                    <span>{{ gender }}</span>
                </div>
            </div>
            <div id="mangaContent-container">
                <div>
                    <span class="material-symbols-outlined mangaItens-icon">visibility</span>
                    <span>{{ manga.views }}</span>
                </div>
                <div class="like-container" @click="likeUp(manga.id)">
                    <i v-if="manga.userLiked" class="fa-solid fa-thumbs-up"
                        style="color: var(--white-color);font-size: 1.5em;"></i>
                    <i v-else class="fa-regular fa-thumbs-up" style="color: var(--white-color);font-size: 1.5em;"></i>
                    <span>{{ manga.like }}</span>
                </div>

                <div class="dislike-container" @click="dislikeUp(manga.id)">
                    <i v-if="manga.userDisliked" class="fa-solid fa-thumbs-down"
                        style="color: var(--white-color);font-size: 1.5em;"></i>
                    <i v-else class="fa-regular fa-thumbs-down" style="color: var(--white-color);font-size: 1.5em;"></i>
                    <span>{{ manga.dislike }}</span>
                </div>
                <span>{{ manga.userLiked }}</span>
            </div>
            <div id="mangaSummary-container">
                <h2>Sinopse</h2>
                <p>{{ manga.manga_summary }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Validation from '@/components/validation/validation.vue'

interface Ilike {
    like: [{ mangaId: number, userId: number, like: number }],
    dislike: [{ mangaId: number, userId: number, like: number }]
}

interface IUniqueManga {
    id: number,
    manga_name: string,
    manga_cover: string,
    manga_release: string,
    manga_summary: string,
    manga_author: string,
    publishing_company: string,
    views: number,
    like: number,
    userLiked: boolean,
    userDisliked: boolean,
    dislike: number,
    gender: [],
}
export default {
    data() {

        return {
            manga: {} as IUniqueManga,
            isLoggedUser: false,
            likesAndDislike: {} as Ilike,
        }
    },
    methods: {

        async liked(id: number) {
            console.timeEnd('b')
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
        },
        async getManga() {
            const url = new URL(window.location.href);
            const id = url.searchParams.get('id')
            const req = await fetch(`http://10.0.0.134:8181/manga/uniquemanga?id=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const res = await req.json();
            const mangaData = res.message;
            const updateMangaData = async () => {
                const like = await this.liked(mangaData.id);
                const dislike = await this.disliked(mangaData.id);
                mangaData.userLiked = like;
                mangaData.userDisliked = dislike;
            }
            await updateMangaData();
            this.manga = mangaData;

        },
        async createView() {
            const id = new URL(window.location.href).searchParams.get('id');
            const token = this.getUserToken();
            const reqBody = { id: id, token: token };

            const req = await fetch('http://10.0.0.134:8181/manga/view', {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify(reqBody)
            });
            const res = await req.json();
            return

        },
        getUserToken() {
            const token = localStorage.getItem('token');
            if (!token) return null;
            const tokenJSON = JSON.parse(token);
            return tokenJSON.value

        },
        getUserId() {
            const tokeninStringfy: string | null = localStorage.getItem('profileData');
            const tokenJSON = typeof tokeninStringfy === 'string' ? JSON.parse(tokeninStringfy) : null;
            return tokenJSON.profile.user_id;
        },
        getToken() {
            const tokeninStringfy: string | null = localStorage.getItem('token');
            const tokenJSON = typeof tokeninStringfy === 'string' ? JSON.parse(tokeninStringfy) : null;
            return tokenJSON.value
        },
        likeUp(id: number) {
            if (this.globalIsLoggedUser.value !== true) return;
            const data = {
                token: this.getToken(),
                id: id
            }
            fetch(`${this.globalApiUrl}/manga/like`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        },
        dislikeUp(id: number) {
            if (this.globalIsLoggedUser.value !== true) return;
            const data = {
                token: this.getToken(),
                id: id
            }
            fetch(`${this.globalApiUrl}/manga/dislike`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        },

    },
    async mounted() {
        if (this.globalIsLoggedUser.value) {
            await this.createView();
            console.time('a')
            console.time('b')
            await this.getLikeUser();
            console.timeEnd('a')
        }
        await this.getManga();
    },
    components: {
        Validation
    }
}

</script>

<style scoped>
#manga-container {
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 0 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.header-span {
    font-weight: 600;
}

#mangaCover-container>img {
    width: 300px;
    border-radius: 3px;
}

#mangaInfo-container {
    display: flex;
    flex-direction: column;
    font-size: 1.1em;
    max-width: 500px;
    gap: 10px;
    color: var(--white-color);
}

#mangaContent-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
    border-radius: 3px;
    padding: 10px 0;
}

#mangaContent-container div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

#mangaSummary-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: justify;
}

#mangaSummary-container>h2 {
    font-weight: 600;
}

#mangaGender-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

#mangaGender-container>div {
    background-color: var(--white-color);
    color: var(--black-color);
    padding: 10px;
    border-radius: 3px;
}

.like-container,
.dislike-container {
    cursor: pointer;
    transition: 200ms;
}

.like-container:hover,
.dislike-container:hover {
    scale: 1.3;
}

@media screen and (max-width: 850px) {
    #manga-container {
        flex-direction: column;
        align-items: center;
    }

    #mangaInfo-container {
        width: auto;
        font-size: 1em;
        border-radius: 3px;
        border: 1px solid var(--white-color);
        padding: 10px;
    }

    #mangaCover-container>img {
        width: 290px;
    }
}
</style>
