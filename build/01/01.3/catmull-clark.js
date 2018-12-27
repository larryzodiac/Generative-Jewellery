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
  let newVertices, newFaces;
  // let facePoints; // First
  // let edgePoints; // Second
  // let vertexPoints; // third

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
    // E = 1/4 [F1 + F2 + P1, P1]
    currentEdge = edges[i];
    edgePoint.addVectors(
      sourceEdges[`${currentEdge}`].a,
      sourceEdges[`${currentEdge}`].b,
      sourceEdges[`${currentEdge}`].faces[0].facePoint,
      sourceEdges[`${currentEdge}`].faces[1].facePoint
    );
    edgePoint.multiplyScalar(0.25);
    sourceEdges[`${currentEdge}`].edgePoint = edgePoint;
  }

  /*
  Step 3
  Find vertexPoints
  */

  const vertexPoints = [];
  let connectingEdges;

  // console.log(sourceVertices);
  // console.log(sourceVerticesRelationships);

  // for (let i = 0; i < sourceVertices.length; i++) {
  for (let i = 0; i < 1; i++) {
    const vertexPoint = new THREE.Vector3();
    // V = 1/4 [Favg + 2Eavg, + V]
    connectingEdges = sourceVerticesRelationships[i].edges;
    // console.log(connectingEdges);
    const edgePointAvg = new THREE.Vector3();
    const facePointAvg = new THREE.Vector3();

    const duplicates = [];
    const facePointsSurroundingVertex = [];

    // 1
    for (let j = 0; j < connectingEdges.length; j++) { // should be 4
      // Favg
      // Add array of all facepoints
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

    console.log(facePointsSurroundingVertex);

    // if (duplicates.includes(currentFacePoint) === false) {
    //   facePointsSurroundingVertex.push(currentFacePoint);
    // }

    // // 2
    // for (let j = 0; j < connectingEdges.length; j++) { // should be 4
    //   // Favg
    //   // Then filter them out
    //   for (let k = 0; k < connectingEdges[j].faces.length; k++) { // 2
    //     console.log('-------------------');
    //     const currentFacePoint = new THREE.Vector3(
    //       connectingEdges[j].faces[k].facePoint.x,
    //       connectingEdges[j].faces[k].facePoint.y,
    //       connectingEdges[j].faces[k].facePoint.z
    //     );
    //     console.log(`currentFacePoint`);
    //     console.log(currentFacePoint);
    //     for (let l = 0; l < facePointsSurroundingVertex.length; l++) {
    //       const match = new THREE.Vector3(
    //         facePointsSurroundingVertex[l].x,
    //         facePointsSurroundingVertex[l].y,
    //         facePointsSurroundingVertex[l].z
    //       );
    //       console.log(`match`);
    //       console.log(match);
    //       if (currentFacePoint.equals(match)) {
    //         console.log('found match');
    //         console.log(match);
    //         facePointsSurroundingVertex.splice(l,1);
    //         break;
    //       } else {
    //         console.log(`not a match`);
    //       }
    //     }
    //   }
    // }

    // console.log(facePointsSurroundingVertex);

    for (let i = 0; i < connectingEdges.length; i++) {
      // 2Eavg
      edgePointAvg.add(connectingEdges[i].edgePoint);
      edgePointAvg.multiplyScalar(2);
    }
    // console.log(edgePointAvg);

  }
  // // Keep track of every connecting variable to our given point.
  // let connectingEdge, connectingPoint, connectingEdges;
  // // We iterate through oldVertices + push new vertices to array.
  // let oldVertex, newSourceVertex;
  // // List of new positions for old vertices.
  // const newSourceVertices = [];
  //
  // for (let i = 0; i < oldVertices.length; i++) {
  //   oldVertex = oldVertices[i];
  //   // find all connecting edges (using lookupTable)
  //   connectingEdges = metaVertices[i].edges;
  //   const numberOfConnectingEdges = connectingEdges.length;
  //   // Loop's original beta formula
  //   // beta = 1 / n * ( 5/8 - Math.pow( 3/8 + 1/4 * Math.cos( 2 * Math. PI / n ), 2) );
  //   beta = 3 / (8 * numberOfConnectingEdges);
  //   connectingVertexWeight = beta;
  //   sourceVertexWeight = 1 - numberOfConnectingEdges * beta;
  //   // Source with connecting points around it.
  //   // Apply weight to source vertex.
  //   newSourceVertex = oldVertex.clone().multiplyScalar(sourceVertexWeight); // 1 - nβ
  //   // For each edge, find each point that this point is related to.
  //   vertexHolder.set(0, 0, 0);
  //   for (let j = 0; j < numberOfConnectingEdges; j++) {
  //     connectingEdge = connectingEdges[j];
  //     connectingPoint = connectingEdge.a !== oldVertex ? connectingEdge.a : connectingEdge.b;
  //     vertexHolder.add(connectingPoint);
  //   }
  //   // Apply weight to connecting vertices.
  //   vertexHolder.multiplyScalar(connectingVertexWeight); // β
  //   newSourceVertex.add(vertexHolder);
  //   // List of new positions for old vertices.
  //   newSourceVertices.push(newSourceVertex);
  // } // End for loop.

}

// ------------------------------------------------- //
// console.log(`done`);
