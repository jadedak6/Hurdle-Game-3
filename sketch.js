var canvas, backgroundImg;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var player1, player2, player3, player4, players, hurdle;
//var player1_img,player2_img, player3_img, player4_img, hurdle_img;

function preload(){
    
}

function setup(){
    canvas = createCanvas(displayWidth - 20, displayHeight - 30);
    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();


}

function draw(){
    if(playerCount === 4){
        game.update(1);
    }

    if(gameState === 1){
        game.play();
    }

    
}



