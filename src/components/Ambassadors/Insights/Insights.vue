<template>
  <loader v-if="isLoading" />
  <div class="bg-gray">
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="10" xl="10">
          <div class="graph-paprent-box">
            <div class="search-box">
              <Datepicker
                range
                v-model="selectedDate"
                lang="en"
                position="right"
              />
            </div>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <div class="graph-top-box">
                  <v-img
                    :src="
                      require('../../../assets/images/structure/bell-black-icon.svg')
                    "
                    width="48"
                    height="48"
                  />
                  <div class="relative">
                    <h5 class="text-h5">
                      {{ $t("common.Active") }} <br />{{
                        $t("common.Subscribers")
                      }}
                    </h5>
                  </div>
                  <h4 class="text-h4">120</h4>
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <div class="graph-top-box blue-bg">
                  <v-img
                    :src="
                      require('../../../assets/images/structure/dolor-bag-white-icon.svg')
                    "
                    width="48"
                    height="48"
                  />
                  <div class="relative">
                    <h5 class="text-h5">
                      {{ $t("common.Subscription") }} <br />{{
                        $t("common.Revenue")
                      }}
                    </h5>
                  </div>
                  <h4 class="text-h4">{{ $t("common.USD") }} 2000.00</h4>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="graph-paprent-box">
            <v-select
              :items="items"
              label="Year"
              density="compact"
              variant="solo"
              single-line
            ></v-select>
            <h5 class="text-h5 mt-4 mb-4">
              {{ $t("common.ActiveSubscribers") }}
            </h5>
            <SubscriberGraph />

            <h5 class="text-h5 mt-12 mb-4">
              {{ $t("common.SubscriptionRevenue") }}
            </h5>
            <SubscriptionGraph />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
import SubscriberGraph from "./SubscriberGraph.vue";
import SubscriptionGraph from "./SubscriptionGraph.vue";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import Loader from "../../Loader/Loader.vue";
import VueDatepickerUi from "vue-datepicker-ui";

export default {
  name: "InsightsPage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    SubscriberGraph,
    Loader,
    SubscriptionGraph,

    Datepicker: VueDatepickerUi,
  },

  data() {
    return {
      isLoading: false,
      items: ["2019", "2020", "2021", "2022", "2023"],
      selectedDate: [
        new Date(),
        new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
      ],
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>