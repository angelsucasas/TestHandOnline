let action = gsap.timeline().from('#RconnectionsLogo',{opacity:0, x:-300});
var controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
    triggerElement: '#RconnectionsLogo',
    duration: "90%",
    triggerHook: 0.98,
    offset: 50 
})
.on("enter", function (e) {		   
	action.play();		    	
})		
.on("leave", function (e) {	
	action.reverse();		    			    
})   
.addTo(controller);

let action2 = gsap.timeline().from('#otherImg',{opacity:0, x:50})



new ScrollMagic.Scene({
    triggerElement: '#otherImg',
    duration: "90%",
    triggerHook: 0.98,
    offset: 50 
})
.on("enter", function (e) {		   	
	action2.play();		    	
})		
.on("leave", function (e) {	
	action2.reverse();		    			    
})   
.addTo(controller);