<template>
  <!-- menu -->
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </header>

  <main>
    <router-view/>
  </main>

  <footer>
    <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi delectus error itaque eveniet accusamus illo quaerat tenetur ab voluptate voluptatum quasi, culpa nobis facere unde tempora laudantium et consequatur reiciendis?</h1>
  </footer>
</template>

<style>
/* nav {
  padding: 30px;
} */

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
