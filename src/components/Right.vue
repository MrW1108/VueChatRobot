<template>
  <div class="rightContainer">
    <div class="displayArea" id="autoScrolledDiv">
      <msg v-for="(msg,key) in msgList" v-bind:MsgContent="msg" :key="key" v-on:sendRecommend="sendRecommend"></msg>
    </div>
    <div class="inputArea" >
      <input type="text" v-model="inputMsg" v-on:keydown.enter="send(inputMsg)" />
      <span v-on:click="send(inputMsg)">发送</span>
    </div>
  </div>
</template>

<script>
import Msg from './Msg'

export default {
  name: 'right',
  components: {
    Msg
  },
  data: function () {
    return {
      inputMsg: '',
      sendedMsg: '',
      msgList: [
        {
          id: 0,
          status: 0,
          who: 'robot',
          question: '',
          msg: {
            text: '你好，有关数据结构的问题尽管问我',
            recommend: 0,
            dp: 0
          }
        }
      ]
    }
  },
  watch: {
    msgList: function () {
      // scroll to bottom
      this.$nextTick(() => {
        let list = document.getElementById('autoScrolledDiv')
        list.scrollTop = list.scrollHeight
      })
    }
  },
  methods: {
    send: function (msg) {
      let trimedStr = this.inputMsg.replace(/(^\s*)|(\s*$)/g, '')
      if (trimedStr.length === 0) {
        return
      }
      let msgId = this.msgList.length + 1
      // add message of me
      let m = {
        id: msgId,
        status: 1,
        who: 'me',
        question: '',
        msg: {
          text: this.inputMsg,
          recommend: 0,
          dp: 0
        }
      }
      this.msgList.push(m)
      this.inputMsg = ''
      // send request
      this.$http.post(
        '/api',
        {
          msg: trimedStr
        }
      ).then(
        // success
        (resp) => {
          // update message of me
          let msgToUpdate = this.getMsgById(msgId)
          msgToUpdate.status = 0
          // update sendedMsg、answeredMsg、isAnswer
          this.sendedMsg = trimedStr
          this.answeredMsg = resp.data['text']
          // get json
          return resp.data
        },
        // error
        (resp) => {
          let msgToUpdate = this.getMsgById(msgId)
          msgToUpdate.status = 2
        }
      ).then((msg) => {
        if (!msg) {
          return
        }
        let msgId = this.msgList.length + 1
        // add message of robot
        // judge DP
        var m = {
          id: msgId,
          status: 0,
          question: trimedStr,
          who: 'robot',
          msg: {
            text: '出错了，兄跌......',
            recommend: 0,
            dp: 1
          }
        }
        if (msg.dp) {
          m = {
            id: msgId,
            status: 0,
            question: trimedStr,
            who: 'robot',
            msg: {
              text: '深度学习模块开发中......',
              recommend: 0,
              dp: 1
            }
          }
        } else {
          m = {
            id: msgId,
            status: 0,
            question: trimedStr,
            who: 'robot',
            msg: msg
          }
        }
        this.msgList.push(m)
      })
    },
    getMsgById: function (id) {
      for (let i = 0; i < this.msgList.length; ++i) {
        if (id === this.msgList[i].id) {
          return this.msgList[i]
        }
      }
    },
    sendRecommend: function (e) {
      // this.send(e)
      // console.log(e)
      let msgId = this.msgList.length + 1
      // add message of me
      let m = {
        id: msgId,
        status: 1,
        who: 'me',
        question: '',
        msg: {
          text: e,
          recommend: 0,
          dp: 0
        }
      }
      this.msgList.push(m)
      this.inputMsg = ''
      // send request
      this.$http.post(
        '/api',
        {
          msg: e
        }
      ).then(
        // success
        (resp) => {
          // update message of me
          let msgToUpdate = this.getMsgById(msgId)
          msgToUpdate.status = 0
          // update sendedMsg、answeredMsg、isAnswer
          this.sendedMsg = e
          this.answeredMsg = resp.data['text']
          // get json
          return resp.data
        },
        // error
        (resp) => {
          let msgToUpdate = this.getMsgById(msgId)
          msgToUpdate.status = 2
        }
      ).then((msg) => {
        if (!msg) {
          return
        }
        let msgId = this.msgList.length + 1
        // add message of robot
        // judge DP
        var m = {
          id: msgId,
          status: 0,
          question: e,
          who: 'robot',
          msg: {
            text: '出错了，兄跌......',
            recommend: 0,
            dp: 1
          }
        }
        if (msg.dp) {
          m = {
            id: msgId,
            status: 0,
            question: e,
            who: 'robot',
            msg: {
              text: '深度学习模块开发中......',
              recommend: 0,
              dp: 1
            }
          }
        } else {
          m = {
            id: msgId,
            status: 0,
            question: e,
            who: 'robot',
            msg: msg
          }
        }
        this.msgList.push(m)
      })
    }
  }
}
</script>

<style scoped>
.rightContainer {
  float: left;
  width: 565px;
  height: 480px;
  border: #dbdada solid 1px;
  box-shadow: 0 0 5px 0 #dbdada;
  background: #fff;
  overflow-x: hidden;
}

.displayArea {
  margin-top: 30px;
  width: 585px;
  height: 364px;
  overflow-y: scroll;
  border-bottom: #f0f0f0 solid 1px;
  position: relative;
}

.inputArea {
  height: 42px;
  margin-top: 25px;
}

.inputArea input {
  width: 430px;
  height: 38px;
  line-height: 38px;
  float: left;
  margin-left: 14px;
  border: #d0cfcf solid 1px;
  border-radius: 4px;
  text-indent: 14px;
  box-shadow: 1px 1px 2px 0 #d0cfcf;
  font-size: 14px;
}

.inputArea span {
  cursor: pointer;
  float: left;
  margin-left: 12px;
  color: #fff;
  font-size: 14px;
  width: 90px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  background: #00a3f0;
}

.inputArea span:hover {
  background: #54c4f8;
}

</style>
