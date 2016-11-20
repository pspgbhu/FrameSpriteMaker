window.onload = function () {
  var $ = function (selector) {
    return selector ? document.querySelector(selector) : selector;
  };

  var InforOfCanvas = function (w, h) {
    this.width = w;
    this.height = h;
  }
  var inforOfCanvas = new InforOfCanvas(0, 0);

  var canvas  = $('#mycanvas'),
      input   = $('#upImg'),
      infor   = $('#infor');

  var width   = 0,// 单张图片宽度
      heigth  = 0,// 单张图片高度
      src     = [],// 储存本地图片url
      images  = [];// img对象合集



  // 获取图片url
  input.addEventListener('change',readerSrc,false);

  function readerSrc() {
    var same = true; // 图片像素是否一致；
    var fileList = this.files;// 图片文件对象集合
    // 重置信息栏
    infor.innerHTML = '';
    // 重置设置栏
    $('#input-height').value = '';
    $('#input-width').value = '';
    // 建立images对象数组
    for(var i = 0; i < fileList.length; i++){
      src[i] = window.URL.createObjectURL(fileList[i]);
      images[i] = new Image();
      images[i].src = src[i];
      // 检查图片宽高一致性
      (function (index) {
        images[index].onload = function () {
          if(images[0].naturalWidth != images[index].naturalWidth){
            infor.innerHTML += '<li>请检查第'+ (index + 1) + '张图片像素是否一致！</li>'
          }
        };
      })(i);
    }
    showInfor() // show informations about image
  }

  // 输出图片相关信息
  function showInfor() {

    images[0].onload = function () {

      width = this.naturalWidth;  // 单张图片宽度
      height = this.naturalHeight; // 单张图片高度

      var line = src.length < 10 ? src.length : 10, // 列数
      row  = Math.ceil(src.length / 10); // 行数

      // set value in instance of inforOfcanvas
      inforOfCanvas.width = width * line;
      inforOfCanvas.height = height * row

      // 画布像素信息
      // infor.innerHTML += '<li>雪碧图宽度：'+ (inforOfCanvas.width) +'px</li>' +
      // '<li>雪碧图高度：'+ (inforOfCanvas.height) +'px</li>';

      $('#input-width').value = inforOfCanvas.width;
      $('#input-height').value = inforOfCanvas.height;
    }

    $('#make-container').classList.remove('hide');// show button of maker
    $('#infor-container').classList.remove('hide');// show informations container
    settingsShow();
  }

  // show items of setttings
  function settingsShow() {
    $('#settings-container').classList.remove('hide');// show settings container
  }

  // width of settings
  $('#input-width').oninput = function () {
    var line = src.length < 10 ? src.length: 10,
        row= Math.ceil(src.length / 10);
    if (this.value === '') {
      $('#input-height').value = '';
    }
    $('#input-height').value = Math.round(this.value * (height * row) / (width * line) ) ;
  }

  // height of settings
  $('#input-height').oninput = function () {
    var line = src.length < 10 ? src.length: 10,
        row= Math.ceil(src.length / 10);
    if (this.value === '') {
      $('#input-width').value = '';
    }
    $('#input-width').value = Math.round(this.value * (width * line) / (height * row)) ;
  }

  // 点击生成图片
  $('#makeImage').addEventListener('click',makeImage,false)

  function makeImage() {

    var line = src.length < 10 ? src.length: 10,
        row= Math.ceil(src.length / 10);

    // 是否自定义像素
    if($('#input-width').value && $('#input-height').value){

      canvas.width = $('#input-width').value;
      canvas.height = $('#input-height').value;


    } else { // 使用默认像素

      canvas.width  = inforOfCanvas.width;
      canvas.height = inforOfCanvas.height;
    }

    // 设置画布展现比例(该比例不影响最终生成图像结果)
    canvas.style.height = parseInt($('.main-canvas').offsetWidth) * canvas.height / canvas.width + 'px';
    // console.log(getStyle(canvas, 'width') + ',' + canvas.height + ', ' + canvas.width );
    // 调用canvas绘制图像
    drawCanvas();
  }

  // canvas绘制图像
  function drawCanvas() {
    var line = src.length < 10 ? src.length: 10,
        row= Math.ceil(src.length / 10);

    width = $('#input-width').value / line;
    height = $('#input-height').value / row;
    // console.log(width, height)

    for(var n = 0; n < images.length; n++){
      var w = n % 10;
      var h = Math.floor(n / 10);
      // console.log(w + ',' + h);
      // console.log(width * w + ',' + height * h);
      ctx = canvas.getContext('2d');
      ctx.drawImage(images[n], width * w, height * h, width, height);
    }
    n = 0;



    canvas.classList.remove('hide');
  }

  // 获取元素样式
  // function getStyle(obj, attr) {
	// 	if (obj.currentStyle) { //currentStyle是针对ie浏览器
	// 		return obj.currentStyle[attr];
	// 	} else {
	// 		return getComputedStyle(obj, false)[attr]; //针对火狐浏览器
	// 	}
	// }
};// Window END
