<template>
  <div class="modal-container" v-if="showModal">
      <div class="modal-content">
          <h2 class="header">Move from {{ f }} to</h2><div>
            <div>
  <label for="userSelector">Select a User:</label>
  <select v-model="UserFolderName" id="userSelector" >
    <option v-for="user in userfolders" :key="user.id" :value="user.id">{{ user["name"] }}</option>
  </select>
</div>
          </div>
          <button @click="moveMail()">Move</button>
         
          <div>
              <button @click="closeModal">Cancle</button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import search from "./input/search.vue"
export default {
components:{
  search,
},
created()
{
  this.f=this.$route.query.folder
  this.moved=this.$route.query. myList
  this.getuserfolders()
  
},

data() {
  return {
    showModal: true,
    UserFolderName: null,
    name:"",
    userfolders:[],
    f:"",
    moved:[]
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
  },  async getuserfolders() {
try {
  const response = await axios.get(`https://email-server-back.onrender.com/userfolders/getuserfolders/${this.$route.query.userid}`);
  this.userfolders = response.data;
  console.log(this.userfolders);
  console.log(folder)
  console.log("User folders retrieved successfully yes i mean it!");
} catch (error) {
  console.error("Error getting user folders:", error);
}
},async Move()
{
  
  this.closeModal()   
},async moveMail() {
    try {
      const apiUrl = `https://email-server-back.onrender.com/mails/movemails/${this.$route.query.userid}`;

      const moveRequest = {
        from: this.f,
        id: this.moved,
        to: this.UserFolderName,
      };

      console.log(moveRequest);

      const response = await axios.put(apiUrl, moveRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

    } catch (error) {
      console.error('Error moving mail:', error);
    }

    this.closeModal();
  }
  
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