const container = document.querySelector(".canvas-container");
const gridSize = document.querySelector("#grid-size");
const gridLabel = document.querySelector("#grid-label");
const grid = document.getElementsByClassName("grid");
const colorInput = document.querySelector("#color-input");
const rainbowInput = document.querySelector("#rainbow-button");
const eraserButton = document.querySelector("#eraser-button");
const clearButton = document.querySelector("#clear-button");
let gridColor = colorInput.value;
let totalGrid;
let gridWidth;
let gridHeight;
let hue = 0;

initializeBoard();

gridSize.addEventListener("input", updateCanvas);
colorInput.addEventListener("input", setColorToInput);
rainbowInput.addEventListener("click", setColorToRainbow);
eraserButton.addEventListener("click", setToEraser)
clearButton.addEventListener("click", clear);

function removeSelectedClass(){
  colorInput.classList.remove("selected");
  rainbowInput.classList.remove("selected");
  eraserButton.classList.remove("selected");
}

function setSelectedClass(event){
  removeSelectedClass();
  event.target.classList.add("selected");
}

function setColorToInput(event){
  setSelectedClass(event);
  gridColor = event.target.value
}

function setColorToRainbow(event){
  setSelectedClass(event);
  gridColor = `hsl(${hue}, 100%, 50%)`;
  hue++;
}

function setToEraser(event){
  setSelectedClass(event);
  gridColor = "black";
}

function clear(event){
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }
  setGrid();
}

function updateGrid(event){
  if(rainbowInput.classList.contains("selected")){
    gridColor = `hsl(${hue}, 100%, 50%)`;
    hue++;
  } 
  event.target.style.backgroundColor = gridColor;
}

function updateCanvas(event) {
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }
  gridLabel.textContent = `${event.target.value} X ${event.target.value}`;
  gridWidth = container.clientWidth/event.target.value;
  gridHeight = container.clientHeight/event.target.value;
  totalGrid = event.target.value * event.target.value;
  setGrid();
}

function initializeBoard(){
  gridLabel.textContent = `${gridSize.value} X ${gridSize.value}`;
  gridWidth = container.clientWidth/gridSize.value;
  gridHeight = container.clientHeight/gridSize.value;
  totalGrid = gridSize.value * gridSize.value;
  setGrid();
}

function setGrid(){
  setGridCount();
  setGridListener();
}

function setGridCount(){
  for(i = 0; i < totalGrid; i++){
    const grid = document.createElement('div');
    grid.style.height = gridHeight + "px";
    grid.style.width = gridWidth  + "px";
    grid.classList.add("grid");
    container.appendChild(grid);
  }
}

function setGridListener (){
  for(let i = 0; i < grid.length; i++){
    grid[i].addEventListener("mouseover", updateGrid);
  }
}