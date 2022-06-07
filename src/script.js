import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


//Break

const colorBg = '#212121'
const colorWire = '#18FFFF'

const closeDist = 0.1
const farDist = 1000

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	closeDist,
	farDist
)
camera.position.z = farDist

const renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true
})
renderer.setClearColor(colorBg, 0)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement)


const group = new THREE.Group()
const typoLoader = new THREE.FontLoader()
const createTypo = font => {
	const word = "test"
	const typoSize = 40
	const typoProperties = {
		font: font,
		size: typoSize,
		height: typoSize * 3,
		curveSegments: 1,
		bevelEnabled: true,
		bevelThickness: 0.1,
		bevelSize: 2,
		bevelOffset: 0,
		bevelSegments: 3
	}
	const textMesh = new THREE.Mesh()
	
	textMesh.geometry = new THREE.TextBufferGeometry(word, typoProperties)
	textMesh.material =  new THREE.MeshBasicMaterial({ 
		color: (colorWire),
		wireframe: true,
	})
	
	
    textMesh.geometry.computeBoundingBox()
	textMesh.geometry
		.boundingBox
		.getCenter(textMesh.position)
		.multiplyScalar(-1)
	
	
	textMesh.matrixAutoUpdate = false
	textMesh.updateMatrix()

	group.add(textMesh)
}
typoLoader.load(
	"https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
	createTypo
);
scene.add(group)


let mouseX = 0
const mouseFX = {
	windowHalfX: window.innerWidth / 2,
	coordinates: function(coordX) {
		mouseX = coordX - mouseFX.windowHalfX		
		mouseX = mouseX < 0 ? Math.abs(mouseX) : mouseX
	},
	onMouseMove: function(e) {
		mouseFX.coordinates(e.clientX)
	},
	onTouchMove: function(e) {
		const touchX = e.changedTouches[0].clientX * 2
		mouseFX.coordinates(touchX)
	}
}
document.addEventListener("mousemove", mouseFX.onMouseMove, false)
document.addEventListener("touchmove", mouseFX.onTouchMove, false)


const render = () => {
	requestAnimationFrame(render)

	
	const ct = 0.05
	const pZ = (mouseX - camera.position.z) * ct
	camera.position.z += pZ		

	
	const radians = Date.now() * 0.0005
	const rot = Math.sin(radians) * 0.1
	group.rotation.x = rot
	group.rotation.y = rot

	renderer.render(scene, camera)
}
render()
