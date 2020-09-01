
function removeElementFromArray(arr,value){
  //[a,b,c,d,e,f] buscamos "c"
  let valuePos = arr.indexOf(value);
  let arrLength = arr.length-1;   
  let tempArr = [];
  while(arrLength!=valuePos){
    tempArr.push(arr.pop());
    arrLength--;
  }
  //en este punto tendriamos algo como
  //[a,b,c] [f,e,d]
  arr.pop();
  //[a,b] [f,e,d]
  let tempLentgh = tempArr.length;
  while(tempLentgh){
    arr.push(tempArr[tempLentgh-1]);
    tempLentgh--;
  }
  return arr;
}


function drawCardFromDeck(deck){
  let randomPosition = Math.floor(Math.random() * (deck.length));
  let randomCard = deck[randomPosition]
  deck = removeElementFromArray(deck,randomPosition);
  return [randomCard,deck];
}


function getQuantityOfCopies(card,combo){
  let numberOfCopies = 0;

    for(individualCard of combo){
      //similuando un if por motivos de rendimiento
      numberOfCopies += 1*(individualCard==card);
    }

   return numberOfCopies;  
}

function getIDContentOfHtmlElement(htmlElement){
  let contentFilter, cardsIDs = [];
  
  [].forEach.call(htmlElement,function(firstChild){
    contentFilter = [];
    [].forEach.call(firstChild.childNodes,function(secondChild){
      if(secondChild.id){
        contentFilter.push(secondChild.id);
      }     
    })
    if(contentFilter !=""){
      cardsIDs.push(contentFilter);  
    }  
  });

  return cardsIDs;
}

function draw5randomCardsFromDeck(deck){
  //saca 5 cartas al azar del mazo, y ponlas en la "mano"    
  let hand = [], cardToHand;
  while( hand.length != 5){                    
    [cardToHand, deck] = drawCardFromDeck(deck);
    hand.push(cardToHand);
  }  

  return hand; 
}