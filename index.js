// ------------------------------------------------- //
// Evan MacHale - N00150552
// Working Index
// Catmull-Clark Subdivision
// ------------------------------------------------- //

// Holds starting vertices for window shape
const topLeftFace = {
  name: 'topLeftFace',
  vertices:{
    v1:{x:0,y:0},
    v2:{x:0,y:100},
    v3:{x:100,y:100},
    v4:{x:100,y:0}
  },
  facePoint:{},
  edgePoints:[]
};

const topRightFace = {
  name: 'topRightFace',
  vertices:{
    v1:{x:100,y:0},
    v2:{x:100,y:100},
    v3:{x:200,y:100},
    v4:{x:200,y:0}
  },
  facePoint:{},
  edgePoints:[]
};

const bottomRightFace = {
  name: 'bottomRightFace',
  vertices:{
    v1:{x:100,y:100},
    v2:{x:100,y:200},
    v3:{x:200,y:200},
    v4:{x:200,y:100}
  },
  facePoint:{},
  edgePoints:[]
};

const bottomLeftFace = {
  name: 'bottomLeftFace',
  vertices:{
    v1:{x:0,y:100},
    v2:{x:0,y:200},
    v3:{x:100,y:200},
    v4:{x:100,y:100}
  },
  facePoint:{},
  edgePoints:[]
};

// Holds new vertices
const vertices = {};

// ------------------------------------------------- //
// Starting Vertices for 3D
//    v5 _ v8
//   /|    /
//  v1 _ v4 |
//  | v6 _|v7
//  v2 _ v3
// How do we create a box geometry & manipulate?
// ------------------------------------------------- //

function setup() {
  const canvasSize = $('#canvas').width();
  const canvas = createCanvas(canvasSize,canvasSize);
  canvas.parent('canvas');

  // Get all facePoints for total faces
  findFacePoint(topLeftFace);
  findFacePoint(topRightFace);
  findFacePoint(bottomRightFace);
  findFacePoint(bottomLeftFace);

  // Find all edgePoints for each adjoining face
  findEdgePoint(topLeftFace, topRightFace);
  findEdgePoint(topRightFace, bottomRightFace);
  findEdgePoint(bottomRightFace, bottomLeftFace);
  findEdgePoint(bottomLeftFace, topLeftFace);
}

function draw() {
  background(0);
  translate(width/2-100,height/2-100);
  noFill();
  stroke('red');

  // Placeholder shapes

  beginShape();
    vertex(0,0);
    vertex(0,100);
    vertex(100,100);
    vertex(100,0);
  endShape(CLOSE);

  beginShape();
    vertex(100,0);
    vertex(100,100);
    vertex(200,100);
    vertex(200,0);
  endShape(CLOSE);

  beginShape();
    vertex(100,100);
    vertex(100,200);
    vertex(200,200);
    vertex(200,100);
  endShape(CLOSE);

  beginShape();
    vertex(0,100);
    vertex(0,200);
    vertex(100,200);
    vertex(100,100);
  endShape(CLOSE);

  point(50,50);

}

// ------------------------------------------------- //
// facePoint = average of all points defining a face:
//  v1 _ _ _ v4
//  |  \   /  |
//  |    F    |
//  |  /   \  |
//  v2 _ _ _ v3
// ------------------------------------------------- //
const findFacePoint = (face) => {
  const newFacePoint = {};
  const x = (face.vertices.v1.x + face.vertices.v2.x + face.vertices.v3.x + face.vertices.v4.x) / 4;
  const y = (face.vertices.v1.y + face.vertices.v2.y + face.vertices.v3.y + face.vertices.v4.y) / 4;
  face.facePoint = {x:x,y:y}
}

// ------------------------------------------------- //
// edgePoint = avg of two facePoints adjoining an edgePoint
// + two points that define the edge:
//   _ _ _ _ v1 _ _ _ _
//  |         |         |
//  |   F1 -- E -- F2   |
//  |         |         |
//   _ _ _ _ v2 _ _ _ _
// ------------------------------------------------- //
const findEdgePoint = (f1,f2) => {
  // Store the two common vertices
  // let matchingVertexes = {v1:{x:0,y:0},v2:{x:0,y:0}};
  const sharedVertices = [];
  // Place all face vertex values in an array
  // So that we can iterate over their indexes
  const f1Vertices = Object.values(f1.vertices);
  const f2Vertices = Object.values(f2.vertices);
  // Loop through both face's vertices to find match
  // Vertices of first face
  // 4 because of cube
  for (let a = 0; a < 4; a++) {
    // Current vertex of index a
    let v1 = {x:f1Vertices[a].x, y:f1Vertices[a].y}
    // console.log(v1);
    // Vertices of second face
    for (let b = 0; b < 4; b++) {
      // Current vertex of index a
      let v2 = {x:f2Vertices[b].x, y:f2Vertices[b].y}
      // console.log(v2);
      // Ternary operator to check for a shared edge vertex
      v1.x === v2.x && v1.y === v2.y ? sharedVertices.push(v2) : null;
    }
  }
  // Equation for edge points:
  // Avg of FacePoints + Shared Vertices
  const x = (f1.facePoint.x + f2.facePoint.x + sharedVertices[0].x + sharedVertices[1].x) / 4;
  const y = (f1.facePoint.y + f2.facePoint.y + sharedVertices[0].y + sharedVertices[1].y) / 4;
  // Push found shared midPoint for share edge to each face object
  f1.edgePoints.push({x:x,y:y});
  f2.edgePoints.push({x:x,y:y});
}

// ------------------------------------------------- //
// New vertices = avg of all facePoints & 2*(avg of all mid/edge points) + the original vertex
//   _ _ _ _ _ _ _ _ _ _
//  |         |         |
//  |    F    M    F    |
//  |      \  |  /      |
//  _ _ M _ _ P _ _ M _ _
//  |      /  |  \      |
//  |    F    M    F    |
//  |         |         |
//   _ _ _ _ _ _ _ _ _ _
// We find new vertices as depending on the subdivision
// Old vertices may offset a large amount
// ------------------------------------------------- //

// POINTER HELL
const newVertices = () => {

}
