<template>
  <div class="blue-box-check-list">
    <h6 class="text-h6">{{ $t("common.CheckList") }}</h6>
    <v-timeline density="compact">
      <v-timeline-item :class="{ active: isProfileCompleted }">
        <div class="">
          <p class="text-body-2">{{ $t("common.BasicInfo") }}</p>
          <p class="text-body-3 font-weight-light">
            <!-- Lorem Ipsum is simply dummy text of printing & typesetting. -->
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item :class="{ active: isPaymentDetailCompleted }">
        <div class="">
          <p class="text-body-2">{{ $t("common.PaymentDetails") }}</p>
          <p class="text-body-3 font-weight-light">
            <!-- Lorem Ipsum is simply dummy text of printing & typesetting. -->
          </p>
        </div>
      </v-timeline-item>
      <v-timeline-item :class="{ active: isSubscriptionPlanAdded }">
        <div class="">
          <p class="text-body-2">{{ $t("common.SubscriptionDetails") }}</p>
          <p class="text-body-3 font-weight-light">
            <!-- Lorem Ipsum is simply dummy text of printing & typesetting. -->
          </p>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>

  <!-- <div class="blue-box-check-list all-center">
        <p class="text-body-2">{{ $t('common.SubscriptionPayout') }}</p>
        <v-img :src="require('../../../assets/images/structure/wallet-icon.svg')" class="wallet-icon" />
        <h4 class="text-h4">$369.00</h4>
        <p class="text-body-2">September 2022</p>
    </div> -->
</template>

<script>
export default {
  name: "AmbassadorsRight",

  data() {
    return {
      isProfileCompleted: true,
      isSubscriptionPlanAdded: true,
      isPaymentDetailCompleted: true,
    };
  },
  mounted() {
    this.isProfileCompleted = localStorage.getItem("user_Details")
      ? JSON.parse(localStorage.getItem("user_Details")).isProfileCompleted
      : false;
    this.isSubscriptionPlanAdded = localStorage.getItem("user_Details")
      ? JSON.parse(localStorage.getItem("user_Details")).isSubscriptionPlanAdded
      : false;
    this.isPaymentDetailCompleted = localStorage.getItem("user_Details")
      ? JSON.parse(localStorage.getItem("user_Details"))
          .isPaymentDetailCompleted
      : false;
  },
};
</script>