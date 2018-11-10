// ------------------------------------------------- //
// Evan MacHale - N00150552
// 10.11.18
// Three.js
// Subdivision functions prep for Catmull-Clark
// ------------------------------------------------- //
// Three uses what is known as loop subdivision.
// We want to use Catmull-Clark.
// We create our own file to study loop algorithm.
// Understand maths, threejs principles + algorithm.
// ------------------------------------------------- //
// Original @author zz85 / https://github.com/zz85
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_subdivision.html
// https://github.com/mrdoob/three.js/blob/master/examples/js/modifiers/SubdivisionModifier.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// ------------------------------------------------- //

// Can't be anonymous function.
// Why?
// const subdivisionModifier = (subdivisions) => {
//   this.subdivisions = (subdivisions === undefined) ? 1 : subdivisions;
// }
// Below works

// Constructor for class.
// Traditional function-based "classes":
// Later we may switch to ES6 classes after we fully understand.
const subdivisionModifier = function(subdivisions) {
  this.subdivisions = (subdivisions === undefined) ? 1 : subdivisions;
}

// ------------------------------------------------- //

// Prototype-based inheritance
subdivisionModifier.prototype.modify = function(geometry) {
  // Replicate the geometry.
  // We do this because when we subdivide,
  // we do so from the source geometry.
  geometry = geometry.clone();
  // Used to remove duplicate vertices in vertex array.
	// https://threejs.org/docs/#api/en/core/Geometry.fromBufferGeometry
	geometry.mergeVertices();
  // From source geometry, perform num of subdivisions.
  for (let i = 0; i < this.subdivisions; i++) {
    this.subdivide(geometry);
  }
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	return geometry;
}

// ------------------------------------------------- //

// The big boy function that executes our algorithm.
subdivisionModifier.prototype.subdivide = (geometry) => {
  // Geometry passed to these variables
  // Vertices and faces are all we need.
  const oldVertices = geometry.vertices;
  const oldFaces = geometry.faces;

  // We will push these two to the geometry at the end.
  // A geometry needs vertices and faces.
  let newVertices, newFaces;

  // Vertex holder used when we want to add vetices togethor.
  const vertexHolder = new THREE.Vector3();

  // ------------------------------------------------- //
  // Step 0
  // Sort out our data structure for referencing points.
  // ------------------------------------------------- //

  // ------------------------------------------------- //
  // In loop subdivision, we divide up traingles.
  // We need to keep track of original points from old geometry.
  // Draw mid points on all edges.
  // Reposition old points as new points.
  // Then connect them all up.
  // We create two variables to do this:
  // 1. metaVertices to hold all info for all points.
  // 2. sourceEdges to keep a list of edges and all info for them.
  // All info consists of edges, vertices, faces.
  // We use sourceEdges to find our mid points.
  // We use metaVertices to reposition old vertices.
  // ------------------------------------------------- //

  // metaVertices will correspond to oldVertices
  // metaVertices will hold reference to all edges that come out of a point,
  // and thus the points that a shared on those edges, and their faces.
  const metaVertices = new Array(oldVertices.length);
  // sourceEdges will keep a list of ALL edges w/ two vertices + two faces.
  const sourceEdges = {};
  // This function will set up info for all points.
  generateLookups(oldVertices, oldFaces, metaVertices, sourceEdges);
  // console.log(metaVertices);
  // After generateLookups()
  // oldVertices[0] -> x,y,z -> our point.
  // metaVertices[0] -> array of objects that point to every edge, face + vertex the point shares.

  // ------------------------------------------------- //
  // Step 1
  // For each edge, create a new Edge Vertex, then position it.
  // ------------------------------------------------- //

  // This part of our function uses some of the algorithm weight constants
  // They are used mathematically to find edgePoints
  const newEdgeVertices = [];
  // To find adjacent points we must loop through each face (a,b,c) and find
  // the last point that doesn't match the a, b points on the edge.
  let oppositePoint;
  // Equation weights
  // Every edge in the source mesh has two adjacent faces with opposite vertices.
  // Each edge also has two connected vertices on the edge.
  // ------------------------------------------------- //
  //              oppP1
  //             /   \
  //           /       \
  //         /           \
  //      .a _ _ _ x _ _ _ .b    // x is the new edge point.
  //         \           /
  //           \       /
  //             \   /
  //              oppP2
  // ------------------------------------------------- //
  let newEdgePoint;
  const adjacentVertexWeight = 1 / 8;
  const edgeVertexWeight = 3 / 8;
  // Keep track of edge/faces of edge.
  let currentEdge;
  let face;
  let connectedFaces; // Always be 2.
  // Faces held in geometry object have three vectors of key a, b or c.
  const faceVertices = ['a','b','c'];
  // For each edge create new edge point.
  for (i in sourceEdges) {
    currentEdge = sourceEdges[i];
    newEdgePoint = new THREE.Vector3();
    connectedFaces = currentEdge.faces.length;
    // Average of points on the edge
    newEdgePoint.addVectors(currentEdge.a, currentEdge.b).multiplyScalar(edgeVertexWeight);
    vertexHolder.set(0, 0, 0);
    // For both faces, for every point on given face, find the third point.
    for (let j = 0; j < connectedFaces; j ++) {
      face = currentEdge.faces[j];
      for (let k = 0; k < 3; k ++) {
        oppositePoint = oldVertices[face[faceVertices[k]]]; // a, b, c
        if (oppositePoint !== currentEdge.a && oppositePoint !== currentEdge.b) break;
      }
      vertexHolder.add(oppositePoint);
    }
    // Average of two opposite points
    vertexHolder.multiplyScalar(adjacentVertexWeight);
    // Combine values of edge and opposite points to find new point.
    newEdgePoint.add(vertexHolder);
    // Keeps count of creation order.
    currentEdge.newEdgePoint = newEdgeVertices.length;
    newEdgeVertices.push(newEdgePoint); // List of edge points.
  } // End for loop.

  // ------------------------------------------------- //
  // Step 2
  // Reposition each source vertex.
  // ------------------------------------------------- //

  // Keep track of every connecting variable to our given point.
  let connectingEdge, connectingPoint, connectingEdges;
  // We iterate through oldVertices + push new vertices to array.
  let oldVertex, newSourceVertex;
  // List of new positions for old vertices.
  const newSourceVertices = [];

  // This is like step 1, except we don't have to find new points,
  // only reposition the old source vertices.
  // This is largely formulae work.
  // We simply need to find all points around then apply weight.
  // Each connecting point on an edge around the vertex is given the weight Beta.
  // The source vertex is given a differnt weight below.
  let beta, sourceVertexWeight, connectingVertexWeight; // Algorithm weights
  // ------------------------------------------------- //
  //      β _ _ _ _ _ _ β
  //       \           /
  //         \       /            // Beta(β)
  //           \   /
  //             β
  // ------------------------------------------------- //
  for (let i = 0; i < oldVertices.length; i++) {
    oldVertex = oldVertices[i];
    // find all connecting edges (using lookupTable)
    connectingEdges = metaVertices[i].edges;
    const numberOfConnectingEdges = connectingEdges.length;
    // Loop's original beta formula
    // beta = 1 / n * ( 5/8 - Math.pow( 3/8 + 1/4 * Math.cos( 2 * Math. PI / n ), 2) );
    beta = 3 / (8 * numberOfConnectingEdges);
    connectingVertexWeight = beta;
    sourceVertexWeight = 1 - numberOfConnectingEdges * beta;
    // Source with connecting points around it.
    // ------------------------------------------------- //
    //         β - - - - - - β
    //       /  \           /  \        // Algorithm equation weights.
    //     /      \       /      \      // β(Beta) = 3 / (8 * n)
    //   /          \   /          \    // s = 1 - nβ
    //  β - - - - - - S - - - - - - β
    //   \          /   \          /
    //     \      /       \      /
    //       \  /           \  /
    //         β - - - - - - β
    // ------------------------------------------------- //
    // Apply weight to source vertex.
    newSourceVertex = oldVertex.clone().multiplyScalar(sourceVertexWeight); // 1 - nβ
    // For each edge, find each point that this point is related to.
    vertexHolder.set(0, 0, 0);
    for (let j = 0; j < numberOfConnectingEdges; j++) {
      connectingEdge = connectingEdges[j];
      connectingPoint = connectingEdge.a !== oldVertex ? connectingEdge.a : connectingEdge.b;
      vertexHolder.add(connectingPoint);
    }
    // Apply weight to connecting vertices.
    vertexHolder.multiplyScalar(connectingVertexWeight); // β
    newSourceVertex.add(vertexHolder);
    // List of new positions for old vertices.
    newSourceVertices.push(newSourceVertex);
  } // End for loop.

  // ------------------------------------------------- //
  // Step 3
  // Generate faces between source vertices + edge vertices.
  // ------------------------------------------------- //

  // New big array of all repositioned old vertices and created edge vertices.
  // These are the new vertices we will re-draw the geometry with.
  // ------------------------------------------------- //
  //      s _ __ e __ _ s
  //       \    / \    /
  //         e - - - e       // Four smaller traingles inside.
  //           \   /         // Subdivision!!!
  //             s
  // ------------------------------------------------- //
  newVertices = newSourceVertices.concat(newEdgeVertices);
  const sl = newSourceVertices.length;
  let edge1, edge2, edge3;
  newFaces = [];
  // For all old faces create four new faces inside it.
  // Four faces -> means three more edges, see above.
  for (let i = 0; i < oldFaces.length; i++) {
    face = oldFaces[i];
    // find the 3 new edges vertex of each old face
    edge1 = getEdge(face.a, face.b, sourceEdges).newEdgePoint + sl;
    edge2 = getEdge(face.b, face.c, sourceEdges).newEdgePoint + sl;
    edge3 = getEdge(face.c, face.a, sourceEdges).newEdgePoint + sl;
    // create 4 faces.
    newFace(newFaces, edge1, edge2, edge3);
    newFace(newFaces, face.a, edge1, edge3);
    newFace(newFaces, face.b, edge2, edge1);
    newFace(newFaces, face.c, edge3, edge2);
  } // End for loop
  // Overwrite old arrays
  geometry.vertices = newVertices;
  geometry.faces = newFaces;
  // console.log('done');
}

// ------------------------------------------------- //
// Utility functions
// ------------------------------------------------- //

// Here we add info objects to our metaVertices variable
// This keeps track of a vertex's relationships to it's connecting vertices.
// i.e one vertex will have several edges coming out of it.
// It will also have a second point sharing the opposite end of that edge.
const generateLookups = (oldVertices, oldFaces, metaVertices, sourceEges) => {
  // for every vertex, add a new object w/ array of objects.
  for (let i = 0; i < oldVertices.length; i++) {
    metaVertices[i] = {edges:[]};
  }
  for (let i = 0; i < oldFaces.length; i++) {
    // Three edges of traingle.
    // ------------------------------------------------- //
    //    .a _ _ _ 1 _ _ _ .b
    //       \           /
    //       3 \       / 2          // Processing
    //           \   /
    //            .c
    // ------------------------------------------------- //
    processEdge(oldFaces[i].a, oldFaces[i].b, oldVertices, sourceEges, oldFaces[i], metaVertices);
    processEdge(oldFaces[i].b, oldFaces[i].c, oldVertices, sourceEges, oldFaces[i], metaVertices);
    processEdge(oldFaces[i].c, oldFaces[i].a, oldVertices, sourceEges, oldFaces[i], metaVertices);
  }
}

// ------------------------------------------------- //

// processEdge puts all edge objects into metaVertices
// Each edge object holds vertices of the edge and the two faces.
const processEdge = (v1, v2, oldVertices, sourceEdges, currentFace, metaVertices) => {
  const vertexIndexA = Math.min(v1, v2);
  const vertexIndexB = Math.max(v1, v2);
  const key = vertexIndexA + "_" + vertexIndexB;
  let edge;
  // If edge already exists... our edge var equals that edge.
  // Remember, each edge has two faces...
  // We cross-reference sourceEges with our current vertices.
  if (key in sourceEdges) { // key:value
    edge = sourceEdges[key];
  } else {
    const vertexA = oldVertices[vertexIndexA];
    const vertexB = oldVertices[vertexIndexB];
    edge = {
      a: vertexA, // pointer reference
      b: vertexB,
      newEdgePoint: null,
      // aIndex: a, // numbered reference
      // bIndex: b,
      faces: [] // pointers to faces
    };
    // Give the edge the info
    sourceEdges[key] = edge;
  }
  // Then give the edge the current face
  // ------------------------------------------------- //
  //         /\
  //       /    \
  //     /   F1   \       // create edge object if not existing.
  //   .a - - - - .b      // push the faces to edge.
  //     \   F2   /       // Add edge to metaVertices for both points.
  //       \    /
  //         \/
  // ------------------------------------------------- //
  edge.faces.push(currentFace);
  // For both points on the edge, give them the edge info.
  metaVertices[v1].edges.push(edge);
  metaVertices[v2].edges.push(edge);
}

// ------------------------------------------------- //
// These three functions used in step 3
// Drawing faces for repositioned + new source vertices.

const getEdge = (a, b, sourceEdges) => {
  const vertexIndexA = Math.min(a, b);
  const vertexIndexB = Math.max(a, b);
  const key = vertexIndexA + "_" + vertexIndexB;
  return sourceEdges[key];
}

const newFace = (newFaces, a, b, c, materialIndex) => newFaces.push(new THREE.Face3(a, b, c, undefined, undefined, materialIndex));

const midpoint = (a, b) => (Math.abs(b - a) / 2) + Math.min(a, b);
