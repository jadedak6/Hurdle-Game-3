class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState : state
        });
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");

            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            
            form = new Form();
            form.display();
        }

        player1 = createSprite(50,100,30,30);
        //player1.addImage("player1", player1_img);

        player2 = createSprite(50,300,30,30);
        //player2.addImage("player2", player2_img);
        //player2.scale(0.5);

        player3 = createSprite(50,500,30,30);
        //player3.addImage("player3", player3_img);

        player4 = createSprite(50,700,30,30);
        //player4.addImage("player4", player4_img);

        players = [player1, player2, player3, player4];

        //hurdle = createSprite();
    }

    play(){
        form.hide();
        
        Player.getPlayerInfo();

        if(allPlayers !== undefined){
            background("white");

            var index = 0;

            var x;
            var y = 200;

            for(var plr in allPlayers){
                index = index + 1;

                x = displayHeight - allPlayers[plr].distance;
                y = y + 20;
                
                players[index - 1].x = x;
                players[index - 1].y = y;
            }

            if(index === player.index){
                stroke(10);
				fill("red");
				ellipse(x,y,60,60);
                cars[index - 1].shapeColor = "red";
                camera.position.x = displayWidth/2;
                camera.position.y = cars[index - 1].y;
            }

        }

        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance += 10;
            player.update();
        }
        if(player.distance > 3860){
            gameState = 2;
            player.rank += 1;
            Player.updateCarsAtEnd(player.rank);
        }

        drawSprites();
    }
}