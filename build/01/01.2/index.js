// ------------------------------------------------- //
// Evan MacHale - N00150552
// 07.11.18
// Three.js
// Subdivision of a box geometry.
// ------------------------------------------------- //
// This example uses our own subdivision functions.
// Get rid of html link to Three modifier library.
// We create our own file using Catmull-Clark algorithm.
// ------------------------------------------------- //
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_subdivision.html
// https://github.com/mrdoob/three.js/blob/master/examples/js/modifiers/modifier.js
// ------------------------------------------------- //

let scene, camera, controls, renderer;

let geometry, material, mesh, smooth;

let subdivisions = 1;

// WebGL compatability check.
if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

// ------------------------------------------------- //
// Draw Fucntion
// ------------------------------------------------- //

// Runtime
const draw = () => {
  scene = new THREE.Scene();

  // THREE.CameraType(FOV,aspectRatio,nearClipPlane,farClipPlane);
	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
	camera.position.x = 1;
	camera.position.y = 1.5;
	camera.position.z = 3.5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Add geometry in place of old/undefined geometry
  generateSubdivision();

  // Magic - Create our WebGL render instance.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the renderer element to our HTML document.
	document.getElementById('webgl').appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableKeys = false;

  // Pass to implement our three needs.
  update(renderer, scene, camera, controls);

  // So I can view the mesh propreties.
  // console.log(`Scene children array[0] geometry':`);
  // console.log(scene.children[0].geometry);

  // Return scene so we may access propreties.
	return scene;
}

// ------------------------------------------------- //
// Update Fucntion
// ------------------------------------------------- //

// Animation loop.
const update = (renderer, scene, camera, controls) => {
  // We want to render the scene with the camera.
  renderer.render(
		scene,
		camera
	);

  // Oribit changes will update the rendered scene.
	controls.update();

  // Without a render loop we wouldn't see anything.
  // Causes the renderer to draw the scene every time the screen is refreshed (60 fps).
  // requestAnimationFrame pauses when we switch tab.
	requestAnimationFrame( function() {
		update(renderer, scene, camera, controls);
	});
}

// Handy jQuery for scalable window.
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
        case 'ArrowUp': nextSubdivision(1);
        break;
        case 'ArrowDown': nextSubdivision(-1)
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// Subdivision count.
const nextSubdivision = (s) => {
  // pass either 1 or -1
  // Max number between 0, s
  // Can only be zero or positive number
  subdivisions = Math.max(0, subdivisions + s);
  // console.log(subdivisions);
  generateSubdivision();
}

// ------------------------------------------------- //
// Subdivision Fucntion
// ------------------------------------------------- //

// Invoke subdivision modifier.
const generateSubdivision = () => {
  // If mesh is defined.
  if ( mesh !== undefined ) {
    // Removes The object from memory.
    // So we can replace it with new object.
    geometry.dispose();
    smooth.dispose();
    scene.remove(mesh);
  }
  // Invoke subdivision helper.
  // const subdivisionModifier = new THREE.SubdivisionModifier(subdivisions);
  const modifier = new subdivisionModifier(subdivisions);
  // New geometry to be added in place of the old.
  // N.B With new level of subdivision.
  geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.name = `Evan's Geometry`;
  material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
  // Scaling
  const params = geometry.parameters;
  if ( params.scale ) {
    geometry.scale( params.scale, params.scale, params.scale );
  }
  // Smoothing
  // Smooth out the shape ~ adding more vertices.
  smooth = modifier.modify(geometry);
  // const faceIndices = ['a','b','c'];
  // for (let i = 0; i < smooth.faces.length; i++) {
  //   let face  = smooth.faces[ i ];
  //   // 3 for face indices x, y, z.
  //   for (let j = 0; j < 3; j ++) {
  //     let vertexIndex = face[faceIndices[j]];
  //     let vertex = smooth.vertices[vertexIndex];
  //   }
  // }
  // // Adding to scene.
  // mesh = new THREE.Mesh(smooth,material);
  // mesh.scale.setScalar(params.meshScale ? params.meshScale : 1);
  // mesh.name = `Evan's Box`;
  // scene.add(mesh);
}

// ------------------------------------------------- //

// Place scene in instance.
// Taking notes from p5
// https://github.com/processing/p5.js/wiki/Global-and-instance-mode
scene = draw();
