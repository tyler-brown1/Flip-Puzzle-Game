var levelTiles = [ //level creation
   [[1,0,1],
    [0,0,0],
    [1,0,1]],

   [[0,0,1,1],
    [0,1,0,1],
    [1,0,0,0],
    [1,1,0,1]],

   [[1,0,1,1,1,1],
    [0,0,0,1,0,1],
    [1,0,1,0,0,0],
    [1,1,0,1,0,1],
    [1,0,0,0,1,1],
    [1,1,0,1,1,1]],
    
    [[1,1,0,1,1,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,0],
    [0,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,1,1,0,1,1]],

   [[0,1,1,1,1,0],
    [1,0,0,0,0,1],
    [1,0,1,1,0,1],
    [1,0,1,1,0,1],
    [1,0,0,0,0,1],
    [0,1,1,1,1,0]],

   [[1,0,0,1,0,1],
    [0,1,1,0,0,1],
    [1,0,0,1,1,0],
    [1,0,0,1,1,0],
    [0,1,1,0,0,1],
    [1,0,0,1,0,1]],

   [[1,0,0,0,0,0,1],
    [0,0,0,0,0,0,0],
    [0,0,1,0,1,0,0],
    [0,0,0,0,0,0,0],
    [0,0,1,0,1,0,0],
    [0,0,0,0,0,0,0],
    [1,0,0,0,0,0,1]],

   [[1,0,0,1],
    [0,0,0,0],
    [0,0,0,0],
    [1,0,0,1]],

   [[0,1,1,1,0],
    [0,0,0,1,0],
    [0,1,0,0,0],
    [0,1,1,1,0]],

   [[0,1,0,0,1],
    [1,1,0,1,0],
    [0,1,1,1,0],
    [1,1,0,0,1],
    [1,1,0,1,1]],

   [[0,0,0,0],
   [0,2,0,0],
   [0,0,0,0],
   [0,0,0,1]],

   [[2,0,0,0],
   [0,0,0,0],
   [0,0,2,0],
   [0,0,0,2]],

  [[0,0,0,0,0,0],
   [0,3,0,0,3,0],
   [0,0,1,1,1,0],
   [0,0,1,3,1,0],
   [0,3,1,1,1,0],
   [0,0,0,0,0,0]],

  [[0,0,0,0,0,0,0,0,0],
  [0,3,0,1,4,1,0,3,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,3,0,0,3,0,0,3,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,3,0,1,4,1,0,3,0],
  [0,0,0,0,0,0,0,0,0]]
]
text = [ // text displayed at the top
    "Wecome to Flip! Click a tile to flip the surrounding tiles",
    "Corner tiles behave differently",
    "Let's try a bigger grid",
    "Let's make it less obvious",
    "Symmetric!",
    "Tricky one?",
    "BIG GRID!",
    "Lots of ways to solve this one!",
    "Press the reset button if you get stuck",
    "The hardest one yet?",
    "That's weird, this green one won't flip!",
    "Greens are tricky!",
    "Hmmmmm",
    "Thanks for playing version 1.0!",
]

const directions = [[0,0],[0,1],[0,-1],[1,0],[-1,0]]; //directions for normal tiles
const directions3 = [[0,0],[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,1],[1,-1],[-1,-1]] // directions for x tiles

const scale = [120,100,75,75,75,75,65,100,75,75,100,80,75,45] // scale multiplier for each level

var level = 10;
var count = 0;

window.onload = function(){
    document.querySelector("#reset").addEventListener("click",setGame)
    setGame();
}

function setGame(){
    count = 0;
    if(level>levelTiles.length-1){ //send back to level 1
        wait(600);
        level=0;
        document.getElementById("level").innerText = "LEVEL 1";
    }
    document.getElementById("text").innerText = text[level]

    w = levelTiles[level][0].length; // width+height multiplier of board
    h = levelTiles[level].length;

    board = document.getElementById("board"); //scale tile
    board.style.width = w*scale[level] + "px";
    board.style.height = h*scale[level] + "px";

    
    while(board.firstChild){ // remove all tiles
    board.removeChild(board.firstChild);
    }

    for(i = 0;i<h;i++){ // add tiles when level initialized
        for(j=0;j<w;j++){
            cur = document.createElement('div');

            cur.id = "-"+i+j;
            cur.classList.add("square");
            
            if(levelTiles[level][i][j] != 2){
                cur.addEventListener("click",changeColor);
            }

            if(levelTiles[level][i][j] == 1){
                cur.classList.add("clicked");
                count++;
            }
            if(levelTiles[level][i][j] == 2){
                cur.classList.add("clicked");
                count++;
                cur.style.backgroundColor = "#a0ffa0";
            }
            if(levelTiles[level][i][j] == 3){
                cur.classList.add("tile3")
            }
            if(levelTiles[level][i][j] == 4){
                cur.classList.add("clicked");
                cur.classList.add("tile3")
                count++;
            }
            document.getElementById("board").appendChild(cur);
        }
    }

    sq = document.getElementsByClassName("square"); // edit square length correctly
    for(i=0;i<sq.length;i++){
        sq[i].style.width = scale[level]-6 + "px";
        sq[i].style.height = scale[level]-6 + "px";
    }
}

function wait(ms) // pause at end of level
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

function changeColor(){
    X = parseInt(this.id[1]);
    Y = parseInt(this.id[2]);

    surrounding_id = []

    if(!this.classList.contains("tile3")){ // switch tile and surrounding 4
        for(i=0;i<5;i++){
                if(X+directions[i][0]>=0 && X+directions[i][0]<h && Y+directions[i][1]>=0 && Y+directions[i][1]<w&& levelTiles[level][X+directions[i][0]][Y+directions[i][1]]!=2){
                    surrounding_id.push("-"+(X+directions[i][0]).toString()+(Y+directions[i][1]).toString());
                }
        }
    }
    else{
        for(i=0;i<9;i++){ // switch tile and surrounding 8
                if(X+directions3[i][0]>=0 && X+directions3[i][0]<h && Y+directions3[i][1]>=0 && Y+directions3[i][1]<w && levelTiles[level][X+directions3[i][0]][Y+directions3[i][1]]!=2){
                    surrounding_id.push("-"+(X+directions3[i][0]).toString()+(Y+directions3[i][1]).toString());
                }
        }
    }
    

    for(i=0;i<surrounding_id.length;i++){ // flip tiles
        
        nbr = document.getElementById(surrounding_id[i]);
        if(nbr.classList.contains("clicked")){
            nbr.classList.remove("clicked");
            count-=1;
        }
        else{
            nbr.classList.add("clicked");
            count+=1;
        }}
    
    if(count==h*w){    // if level completed
        wait(200)
        level+=1;
        document.getElementById("level").innerText = "LEVEL " + (level+1)
        setGame();
    }
}