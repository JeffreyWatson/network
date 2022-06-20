<template>
  <div class="container-fluid">
    <div class="row">
      <!--  -->
      <div class="col-md-3">
        <Profile class="ms-2" />
        <!-- This will be for account stuff -->
      </div>
      <!--  -->
      <div class="col-md-6">
        <CreatePost class="m-3" />
        <ChangePage />
        <!-- <div class="d-flex justify-content-center">
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
        </div> -->
        <Post v-for="p in posts" :key="p.id" :posts="p" />
      </div>
      <!--  -->
      <div class="col-md-3">
        <img
          class="img-fluid mt-4 rounded"
          v-for="b in billboards"
          :key="b.id"
          :billboards="b"
          :src="b.tall"
          alt=""
        />
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { billboardsService } from "../services/BillboardsService";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts();
        await billboardsService.getBillboards();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      billboards: computed(() => AppState.billboards),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
