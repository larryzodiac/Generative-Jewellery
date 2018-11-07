// ------------------------------------------------- //
// Evan MacHale - N00150552
// 07.11.18
// Three.js
// Subdivision functions for Catmull-Clark
// ------------------------------------------------- //
// Three uses what is known as loop subdivision.
// We want to use Catmull-Clark.
// ------------------------------------------------- //
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_subdivision.html
// https://github.com/mrdoob/three.js/blob/master/examples/js/modifiers/SubdivisionModifier.js
// ------------------------------------------------- //

// console.log(`catmull-clark.js loaded`);

// Can't be anonymous function.
// Why?
// const subdivisionModifier = (subdivisions) => {
//   this.subdivisions = (subdivisions === undefined) ? 1 : subdivisions;
// }

// Works
const subdivisionModifier = function(subdivisions) {
// function subdivisionModifier(subdivisions) {
  this.subdivisions = (subdivisions === undefined) ? 1 : subdivisions;
}

// ------------------------------------------------- //

// Inheritence
subdivisionModifier.prototype.modify = function(geometry) {
  geometry = geometry.clone();
  // Used to remove duplicate vertices in vertex array.
	// https://threejs.org/docs/#api/en/core/Geometry.fromBufferGeometry
	geometry.mergeVertices();
  //
  const iterations = this.subdivisions;
  for (let i = 0; i < iterations; i++) {
    this.subdivide(geometry);
  }
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	return geometry;
}

// ------------------------------------------------- //

subdivisionModifier.prototype.subdivide = (geometry) => {
  console.log(`success!`);

  const oldVertices = geometry.vertices;
  const oldFaces = geometry.faces;
  // The vars we use to redraw our geometry.
  let newVertices, newFaces;

  let edgePoints;
  let facePoints;
  let vertexPoints;

  /*
  Step 0
  Sort out our data structure for referencing points.
  */

  const metaVertices = new Array(oldVertices.length);
  const sourceEdges = {};
  generateLookups( oldVertices, oldFaces, metaVertices, sourceEdges );
}

  /*
  Step 1
  */

// ------------------------------------------------- //

// Here we add edge objects to our metaFaces variable
const generateLookups = (vertices, faces, metaVertices, edges) => {
  // for every vertex, add a new object w/ array of objects.
  for (let i = 0; i < vertices.length; i++) {
    metaVertices[i] = {edges:[]};
    // console.log({edges:[]});
  }
  // console.log(metaVertices);
  // console.log(faces);
  for (let i = 0; i < faces.length; i++) {
    face = faces[i];
    // Three edges of traingle.
    processEdge(face.a, face.b, vertices, edges, face, metaVertices);
    processEdge(face.b, face.c, vertices, edges, face, metaVertices);
    processEdge(face.c, face.a, vertices, edges, face, metaVertices);
  }
  console.log(metaVertices);
  console.log(vertices);
}

function processEdge( a, b, vertices, map, face, metaVertices ) {
  var vertexIndexA = Math.min( a, b );
  var vertexIndexB = Math.max( a, b );
  var key = vertexIndexA + "_" + vertexIndexB;
  var edge;
  if ( key in map ) {
    edge = map[ key ];
  } else {
    var vertexA = vertices[ vertexIndexA ];
    var vertexB = vertices[ vertexIndexB ];
    edge = {
      a: vertexA, // pointer reference
      b: vertexB,
      newEdge: null,
      // aIndex: a, // numbered reference
      // bIndex: b,
      faces: [] // pointers to face
    };
    map[ key ] = edge;
  }
  edge.faces.push( face );
  metaVertices[ a ].edges.push( edge );
  metaVertices[ b ].edges.push( edge );
}
