<template>
  <div class="modal-container" v-if="showModal">
      <div class="modal-content">
          <h2 class="header">Create User Folder</h2><div>
              <input type="text" placeholder="Enter User Folder name" v-model="UserFolderName">
          </div>
          <button @click="createUserFolder()">Create</button>
         
          <div>
              <button @click="closeModal">Cancle</button>
          </div>
      </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';
export default {
data() {
  return {
    showModal: true,
    UserFolderName: null
  };
},

methods: {
  openModal() {
    this.showModal = true;
  },
  closeModal() {
    this.UserFolderName = null
    this.showModal = false;
    this.$router.push({
      name: "home", // <-- Make sure this matches the route name
      query: { userid: this.$route.query.userid },
    });
  },    async createUserFolder() {

    try {
      const response = await axios.post(`http://localhost:8080/userfolders/createuserfolder/${this.$route.query.userid}`, null, {
        params: {
          id:  uuidv4(),
          name: this. UserFolderName
        }
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error creating user folder:', error);
    }

    this.closeModal();
  },
  
}
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.modal-content button {
  margin: 10px

}

.header{
  margin-bottom: 30px;
}
</style>