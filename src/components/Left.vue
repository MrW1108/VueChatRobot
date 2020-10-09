<template>
  <div class="leftContainer">
    <div class="top">
      <span></span>
      <p>啥都不会</p>
    </div>
    <div class="bottom">
      <p class="title">章节列表</p>
      <div class="container">
        <span class="msg col1">线性表</span>
        <span class="msg col2">栈和队列</span>
        <span class="msg col3">字符串</span>
        <span class="msg col4">数组和广义表</span>
        <span class="msg col1">树和二叉树</span>
        <span class="msg col2">图</span>
        <span class="msg col3">查找</span>
        <span class="msg col4">排序</span>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leftContainer {
  width: 265px;
  height: 480px;
  margin-right: 30px;
  float: left;
  box-shadow: 0 0 5px 0 #dbdada;
  background: #fff;
}

.top {
  height: 162px;
  padding-top: 40px;
  background: #00a3f0;
}

.top span {
  background: url(../assets/images/dog1.jpg) no-repeat;
  background-size: 92px 92px;
  height: 92px;
  width: 92px;
  display: block;
  margin: 0 auto;
  border-radius: 92px
}

.top p {
  text-align: center;
  color: #fff;
}

.bottom {
  padding-top: 10px;
}

.bottom p {
  padding: 12px 0 15px 30px;
}

.container {
  padding: 0 0 0 25px;
}

.title {
  margin: 10px 0;
}

.msg {
  float: left;
  margin-right: 10px;
  margin-bottom: 16px;
  padding: 5px 12px;
  border-radius: 4px;
}

.col1 {
  color: #3cb1e7;
  border: #3cb1e7 solid 1px;
}

.col2 {
  color: #ff9c01;
  border: #ff9c01 solid 1px;
}

.col3 {
  color: #009944;
  border: #009944 solid 1px;
}

.col4 {
  color: #6e61a9;
  border: #6e61a9 solid 1px;
}
</style>
