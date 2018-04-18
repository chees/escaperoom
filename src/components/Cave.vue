<template>
  <div class="cave" ref="cave">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
// import { Water } from '@/Water';

export default Vue.extend({
  name: 'Cave',
  data() {
    return {
      controls: null as OrbitControls | null,
    };
  },
  methods: {
  },
  mounted() {
    const scene = new THREE.Scene();

    const loader = new THREE.CubeTextureLoader();
    loader.setPath('/img/textures/');
    scene.background = loader.load([
      'skybox-2.jpg', 'skybox-0.jpg',
      'skybox-5.jpg', 'skybox-1.jpg',
      'skybox-4.jpg', 'skybox-3.jpg',
    ]);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 5;

    this.controls = new OrbitControls(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    (this.$refs.cave as HTMLElement).appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(3, 3, 3);

    const texture = new THREE.TextureLoader().load('/img/textures/ar-marker.jpg');

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(5, 3, 0);
    scene.add(cube);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.add(light);

    // Water
    // const waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
    // const water = new Water(
    //   waterGeometry,
    //   {
    //     textureWidth: 512,
    //     textureHeight: 512,
    //     waterNormals: new THREE.TextureLoader().load('/img/textures/waternormals.jpg', (t) => {
    //       t.wrapS = t.wrapT = THREE.RepeatWrapping;
    //     }),
    //     alpha: 1.0,
    //     sunDirection: light.position.clone().normalize(),
    //     sunColor: 0xffffff,
    //     waterColor: 0x001e0f,
    //     distortionScale:  3.7,
    //     fog: scene.fog !== undefined,
    //   },
    // );
    // water.rotation.x = - Math.PI / 2;
    // scene.add(water);

    const animate = () => {
      if (!this.$refs.cave) { return; }
      requestAnimationFrame(animate);

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      this.controls!.update();

      renderer.render(scene, camera);
    };

    animate();
  },
  beforeDestroy() {
    // TODO dispose of all the THREE stuff
    // https://stackoverflow.com/a/33199591/188947
    this.controls!.dispose();
  },
});
</script>

<style scoped>
.cave {
  position: absolute;
  top: 0;
  left: 0;
  /* width: 100vw;
  height: 100vh; */
}
</style>
