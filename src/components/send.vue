<template>
  <div class="send">
    <div class="search">
      <h2>
        <span>Send</span>
        <span class="fa fa-send"></span>
      </h2>
      <!-- begin search -->
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search..." />
        <button class="sr" @click="openModal">
          <span class="fa fa-search"></span>
        </button>
      </div>

      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <search
            v-model:from="f"
            v-model:attatchment="at"
            v-model:to="t"
            v-model:subject="sub"
            v-model:body="bd"
          />
          <div class="button-container">
            <button @click="closeModal" class="close-button">Close</button>
            <button @click="searchAction" class="search-button">Search</button>
          </div>
        </div>
      </div>
    </div>
    <div class="sort">
      <button class="sort-button" @click="openModal2">sort</button>
    </div>
    <div v-if="showModal2" class="modal-overlay">
      <div class="modal">
        <sort ref="sortRef" />
        <div class="button-container">
          <button @click="closeModal2" class="close-button">Close</button>
          <button @click="sortAction()" class="search-button">Sort</button>
        </div>
      </div>
    </div>

    <div class="actions">
      <div><input type="checkbox" v-model="all" @change="selectall()" /></div>
      <span class="fa fa-trash-o fa-fw" @click="deleteEmails()"></span>
      <!-- <span class="fa fa-archive" @click="moveToArchive(mail.id)"></span> -->
      <span class="fa fa-mail-reply" @click="openmovemodal()"></span>
    </div>
    <div v-for="(mail, index) in emails" :key="mail.id">
      <!-- Customize the email display as needed -->

      <ListItem
        :recieverName="
          mail.header.to.length > 1
            ? mail.header.to[0] + '...'
            : mail.header.to[0]
        "
        :date="mail.header.date"
        :subject="mail.header.subject"
        @click="openMail(mail.id)"
      />

      <div class="actions">
        <input type="checkbox" v-model="selectedEmails[index]" />
        <span class="fa fa-trash-o fa-fw" @click="deleteEmail(mail.id)"></span>

        <span class="fa fa-mail-reply" @click="move(mail.id)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import search from "./input/search.vue";
import sort from "./input/sort.vue";
import ListItem from "./ListItem.vue";

export default {
  components: {
    search,
    sort,
    ListItem,
  },

  created() {
    this.Userid = this.$route.query.userid;
    this.getemails();
  },
  data() {
    return {
      at: "", // Set your default values here
      t: "",
      f: "",
      sub: "",
      bd: "",
      sortway: "",
      type: "",
      Userid: "",
      showModal: false,
      showModal2: false,

      emails: [],
      selectedEmails: [],
      all: false,
      deletedemails: [],
      movedmails: [],
    };
  },
  methods: {
    async sortAction() {
      this.sortway = this.$refs.sortRef.way;
      console.log(this.sortway);
      const response = await axios.get(
        `http://localhost:8080/sort/getsorted/${this.$route.query.userid}/${this.sortway}/inbox`
      );

      this.emails = response.data;
      console.log(response.data);
      this.closeModal2();
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.emails = [];
    },
    openModal2() {
      this.showModal2 = true;
    },
    closeModal2() {
      this.showModal2 = false;
    },
    searchAction() {
      this.emails = [];
      if (this.f != "") {
        console.log(this.f);
        this.type = "from";
        this.fromSearch(this.f);
      }
      if (this.at != "attach") {
        console.log(this.at);
        this.type = "from";
        this.fromSearch(this.at);
      }
      if (this.t != "") {
        console.log(this.t);
        this.type = "to";
        this.fromSearch(this.t);
      }
      if (this.bd != "") {
        console.log(this.bd);
        this.type = "body";
        this.fromSearch(this.bd);
      }
      if (this.sub != "") {
        console.log(this.sub);
        this.type = "subject";
        this.fromSearch(this.sub);
      }
    },

    async fromSearch(value) {
      console.log(this.Userid);
      console.log(value);

      console.log(this.type);

      try {
        const response = await axios.post(
          "http://localhost:8080/search",
          null,
          {
            params: {
              id: this.Userid,
              item: value,
              folder: "sentFolders",
              type: this.type,
            },
          }
        );
        // push every email in response data in emails by for loop on response data
        for (em in response.data) {
          this.emails.push(em);
        }

        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getemails() {
      try {
        const response = await axios.get(
          `http://localhost:8080/mainfolders/getsentfolder/${this.$route.query.userid}`
        );
        this.emails = response.data;
        this.selectedEmails = [];
        for (let i = 0; i < this.emails["length"]; i++) {
          this.selectedEmails.push(false);
        }
        console.log(this.selectedEmails);
        console.log(this.emails);
        console.log("Sentfolders emails retrieved successfully!");
      } catch (error) {
        console.error("Error getting sent emails:", error);
      }
    },
    selectall() {
      if (this.all == true) {
        this.selectedEmails = [];
        for (let i = 0; i < this.emails["length"]; i++) {
          this.selectedEmails.push(true);
        }
      } else {
        this.selectedEmails = [];
        for (let i = 0; i < this.emails["length"]; i++) {
          this.selectedEmails.push(false);
        }
      }
    },
    async deleteEmail(id) {
      const deleteRequest = {
        name: "sentFolders",
        ids: [id],
      };

      const response = await axios.delete(
        `http://localhost:8080/mails/deletemails/${this.$route.query.userid}`,
        { data: deleteRequest }
      );
      console.log.response.data;
    },
    openmovemodal() {
      this.movedmails = [];
      for (let i = 0; i < this.emails["length"]; i++) {
        if (this.selectedEmails[i] == true) {
          this.movedmails.push(this.emails[i].id);
        }
      }
      console.log(this.Userid);
      this.$router.push({
        name: "movemodal", // <-- Make sure this matches the route name
        query: {
          folder: "sentFolders",
          myList: this.movedmails,
          userid: this.Userid,
        },
      });
    },
    move(id) {
      this.$router.push({
        name: "movemodal", // <-- Make sure this matches the route name
        query: { folder: "inbox", myList: [id], userid: this.Userid },
      });
    },
    async deleteEmails() {
      for (let i = 0; i < this.emails["length"]; i++) {
        if (this.selectedEmails[i] == true) {
          this.deletedemails.push(this.emails[i].id);
        }
      }
      const deleteRequest = {
        name: "sentFolders",
        ids: this.deletedemails,
      };

      const apiUrl = `http://localhost:8080/mails/deletemails/${this.$route.query.userid}`;

      axios
        .delete(apiUrl, { data: deleteRequest })
        .then((response) => {
          console.log("Emails deleted successfully", response);
        })
        .catch((error) => {
          console.error("Error deleting emails", error);
        });
    },
    openMail(id) {
      this.$router.push({
        path: "/send/mail",
        query: {
          userid: this.$route.query.userid,
          id: id,
          path: "getsent",
        },
      });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  width: 60%;
  height: auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(15, 14, 14, 0.3);
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* Adjust margin as needed */
}

.close-button,
.search-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button {
  background-color: #ccc;
}

.search-button {
  background-color: #061106;
  color: white;
}
.search-container {
  position: relative;
}

/* Style for the search input */
.search-input {
  padding: 10px 40px 10px 15px; /* Adjust padding as needed */
  border: 1px solid #ccc; /* Add border */
  border-radius: 5px; /* Optional: Add border-radius for rounded corners */
  width: 200px; /* Set width as needed */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

/* Style for the search button */
.sr {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px;

  cursor: pointer;
  border-radius: 0 5px 5px 0; /* Optional: Add border-radius for rounded corners */
}

/* Style for the search icon */
.sr .fa-search {
  margin-right: 5px;
}

/* General Button Style */
.sr2 {
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  transition-duration: 0.4s;
}

/* Button Hover Style */
.sr2:hover {
  background-color: #0056b3;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.sort-button {
  background-color: #4caf50; /* Green background color */
  color: white; /* White text color */
  border: none; /* Remove border */
  padding: 10px 20px; /* Add some padding */
  text-align: center; /* Center text horizontally */
  text-decoration: none; /* Remove underlines */
  display: inline-block; /* Make it behave like an inline element */
  font-size: 16px; /* Set font size */
  cursor: pointer; /* Add a pointer cursor on hover */
  border-radius: 4px; /* Add some border radius for rounded corners */
  margin-bottom: 20px;
}

.sort-button:hover {
  background-color: #45a049; /* Darker green color on hover */
}
/* Button Active Style */
.sr2:active {
  background-color: #004085;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.24), 0 8px 30px 0 rgba(0, 0, 0, 0.19);
  transform: translateY(4px);
}

.send {
  max-width: 600px; /* Adjust the width as needed */
  margin: auto;
}

.search {
  margin-bottom: 20px;
}

.email {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.sender {
  font-weight: bold;
}

.subject {
  color: #333;
}

.message {
  margin-top: 5px;
}
</style>
