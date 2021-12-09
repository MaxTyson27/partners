const companyInput = document.querySelector('.form__input_type_company');
$(document).ready(function () {
  const select = $('.form__select').select2();
  select.on('select2:select', function (e) {
    var type = e.params.data.id;
    switch (type) {
      case 'Работаю в агенстве': {
        companyInput.classList.remove('form__input_disabled')
        companyInput.disabled = false
        unhighlightSelect()
        return;
      }
      case 'Частный агент': {
        unhighlightSelect()
        break
      }
      case 'hide': {
        highlightSelect()
        break
      }
    }

    hideError(companyInput)
    companyInput.classList.add('form__input_disabled')
    companyInput.disabled = true
  });


  const $form = $(".form_type_ambasador ")
  const form = $form.get(0)

  const changeHandler = (e) => {
    const input = e.target;
    if (input.validity.valid) {
      hideError(input)
    } else {
      showError(input)
    }
  }

  const hideError = (input) => {
    const error = input.closest('.form__label').querySelector('.form__error');
    const border = input.closest('.form__label').querySelector(".form__border");
    error.classList.add('form__error_hidden')
    input.classList.remove('form__input_error')
  }

  const showError = (input) => {
    const error = input.closest('.form__label').querySelector('.form__error');
    const border = input.closest('.form__label').querySelector(".form__border");
    error.classList.remove('form__error_hidden')
    input.classList.add('form__input_error')
  }

  const inputs = Array.from(document.querySelectorAll('.form__input'))
  inputs.forEach(input => {
    if (input.id == 'phone-input') {
      input.addEventListener('keypress', changeHandler)
    }

    input.addEventListener('invalid', changeHandler)
    input.addEventListener('input', changeHandler)
  })

  const selectedJobSpan = $('.select2-selection__rendered');
  const selectContainer = document.querySelector('.select2-selection');
  const selectErrorContainer = document.querySelector('#select-error')

  function isSelectValid() {
    return selectedJobSpan.get(0).textContent !== '—'
  }

  function highlightSelect() {
    selectContainer.classList.add('select2-selection_error')
    selectErrorContainer.classList.remove('form__error_hidden')
  }

  function unhighlightSelect() {
    console.log('!')
    selectContainer.classList.remove('select2-selection_error')
    selectErrorContainer.classList.add('form__error_hidden')
  }

  $form.submit(function (e) {
    e.preventDefault();

    let isValid = true;
    $(".form__input").each(function () {
      const element = $(this);
      const isDisabled = element.attr("disabled") == 'disabled'
      if (!isDisabled && element.val().trim() === "") {
        isValid = false;
      }
    });

    if (!isSelectValid()) {
      isValid = false
      highlightSelect()
    }

    if (!isValid) {
      form.checkValidity()

    }

    if (isValid) {
      let str = $(this).serialize();

      console.log('str', str)
      $.ajax({
        type: "POST",
        url: "send_ambasador_request.php",
        data: str,
        success: function (msg) {
          if (msg == 'OK') {
            form.reset();
            successModal.classList.add('modal_open')
          } else {
            console.log(msg)
          }
        }
      });
      return false;
    } else {
      console.log('some fields are empty')
    }
  });


});





