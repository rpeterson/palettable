/* Author:

*/
jQuery.noConflict();

(function($) {
  $('.dropdown-menu').find('form').click(function (e) {
    e.stopPropagation();
  });
  $('#signUpModal').modal({
    keyboard: false,
    backdrop: true,
    show: false
  });
})(jQuery);