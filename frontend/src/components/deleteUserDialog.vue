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

const deleteUser = async () => {
  if (typeof id === "number") {
    isLoading.value = true;
    try {
      await store.deleteUser(id);
      await store.fetchUsers();
      snackbar.add({
        type: "success",
        text: "ลบข้อมูลผู้ใช้สำเร็จ",
      });
      closeDialog();
    } catch (error) {
      console.error("Failed to delete user:", error);
      snackbar.add({
        type: "error",
        text: "ลบข้อมูลผู้ใช้ไม่สำเร็จ กรุณาตรวจสอบ console.log",
      });
    } finally {
      isLoading.value = false;
    }
  } else {
    snackbar.add({
      type: "error",
      text: "ลบข้อมูลผู้ใช้ไม่สำเร็จข้อมูล id ไม่ถูกต้อง",
    });
  }
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
        <span class="text-lg font-bold text-red-600"> DELETING USER... </span>
      </div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold text-red-600">Delete User</h2>
        <button
          @click="closeDialog"
          class="text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ❌
        </button>
      </div>
      <div class="flex flex-col m-3">
        <p class="text-red-500 font-bold">
          This data will be permanently remove
        </p>
        <p>{{ name }}</p>
        <p>{{ nickname }}</p>
        <p>{{ email }}</p>
      </div>
      <div class="flex flex-row gap-x-1 justify-center">
        <button
          @click="closeDialog"
          class="border-2 border-blue-500 bg-blue-50 p-2 rounded text-blue-700 cursor-pointer hover:border-blue-400 hover:bg-blue-100 text-sm font-bold"
          :disabled="isLoading"
        >
          CANCEL</button
        ><button @click="deleteUser" class="btn-red ml-2" :disabled="isLoading">
          DELETE USER
        </button>
      </div>
    </div>
  </div>
</template>
