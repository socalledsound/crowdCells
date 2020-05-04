class Cellc {
    constructor(index){
        this.index = index;
        this.soundNum = this.index%totalNumSounds;
        this.sound = new Howl({ src: `sounds/page1/${this.soundNum}.mp3`, html5: false, volume:0, loop: true});
        this.sound.volume(0);
        this.container = document.querySelector('.container');
        this.container.style = getComputedStyle(this.container);
        this.marginTop = 200;
        this.initSize = 0;
        this.size = this.initSize;
        this.targetSize = Math.random()*(window.innerWidth/4);
        this.sizeDifferential = this.targetSize - this.size;
        this.xMin = window.innerWidth*.001;
        this.yMin = window.innerWidth*.001 + 100;
        this.safety = window.innerWidth*.1;
        this.xMax = this.container.offsetWidth - this.safety - this.targetSize/2;
        this.yMax = window.innerHeight - this.safety - 200;
        this.x = Math.random() * this.xMax - this.size + this.xMin - this.safety;
        this.y = Math.random() * this.yMax - this.yMin;
        this.height = this.size;
        this.width = this.size;
        this.xSpeed = Math.random()*3;
        this.ySpeed = Math.random()*-1;
        this.impulse = this.targetSize/10;
        this.rotate = 0;
        this.rotateSpeed=Math.random()*5;
        this.theta = 0;
        this.oscillatingOpacity = 0.1;
        this.img = 'white.jpg';
        this.blurVal = Math.random()*10 + 2;
        this.clicked = false;
        this.mouseOver = false;
        this.makingBigger = true;
        this.playing = false;
        this.completed = false;
        this.blur = this.blur.bind(this);
        this.unBlur = this.unBlur.bind(this);
        this.coverScreen = this.coverScreen.bind(this);
        this.makeBigger = this.makeBigger.bind(this);
        this.makeSmaller = this.makeSmaller.bind(this);
        this.showArrow = this.showArrow.bind(this);
    }

    init(){
        this.sound.fade(0.0, 0.05, 2000);
        this.el=document.createElement('div');
        this.el.className = "organism";
        this.container = document.querySelector('.container');
        this.sibling = document.querySelector('.child');
        this.container.insertBefore(this.el, this.sibling)
        this.addEventListeners();
    }

    addEventListeners(){
        this.el.addEventListener("mouseout", (e)=>{
            this.mouseOver = false;
            this.sound.fade(0.3, 0.05, 1000);            
        });

        this.el.addEventListener("mouseenter", (e)=>{
            this.mouseOver = true;
            this.sound.volume(0.6);      
       });

        this.el.addEventListener("click", (e)=>{
            this.coverScreen();
        });
    }

    checkEdges(){
        if(this.x > this.xMax + this.impulse + this.safety ){
            this.x-=1;
            this.xSpeed*=-1;
            this.img = `${this.index%totalNumImages}.jpg`;
            setTimeout(this.blur, 2000);
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
        
        if(this.y + this.height/2 > this.yMax || this.y < 100){
            this.ySpeed*=-1;
        }
    }


    move(){   
        if(!this.mouseOver){
            this.x+=this.xSpeed;
            this.y+=this.ySpeed;
            this.theta += .01;
            this.rotate+=this.rotateSpeed
        }

    }

    display(){ 
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
            this.blur(); 
        } else {
            this.el.style.opacity = ".6";
            this.unBlur();
        }
    }

    blur(){    
        this.el.style.filter=`blur(${this.blurVal}px) brightness(80%)`;
    }

    unBlur(){    
        this.el.style.filter="blur(0px) brightness(80%)";
    }

    makeBigger(){
         
        if(this.height < this.targetSize){
            this.height+=5;
            this.width+=5;
            this.x-=this.impulse;
            if(this.impulse>0){
                this.impulse-=1
            } 
            
            this.makeBigger();
        }
        
        this.impulse=this.targetSize/6;

    }

    makeSmaller(){
        this.height = this.initSize;
        this.width = this.initSize;
    }

    coverScreen (){
        this.unBlur();
        if(this.height > (this.targetSize * 2)){
            this.blur;
            this.el.style.zIndex = "-1";
            this.completed = true;
        }
        if(this.height < this.yMax){
            // this.el.style.zIndex = "-1";
            this.height+=10;
            this.width+=10;
            this.y-=this.height/100;
            this.x-=this.width/100;
             setTimeout(this.coverScreen, 100);
        } else {
            this.showArrow();
        }
    }

    showArrow(){
        
    }



}


function Cell(index){
    
    
    this.init=function(){
        this.sound.fade(0.0, 0.05, 2000);
        this.el=document.createElement('div');
        this.el.className = "organism";
        this.container = document.querySelector('.container');
        this.sibling = document.querySelector('.child');
        this.container.insertBefore(this.el, this.sibling)
        this.addEventListeners();
    }

    this.addEventListeners = function(){
        this.el.addEventListener("mouseout", (e)=>{
            this.mouseOver = false;
            this.sound.fade(0.3, 0.05, 1000);            
        });

        this.el.addEventListener("mouseenter", (e)=>{
            this.mouseOver = true;
            this.sound.volume(0.6);      
       });

        this.el.addEventListener("click", (e)=>{
            this.coverScreen();
        });
    }

    this.checkEdges = function(){
        if(this.x > this.xMax + this.impulse + this.safety ){
            this.x-=1;
            this.xSpeed*=-1;
            this.img = `${this.index%totalNumImages}.jpg`;
            setTimeout(this.blur, 2000);
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
        
        if(this.y + this.height/2 > this.yMax || this.y < 100){
            this.ySpeed*=-1;
        }
    }


    this.move= function(){   
        if(!this.mouseOver){
            this.x+=this.xSpeed;
            this.y+=this.ySpeed;
            this.theta += .01;
            this.rotate+=this.rotateSpeed
        }

    }

    this.display = function(){ 
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
            this.blur(); 
        } else {
            this.el.style.opacity = ".6";
            this.unBlur();
        }
    }

    this.blur = function(){    
        this.el.style.filter=`blur(${this.blurVal}px) brightness(80%)`;
    }.bind(this)

    this.unBlur = function(){    
        this.el.style.filter="blur(0px) brightness(80%)";
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
        }
        
        this.impulse=this.targetSize/6;

    }.bind(this);

    this.makeSmaller = function(){
        this.height = this.initSize;
        this.width = this.initSize;
    }.bind(this);


    this.coverScreen  = function(){
        this.unBlur();
        if(this.height > (this.targetSize * 2)){
            this.blur;
            this.el.style.zIndex = "-1";
            this.completed = true;
        }
        if(this.height < this.yMax){
            // this.el.style.zIndex = "-1";
            this.height+=10;
            this.width+=10;
            this.y-=this.height/100;
            this.x-=this.width/100;
             setTimeout(this.coverScreen, 100);
        } else {
            this.showArrow();
        }
    }.bind(this)

    this.showArrow = function(){
        
    }

    // this.addSize = function(){
    //     this.height+=this.sizeDifferential/10;
    //     this.width+=this.sizeDifferential/10;
    // }.bind(this);

}
