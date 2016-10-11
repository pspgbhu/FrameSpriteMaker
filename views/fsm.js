window.onload = function () {
  var canvas  = document.getElementById('mycanvas'),
      input   = document.getElementsByClassName('input')[0],
      img     = document.getElementsByClassName('img')[0];

  var width   = 0,
      heigth  = 0,
      src     = new Array();

  input.addEventListener('change',readerSrc,false);


  function readerSrc() {
    var fileList = this.files;
    for(var i = 0; i < fileList.length; i++){
      src[i] = window.URL.createObjectURL(fileList[i]);
      img.innerHTML += '<img src="'+ src[i] +'" alt="">'
    }
  }

  function drawCanvas() {
    ctx = canvas.getContext('2d');
    ctx.
  }
};// Window END
