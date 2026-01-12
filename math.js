//Analysis Utils
const NEAR_Z_AXIS = 0.001;
function findIntersectionWithZAxis(front3d, back3d) {
  const deltaZ = front3d.z - back3d.z;

  //Because it would be either zero or infinite results
  if (deltaZ === 0) {
    return undefined;
  }

  const gradient = (NEAR_Z_AXIS - back3d.z) / deltaZ;

  return {
    x: back3d.x + gradient * (front3d.x - back3d.x),
    y: back3d.y + gradient * (front3d.y - back3d.y),
    z: NEAR_Z_AXIS,
  }
}

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
