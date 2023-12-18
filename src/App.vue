<template>
<div id="app" class="cont_box">
  <img src="./assets/images/left.png" class="left_btn" @click="closeHandle" />
  <div class="cont_sub">
    <div class="cont_sub-title">请填写申请信息</div>
    <div class="cont_item">
      <label for="name" class="cont_lab">姓名</label>
      <input type="text" class="cont_input" id="name" name="name"
        required placeholder="请输入姓名" v-model="nickName"
        :disabled="isAlreadySubmit"
      />
    </div>
    <div class="cont_item">
      <label for="tel" class="cont_lab">手机号码</label>
      <input type="tel" id="tel" class="cont_input"
        placeholder="请输入手机号码" v-model="telNum"
        :maxlength="11"
        :disabled="isAlreadySubmit"
      />
    </div>
    <div class="cont_item">
      <label for="address" class="cont_lab">所在地址</label>
      <input type="text" name="address" class="cont_input"
        placeholder="请输入家庭或工作地址" v-model="addressText"
        :disabled="isAlreadySubmit"
      />
    </div>
    <input type="submit"
      :class="['sub_btn', isAlreadySubmit ? 'active' : '']"
      :value="isAlreadySubmit ? '已提交申请' : '提交申请'"
      @click="submitHandle"
      :disabled="isAlreadySubmit"
    >
    <div class="cont_rem">提交申请后将有专员联系您，请保持电话畅通</div>
  </div>
  <div class="item_list-box">
    <div class="item_list">成功办理一类银行账户后，添加并绑定至彬纷想你APP资金提现账户，返100元现金券</div>
    <div class="item_list">现金券在中信银行核验后发放到账，可在“彬纷想你APP - 我的 - 现金券”中查看；</div>
    <div class="item_list"> 填写申请后，会有中信银行专员联系办理借记卡，具体办卡事宜由专员告知；如有疑问，注意与专员详细沟通了解。办理结果以中信银行审核标准为准。</div>
  </div>
  <continuePhoneRegDia
    :isShow="isShowPhoneDia"
    :telNum="telNum"
    @close="isShowPhoneDia = false"
    @confirm="confirmHandle"
  ></continuePhoneRegDia>
</div>
</template>
<script>
import continuePhoneRegDia from './components/continuePhoneRegDia.vue'
import { Toast } from 'vant';
import { checkName, checkUserPhone} from './assets/js/util.js'
import request from './assets/js/axios';
import {closeWebview} from './assets/js/dsBridge'
export default {
  name: 'App',
  components: {
    continuePhoneRegDia
  },
  data(){
    return {
      nickName: '',
      telNum: '',
      addressText: '',
      isShowPhoneDia: false,
      submitParams: null,
      isAlreadySubmit: false
    }
  },
  mounted() {
  },
  methods: {
    closeHandle() {
      window.close();
      console.log('关闭申请', );
      closeWebview();
    },
    submitHandle() {
      const params = this.validateInfo();
      if(!params) return;
      this.isShowPhoneDia = true;
      this.submitParams= params;
    },
    confirmHandle() {
      this.isShowPhoneDia = false;
      request.get('/api/Get/debitCard', {
        ...this.submitParams,
        tag: 'bfxlApp'
      }).then(res => {
        Toast(res.msg);
        if(res.code == 1) this.isAlreadySubmit = true;
      });
    },
    validateInfo() {
      if(this.isAlreadySubmit) return false;
      if(!this.nickName.trim()) {
        Toast('请输入姓名');
        return false;
      }
      if (!checkName(this.nickName.trim())) {
        Toast('姓名格式不正确');
        return false;
      }
      if(!this.telNum.trim()) {
        Toast('请输入手机号码');
        return false;
      }
      if(!checkUserPhone(this.telNum.trim())) {
        Toast('手机号码格式有误！');
        return false;
      }
      if(!this.addressText.trim()) {
        Toast('请输入家庭或工作地址');
        return false;
      }
      return {
        nick_name: this.nickName,
        mobile: this.telNum,
        address: this.addressText
      }
    }
  }
}
</script>

<style lang="scss">
#app {
background: #FBEBDB;
}
.cont_box {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #FBEBDB;
  overflow-y: scroll;
  box-sizing: border-box;
  padding-bottom: 20px;
  &::before {
    content: '\3000';
    background: url("./assets/images/sub_top.png") 0 0 / cover;
    width: 100%;
    height: 290px;
    display: block;
  }
  .left_btn{
    position: fixed;
    width: 18px;
    left: 16px;
    top: 57px;
  }
}
.cont_sub {
  background: #fefbf8;
  border-radius: 12px;
  margin: -50px 12px 0;
  padding: 0 16px;
  box-sizing: border-box;
  overflow: hidden;
  .cont_sub-title {
    font-size: 18px;
    text-align: center;
    color: #333;
    margin: 20px auto 0;
    position: relative;
    z-index: 0;
    font-weight: 600;
    &::before {
      content: '\3000';
      position: absolute;
      z-index: -1;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 132px;
      height: 5px;
      background: #eed6bf;
    }
  }
  .cont_item{
    display: flex;
    align-items: center;
    margin: 14px auto 0;
    color: #333;
    .cont_lab{
      font-size: 15px;
      min-width: 60px;
      margin-right: 10px;
      font-weight: 600;
    }
    .cont_input {
      flex: 1;
      // background: gray;
      text-align: right;
      font-size: 15px;
      line-height: 30px;
    }
  }
  .sub_btn {
    width: 200px;
    height: 42px;
    background: #ff4337;
    border-radius: 16px;
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    line-height: 42px;
    margin: 38px auto 0;
    display: block;
    &.active {
      background: #fc958e;
    }
  }
  .cont_rem{
    font-size: 13px;
    text-align: center;
    color: #cccccc;
    line-height: 18px;
    margin: 10px auto 20px;
  }
}
.item_list-box {
  background: #fefbf8;
  border-radius: 12px;
  margin: 8px 12px 0;
  padding: 0 16px;
  font-size: 13px;
  color: #555;
  line-height: 18px;
  overflow: hidden;
  counter-reset:num;
  .item_list{
    margin: 20px 0;
    display: flex;
    &::before {
      margin-right: 5px;
      counter-increment: num;
      content:counter(num) '.';
    }
  }
}

.cont_sub-title{
  font-size: 18px;
  text-align: center;
  color: #333;
  line-height: 25px;
  position: relative;
  z-index: 0;
}
</style>
