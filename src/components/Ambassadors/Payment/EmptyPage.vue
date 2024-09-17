<template>
    <div class="empty-box mb-5">
        <v-img :src="require('../../../assets/images/structure/empty-payment.png')" class="empty-img" />
        <h4 class="text-h4">{{ $t('common.SetUpPaymentDetails') }}</h4>
        <p class="text-body-2 gray text-center">{{ $t('common.GiveyourcustomersexclusiveaccesstobenefitsforamonthlyfeeFrombonuscontenttoacustomeronlycommunityyoucanchoosewhatyouwantyourmembershiptooffer') }}</p>
        <v-btn color="success" type="button"  class="mt-5">{{ $t('common.SetUpPaymentDetails') }}</v-btn>
    </div>
</template>

<script>
export default {
    name: 'EmptyPage',
}

</script>