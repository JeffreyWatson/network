<template>
  <div class="row">
    <form @submit.prevent="searchPosts">
      <input
        v-model="search"
        type="text"
        class="col-10"
        placeholder="Search posts"
      />
      <button class="col-2 btn btn-black mb-1">
        <i class="mdi mdi-magnify"></i>
      </button>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const search = ref("");
    return {
      search,
      async searchPosts() {
        try {
          await postsService.searchPosts(`query=${search.value}`);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>