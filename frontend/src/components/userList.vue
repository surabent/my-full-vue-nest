<template>
  <div class="h-[600px] w-[750px] overflow-y-auto">
    <ul v-if="users.length" class="space-y-4">
      <li v-for="user in users" :key="user.id">
        <Card
          :name="user.name"
          :nickname="user.nickname"
          :email="user.email"
          :id="user.id"
        />
      </li>
    </ul>
    <p v-else>No users found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "../store/userStore";
import Card from "./card.vue";

const users = ref([]);

onMounted(async () => {
  const userStore = useUserStore();
  await userStore.fetchUsers();
  users.value = userStore.users;
});

watch(
  () => useUserStore().users,
  (newUsers) => {
    users.value = newUsers;
  },
);
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
</style>
