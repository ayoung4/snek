import * as p5 from 'p5';
import * as redux from 'redux';

import { WIDTH, HEIGHT, DIM } from './constants'
import { Snake } from './snake';

export const render = (store: redux.Store<Snake.IGameState>) => new p5(function (sketch) {

    const drawTile = (r, g, b) => ([x, y]) => {
        sketch.fill(r, g, b);
        sketch.stroke(r - 20, g - 20, b - 20);
        sketch.rect(x * DIM, y * DIM, DIM, DIM);
    };

    const drawSnake = drawTile(60, 185, 60);

    const drawFood = drawTile(185, 60, 60);

    sketch.setup = function () {
        sketch.createCanvas(WIDTH * DIM, HEIGHT * DIM);
        sketch.background(100);
        sketch.frameRate(20);
    };

    sketch.draw = function () {
        const { snake, food } = store.getState();
        sketch.background(60);
        snake.forEach(drawSnake);
        drawFood(food);
    };

});
