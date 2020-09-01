
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
  let boxOfBricks = document.querySelectorAll('#brick');
  
  
  let cardsByCombo = getIDContentOfHtmlElement(boxOfCombos);
  let cardsByBrick = getIDContentOfHtmlElement(boxOfBricks);  
  let numberOfIterations = document.getElementById("iterations").value;  
 
  table.innerHTML="";

  rawAnalisis(cardsByCombo,cardsByBrick, numberOfIterations);   
  hiperbolicDistributionAnalisis(cardsByCombo);
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


