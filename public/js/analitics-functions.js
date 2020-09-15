var comboArrayRegister = [];
var brickArrayRegister = [];
var numberOfCombosByHand = [];
var hipergeometricTable = document.getElementById('hipergeometricDistributionResult');
var combosImagesIndividualResult = document.getElementById('combosImagesIndividualResult');
var brickImagesIndividualResult = document.getElementById('brickImagesIndividualResult');

function hiperbolicDistributionAnalisis(array){
  let hiperbolicArrayValues = []  
  const originalDeck = deck
  
  for(card of array){         
    let hiperbolicDistributionIndividualValue = 0;
    if(Array.isArray(card)){     
    let numberOfCOpiesInCombo = 0; 
    const originalCombo = card
      for(ind of card){        
        //carta dentro de cada combo
        //consigue cuantas copias de esa carta hay en la mano           
        let numberOfCopiesInHand = getQuantityOfCopies(ind, card);
        //al igual que el numero de esa copia en el deck                
        let numberOfCopiesInDeck = getQuantityOfCopies(ind, deck);

        card = originalCombo;
        deck = originalDeck;
        //luego compara con la tabla de resultado y suma
        hiperbolicDistributionIndividualValue = hiperbolicDistributionIndividualValue + matriz[numberOfCopiesInDeck][numberOfCopiesInHand-1];  
        numberOfCOpiesInCombo ++;     
      }

    hiperbolicDistributionComboValue = hiperbolicDistributionIndividualValue / numberOfCOpiesInCombo;    
    }
    hiperbolicArrayValues.push(hiperbolicDistributionComboValue);
  }


  hipergeometricTable.innerHTML=""
  addToTheTable(`Resultados basados en una distribucion hiperbolica`,'',hipergeometricTable) 

  let hiperbolicValue
  let countValues = 1;   
  for(hiperbolicValue of hiperbolicArrayValues){
    addToTheTable(`Porcentaje de exito del combo ${countValues}`,`${hiperbolicValue}%`,hipergeometricTable)    
    countValues++;    
  } 
}

async function rawAnalisis(array , bricks, numberOfIterations){
  console.log(array)
  console.log(bricks)
  //aqui va el analisis del deck 
  //ok ya tengo el deck y los combos, ahora falta sacar las manos y comparar
  let deadHands = 0;
  let brickHands = 0;
  //se inicializa el array de contadores donde apareceran 
  
  let counterInitialization = array.length;    
  numIterations = numberOfIterations;  

  while(counterInitialization){
    comboArrayRegister[counterInitialization-1] = 0;    
    counterInitialization-=1;
  }

  counterInitialization = bricks.length

   while(counterInitialization){    
    brickArrayRegister[counterInitialization-1] = 0;
    counterInitialization-=1;
  }
  //para contar cuantos combos hay por mano

  let numberOfHands = numberOfIterations;
  let originalNumberOfIterations = numberOfIterations;
  while(numberOfHands){
    numberOfCombosByHand[numberOfHands-1] = 0;
    numberOfHands-=1;
  }  

  let deckSize = deck.length;
  let mano = []

  let cloneDeck = deck;
  let cardToHand;
  let thereIsAComboInThatHand = 0;
  let thereIsABrickInThatHand = 0;

    

  while(numberOfIterations){

    mano = [];
    cloneDeck = deck;    
    mano = draw5randomCardsFromDeck(cloneDeck);      
    [comboArrayRegister,numberOfCombosByHand,thereIsAComboInThatHand] = checkIfThisComboIsInThisHand(array, mano, numberOfIterations,comboArrayRegister);
    [brickArrayRegister,[],thereIsABrickInThatHand] = checkIfThisComboIsInThisHand(bricks, mano, numberOfIterations, brickArrayRegister);


    brickHands+=1*(!thereIsABrickInThatHand);
    //para registrar las manos sin combos    
    deadHands+=1*(!thereIsAComboInThatHand);
    
    numberOfIterations-=1;
  }
  console.log(comboArrayRegister)         
  console.log(brickArrayRegister)
  $("#p").html(deadHands);

  addToTheTable(`Porcentaje de manos con 1 combo como minimo`,(100-((100*deadHands)/numIterations))+'%', table);
  addToTheTable(`Porcentaje de manos muertas`,((100*deadHands)/numIterations)+'%', table);
  addToTheTable(`Porcentaje de manos con bricks`,(100-((100*brickHands)/numIterations))+'%', table);
  
  brickImagesIndividualResult.innerHTML="";
  combosImagesIndividualResult.innerHTML="";
  if(array.length){
    let positionOfIndividualCombo;

    for(numberOfIndividualComboOcurrencies of comboArrayRegister){
      console.log("entro en el combo")
      positionOfIndividualCombo = comboArrayRegister.indexOf(numberOfIndividualComboOcurrencies);
      addCardImageToTheTable(`Combo ${positionOfIndividualCombo+1}`,array[positionOfIndividualCombo],'Porcentaje: '+[(numberOfIndividualComboOcurrencies*100)/originalNumberOfIterations]+'%'+'['+[numberOfIndividualComboOcurrencies+'/'+originalNumberOfIterations]+']', combosImagesIndividualResult)
    }
  }
  
  
  if(bricks.length){
    let positionOfIndividualBrick

    for(numberOfIndividualBrickOcurrencies of brickArrayRegister){
      console.log("entro en el brick")
      positionOfIndividualBrick = brickArrayRegister.indexOf(numberOfIndividualBrickOcurrencies);
      addCardImageToTheTable(`Brick ${positionOfIndividualBrick+1}`,bricks[positionOfIndividualBrick],'Porcentaje: '+[(numberOfIndividualBrickOcurrencies*100)/originalNumberOfIterations]+'%'+'['+[numberOfIndividualBrickOcurrencies+'/'+originalNumberOfIterations]+']', brickImagesIndividualResult) 
    }
  } 
}


function checkIfThisComboIsInThisHand(array, mano, numberOfIterations, arrayRegister){
  //ahora compara si hay algun combo en esa mano
  let thereIsAComboInThatHand = 0;
  let individualCombo;  
  for(individualCombo of array){         
    if(Array.isArray(individualCombo)){      

      let cardsCoincidenceWithHandFlag = 0;
      let cardsCoincidenceWithHand = 0;
      let cardsInCombo = 0;           
      //haz una copia de las cartas del combo
      
      let handCopy = mano;  

      for(individualCard of individualCombo){                                            
        cardsCoincidenceWithHandFlag = 0;

        for(cardInHand of handCopy){     

          if(cardInHand==individualCard && !cardsCoincidenceWithHandFlag){            
            cardsCoincidenceWithHandFlag +=1;
            //y cuando se haga una coincidencia, elimina esa copia de la mano          
            handCopy = removeElementFromArray(handCopy,cardInHand)            

          }   

        } 

        //despues de comparar esa carta con la mano,verifica que si estuviera
        
      cardsCoincidenceWithHand += 1*(cardsCoincidenceWithHandFlag);            
      cardsInCombo +=1;
      } 

      //si despues de la comparativa el numero de coincidencias es igual al numero de combos
      //entonces el combo si se encontraba en la mano

      //aumentamos un array de contadores, en la misma posicion donde estaba almacenado el combo
      //al final cada posicion deberia tener la cantidad de veces que aparecio cada combo

      arrayRegister[array.indexOf(individualCombo)]+=1*(cardsCoincidenceWithHand==cardsInCombo);
      numberOfCombosByHand[numberOfIterations-1]+=1*(cardsCoincidenceWithHand==cardsInCombo);
      thereIsAComboInThatHand+=1*(cardsCoincidenceWithHand==cardsInCombo);                 
    }
  }

  return [arrayRegister,numberOfCombosByHand,thereIsAComboInThatHand]
}


function addToTheTable(columnTextLeft,columnTextRight, table){
  let tr = document.createElement('tr');
  let td = document.createElement('td');   
  let td2 = document.createElement('td');  

  td.innerText = columnTextLeft;
  tr.appendChild(td);
  td2.innerText = `${columnTextRight}`;  
  tr.appendChild(td2);            
  table.appendChild(tr);
}

function addCardImageToTheTable(columnTextLeft,imgSrcArray,columnTextRight, table){
  let tr = document.createElement('tr');
  let td = document.createElement('td');   
  let td2 = document.createElement('td');
  td.innerText = columnTextLeft;
  tr.appendChild(td);

  for( imgSrc of imgSrcArray){
    let newImage = document.createElement('img');
    newImage.src='./public/pics/'+imgSrc+'.jpg';
    addClass(newImage,'#card card')
    tr.appendChild(newImage);
  }
  
  td2.innerText = `${columnTextRight}`;  
  tr.appendChild(td2);            
  table.appendChild(tr);
}
