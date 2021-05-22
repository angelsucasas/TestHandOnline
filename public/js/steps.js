var minHeights= ['first-step', 'second-step','third-step'];
var heighControl = document.getElementById('heighControl');
var heightsControl = 0; 
var TestMode = 0;
var firstTimeTestMode = 1


$("#activarModoPrueba").click(function(e){
    e.preventDefault();
    TestMode ? setTestVariables("greenButton","redButton",0,"Activar modo prueba","Desactivado",e):setTestVariables("redButton","greenButton",1,"Desactivar modo prueba","Activado",e)
    if(firstTimeTestMode){
        alert("Con el modo prueba activado puedes pasar al siguiente paso, sin necesidad de subir un archivo .ydk!")
        firstTimeTestMode=0;
    }
})

function setTestVariables(ClassToRemove,ClassToAdd,testOnOrOff,testMessage, testconfirmationMessage,e){
    removeClass(e.target,ClassToRemove)
    addClass(e.target,ClassToAdd)
    TestMode=testOnOrOff
    e.target.textContent =testMessage       
    $("#TestModeText")[0].textContent=testconfirmationMessage
}

$(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');        

    allWells.hide();
 
    navListItems.click(function (e) {        
        e.preventDefault();

        var $target = $($(this).attr('href')),
            $item = $(this);
            /*if($target[0].attributes[1].nodeValue=="step-1"){
                if(!document.getElementById('logo')){
                    let newRow =  document.createElement('div');
                    newRow.id = "logo"
                    addClass(newRow,'row logoPadding animate__animated animate__flip');
                    let newCol = document.createElement('div');
                    addClass(newCol,'col-lg-4 col-md-4 col-sm-4 col-xs-4');
                    newRow.appendChild(newCol);

                    let newCol2 = document.createElement('div');
                    addClass(newCol2,'col-lg-4 col-md-4 col-sm-4 col-xs-4 iconAdjust');
                    
                    
                    let newImage = document.createElement('img');
                    newImage.src = "./public/testhandLogoFinal.png";
                    addClass(newImage,'logoSize');
                    newCol2.appendChild(newImage);
                    

                    newRow.appendChild(newCol2);                    
                    document.getElementById('mainContainer').insertBefore(newRow,document.getElementById('fisrtRow'))                
                }                
            }else{                   
                if(document.getElementById('logo')){
                    document.getElementById('mainContainer').removeChild(document.getElementById('logo'));
                }                
            }*/
        
        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){        
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        if(TestMode){
            //cyberse deck
            deck=[
                "32295838", "32295838", "32295838",
                "36211150", "36211150", "70950698",
                "70950698", "35595518", "35595518", 
                "8567955", "8567955", "8567955", 
                "645087", "645087", "645087", 
                "62706865", "62706865", "62706865", 
                "63528891", "63528891", "14505685", 
                "14505685", "9523599", "65100616", 
                "65100616", "18789533", "911883", 
                "911883", "911883", "1033312", 
                "1033312", "96383838", "96383838", 
                "8267140", "8267140", "43839002", 
                "43839002", "43839002", "40605147", 
                "84749824"];

            extraDeck = [
                "5821478", "5043010", "5043010",
                "5043011", "1861629", "6622715",
                "32617464", "34472920", "79016563",
                "22862454", "67231737", "98978921",
                "98978921", "98978921", "32995276"
            ]

            sideDeck = [
                "82385847", "67750322", "94145021", 
                "94145021", "97268402", "97268402", 
                "53129443", "2971446", "10813327", 
                "98414735", "30241314", "69452756", 
                "77538567", "84749824", "84749824"]
        }

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)            
            nextStepWizard[0].id == "SecondStep" ? showDecksChangeOption():hideDecksChangeOption()
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

function showDecksChangeOption(){
    removeClass($("#changeToMainDeck")[0],"hideElement")
    removeClass($("#changeToExtraDeck")[0],"hideElement")
    removeClass($("#changeToSideDeck")[0],"hideElement")
}

function hideDecksChangeOption(){
    addClass($("#changeToMainDeck")[0],"hideElement")
    addClass($("#changeToExtraDeck")[0],"hideElement")
    addClass($("#changeToSideDeck")[0],"hideElement")
}