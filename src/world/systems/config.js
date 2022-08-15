const aspect = 1.2;
const cameraZ = 300;
const canvasWidth = () => window.innerWidth / 1.8;
const canvasHeight = () => canvasWidth() / aspect;

export { aspect, cameraZ, canvasWidth, canvasHeight };