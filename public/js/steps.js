var minHeights= ['first-step', 'second-step','third-step'];
var heighControl = document.getElementById('heighControl');
var heightsControl = 0; 

$(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');        

    allWells.hide();
 
    navListItems.click(function (e) {        
        e.preventDefault();

        var $target = $($(this).attr('href')),
            $item = $(this);
            if($target[0].attributes[1].nodeValue=="step-1"){
                if(!document.getElementById('logo')){
                    let newRow =  document.createElement('div');
                    newRow.id = "logo"
                    addClass(newRow,'row logoPadding animate__animated animate__flip');

                    let newImage = document.createElement('img');
                    newImage.src = "./public/testhandLogoFinal.png";
                    addClass(newImage,'logoSize');

                    newRow.appendChild(newImage);
                    document.getElementById('mainContainer').insertBefore(newRow,document.getElementById('fisrtRow'))                
                }                
            }else{                   
                if(document.getElementById('logo')){
                    document.getElementById('mainContainer').removeChild(document.getElementById('logo'));
                }                
            }
        
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

    $('div.setup-panel div a.btn-primary').trigger('click');
});
