// ------------------------------------------------- //
// Evan MacHale - N00150552
// Working Three.js
// Starting Template
// ------------------------------------------------- //

// WebGL compatability check.
if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

// To display anything we need three things.
// The scene, camera + renderer.
// We want to render the scene with the camera.
// Three needs for Three.js
const init = () => {
  const scene = new THREE.Scene();

	const box = getBox(1, 1, 1);
	scene.add(box);

  // THREE.CameraType(FOV,aspectRatio,nearClipPlane,farClipPlane);
	const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Magic - Create our WebGL render instance.
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the renderer element to our HTML document.
	document.getElementById('webgl').appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Pass to implement our three needs.
  update(renderer, scene, camera, controls);

  // Return scene so we may access propreties.
	return scene;
}

// ------------------------------------------------- //
// Example Update Fucntion
// ------------------------------------------------- //

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

// ------------------------------------------------- //
// Example Get Box Fucntion
// ------------------------------------------------- //

const getBox = (w,h,d) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
	const mesh = new THREE.Mesh(geometry,material);
	return mesh;
}

const scene = init();
