window.onload = function () {
  var $ = function (selector) {
    return selector ? document.querySelector(selector) : selector;
  };

  var canvas  = $('#mycanvas'),
      input   = $('.input'),
      img     = $('.img');

  var width   = 0,// 单张图片宽度
      heigth  = 0,// 单张图片高度
      src     = [],// 储存本地图片url
      images  = [];

  // 获取图片url
  input.addEventListener('change',readerSrc,false);

  // 点击生成图片
  $('button').addEventListener('click',makeImage,false)

  function makeImage() {
    var thisWidth = src.length < 10 ? src.length: 10,
        thisHeight= Math.ceil(src.length / 10);
    // 设置画布像素
    canvas.width  = width * thisWidth;
    canvas.height = height * thisHeight;
    // 设置画布展现比例(该比例不影响最终生成图像结果)
    canvas.style.height = parseInt(getStyle(canvas, 'width')) * canvas.height / canvas.width + 'px';
    // 调用canvas绘制图像
    drawCanvas();
  }

  function readerSrc() {
    var fileList = this.files;
    for(var i = 0; i < fileList.length; i++){
      src[i] = window.URL.createObjectURL(fileList[i]);
      images[i] = new Image();
      images[i].src = src[i];
      images[i].onload = function () {
        //
      }
    }
    images[0].onload = function () {
      width = this.naturalWidth;
      height = this.naturalHeight;
      $('.infor').innerText = '单张图片宽度为：' + width + 'px || 单张图片高度为：' + height + 'px'
    }
  }

  function drawCanvas() {
    for(var n = 0; n < images.length; n++){
      var w = n % 10;
      var h = Math.floor(n / 10);
      console.log(w + ',' + h);
      ctx = canvas.getContext('2d');
      ctx.drawImage(images[n], width*w, height *h);
    }
    n = 0;
  }

  function getStyle(obj, attr) {
		if (obj.currentStyle) { //currentStyle是针对ie浏览器
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr]; //针对火狐浏览器
		}
	}
};// Window END
