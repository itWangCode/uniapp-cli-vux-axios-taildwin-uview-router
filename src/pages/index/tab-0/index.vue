<template>
  <view class="">
    <view class="mx-4 mt-4">
      <u-button
        @click="handler"
      >
        查看子页面
      </u-button>
    </view>
  </view>
</template>

<script>
import { my_cost, my_cost_delete, my_cost_submit } from '@/requests/modules/base';

export default {
  data() {
    return {};
  },
  methods: {
    async handler() {
      let params = {"id":2597,"controller_name":"MyCost"}
      const { data } = await this.$req.my_cost_delete(params);
      console.log(data);
    }
  },
};
</script>

<style></style>
