var $ = function(e){return document.getElementById(e); }
var form = $('form');
var submit = $('submit');
form.addEventListener('submit', send_image, false);
function send_image(e) {
  e.preventDefault();
  file = $('file').files[0];
  formData = new FormData();
  formData.append('imagen[]', file, file.name);
  submit.value = 'Procesando...';
  submit.disabled = true;
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/process', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      reset_form();
      send_form = document.createElement('form'), imagen = document.createElement('input');
      send_form.method = 'post';
      send_form.action = '/download';
      imagen.value = xhr.responseText;
      imagen.name = 'imagen';
      send_form.appendChild(imagen);
      send_form.submit();
    } else {
      reset_form();
    }
  };
  xhr.send(formData);
}
function reset_form() {
  submit.value = 'Upload!';
  submit.disabled = false;
  form.reset();
}
