/*if(screenJS.deviceLg()) {
	$('.navbar-category__link.dropdown-toggle').removeAttr('data-toggle');
} else {
	$('.navbar-category__link.dropdown-toggle').attr('data-toggle', 'dropdown');
} */
if(screenJS.device()) {
	$('.navbar-footer__nav').removeAttr('id');
} else {
	$('.navbar-footer__nav').attr('id', 'footer-navbar'); 
} 