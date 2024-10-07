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
                <router-link :to="{ name: 'designer' }">
                    <span class="icon">
                        <ion-icon name="bonfire-outline"></ion-icon>
                    </span>
                    <span class="text">Design</span>
                </router-link>
                <router-link :to="{ name: 'planes' }">
                    <span class="icon">
                        <ion-icon name="journal-outline"></ion-icon>
                    </span>
                    <span class="text">Subscriptions</span>
                </router-link> 
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
.menu{
    width: 90%;
    margin: 0 auto;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 70px;
    /* background: rebeccapurple; */

}
nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>