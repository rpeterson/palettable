/* Author:

*/
jQuery.noConflict();

(function($) {
  $('.dropdown-menu').find('form').click(function (e) {
    e.stopPropagation();
  });
})(jQuery);