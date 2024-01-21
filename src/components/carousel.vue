<template>
    <div class="carousel-container">
        <div class="chevron-right" @click="chevronRight">
            <span class="material-symbols-outlined">
                chevron_left
            </span>
        </div>

        <div class="carouselItens-container">
            <div ref="carousel" class="carouselItens-div">
                <slot></slot>
            </div>

        </div>
        <div class="chevron-left" @click="chevronLeft">
            <span class="material-symbols-outlined">
                chevron_right
            </span>
        </div>

    </div>
</template>

<script lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

export default {
    props: {
        card: Boolean,
    },
    watch: {
        card: {
            immediate: true,
            handler(newCard, oldCard) {

                if (oldCard === false && newCard === true) this.addGapToStyle();
            },
        },
    },
    data() {
        return {
            carouselPosition: 0,
            cardPerView: 0,
            carouselLength: 0,
            carouselGap: 0,
        }
    },
    methods: {
        getCarouselItens() {
            const carouselItens: HTMLElement = this.$refs.carousel as HTMLElement;
            return carouselItens.querySelectorAll('.manga-container');
        },
        getCardInScreen() {
            const ref: HTMLElement = this.$refs.carousel as HTMLElement;
            
            const windowWidth = window.innerWidth - 40;
            const cardsInScreen = Math.floor((windowWidth) / 190);
            const calc = Math.floor((windowWidth - (180 * cardsInScreen)) / (cardsInScreen - 1));
            this.carouselGap = calc
            const gap = ref.style.gap = calc.toString();
            gap
            this.cardPerView = cardsInScreen;
            const carouselItensLength = this.getCarouselItens().length;
            this.carouselLength = carouselItensLength - 1;
        },
        chevronRight() {
            if (this.disableChevron()) return;
            const carouselRef: HTMLElement = this.$refs.carousel as HTMLElement;
            this.getCarouselItens()
            this.getCardInScreen();
            for (let i = 0; i != this.cardPerView; i++) {
                const carouselItens = this.getCarouselItens();
                carouselRef.insertAdjacentElement('afterbegin', carouselItens[this.carouselLength])
            }
            carouselRef.style.transition = 'none';
            carouselRef.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                carouselRef.style.transition = 'transform 0.1s ease-in-out';
                carouselRef.style.transform = 'translateX(0)';
            }, 0);
        },
        chevronLeft() {
            if (this.disableChevron()) return;
            const carouselRef: HTMLElement = this.$refs.carousel as HTMLElement;
            this.getCardInScreen();

            for (let i = 0; i != this.cardPerView; i++) {
                const carouselItens = this.getCarouselItens();
                carouselRef.insertAdjacentElement('beforeend', carouselItens[0])
            }
            this.cloneReversedCarouselItems();
            carouselRef.style.transition = 'transform 0.2s ease-in-out';
            carouselRef.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                carouselRef.style.transform = 'translateX(0)';
                carouselRef.style.transition = 'none';
            }, 200);

        },
        disableChevron() {
            this.getCardInScreen()
            return this.cardPerView - 1 > this.carouselLength ? true : false;
        },
        cloneReversedCarouselItems() {
            const carouselRef: HTMLElement = this.$refs.carousel as HTMLElement;
            const carouselItens = this.getCarouselItens();
            const clonedItems: HTMLElement[] = [];
            const carouselLength = this.carouselLength;
            for (let i = this.cardPerView - 1; i >= 0; i--) {
                const calc = (carouselLength - this.cardPerView) + 1;
                const clone = carouselItens[calc + i].cloneNode(true) as HTMLElement;
                clonedItems.push(clone);
                carouselRef.insertAdjacentElement('afterbegin', clone);
            }
            setTimeout(() => {
                clonedItems.forEach((clone) => {
                    clone.remove()
                });
            }, 200);

            return clonedItems;
        },
        async addGapToStyle() {
            this.getCardInScreen();
            const carouselRef: HTMLElement = this.$refs.carousel as HTMLElement;
            carouselRef.style.gap = `${this.carouselGap}px`
        }
    },
    mounted() {
        window.addEventListener('resize', this.addGapToStyle);
    }
}
</script>
<style scoped>
.carousel-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 100px;
    width: 100%;
}

.carouselItens-container {
    overflow: hidden;
}

.carouselItens-div {
    display: flex;
    gap: 20px;
    padding: 30px 0;
    transition: 200ms;

}

.chevron-right,
.chevron-left {
    position: absolute;
    display: flex;
    user-select: none;
    background-color: var(--black-color);
    color: var(--white-color);
    border: 1px solid var(--white-color);
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 150px;
    opacity: 0.8;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
    transition: 200ms;
}

.chevron-right {
    left: 0;
}

.chevron-left {
    right: 0;
}

.chevron-right:hover,
.chevron-left:hover {
    background-color: var(--white-color);
    color: var(--black-color);
    border: 1px solid var(--black-color);
}

.chevron-left span,
.chevron-right span {
    font-size: 2.5em;
}
</style>