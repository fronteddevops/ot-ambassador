<template>
  <div class="empty-box mb-5">
    <v-img
      :src="require('../../../assets/images/structure/empty-overview.png')"
      class="empty-img"
    />
    <h4 class="text-h4">{{ $t("common.AddPost") }}</h4>
    <p class="text-body-2 gray text-center">
      <!-- Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever. -->
    </p>
    <v-btn color="success" type="button" class="mt-5">{{
      $t("common.CreatePost")
    }}</v-btn>
  </div>
</template>

<script>
export default {
  name: "EmptyPage",
};
</script>