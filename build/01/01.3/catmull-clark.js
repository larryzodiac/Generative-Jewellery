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
  // generateLookups( oldVertices, oldFaces, metaVertices, sourceEdges );
}

// ------------------------------------------------- //
