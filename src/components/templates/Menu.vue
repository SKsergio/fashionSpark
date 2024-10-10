<template>
    <nav class="menu">

        <ul class="nav__menu">
            <li class="nav__item">
                <router-link :to="{ name: 'home' }">
                    <span class="icon">
                        <ion-icon name="home-outline"></ion-icon>
                    </span>
                    <span class="text">Home</span>
                </router-link> 
            </li>

            <li class="nav__item">
                <router-link :to="{ name: 'designer' }">
                    <span class="icon">
                        <ion-icon name="bonfire-outline"></ion-icon>
                    </span>
                    <span class="text">Design</span>
                </router-link>
            </li>

            <li class="nav__item">
                <router-link :to="{ name: 'planes' }">
                    <span class="icon">
                        <ion-icon name="journal-outline"></ion-icon>
                    </span>
                    <span class="text">Subscriptions</span>
                </router-link> 
            </li>

            <li class="nav__item">
                <router-link :to="{ name: 'profile' }">
                    <span class="icon">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                    <span class="text">Profile</span>
                </router-link> 
            </li>
        </ul>
       
    </nav>
</template>

<script setup>
</script>

<style scoped>
@import url('@/css/variables.css');
.menu{
    width: 90%;
    height: 110px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}
.nav__menu{
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 33px;
}
.nav__item{
    list-style: none;
    position: relative;
    z-index: 1;
}

.nav__item a{
    font-weight: bold;
    color: var( --color-backgroundWhite);
    text-decoration: none;
    font-family: var(--font-decoration2);
    font-size: 23px;
}

.nav__item a.router-link-exact-active {
    color: var(--color-menuActive);
}
</style>