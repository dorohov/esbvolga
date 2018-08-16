
/*
start .go-to-top window-scroll
*/

$(
	function() {
		
		var pos = $(document).scrollTop();
		
		var gototop = $('.go-to-top');
		if(gototop.hasClass('active')) {
			if(pos < 200) {
				gototop.removeClass('active');
			}
		} else {
			if(pos > 200) {
				gototop.addClass('active');
			}
		}
		
	}
);
/*
(function(){
		
		$('.class-for-value').html($(document).scrollTop());
		
})();*/

/*
end .go-to-top window-scroll
*/
