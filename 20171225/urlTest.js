const url = require('url');
let testUrl = 'https://www.baidu.com/his?wd=&from=pc_web&rf=3&hisdata=%5B%7B%22time%22%3A1512025205%2C%22kw%22%3A%22jquery%20%E6%BA%90%E7%A0%81%22%7D%2C%7B%22time%22%3A1512025289%2C%22kw%22%3A%22%24(event.target)%20%E5%8E%9F%E7%94%9Fjs%22%7D%2C%7B%22time%22%3A1512025983%2C%22kw%22%3A%22vue%20%E8%92%99%E5%B1%82%20%E4%B8%8A%E9%97%AE%E9%A2%98%E6%BB%9A%E5%8A%A8%22%7D%2C%7B%22time%22%3A1512026562%2C%22kw%22%3A%22vue%20%E8%92%99%E5%B1%82%20%E7%A6%81%E6%AD%A2%E4%B8%BB%E9%A1%B5%E9%9D%A2%E9%BB%98%E8%AE%A4%E6%BB%9A%E5%8A%A8%22%7D%2C%7B%22time%22%3A1512027966%2C%22kw%22%3A%22vue-cli%20%E6%9D%A1%E4%BB%B6%E8%A7%A6%E5%8F%91%E4%BA%8B%E4%BB%B6%22%7D%2C%7B%22time%22%3A1512029151%2C%22kw%22%3A%22vue%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6%20%E6%9D%A1%E4%BB%B6%E8%A7%A6%E5%8F%91%22%7D%2C%7B%22time%22%3A1512029637%2C%22kw%22%3A%22vue%20%40touchmove.prevent%22%2C%22fq%22%3A2%7D%2C%7B%22time%22%3A1512031010%2C%22kw%22%3A%22smartscroll%22%7D%2C%7B%22time%22%3A1512092802%2C%22kw%22%3A%22javascript%20source%20map%20%E8%AF%A6%E8%A7%A3%22%7D%5D&json=1&p=3&sid=1437_13289_21110_17001_25177_22157&req=2&csor=0&cb=jQuery110204327253348866782_1514251902846&_=1514251902847';
let obj = url.parse(testUrl, true)

console.log(obj)