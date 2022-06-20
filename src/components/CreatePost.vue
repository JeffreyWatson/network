<template>
  <div class="row justify-content-center bg-black rounded m-4">
    <form
      class="col-10 p-3 d-flex flex-column"
      action=""
      @submit.prevent="createPost"
    >
      <p class="text-center">Create a Post</p>
      <textarea
        name=""
        id=""
        cols="30"
        rows="4"
        placeholder="Tell us something..."
        v-model="postsData.body"
      ></textarea>
      <label class="mt-3" for="imgUrl"></label>
      <input
        placeholder="Post an image"
        type="text"
        v-model="postsData.imgUrl"
      />
      <button class="btn btn-success create">create</button>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  setup() {
    const postsData = ref({});
    return {
      postsData,
      async createPost() {
        try {
          await postsService.createPost(postsData.value);
          postsData.value = {};
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
.create {
  max-width: 80px;
  max-height: 40px;
  align-self: center;
  margin-top: 10px;
}
</style>