const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const BACKGROUND = "black";
const FOREGROUND = "limegreen";
const FPS = 60;
const DELTA_TIME = 1 / FPS;

const CAMERA_SPEED = 1;
const CAMERA_POSITION = { x: 0, y: 0, z: 0 };
const CAMERA_ANGLE = { x: 0, y: 0 };

const CANVAS_UPPER_LIMIT = 1e6;
const CANVAS_LOWER_LIMIT = -1e6;

const INPUTS = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  s: false,
  a: false,
  d: false,
  e: false,
  q: false,
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

  function isOutsideOfCanvasLimit({ x, y }) {
    return x > CANVAS_UPPER_LIMIT || x < CANVAS_LOWER_LIMIT || y > CANVAS_UPPER_LIMIT || y < CANVAS_LOWER_LIMIT;
  }

  function renderLine(start, end) {
    if (isOutsideOfCanvasLimit(start) || isOutsideOfCanvasLimit(end)) {
      return;
    }

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

    //Camera Position
    if (INPUTS.ArrowUp) {
      CAMERA_POSITION.y += cameraMovementOffset;
    }
    if (INPUTS.ArrowDown) {
      CAMERA_POSITION.y -= cameraMovementOffset;
    }
    if (INPUTS.ArrowRight) {
      CAMERA_POSITION.x += cameraMovementOffset;
    }
    if (INPUTS.ArrowLeft) {
      CAMERA_POSITION.x -= cameraMovementOffset;
    }
    if (INPUTS.w) {
      CAMERA_POSITION.z += cameraMovementOffset;
    }
    if (INPUTS.s) {
      CAMERA_POSITION.z -= cameraMovementOffset;
    }
    //Camera Angle
    if (INPUTS.d) {
      CAMERA_ANGLE.y += cameraMovementOffset;
    }
    if (INPUTS.a) {
      CAMERA_ANGLE.y -= cameraMovementOffset;
    }
    if (INPUTS.q) {
      CAMERA_ANGLE.x += cameraMovementOffset;
    }
    if (INPUTS.e) {
      CAMERA_ANGLE.x -= cameraMovementOffset;
    }

    //Render bodies
    clearScreen();

    angle += Math.PI / 2 * DELTA_TIME;

    for (const body of bodies) {
      const bodyCenterAdjustedToCamera = rotateAroundX(
        rotateAroundY(
          translate(body.translation, CAMERA_POSITION, -1),
          CAMERA_ANGLE.y
        ),
        CAMERA_ANGLE.x,
      );

      for (const vertice of body.vertices) {
        let start3d = translate(
          body.animate ? rotateAroundY(body.points[vertice[0]], angle) : body.points[vertice[0]],
          bodyCenterAdjustedToCamera
        );
        let end3d = translate(
          body.animate ? rotateAroundY(body.points[vertice[1]], angle) : body.points[vertice[1]],
          bodyCenterAdjustedToCamera
        );

        if (start3d.z <= 0 && end3d.z <= 0) {
          continue;
        } else if (start3d.z <= 0 && end3d.z > 0) {
          start3d = findIntersectionWithZAxis(end3d, start3d);
        } else if (end3d.z <= 0 && start3d.z > 0) {
          end3d = findIntersectionWithZAxis(start3d, end3d);
        }

        const start = project(start3d);
        const end = project(end3d);

        renderLine(start, end);
      }
    }

    //Setup loop;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(render, 1000 / FPS);
  }

  render();
});

