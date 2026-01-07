const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const BACKGROUND = "black";
const FOREGROUND = "limegreen";
const FPS = 60;
const DELTA_TIME = 1 / FPS;

const CAMERA_SPEED = 1;
const CAMERA_POSITION = { x: 0, y: 0, z: 0 };

const INPUTS = {
  "ArrowUp": false,
  "ArrowDown": false,
  "ArrowLeft": false,
  "ArrowRight": false,
  "w": false,
  "s": false,
}

//Setup input handling
window.addEventListener("keydown", (keyEvent) => {
  if (Object.keys(INPUTS).includes(keyEvent.key)) {
    keyEvent.preventDefault();
    INPUTS[keyEvent.key] = true;
  }
});

window.addEventListener("keyup", (keyEvent) => {
  if (Object.keys(INPUTS).includes(keyEvent.key)) {
    keyEvent.preventDefault();
    INPUTS[keyEvent.key] = false;
  }
});

//Setup rendering loop
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  const ctx = canvas.getContext("2d");

  let timeoutId = undefined;
  let angle = 0;

  function renderLine(start, end) {
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  function clearScreen() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  function render() {
    //Handle Input
    const cameraMovementOffset = CAMERA_SPEED * DELTA_TIME;
    if (INPUTS.ArrowUp) {
      CAMERA_POSITION.z += cameraMovementOffset;
    }
    if (INPUTS.ArrowDown) {
      CAMERA_POSITION.z -= cameraMovementOffset;
    }
    if (INPUTS.ArrowRight) {
      CAMERA_POSITION.x += cameraMovementOffset;
    }
    if (INPUTS.ArrowLeft) {
      CAMERA_POSITION.x -= cameraMovementOffset;
    }
    if (INPUTS.w) {
      CAMERA_POSITION.y += cameraMovementOffset;
    }
    if (INPUTS.s) {
      CAMERA_POSITION.y -= cameraMovementOffset;
    }

    //Render bodies
    clearScreen();

    angle += Math.PI * DELTA_TIME;
    for (const shape of bodies) {
      for (const vertice of shape.vertices) {
        const cameraToShapeTranslation = translate(shape.translation, CAMERA_POSITION, -1);
        const start = projectAndTranslate(rotateAroundY(shape.points[vertice[0]], angle), cameraToShapeTranslation);
        const end = projectAndTranslate(rotateAroundY(shape.points[vertice[1]], angle), cameraToShapeTranslation);
        renderLine(start, end);
      }
    }

    //Setup loop;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(render, 1000 / FPS);
  }

  render();
});

