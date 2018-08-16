if(screenJS.device()) {
	$('.contacts-card__group').removeAttr('id');
} else {
	$('.contacts-card__group').attr('id', 'map-offices'); 
} 