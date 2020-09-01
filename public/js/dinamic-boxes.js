
const addComboButton = document.getElementById("addCombo")

/** adds a new "combo box" in the active item in the carousel
 it is insert before the add button
*/
addComboButton.addEventListener("click",addCombo);

function addCombo(){

  let mainRow = document.getElementsByClassName("item active");  
  let originalActive = mainRow;
  let nextChildFlag = 0;
  let childCount = 0;

  [].forEach.call(document.getElementById("comboCarrousel").childNodes, function(del) {
    if(del.nodeName=='DIV'){      
      if(del.className=='item active' || del.className=='item'){            
        let countChilds = 0;        
        [].forEach.call(del.childNodes, function(del2) {
          if(del2.nodeName=='DIV'){            
            countChilds +=1;
          }
        });
        //checkea que el numero de hijos es menor a 4
        //si es igual a 4, crealo en el siguiente item, y activalo
        //tambien apaga este item
        if(nextChildFlag){   
          mainRow = del;
          nextChildFlag = 0;
          childCount += 1;
        }

        if(countChilds==4){
          nextChildFlag = 1;
        }
      }  
    }    
  });

  if(childCount==3){
    alert("no se pueden registrar mas combos...")
  }
  else{
    let mainColumn = document.createElement('div');
    addClass(mainColumn,"#columns column");

    let specialRow = document.createElement('div');
    addClass(specialRow,"special-col");
    
    //let newComboBox = document.createElement('span');
    let activeItem = document.createElement('div');
    addClass(activeItem,"item active");

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

    deleteButton.addEventListener("click", function(e){ 
      e.target.parentElement.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement)
    }); 

    mainColumn.appendChild(deleteButton);
    specialRow.appendChild(activeItem);
         
    //aqui debajo
    
    mainColumn.appendChild(specialRow)  
    
    if(mainRow instanceof HTMLCollection){          
      mainRow[0].appendChild(mainColumn)  
    }else{      
      //cambia el item a activo, y pon el item activo en normal
      addClass(mainRow,"active");      
      removeClass(originalActive[0],"active");
      mainRow.appendChild(mainColumn)  
    }
    

    //como es un nuevo elemento, falta agregarle los eventListener 
    mainColumn.addEventListener('dragstart', handleDragStart, false);
    mainColumn.addEventListener('dragenter', handleDragEnter, false)
    mainColumn.addEventListener('dragover', handleDragOver, false);
    mainColumn.addEventListener('dragleave', handleDragLeave, false);
    mainColumn.addEventListener('drop', handleDrop, false);
    mainColumn.addEventListener('dragend', handleDragEnd, false);
  }
};





const deleteButtons = document.getElementsByClassName("btn-circle-delete");

[].forEach.call(deleteButtons, function(del) {
  del.addEventListener("click", function(e){ 
    e.target.parentElement.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement.parentElement)
  });  
});