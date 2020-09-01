var dragSrcEl = null;

//FUNCTIONS TO DRAG AND DROP

function handleDragStart(e) {
  // Target (this) element is the source node.
  e.target.style.opacity = '0.4';

  dragSrcEl = e.target;  
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element, the destiny.
  //dragSrcEl is the source

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  } 
  e.preventDefault();

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {      
    // Set the source column's HTML to the HTML of the column we dropped on.
    //dragSrcEl.innerHTML = this.innerHTML;
    //hazle un appenchild a los elementos que estan a la derecha 
    //en este caso seria hacer un dragSrcEL.appenchild(e.target)
    let copyElement = dragSrcEl;     

    var innerImg = document.createElement('img');
    innerImg.src = dragSrcEl.src; 
    innerImg.id = dragSrcEl.id; 
    addClass(innerImg,"#card card");
    innerImg.setAttribute('draggable', true);         
    let active = e.target.querySelectorAll('.item');       
    active[0] .appendChild(innerImg)   
    
    dragSrcEl.innerHTML = dragSrcEl.innerHTML;   

  }

  var files = e.dataTransfer.files;  
  // Don't do anything if dropping the same column we're dragging.
  
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
    col.style.opacity = '1';    
    dragSrcEl.style.opacity = '1';         
  });

  [].forEach.call(cards, function (col) {
    col.classList.remove('over');
    col.style.opacity = '1';     
    dragSrcEl.style.opacity = '1';        
  });
}

function handleDragEndOncolumn(e) {
  // this/e.target is the source node.    
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
    col.style.opacity = '1';  
    dragSrcEl.style.opacity = '1';           
  });
}

var cols = document.querySelectorAll('.column');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});

var cards = document.querySelectorAll('.card');
[].forEach.call(cards, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});

var cards = document.querySelectorAll('.big-column');
[].forEach.call(cards, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});
