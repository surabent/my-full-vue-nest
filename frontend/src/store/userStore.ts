import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

export const useUserStore = defineStore("user", {
  state: () => ({ users: [] as any[] }),
  actions: {
    async fetchUsers() {
      const res = await axios.get(API_URL);
      this.users = res.data;
    },
    async addUser(user: { name: string; email: string; nickname: string }) {
      await axios.post(API_URL, user);
      await this.fetchUsers();
    },
    async updateUser(id: number, user: any) {
      await axios.put(`${API_URL}/${id}`, user);
      await this.fetchUsers();
    },
    async deleteUser(id: number) {
      await axios.delete(`${API_URL}/${id}`);
      await this.fetchUsers();
    },
  },
});
