import * as R from 'ramda';

import { Vector } from './vector';

export module Snake {

    export interface IGameState {
        dir: Vector;
        snake: Vector[];
        food: Vector;
    }

    export const randomState: () => IGameState =
        () => ({
            dir: [0, 1],
            snake: [Vector.random()],
            food: Vector.random(),
        });

    const collides: (h: Vector, t: Vector[]) => boolean =
        (h, t) => R.reduce(
            (acc, v) => acc || Vector.equals(h, v),
            false,
            t,
        );

    const move = R.pipe(
        Vector.add,
        Vector.wrap,
    );

    export const step: (state: IGameState) => IGameState =
        ({ snake: [h, ...t], food, dir }) => {
            const newHead = move(dir, h);
            const eats = Vector.equals(newHead, food);
            return collides(newHead, t)
                ? randomState()
                : {
                    dir,
                    snake: eats
                        ? [newHead, h, ...t]
                        : [newHead, ...R.dropLast(1, [h, ...t])],
                    food: eats
                        ? Vector.random()
                        : food,
                };
        };

}
