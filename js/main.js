/** @type {HTMLCanvasElement} */

const CANVAS= document.getElementById('canvas-1');
const CTX= CANVAS.getContext('2d');
const CANVAS_WIDTH= CANVAS.width= 800;
const CANVAS_HEIGHT= CANVAS.height= 700;

let gameSpeed= 5;
// let gameFrame= 0;

const backgroundLayer1= new Image();
backgroundLayer1.src= 'https://kokotto3000.github.io/parallax-landscape/img/layer-1.png';
const backgroundLayer2= new Image();
backgroundLayer2.src= 'https://kokotto3000.github.io/parallax-landscape/img/layer-2.png';
const backgroundLayer3= new Image();
backgroundLayer3.src= 'https://kokotto3000.github.io/parallax-landscape/img/layer-3.png';
const backgroundLayer4= new Image();
backgroundLayer4.src= 'https://kokotto3000.github.io/parallax-landscape/img/layer-4.png';
const backgroundLayer5= new Image();
backgroundLayer5.src= 'https://kokotto3000.github.io/parallax-landscape/img/layer-5.png';

//pour que toutes les images chargent avant de lancer
window.addEventListener('load', ()=> {
    const SLIDER= document.getElementById('slider');
    SLIDER.value= gameSpeed;
    const showGameSpeed= document.getElementById('show-game-speed');
    showGameSpeed.innerHTML= gameSpeed;
    SLIDER.addEventListener('change', e => {
        // console.log(e);
        gameSpeed= e.target.value;
        showGameSpeed.innerHTML= e.target.value;
    });

    // let x= 0;
    // let x2= 2400;

    class Layer{
        constructor(image, speedModifier){
            this.x= 0;
            this.y= 0;
            this.width= 2400;
            this.height= 700;
            // this.x2= this.width;
            this.image= image;
            this.speedModifier= speedModifier;
            this.speed= gameSpeed * this.speedModifier;
        }
        
        update(){
            this.speed= gameSpeed * this.speedModifier;
            if(this.x <= -this.width) this.x= 0;
            // if(this.x2 <= -this.width) this.x2= this.width + this.x - this.speed;
            // this.x= Math.floor(this.x - this.speed);
            this.x= this.x - this.speed;
            // this.x2= Math.floor(this.x2 - this.speed);
            // this.x= gameFrame * this.speed % this.width;
        }
        draw(){
            CTX.drawImage(this.image, this.x, this.y, this.width, this.height);
            CTX.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    const layer1= new Layer(backgroundLayer1, 0.2);
    const layer2= new Layer(backgroundLayer2, 0.4);
    const layer3= new Layer(backgroundLayer3, 0.6);
    const layer4= new Layer(backgroundLayer4, 0.8);
    const layer5= new Layer(backgroundLayer5, 1);

    const gameObjects= [layer1, layer2, layer3, layer4, layer5]; 

    function animate(){
        CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // CTX.drawImage(backgroundLayer4, x, 0);
        // CTX.drawImage(backgroundLayer4, x2, 0);
        // x < -2400 ? x= 2400 + x2 - gameSpeed : x -= gameSpeed;
        // x2 < -2400 ? x2= 2400 + x - gameSpeed : x2 -= gameSpeed;
        gameObjects.forEach(object=> {
            object.update();
            object.draw();
        });
        // gameFrame--;
        requestAnimationFrame(animate);
    }

    animate();

});

