let equivalentButton = document.getElementById('addANewEquivalentBox')
let equivalentTable = document.getElementById('equivalentTable')
let equivalentTableTr = document.getElementById('addANewEquivalentBoxTr')

equivalentButton.addEventListener('click',function(){
	addNewEquivalentBox();
})

function addNewEquivalentBox(){
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	let row = document.createElement('div');
	addClass(row,'row animate__animated animate__fadeInLeft');
	let md3 = document.createElement('div');
	addClass(md3,'col-lg-4 col-md-4 col-sm-4 col-xs-5 nopaddings');
	let lilParal = document.createElement('div');
	addClass(lilParal,'litle-parallelogram');
	let column = document.createElement('div');
	addClass(column,'#columns column equivalentColumn normalDegree');
	let longColumn = document.createElement('div');
	addClass(longColumn,'#columns column equivalentColumn normalDegree');
	let active = document.createElement('div');
	addClass(active,'item active');
	let longActive = document.createElement('div');
	addClass(longActive,'item active');
	let md9 = document.createElement('div');
	addClass(md9,'col-lg-8 col-md-8 col-sm-8 col-xs-7 nopaddings');
	let paral = document.createElement('div');
	addClass(paral,'parallelogram');

	let containerFluid = document.createElement('div');
	addClass(containerFluid,'container-fluid');
	let containerFluid2 = document.createElement('div');
	addClass(containerFluid2,'container-fluid');
	let row2 =document.createElement('div');	
	addClass(row2,'row');

	let secondRow = document.createElement('div')
	addClass(secondRow,'row');
	let md8 = document.createElement('div')
	addClass(md8,'col-lg-8 col-md-8 col-sm-8 col-xs-11 nopaddings')

	let md4 = document.createElement('div')
	addClass(md4,'col-lg-4 col-md-4 col-sm-4 col-xs-1 nopaddings')

	let hr1 = document.createElement('hr')
	addClass(hr1,'equivalentMark')

	let hr2 = document.createElement('hr')
	addClass(hr2,'equivalentMark')

	active.id = "comboEquivalentFather"
	column.appendChild(active);
	lilParal.appendChild(column);

	md8.appendChild(lilParal);
	secondRow.appendChild(md8);

	md4.appendChild(hr1)
	md4.appendChild(hr2)
	secondRow.appendChild(md4);
	
	containerFluid.appendChild(secondRow);
	//-----
	md3.appendChild(containerFluid);
	row.appendChild(md3);

	column.addEventListener('dragstart', handleDragStart, false);
    column.addEventListener('dragenter', handleDragEnter, false)
    column.addEventListener('dragover', handleDragOver, false);
    column.addEventListener('dragleave', handleDragLeave, false);
    column.addEventListener('drop', handleDrop, false);
    column.addEventListener('dragend', handleDragEnd, false);

    longActive.id = "comboEquivalentChild"
    longColumn.appendChild(longActive);
	paral.appendChild(longColumn);
	row2.appendChild(paral);
	containerFluid2.appendChild(row2);	
	md9.appendChild(containerFluid2);
	row.appendChild(md9);

	td.appendChild(row);
	tr.appendChild(td);
	equivalentTable.insertBefore(tr,equivalentTableTr)

	longColumn.addEventListener('dragstart', handleDragStart, false);
    longColumn.addEventListener('dragenter', handleDragEnter, false)
    longColumn.addEventListener('dragover', handleDragOver, false);
    longColumn.addEventListener('dragleave', handleDragLeave, false);
    longColumn.addEventListener('drop', handleDrop, false);
    longColumn.addEventListener('dragend', handleDragEnd, false);
    
    cols = document.querySelectorAll('.column');    
}