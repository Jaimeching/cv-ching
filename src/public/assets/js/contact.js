$(function () {
  const submitForm = function (e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(this));
    const AJAX_OPTIONS = {
      type: "POST",
      url: "/sendMail",
      data: data,
      success: (res) => {
        console.log(res);
        $('#frmContact').html('Thanks for reaching me out! I will contact you soon!')
      },
      error: (res) => {
        console.log(res);
        $('#frmContact').html('Thanks for reaching me out! I will contact you soon!')
      },
    };
    $.ajax(AJAX_OPTIONS);
  };
  $("#frmContact").on("submit", submitForm);
});
