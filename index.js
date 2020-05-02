let organisms = [];
let numOrganisms = 300;
let totalNumImages = 77;
let totalNumSounds = 5;

function init(){
    
    for(let i = 0; i < numOrganisms; i++){
        organisms[i] = new Organism(i);
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

function Organism(index){
    this.index = index;

    this.soundNum = this.index%totalNumSounds;
    this.sound = new Howl({ src: `sounds/${this.soundNum}.mp3`, html5: false, volume:0.01, loop: true});
    this.container = document.querySelector('.container');
    this.container.style = getComputedStyle(this.container);
    console.log("margin" + this.container.style.content);
    this.marginTop = 200;
    this.initSize = 0;
    this.targetSize = Math.random()*200;
    this.sizeDifferential = this.targetSize - this.size;
    this.size = this.initSize;
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
    this.rotateSpeed=Math.random()*5;
    // this.img=imageList[Math.floor(Math.random()*imageList.length)];
    this.img='white.jpg';
    this.theta = 0;
    this.oscillatingOpacity = 0.1;
    this.clicked = false;
    this.mouseOver = false;
    this.makingBigger=true;
    this.playing = false;

    
    this.init=function(){
        console.log(this.xMax);
        this.el=document.createElement('div');
        this.el.className = "organism";
        this.el.addEventListener("mouseout", (e)=>{
            this.mouseOver = false;
            this.el.style.opacity = ".1";
            this.el.style.filter="blur(3px) brightness(80%)";   
            if(this.clicked){
                this.sound.volume(0.05);
            }
            
        });

        this.el.addEventListener("mouseenter", (e)=>{
            this.mouseOver = true;
            this.el.style.opacity = ".6";
            this.el.style.filter="blur(0px) brightness(100%)"; 
            if(this.clicked){
                this.sound.volume(0.5);
            }  
       });

        this.el.addEventListener("click", (e)=>{
            this.img='x.jpg';
            this.el.style.backgroundColor = "rgba(190,45,170,0.1)";
            this.el.style.border = "10px solid rgba(190,45,170,0.8)";
            this.el.style.opacity = ".8";
            
            if(!this.playing){
                this.clicked = true;
                // this.img=images[Math.floor(Math.random()*images.length)];
                setTimeout(this.blur, 2000);
                this.id1 = this.sound.stop();
            } else {
                
                this.clicked = false;
                this.id1 = this.sound.play();
            }

            // this.el.style.backgroundColor = "purple";
            
        });
        this.container = document.querySelector('.container');
        this.sibling = document.querySelector('.child');
        // console.log(this.container);
        this.container.insertBefore(this.el, this.sibling)

    }


    this.move= function(){

        if(this.x > this.xMax + this.xMin - this.size + this.safety){
            // this.img=imageList[Math.floor(Math.random()*imageList.length)];
            // this.img = "1.jpg";
            this.img = `${this.index%totalNumImages}.jpg`
            // this.img=`${Math.floor(Math.random()*this.totalNumImages)}.jpg`;
            // this.img=`${Math.floor(Math.random()*this.totalNumImages)}.jpg`;
            this.el.style.filter="blur(0px) brightness(100%)"; 
            this.makeBigger();

            if(!this.playing){
                this.playing = true;
                this.sound.play();
            }
        }
        if(this.x < 0 + this.xMin){
            this.makeSmaller();
            if(this.playing){
                this.playing = false;
                this.sound.stop();
            
            }
        }
        if(this.x > this.xMax + this.xMin - this.size + this.safety || this.x < 0 + this.xMin){
            this.xSpeed*=-1;
            setTimeout(this.blur, 2000);
            if(this.clicked){
                
            }
        }
        if(this.y > this.yMax + this.yMin - this.size + this.safety || this.y < 0 + this.yMin){

            
            // this.img=images[Math.floor(Math.random()*images.length)];
            // this.el.style.filter="blur(0px) brightness(100%)"; 
            this.ySpeed*=-1;
            // if(this.clicked){
            //     setTimeout(this.blur, 2000);
            // }
            
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
        
        let blurVal = Math.random()*10 + 0.5;
        // this.el.style.opacity = `${this.oscillatingOpacity}`;
        this.el.style.filter=`blur(${blurVal}px) brightness(80%)`;

    }.bind(this)

    this.makeBigger = function(){
        this.height = this.targetSize;
        this.width = this.targetSize;
    }.bind(this);

    this.makeSmaller = function(){
        this.height = this.initSize;
        this.width = this.initSize;
    }.bind(this);

    // this.addSize = function(){
    //     this.height+=this.sizeDifferential/10;
    //     this.width+=this.sizeDifferential/10;
    // }.bind(this);

}