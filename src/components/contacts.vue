<template>
  <div class="contact-container">
    <div class="search-container">
      <input
        type="text"
        class="search-input"
        v-model.trim="this.searchName"
        @keydown="fetchContacts()"
        placeholder="Enter name...."
      />
    </div>
    <br />
    <button @click="sortContacts" class="sort-button">sort</button>
    <br />
    <h2>Contact List</h2>
    <!-- Display Contacts -->
    <ul class="contact-list">
      <li
        v-for="(contact, index) in contacts"
        :key="index"
        class="contact-item"
      >
        <div v-if="!contact.isEditing">
          <span
            ><h4>Name:</h4>
            {{ contact.name }}</span
          >
          <span
            ><h4>Email:</h4>
            {{ contact.emails }}</span
          >
          <br />
          <button @click="editContact(index)">Edit</button>
          <button @click="deleteContact(index)">Delete</button>
        </div>
        <div v-else>
          <label for="editedName"><h4>Edit Name:</h4></label>
          <input v-model="this.editname" id="editedName" type="text" required />

          <button @click="saveContact(index)">Save</button>
          <button @click="cancelEdit(index)">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      editname: "",

      searchName: "",
      recievedContact: {},
      contacts: [],
      userId: this.$route.query.userid,
      //   userId: "sdsd,
    };
  },
  methods: {
    // deleteContact(index) {
    //   this.contacts.splice(index, 1);
    // },
    editContact(index) {
      this.contacts[index].isEditing = true;
    },
    async fetchContacts() {
      console.log(this.searchName);
      if (this.searchName == "") {
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/contacts/search",
          null,
          {
            params: {
              id: this.userId,
              name: this.searchName,
            },
          }
        );

        this.recievedContact = response.data;
        console.log(this.recievedContact);
        const contactExists = this.contacts.some(
          (contact) => contact.emails === this.recievedContact.emails
        );

        if (contactExists) {
          console.log("Contact already exists");
        } else if (this.recievedContact != "") {
          // Add the contact to the list
          this.contacts.push(this.recievedContact);
          console.log("Contact added successfully");
        }
        // console.log(this.contacts.length);
        // this.contacts.push(this.recievedContact);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    async saveContact(index) {
      try {
        // Send a PUT request for editing

        const response = await axios.post(
          "http://localhost:8080/contacts/editContact",
          null,
          {
            params: {
              id: this.userId,
              name: this.editname,
              email: this.contacts[index].emails,
            },
          }
        );

        console.log("Edit successful:", response.data);

        this.contacts[index].name = this.editname;
        this.contacts[index].isEditing = false;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteContact(index) {
      try {
        // Send a PUT request for editing

        const response = await axios.post(
          "http://localhost:8080/contacts/deleteContact",
          null,
          {
            params: {
              id: this.userId,
              email: this.contacts[index].emails,
            },
          }
        );

        this.contacts.splice(index, 1);

        console.log("Edit successful:", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async sortContacts() {
      try {
        // Send a PUT request for editing

        const response = await axios.post(
          "http://localhost:8080/contacts/sortContacts",
          null,
          {
            params: {
              id: this.userId,
            },
          }
        );
        this.contacts = response.data;
        console.log(this.contacts);

        console.log("Edit successful:", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    cancelEdit(index) {
      this.contacts[index].isEditing = false;
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

.contact-item div {
  flex-grow: 1; /* Make the div take up remaining space */
}

.contact-item button {
  background-color: #f44336;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 4px;
  margin-inline: 20px;
  cursor: pointer;
}

.contact-item button:hover {
  background-color: #d32f2f;
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

.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Optional: Add some styles for placeholder text */
.search-input::placeholder {
  color: #aaa;
}

/* Optional: Add styles for focus state */
.search-input:focus {
  outline: none;
  border-color: #2196f3; /* Change border color on focus */
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.5); /* Add a subtle box shadow on focus */
}
</style>
