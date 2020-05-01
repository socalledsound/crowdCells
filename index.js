let organisms = [];
let numOrganisms = 300;
let images = [
    'img/1s.jpg',
    'img/color-crowd1.jpg',
    'img/crowd.jpg',
    'img/crowd2.jpg',
    'img/crowd3.jpg',
    'img/crowd4.jpg',
    'img/royals.jpg',
];

function init(){
    
    for(let i = 0; i < numOrganisms; i++){
        organisms[i] = new Organism();
        organisms[i].init();
        organisms[i].display();
    }


    mainLoop();
}

function mainLoop(){
    
    organisms.forEach(organism=>organism.move());
    organisms.forEach(organism=>organism.display());
    window.requestAnimationFrame(mainLoop);
}

function Organism(){
    this.container = document.querySelector('.container');
    this.container.style = getComputedStyle(this.container);
    console.log("margin" + this.container.style.content);
    this.marginTop = 200;
    this.size = Math.random()*200;
    this.xMin = window.innerWidth*.001;
    this.yMin = window.innerWidth*.001+this.marginTop;
    this.safety = window.innerWidth*.1 + this.size/3;
    this.xMax = this.container.offsetWidth - this.safety;
    // console.log("xMax:" + this.xMax);
    this.yMax = this.container.offsetHeight - this.safety;
    // console.log("yMax:" + this.yMax);
    this.x=Math.random() * this.xMax - this.size + this.xMin + this.safety;
    this.y=Math.random() * this.yMax - this.size + this.yMin + this.safety;
    this.height=this.size;
    this.width=this.size;
    this.xSpeed=Math.random()*5;
    this.ySpeed=Math.random()*-3;
    this.rotate = 0;
    this.rotateSpeed=Math.random()-0.5;
    this.img=images[Math.floor(Math.random()*images.length)];
    this.img='img/white.jpg';
    this.theta = 0;
    this.oscillatingOpacity = 0.1;
    this.clicked = false;

    
    this.init=function(){
        console.log(this.xMax);
        this.el=document.createElement('div');
        this.el.className = "organism";
        // this.el.addEventListener("mouseout", (e)=>{
        //     if(this.clicked){
        //         this.el.style.filter="blur(3px) brightness(80%)";   
        //     }
            
        // });

        this.el.addEventListener("mouseenter", (e)=>{
            this.el.style.filter="blur(0px) brightness(100%)";   
       });

        this.el.addEventListener("click", (e)=>{
            if(!this.clicked){
                this.clicked = true;
                this.img=images[Math.floor(Math.random()*images.length)];
                setTimeout(this.blur, 2000);
            } else {
                this.img='img/white.jpg';
                this.clicked = false
            }

            // this.el.style.backgroundColor = "purple";
            
        });
        this.container = document.querySelector('.container');
        this.sibling = document.querySelector('.child');
        // console.log(this.container);
        this.container.insertBefore(this.el, this.sibling)

    }


    this.move= function(){
        this.theta += 0.01;
        this.oscillatingOpacity = Math.sin(this.theta) - 0.2;


        if(this.x > this.xMax + this.xMin - this.size + this.safety || this.x < 0 + this.xMin){
            this.clicked = true;
            this.img=images[Math.floor(Math.random()*images.length)];
            this.el.style.filter="blur(0px) brightness(100%)"; 
            this.xSpeed*=-1;
            if(this.clicked){
                setTimeout(this.blur, 2000);
            }
        }
        if(this.y > this.yMax + this.yMin - this.size + this.safety || this.y < 0 + this.yMin){
            this.clicked = true;
            this.img=images[Math.floor(Math.random()*images.length)];
            this.el.style.filter="blur(0px) brightness(100%)"; 
            this.ySpeed*=-1;
            if(this.clicked){
                setTimeout(this.blur, 2000);
            }
            
        }
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
        this.rotate+=this.rotateSpeed;
    }

    this.display = function(){
        this.el.style.position='absolute';
        this.el.style.height=`${this.height}px`;
        this.el.style.width=`${this.width}px`;
        this.el.style.left=`${this.x}px`;
        this.el.style.top=`${this.y}px`;
        this.el.style.transform=`rotate(${this.rotate}deg)`;
        this.el.style.borderRadius="180px";
        this.el.style.backgroundImage=`url(${this.img})`
        this.el.style.opacity = "0.1";
    }

    this.blur = function(){
        let blurVal = .1 + this.oscillatingOpacity;
        console.log(blurVal);
        this.el.style.filter=`blur(${blurVal}px) brightness(80%)`;
    }.bind(this)



}