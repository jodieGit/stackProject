const fs=require('fs');

fs.readFile('a.jpg', (err, data)=>{
  if(err){
    console.log('错了');
  }else{
    // 非文本文件，不要对buffer数据进行toString处理
    // str=data.toString();

    fs.writeFile('b.jpg', str, err=>{
      if(err){
        console.log('写入失败');
      }else{
        console.log('完事儿');
      }
    });
  }
});
