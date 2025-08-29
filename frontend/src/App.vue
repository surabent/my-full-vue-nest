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
  <div class="p-8 max-w-2xl flex flex-col gap-y-2 items-center">
    <h1 class="text-2xl font-bold mb-4 text-emerald-800">User Management</h1>
    <div class="self-end flex flex-row items-end">
      <button class="btn" @click="toggleDialog">ADD USER</button>
    </div>
    <div class="my-4">
      <UserList />
    </div>
    <AddUserDialog v-if="showDialog" @close="toggleDialog" />
  </div>
  <vue3-snackbar top right :duration="4000"></vue3-snackbar>
</template>
