$(document).ready(function ()
{
    start();
});

let canvasDinosaur = document.querySelector('#canvas-dinosaur');
let mainSound = document.querySelector('#canvas-audio');
let context = canvasDinosaur.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const START_BUTTON = 13;
const JUMP_BUTTON = 16;
const JUMP_CLICK = 1;

let intervalUid = null;
let score = 0;
let startWinScore = 5000;
let winScore = startWinScore;
let addWinScore = 2500;
let dangerScore = 1500;

let background = new Image();
background.src = 'image/background.png';

let bitokImage = new Image();
bitokImage.src = 'image/bitok.png';

let cactusImage = new Image();
cactusImage.src = 'image/cactus.png';

let cactusBigImage = new Image();
cactusBigImage.src = 'image/cactus-big.png';

let dinoImage = new Image();
dinoImage.src = 'image/dino.png';

let meteorImage = new Image();
meteorImage.src = 'image/meteor.png';

let startSurface = {
    x: 0,
    y: 465,
    w: CANVAS_WIDTH,
    h: 5,
    color: 'rgba(255,152,64,0.97)'
}

let dinosaur = {
    x: 175,
    y: startSurface.y - 60,
    w: 50,
    h: 60,
    directionY: 1
}

let topSurface = {
    x: 0,
    y: dinosaur.y - 200,
    w: CANVAS_WIDTH,
    h: 1
}

let cactusBig = {
    x: getRandomInt(1200, 1400),
    y: startSurface.y - dinosaur.h - 40,
    w: 120,
    h: dinosaur.h + 40,
    directionY: 1
}

let cactusMedium = {
    x: getRandomInt(800, 1000),
    y: startSurface.y - dinosaur.h - 40,
    w: 75,
    h: dinosaur.h + 40,
    directionY: 1
}

let cactusSmall = {
    x: getRandomInt(1100, 1250),
    y: startSurface.y - dinosaur.h - 1,
    w: 61,
    h: dinosaur.h + 1,
    directionY: 1
}

let bonus = {
    x: getRandomInt(600, 1200),
    y: startSurface.y - dinosaur.h - 10,
    w: 70,
    h: dinosaur.h + 10,
    directionY: 1
}

let meteor = {
    x: 0 - 150,
    y: 0 - 150,
    h: 200,
    w: 200
}

function start()
{
    document.addEventListener("keydown", onDocumentKeydown);
    document.addEventListener("keydown", onDocumentKeydown);
    document.addEventListener("mousedown", onDocumentKeydown);
    play();
}

function play()
{
    draw();
    update();
}

function draw()
{
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.drawImage(background, 0, 0);

    context.font = '30px Roboto';
    context.fillText(score, 580, 50);
    context.fillText(winScore, 180, 50);

    context.font = '30px Roboto';
    context.fillText(score, 580, 50);
    context.fillText(winScore, 180, 50);
    context.fillText(dangerScore, CANVAS_WIDTH / 2 - 30, 50);

    context.strokeStyle = dinosaur.color;
    context.drawImage(dinoImage, dinosaur.x, dinosaur.y, dinosaur.w, dinosaur.h);

    context.fillStyle = startSurface.color;
    context.fillRect(startSurface.x, startSurface.y, startSurface.w, startSurface.h);

    for (let i = CANVAS_WIDTH; i <= CANVAS_WIDTH; i++)
    {
        context.drawImage(bitokImage, bonus.x + i, bonus.y, bonus.w, bonus.h);
        context.drawImage(cactusImage, cactusSmall.x + i, cactusSmall.y, cactusSmall.w, cactusSmall.h);
        context.drawImage(cactusImage, cactusMedium.x + i, cactusMedium.y, cactusMedium.w, cactusMedium.h);
        context.drawImage(cactusBigImage, cactusBig.x + i, cactusBig.y, cactusBig.w, cactusBig.h);
    }

    context.drawImage(meteorImage, meteor.x, meteor.y, meteor.w, meteor.h)
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function onDocumentKeydown(event)
{
    if (event.keyCode == START_BUTTON)
    {
        intervalUid = setInterval(play, 1);
        mainSound.play();
    }
    else if ((event.keyCode == JUMP_BUTTON) || (event.which == JUMP_CLICK))
    {
        dinosaur.directionY = -2;
    }
}

function meteorAnimate()
{
    meteor.x += 25;
    meteor.y += 25;
}

function update()
{
    bonus.x -= 3;
    cactusSmall.x -= 2;
    cactusMedium.x -= 1.9;
    cactusBig.x -= 1.75;

    if (dinosaur.directionY == -2)
    {
        dinosaur.y -= 2;
    }

    else if (dinosaur.y + dinosaur.h <= startSurface.y)
    {
        dinosaur.y += 2;
    }

    if (dinosaur.y === topSurface.y)
    {
        dinosaur.directionY = 2;
    }

    if (dinosaur.y > topSurface.y + 200)
    {
        score += 1;
    }

    if (dinosaur.y < topSurface.y + 200)
    {
        dangerScore -= 1;
    }

    if (bonus.x <= startSurface.x - CANVAS_WIDTH - bonus.w)
    {
        bonus.x += getRandomInt(CANVAS_WIDTH, 1500);
    }

    if (cactusSmall.x <= startSurface.x - CANVAS_WIDTH - cactusSmall.w)
    {
        cactusSmall.x += getRandomInt(CANVAS_WIDTH, 900);
    }

    if (cactusMedium.x <= startSurface.x - CANVAS_WIDTH - cactusMedium.w)
    {
        cactusMedium.x += getRandomInt(CANVAS_WIDTH + 100, 1000);
    }

    if (cactusBig.x <= startSurface.x - CANVAS_WIDTH - cactusBig.w)
    {
        cactusBig.x += getRandomInt(CANVAS_WIDTH + 200, 1100);
    }

    if ((dinosaur.x + dinosaur.w >= bonus.x + CANVAS_WIDTH) && (dinosaur.x + dinosaur.w <= bonus.x + CANVAS_WIDTH + bonus.w) && (dinosaur.y >= bonus.y) && (dinosaur.y <= bonus.y + bonus.h))
    {
        dangerScore += 500;
        bonus.x = getRandomInt(1050, 1200);
    }

    if ((dinosaur.x + dinosaur.w >= cactusSmall.x + CANVAS_WIDTH) && (dinosaur.x + dinosaur.w <= cactusSmall.x + CANVAS_WIDTH + cactusSmall.w) && (dinosaur.y >= cactusSmall.y) && (dinosaur.y <= cactusSmall.y + cactusSmall.h))
    {
        meteorAnimate();
    }

    if ((dinosaur.x + dinosaur.w >= cactusMedium.x + CANVAS_WIDTH) && (dinosaur.x + dinosaur.w <= cactusMedium.x + CANVAS_WIDTH + cactusMedium.w) && (dinosaur.y >= cactusMedium.y) && (dinosaur.y <= cactusMedium.y + cactusMedium.h))
    {
        meteorAnimate();
    }

    if ((dinosaur.x + dinosaur.w >= cactusBig.x + CANVAS_WIDTH) && (dinosaur.x + dinosaur.w <= cactusBig.x + CANVAS_WIDTH + cactusBig.w) && (dinosaur.y >= cactusBig.y) && (dinosaur.y <= cactusBig.y + cactusBig.h))
    {
        meteorAnimate();
    }

    if (winScore === score - 1)
    {
        winScore += addWinScore;
        background.src = 'image/background_v2.png';
        startSurface.h = 0;
        gameWin();
    }

    if ((dangerScore + 1 == 0) || (meteor.y > startSurface.y - meteor.h + 30))
    {
        clearInterval(intervalUid);
        gameOver();
    }
}

function gameWin()
{
    videoPlay();
    clearInterval(intervalUid);
    cactusSmall.x = getRandomInt(1100, 1250);
    cactusMedium.x = getRandomInt(800, 1000);
    cactusBig.x = getRandomInt(1200, 1400);
    bonus.x = getRandomInt(1050, 1200);
    meteor.x = 0 - 150;
    meteor.y = 0 - 150;
}

function gameOver()
{
    score = 0;
    winScore = startWinScore;
    dangerScore = 1500;
    cactusSmall.x = getRandomInt(1100, 1250);
    cactusMedium.x = getRandomInt(800, 1000);
    cactusBig.x = getRandomInt(1200, 1400);
    bonus.x = getRandomInt(1050, 1200);
    meteor.x = 0 - 150;
    meteor.y = 0 - 150;
    clearInterval(intervalUid);
    background.src = 'image/background.png';
}

function videoPlay()
{
    $('.b-canvas__video').addClass('b-canvas__video_active');
    this.play();
}

function videoStop()
{
    $('.b-canvas__video').removeClass('b-canvas__video_active');
    $('.b-canvas__video').get(0).currentTime = 0;
}