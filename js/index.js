let cells = [];
let totalcells = 300;
let cellCount = 0;
let cellMultiplier  = 5;
let totalNumImages = 77;
let totalNumSounds = 21;
let arrowIsShowing = false;
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
// let touchEvent = 'ontouchstop' in window ? 'touchstop' : 'mouseOu';

;
// document.addEventListener('touchstart', this.touchstart);
// document.addEventListener('touchmove', this.touchmove);
// function touchstart(e) {
//     e.preventDefault()
// }

// function touchmove(e) {
//     e.preventDefault()
// }

async function preload(){
    document.querySelector('.btn-start').remove();
    document.querySelector('h1').remove();
    mainSound = new Howl({ src: `sounds/page1/mainloop.mp3`, html5: false, volume:0.4, loop: true});
    
    mainSound.once('load', function(){
        mainSound.play();
        setTimeout(init, 3000);
      });
    

    
}



function init(){

    let numcells = Math.floor(Math.random()*10) + 3;
    let stopLoop = cellCount + numcells;
    for(let i = cellCount; i < stopLoop; i++){
        
        cells[i] = new Cellc(i);
        cells[i].init();
        cells[i].display();
        cellCount+=1;
    }


    mainLoop();
}

function addCells(){
    let numcells = Math.floor(Math.random() * cellMultiplier) + 3;
    let stopLoop = cellCount + numcells;
    for(let i = cellCount; i < stopLoop; i++){
        cells[i] = new Cellc(i);
        cells[i].init();
        cells[i].display();
        cellCount++
    }
    cellMultiplier+=2;
}



function mainLoop(){
    if(Math.random() > 0.99 && cellCount < totalcells){
        addCells();
    }
    cells.forEach(cell=>cell.checkEdges());
    cells.forEach(cell=>cell.move());
    cells.forEach(cell=>cell.display());
    cells.forEach((cell)=>{
        if(cell.completed && !arrowIsShowing){
            // window.location('next.html');
            showArrow();
        }
    })
    window.requestAnimationFrame(mainLoop);
}



function startPartTwo(){
    cells = [];
    document.body.backgroundImage = "url('img/white.jpg')";
}

function showArrow(){
    arrowIsShowing = true;
    console.log('triggered');

}