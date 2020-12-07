"use strict";

//основные переменные

let score = document.getElementById('score');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let WIDTH = canvas.width;
let HEIGHT = canvas.height;
let CELL_SIZE = 20;
let total_score = 0;
let movement = 0;
let new_x;
let new_y;
let fruit_x;
let fruit_y;
let stop_it = 0;
let tail = [];

//обработка событий стрелок

addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (movement !== 1) {
                movement = 2;
            }
            break;
        case 'ArrowRight':
            if (movement !== 2) {
                movement = 1;
            }
            break;
        case 'ArrowUp':
            if (movement !== -2) {
                movement = -1;
            }
            break;
        case 'ArrowDown':
            if (movement !== -1) {
                movement = -2;
            }
            break;
        case 'Enter':
            stop_it = 1;
            break;
    }
});

//основные функции

function Game() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    total_score = 0;
    score.innerText = 'Score: ' + total_score;
    movement = 0;
    Fruit();
    new_x = Random_Count(0, WIDTH - CELL_SIZE);
    new_y = Random_Count(0, HEIGHT - CELL_SIZE);
    Square(new_x, new_y, CELL_SIZE);
    let Timer = setInterval(() => {
        switch (movement) {
            case 2:
                new_x -= 1;
                ctx.clearRect(new_x, new_y, CELL_SIZE, CELL_SIZE);
                Square(new_x, new_y, CELL_SIZE);
                if (tail.length > 21) {
                    ctx.clearRect(tail[tail.length - 21 * (total_score + 1)][0], tail[tail.length - 21 * (total_score + 1)][1], CELL_SIZE, CELL_SIZE);
                    Square(tail[tail.length - 20][0], tail[tail.length - 20][1], CELL_SIZE);
                }
                console.log(tail[tail.length - 1]);
                if (IsMatch()) {
                    total_score++;
                    score.innerText = 'Score: ' + total_score;
                    ctx.clearRect(fruit_x, fruit_y, CELL_SIZE, CELL_SIZE);
                    Fruit();
                }
                tail.push([new_x, new_y]);
                break;
            case 1:
                new_x += 1;
                ctx.clearRect(new_x, new_y, CELL_SIZE, CELL_SIZE);
                Square(new_x, new_y, CELL_SIZE);
                if (tail.length > 21) {
                    ctx.clearRect(tail[tail.length - 21 * (total_score + 1)][0], tail[tail.length - 21 * (total_score + 1)][1], CELL_SIZE, CELL_SIZE);
                    Square(tail[tail.length - 20][0], tail[tail.length - 20][1], CELL_SIZE);
                }
                console.log(tail[tail.length - 1]);
                if (IsMatch()) {
                    total_score++;
                    score.innerText = 'Score: ' + total_score;
                    ctx.clearRect(fruit_x, fruit_y, CELL_SIZE, CELL_SIZE);
                    Fruit();
                }
                tail.push([new_x, new_y]);
                break;
            case -1:
                new_y -= 1;
                ctx.clearRect(new_x, new_y, CELL_SIZE, CELL_SIZE);
                Square(new_x, new_y, CELL_SIZE);
                if (tail.length > 21) {
                    ctx.clearRect(tail[tail.length - 21 * (total_score + 1)][0], tail[tail.length - 21 * (total_score + 1)][1], CELL_SIZE, CELL_SIZE);
                    Square(tail[tail.length - 20][0], tail[tail.length - 20][1], CELL_SIZE);
                }
                console.log(tail[tail.length - 1]);
                if (IsMatch()) {
                    total_score++;
                    score.innerText = 'Score: ' + total_score;
                    ctx.clearRect(fruit_x, fruit_y, CELL_SIZE, CELL_SIZE);
                    Fruit();
                }
                tail.push([new_x, new_y]);
                break;
            case -2:
                new_y += 1;
                ctx.clearRect(new_x, new_y, CELL_SIZE, CELL_SIZE);
                Square(new_x, new_y, CELL_SIZE);
                if (tail.length > 21) {
                    ctx.clearRect(tail[tail.length - 21 * (total_score + 1)][0], tail[tail.length - 21 * (total_score + 1)][1], CELL_SIZE, CELL_SIZE);
                    Square(tail[tail.length - 20][0], tail[tail.length - 20][1], CELL_SIZE);
                }
                console.log(tail[tail.length - 1]);
                if (IsMatch()) {
                    total_score++;
                    score.innerText = 'Score: ' + total_score;
                    ctx.clearRect(fruit_x, fruit_y, CELL_SIZE, CELL_SIZE);
                    Fruit();
                }
                tail.push([new_x, new_y]);
                break;
        }
        if (stop_it === 1) {
            clearInterval(Timer);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            stop_it = 0;
        }
    }, 6);
}

let IsMatch = () => {
    return fruit_x - CELL_SIZE <= new_x &&
        new_x <= fruit_x + CELL_SIZE &&
        fruit_y - CELL_SIZE <= new_y &&
        new_y <= fruit_y + CELL_SIZE;
};

let Fruit = () => {
    fruit_x = Random_Count(0, WIDTH - CELL_SIZE);
    fruit_y = Random_Count(0, HEIGHT - CELL_SIZE);
    Square(fruit_x, fruit_y, CELL_SIZE, 'green');
};

let Random_Count = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

let Square = (x, y, size, color = 'black') => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
};