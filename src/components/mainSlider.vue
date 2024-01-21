<template>
    <div class="mainSlider-container">
        <div class="item-container">
            <div class="item-container-background"></div>
            <div class="content-container">
                <span class="name-span">{{ randomManga.manga_name }}</span>
                <div class="tags-container">
                    <div class="tag-container" v-for="tag in randomManga.gender"><span>{{ tag }}</span></div>
                </div>
                <router-link class="uniqueMangaLink" :to="'/manga?id=' + randomManga.id">Ver</router-link>

            </div>
            <img :src="randomManga.manga_cover" alt="">
        </div>
    </div>
</template>

<script lang="ts">
interface Imanga {
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
            randomManga: {} as Imanga
        }
    },
    methods: {
        async getRandomManga() {
            const req = await fetch(`${this.globalApiUrl}/manga/random`, {
                method: "GET"
            });
            const res = await req.json();
            return this.randomManga = res.message;
        },
        background() {
            const background = document.querySelector('.item-container-background') as HTMLElement;
            background.style.backgroundImage = `url(${this.randomManga.manga_cover})`;
        }
    },
    async mounted() {
        await this.getRandomManga();
        this.background();

    }
}
</script>

<style scoped>
.mainSlider-container {
    margin-top: 10px;
    width: 100%;
    height: 300px;
    padding: 0 20px;
}

.item-container {
    border-radius: 3px;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.719);
    display: flex;
}

.item-container-background {
    content: '';
    position: absolute;
    top: -60%;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(5px);
    display: flex;
    width: 100%;
    height: 600px;
    z-index: -1;
}


.content-container {
    width: 50%;
    height: 100%;
    color: var(--white-color);
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding-left: 10px;

}

.tags-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.tag-container {
    border-radius: 3px;
    border: 1px solid var(--white-color);
    padding: 10px;
}

.item-container>img {
    position: absolute;
    top: -48%;
    left: 50%;
    transform: rotate(24deg);
    width: 400px;
    transition: 100ms;
}

.name-span {
    font-weight: 600;
    font-size: 2em;
    overflow: hidden;
}

.uniqueMangaLink{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    letter-spacing: 3px;
    border-radius: 3px;
    border: 1px solid var(--black-color);
    background-color: var(--white-color);
    color: var(--black-color);
    padding: 10px;
    width: 100px;
    transition: 200ms;
}

.uniqueMangaLink:hover{
    color: var(--white-color);
    background-color: var(--black-color);
    border: 1px solid var(--white-color);
}


@media screen and (max-width: 950px) {
    .item-container>img {
        width: 281px;
        top: -20%;
        left: 60%;
        transform: rotate(11deg);
        z-index: 0
    }

    .name-span{
        font-size: 1.5em;
    }

    @media screen and (max-width: 700px) {

        .item-container>img {
            width: 170px;
            top: -9%;
            left: 60%;
            transform: rotate(11deg);
        }

        .mainSlider-container {
            height: 200px;
            padding: 0 20px;
        }

        .tag-container {
            padding: 3px;
            font-size: 0.8em;
        }

        .content-container {
            width: 60%;
        }
    }

    .name-span{
        font-size: 1em;
    }

    @media screen and (max-width: 450px) {
        .item-container{
            height: 210px;
        }
        .content-container {
            padding: 0;
        }

        .item-container>img {
            position: static;
            width: 80px;
            height: 130px;
            transform: rotate(0deg);
        }

        .item-container {
            justify-content: center;
            align-items: center;
        }

        .name-span {
            font-weight: 600;
            font-size: 1em;
        }
    }
}
</style>