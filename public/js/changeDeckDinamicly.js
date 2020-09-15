let changeToMainButton = document.getElementById('changeToMainDeck');
let changeToSideButton = document.getElementById('changeToSideDeck');
let changeToExtraButton = document.getElementById('changeToExtraDeck');

let mainDeck =  document.getElementById('mainDeckDiv')

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