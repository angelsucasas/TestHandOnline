
const comboData = document.getElementById("pruebita");
const specialNextBtn = $('.nextBtnSpecial');

let combos = []
let array = []
let count = 0 ;
var deck = [];
var sideDeck = [];
var extraDeck = [];
var numIterations = 0;

/** gets the id of the cards inside the "combo boxes" 
*  and then send it to the BE
*
*  then it inserts the results in the table in the step 3
*/
comboData.addEventListener("click",function(e){  
  e.preventDefault();
  
  array = [];
  let iterationsInput = document.getElementById("iterations");
    if(iterationsInput.value){
      sendCardsID();      
      specialNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
      });
    }else{    
      alert("debe ingresar el numero de veces que desea  ejecutar las pruebas")
    }
  });

async function sendCardsID(){
  let columns = document.getElementsByClassName("carousel-inner");
  // por cada caja de combo  
  [].forEach.call(columns, function(col) {   
    //por cada elemento dentro de la caja de combo
    [].forEach.call(col.childNodes, function(col2) {
       //todos aquellos que tengan hijos (ignoramos los items vacios y textos)
       if(col2.nodeName=='DIV'){         
         //por cada item, que tenga un id
         [].forEach.call(col2.querySelectorAll('.item'), function(col3) {           
           combos = [];
           [].forEach.call(col3.childNodes, function(col4) {
             if(col4.id){                                     
             combos.push(col4.id)
           }   
          });    
          if(combos !=""){
            array.push(combos);  
          }               
         });         
                  
       }       
     });
    count +=1;    
  });      

  //aqui va el analisis del deck

  //ok ya tengo el deck y los combos, ahora falta sacar las manos y comparar
  let deadHands = 0;
  //se inicializa el array de contadores donde apareceran 
    
    
  let counterInitialization = array.length;  
  let numIte = document.getElementById("iterations").value;  
  numIterations = numIte;
  let comboArrayRegister = [];

  while(counterInitialization){
    comboArrayRegister[counterInitialization-1] = 0;
    counterInitialization-=1;
  }
  //para contar cuantos combos hay por mano

  let numberOfHands = numIte;
  let numberOfCombosByHand = [];

  while(numberOfHands){
    numberOfCombosByHand[numberOfHands-1] = 0;
    numberOfHands-=1;
  }  

  let deckSize = deck.length;
  let mano = []
  while( numIte !=0 ){
    
    mano = [];
    //saca 5 cartas al azar del mazo, y ponlas en la "mano"
    while( mano.length != 5){              
      mano.push(deck[Math.floor(Math.random() * (deckSize))]);
    }        
    //ahora compara si hay algun combo en esa mano
    let thereIsAComboInThatHand = 0;
    let card;
    for(card of array){         

      if(Array.isArray(card)){

        let cardsCoincidenceWithHandFlag = 0;
        let cardsCoincidenceWithHand = 0;
        let cardsInCombo = 0;           
        //haz una copia de las cartas del combo
        
        let handCopy = mano;        
        for(ind of card){                                            
          cardsCoincidenceWithHandFlag = 0;

          for(cardInHand of handCopy){     

            if(cardInHand==ind && !cardsCoincidenceWithHandFlag){

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
        comboArrayRegister[array.indexOf(card)]+=1*(cardsCoincidenceWithHand==cardsInCombo);
        numberOfCombosByHand[numIte-1]+=1*(cardsCoincidenceWithHand==cardsInCombo);
        thereIsAComboInThatHand+=1*(cardsCoincidenceWithHand==cardsInCombo);                 
      }
    }
    //para registrar las manos sin combos    
    deadHands+=1*(!thereIsAComboInThatHand);
    
    numIte-=1;
  }
          
     
  $("#p").html(deadHands);
  
  let table = document.getElementById('mytable');   
  table.innerHTML="";

  let tr = document.createElement('tr');
  let td1 = document.createElement('td');   
  let td2 = document.createElement('td');  

  td1.innerText = `Porcentaje de manos con combos`;
  tr.appendChild(td1);
  td2.innerText = `${100-((100*deadHands)/numIterations)}%`;
  tr.appendChild(td2);            
  table.appendChild(tr);

  let tr2 = document.createElement('tr');
  let td3 = document.createElement('td');   
  let td4 = document.createElement('td');  

  td3.innerText = `Porcentaje de manos muertas`;
  tr2.appendChild(td3);
  td4.innerText = `${((100*deadHands)/numIterations)}%`;
  tr2.appendChild(td4);            
  table.appendChild(tr2);
  //$("#test3").html(combosInHand[0]);        
}

let sendDeckButton = document.getElementById("testForm");

/** gets the file that the user input at step 1 
*  and puts it in the DOM
*
*  then it inserts the img inside de "maindDeckDiv"
*/
sendDeckButton.addEventListener('submit', function(event){
  event.preventDefault();  
    
  let mainDeckDiv = document.getElementById('mainDeckDiv');
  mainDeckDiv.innerHTML = "";

  [].forEach.call(deck, function (mainDeckCard) {
    let cardImage = document.createElement('img');
    cardImage.setAttribute('draggable', true);  
    cardImage.src =`./public/pics/${mainDeckCard}.jpg`;
    cardImage.id = mainDeckCard;
    addClass(cardImage,"#card card"); 
    mainDeckDiv.appendChild(cardImage);
  });

  let extraDeckDiv = document.getElementById('extraDeckDiv');
  extraDeckDiv.innerHTML = "";

  [].forEach.call(extraDeck, function (extraDeckCard){
    let cardImage = document.createElement('img');
    cardImage.setAttribute('draggable', false);  
    cardImage.src =`./public/pics/${extraDeckCard}.jpg`
    cardImage.id = extraDeckCard;
    addClass(cardImage,"#card card"); 
    extraDeckDiv.appendChild(cardImage);
  });
       
});


const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  console.log(fileList);
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  filterFileContent(contents);
}

document.getElementById('input')
  .addEventListener('change', readSingleFile, false);


  function filterFileContent(cont){
    //reemplaza todas las existencias de \r\n en el archivo por espacios  
    //una vez hecha la division de el contenido por espacios, la funcion explode
    //divide el string por cada vez que encuentre un espacio y devuelve un array  
    //por cuestiones de rendimiento                         
    let deckStrings =  cont.split('\r\n'); 
    deckStrings = deckStrings.slice(1);
    deckStrings = deckStrings.slice(1);

    deck = [];
    sideDeck = [];
    extraDeck = [];

    let flag = 0;        

    let arrayLength = deckStrings.length;
        for (let cont=0; cont < arrayLength ; cont++){                         
          if(deckStrings[cont]=="#extra"){
              flag++;
          }

          if(deckStrings[cont]=="!side"){
              flag++;              
          }

          //la primera posicion de cada array sirve para diferenciarlo
          //se puede eliminar o se puede saltar
          if(deckStrings[cont]!=""){
              if(flag==0){                  
                  deck.push(deckStrings[cont]);
              }
              else if(flag==1){                  
                  extraDeck.push(deckStrings[cont]);
              }
              /*else if(flag==2){                                      
                  sideDeck.push(deckStrings[cont])
              }*/
          }
          
      }
      
    extradeck = extraDeck.slice(1);                     
  }      


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

  //limpiamos 
  delete tempLentgh;
  delete tempArr;
  delete valuePos;
  delete arrLength;

  return arr;
}
