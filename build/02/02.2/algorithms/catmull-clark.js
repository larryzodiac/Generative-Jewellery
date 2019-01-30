// ------------------------------------------------- //
// Evan MacHale - N00150552
// 26.11.18
// Three.js
// Adding UV's to the algorithms
// ------------------------------------------------- //

class SubdivisionModifier {
  constructor(subdivisions) {
    this.subdivisions = (subdivisions === undefined) ? 1 : subdivisions;
  }
}

// ------------------------------------------------- //

SubdivisionModifier.prototype.modify = function(geometry) {
  console.log('Source Geometry :');
  console.log(geometry);

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
  const sourceUvs = geometry.faceVertexUvs[0];

  // console.log(geometry);
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
  generateLookupsCat(sourceVertices, sourceFaces, sourceVerticesRelationships, sourceEdges);

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
    edgePoint.multiplyScalar(0.5);
    midPoint.addVectors(
      sourceEdges[`${currentEdge}`].a,
      sourceEdges[`${currentEdge}`].b
    );
    midPoint.multiplyScalar(0.5);
    sourceEdges[`${currentEdge}`].midPoint = midPoint; // Vertex point formula
    sourceEdges[`${currentEdge}`].edgePoint = edgePoint; // index in vertex list for face generation (a,b,c)
    edgePoints.push(edgePoint);
  }

  // console.log(sourceEdges);

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
  const newUVs = [];

  let uv, a, b, c;
  let e1 = new THREE.Vector2();
	let e2 = new THREE.Vector2();
  let e3 = new THREE.Vector2();
  let f = new THREE.Vector2();

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

    // ------------------------------------------------- //
    //                          x0
    //                         / \
    //                       /    \
    //                     /       \
    //                   /          \
    //               xe0  \        / xe2      // Creates three quads
    //               /      \ xf /    \
    //             /          |        \
    //           /           |          \
    //         /            |            \
    //      x1 - - - - - - xe1 - - - - - - x2
    // ------------------------------------------------- //

    // ------------------------------------------------- //
    //                          x0
    //                         / \
    //                       /  | \
    //                     /   |   \
    //                   /     |    \
    //               xe0  \   |    / xe2      // Need to divide quads into  two triangles
    //               /      \ xf /    \
    //             /       /  |  \     \
    //           /      /    |      \   \
    //         /    /       |         \  \
    //      x1 - - - - - - xe1 - - - - - - x2
    // ------------------------------------------------- //

    createNewFace(newFaces, face.a, edgePoint1, edgePoint3, facePoint);
    createNewFace(newFaces, face.b, edgePoint2, edgePoint1, facePoint);
    createNewFace(newFaces, face.c, edgePoint3, edgePoint2, facePoint);

    // create 4 new uv's
		uv = sourceUvs[i];

    a = uv[0];
    b = uv[1];
    c = uv[2];
    e1.set(midpoint(a.x, b.x), midpoint(a.y, b.y));
    e2.set(midpoint(b.x, c.x), midpoint(b.y, c.y));
    e3.set(midpoint(a.x, c.x), midpoint(a.y, c.y));
    f.set( (Math.abs(a.x + b.x + c.x)/3) , (Math.abs(a.y + b.y + c.y)/3) );
    // e1.set(newVertices[edgePoint1].x, newVertices[edgePoint1].y);
		// e2.set(newVertices[edgePoint2].x, newVertices[edgePoint2].y);
		// e3.set(newVertices[edgePoint3].x, newVertices[edgePoint3].y);
    // f.set(newVertices[facePoint].x, newVertices[facePoint].y);

    createNewUv(newUVs, a, e1, f);
    createNewUv(newUVs, a, e3, f);
    createNewUv(newUVs, b, e2, f);
    createNewUv(newUVs, b, e1, f);
    createNewUv(newUVs, c, e3, f);
    createNewUv(newUVs, c, e2, f);
  }

  // console.log(sourceEdges);

  // console.log(newVertices);
  // console.log(newFaces);

  console.log('Subdivided Geometry :');
  console.log(geometry);

  geometry.vertices = newVertices;
  geometry.faces = newFaces;
  geometry.faceVertexUvs[0] = newUVs;
}

// ------------------------------------------------- //
// console.log(`done`);
