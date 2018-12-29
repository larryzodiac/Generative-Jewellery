// ------------------------------------------------- //
// Evan MacHale - N00150552
// 24.11.18
// Three.js
// Subdivision functions for Catmull-Clark
// ------------------------------------------------- //
// Three uses what is known as loop subdivision.
// We want to use Catmull-Clark.
// ------------------------------------------------- //
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_subdivision.html
// https://github.com/mrdoob/three.js/blob/master/examples/js/modifiers/SubdivisionModifier.js
// ------------------------------------------------- //

class SubdivisionModifier {
  constructor(subdivisions) {
    this.subdivisions = (subdivisions === undefined) ? 1 : subdivisions;
  }
}

// ------------------------------------------------- //

// Inheritence
SubdivisionModifier.prototype.modify = function(geometry) {
  geometry = geometry.clone();
	geometry.mergeVertices();
  const iterations = this.subdivisions;
  for (let i = 0; i < iterations; i++) {
    this.subdivide(geometry);
  }
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	return geometry;
}

// ------------------------------------------------- //

SubdivisionModifier.prototype.subdivide = function(geometry) {

  const sourceVertices = geometry.vertices;
  const sourceFaces = geometry.faces;
  // console.log(sourceVertices);
  // console.log(sourceFaces);
  // The vars we use to redraw our geometry.
  // let facePoints; // First
  // let edgePoints; // Second
  // let vertexPoints; // third
  // let newVertices, newFaces; // Last

  /*
  Step 0
  Sort out our data structure for referencing points.
  */

  const sourceVerticesRelationships = new Array(sourceVertices.length);
  const sourceEdges = []; // associative array.
  generateLookups(sourceVertices, sourceFaces, sourceVerticesRelationships, sourceEdges);

  /*
  Step 1
  Find facePoints
  */

  const facePoints = [];
  let currentFace;

  for (let i = 0; i < sourceFaces.length; i++) {
    const facePoint  = new THREE.Vector3();
    // n = number of points on face -> 3.
    // F = 1/n [Pn + Pn + ...]
    currentFace = new THREE.Triangle(
      sourceVertices[sourceFaces[i].a],
      sourceVertices[sourceFaces[i].b],
      sourceVertices[sourceFaces[i].c]
    );
    currentFace.getMidpoint(facePoint); // Result copied into facePoint.
    facePoints.push(facePoint);
  }

  /*
  Step 2
  Find edgePoints
  */

  const edgePoints = [];
  let currentEdge;

  const edges = Object.keys(sourceEdges);
  // console.log(Object.keys(sourceEdges).length); // associative array

  for (let i = 0; i < edges.length; i++) {
    const edgePoint  = new THREE.Vector3();
    const midPoint = new THREE.Vector3();
    // E = 1/4 [F1 + F2 + P1, P1]
    currentEdge = edges[i];
    edgePoint.addVectors(
      sourceEdges[`${currentEdge}`].a,
      sourceEdges[`${currentEdge}`].b,
      sourceEdges[`${currentEdge}`].faces[0].facePoint,
      sourceEdges[`${currentEdge}`].faces[1].facePoint
    );
    edgePoint.multiplyScalar(0.25);
    midPoint.addVectors(
      sourceEdges[`${currentEdge}`].a,
      sourceEdges[`${currentEdge}`].b
    );
    midPoint.multiplyScalar(0.5);
    sourceEdges[`${currentEdge}`].midPoint = midPoint; // Vertex point formula
    sourceEdges[`${currentEdge}`].edgePoint = edgePoint; // index in vertex list for face generation (a,b,c)
    edgePoints.push(edgePoint);
  }

  console.log(sourceEdges);

  /*
  Step 3
  Find vertexPoints
  */

  const vertexPoints = [];
  let connectingEdges;

  // console.log(sourceVertices);
  // console.log(sourceVerticesRelationships);

  for (let i = 0; i < sourceVertices.length; i++) {
  // for (let i = 0; i < 1; i++) {
    const vertexPoint = new THREE.Vector3();
    vertexPoint.add(sourceVertices[i]);
    // V = 1/4 [Favg + 2Eavg, + V]
    connectingEdges = sourceVerticesRelationships[i].edges;
    // console.log(connectingEdges);
    // const edgePointAvg = new THREE.Vector3();
    const midPointAvg = new THREE.Vector3();
    const facePointAvg = new THREE.Vector3();

    const facePointsSurroundingVertex = [];

    for (let j = 0; j < connectingEdges.length; j++) { // should be 4
      // Favg Setup
      // Add array of all facepoints for every edge (Results doubles)
      for (let k = 0; k < connectingEdges[j].faces.length; k++) { // 2
        const currentFacePoint = new THREE.Vector3(
          connectingEdges[j].faces[k].facePoint.x,
          connectingEdges[j].faces[k].facePoint.y,
          connectingEdges[j].faces[k].facePoint.z
        );
        // Includes does not work, WHY?
        // if (facePointsSurroundingVertex.includes(currentFacePoint) === false) {
        //   facePointsSurroundingVertex.push(currentFacePoint);
        // }
        // Coded below instead....
        let match = false;
        let index;
        for (let l = 0; l < facePointsSurroundingVertex.length; l++) {
          if (facePointsSurroundingVertex[l].equals(currentFacePoint)) {
            match = true;
            index = l;
          }
        }
        facePointsSurroundingVertex.push(currentFacePoint);
        if (match === true) {
          facePointsSurroundingVertex.splice(index,1);
        }
      }
    }

    /*
    V = [Favg + 2MidPointAvg + (n-3)V] / n
    */

    for (let i = 0; i < connectingEdges.length; i++) {
      // 2Eavg
      // edgePointAvg.add(connectingEdges[i].edgePoint);
      // is actually 2Mavg
      midPointAvg.add(connectingEdges[i].midPoint);
      // Favg
      facePointAvg.add(facePointsSurroundingVertex[i]);
    }
    const weight = (facePointsSurroundingVertex.length - 3) // (n-3)
    console.log(weight);
    vertexPoint.multiplyScalar(weight);
    // edgePointAvg.multiplyScalar(1/connectingEdges.length);
    // edgePointAvg.multiplyScalar(2);
    midPointAvg.multiplyScalar(1/connectingEdges.length);
    midPointAvg.multiplyScalar(2);
    facePointAvg.multiplyScalar(1/facePointsSurroundingVertex.length);
    // console.log(edgePointAvg);
    // console.log(facePointAvg);
    // V = 1/4 [Favg + 2Eavg, + V]
    vertexPoint.add(midPointAvg);
    vertexPoint.add(facePointAvg);
    vertexPoint.divideScalar(facePointsSurroundingVertex.length);
    vertexPoints.push(vertexPoint);
  }

  /*
  Step 4
  Redraw geometry
  */

  const newVertices = vertexPoints.concat(edgePoints,facePoints);
  const newFaces = [];

  // console.log(newVertices);
  // console.log(sourceEdges);
  // console.log(sourceFaces);

  for (let i = 0; i < sourceFaces.length; i++) {
  // for (let i = 0; i < 1; i++) {
    const face = sourceFaces[i];

    const edgePoint1 = getEdgePoint(face.a, face.b, sourceEdges, edgePoints) + sourceVertices.length;
    const edgePoint2 = getEdgePoint(face.b, face.c, sourceEdges, edgePoints) + sourceVertices.length;
    const edgePoint3 = getEdgePoint(face.c, face.a, sourceEdges, edgePoints) + sourceVertices.length;
    // console.log(edgePoint1);
    // console.log(edgePoint2);
    // console.log(edgePoint3);

    const facePoint = getFacePoint(face.a, face.b, face.c, sourceEdges, facePoints) + sourceVertices.length + edgePoints.length;
    // console.log(facePoint);
    /*
    Problem here.
    Using Catmull for ARBITRARY shapes, all faces after the first iteration become quads.
    This is a problem as THREE.Face4 has been depreciated in the new Three.js build
    The solution will be to draw a quad using two triangles, ughhhh kill me.
    */

    createNewFace(newFaces, face.a, edgePoint1, edgePoint3, facePoint);
    createNewFace(newFaces, face.b, edgePoint2, edgePoint1, facePoint);
    createNewFace(newFaces, face.c, edgePoint3, edgePoint2, facePoint);
  }

  // console.log(sourceEdges);

  // console.log(newVertices);
  // console.log(newFaces);

  geometry.vertices = newVertices;
  geometry.faces = newFaces;
}

// ------------------------------------------------- //
// console.log(`done`);
