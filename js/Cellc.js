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
        this.windowWidth = this.container.offsetWidth;
        this.windowHeight = this.container.offsetHeight;
        this.size = this.initSize;
        this.targetSize = Math.random()*(this.windowWidth/8);
        this.sizeDifferential = this.targetSize - this.size;
        this.xMin = this.windowWidth*.001;
        this.yMin = this.windowHeight*.001 + this.marginTop;
        this.safety = this.windowWidth*.1;
        this.xMax = this.windowWidth - this.safety - this.targetSize/2;
        this.yMax = this.windowHeight - this.safety + this.yMin;
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
            if(!this.clicked){
                this.coverScreen();
            }
            this.clicked;
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
        let maxSize = this.targetSize * 2;
        this.unBlur();
        if(this.height < maxSize){
            setTimeout(this.coverScreen, 100);
            this.height+=10;
            this.width+=10;
            this.y-=this.height/100;
            this.x-=this.width/100;
            
        } else {
            this.blur();
            this.el.style.zIndex = "-1";
            this.completed = true;
        }
    }
}

