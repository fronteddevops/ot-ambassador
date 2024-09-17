<template>
  <Loader v-if="isLoading" />
  <div class="bg-gray">
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="10" xl="10">
          <EmptyPage
            v-if="!this.subscribersList && this.subscribersList?.length"
          />
          <div v-else>
            <div class="top-heading-row">
              <h4 class="text-h4">{{ $t("common.Subscribers") }}</h4>
              <div class="search-box">
                <v-img
                  :src="
                    require('../../../assets/images/structure/search-icon-pink.svg')
                  "
                  class="search-icon"
                />
                <v-text-field
                  class="height36 search-input"
                  variant="solo"
                  placeholder="Search"
                  v-model="search"
                />
              </div>
            </div>
            <v-table>
              <thead>
                <tr>
                  <th>
                    <div class="sorting">
                      {{ $t("common.Subscribers") }}
                      <span>
                        <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                        <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                      </span>
                    </div>
                  </th>
                  <th>
                    <div class="sorting">
                      {{ $t("common.SubscriptionPeriod") }}
                      <span>
                        <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                        <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                      </span>
                    </div>
                  </th>
                  <th>
                    <div class="sorting">
                      {{ $t("common.LastPayment") }}
                      <span>
                        <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                        <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                      </span>
                    </div>
                  </th>
                  <th>
                    <div class="sorting">
                      {{ $t("common.NextPayment") }}
                      <span>
                        <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                        <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                      </span>
                    </div>
                  </th>
                  <th>
                    <div class="sorting">
                      {{ $t("common.Status") }}
                      <span>
                        <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                        <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                      </span>
                    </div>
                  </th>
                  <th>
                    <div class="sorting">{{ $t("common.Action") }}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in subscribersList" :key="item.id">
                  <td>
                    <p class="subscriber-name">
                      {{ item.User.name + " " + item.User.lastName }}
                    </p>
                  </td>
                  <td>
                    {{
                      (item.createdAt
                        ? moment(item.createdAt).format("DD MMM YY")
                        : " - ") +
                      " to " +
                      (item.nextPaymentAt
                        ? moment(item.nextPaymentAt).format("DD MMM YY")
                        : "-")
                    }}
                  </td>
                  <td>
                    {{
                      item.lastPaymentAt
                        ? moment(item.lastPaymentAt).format("DD MMM YY")
                        : "-"
                    }}
                  </td>
                  <td>
                    {{
                      item.nextPaymentAt
                        ? moment(item.nextPaymentAt).format("DD MMM YY")
                        : "-"
                    }}
                  </td>
                  <td>
                    <span class="status status-active" v-if="item.isActive"
                      >Active</span
                    >
                    <span class="status status-inactive" v-else>Inactive</span>
                  </td>
                  <td>
                    <router-link
                      :to="`/chat?chatId=${item.userId}_${selfId}`"
                      class="tool-box"
                    >
                      <v-img
                        :src="
                          require('../../../assets/images/structure/message-icon-red.svg')
                        "
                        class="active-icon"
                      />
                      <span class="custome-tool">{{ $t("common.Chat") }}</span>
                      <!-- {{ item.Action }} -->
                    </router-link>
                  </td>
                </tr>
                <tr v-if="!this.subscribersList?.length">
                  <td colspan="6" class="text-center">No data available</td>
                </tr>
              </tbody>
            </v-table>
            <v-pagination v-model="page" :length="totalPages"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
import EmptyPage from "./EmptyPage.vue";
import services from "../../../services/index";
import Loader from "../../Loader/Loader.vue";
var moment = require("moment");
export default {
  name: "SubscriberPage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    Loader,
    EmptyPage,
  },

  data() {
    return {
      moment: moment,
      subscribersList: "",
      isDataEntry: false,
      isLoading: false,
      page: 1,
      totalPages: 1,
      limit: 10,
      search: "",
      selfId: "",
    };
  },
  mounted() {
    this.selectedChat = this.$route.query.chatId;
    this.selfId = localStorage.getItem("user_Details")
      ? JSON.parse(localStorage.getItem("user_Details")).id
      : null;
    this.getSubscriber();
  },

  watch: {
    page() {
      this.getSubscriber();
    },
    search() {
      this.getSubscriber();
    },
  },
  methods: {
    async getSubscriber() {
      this.isLoading = true;
      try {
        this.isLoading = true;
        const response = await services.Subscriber.GET_SUBSCRIBER_DETAIL(
          this.search,
          this.limit,
          this.page - 1
        );
        this.subscribersList = response.data.rows;
        this.totalPages = Math.ceil(response.data.count / this.limit);
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>