import { Scene, Fog } from "three";

function createScene() {
    const scene = new Scene();
    scene.fog = new Fog(0x535ef3, 400, 2000);

    return scene;
}

export { createScene };