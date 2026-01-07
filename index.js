const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const BACKGROUND = "black";
const FOREGROUND = "limegreen";
const FPS = 60;
const DELTA_TIME = 1 / FPS;

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
    clearScreen();
    angle += Math.PI * DELTA_TIME;

    for (const shape of bodies) {
      for (const vertice of shape.vertices) {
        const start = projectToScreen(projectTo2d(translate(rotateAroundY(shape.points[vertice[0]], angle), shape.translation)));
        const end = projectToScreen(projectTo2d(translate(rotateAroundY(shape.points[vertice[1]], angle), shape.translation)));
        renderLine(start, end);
      }
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(render, 1000 / FPS);
  }

  render();
});

