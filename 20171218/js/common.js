let _imgs = null;
const _resources = {
  fish1: 'img/fish1.png',
  fish2: 'img/fish2.png',
  fish3: 'img/fish3.png',
  fish4: 'img/fish4.png',
  fish5: 'img/fish5.png'
}

function loadImgs (json, fn) {
  let res = {};
  let total = 0;
  let complete = 0;
 
  for(let name in json) {
    total++;

    let imgObj = new Image();
    res[name] = imgObj;
    imgObj.onload = function () {
      complete++;
      if(total == complete) {
        _imgs = res;
        fn(_imgs)
      }
    }
    imgObj.onerror = function () {
      console.log('图片加载失败' + imgObj.src);
    }
    imgObj.src = json[name];
  }
}

function d2a(n) {
  return n*Math.PI/180;
}

function a2d(n) {
  return n*180/Math.PI;
}