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
