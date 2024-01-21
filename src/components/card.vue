<template>
    <Validation></Validation>
    <div class="manga-container">
        <router-link :to="'/manga?id=' + id">
            <img :src="cover" alt="">
        </router-link>
        <span class="name">{{ name }}</span>
        <div class="mangaItens-container">
            <div class="view-container">
                <span class="material-symbols-outlined mangaItens-icon">visibility</span>
                <span>{{ views }}</span>
            </div>

            <div class="like-container" @click="likeUp(id)">
                <i v-if="userLiked" class="fa-solid fa-thumbs-up" style="color: var(--white-color);"></i>
                <i v-else class="fa-regular fa-thumbs-up" style="color: var(--white-color);"></i>
                <span>{{ like }}</span>
            </div>

            <div class="dislike-container" @click="dislikeUp(id)">
                <i v-if="userDisliked" class="fa-solid fa-thumbs-down" style="color: var(--white-color);"></i>
                <i v-else class="fa-regular fa-thumbs-down" style="color: var(--white-color);"></i>
                <span>{{ dislike }}</span>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Validation from '@/components/validation/validation.vue'

export default {
    name: 'Card',
    props: {
        id: {
            type: Number,
            default: 0,
        },
        name: String,
        cover: String,
        views: Number,
        like: Number,
        dislike: Number,
        userLiked: Boolean,
        userDisliked: Boolean,
    },
    emits:['mounted'],
    data() {
        return {}
    },
    methods: {
        getToken() {
            const tokeninStringfy: string | null = localStorage.getItem('token');
            const tokenJSON = typeof tokeninStringfy === 'string' ? JSON.parse(tokeninStringfy) : null;
            return tokenJSON.value
        },
        likeUp(id: number) {
            if(this.globalIsLoggedUser.value !== true) return;
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
            if(this.globalIsLoggedUser.value !== true) return;
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
        likeActive(){
            
        }
    },
    mounted(){
        this.$emit('mounted');
    },
    components: {
        Validation
    }
}
</script>

<style scoped>
.manga-container {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 310px;
    user-select: none;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 5px;
    background-color: var(--black-color);
    color: var(--white-color);
    gap: 5px;
}

.manga-container>a {
    width: 180px;
    height: 254px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.name {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white-color);
    overflow: hidden;
    width:100%;
    height: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 0 10px;
}

.mangaItens-container {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    padding-bottom: 0px;
}

.manga-container>a>img {
    border-radius: 3px 3px 0 0;
    pointer-events: none;
    width: 180px;
}

.view-container,
.like-container,
.dislike-container {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.view-container span,
.like-container span,
.dislike-container span {
    font-size: 1em;
}

.like-container:hover,
.dislike-container:hover {
    scale: 1.2;
    transition: 200ms;
}

.manga-container:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
</style>