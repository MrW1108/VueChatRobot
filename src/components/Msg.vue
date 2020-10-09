<template>
  <div class="message" v-bind:class="classType">
    <span class="header"></span>
    <p v-if="MsgContent.msg.recommend === 0">
      {{MsgContent.msg.text}}
      <i></i>
    </p>
    <p v-else>
      您是不是想找这些问题
      <br>
      <a v-for="(msg,key) in MsgContent.msg.text" :key="key" href="#" @click="sendRecommend(msg)">
        {{msg}}
        <br>
      </a>
      
    </p>
    <loader v-if="MsgContent.who === 'me' && MsgContent.status == 1" class="flag"></loader>
    <span v-if="MsgContent.who === 'me' && MsgContent.status == 2" class="flag err"></span>
    <div class="clear"></div>
    <div v-if="MsgContent.who === 'robot' && MsgContent.id !== 0 && MsgContent.msg.recommend === 0 && MsgContent.msg.dp !== 0" class="praise">
      <div class="tip">本条回答是否对您有帮助呢</div>
      <div v-on:click="praise" v-bind:class="havedPraise"></div>
      <div v-on:click="unpraise" v-bind:class="havedUnpraise"></div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader'

// LOADING = 1
// ERROR = 2

export default {
  name: 'msg',
  components: {
    Loader
  },
  data: function () {
    return {
      // 判断是否点赞
      praised: false,
      // 判断是否差评
      unpraised: false
    }
  },
  props: {
    MsgContent: ''
  },
  computed: {
    classType: function () {
      if (this.MsgContent.who === 'robot') {
        return 'robot'
      } else {
        return 'me'
      }
    },
    // 点亮点赞
    havedPraise: function () {
      if (this.praised) {
        return 'havedlike'
      } else {
        return 'like'
      }
    },
    // 点亮差评
    havedUnpraise: function () {
      if (this.unpraised) {
        return 'havedunlike'
      } else {
        return 'unlike'
      }
    }
  },
  methods: {
    // 点赞后存入以及更在控制点赞的状态
    praise: function () {
      // 判断是否点过
      if (this.praised === false && this.unpraised === false) {
        console.log('点赞')
        console.log(this.MsgContent.question)
        console.log(this.MsgContent.msg.text)
        this.praised = true
      }
    },
    unpraise: function () {
      if (this.praised === false && this.unpraised === false) {
        console.log('差评')
        console.log(this.MsgContent.question)
        console.log(this.MsgContent.msg.text)
        this.unpraised = true
      }
    },
    sendRecommend: function (msg) {
      this.$emit('sendRecommend', msg)
    }
  }
}
</script>

<style scoped>
.message {
  margin-bottom: 18px;
}

.robot .header {
  background: url(../assets/images/icons.png) no-repeat;
  height: 43px;
  width: 43px;
  background-position: 0 -666px;
  float: left;
  margin-left: 24px;
}

.me .header {
  background: url(../assets/images/icons.png) no-repeat;
  height: 40px;
  width: 40px;
  background-position: 0 -626px;
  float: right;
  margin-right: 28px;
}

p {
  margin: 0px;
  font-size: 14px;
  padding: 6px 18px;
  line-height: 24px;
  border-radius: 6px;
  position: relative;
  max-width: 220px;
  word-break: break-all;
}

a{
    word-wrap: break-word;
    word-break: normal;
}

.robot p {
  top: 4px;
  float: left;
  margin-left: 14px;
  color: #333;
  background: #f1f1f1;
  
}

.me p {
  top: 2px;
  float: right;
  margin-right: 14px;
  color: #fff;
  background: #19b955;
}

i {
  position: absolute;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  top: 12px;
}

.robot i {
  border-right: 6px solid #f1f1f1;
  left: -6px;
}

.me i {
  border-left: 6px solid #19b955;
  right: -6px;
}

.flag {
  position: relative;
  top: 11px;
  right: 7px;
  float: right;
}

.err {
  width: 15px;
  height: 15px;
  background: url(../assets/images/warning.png) no-repeat;
  color: red;
}

.praise {
  margin-left: 120px;
}

.tip {
  line-height: 56px;
  font-size: 12px;
  color:#C0C0C0;
  float: left;
  margin-right: 6px;
}

@font-face {
  font-family: 'iconfont';  /* project id 2079683 */
  src: url('../assets/iconfont/iconfont.eot');
  src: url('../assets/iconfont/iconfont.eot?#iefix') format('embedded-opentype'),
  url('../assets/iconfont/iconfont.woff2') format('woff2'),
  url('../assets/iconfont/iconfont.woff') format('woff'),
  url('../assets/iconfont/iconfont.ttf') format('truetype'),
  url('../assets/iconfont/iconfont.svg#iconfont') format('svg');
}

.iconfont {
  /* font-family: "iconfont" !important; */
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
}

.like {
  width: 32px;
  height: 32px;
  float: left;
  margin-top: 8px;
  margin-right: 5px;
  background-size: 32px 32px;
  background-image: url('../assets/images/praise.png');
}

.havedlike {
  width: 32px;
  height: 32px;
  float: left;
  margin-top: 8px;
  margin-right: 5px;
  background-size: 32px 32px;
  background-image: url('../assets/images/havedPraise.png');
}

.unlike {
  width: 24px;
  height: 24px;
  float: left;
  margin-top: 12px;
  background-size: 24px 24px;
  background-image: url('../assets/images/unpraise.png');
}

.havedunlike {
  width: 24px;
  height: 24px;
  float: left;
  margin-top: 12px;
  background-size: 24px 24px;
  background-image: url('../assets/images/havedUnpraise.png');
}

</style>