import '/styles/main.css';
import { World } from './world/world';

function main() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    world.start();
}

main();