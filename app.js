const canvas = document.getElementById("jsCanvas");
const mouseCursor = document.querySelector(".cursor");
mouseCursor.classList.remove("cursor");

const ctx = canvas.getContext("2d");

/* const colors = document.getElementsByClassName("jsColor"); */
const colors = document.querySelectorAll('.jsColor')

const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const cursorRange = document.querySelector(".cursor_range")

//default 값 설정
const INITTAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 500;
const BTN_CLICKED_CN = 'controls__color__clicked';
const CURSOR_RANGE_CTRL = 0.1;

canvas.width = CANVAS_SIZE;   //실제 픽셀의 크기 지정
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white" // 기본 캔버스 배경을 흰색으로 설정 
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITTAL_COLOR;
ctx.fillStyle = INITTAL_COLOR; 
ctx.lineWidth = 2.5; // 선 굵기
//-----default 값 설정

let painting = false;
let filling = false;
let clear = false;

//set all button unclicked
colors.forEach( color => {color.classList.remove(BTN_CLICKED_CN);}) 
//set black button clicked
colors[0].classList.add(BTN_CLICKED_CN);


function stopPainting() {
    painting = false;
  }
function startPainting(){
    painting = true;
}


//모든 움직임 감지하고 라인 생성해야하므로 중요 
// 마우스를 움직일때 말고 클릭한 후 부터 path가 그려져야함

function onMouseMove(event){
    //console.log(event);
    const x = event.offsetX;//canvas 좌표  안에  마우스  좌표값 가져오기 
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y)
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}


function handleColor(event){
    const color = event.target.style.backgroundColor;

    ctx.strokeStyle = color; // strokeStyle이 target의 색상으로 변경됨
    ctx.fillStyle = color; //색상 체우기를 color 값과 동일하게 

    colors.forEach(color=>{
        color.classList.remove(BTN_CLICKED_CN);
      })    
      event.target.classList.add(BTN_CLICKED_CN);
}

function handleRangeChange(event){
    //range의 value 값을 알아냄
    const size = event.target.value;
    ctx.lineWidth = size;
    cursorRange.style.width = size * CURSOR_RANGE_CTRL + "rem";
    cursorRange.style.height = size * CURSOR_RANGE_CTRL + "rem";
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "fill"
        ctx.canvas.style.cursor = "default";
    } else{
        filling = true;
        mode.innerText = "paint";
        ctx.canvas.style.cursor = "pointer";

        /* ctx.fillStyle = ctx.strokeStyle;
            해당 코드 대신 함수 handleColor 에
            ctx.fillStyle = color 을 추가로 작성해줌 
            target의 색상과 strokeStyle,fillStyle 을 동일하게 지정해줌
        */
    }
}

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } else{

    }
}

function handleCM(event){ //우클릭 방지 함수 
    event.preventDefault() 
}

function handleSaveClick(){ // 저장버튼 
    const image = canvas.toDataURL(); // 아무것도 안 적으면 기본값인 png로 저장
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}
function handleClearClick(){ //리셋버튼
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCursor(event){
    if( filling === false){
        mouseCursor.classList.add("cursor")
    } else{
        mouseCursor.classList.remove("cursor")

    }
    mouseCursor.style.top = event.pageY + "px";
    mouseCursor.style.left = event.pageX + "px";
    
}
function hideCursor(){
    mouseCursor.classList.remove("cursor");

}
function handleMyColorChange(event){
    const color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    myColor.style.backgroundColor = color
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    //마우스가 캔버스에서 나가게 되면 painting이 false가 되도록 설정 
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("mousemove", handleCursor);
    canvas.addEventListener("mouseleave", hideCursor);
}
//Array.from() : objec로 부터 array 생성 
console.log(Array.from(colors));
Array.from(colors).forEach(colors => colors.addEventListener("click",handleColor));


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
if(clearBtn){
    clearBtn.addEventListener("click", handleClearClick);
}
