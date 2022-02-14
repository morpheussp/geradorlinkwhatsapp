(function() {
  'use strict';

  function $(a) {
    return document.querySelector(a);
  };

  var $form = $('[data-js="form-generator"]');
  var $result = $('[data-js="result-url"]');
  var $phone = $('[data-js="phone"]');
  var $message = $('[data-js="message"]');
  var $buttonCopy = $('[data-js="button-copy"]');
  var $url = 'https://api.whatsapp.com/send?phone=+55';

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    if( $phone.value.trim() === '' ) {
      alert('Informe o número de telefone.')
    }
    else {
      $result.value = getUrl();
    }
  }, false);

  $buttonCopy.addEventListener('click', () => {
    $result.select();
    $result.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("URL Copiada com sucesso!");
  });

  const masks = {
    phone(value) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/,'($1) $2')
        .replace(/(\d{4})(\d)/,'$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    }
  }

  document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js;
  
    $input.addEventListener('input', (e) => {
      e.target.value = masks[field](e.target.value)
    }, false)
  });

  function getUrl() {
    return $url+$phone.value.replace(/\D/g, '')+'&text='+$message.value.replace(/['?a'|\s]+$/g,'?.%20').replace(/\s/g, '%20');
  };

  
})();
