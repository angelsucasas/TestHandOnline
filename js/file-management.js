document.getElementById('input').addEventListener('change', readSingleFile, false);


function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;    
    readFile(contents);
  };
  reader.readAsText(file);
}

function readFile(cont){
  //reemplaza todas las existencias de \r\n en el archivo por espacios  
  //una vez hecha la division de el contenido por espacios, la funcion explode
  //divide el string por cada vez que encuentre un espacio y devuelve un array  
  //por cuestiones de rendimiento    
  let deckStrings =  cont.split('\r\n');     
  if(deckStrings.length==1){
    deckStrings =  cont.split('\n'); 
  }  

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
            else if(flag==2){                                      
                sideDeck.push(deckStrings[cont])
            }
        }
        
    }  
  extraDeck = extraDeck.slice(1);  
  sideDeck = sideDeck.slice(1);  
}     