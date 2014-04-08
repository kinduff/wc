// VARS
var $ = function(e){return document.getElementById(e); }
var form = $('form');
var file = $('file');
var label = $('label');
var upload = $('upload');

// MAGIC
function send_image(e) {
  e.preventDefault();
  data = file.files[0];
  formData = new FormData();
  formData.append('imagen[]', data, data.name);
  label.innerHTML = 'Processing...';
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/process', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      reset_form();
      send_form = document.createElement('form'), imagen = document.createElement('input');
      send_form.method = 'post';
      send_form.action = '/download';
      imagen.type = 'hidden';
      imagen.value = xhr.responseText;
      imagen.name = 'imagen';
      send_form.appendChild(imagen);
      document.body.appendChild(send_form);
      send_form.submit();
    } else {
      reset_form();
    }
  };
  xhr.send(formData);
}
function reset_form() {
  label.innerHTML = 'Upload Whiteboard Image';
  form.reset();
}
function center_wrap(elem) {
  t = elem;
  h = (t.offsetHeight)/2*-1;
  w = (t.offsetWidth)/2*-1;
  t.style.marginTop = h+"px";
  t.style.marginLeft = w+"px";
}

// INIT
window.onload=function(){
  center_wrap($('wrap'));
  file.addEventListener('change', send_image, false);
}
