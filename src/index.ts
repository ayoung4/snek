import { store, step, setDir } from './store';
import { render } from './render';

const sketch = render(store);

sketch.keyPressed = function () {
    if (sketch.keyCode === sketch.LEFT_ARROW) {
        store.dispatch(setDir([-1, 0]))
    } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
        store.dispatch(setDir([1, 0]))
    } else if (sketch.keyCode === sketch.UP_ARROW) {
        store.dispatch(setDir([0, -1]))
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
        store.dispatch(setDir([0, 1]))
    }
};

const loop = (t1) => (t2) =>
    t2 - t1 > 100
        ? store.dispatch(step()) && window.requestAnimationFrame(loop(t2))
        : window.requestAnimationFrame(loop(t1));

window.requestAnimationFrame(loop(0));
