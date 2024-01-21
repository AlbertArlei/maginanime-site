<template>
    <header>
        <div id="logo-container">
            <i class="fa-solid fa-bars" style="color: var(--white-color);" @click="menu(true)"></i>
            <img src="@/assets/logo-white-64px.png" alt="logo" width="64">
        </div>

        <div id="search-container">
            <i class="fa-solid fa-xmark" id="closeSearchContainer-button" style="color: var(--white-color);"
                @click="searchBar(false)"></i>
            <input type="text" id="search-input" placeholder="Search" @keyup="keySearch">
            <span id="search-button" class="material-symbols-outlined" @click="search()">
                search
            </span>
        </div>
        <span id="mobileSearch-button" class="material-symbols-outlined" @click="searchBar(true)">search</span>
        <nav>
            <ul>
                <li><a href="/">inicio</a></li>
                <li><a href="/library">biblioteca</a></li>
                <li><a href="/about">sobre</a></li>
            </ul>
            <div id="userProfile-container" v-if="isUserLoggedIn">
                <a href="/profile"><div :style="{backgroundImage: `url(${profilePicture})`}" alt=""></div></a>
            </div>
            <div id="headerAccount-container" v-else>
                <a href="/login">log in</a>
                <a href="/signup">sign up</a>
            </div>
        </nav>
        <div id="mobileMenu-nav">
            <i class="fa-solid fa-xmark" style="color: var(--white-color);" @click="menu(false)"></i>
            <ul>
                <li><a href="/">inicio</a></li>
                <li><a href="/library">biblioteca</a></li>
                <li><a href="/about">sobre</a></li>
            </ul>
        </div>
        <div id="mobileUserProfile-container" v-if="isUserLoggedIn">
            <a href="/profile"><div :style="{backgroundImage: `url(${profilePicture})`}" alt=""></div></a>
        </div>
        <div id="mobileHeaderAccount-container" v-else>
            <a href="/login">log in</a>
            <a href="/signup">sign up</a>
        </div>
    </header>
</template>

<script lang="ts">

export default {
    name: 'Header',
    data() {
        return {
            isUserLoggedIn: false,
            profilePicture: '',
        }
    },
    methods: {
        async isLogged() {
            const token = this.getToken('token');
            if (token !== null) {
                const obj = { token: token }
                const req = await fetch(`${this.globalApiUrl}/user/profile`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(obj)
                });
                const res = await req.json();
                this.addProfileLocalStorage('profileData', res.message);
                this.getProfilePicture();

                return this.isUserLoggedIn = true;
            }
            return this.isUserLoggedIn = false;
        },
        getToken(key: string) {
            const token = localStorage.getItem(key);
            if (!token) return null;
            const item = JSON.parse(token);
            const now = new Date().getTime();
            if (now > item.expiry) {
                localStorage.removeItem(key);
                localStorage.removeItem('profileData');
                return null;
            }
            return item.value
        },
        async getProfilePicture() {
            const getStorage: string | null = localStorage.getItem('profileData');
            const token = getStorage !== null ? JSON.parse(getStorage) : null;
            this.profilePicture = token.profile.profile_picture;
        },
        menu(type: Boolean) {
            const nav = document.getElementById('mobileMenu-nav') as HTMLElement | null;
            if (type) {
                nav && (nav.classList.add('active'));
                return
            }
            nav && (nav.classList.remove('active'));
        },
        addProfileLocalStorage(key: string, values: object) {
            localStorage.setItem(key, JSON.stringify(values));
        },
        searchBar(open: Boolean) {
            const logoContainer = document.getElementById('logo-container') as HTMLElement | null;
            const mobileAccount = document.getElementById('mobileHeaderAccount-container') as HTMLElement | null;
            const mobileSearchBtn = document.getElementById('mobileSearch-button') as HTMLElement | null;
            const searchContainer = document.getElementById('search-container') as HTMLElement | null;
            const closeSearchContainer = document.getElementById('closeSearchContainer-button') as HTMLElement | null;
            if (open) {
                logoContainer && (logoContainer.style.display = 'none');
                mobileAccount && (mobileAccount.style.display = 'none');
                mobileSearchBtn && (mobileSearchBtn.style.display = 'none');
                searchContainer && (searchContainer.style.display = 'flex');
                closeSearchContainer && (closeSearchContainer.style.display = 'block');
                return
            }
            logoContainer && (logoContainer.style.display = 'flex');
            mobileAccount && (mobileAccount.style.display = 'flex');
            mobileSearchBtn && (mobileSearchBtn.style.display = 'flex');
            searchContainer && (searchContainer.style.display = 'none');
            closeSearchContainer && (closeSearchContainer.style.display = 'none');

        },
        async search(){
            const input = (<HTMLInputElement>document.getElementById('search-input')).value;
            const url = `/search?name=${input}`;
            window.location.href = url;
        },
        async keySearch(e:any){
            e.keyCode === 13 ? this.search() : null
        }
        
    },
    mounted() {
        this.isLogged();
    }
}
</script>

<style scoped>
header {
    background-color: var(--black-color);
    width: 100vw;
    height: 70px;
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-bottom: 1px solid rgb(75, 76, 78);
    padding: 0 30px;
}

#mobileMenu-nav {
    display: none;
}

.fa-bars,
.fa-xmark {
    display: none;
    cursor: pointer;
}

#closeSearchContainer-button {
    display: none;
}

#userProfile-container>a>div,
#mobileUserProfile-container>a>div{
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
}

nav {
    display: flex;
    align-items: center;
    gap: 10px;
}

nav ul {
    display: flex;
    align-items: center;
    gap: 10px;
}

#search-container {
    display: flex;
    border-radius: 3px;
    border: 2px solid var(--white-color);

}

#mobileSearch-button {
    display: none;
}

nav ul li a {
    color: var(--white-color);
}

#search-input {
    height: 36px;
    outline: none;
    border: none;
    border-radius: 3px;
    padding: 0 10px;
    color: var(--white-color);
    background-color: var(--black-color);
}

#search-button {
    text-align: center;
    padding: 5px;
    cursor: pointer;
    color: var(--white-color);
}

#headerAccount-container {
    display: flex;
    gap: 10px;
}

#headerAccount-container a {
    color: var(--black-color);
    background-color: var(--white-color);
    border: 1px solid var(--white-color);
    padding: 5px;
    border-radius: 3px;
    transition: 200ms;
}

#headerAccount-container a:hover {
    color: var(--white-color);
    border: 1px solid var(--white-color);
    background-color: var(--black-color);
}

#userProfile-container a img {
    border-radius: 50%;
}

#mobileHeaderAccount-container,
#mobileUserProfile-container {
    display: none;
}



@media screen and (max-width: 690px) {
    header {
        justify-content: space-between;
    }

    #search-container {
        width: 100%;
    }

    #search-input {
        width: 100%;
    }

    .fa-bars,
    .fa-xmark {
        display: block;
    }

    .fa-bars {
        font-size: 2em;
    }

    #logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    #logo-container img {
        width: 48px;
    }

    nav {
        display: none;
    }

    #mobileSearch-button {
        display: none;
    }

    #mobileMenu-nav {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(-250px);
        align-items: end;
        background-color: var(--black-color);
        border-right: 2px solid var(--white-color);
        flex-direction: column;
        height: 100vh;
        width: 250px;
        padding: 10px;
        gap: 20px;
        transition: all 250ms;
    }

    #mobileMenu-nav.active {
        transform: translateX(0);
    }

    #mobileMenu-nav i {
        font-size: 2em;
    }

    #mobileMenu-nav ul {
        width: 100%;
        flex-direction: column;
    }

    #mobileMenu-nav ul li {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
        height: 40px;
        width: 100%;
        text-align: center;
    }

    #mobileMenu-nav ul li a {
        color: var(--white-color);
        width: 100%;
    }

    #mobileHeaderAccount-container {
        display: flex;
        justify-content: center;
        min-width: 124px;
        gap: 10px;
    }

    #mobileHeaderAccount-container a {
        text-align: center;
        padding: 5px;
        font-size: 1em;
        color: var(--black-color);
        border: 1px solid var(--black-color);
        background-color: var(--white-color);
        border-radius: 3px;
        transition: 250ms;
    }

    #mobileHeaderAccount-container a:hover {
        background-color: var(--black-color);
        color: var(--white-color);
        border: 1px solid var(--white-color);
    }

    #mobileUserProfile-container {
        display: block;
    }

    #mobileUserProfile-container a img {
        border-radius: 50%;

    }
}

@media screen and (max-width: 390px) {
    #mobileSearch-button {
        display: block;
    }

    #search-container {
        display: none;
        align-items: center;
    }

    #closeSearchContainer-button {
        font-size: 2em;
        margin-right: 10px;
    }


}
</style>