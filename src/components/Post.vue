<template>
  <div class="card m-4 bg-black">
    <div class="card-body">
      <div class="row d-flex flew-row">
        <button
          v-if="posts.creator.id == account.id"
          @click.prevent="deletePost"
          class="btn selectable"
        >
          <i class="mdi mdi-delete"></i>
        </button>
        <div
          class="
            col-md-12
            d-flex
            flex-column
            justify-content-between
            align-items-center
          "
        >
          <img
            class="img-fluid rounded user-img"
            @click.stop="goToProfile"
            :src="posts.creator.picture"
            alt=""
            style="max-height: 200px; max-width: 200px"
          />
          <div class="text-uppercase">
            {{ posts.creator.name }}
          </div>
          <div>
            {{ formatDate(posts.createdAt) }}
          </div>
        </div>
      </div>
      <div class="col-12 mt-3 mb-3 d-flex justify-content-start">
        <p class="special">
          {{ posts.body }}
        </p>
      </div>
      <div class="d-flex justify-content-center">
        <img class="img-fluid post-img rounded" :src="posts.imgUrl" alt="" />
      </div>
      <div class="col-md-12 text-center text-white mt-3 bg-success rounded">
        Like
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  props: { posts: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      goToProfile() {
        router.push({
          name: "Profiles",
          params: { id: props.posts.creatorId },
        });
      },
      async deletePost() {
        try {
          await postsService.deletePost(props.posts.id);
          Pop.toast("Post deleted", "success");
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      formatDate(rawDate) {
        return new Date(rawDate).toLocaleDateString();
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.post-img {
  max-height: 175px;
  max-width: 175px;
}

.user-img {
  max-height: 120px;
  max-width: 120px;
  object-fit: cover;
}

.special {
  inline-size: 525px;
  overflow-wrap: break-word;
}
</style>