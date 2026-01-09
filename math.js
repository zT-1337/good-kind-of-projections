//Those functions are using a matrix rotation 
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

function translate(bodyOrigin, translation, scale = 1) {
  return {
    x: bodyOrigin.x + scale * translation.x,
    y: bodyOrigin.y + scale * translation.y,
    z: bodyOrigin.z + scale * translation.z,
  }
}
