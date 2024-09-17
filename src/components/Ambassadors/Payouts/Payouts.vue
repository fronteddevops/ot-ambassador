<template>
  <div class="bg-gray">
    <Loader v-if="isLoading" />
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="10" xl="10">
          <v-row>
            <v-col cols="12" sm="4" md="8" lg="8" xl="8">
              <PaymentDetail />
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4" xl="4">
              <AmbassadorsRightRevenue />
            </v-col>
          </v-row>
          <div class="top-heading-row mt-3 mb-1">
            <h4 class="text-h4">{{ $t("common.Payouts") }}</h4>
            <div class="search-box">
              <Datepicker
                placeholder="22/06/2022 - 22/07/2022"
                range
                v-model="selectedDate"
                lang="en"
                position="right"
              />
            </div>
          </div>
          <v-tabs v-model="tab" class="payout-tab">
            <v-tab value="Subscription">Subscription</v-tab>
            <v-tab value="Sales">Orders</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="Subscription">
              <v-table>
                <thead>
                  <tr>
                    <th>
                      <div class="sorting">
                        {{ $t("common.Subscriber") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="sorting">
                        {{ $t("common.PaymentDate") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="sorting">
                        {{ $t("common.TotalAmount") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="sorting">
                        {{ $t("common.PlatformCommission") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>
                    <th>
                      <div class="sorting">
                        {{ $t("common.PayoutAmount") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in SubscriberTable" :key="item.name">
                    <td>{{ item.customer_name }}</td>
                    <td>
                      {{ moment.unix(item.created).format("DD MMM YYYY") }}
                    </td>
                    <td>{{ item.total / 100 }}</td>
                    <td>{{ item.application_fee_amount / 100 }}</td>
                    <td>
                      {{ (item.total - item.application_fee_amount) / 100 }}
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <v-pagination v-model="page" :length="5"></v-pagination>
            </v-window-item>

            <v-window-item value="Sales">
              <v-table>
                <thead>
                  <tr>
                    <th>
                      <div class="sorting">
                        {{ $t("common.OrderID") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>
                    <!-- <th>
                      <div class="sorting">
                        {{ $t("common.Product") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th> -->

                    <th>
                      <div class="sorting">
                        {{ $t("common.OrderDate") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>

                    <th>
                      <div class="sorting">
                        {{ $t("common.CouponCode") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>

                    <th>
                      <div class="sorting">
                        {{ $t("common.OrderValue") }}
                        <span>
                          <v-icon class="sorting-arrow">mdi-menu-up</v-icon>
                          <v-icon class="sorting-arrow">mdi-menu-down</v-icon>
                        </span>
                      </div>
                    </th>

                    <th>
                      <div class="sorting">
                        {{ $t("common.MyCommission") }}
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in salesTable" :key="item.name">
                    <td>{{ item.orderId }}</td>
                    <!-- <td>{{ item.Product }}</td> -->
                    <td>{{ moment(item.createdAt).format("DD MMM YYYY") }}</td>
                    <td>{{ item.Discount.discountCode }}</td>
                    <td>{{ (+item.Order.totalAmount).toFixed(2) }}</td>
                    <td>{{ (+item.affiliationAmount).toFixed(2) }}</td>
                    <td :data="item.isPaid">
                      <span v-if="item.isPaid" class="status status-active"
                        >Paid on
                        {{ moment(item.payoutDate).format("DD MMM YYYY") }}
                      </span>
                      <span v-else-if="item.isPaid === null">Not set</span>
                      <span v-else class="status status-inactive">Unpaid</span>
                    </td>
                  </tr>
                  <tr v-if="!salesTable.length">
                    <td colspan="6" class="text-center">No data available</td>
                  </tr>
                </tbody>
              </v-table>
              <v-pagination v-model="page" :length="totalPages"></v-pagination>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
import AmbassadorsRightRevenue from "../AmbassadorsRightRevenue/AmbassadorsRightRevenue.vue";
import PaymentDetail from "./PaymentDetail.vue";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
import services from "../../../services/index";
import Loader from "../../Loader/Loader.vue";
var moment = require("moment");

export default {
  name: "PayoutsPage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    AmbassadorsRightRevenue,
    PaymentDetail,
    Loader,

    Datepicker: VueDatepickerUi,
  },

  data() {
    return {
      isLoading: false,
      moment: moment,
      SubscriberTable: [],
      salesTable: [],
      page: 1,
      selectedDate: [
        new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000),
        new Date(new Date().getTime()),
      ],
      tab: null,
      totalPages: 1,
      limit: 5,
      search: "",
    };
  },
  mounted() {
    this.getAffiliations();
    this.getSubscriptions();
    // this.getSubscriber();
  },
  watch: {
    page() {
      this.getAffiliations();
    },
    selectedDate() {
      this.getAffiliations();
    },
  },
  methods: {
    async getAffiliations() {
      this.isLoading = true;
      try {
        this.isLoading = true;
        const response = await services.Affiliation.GEt_AFFILIATION(
          this.selectedDate[0],
          this.selectedDate[1],
          this.limit,
          this.page - 1
        );
        this.salesTable = response.data.rows;
        this.totalPages = Math.ceil(response.data.count / this.limit);
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getSubscriptions() {
      this.isLoading = true;
      try {
        this.isLoading = true;
        const response = await services.Subscriber.GET_SUBSCRIPTION_LIST();
        console.log(response);
        this.SubscriberTable = response.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    // async getSubscriber() {
    //   // this.isLoading = true;
    //   try {
    //     this.isLoading = true;
    //     const response = await services.Subscriber.GET_SUBSCRIBER_DETAIL(
    //       this.search,
    //       this.limit,
    //       this.page - 1
    //     );
    //     console.log(response);
    //     // this.isLoading = false;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
};
</script>