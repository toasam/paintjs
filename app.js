    // clientX,Y는 이 윈도우 전체의 범위 내에서 마우스 위치값을 나타냄
    // 하지만 여기서는 캔버스 내에서의 좌표만 있으면 됨
    // => offsetX,Y
    // 캔버스를 스크린 사이즈로 만들었으면 clientX와 offsetX는 차이x
    // but 여기서는 아님 
    
    // canvas위에 마우스를 두면 그걸 감지하는 코드
    const canvas = document.getElementById("jsCanvas");

    let painting = false;

    function stopPainting(){
        painting = false;
    }


    // 5라인 이어서 -> 그럼 이벤트 안에서 offsetX와 offesetY를 사용
    function onMouseMove(event){
        const x = event.offsetX;
        const y = event.offsetY;
        console.log(x,y);
    }

    //event를 줘야 색상을 볼 수 있음.
    function onMouseDown(event){
        painting = true;
    }

    function onMouseUp(event){
        stopPainting()
    }

    function onMouseLeave(event){
        painting = false;
    }

    // canvas 존재와 움직임확인?
    // 캔버스를 클릭하는 순간 인지 / 클릭했을 때 painting을 시작 -> event로 처리
    // mousedown 클릭했을 때 발생하는 event
    // mouseup 마우스를 놓았을 때는 그림 안 그림
    // mouseleave painting 하다가 캔버스를 벗어났을 때  
    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
    // onMouseUp을 stopPainting 안 바꾼 이유 : 나중에 실제로 그리는 line이 필요
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseleave",stopPainting);
    }