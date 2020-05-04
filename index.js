let organisms = [];
let totalOrganisms = 300;
let organismCount = 0;
let organismMultiplier  = 5;
let totalNumImages = 77;
let totalNumSounds = 21;
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';


document.addEventListener('touchstart', this.touchstart);
document.addEventListener('touchmove', this.touchmove);
function touchstart(e) {
    e.preventDefault()
}

function touchmove(e) {
    e.preventDefault()
}

async function preload(){
    document.querySelector('.btn-start').remove();
    mainSound = new Howl({ src: `sounds/mainloop.mp3`, html5: false, volume:0.4, loop: true});
    
    mainSound.once('load', function(){
        mainSound.play();
        setTimeout(init, 3000);
      });
    

    
}



function init(){

    let numOrganisms = Math.floor(Math.random()*10) + 3;
    console.log(numOrganisms);
    let stopLoop = organismCount + numOrganisms;
    for(let i = organismCount; i < stopLoop; i++){
        
        organisms[i] = new Organism(i);
        organisms[i].init();
        organisms[i].display();
        organismCount+=1;
    }


    mainLoop();
}

function addOrganisms(){
    let numOrganisms = Math.floor(Math.random() * organismMultiplier) + 3;
    let stopLoop = organismCount + numOrganisms;
    for(let i = organismCount; i < stopLoop; i++){
        organisms[i] = new Organism(i);
        organisms[i].init();
        organisms[i].display();
        organismCount++
    }
    organismMultiplier+=2;
}



function mainLoop(){
    console.log(organisms.length);
    if(Math.random() > 0.99 && organismCount < totalOrganisms){
        addOrganisms();
    }

    organisms.forEach(organism=>organism.move());
    organisms.forEach(organism=>organism.display());
    window.requestAnimationFrame(mainLoop);
}

function Organism(index){
    this.index = index;

    this.soundNum = this.index%totalNumSounds;
    this.sound = new Howl({ src: `sounds/${this.soundNum}.mp3`, html5: false, volume:0, loop: true});
    this.container = document.querySelector('.container');
    this.container.style = getComputedStyle(this.container);
    console.log("margin" + this.container.style.content);
    this.marginTop = 200;
    this.initSize = 0;
    this.targetSize = Math.random()*200;
    this.sizeDifferential = this.targetSize - this.size;
    this.size = this.initSize;
    this.xMin = window.innerWidth*.001;
    this.yMin = window.innerWidth*.001 + 100;
    this.safety = window.innerWidth*.1;
    this.xMax = this.container.offsetWidth - this.safety - this.targetSize/2;
    // console.log("xMax:" + this.xMax);
    this.yMax = window.innerHeight - this.safety - 200;
     console.log("yMax:" + this.yMax);
    this.x=Math.random() * this.xMax - this.size + this.xMin - this.safety;
    // this.y=Math.random() * this.yMax - this.size + this.yMin - this.safety;
    this.y = Math.random() * this.yMax + this.yMin;
    this.height=this.size;
    this.width=this.size;
    this.xSpeed=Math.random()*3;
    this.ySpeed=Math.random()*-1;
    this.rotate = 0;
    this.rotateSpeed=Math.random()*5;
    // this.img=imageList[Math.floor(Math.random()*imageList.length)];
    this.img='white.jpg';
    this.theta = 0;
    this.oscillatingOpacity = 0.1;
    this.clicked = false;
    this.mouseOver = false;
    this.makingBigger=true;
    this.playing = false;
    this.sound.volume(0);
    this.impulse=this.targetSize/6;
    
    this.init=function(){
        this.sound.fade(0.0, 0.05, 2000);
        this.el=document.createElement('div');
        this.el.className = "organism";
        this.el.addEventListener("mouseout", (e)=>{
            this.mouseOver = false;
            this.el.style.opacity = ".1";
            this.el.style.filter="blur(3px) brightness(80%)";   
            this.sound.fade(0.3, 0.05, 1000);
            if(this.clicked){
                this.sound.volume(0.3);
            }
            
        });

        this.el.addEventListener("mouseenter", (e)=>{
            this.mouseOver = true;
            this.el.style.opacity = ".6";
            this.el.style.filter="blur(0px) brightness(100%)"; 
            this.sound.volume(0.5);
            if(this.clicked){
                this.sound.volume(0.4);
            }  
       });

        this.el.addEventListener("click", (e)=>{
            this.coverScreen();
            
            
            // if(!this.playing){
            //     this.clicked = true;
            //     // this.img=images[Math.floor(Math.random()*images.length)];
            //     setTimeout(this.blur, 2000);
            //     this.id1 = this.sound.stop();
            // } else {
                
            //     this.clicked = false;
            //     this.id1 = this.sound.play();
            // }

            // this.el.style.backgroundColor = "purple";
            
        });
        this.container = document.querySelector('.container');
        this.sibling = document.querySelector('.child');
        // console.log(this.container);
        this.container.insertBefore(this.el, this.sibling)

    }


    this.move= function(){

        if(this.x > this.xMax + this.impulse + this.safety ){
            // this.img=imageList[Math.floor(Math.random()*imageList.length)];
            // this.img = "1.jpg";
            this.x-=1;
            this.xSpeed*=-1;
            
            setTimeout(this.blur, 2000);
            this.img = `${this.index%totalNumImages}.jpg`
            // this.img=`${Math.floor(Math.random()*this.totalNumImages)}.jpg`;
            // this.img=`${Math.floor(Math.random()*this.totalNumImages)}.jpg`;
            // this.el.style.filter="blur(0px) brightness(100%)"; 
            setTimeout(this.makeBigger, 100);

            if(!this.playing){
                this.playing = true;
                this.sound.play();
            }
        }
        if(this.x < 0 + this.xMin){
            this.makeSmaller();
           
            this.xSpeed*=-1;
            this.x+=5;
            
            setTimeout(this.blur, 2000);
            if(this.playing){
                this.playing = false;
                this.sound.stop();
            
            }
        }
        if(this.x < 0 + this.xMin){
            
            // this.xSpeed*=-1;
            
            // setTimeout(this.blur, 2000);
            // if(this.clicked){
                
            // }
        }
        if(this.y + this.height/2 > this.yMax || this.y < 100){
            this.ySpeed*=-1;
        }
        
        if(!this.mouseOver){
            this.x+=this.xSpeed;
            this.y+=this.ySpeed;
            this.rotate+=this.rotateSpeed
        }
;
    }

    this.display = function(){
        this.theta += .01;
        this.oscillatingOpacity = Math.sin(this.theta)*0.25;
        this.el.style.position='absolute';
        this.el.style.height=`${this.height}px`;
        this.el.style.width=`${this.width}px`;
        this.el.style.left=`${this.x}px`;
        this.el.style.top=`${this.y}px`;
        this.el.style.transform=`rotate(${this.rotate}deg)`;
        this.el.style.borderRadius="180px";
        this.el.style.backgroundImage=`url('img/${this.img}')`
        if(!this.mouseOver){
            this.el.style.opacity = ".1";
        }
        
        //this.el.style.opacity = `${this.oscillatingOpacity}`;
    }

    this.blur = function(){
        
        let blurVal = Math.random()*10 + 2;
        // this.el.style.opacity = `${this.oscillatingOpacity}`;
        this.el.style.filter=`blur(${blurVal}px) brightness(80%)`;

    }.bind(this)

    this.makeBigger = function(){
         
        if(this.height < this.targetSize){
            this.height+=5;
            this.width+=5;
            this.x-=this.impulse;
            if(this.impulse>0){
                this.impulse-=1
            } 
            
            this.makeBigger();
        };
        
        this.impulse=this.targetSize/6;

    }.bind(this);

    this.makeSmaller = function(){
        this.height = this.initSize;
        this.width = this.initSize;
    }.bind(this);


    this.coverScreen  = function(){
        if(this.height < this.yMax){
            this.el.style.zIndex="-1";
            this.height+=10;
            this.width+=10;
            this.y-=this.height/100;
            this.x-=this.width/100;
             setTimeout(this.coverScreen, 100);
        } else {
            // startPartTwo();
        }
    }.bind(this)


    // this.addSize = function(){
    //     this.height+=this.sizeDifferential/10;
    //     this.width+=this.sizeDifferential/10;
    // }.bind(this);

}


function startPartTwo(){
    organisms = [];
    document.body.backgroundImage = "url('img/white.jpg')";
}