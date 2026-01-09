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
