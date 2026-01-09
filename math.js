//Move point
function translate(point, translation, scale = 1) {
  return {
    x: point.x + scale * translation.x,
    y: point.y + scale * translation.y,
    z: point.z + scale * translation.z,
  }
}

//Rotate point around the world center at (0, 0, 0)
function rotateAroundX({ x, y, z }, angle) {
  const cosine = Math.cos(angle);
  const sinus = Math.sin(angle);

  return {
    x,
    y: y * cosine - z * sinus,
    z: y * sinus + z * cosine
  }
}

function rotateAroundY({ x, y, z }, angle) {
  const cosine = Math.cos(angle);
  const sinus = Math.sin(angle);

  return {
    x: x * cosine - z * sinus,
    y,
    z: x * sinus + z * cosine
  }
}

function rotateAroundZ({ x, y, z }, angle) {
  const cosine = Math.cos(angle);
  const sinus = Math.sin(angle);

  return {
    x: x * cosine - y * sinus,
    y: x * sinus + y * cosine,
    z
  }
}

//Project point
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
    y: SCREEN_HEIGHT - (((y + 1) / 2) * SCREEN_HEIGHT),
  }
}

function project(point3d) {
  return projectToScreen(projectTo2d(point3d));
}
