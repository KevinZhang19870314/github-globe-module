import { PerspectiveCamera } from 'three';
import { aspect, cameraZ } from '../systems/config';

function createCamera() {
    const fov = 50;
    const near = 180;
    const far = 1800;

    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, cameraZ);

    return camera;
}

export { createCamera };