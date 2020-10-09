import Mock from 'mockjs'

const data = {
  // 'text': '@cparagraph',
  'text': ['什么是二叉树', '二叉树怎么构造'],
  'recommend|0-1': 1,
  'dp|0-1': 1
}

Mock.mock('http://localhost:8888/message', 'post', data)

export default Mock
