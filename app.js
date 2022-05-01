    // clientX,Y는 이 윈도우 전체의 범위 내에서 마우스 위치값을 나타냄
    // 하지만 여기서는 캔버스 내에서의 좌표만 있으면 됨
    // => offsetX,Y
    // 캔버스를 스크린 사이즈로 만들었으면 clientX와 offsetX는 차이x
    // but 여기서는 아님 
    
    // canvas위에 마우스를 두면 그걸 감지하는 코드
    const canvas = document.getElementById("jsCanvas");
    const ctx = canvas.getContext("2d");
    const colors = document.getElementsByClassName("jsColor");
    const range = document.getElementById("jsRange");
    const mode = document.getElementById("jsMode");
    const saveBtn = document.getElementById("jsSave");

    const INITIAL_COLOR = "#2c2c2c";
    const CANVAS_SIZE = 700;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    // strokeStyle -> 색상이나 스타일을 라인에서 사용
    // default에 의해서 하얀 배경이 된다.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5;
    
    //ctx.fillStyle = "green";
    //ctx.fillRect(50, 20, 100, 49);

    let painting = false;
    let filling = false;

    function stopPainting(){
        painting = false;
    }

    function startPainting(){
        painting = true;
    }

    // 5라인 이어서 -> 그럼 이벤트 안에서 offsetX와 offesetY를 사용
    // onMouseMove 여기에서 모든 움직임을 감지, 라인을 만들어야 함
    // path : 기본적인 선(line) ctx=context
    // lineTo()와 stroke()는  마우스를 움직이는 내내 발생함!!
    function onMouseMove(event){
        const x = event.offsetX;
        const y = event.offsetY;
        if(!painting){ // 경로를 만든다.
            ctx.beginPath(); // 경로생성
            ctx.moveTo(x,y); // 선 시작 좌표
            }else{ // 그린다.
                ctx.lineTo(x,y); // 선 끝 좌표
                ctx.stroke(); // 선 그리기
            }
    }

    //event를 줘야 색상을 볼 수 있음.
    //function onMouseDown(event){
    //    painting = true;
    //}

    function onMouseUp(event){
        stopPainting()
    }

    function onMouseLeave(event){
        painting = false;
    }

    // ctx.strokeStyle = color; 
    // strokeStyle을 override하고 여기서부턴 strokeStyle이 target에 있는 색상이 된다.
    function handleColorClick(event){
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }

    function handleRangeChange(event){
        const size = event.target.value;
        ctx.lineWidth = size;
    }

    function handleModeClick(){
        if(filling === true){
            filling = false;
            mode.innerText = "Fill"
        } else{
            filling = true;
            mode.innerText = "Paint"
        }
    }

    function handleCanvasClick(){
        if(filling){
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
    }

    // 우클릭했을 때 아무것도 안뜸. 밑에 save를 통해 저장하게끔 하려고
    function handleCM(event){
        event.preventDefault();
    }

    // download는 anchor("a")태그의 attribute
    function handleSaveClick(){
        const image = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = image;
        link.download = "download success!";
        link.click();
        
    }

    // canvas 존재와 움직임확인?
    // 캔버스를 클릭하는 순간 인지 / 클릭했을 때 painting을 시작 -> event로 처리
    // mousedown 클릭했을 때 발생하는 event
    // mouseup 마우스를 놓았을 때는 그림 안 그림
    // mouseleave painting 하다가 캔버스를 벗어났을 때  
    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
    // onMouseUp을 stopPainting 안 바꾼 이유 : 나중에 실제로 그리는 line이 필요
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave",stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM);
    }

    // array.from()는 object로부터 array를 만듬
    //console.log(Array.from(colors));

    //array 만들고 forEach로 color를 돌려서 addEventListener("click", handleColorClick) 호출
    // 여기 color는 array안에 있는 각각의 아이템들을 대표하는 것임
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

    if(range){
        range.addEventListener("input", handleRangeChange)
    }

    if(mode){
        mode.addEventListener("click", handleModeClick)
    }

    if(saveBtn){
        saveBtn.addEventListener("click", handleSaveClick);
    }


    // Context 요소 안에서 픽셀에 접근하는 방법
    // 여기서 context는 canvas안에서 픽셀을 다루는 것
    // canvas는 context를 갖고 있는 html의 요소
    // 그 요소 안에서 픽셀을 다루는 것