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
    //Translation relative to the position of the world origin
    translation: { x: 0, y: 0, z: 1 },
    animate: true,
  },
  //Z+ 
  {
    points: [
      { x: -0.25, y: 0.25, z: 0 },
      { x: 0.25, y: 0.25, z: 0 },
      { x: -0.25, y: -0.25, z: 0 },
      { x: 0.25, y: -0.25, z: 0 },
      { x: 0.25, y: 0, z: 0 },
      { x: 0.5, y: 0, z: 0 },
      { x: 0.375, y: 0.125, z: 0 },
      { x: 0.375, y: -0.125, z: 0 },
    ],
    vertices: [
      [0, 1],
      [1, 2],
      [2, 3],
      [4, 5],
      [6, 7],
    ],
    translation: { x: 0, y: 0, z: 5 },
    animate: false,
  },
  //Z-
  {
    points: [
      { x: -0.25, y: 0.25, z: 0 },
      { x: 0.25, y: 0.25, z: 0 },
      { x: -0.25, y: -0.25, z: 0 },
      { x: 0.25, y: -0.25, z: 0 },
      { x: 0.25, y: 0, z: 0 },
      { x: 0.5, y: 0, z: 0 },
      { x: 0.375, y: 0.125, z: 0 },
    ],
    vertices: [
      [0, 1],
      [1, 2],
      [2, 3],
      [4, 5],
    ],
    translation: { x: 0, y: 0, z: -5 },
    animate: false,
  },
  //X+ 
  {
    points: [
      { x: 0.25, y: 0.25, z: 0 },
      { x: -0.25, y: -0.25, z: 0 },
      { x: -0.25, y: 0.25, z: 0 },
      { x: 0.25, y: -0.25, z: 0 },
      { x: 0.25, y: 0, z: 0 },
      { x: 0.5, y: 0, z: 0 },
      { x: 0.375, y: 0.125, z: 0 },
      { x: 0.375, y: -0.125, z: 0 },
    ],
    vertices: [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
    ],
    translation: { x: 5, y: 0, z: 0 },
    animate: false,
  },
  //X-
  {
    points: [
      { x: 0.25, y: 0.25, z: 0 },
      { x: -0.25, y: -0.25, z: 0 },
      { x: -0.25, y: 0.25, z: 0 },
      { x: 0.25, y: -0.25, z: 0 },
      { x: 0.25, y: 0, z: 0 },
      { x: 0.5, y: 0, z: 0 },
    ],
    vertices: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    translation: { x: -5, y: 0, z: 0 },
    animate: false,
  },
  //Y+ 
  {
    points: [
      { x: 0, y: 0, z: 0 },
      { x: -0.25, y: 0.25, z: 0 },
      { x: 0.25, y: 0.25, z: 0 },
      { x: 0, y: -0.25, z: 0 },
      { x: 0.25, y: 0, z: 0 },
      { x: 0.5, y: 0, z: 0 },
      { x: 0.375, y: 0.125, z: 0 },
      { x: 0.375, y: -0.125, z: 0 },
    ],
    vertices: [
      [0, 1],
      [0, 2],
      [0, 3],
      [4, 5],
      [6, 7],
    ],
    translation: { x: 0, y: 5, z: 0 },
    animate: false,
  },
  //Y-
  {
    points: [
      { x: 0, y: 0, z: 0 },
      { x: -0.25, y: 0.25, z: 0 },
      { x: 0.25, y: 0.25, z: 0 },
      { x: 0, y: -0.25, z: 0 },
      { x: 0.25, y: 0, z: 0 },
      { x: 0.5, y: 0, z: 0 },
    ],
    vertices: [
      [0, 1],
      [0, 2],
      [0, 3],
      [4, 5],
    ],
    translation: { x: 0, y: -5, z: 0 },
    animate: false,
  },

];
