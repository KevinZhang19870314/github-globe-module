import { aspect, canvasWidth, canvasHeight } from "./config";

const setSize = (camera, renderer) => {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasWidth(), canvasHeight());
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
    constructor(camera, renderer) {
        // set initial size
        setSize(camera, renderer);

        window.addEventListener('resize', () => {
            // set the size again if a resize occurs
            setSize(camera, renderer);
            // perform any custom actions
            this.onResize();
        });
    }

    onResize() { }
}

export { Resizer };
