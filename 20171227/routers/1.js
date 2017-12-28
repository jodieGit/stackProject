const router = require('../lib/route')

let users = {};
router.on('/login', (req, res) => {
  let {user, pwd} = req.query;

  if(!users[user]) {
    res.send({code: 1, msg: '用户名不存在'})
    res.end();
  } else if(users[user] != pws) {
    res.send({code: 2, msg: '用户名或者密码不正确'})
    res.end();
  } else {
    res.send({code: 3, msg: '登陆成功'})
    res.end();
  }
})

router.on('/req', (req, res) => {
  let {user, pwd} = req.query;
  if(users[user]) {
    res.send({code: 4, msg: '该用户名已存在'});
    res.end();
  } else {
    users[user] = pwd;
    res.send({code: 5, msg: '注册成功'});
    res.end();
  }
})
