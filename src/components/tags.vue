<template>
    <div id="tag-container">
        <span>TAGS:</span>
        <div id="tag-div">
            <button class="tag-btn" v-for="tag in tags" :id="tag.id" @click="tagButton(tag.id)">{{ tag.gender }}</button>
        </div>
    </div>
    <SearchByTag :list="tagSelected"></SearchByTag>
</template>

<script lang="ts">
import SearchByTag from '@/components/search/searchByTag.vue'

interface ITags {
    id: string;
    gender: string;
}

export default {
    data() {
        return {
            tags: [] as ITags[],
            tagSelected: [] as string[]
        }
    },
    methods: {
        async getTags() {
            const req = await fetch(`${this.globalApiUrl}/gender/`, { method: 'GET' });
            const res = await req.json();
            this.tags = res.message;
        },

        async tagButton(id: string) {
            const item = this.tagSelected.indexOf(id);
            item === -1 ? this.tagButtonOn(id) : this.tagButtonOff(id, item);
        },
        tagButtonOn(id: string) {
            document.getElementById(id)!.style.backgroundColor = 'var(--black-color)';
            document.getElementById(id)!.style.color = 'var(--white-color)';
            this.tagSelected.push(id)
        },
        tagButtonOff(id: string, index: number) {
            document.getElementById(id)!.style.backgroundColor = 'var(--white-color)';
            document.getElementById(id)!.style.color = 'var(--black-color)';
            this.tagSelected.splice(index, 1);
        },
        sendTagList(list: string[]){
            this.$emit('tagList', list);
        }
    },
    mounted() {
        this.getTags();
    },
    components:{
        SearchByTag
    }
}
</script>

<style scoped>
#tag-container {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
}

#tag-container>span {
    font-weight: 600;
    font-size: 1.5em;
    color: var(--white-color);
}

#tag-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.tag-btn{
    padding: 10px;
    background-color: var(--white-color);
    color: var(--black-color);
    border: 1px solid var(--white-color);
    border-radius: 3px;
    cursor: pointer;
    transition: 200ms;
}

#search-btn{
    padding: 15px;
}

.tag-btn:hover, #search-btn:hover {
    background-color: var(--black-color);
    color: var(--white-color);

}

#search-container{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>