<template>
    <div class="blue-box-check-list all-center">
        <p class="text-body-2">{{ $t('common.SubscriptionPayout') }}</p>
        <v-img :src="require('../../../assets/images/structure/wallet-icon.svg')" class="wallet-icon" />
        <h4 class="text-h4">{{ $t('common.USD') }} 369.00</h4>
        <p class="text-body-2">September 2022</p>
    </div>
</template>

<script>
export default {
    name: 'AmbassadorsRightRevenue',

    data: () => ({
    }),
}
</script>