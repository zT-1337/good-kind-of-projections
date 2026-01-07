window.addEventListener("DOMContentLoaded", () => {
  const SCREEN_WIDTH = 800;
  const SCREEN_HEIGHT = 600;
  const BACKGROUND = "black";
  const FOREGROUND = "limegreen";
  const FPS = 60;
  const DELTA_TIME = 1 / FPS;

  const canvas = document.getElementById("canvas");
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  const ctx = canvas.getContext("2d");

  const bodies = [
    //Dice
    {
      /*
       * Each point coordinate of the body is relative to the origin of the body,
       * and not relative to the worlds or camera origin.
       * The origin of the body is therefore always assumed to be at 0, 0, 0.
      */
      points: [
        //Back of Dice
        { x: -0.25, y: 0.25, z: 0.25 },
        { x: 0.25, y: 0.25, z: 0.25 },
        { x: -0.25, y: -0.25, z: 0.25 },
        { x: 0.25, y: -0.25, z: 0.25 },
        //Front of Dice
        { x: -0.25, y: 0.25, z: -0.25 },
        { x: 0.25, y: 0.25, z: -0.25 },
        { x: -0.25, y: -0.25, z: -0.25 },
        { x: 0.25, y: -0.25, z: -0.25 },
      ],
      vertices: [
        //Back face of dice
        [0, 1],
        [0, 2],
        [3, 1],
        [3, 2],
        //Front face of dice
        [4, 5],
        [4, 6],
        [7, 5],
        [7, 6],
        //Left, Right, Top and Bottom face of dice
        [0, 4],
        [2, 6],
        [1, 5],
        [3, 7],
      ],
      translation: { x: 0, y: 0, z: 1 },
    }
  ];

  function translate(bodyOrigin, translation) {
    return {
      x: bodyOrigin.x + translation.x,
      y: bodyOrigin.y + translation.y,
      z: bodyOrigin.z + translation.z,
    }
  }

  function rotateAroundY({ x, y, z }, angle) {
    //This rotation function assumes, that each point is a relative offset to the center of the body.
    const cosine = Math.cos(angle);
    const sinus = Math.sin(angle);

    return {
      x: x * cosine - z * sinus,
      y,
      z: x * sinus + z * cosine
    }
  }

  function projectTo2d({ x, y, z }) {
    //Pinhole point projection
    return {
      x: x / z,
      y: y / z,
    }
  }

  function projectToScreen({ x, y }) {
    return {
      //x: -1..1 => 0..2 => 0..1 => 0..SCREEN_WIDTH
      x: (x + 1) / 2 * SCREEN_WIDTH,
      //y: -1..1 => 0..2 => 0..1 =>  0..SCREEN_HEIGHT => SCREEN_HEIGHT..0
      y: (1 - (y + 1) / 2) * SCREEN_HEIGHT
    }
  }

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

  let timeoutId = undefined;
  let angle = 0;
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

