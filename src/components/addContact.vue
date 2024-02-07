<template>
  <div class="contact-container">
    <!-- Add Contact Form -->
    <form class="contact-form" @submit.prevent="addcontact">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="newContact.name" type="text" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="newContact.email" type="email" required />
      </div>

      <button type="submit">Add Contact</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      contacts: [],
      // em: "",
      newContact: { id: "", name: "", email: "" },
      userId: this.$route.query.userid,
    };
  },
  methods: {
    async addcontact() {
      try {
        const response = await axios.post(
          "https://email-server-back.onrender.com/contacts/addContact",
          null,
          {
            params: {
              id: this.userId,
              name: this.newContact.name,
              email: this.newContact.email,
            },
          }
        );
        this.newContact.name = "";
        this.newContact.email = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.contact-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-form {
  display: grid;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.contact-list {
  list-style-type: none;
  padding: 0;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 8px;
}

.contact-item button {
  background-color: #f44336;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contact-item button:hover {
  background-color: #d32f2f;
}
</style>
