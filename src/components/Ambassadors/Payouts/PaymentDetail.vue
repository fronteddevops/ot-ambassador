<template>
  <div class="payment-detail-box">
    <div class="d-flex align-items-center justify-space-between mb-4">
      <h5 class="text-h5">{{ $t("common.PaymentDetails") }}</h5>
      <router-link class="edit-right" to="/payment">
        <v-img
          :src="require('../../../assets/images/structure/edit-icon-blue.svg')"
          class="edit-icon"
        />
        View
      </router-link>
    </div>
    <div class="detail-content">
      <v-img
        :src="require('../../../assets/images/product/detail-img1.png')"
        class="detail-img"
      />
      <div class="relative">
        <h6 class="text-h6">
          {{ paymentDetail.email ? paymentDetail.email : "Null" }}
        </h6>
        <p class="text-body-3">
          <span>Country:</span>
          {{ paymentDetail.country ? paymentDetail.country : "Null" }}
        </p>
        <p
          class="text-body-3"
          v-if="
            paymentDetail && paymentDetail.external_accounts.total_count > 0
          "
        >
          <span>Bank:</span>
          {{
            paymentDetail.external_accounts.data[0].bank_name
              ? paymentDetail.external_accounts.data[0].bank_name
              : "Null"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import services from "../../../services/index";

export default {
  name: "PaymentDetailPage",

  data() {
    return {
      paymentDetail: "",
    };
  },
  mounted() {
    this.getUserPaymentDetails();
  },
  methods: {
    async getUserPaymentDetails() {
      try {
        let userId = JSON.parse(localStorage.getItem("user_Details")).id;
        const response =
          await services.UserPaymentDetail.GEt_USER_PAYMENT_DETAIL(userId);
        this.paymentDetail = response.data;
        console.log(response.data);

        if (response) {
          this.accountNumber = response.data.accountNumber;
          if (response.data.accountNumber) this.isShowForm = true;
          this.swiftCode = response.data.swiftCode;
          this.ibanNumber = response.data.ibanNumber;
          this.companyNumber = response.data.companyNumber;
          this.socialSecurityNumber = response.data.socialSecurityNumber;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>