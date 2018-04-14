<template>
  <div class="cave" ref="cave">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';

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

    this.controls = new OrbitControls(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth - 100, window.innerWidth - 100);
    (this.$refs.cave as HTMLElement).appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(3, 3, 3);

    const texture = new THREE.TextureLoader().load('/img/textures/ar-marker.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

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
</style>
