<template>
  <div class="container mt-4 pt-3 bg-black rounded">
    <div class="d-flex justify-content-center me-5">
      <img class="rounded home-img ms-5" :src="profile.picture" alt="" />
    </div>
    <p class="col-md-12 text-center">
      {{ profile.name }}
    </p>
    <p class="text-start link-text">
      <i class="mdi mdi-bio">-</i>{{ profile.bio }}
    </p>
    <p class="text-start link-text">
      <i class="mdi mdi-bullseye-arrow">-</i>{{ profile.class }}
    </p>
    <div class="text-start mb-2 link-text">
      <i class="mdi mdi-github">-</i>
      <a href="https://github.com/JeffreyWatson">
        {{ profile.github }}
      </a>
    </div>
    <p class="text-start link-text">
      <i class="mdi mdi-school">-</i>{{ profile.graduated }}
    </p>
    <p class="text-start link-text">
      <i class="mdi mdi-linkedin">-</i>{{ profile.linkedin }}
    </p>
    <p class="text-start link-text">
      <i class="mdi mdi-file-account">-</i>{{ profile.resume }}
    </p>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
export default {
  props: { profile: { type: Object, required: true } },
  setup(props) {
    return {
      async getProfile() {
        try {
          await profilesService.getProfile(props.profiles.id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      profile: computed(() => AppState.profile),
    };
  },
};
</script>


<style lang="scss" scoped>
.home-img {
  max-height: 125px;
  max-width: 125px;
}

.link-text {
  font-size: 10pt;
  overflow-wrap: break-word;
}
</style>