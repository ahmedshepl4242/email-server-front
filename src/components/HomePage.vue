<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import Folders from './components/Folders/Folders.vue';
</script>

<template>
  <link
    href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
    rel="stylesheet"
  />


  <div class="mail">
    <div class="mail-sidebar">
      <div class="mail-profile"></div>
        <button @click="deleteAccount()" class="del">
    delete Account 
  </button>

      
      <!-- /end clock compose -->
      <ul>
        <li @click="goTocomposer()">
          <button class="new-email">
              <!-- <span class="fa fa-inbox fa-fw"></span> -->
              <h>+</h> New Emial
            
          </button >
        </li>
        <li @click="goToinbox()">
          
            <span class="fa fa-inbox fa-fw"></span>
            <span>Inbox</span>
            <span></span>
          
        </li>
        <li @click="goToSend()">
         
            <span class="fa fa-send fa-fw"></span>
            <span>Sent</span>
            <span></span>
          
        </li>
        <li @click="goTodraft()">
          
            <span class="fa fa-file-o fa-fw"></span>
            <span>Drafts</span>
            <span></span>
          
        </li>
        <li @click="goTotrash()">
          
            <span class="fa fa-trash-o fa-fw"></span>
            <span>Trash</span>
            <span></span>
          
        </li>

        <li @click="goTonewcontact()">
         
            <!-- <span class="fa fa-trash-o fa-fw"></span> -->
            <span>➕Contact</span>
            <span></span>
       
        </li>

        <li @click="goTocontact()">
          
            <!-- <span class="fa fa-trash-o fa-fw"></span> -->
            <span>Contacts</span>
            <span></span>
          
        </li>

        <li @click="goTonewuserfolder()" >
          
          <span class="fa fa-plus"></span>
            <span>new</span>
          
        </li>
        <li>

        <li v-for="(u, index) in userfolders" :key="u.id" >
         
            
              <!--v-for="(mail, index) in emails" :key="mail.id"-->
              <div @click="goTouserfolder(u.id)">
              <span class="fa fa-briefcase"></span>
              <span>{{ u["name"] }}</span>
              </div>
              <span></span>
            
          <div>
          <span
            class="fa fa-trash-o fa-fw"
            @click="deleteUserFolder(u.id)"
          ></span></div><div>
          <span class="fa fa-pencil fa-fw" @click="rename(u.id)"></span></div>
        </li></li>

        <!-- </router-link> -->
      </ul>
    </div>
    <!-- /end mail sidebar -->
    <div class="mail-post-list">
      <RouterView name="list" :key="$route.fullPath"></RouterView>
      <!-- /end listing -->
    </div>
    <!-- /end mail post list -->
    <RouterView name="mail" :key="$route.fullPath"></RouterView>
  </div>
  <!-- /end mail -->
</template>
<script>
import axios from "axios";
export default {
 
  created() {
    // This function will be called when the component is created
    this.getAccount();
    this.getuserfolders();
  },
  data() {
    return {
      account: {
        inbox: {
          emails: [5],
          Name: "ahmed",
        },
        trash: {
          emails: [5],
          Name: "ahmed",
        },
      },
      userfolders: [],
      loading: false,
    };
  },
  methods: {
      async deleteAccount(){
        let x=this.$route.query.userid
 console.log("delete");
      try {
        const response = await axios.post(
          `https://email-server-back.onrender.com/account/delete`,null,

        { params: { id: x}}
        );

        console.log(this.$route.query.userid)
       
      } catch (error) {
        console.error(error);
      }

      this.$router.push({
        path: "/", // <-- Make sure this matches the route nam
      })
    },
    async deleteUserFolder(id) {
      try {
        const response = await axios.delete(
          `https://email-server-back.onrender.com/userfolders/deleteuserfolder/${this.$route.query.userid}`,
          { data: id }
        );
        console.log("delete");
      } catch (error) {
        console.error("Error deleting user folder:", error);
      }
    },
    async getuserfolders() {
      try {
        const response = await axios.get(
          `https://email-server-back.onrender.com/userfolders/getuserfolders/${this.$route.query.userid}`
        );
        this.userfolders = response.data;
        console.log(this.userfolders);
        console.log("User folders retrieved successfully!");
      } catch (error) {
        console.error("Error getting user folders:", error);
      }
    },
    async getAccount() {
      try {
        const response = await axios.get(
          `https://email-server-back.onrender.com/account/getaccount/${this.$route.query.userid}`
        );
        this.account = response.data;
        console.log(this.account);
        console.log("User account retrieved successfully!");
      } catch (error) {
        console.error("Error getting user account:", error);
      }
    },
    rename(idd) {
      // Your logic for handling the click event
      this.$router.push({
        name: "renameuserfolder", 
        // <-- Make sure this matches the route name
        
        query: {id: idd, userid: this.$route.query.userid },
       
      });
    },

 
    goToinbox()
    {
      this.$router.push({
        name: "home", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid },
      });
    },goTotrash()
    {
      this.$router.push({
        name: "trash", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid },
      });
    },goTonewuserfolder()
    {
      this.$router.push({
        
        name: "createuserfolderModal", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid },

      });
    },
    goToSend()
    {
      this.$router.push({
        name: "send", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid },
      });
    },goTodraft()
    {
      this.$router.push({
        name: "draft", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid },
      });
    },goTocomposer()
    {
      this.$router.push({
        path:"/newEmail", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid },
      });
    },goTouserfolder(id)
    {
      this.$router.push({
        path:`/UserFolders/${id}`, // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid }, });
    },goTonewcontact()
    {
      this.$router.push({
        path: "/addContact",
        name:"addContact", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid }, });
    },goTocontact()
    {
      this.$router.push({
        path: "/contacts",
        name:"contacts", // <-- Make sure this matches the route name
        query: { userid: this.$route.query.userid }, });
    },
    


  },
};
</script>
<style lang="scss">
.mail {
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
}

html,
body {
  height: 100%;
  width: 100%;
  -webkit-tap-highlight-color: rgba(
    0,
    0,
    0,
    0
  ); /* disable webkit tap highlight */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow: hidden;
  font-size: 100%;
  line-height: 125%;
  -o-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* Clearfix hack by Nicolas Gallagher: http://nicolasgallagher.com/micro-clearfix-hack/ */
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background: #f5f5f5;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #aaa;
}

::-webkit-scrollbar-corner {
  background: white;
}
// .mail {
//   width: 100%;
//   height: 100%;
//   padding: 0;
//   margin: 0;
//   vertical-align: top;
// }
.mail-sidebar,
.mail-post-list,
.mail-message {
  border: none;
  vertical-align: top;
  height: 100%;
  margin: 0;
  float: left; /* display: inline-block leaves a gap... */
}
.mail-sidebar {
  width: 180px;
  height: 100%;
  background-color: #4d52a4;
  border: none;
  overflow-y: auto;
  box-sizing: border-box;
}
.mail-sidebar .mail-profile {
  // width: 100%;
  height: 140px;
  background-image: url("../assets/Images/IMG-20230910-WA0005.jpg");
  background-size: cover;
  background-position: 50% 30%;
  display: block;
  border-radius: 50%;
  margin: 10px;
  margin-right: 10px;
  padding: 0;
  border: none;
  background-color: #0e85ed;
}
.mail-sidebar .mail-profile > div {
  background: rgba(21, 11, 11, 0.5);
  height: 100%;
}
.mail-sidebar .mail-profile > div > div {
  height: 80px;
  width: 100%;
}

// .mail-sidebar button {
//   display: block;
//   width: 100%;
//   margin: 8px auto;
//   height: 36px;
//   // border-radius: 4px;
//   font-size: 1.5em;
//   color: #fff;
//   // background: rgb(20, 20, 19);
//   outline: none;
//   // box-shadow: none;
//   // border: 2px solid rgb(149, 133, 86);
// }
.mail-sidebar > ul {
  list-style: none;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 24px;
  // border-bottom: 1px solid #666;
}
.mail-sidebar > ul li {
  width: 100%;
  cursor:pointer;
  height: 32px;
  margin-bottom: 20px;
  background-color:transparent;
  font-size: 20px;
  // border
}
.mail-sidebar > ul li  {
  text-decoration: none;
  font-size: 0.75em;
}
.mail-sidebar > ul li:hover {
  background-color:transparent;
  font-size: 12.6px;
}

.mail-sidebar .new-email:hover h {
  font-size: 10px;
}

.mail-sidebar > ul li span {
  display: inline-block;
  margin-bottom:2px;
}
.mail-sidebar > ul li span:last-of-type {
  float: right;
  border: .5px solid #8d8888;
  text-align: left;
  width: 100px;
}
.mail-sidebar .mail-contacts {
  width: 100%;
  margin: 30px;
  padding: 18px;
  margin-top: 50px;
}
.mail-sidebar .mail-contacts > div {
  display: block;
  height: 52px;
  margin: 0;
}
.mail-sidebar .mail-contacts img {
  border-radius: 50%;
  width: 32px;
  display: inline-block;
  vertical-align: top;
}
.mail-sidebar .mail-contacts h4 {
  display: inline-block;
  height: 48px;
  vertical-align: top;
  color: #bbb;
  font-size: 0.85em;
}
.mail-sidebar .mail-contacts h4 > div {
  margin: 0;
  line-height: 14px;
  padding: 0;
}
.mail-sidebar .mail-contacts h4 div:last-of-type {
  font-size: 0.7em;
}

/*********************** */

.mail-post-list {
  width: 260px;
  background: white;
  overflow-y: scroll;
  border: solid rgb(208, 189, 182);
}
/*********************** */
.mail-message {
  background: white;
  height: 100%;
  width: calc(100% - 180px - 260px);
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}
.mail-message div {
  max-width: 640px;
  margin: 0 auto;
  padding: 18px;
}
.mail-message div h1 {
  color: rgb(179, 163, 116);
  font-size: 1.5em;
  font-weight: 300;
  border-bottom: 1px solid #ddd;
  height: 32px;
}
.mail-message .sender-options {
  margin: 0;
  width: 100%;
  padding: 0;
  border-bottom: 1px solid #ddd;
  height: 68px;
}
.mail-message .sender-options img {
  border: 2px solid #777;
  border-radius: 4px;
}
.mail-message .sender-options > div {
  display: inline-block;
  margin: 0;
  padding: 0;
  height: 48px;
  vertical-align: top;
}
.mail-message .sender-options .sender-name,
.mail-message .sender-options a {
  height: 1em;
  margin: 0;
  padding: 0;
  line-height: 1em;
}
.mail-message .sender-options .sender-name {
  font-size: 0.85em;
  color: #777;
}
.mail-message .sender-options  {
  text-decoration: none;
  font-size: 0.75em;
  color: #967c2e;
}
.mail-message .mail-message-body {
  width: 100%;
}
.mail-message .mail-message-body p {
  font-size: 0.9em;
  margin: 7px 4px;
  line-height: 1.5em;
}
.mail-message .sender-options ul {
  list-style: none;
  display: inline-block;
  float: right;
}
.mail-message .sender-options ul li {
  display: inline-block;
  padding: 6px;
  font-size: 0.85em;
  line-height: 1em;
  color: #666;
}
.mail-message .sender-options ul li:nth-child(2) {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
/* Normalize */
/*! normalize.css v2.1.3 | MIT License | git.io/normalize */

/* ==========================================================================
   HTML5 display definitions
   ========================================================================== */

/**
 * Correct block display not defined in IE 8/9.
 */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
  display: block;
}

/**
 * Correct inline-block display not defined in IE 8/9.
 */

audio,
canvas,
video {
  display: inline-block;
}

/**
 * Prevent modern browsers from displaying audio without controls.
 * Remove excess height in iOS 5 devices.
 */

audio:not([controls]) {
  display: none;
  height: 0;
}

/**
 * Address [hidden] styling not present in IE 8/9.
 * Hide the template element in IE, Safari, and Firefox < 22.
 */

[hidden],
template {
  display: none;
}

/* ==========================================================================
   Base
   ========================================================================== */

/**
 * 1. Set default font family to sans-serif.
 * 2. Prevent iOS text size adjust after orientation change, without disabling
 *    user zoom.
 */

html {
  font-family: sans-serif; /* 1 */
  -ms-text-size-adjust: 100%; /* 2 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/**
 * Remove default margin.
 */

body {
  margin: 0;
}

/* ==========================================================================
   Links
   ========================================================================== */

/**
 * Remove the gray background color from active links in IE 10.
 */

a {
  background: transparent;
}

/**
 * Address outline inconsistency between Chrome and other browsers.
 */

a:focus {
  outline: thin dotted;
}

/**
 * Improve readability when focused and also mouse hovered in all browsers.
 */

a:active,
a:hover {
  outline: 0;
}

/* ==========================================================================
   Typography
   ========================================================================== */

/**
 * Address variable h1 font-size and margin within section and article
 * contexts in Firefox 4+, Safari 5, and Chrome.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/**
 * Address styling not present in IE 8/9, Safari 5, and Chrome.
 */

abbr[title] {
  border-bottom: 1px dotted;
}

/**
 * Address style set to bolder in Firefox 4+, Safari 5, and Chrome.
 */

b,
strong {
  font-weight: bold;
}

/**
 * Address styling not present in Safari 5 and Chrome.
 */

dfn {
  font-style: italic;
}

/**
 * Address differences between Firefox and other browsers.
 */

hr {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  height: 0;
}

/**
 * Address styling not present in IE 8/9.
 */

mark {
  background: #ff0;
  color: #000;
}

/**
 * Correct font family set oddly in Safari 5 and Chrome.
 */

code,
kbd,
pre,
samp {
  font-family: monospace, serif;
  font-size: 1em;
}

/**
 * Improve readability of pre-formatted text in all browsers.
 */

pre {
  white-space: pre-wrap;
}

/**
 * Set consistent quote types.
 */

q {
  quotes: "\201C""\201D""\2018""\2019";
}

/**
 * Address inconsistent and variable font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent sub and sup affecting line-height in all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

sub {
  bottom: -0.25em;
}

/* ==========================================================================
   Embedded content
   ========================================================================== */

/**
 * Remove border when inside a element in IE 8/9.
 */

img {
  border: 0;
}

/**
 * Correct overflow displayed oddly in IE 9.
 */

svg:not(:root) {
  overflow: hidden;
}

/* ==========================================================================
   Figures
   ========================================================================== */

/**
 * Address margin not present in IE 8/9 and Safari 5.
 */

figure {
  margin: 0;
}

/* ==========================================================================
   Forms
   ========================================================================== */

/* Reset box model and provide a baseline */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Apply a global font and remove text decorations for buttons */
body {
  font-family: Arial, sans-serif;
}

/* Style for fieldset */
fieldset {
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 15px;
}

legend {
  display: block;
  width: 100%;
  padding: 5px 0;
  font-weight: bold;
  font-size: 1.2em;
}

/* Reset styles for form elements */
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 95%;
  margin: 0;
}

/* Remove default styling for buttons and inputs */
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  cursor: pointer;
    background-color: #aaa9c1cc;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px 30px;
}

/* Style disabled elements */
button[disabled],
html input[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Style checkboxes and radio buttons */
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
}

/* Style search input */
input[type="search"] {
  appearance: none;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

/* Remove inner padding and border in Firefox */
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

/* Style textarea */
textarea {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  resize: vertical;
}

/* Add a bit of margin between form elements */
form > * {
  margin-bottom: 15px;
}


/* ==========================================================================
   Tables
   ========================================================================== */

/**
 * Remove most spacing between table cells.
 */

table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>