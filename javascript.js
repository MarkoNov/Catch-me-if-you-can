let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

var gustoca=64;
var win=false;

//Scrollanje
window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0) {
        if(gustoca>0)
      gustoca--;
    }
    if (e.deltaY > 0) {
      gustoca++;
    }
    DrawGrid();
  });


//Crta x, y, itd.
function DrawGrid(){

c.width = window.innerWidth;
c.height = window.innerHeight;

let w=c.width, h=c.height, xmax=c.width/2, xmin=-c.width/2, ymax=c.height/2, ymin=-c.height/2;

ctx.setTransform(1, 0, 0, -1, w/2, h/2);
//ctx.translate(w / 2, -h / 2);

//pomak
let p=(w+h)/gustoca;

let brojevix=0, brojeviy=0; //od kolko do kolko ide + i -

//gridX
for(let i=0; i<w; i+=p)
{
    //od 0 do xmin
    ctx.beginPath();              
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    ctx.moveTo(-i, ymax);
    ctx.lineTo(-i, ymin);
    ctx.stroke();

    //od 0 do xmax
    ctx.beginPath();              
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    ctx.moveTo(i, ymax);
    ctx.lineTo(i, ymin);
    ctx.stroke();
}

//gridY
for(let i=0; i<h; i+=p)
{
    //od 0 do ymax
    ctx.beginPath();              
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    ctx.moveTo(xmin, i);
    ctx.lineTo(xmax, i);
    ctx.stroke();

    //od 0 do ymin
    ctx.beginPath();              
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    ctx.moveTo(xmin, -i);
    ctx.lineTo(xmax, -i);
    ctx.stroke();
}


//apscisa
ctx.beginPath();              
ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(xmin, 0);
ctx.lineTo(xmax, 0);
ctx.stroke();

//strelicaX
ctx.beginPath();              
ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(xmax, 0);
ctx.lineTo(xmax/1.01, ymax/50);
ctx.stroke();

ctx.beginPath();              
ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(xmax, 0);
ctx.lineTo(xmax/1.01, ymin/50);
ctx.stroke();

//ordinata
ctx.beginPath();
ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(0, ymin);
ctx.lineTo(0, ymax);            
ctx.stroke();

//strelicaY
ctx.beginPath();              
ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(0, ymax);
ctx.lineTo(xmin/100, ymax/1.04);
ctx.stroke();

ctx.beginPath();              
ctx.lineWidth = "2";
ctx.strokeStyle = "black";
ctx.moveTo(0, ymax);
ctx.lineTo(xmax/100, ymax/1.04);
ctx.stroke();


//oznakeX
for(let i=0; i<w; i+=p, brojevix++)
{
    //od 0 do xmin
    ctx.beginPath();              
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.moveTo(-i, ymax/50);
    ctx.lineTo(-i, ymin/50);
    ctx.stroke();

    //od 0 do xmax
    ctx.beginPath();              
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.moveTo(i, ymax/50);
    ctx.lineTo(i, ymin/50);
    ctx.stroke();
}

//oznakeY
for(let i=0; i<h; i+=p, brojeviy++)
{
    //od 0 do ymax
    ctx.beginPath();              
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.moveTo(xmin/75, i);
    ctx.lineTo(xmax/75, i);
    ctx.stroke();

    //od 0 do ymin
    ctx.beginPath();              
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.moveTo(xmin/75, -i);
    ctx.lineTo(xmax/75, -i);
    ctx.stroke();
}



//postavljanje brojeva
ctx.setTransform(1, 0, 0, 1, w/2, h/2);  

ctx.textAlign = "center";  

ctx.fillText('0', -10, 15);

for(let i=1; i<brojevix; i++)
{      
    ctx.fillText(-i.toString(), -i*p, ymax/20);
    ctx.fillText(i.toString(), i*p, ymax/20);
}

for(let i=1; i<brojeviy; i++)
{      
    ctx.fillText(i.toString(), xmin/40, -i*p);
    ctx.fillText(-i.toString(), xmin/40, i*p);
}

win=false;

ctx.setTransform(1, 0, 0, -1, w/2 , h/2);

MakeOpponent(brojevix, brojeviy, p, w, h, xmax, xmin, ymax, ymin);
//MakeBall(brojevix, brojeviy, p, w, h);
}


  ////////////////////////////////////////////////////////////////////////
 ///////////////////// TU TEK POCINJE PRAVA STVAR ///////////////////////
////////////////////////////////////////////////////////////////////////

let numOfOpponents = 1;
    let opponent = [numOfOpponents];


function MakeOpponent(brojevix, brojeviy, p, w, h)
{
    for(let i=0; i<numOfOpponents; i++)
    {
        //randomly places opponent on x positive
        //opponent[i]=[-(Math.floor((Math.random() * ((brojevix/2)-4)))+4), Math.floor((Math.random() * (brojeviy/2))-2)*(Math.random() < 0.5 ? -1 : 1)];

        opponent[i]=[Math.floor((Math.random() * (brojevix/2)))*(Math.random() < 0.5 ? -1 : 1), Math.floor(Math.random() * (brojeviy/2))*(Math.random() < 0.5 ? -1 : 1)];
        /*var img = new Image();
	  img.src = "https://www.dominatorhoop.com/wp-content/uploads/2018/09/60-inch-transparent-square-768x797.png";
        img.onload = function () {*/
            ctx.setTransform(-1, 0, 0, 1, w/2 , h/2);
          //  ctx.drawImage(img, opponent[i][0]*p, opponent[i][1]*p, 5*p, 5*p);

//Drawing ze le circle          
            
        // Radii of the white glow.
        innerRadius = 3;
        outerRadius = 7;
        // Radius of the entire circle.
        radius = 10;
    
    var gradient = ctx.createRadialGradient(opponent[i][0]*p/*+2.85*p*/, opponent[i][1]*p/*+1.35*p*/, innerRadius, opponent[i][0]*p/*+2.85*p*/, opponent[i][1]*p/*+1.35*p*/, outerRadius);
    gradient.addColorStop(0, "purple");
    gradient.addColorStop(1, "black");
    
        ctx.beginPath();
        ctx.arc(opponent[i][0]*p/*+2.85*p*/, opponent[i][1]*p/*+1.35*p*/, radius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();


            //- JER SU BRNUTI, zbog slike; probaj maknuti, bus skuzil :P
            opponent[i][0]=-opponent[i][0];
            opponent[i][1]=-opponent[i][1];

         //}
/*
        ctx.beginPath();
        ctx.arc(opponent[i][0]*p/2, opponent[i][1]*p/2, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();*/
    }

/*
var img1 = new Image();
	  img1.src = "https://www.dominatorhoop.com/wp-content/uploads/2018/09/60-inch-transparent-square-768x797.png";

      img1.onload = function () {
        ctx.setTransform(-1, 0, 0, 1, w/2 , h/2);
        ctx.drawImage(img1, -9*p, 8*p, 5*p, 5*p);
     }
  }


  function MakeBall(brojevix, brojeviy, p, w, h)
{
    ctx.setTransform(-1, 0, 0, 1, w/2 , h/2);
    var img = new Image();
    
	  img.src = "https://cdn.shopify.com/s/files/1/0008/1274/4765/products/2e67479ae6ce1e0b5d3ad9ca81bab7d4.png";
      
      img.onload = function () {
        ctx.drawImage(img, -7*p+0.55*p, 7*p, 0.7*p, 0.7*p);
     }*/
  
}

//ne dela se tak, ali dela, to je visa siptarija
function TestInput()
{setTimeout(function(){ 
    if((parseFloat(document.forms["myForm"]["a"].value) || document.forms["myForm"]["a"].value == '0') 
    && (parseFloat(document.forms["myForm"]["b"].value) || document.forms["myForm"]["b"].value == '0') 
    && (parseFloat(document.forms["myForm"]["c"].value) || document.forms["myForm"]["c"].value == '0'))
    {
    let a = Number(document.forms["myForm"]["a"].value);
    let b = Number(document.forms["myForm"]["b"].value);
    let c = Number(document.forms["myForm"]["c"].value);
    
    DrawGraph(jednadzba, a, b, c); 
   
    Test(a, b, c);
    }  
    
}, 1000); //smiri zivce bre
}

//Testira dal je pogodil
function Test(a, b, c)
{
    if(!win && opponent[0][1]==a*((opponent[0][0]+b)*(opponent[0][0]+b))+c)
    {
        window.alert("YOU WIN!\nTry scrolling!");
        win=!win;
    }
}

function DrawGraph(jednadzba, a, b ,c)
{   
    let p=(window.innerWidth+window.innerHeight)/gustoca;
    ctx.setTransform(1, 0, 0, -1, window.innerWidth/2 , window.innerHeight/2);
    a/=p;
    b*=p;
    c*=p;
    
    for(let x= -2000; x<2000;)
    {
        y=(a*(x+b)*(x+b))+c;
        y=parseInt(y);
        ctx.beginPath();              
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.moveTo(x, y);

        x++;
        y=(a*(x+b)*(x+b))+c;
        y=parseInt(y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();   
        
    }

}
