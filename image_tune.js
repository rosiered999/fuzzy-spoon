var stop = false;
var imageDrawn = false;
var button = false;
document.addEventListener("DOMContentLoaded",function(){
    inp = document.getElementById("imgfile");
    //console.log(inp);
    inp.addEventListener("change", imageLoad);

    var canvasFG = document.getElementById("canvas-fg");
    var ctx = canvasFG.getContext("2d");
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0,0,500,500);
    ctx.clearRect(25,25,100,50);
    ctx.stroke();
    ctx.restore();

    },false);

  window.addEventListener("click", handleMouseEvent);
  window.addEventListener("mousemove", handleMouseEvent);

function handleMouseEvent(event)
{
  if(stop==false && imageDrawn==true) //add if image has been drawn
  {
     // setTimeout(editImage(event),500);
     editImage(event);
  }
}

function editImage(event)
{
    var mousePosition;
    var mouseUpPos;
    var mouseDownPos;
    var offset = [0,0];
    var div;
    var x = 0.5;
    var isDown = false;
    var resize;
    var canvas = document.getElementById("canvas-bg");
    var rect = canvas.getBoundingClientRect();
    var rect2 = rect;
    //document.body.addEventListener("mousemove",isInResizers);
    //document.body.addEventListener("mousedown",);
    document.body.addEventListener("mousedown",mouseDown);
    document.addEventListener("mouseup", function() {resize=0;});
    function mouseDown(e){
        if(isInImage(e.clientX,e.clientY))
        {
            var canvas = document.getElementById("canvas-bg");
            resize = isInResizers(e.clientX,e.clientY);
            console.log("resize",resize);
            isDown = true;
            offset = [canvas.offsetLeft - e.clientX,canvas.offsetTop - e.clientY];
            document.addEventListener('mouseup', function(event) {isDown = false;
            mouseUpPos ={
                x: event.clientX,
                y: event.clientY
            };}, true);
            document.addEventListener('mousemove', function(event) {
                event.preventDefault();
                if (isDown && !resize) {
                    mousePosition = {

                        x : event.clientX,
                        y : event.clientY

                    };
                    canvas.style.left = (mousePosition.x + offset[0]) + 'px';
                    canvas.style.top  = (mousePosition.y + offset[1]) + 'px';
                }
                else if(isDown) {
                    var str = "";
                    findScale()
                    var canvas = document.getElementById("canvas-bg");
                    mousePosition = {

                        x : event.clientX,
                        y : event.clientY

                    };
                    if(resize==7 )
                    {
                        str += "scale(" + x +","+x+")";
                        canvas.style.transform = str;
                        x = x*1.05;
                        str = "";
                    }

                    function findScale()
                    {

                    }
                }
            }, true);
        }
    };
}

function isInImage(X,Y)
{
    var canvas = document.getElementById("canvas-bg");
    var rect = canvas.getBoundingClientRect();
    if(X>rect.left && Y>rect.top && Y<rect.bottom && X<rect.right)
    {
        return true;
    }
}

function isInResizers(X,Y)
{
    var canvas = document.getElementById("canvas-bg");
    var rect = canvas.getBoundingClientRect();
    var blurArea =20;
    var resize;
    if(X>rect.left && Y>rect.top && Y<(rect.top+blurArea) && X<(rect.left+blurArea))
    {
        return 1; //top left
    }
    else if(X>rect.left+rect.width/2-blurArea/2 && Y>rect.top && Y<(rect.top+blurArea) && X<(rect.left+rect.width/2+blurArea/2))
    {
        return 2;//top mid
    }
    else if(X>rect.right-blurArea && Y>rect.top && Y<(rect.top+blurArea) && X<(rect.right))
    {
        return 3;//top right
    }
    else if(X>rect.left && Y>rect.top+rect.height/2-blurArea/2 && Y<(rect.top+rect.height/2+blurArea/2) && X<(rect.left+blurArea))
    {
        return 4;//mid left
    }
    else if(X>rect.right-blurArea && Y>rect.top+rect.height/2-blurArea/2 && Y<(rect.top+rect.height/2+blurArea/2) && X<(rect.right))
    {
        return 5;//mid right
    }
    else if(X>rect.left && Y>rect.bottom-blurArea && Y<(rect.bottom) && X<(rect.left+blurArea))
    {
        return 6;//bot left
    }
    else if(X>rect.left+rect.width/2-blurArea/2 && Y>rect.bottom-blurArea && Y<(rect.bottom) && X<(rect.left+rect.width/2+blurArea/2))
    {
        return 7;//bot mid
    }
    else if(X>rect.right-blurArea && Y>rect.bottom-blurArea && Y<(rect.bottom) && X<(rect.right))
    {
        return 8;//bot right
    }
    else
        return 0;

}

function imageLoad(){
        var inp, file, reader, img;
        inp = document.getElementById('imgfile');
        file = inp.files[0];
        reader = new FileReader();
        reader.onload = createImage;
        reader.readAsDataURL(file);

        function createImage() {
            img = new Image();
            img.onload = imageLoaded;
            img.src = reader.result;
        }

        function imageLoaded() {
            var canvas = document.getElementById("canvas-bg")
            canvas.width = img.width;
            canvas.height = img.height;
            var imgX = 0;
            var imgY = 0;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img,imgX,imgY);
            generateOverlay(ctx,imgX,imgY,img.height, img.width);
        }

        function generateOverlay(ctx,startX,startY,height,width)
        {
            var div = document.createElement("div");
            div.setAttribute("style", "border-style:dotted; border-color:blue;");
            document.body.appendChild(div);

            addButton(button);

            function addButton()
            {
                if(button==false)
                {
                    var btn = document.createElement("button");
                    var txt = document.createTextNode("done");
                    btn.appendChild(txt);
                    document.getElementsByTagName("p")[0].appendChild(btn);
                    document.getElementsByTagName("button")[0].addEventListener('click', ()=>{alert("button"); stop=true});
                    button = true;
                }
            }
            imageDrawn = true;
        }
    }
