<template>
  <view class="">
    <view class="flex flex-col items-center">
      <image
        :src="logoUrl"
        class="flex-none block w-20 h-20 mt-12"
      />
      <view class="mt-2 text-xl font-bold text-theme-primary">
        {{ title }}
      </view>
    </view>
    <view class="px-6 py-8 mx-4 mt-12 bg-white rounded-md">
      <view
        class="flex flex-row items-center px-4 py-1 border border-blue-200 rounded-md "
      >
        <via-icon name="icon-xingmingyonghumingnicheng"></via-icon>
        <u-input
          v-model="formData.account"
          type="text"
          class="flex-1 ml-2"
          placeholder="请输入用户名"
        />
      </view>
      <view class="flex flex-row items-center px-4 py-1 border border-blue-200 rounded-md ">
        <via-icon name="icon-xingmingyonghumingnicheng"></via-icon>
        <u-input
          v-model="formData.user_name"
          type="text"
          class="flex-1 ml-2"
          placeholder="请输入用户名"
        />
      </view>
      <view
        class="flex flex-row items-center px-4 py-1 mt-6 border border-blue-200 rounded-md "
      >
        <via-icon name="icon-mima"></via-icon>
        <u-input
          v-model="formData.password"
          type="password"
          class="flex-1 ml-2"
          placeholder="请输入密码"
        />
      </view>
      <view class="flex flex-row items-center justify-between mt-6">
        <view class="">
          <u-checkbox-group>
            <u-checkbox v-model="savePassword">
              记住密码
            </u-checkbox>
          </u-checkbox-group>
        </view>
        <view
          class="text-xs text-gray-500"
          @click="$toast('请联系管理员')"
        >
          忘记密码
        </view>
      </view>
      <view class="mt-4">
        <u-button
          open-type="getUserInfo"
          class=""
          type="primary"
          :loading="loading"
          hover-class="none"
          ripple
          @click="handleLogin"
        >
          登录
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { title, logo } from '@/configs';
import storage from '@/utils/storages';
import { Login } from '@/requests/modules/base.js';

export default {
  data() {
    return {
      loading: false,
      title,
      logoUrl: logo(),
      formData: {
        account: '',
        user_name: '',
        password: '',
      },
      savePassword: false,
    };
  },
  created() {
    this.savePassword = storage.get('savePassword') || false;
    this.formData.account = storage.get('account');
    this.formData.user_name = storage.get('user_name');
    this.formData.password = storage.get('password');
  },
  methods: {
    async handleLogin() {
      if (!this.formData.account) {
        return this.$toast('用户名不能为空');
      }

      if (!this.formData.user_name) {
        return this.$toast('用户名不能为空');
      }

      if (!this.formData.password) {
        return this.$toast('密码不能为空');
      }

      this.handleLoginAfter();
    },
    async handleLoginAfter() {
      const params = {
        account: this.formData.account,
        user_name: this.formData.user_name,
        password: this.formData.password,
      };
      this.loading = true;
      console.log(params);
      const res = await this.$req.Login(params);
      // console.log(res);
      if (res.code === 0) {
        storage.set('savePassword', this.savePassword);
        this.$store.commit('user/setToken', res.data.token);

        if (this.savePassword) {
          storage.set('account', this.formData.account);
          storage.set('user_name', this.formData.user_name);
          storage.set('password', this.formData.password);
        } else {
          storage.remove('username');
          storage.remove('password');
        }

        await this.$toast('登录成功', { icon: 'success' });

        this.handleRedirect();
      }
    },
    handleRedirect() {
      const redirect = this.$Route.query.redirect;
      // console.log('redirect', redirect);
      if (redirect) {
        const {
          path,
          query,
        } = redirect;
        this.$Router.replaceAll({
          path,
          query,
        });
      } else {
        this.openHomePage();
      }
    },
    openHomePage() {
      this.$Router.replaceAll({ path: '/pages/index/tab-0/index' });
    },
  },
};
</script>

<style></style>
