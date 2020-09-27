
const comboData = document.getElementById("pruebita");
const specialNextBtn = $('.nextBtnSpecial');
var table = document.getElementById('mytable'); 

let combos = []
let array = []
let count = 0 ;
var deck = [];
var sideDeck = [];
var extraDeck = [];
var numIterations = 0;
let matriz = []

//constantes de la distribuciones hiperogeometricas posibles
matriz[3] = [30.1113, 3.54 , 0.1012]
matriz[2] = [22.4358, 1.2820]
matriz[1] = [12.5];

/** gets the id of the cards inside the "combo boxes" 
*  and then send it to the BE
*
*  then it inserts the results in the table in the step 3
*/
comboData.addEventListener("click",async function(e){  
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
  let boxOfCombos = document.querySelectorAll('#comboCards');
  let boxOfBricks = document.querySelectorAll('#comboBrick');
  let boxOfEquivalentsFathers = document.querySelectorAll('#comboEquivalentFather');
  let boxOfEquivalentsChilds = document.querySelectorAll('#comboEquivalentChild');
  
  
  let cardsByCombo = getIDContentOfHtmlElement(boxOfCombos);
  let cardsByBrick = getIDContentOfHtmlElement(boxOfBricks);
  
  let cardsByEquivalentFather = getIDContentOfHtmlElement(boxOfEquivalentsFathers);
  let cardsByEquivalentChilds = getIDContentOfHtmlElement(boxOfEquivalentsChilds);
  if(cardsByEquivalentFather.length!=boxOfEquivalentsFathers.length && boxOfEquivalentsChilds.length!=cardsByEquivalentChilds.length){
    alert("debe haber una carta minimo en cada caja que creo")
  }

  [cardsByEquivalentFather,cardsByEquivalentChilds] = alignChildAndFathers(cardsByEquivalentFather,cardsByEquivalentChilds)

  let numberOfIterations = document.getElementById("iterations").value;  
 
  table.innerHTML="";


  rawAnalisis(cardsByCombo,cardsByBrick, numberOfIterations, cardsByEquivalentFather, cardsByEquivalentChilds);   
  hiperbolicDistributionAnalisis(cardsByCombo);
}

function alignChildAndFathers(fathersCombo, childsCombo){
  //ok entonces alinia los padres e hijos
  //y entonces? hmmm
  let childsArray = [];
  let fathersArray = [];
  let foundFlag, valuePosition, count=0;  
  for( individualChilds of childsCombo){
    let individualChildsLength = individualChilds.length;    
    for(
      let fathersComboCount=0;
      fathersComboCount<individualChildsLength;
      fathersComboCount++
    ){
      //por cada elemento
      //registra cada hijo, en caso de que no exista
      //quedaria como [hijoA,hijoB,hijoC] [[p1,p2,p3],[p2,p3],[p4]]
      [ foundFlag , valuePosition ] = findValueInArrays(childsArray,individualChilds[fathersComboCount])
      if(foundFlag){          
        fathersArray[valuePosition].push(fathersCombo[count][0])               
      }else{                
        fathersArray.push([fathersCombo[count][0]])
        childsArray.push(individualChilds[fathersComboCount])
      }
    }
    count++;
  }
  return [fathersArray,childsArray]
}


let sendDeckButton = document.getElementById("testForm");

function printCardDragables(deck,DeckDiv){
  [].forEach.call(deck, function (Card) {
    let cardImage = document.createElement('img');
    cardImage.setAttribute('draggable', true);  
    cardImage.src =`./public/pics/${Card}.jpg`;
    cardImage.id = Card;
    addClass(cardImage,"#card card"); 
    DeckDiv.appendChild(cardImage);
  });
}

function printCardNotDragables(deck,DeckDiv){
  [].forEach.call(deck, function (Card) {
    let cardImage = document.createElement('img');
    cardImage.setAttribute('draggable', false);       
    cardImage.src =`./public/pics/${Card}.jpg`;
    cardImage.id = Card;
    addClass(cardImage,"#card card"); 
    DeckDiv.appendChild(cardImage);
  });
}

function resetMainDivTable(mainDeckDiv){
  mainDeckDiv.innerHTML="";
}

/** gets the file that the user input at step 1 
*  and puts it in the DOM
*
*  then it inserts the img inside de "maindDeckDiv"
*/
sendDeckButton.addEventListener('submit', function(event){
  event.preventDefault();  
    
  let mainDeckDiv = document.getElementById('mainDeckDiv');
  mainDeckDiv.innerHTML = "";
  mainDeck2.innerHTML = "";

  printCardDragables(deck,mainDeckDiv);
  printCardDragables(deck,mainDeck2)

});


