<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black px-3">
    <div class="text-success fw-bold me-5"><u>Network</u></div>
    <ul class="navbar-nav me-5">
      <li>
        <router-link
          :to="{ name: 'Home' }"
          class="btn text-success lighten-30 selectable text-uppercase"
        >
          Home
        </router-link>
      </li>
    </ul>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button> -->
    <div
      class="collapse navbar-collapse d-flex justify-content-between"
      id="navbarText"
    >
      <Login />
      <Search />
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
