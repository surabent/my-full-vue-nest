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
    class="shadow-lg bg-white rounded-xl px-4 py-2 flex flex-col md:flex-row gap-y-2 justify-start md:justify-between md:items-end"
  >
    <div class="flex flex-col w-full">
      <div>
        <h4 class="text-lg font-bold">{{ props.name }}</h4>
        <div class="w-full h-[2px] bg-blue-600"></div>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between gap-y-2">
        <div>
          <p class="font-semibold text-gray-700">
            Nickname: {{ props.nickname }}
          </p>
          <p class="text-gray-600">Email: {{ props.email }}</p>
        </div>
        <div class="flex flex-row items-end justify-end">
          <div class="flex flex-row gap-x-2">
            <button class="btn" @click="toggleEditDialog">EDIT</button>
            <button class="btn-red" @click="toggleDeleteDialog">DELETE</button>
          </div>
        </div>
      </div>
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
