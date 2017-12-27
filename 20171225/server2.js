let http =  require('http');
let queryString = require('queryString');
let url = require('url');
let common = require('./libs/common')
let uuid = require('uuid/v4')
let path = require('path')
let fs = require('fs')

let server = http.createServer((req, res) => {
  // Get请求
  let {pathName, query} = url.parse(req.url, true)
  console.log('Get请求数据', pathName, query)

  // POST请求
  let aBuffer = [];
  req.on('data', data => {
    aBuffer.push(data);
  });
  req.on('end', () => {
    let data = Buffer.concat(aBuffer)
    // console.log(data.toString())
    // ------WebKitFormBoundary4PWfqu3R967HXQ9j
    // Content-Disposition: form-data; name="userName"
    
    // jodie
    // ------WebKitFormBoundary4PWfqu3R967HXQ9j
    // Content-Disposition: form-data; name="userPwd"
    
    // 1221212
    // ------WebKitFormBoundary4PWfqu3R967HXQ9j
    // Content-Disposition: form-data; name="file"; filename="1.txt"
    // Content-Type: text/plain
    
    // aaa
    // bbb
    // ccc
    // ------WebKitFormBoundary4PWfqu3R967HXQ9j--

    // =========================================================================
    // <分隔符>\r\n
    // Content-Disposition: form-data; name="userName"\r\n
    // \r\n
    // 数据\r\n
    // <分隔符>\r\n
    // Content-Disposition: form-data; name="userPwd"\r\n
    // \r\n
    // 数据\r\n
    // <分隔符>\r\n
    // Content-Disposition: form-data; name="file"; filename="1.txt"\r\n
    // Content-Type: text/plain\r\n
    // \r\n
    // 数据\r\n
    // <分隔符>--\r\n

    // ===========================================================================
    // <分隔符>\r\n
    // 说明\r\n
    // \r\n
    // 数据\r\n
    // <分隔符>\r\n
    // 说明\r\n
    // \r\n
    // 数据\r\n
    // <分隔符>\r\n
    // 说明\r\n
    // 说明\r\n
    // \r\n
    // 数据\r\n
    // <分隔符>--\r\n

    // ===============================================================================
    // <分隔符>\r\n说明\r\n\r\n数据\r\n<分隔符>\r\n说明\r\n\r\n数据\r\n<分隔符>\r\n说明\r\n说明\r\n\r\n数据\r\n<分隔符>--\r\n

    // ============================================================================================================
    // 第一步：分隔符切分
    // <>
    // \r\n说明\r\n\r\n数据\r\n
    // \r\n说明\r\n\r\n数据\r\n
    // \r\n说明\r\n说明\r\n\r\n数据\r\n
    // --\r\n

    // 第二步: 去掉头尾
    // \r\n说明\r\n\r\n数据\r\n
    // \r\n说明\r\n\r\n数据\r\n
    // \r\n说明\r\n说明\r\n\r\n数据\r\n

    // 第三步： 每一项去掉头尾\r\n
    // 说明\r\n\r\n数据
    // 说明\r\n\r\n数据
    // 说明\r\n说明\r\n\r\n数据

    // 第四步：\r\n\r\n切分
    // <说明>，<数据>
    // <说明>，<数据>
    // <说明\r\n说明>，<数据>

    // 第五步： 说明都是字符，说明.toString()
    // "说明"，"数据"
    // "说明"，"数据"
    // "说明\r\n说明"，"数据"

    // console.log(req.headers);
    // console.log(req.headers['content-type'].split('; ')[1].split('=')[1])

    if(req.headers['content-type'].startsWith('multipart/form-data')) {
      let post = {};
      let files = {};
       // 提取分隔符
      const boundary = '--' + req.headers['content-type'].split('; ')[1].split('=')[1];
      // console.log(boundary)
      // 第一步，用分隔符进行切分
      let arr = data.split(boundary);
      // console.log(arr.map(item=>item.toString()))
      // 第二步  头尾扔掉
      arr.shift();
      arr.pop();
      // console.log(arr.map(item=>item.toString()))

      //  第三步： 每一项去掉头尾\r\n
      arr = arr.map(item=>item.slice(2, item.length-2))
      // console.log(arr)

      // 第四步：\r\n\r\n切分
      arr.forEach((item) => {
        let n = item.indexOf('\r\n\r\n');
        let info = item.slice(0, n);
        let data = item.slice(n+4);

        info = info.toString();
        
        if(info.indexOf('\r\n') == -1) {//非文件
          let key = common.parseInfo(info).name;
          let val = data.toString();
          post[key] = val;
        } else {//文件
          //获取文件名称
          let json = common.parseInfo(info);
          let key = json.name;
          let filename = json.filename;
          let type = json['Content-Type'];
          let filepath= `upload/${uuid().replace(/\-/g, '')}${path.extname(filename)}`

          files[key] = {filename, type, filepath}
          
          fs.writeFile(filepath, data, err => {
            if(err) {
              console.log('文件写入失败')
            } else {
              console.log('文件写入成功')
              console.log(post, files)
            }
          })
        }
      });
    } else {
      const post = querystring.parse(data.toString())
      console.log('POST数据：', post);
    }
  })
})
server.listen(8080)