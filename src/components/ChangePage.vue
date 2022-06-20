<template>
  <div class="d-flex justify-content-center">
    <button
      class="selectable"
      :class="`btn btn-${previousPage ? 'white' : 'black'}`"
      @click="changePage(previousPage)"
      :disabled="!previousPage"
    >
      Previous Page
    </button>
    <button
      :disabled="!nextPage"
      class="btn btn selectable"
      @click="changePage(nextPage)"
    >
      Next Page
    </button>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
export default {
  setup() {
    return {
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      async changePage(url) {
        try {
          await postsService.changePage(url);
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