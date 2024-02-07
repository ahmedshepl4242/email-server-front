import { createRouter, createWebHistory } from "vue-router";
// // import HomeView from '../views/HomeView.vue'
import inbox from "../components/inbox.vue";
import draft from "../components/draft.vue";
import send from "../components/send.vue";
import trash from "../components/trash.vue";
import CreateUserFolderModal from "../components/CreateUserFolderModal.vue";
import Movemodal from "../components/Movemodal.vue";
import UserFolders from "../components/UserFolders.vue";
import renameUserFolder from "../components/renameUserFolder.vue";
import login from "../components/login.vue";
import HomePage from "../components/HomePage.vue";
import composer from "../components/composer.vue";
import Mail from "../components/Mail.vue";
import contacts from "../components/contacts.vue";
import addContact from "../components/addContact.vue";
import App from "../App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   redirect: "/app", // Redirect root path to /HomePage
    // },
    {
      path: "/",
      name: "App",
      component: () => import("../App.vue"),
      // beforeEnter: (to, from, next) => {
      //   // Your code to run before entering the "App" route
      //   console.log("Before entering App route");
      //   App.data().isLogged = false;
      //   window.sessionStorage.setItem("isLogged", "false");

      //   // Replace the current history entry with the "App" route
      //   // next({ name: "App", replace: true });
      // },
    },
    {
      path: "/HomePage",
      component: HomePage,
      children: [
        {
          path: "/inbox",
          name: "home",
          components: {
            list: inbox
          },
        },
        {
          path: "/inbox/mail",
          components: {
            list: inbox,
            mail: Mail
          }
        },
        {
          path: "/draft",
          name: "draft",
          components: {
            list: draft,
          },
        },
        {
          path: "/send",
          name: "send",
          components: {
            list: send,
          },
        },
        {
          path: "/send/mail",
          components: {
            list: send,
            mail: Mail
          }
        },
        {
          path: "/trash",
          name: "trash",
          components: {
            list: trash,
          },
        },
        {
          path: "/trash/mail",
          components: {
            list: trash,
            mail: Mail
          }
        },
        {
          path: "/contacts",
          name: "contacts",
          components: { list: contacts },
        },
        {
          path: "/addContact",
          name: "addContact",
          components: {
            list: addContact,
          },
        },
        {
          path: "/newuserfolder",
          name: "createuserfolderModal",
          components: {
            list: CreateUserFolderModal,
          },
        },
        {
          path: "/Movemodal",
          name: "movemodal",
          components: {
            list: Movemodal,
          },
        },
        {
          path: "/UserFolders/:id",
          name: "userfolders",
          components: {
            list: UserFolders,
          },
          props: true,
        },
        {
          path: "/UserFolders/:id/mail",
          components: {
            list: UserFolders,
            mail: Mail
          }
        },
        {
          path: "/renameUserFolder",
          name: "renameuserfolder",
          components: {
            list: renameUserFolder,
          },
          props: true,
        },
        {
          path: "/newEmail",
          redirect: "/newEmail/new",
        },
        {
          path: "/newEmail/:id",
          components: {
            list: draft,
            mail: composer,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Your global navigation guard logic
  console.log("Global beforeEach guard");

  // If you want to do something specific for the App route
  if (to.name === "App") {
    console.log("Before entering App route");
    App.data().isLogin = false;
    window.sessionStorage.setItem("isLogged", "false");

    // Get a value from sessionStorage
    const isLogged = window.sessionStorage.getItem("isLogged");
    // next({ name: "App", replace: true });
    console.log(isLogged);
    // next({ name: "App" });
    // Your logic for App route
  }
  next();

  // Don't forget to call next() to continue navigation
});

export default router;
