$(document).ready(function (e) {

  var $menuBtn = $('#menuBtn'),
      $menu = $('#menu');

  $menuBtn.on('click', function (e) {
    $menuBtn.toggleClass('on fa-bars fa-times');
    $menu.toggleClass('on');
  });

  // $menuBtn.trigger('click');

});
