jQuery(document).ready(function()
{
	//open navigation clicking the menu icon
	$(".link-mnu").on("click",function(){
		$('.marks').toggleClass('is-visible');
    });
    $(".closer").on("click",function(){
		$('.marks').toggleClass('is-visible');
    });
});

