// ------------------------------------------------- //
// Evan MacHale - N00150552
// Working Three.js
// Basic subdivision of a box geometry.
// ------------------------------------------------- //
// This example uses Three's subdivision modifier utility.
// The purpose of this exercise is to observe how
// Three is used to manipulate geometries
// with relation to the algorithm.
// ------------------------------------------------- //
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_subdivision.html
// https://github.com/mrdoob/three.js/blob/master/examples/js/modifiers/SubdivisionModifier.js
// ------------------------------------------------- //

let scene, camera, controls, renderer;

let geometry, material, mesh, smooth;

let subdivisions = 0;

// WebGL compatability check.
if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

// ------------------------------------------------- //
// Draw Fucntion
// ------------------------------------------------- //

const draw = () => {
  scene = new THREE.Scene();

  // THREE.CameraType(FOV,aspectRatio,nearClipPlane,farClipPlane);
	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

  subdivide();

  // Magic - Create our WebGL render instance.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the renderer element to our HTML document.
	document.getElementById('webgl').appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Pass to implement our three needs.
  update(renderer, scene, camera, controls);

  // Return scene so we may access propreties.
	return scene;
}

// ------------------------------------------------- //
// Update Fucntion
// ------------------------------------------------- //

const update = (renderer, scene, camera, controls) => {
  // We want to render the scene with the camera.
  renderer.render(
		scene,
		camera
	);

  // Oribit changes will update the rendered scene.
	controls.update();
  // Little cool animate?
  mesh.rotation.y += 0.01;

  // Without a render loop we wouldn't see anything.
  // Causes the renderer to draw the scene every time the screen is refreshed (60 fps).
  // requestAnimationFrame pauses when we switch tab.
	requestAnimationFrame( function() {
		update(renderer, scene, camera, controls);
	});
}

// Handy jquery for scalable window.
$(window).resize(function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});

// ------------------------------------------------- //
// Next Subdivision Fucntions
// ------------------------------------------------- //

// Modern jQuery key detection.
$(document).keydown(function(e) {
    switch(e.key) {
        case 's': nextSubdivision(1);
        break;
        case 'd': nextSubdivision(-1)
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// Subdivision count.
const nextSubdivision = (s) => {
  subdivisions = Math.max(0, subdivisions + s );
  subdivide();
}

// ------------------------------------------------- //
// Subdivide Fucntion
// ------------------------------------------------- //

// Invoke subdivision modifier.
const subdivide = () => {
  // Is the mesh undefined?
  if ( mesh !== undefined ) {
    geometry.dispose();
    smooth.dispose();
    scene.remove( mesh );
  }
  // Invoke subdivision helper.
  const subdivisionModifier = new THREE.SubdivisionModifier(subdivisions);
  // New geometry to be added in place of the old.
  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
  // Scaling
  const params = geometry.parameters;
  if ( params.scale ) {
    geometry.scale( params.scale, params.scale, params.scale );
  }
  // Smoothing
  smooth = subdivisionModifier.modify(geometry);
  const faceIndices = ['a','b','c'];
  for (let i = 0; i < smooth.faces.length; i++) {
    let face  = smooth.faces[ i ];
    // 3
    for (let j = 0; j < 3; j ++) {
      let vertexIndex = face[faceIndices[j]];
      let vertex = smooth.vertices[vertexIndex];
    }
  }
  // Adding
  mesh = new THREE.Mesh(smooth,material);
  mesh.scale.setScalar(params.meshScale ? params.meshScale : 1);
  scene.add(mesh);
}

// ------------------------------------------------- //

// Place scene in instance.
scene = draw();
