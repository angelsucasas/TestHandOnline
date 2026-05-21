const addComboButton = document.getElementById("addCombo")
const addBrickButton = document.getElementById("addBrick")


addComboButton.addEventListener("click",addCombo);
addBrickButton.addEventListener("click",addBrick);


function addBrick(){
  let mainCarousel1 = document.getElementById('brick-carousel');
  let mainRow = mainCarousel1.getElementsByClassName("item active");  
  let originalActive = mainRow;
  let nextChildFlag = 0;
  let childCount = 0;  
  for(i=0;i<originalActive.length;i++){    
    originalActive[i].id="comboCards"? childCount++ : null
  }

  if(childCount>3){
    alert("Se alcanzo el limite de cajas para bricks")
  }
  else{
    let mainColumn = document.createElement('div');
    addClass(mainColumn,"#columns column brickBox");

    let specialRow = document.createElement('div');
    addClass(specialRow,"special-col");
        
    let activeItem = document.createElement('div');
    addClass(activeItem,"item active");
    activeItem.id = "comboBrick";

    let deleteButton = document.createElement('div');
    addClass(deleteButton,"delete-ajust");
    deleteButton.setAttribute('align', 'right'); 

    let button = document.createElement('button'); 
    button.setAttribute('type', 'click');
    addClass(button,"btn btn-circle-delete  btn-xl");
    
    let deleteIcon = document.createElement('i'); 
    addClass(deleteIcon,"trash-icon-ajust glyphicon glyphicon-trash");

    button.appendChild(deleteIcon);
    deleteButton.appendChild(button);


    mainColumn.appendChild(deleteButton);
    specialRow.appendChild(activeItem);
         
    //aqui debajo
    
    mainColumn.appendChild(specialRow)  
              
    mainRow[0].appendChild(mainColumn)  

    deleteButton.addEventListener("click", function(e){
      mainRow[0].removeChild(mainColumn)
    }); 

    

    //como es un nuevo elemento, falta agregarle los eventListener 
    mainColumn.addEventListener('dragstart', handleDragStart, false);
    mainColumn.addEventListener('dragenter', handleDragEnter, false)
    mainColumn.addEventListener('dragover', handleDragOver, false);
    mainColumn.addEventListener('dragleave', handleDragLeave, false);
    mainColumn.addEventListener('drop', handleDrop, false);
    mainColumn.addEventListener('dragend', handleDragEnd, false);
    cols = document.querySelectorAll('.column');
  }
}

/** adds a new "combo box" in the active item in the carousel
 it is insert before the add button
*/
function addCombo(){
  let mainCarousel2 = $('#carousel-example-generic');  
  let mainRow = mainCarousel2[0].getElementsByClassName("item active");  
  
  let originalActive = mainRow;
  let nextChildFlag = 0;
  let childCount = 0;
  
  if(originalActive.length>=3){
    alert("Se alcanzo el limite de cajas para combos")
  }
  else{
    let mainColumn = document.createElement('div');
    addClass(mainColumn,"#columns column comboBox");

    let specialRow = document.createElement('div');
    addClass(specialRow,"special-col");
        
    let activeItem = document.createElement('div');
    addClass(activeItem,"item active");
    activeItem.id ="comboCards"

    let deleteButton = document.createElement('div');
    addClass(deleteButton,"delete-ajust");
    deleteButton.setAttribute('align', 'right'); 

    let button = document.createElement('button'); 
    button.setAttribute('type', 'click');
    addClass(button,"btn btn-circle-delete  btn-xl");
    
    let deleteIcon = document.createElement('i'); 
    addClass(deleteIcon,"trash-icon-ajust glyphicon glyphicon-trash");

    button.appendChild(deleteIcon);
    deleteButton.appendChild(button);


    mainColumn.appendChild(deleteButton);
    specialRow.appendChild(activeItem);
         
    //aqui debajo
    
    mainColumn.appendChild(specialRow)  
              
    mainRow[0].appendChild(mainColumn)  

    deleteButton.addEventListener("click", function(e){
      mainRow[0].removeChild(mainColumn)
    });

    //como es un nuevo elemento, falta agregarle los eventListener 
    mainColumn.addEventListener('dragstart', handleDragStart, false);
    mainColumn.addEventListener('dragenter', handleDragEnter, false)
    mainColumn.addEventListener('dragover', handleDragOver, false);
    mainColumn.addEventListener('dragleave', handleDragLeave, false);
    mainColumn.addEventListener('drop', handleDrop, false);
    mainColumn.addEventListener('dragend', handleDragEnd, false);
    cols = document.querySelectorAll('.column');
  }
};


const deleteButtons = document.getElementsByClassName("btn-circle-delete");


[].forEach.call(deleteButtons, function(del) {  
  del.addEventListener("click", function(e){ 
      
      if(e.target.parentElement.parentElement.class="delete-ajust"){
        e.target.parentElement.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement)          
      }      
  });  
});