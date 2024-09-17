<template>
  <div class="empty-box mb-5">
    <v-img
      :src="require('../../../assets/images/structure/empty-review.png')"
      class="empty-img mt-4"
    />
    <h4 class="text-h4">{{ $t("common.Shareyourreview") }}</h4>
    <p class="text-body-2 gray text-center mb-5">
      {{
        $t(
          "common.ThebestplacetotellcustomersaboutyourexperincefortheproductShareyourreviewtodaytostartgettingcustomer"
        )
      }}
    </p>
    <v-btn color="success" type="button" to="/add-review" class="">{{
      $t("common.ShareReview")
    }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "EmptyPage",
};
</script>