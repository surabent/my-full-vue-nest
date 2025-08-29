<script setup lang="ts">
import { ref } from "vue";
import EditUserDialog from "./editUserDialog.vue";
import DeleteUserDialog from "./deleteUserDialog.vue";
const props = defineProps({
  id: Number,
  name: String,
  nickname: String,
  email: String,
});

const showEditDialog = ref(false);
const showDeleteDialog = ref(false);

const toggleEditDialog = () => {
  showEditDialog.value = !showEditDialog.value;
};
const toggleDeleteDialog = () => {
  showDeleteDialog.value = !showDeleteDialog.value;
};
</script>

<template>
  <div
    class="bg-white border-l-blue-500 border-l-4 p-4 rounded shadow flex flex-row justify-between hover:border-l-8 hover:shadow-lg transition-all duration-150 cursor-pointer"
  >
    <div class="flex flex-col ml-3 items-start">
      <h4 class="text-lg font-bold">{{ props.name }}</h4>
      <p>{{ props.nickname }}</p>
      <p>{{ props.email }}</p>
    </div>
    <div class="flex flex-row items-center gap-x-2">
      <button class="btn" @click="toggleEditDialog">EDIT</button>
      <button class="btn-red" @click="toggleDeleteDialog">DELETE</button>
    </div>
    <EditUserDialog
      v-if="showEditDialog"
      :id="props.id"
      :name="props.name"
      :nickname="props.nickname"
      :email="props.email"
      @close="toggleEditDialog"
    />
    <DeleteUserDialog
      v-if="showDeleteDialog"
      :id="props.id"
      :name="props.name"
      :nickname="props.nickname"
      :email="props.email"
      @close="toggleDeleteDialog"
    />
  </div>
</template>
