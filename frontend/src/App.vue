<script setup>
import { ref } from "vue";
import { Vue3Snackbar } from "vue3-snackbar";
import AddUserDialog from "./components/addUserDialog.vue";
import UserList from "./components/userList.vue";

const showDialog = ref(false);

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};
</script>

<template>
  <div class="flex flex-col px-6 py-2 justify-center gap-y-2">
    <h1 class="text-3xl font-bold text-emerald-800 text-center">
      User Management
    </h1>
    <div class="flex flex-row justify-end lg:px-20">
      <button class="btn" @click="toggleDialog">ADD USER</button>
    </div>
    <div class="lg:px-20">
      <UserList />
    </div>
    <AddUserDialog v-if="showDialog" @close="toggleDialog" />
  </div>
  <vue3-snackbar top right :duration="4000"></vue3-snackbar>
</template>
