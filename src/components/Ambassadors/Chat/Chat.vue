<template>
  <div class="bg-gray">
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="10" xl="10">
          <!-- <EmptyPage /> -->

          <div class="chat-parent">
            <div class="chat-left">
              <div class="chat-search">
                <v-text-field
                  density="compact"
                  variant="solo"
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  single-line
                  hide-details
                  v-model="searchValue"
                ></v-text-field>
              </div>
              <div class="chat-left-scroll">
                <div v-if="userList && userList.length">
                  <div
                    :class="`chat-left-box cursor-pointer ${
                      item.chatId == selectedChat ? 'active' : ''
                    }`"
                    v-for="(item, index) in userList"
                    :key="index"
                    @click="
                      selectedChat = item.chatId;
                      selectedUserId = item.User.id;
                    "
                  >
                    <v-img
                      v-if="item.User.UserDetail.profileImage"
                      :src="`${constImg}${item.User.UserDetail.profileImage}`"
                      class="round40"
                    />
                    <v-avatar
                      v-else
                      class="round40"
                      style="background: #ff179c"
                    >
                      <span class="text-h5 white"
                        >{{ item.User.UserDetail.name.charAt(0)
                        }}{{ item.User.UserDetail.lastName.charAt(0) }}</span
                      >
                    </v-avatar>
                    <div class="relative">
                      <h5 class="text-h5">
                        {{ item.User.name }} {{ item.User.lastName }}
                      </h5>
                      <p class="text-body-3 gray">
                        {{ item?.chats[0]?.text }}
                      </p>
                    </div>
                    <span class="time-date-span">{{
                      item?.chats[0]?.createdAt
                        ? getConvertedDate(item?.chats[0]?.createdAt)
                        : ""
                    }}</span>
                  </div>
                </div>
                <div
                  v-else-if="searchValue"
                  class="relative text-center mt-3 text-h5"
                >
                  No user found
                </div>
              </div>
            </div>
            <div
              class="chat-right"
              v-if="selectedChat || chatMessages.length > 0"
            >
              <div class="chat-right-scroll" id="chatmessages">
                <div
                  v-for="(groupItem, groupIndex) in finalchatMessages"
                  :key="groupIndex"
                >
                  <div class="date-time-row">
                    <span class="date-time-span">{{ groupItem.date }}</span>
                  </div>
                  <div v-for="(item, index) in groupItem.chats" :key="index">
                    <div
                      class="sender-box"
                      v-if="selfId == item.selfId && item.createdAt"
                    >
                      {{ item.text }}
                      <span class="time-span">{{
                        getTime(item.createdAt)
                      }}</span>
                    </div>
                    <div
                      class="receiver-box"
                      v-else-if="selfId != item.selfId && item.createdAt"
                    >
                      {{ item.text }}
                      <span class="time-span">{{
                        getTime(item.createdAt)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="send-box">
                <v-text-field
                  density="compact"
                  variant="solo"
                  label="Search"
                  append-inner-icon="mdi-send"
                  single-line
                  v-model="message"
                  hide-details
                  @keydown.enter="saveMessage"
                  @click:append-inner="saveMessage"
                ></v-text-field>
              </div>
            </div>
            <div class="" v-else>
              <div class="empty-box mb-5">
                <v-img
                  :src="
                    require('../../../assets/images/structure/empty-chat.png')
                  "
                  class="empty-img mt-4"
                />
                <h4 class="text-h4 text-center">
                  Start Chatting with Ambasaddor
                </h4>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <Loader /> -->
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
// import EmptyPage from "./EmptyPage.vue";
// import Loader from "../../Loader/Loader.vue";
import constant from "../../../../constant";

import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "../../../Firebase";
import services from "../../../services/index";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import moment from "moment";

// eslint-disable-next-line
const firebaseApp = initializeApp(getFirebaseConfig());
const db = getFirestore(firebaseApp);

export default {
  name: "ChatPage",

  components: {
    AmbassadorsLeft,
    AmbassadorHeader,
    // EmptyPage,
    // Loader
  },

  data() {
    return {
      message: "",
      selectedChat: "",
      selectedUserId: "",
      selfId: "",
      chatMessages: [],
      finalchatMessages: [],
      searchValue: "",
      userList: [],
      constImg: constant.CLOUDFRONT_DESTINATION,
    };
  },
  watch: {
    selectedChat(val) {
      this.loadMessages(val);
      this.message = " ";
    },
    searchValue(val) {
      if (val && val.length > 1) {
        this.getSubscribedCustomers(val);
      } else {
        this.getSubscribedCustomers();
      }
    },
    chatMessages: {
      handler: function (data) {
        const groups = data.reduce((groups, game) => {
          const date = moment
            .unix(JSON.stringify(game.createdAt.seconds))
            .format("DD-MMM-YYYY");
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(game);
          return groups;
        }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            chats: groups[date],
          };
        });
        console.log(groupArrays);
        this.finalchatMessages = groupArrays;
      },
      deep: true,
    },
  },
  mounted() {
    this.selectedChat = this.$route.query.chatId;

    this.getSubscribedCustomers();
    this.selfId = localStorage.getItem("user_Details")
      ? JSON.parse(localStorage.getItem("user_Details")).id
      : null;
  },
  methods: {
    getConvertedDate(value) {
      var now = moment();
      var val = moment(
        moment.unix(JSON.stringify(value.seconds)).format("DD-MMM-YYYY")
      );
      if (now.diff(val, "days") < 1) {
        return moment.unix(JSON.stringify(value.seconds)).fromNow();
      } else
        return moment.unix(JSON.stringify(value.seconds)).format("DD-MMM-YYYY");
    },
    getTime(value) {
      return moment.unix(JSON.stringify(value.seconds)).format("hh:mm a");
    },
    async getSubscribedCustomers(search) {
      try {
        const response = await services.UserDetail.GET_SUBSCRIBED_CUSTOMERS(
          search
        );

        this.userList = response.data;
        let userId = localStorage.getItem("user_Details")
          ? JSON.parse(localStorage.getItem("user_Details")).id
          : null;
        this.userList.map(async (item) => {
          item.chatId = `${item.User.id}_${userId}`;
          item.isChatSelected = false;
          item.chats = [];
          return item;
        });
        this.loadOldMessages();
      } catch (error) {
        console.log(error);
      }
    },
    // Saves a new message to Cloud Firestore.
    async saveMessage() {
      if (this.message && this.message.trim().length) {
        // Add a new message entry to the Firebase database.
        let selfId = localStorage.getItem("user_Details")
          ? JSON.parse(localStorage.getItem("user_Details")).id
          : null;
        const messageText = this.message;
        this.message = "";
        try {
          await addDoc(collection(getFirestore(), this.selectedChat), {
            selfId,
            userId: this.selectedUserId,
            text: messageText,
            createdAt: new Date(),
          });
        } catch (error) {
          console.error(
            "Error writing new message to Firebase Database",
            error
          );
        }
      }
    },
    loadMessages(id) {
      const recentMessagesQuery = query(
        collection(getFirestore(), id),
        orderBy("createdAt", "asc")
      );
      this.chatMessages = [];
      onSnapshot(recentMessagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "removed") {
            //   deleteMessage(change.doc.id);
            console.log(change.doc.id);
          } else {
            var message = change.doc.data();
            let item = message;
            item.docId = change.doc.id;
            this.chatMessages.push(item);
            const container = document.getElementById("chatmessages");
            document.getElementById("chatmessages").scrollTo({
              top: container.scrollHeight + 100,
              behavior: "smooth",
            });
            // this.getSubscribedCustomers();
          }
        });
      });
    },
    loadOldMessages() {
      this.userList.map(async (item) => {
        const q = query(
          collection(db, item.chatId),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          item.chats.push(doc.data());
        });

        return item;
      });
      if (this.chatMessages.length > 0) {
        const container = document.getElementById("chatmessages");
        document
          .getElementById("chatmessages")
          .scrollTo({ top: container.scrollHeight + 100, behavior: "smooth" });
      }
    },
  },
};
</script>
<style>
.chat-right-scroll {
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 20px);
}
</style>