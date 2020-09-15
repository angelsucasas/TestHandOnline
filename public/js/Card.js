class Card{
	constructor(name,cardType){
		this.name= name;
		this.cardType = cardType;
	}
}


$(document).ready(function(){
    console.log("sube")
    $('.go-up').click(function(){
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });
 
    $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
            $('.go-up').slideDown(300);
        } else {
            $('.go-up').slideUp(300);
        }
    }); 
});

$("#iterations").on("keypress", function(evt) {
  let keycode = evt.charCode || evt.keyCode;  
  if (keycode == 46 || this.value.length==7 ||keycode == 45) {
    return false;
  }
});