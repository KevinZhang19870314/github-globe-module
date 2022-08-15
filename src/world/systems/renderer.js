import { WebGLRenderer } from 'three';
import { canvasWidth, canvasHeight } from "./config";

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth(), canvasHeight());
    renderer.setClearColor(0x000000, 0);

    return renderer;
}

export { createRenderer };
