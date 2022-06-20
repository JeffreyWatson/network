<template>
  <div class="text-center">
    <h1>Good Day {{ account.name }}</h1>
    <img class="img-fluid rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container text-black">
    <div class="row justify-content-center">
      <div class="col-6">
        <form
          class="d-flex flex-column"
          action=""
          @submit.prevent="saveAccount"
        >
          <label for="">Whats your name?</label>
          <input type="text" v-model="editable.name" />
          <label for="">Add a picture.</label>
          <input type="text" v-model="editable.picture" />
          <label for="">Add a cover image.</label>
          <input type="text" v-model="editable.coverImg" />
          <label for="">Bio</label>
          <input type="text" v-model="editable.bio" />
          <label for="">Class year</label>
          <input type="text" v-model="editable.class" />
          <label for="">Github</label>
          <input type="text" v-model="editable.github" />
          <label for="">Graduated?</label>
          <input type="text" v-model="editable.graduated" />
          <label for="">LinkedIn</label>
          <input type="text" v-model="editable.linkedin" />
          <label for="">Resume</label>
          <input type="text" v-model="editable.resume" />
          <button class="btn btn-success">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
  <div class="row justify-content-around mt-3 gx-0">
    <img
      class="img-fluid custom"
      :key="b.id"
      :billboards="b"
      v-for="b in billboards"
      :src="b.banner"
      alt=""
    />
  </div>
</template>


<script>
import { computed, popScopeId, ref, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
import { billboardsService } from "../services/BillboardsService";
export default {
  name: "Account",
  setup() {
    const editable = ref({});
    watchEffect(() => {
      AppState.account;
      logger.log("account changes", AppState.account, editable.value);
      editable.value = { ...AppState.account };
    });
    return {
      editable,
      account: computed(() => AppState.account),
      billboards: computed(() => AppState.billboards),
      async saveAccount() {
        try {
          await accountService.editAccount(editable.value);
          await billboardsService.getBillboards();
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
.custom {
  width: 45%;
  height: 225px;
  justify-content: space-between;
}
</style>
