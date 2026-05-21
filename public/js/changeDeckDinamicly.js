let changeToMainButton = document.getElementById('changeToMainDeck');
let changeToSideButton = document.getElementById('changeToSideDeck');
let changeToExtraButton = document.getElementById('changeToExtraDeck');

let changeToMainButton2 = document.getElementById('changeToMainDeck2');
let changeToSideButton2 = document.getElementById('changeToSideDeck2');
let changeToExtraButton2 = document.getElementById('changeToExtraDeck2');

let mainDeck =  document.getElementById('mainDeckDiv')
let mainDeck2 =  document.getElementById('mainDeckDiv2')

changeToMainButton.addEventListener('click',function(){	
	//ponle el drag
	resetMainDivTable(mainDeck);
	printCardDragables(deck,mainDeck);
})

changeToSideButton.addEventListener('click',function(){
	//quitale el drag		
	resetMainDivTable(mainDeck);
	printCardNotDragables(sideDeck,mainDeck);
})

changeToExtraDeck.addEventListener('click',function(){		
	resetMainDivTable(mainDeck);
	printCardNotDragables(extraDeck,mainDeck);
})


changeToMainButton2.addEventListener('click',function(){	
	//ponle el drag
	resetMainDivTable(mainDeck2);
	printCardDragables(deck,mainDeck2);
})

changeToSideButton2.addEventListener('click',function(){
	//quitale el drag		
	resetMainDivTable(mainDeck2);
	printCardNotDragables(sideDeck,mainDeck2);
})

changeToExtraDeck2.addEventListener('click',function(){		
	resetMainDivTable(mainDeck2);
	printCardNotDragables(extraDeck,mainDeck2);
})