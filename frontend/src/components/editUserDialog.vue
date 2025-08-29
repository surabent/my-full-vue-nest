<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useUserStore } from "../store/userStore";
import { useSnackbar } from "vue3-snackbar";
const snackbar = useSnackbar();

const props = defineProps({
  id: Number,
  name: String,
  nickname: String,
  email: String,
});

const store = useUserStore();
const id = props.id;
const name = ref(props.name || "");
const nickname = ref(props.nickname || "");
const email = ref(props.email || "");
const isLoading = ref(false);

const emit = defineEmits(["close"]);

const closeDialog = () => {
  emit("close");
};

const updateUser = async () => {
  if (name.value && email.value && nickname.value && typeof id === "number") {
    isLoading.value = true;
    try {
      await store.updateUser(id, {
        name: name.value,
        nickname: nickname.value,
        email: email.value,
      });
      await store.fetchUsers();
      snackbar.add({
        type: "success",
        text: "แก้ไขช้อมูลผู้ใช้สำเร็จ",
      });
      closeDialog();
    } catch (error) {
      console.error("Failed to update user:", error);
      snackbar.add({
        type: "error",
        text: "แก้ไขข้อมูลไม่ผ่าน กรุณาตรวจสอบ console.log",
      });
    } finally {
      isLoading.value = false;
    }
  }
  snackbar.add({
    type: "error",
    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนการกดแก้ไข",
  });
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center blur-bg bg-white/80"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-sm shadow-2xl relative">
      <div
        class="absolute inset-0 blur-bg bg-white/80 flex flex-col items-center justify-center w-full h-full"
        v-if="isLoading"
      >
        <span class="text-lg font-bold text-blue-600"> UPDATING USER... </span>
      </div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">Update User</h2>
        <button
          @click="closeDialog"
          class="text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ❌
        </button>
      </div>
      <form @submit.prevent="updateUser" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="w-full p-2 border rounded"
          :disabled="isLoading"
        />
        <input
          v-model="nickname"
          type="text"
          placeholder="Nickname"
          class="w-full p-2 border rounded"
          :disabled="isLoading"
        />
        <input
          v-model="email"
          type="text"
          placeholder="Email"
          class="w-full p-2 border rounded"
          :disabled="isLoading"
        />
        <div class="mt-6 flex justify-end">
          <button type="submit" class="btn ml-2" :disabled="isLoading">
            UPDATE USER
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
