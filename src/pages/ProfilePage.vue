<template>
  <div class="container-fluid text-black">
    <div
      class="row bg-img"
      :style="`background-image: url(${profile.coverImg})`"
    ></div>
    <div class="row justify-content-center">
      <img class="img-fluid profile-img" :src="profile.picture" alt="" />
      <h2 class="col-md-12 text-center">
        {{ profile.name }}
      </h2>
      <p class="text-center"><i class="mdi mdi-bio">||</i>{{ profile.bio }}</p>
      <p class="text-center">
        <i class="mdi mdi-bullseye-arrow">||</i>{{ profile.class }}
      </p>
      <div class="text-center mb-2">
        <i class="mdi mdi-github">||</i>
        <a href="https://github.com/JeffreyWatson">
          {{ profile.github }}
        </a>
      </div>
      <p class="text-center">
        <i class="mdi mdi-school">||</i>{{ profile.graduated }}
      </p>
      <p class="text-center">
        <i class="mdi mdi-linkedin">||</i>{{ profile.linkedin }}
      </p>
      <p class="text-center">
        <i class="mdi mdi-file-account">||</i>{{ profile.resume }}
      </p>
    </div>
    <div class="row justify-content-around">
      <img
        class="img-fluid custom rounded"
        :key="b.id"
        :billboards="b"
        v-for="b in billboards"
        :src="b.banner"
        alt=""
      />
    </div>
    <ChangePage />
    <Post class="mt-3 text-success" v-for="p in posts" :key="p.id" :posts="p" />
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
import { billboardsService } from "../services/BillboardsService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await profilesService.getProfile(route.params.id);
        await postsService.getProfilePosts(route.params.id);
        await billboardsService.getBillboards();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      billboards: computed(() => AppState.billboards),
    };
  },
};
</script>


<style lang="scss" scoped>
.bg-img {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.profile-img {
  width: 175px;
  height: 150px;
  object-fit: cover;
  object-position: center;
  border-radius: 25px;
}

.custom {
  width: 45%;
  height: 225px;
  justify-content: space-between;
}
</style>
