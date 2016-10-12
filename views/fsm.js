window.onload = function () {
  var $ = function (selector) {
    return selector ? document.querySelector(selector) : selector;
  };

  var canvas  = $('#mycanvas'),
      input   = $('.input'),
      img     = $('.img');

  var width   = 0,
      heigth  = 0,
      x       = 0,
      y       = 0,
      length  = 0,
      n       = 0,
      src     = new Array(),
      images  = new Array();

  // 获取单张图片高度
  $('#imgWidth').addEventListener('change',function () {
    width = this.value;
    console.log(width);
  },false)

  // 获取单张图片高度
  $('#imgHeight').addEventListener('change',function () {
    height = this.value;
    console.log(height);
  },false)

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
    length = fileList.length;
    console.log(length);
    for(var i = 0; i < fileList.length; i++){
      src[i] = window.URL.createObjectURL(fileList[i]);
      images[i] = new Image();
      images[i].src = src[i];
    }
  }

  function drawCanvas() {
    if(n < images.length){
      var w = n % 10;
      var h = Math.floor(n / 10);
      ctx = canvas.getContext('2d');
      ctx.drawImage(images[n], width*w, height *h);
      console.log(w + ',' + h);
      n++;
      drawCanvas();
    }else{
      n = 0;
    }
  }

  function getStyle(obj, attr) {
		if (obj.currentStyle) { //currentStyle是针对ie浏览器
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr]; //针对火狐浏览器
		}
	}
};// Window END
