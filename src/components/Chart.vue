<template>
  <div id="app"></div>
</template>

<script>
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import helvetiker_regular from "three/examples/fonts/helvetiker_regular.typeface.json";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

export default {
  name: "Chart",
  props: {
    parent: Object,
  },
  data() {
    return {
      scene_created: false,
      framestamp: 0,
      framestamp_vector: 1,
      framestamp_scale: Math.PI * 600,
      camera: null,
      scene: null,
      renderer: null,
      animation_frame_callbacks: [],
      reticle: undefined,
      functions: [],
      active_function: 8,
      prev_active_function: 0,
      hit: {
        hitTestSource: null,
        hitTestSourceRequested: false,
      },
      objects: {
        grid: {
          text: {
            mesh: null,
          },
        },
      },
      options: {
        miniature: {
          active: {
            scale: 1.2,
            position_z: 5,
          },
          inactive: {
            scale: 1,
          },
          points: {
            width: 8,
            length: 8,
          },
        },
        scale: 0.5,
        points: {
          width: 34,
          length: 34,
        },
        grid: {
          text: null,
          size: {
            x: 15,
            y: 15,
            z: 7,
          },
        },
      },
    };
  },
  components: {},
  methods: {
    createAnimFunction(fn, color_fn) {
      this.functions.push({
        k: 1,
        fn,
        color_fn,
      });
    },
    updateActiveFunction() {
      this.functions.forEach((fn, index) => {
        if (index == this.active_function) {
          fn.k += (1 - fn.k) / 20;
        } else {
          fn.k += (0 - fn.k) / 20;
        }
      });
    },
    setUpSphere(parent, options) {
      const geometry = new THREE.IcosahedronGeometry(0.1, 3);
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      let mesh = new THREE.InstancedMesh(
        geometry,
        material,
        options.points.width * options.points.length
      );

      let x_ratio = this.options.grid.size.x / options.points.width;
      let z_ratio = this.options.grid.size.z / options.points.length;

      let scale_x =
        (this.options.grid.size.x - (1 / x_ratio) * x_ratio) /
        options.points.width;
      let scale_z =
        (this.options.grid.size.z - (1 / z_ratio) * z_ratio) /
        options.points.length;

      mesh.instanceMatrix;

      this.animation_frame_callbacks.push(() => {
        let i = 0;

        for (let _x = 0; _x < options.points.width; _x++) {
          for (let _z = 0; _z < options.points.length; _z++) {
            const matrix = new THREE.Matrix4();
            let z = scale_z * _z;
            let x = scale_x * _x;

            let y = 0;

            y = options.fn(x, z);

            matrix.setPosition(x, y, z);

            let scale = options.scale_fn(y);

            matrix.scale(new THREE.Vector3(scale, scale, scale));

            mesh.updateMatrix();
            mesh.setMatrixAt(i, matrix);

            mesh.updateMatrix();
            mesh.setColorAt(
              i,
              options.color_fn(
                _x / options.points.width,
                _z / options.points.length,
                this.active_function
              )
            );

            mesh.updateMatrix();

            i++;

            mesh.instanceMatrix.needsUpdate = true;
            mesh.instanceColor.needsUpdate = true;
          }
        }
      });

      mesh.position.x = -this.options.grid.size.x / 2;
      mesh.position.z = -this.options.grid.size.z / 2;

      mesh.name = options.name;

      parent.add(mesh);
    },
    getText(text) {
      let font_loader = new FontLoader();

      font_loader.parse(helvetiker_regular);

      let text_geometry = new TextGeometry(text, {
        font: font_loader.parse(helvetiker_regular),
        size: 0.3,
        height: 0,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 2,
      });

      let textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
      });

      let text_object = new THREE.Mesh(text_geometry, textMaterial);

      return text_object;
    },
    setUpGrid(parent, options) {
      let text_wrapper;
      if (options.numbers) text_wrapper = new THREE.Mesh();

      const material = new THREE.LineBasicMaterial({
        color: options.color,
        transparent: true,
        opacity: options.opacity,
      });

      const points = [];

      for (let _x = 0; _x < this.options.grid.size.x; _x++) {
        if (_x % 2 == 0 && options.numbers) {
          let text_x = this.getText(_x.toString());
          text_x.position.x = _x;
          text_x.position.z = this.options.grid.size.z;
          text_x.rotateY(Math.PI / 3);
          text_wrapper.add(text_x);
        }
        for (let _y = 0; _y < this.options.grid.size.y; _y++) {
          points.push(new THREE.Vector3(_x, _y, 0));
        }
        for (let _z = 0; _z < this.options.grid.size.z; _z++) {
          points.push(new THREE.Vector3(_x, 0, _z));
        }
        points.push(new THREE.Vector3(_x, 0, 0));
      }

      for (let _y = 0; _y < this.options.grid.size.y; _y++) {
        if (_y % 2 == 0 && options.numbers) {
          let text_y = this.getText(_y.toString());
          text_y.position.y = _y;
          text_y.position.x = this.options.grid.size.x;
          text_y.rotateY(Math.PI / 3);
          text_wrapper.add(text_y);
        }
        for (let _z = 0; _z < this.options.grid.size.z; _z++) {
          points.push(new THREE.Vector3(0, _y, _z));
        }
        for (let _x = 0; _x < this.options.grid.size.x; _x++) {
          points.push(new THREE.Vector3(_x, _y, 0));
        }
        points.push(new THREE.Vector3(0, _y, 0));
      }

      for (let _z = 0; _z < this.options.grid.size.z; _z++) {
        if (_z % 2 == 0 && options.numbers) {
          let text_z = this.getText(_z.toString());
          text_z.position.z = _z;
          text_z.position.x = this.options.grid.size.x;
          text_z.rotateY(Math.PI / 3);
          text_wrapper.add(text_z);
        }
        for (let _y = 0; _y < this.options.grid.size.y; _y++) {
          points.push(new THREE.Vector3(0, _y, _z));
        }
        for (let _x = 0; _x < this.options.grid.size.x; _x++) {
          points.push(new THREE.Vector3(_x, 0, _z));
        }
        points.push(new THREE.Vector3(0, 0, _z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const grid = new THREE.Line(geometry, material);
      grid.name = options.name;
      grid.position.x = -this.options.grid.size.x / 2;
      grid.position.z = -this.options.grid.size.z / 2;

      if (options.numbers) {
        text_wrapper.position.x = -this.options.grid.size.x / 2;
        text_wrapper.position.z = -this.options.grid.size.z / 2;

        this.objects.grid.text.mesh = text_wrapper;

        parent.add(text_wrapper);

        this.animation_frame_callbacks.push(() => {
          if (this.objects.grid.text)
            this.objects.grid.text.mesh.children.forEach((text) => {
              text.lookAt(this.camera.position);
            });
        });
      }

      parent.add(grid);
    },
    setUpScene() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.01,
        120
      );
      this.camera.position.z = 25;
      this.camera.position.x = 25;
      this.camera.position.y = 35;

      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(this.renderer.domElement);

      this.renderer.setAnimationLoop(this.render);
    },
    render(timestamp) {
      let T = this;
      if (this.framestamp == 0) {
        this.framestamp_vector = 1;
      } else if (this.framestamp == this.framestamp_scale) {
        this.framestamp_vector = -1;
      }
      this.framestamp = this.framestamp + this.framestamp_vector;

      T.animation_frame_callbacks.forEach((cb) => {
        cb(timestamp);
      });

      T.renderer.render(T.scene, T.camera);
    },
    setUpCharts() {
      this.createAnimFunction(
        (x, z) => {
          return 2 * Math.cos(0.1 * x) + 2 * Math.cos(0.1 * z) + 6;
        },
        (_x, _z) => {
          return new THREE.Color(Math.sin(_x * 2), Math.sin(Math.sqrt(_z)), 1);
        }
      );

      this.createAnimFunction(
        (x) => {
          return 2 * Math.cos(0.7 * x) + 4;
        },
        (_x, _z) => {
          return new THREE.Color(Math.sin(_x * 2), Math.sin(Math.sqrt(_z)), 1);
        }
      );

      this.createAnimFunction(
        (x, z) => {
          return 2 * Math.cos(0.8 * x) * Math.sin(0.8 * z) + 6;
        },
        (_x, _z) => {
          return new THREE.Color(Math.sin(_x * 2), Math.sin(Math.sqrt(_z)), 1);
        }
      );

      this.createAnimFunction(
        (x, z) => {
          let bias_x = -this.options.grid.size.x / 2;
          let bias_z = -this.options.grid.size.z / 2;

          return Math.sqrt((bias_x + x) ** 2 + (bias_z + z) ** 2 + 16);
        },
        (_x) => {
          return new THREE.Color(1, _x, Math.sqrt(_x));
        }
      );

      this.createAnimFunction(
        (x, z) => {
          let bias_x = -this.options.grid.size.x / 4;
          let bias_z = -this.options.grid.size.z / 4;

          return Math.sqrt((bias_x + x) ** 2 + (bias_z + z) ** 2 + 16) - 2;
        },
        (_x) => {
          return new THREE.Color(1, _x, Math.sqrt(_x));
        }
      );

      this.createAnimFunction(
        (x, z) => {
          let bias_x = -this.options.grid.size.x / 4;
          let bias_z = -this.options.grid.size.z / 4;

          return (
            Math.sqrt((bias_x + x) ** 2 + (bias_z + z) ** 2 + 16) -
            2 +
            Math.sin(x + z)
          );
        },
        (_x) => {
          return new THREE.Color(1, _x, Math.sqrt(_x));
        }
      );

      this.createAnimFunction(
        (x, z) => {
          return Math.abs(Math.sin(10 * x)) * z;
        },
        (_x) => {
          return new THREE.Color(_x, 1, Math.sqrt(_x));
        }
      );

      this.createAnimFunction(
        (x, z) => {
          return 0.5 * Math.abs(Math.cos(10 * x) ** 2 + Math.sin(z)) * z;
        },
        (_x) => {
          return new THREE.Color(_x, 1, Math.sqrt(_x));
        }
      );

      this.createAnimFunction(
        (x, z) => {
          return 0.5 * Math.abs(Math.cos(10 * x) ** 2 + Math.sin(z)) * (z + x);
        },
        (_x) => {
          return new THREE.Color(_x, 1, Math.sqrt(_x));
        }
      );
    },
    createObjects() {
      const chart_scene = new THREE.Mesh();

      let scale_fn = (y) => {
        return (y / this.options.grid.size.y) * 2 + 0.5;
      };

      let miniature_scale_fn = (y) => {
        return (y / this.options.grid.size.y) * 18;
      };

      this.setUpCharts();

      // selected chart

      this.setUpGrid(chart_scene, {
        color: 0xffffff,
        opacity: 1,
        numbers: true,
      });

      this.setUpSphere(chart_scene, {
        points: this.options.points,
        fn: (x, z) => {
          let y = 0;

          this.functions.forEach((fn) => (y += fn.k * fn.fn(x, z)));

          return y;
        },
        scale_fn: scale_fn,
        color_fn: (x, z) => {
          let color = {
            r: 0,
            g: 0,
            b: 0,
          };

          this.functions.forEach((fn) => {
            color.r += fn.color_fn(x, z).r * fn.k;
            color.g += fn.color_fn(x, z).g * fn.k;
            color.b += fn.color_fn(x, z).b * fn.k;
          });

          return new THREE.Color(color.r, color.g, color.b);
        },
      });

      this.animation_frame_callbacks.push(() => {
        this.updateActiveFunction();
      });

      chart_scene.scale.set(1, 1, 1);

      // controll center

      const control_center = new THREE.Mesh();
      const control_center_miniatures = new THREE.Mesh();

      for (let i = 0; i < this.functions.length; i++) {
        let miniature = new THREE.Mesh();

        this.setUpGrid(miniature, {
          color: 0xffffff,
          opacity: 0.3,
          name: "miniature_" + i,
          numbers: false,
        });

        this.setUpSphere(miniature, {
          points: this.options.miniature.points,
          fn: this.functions[i].fn,
          name: "miniature_" + i,
          scale_fn: miniature_scale_fn,
          color_fn: this.functions[i].color_fn,
        });

        miniature.position.x =
          this.options.grid.size.x * 1.5 * Math.floor(i / 3);
        miniature.position.y = (i % 3) * this.options.grid.size.y * 1.5;

        miniature.name = "miniature_" + i;

        control_center_miniatures.add(miniature);
      }

      this.animation_frame_callbacks.push(() => {
        control_center_miniatures.children.forEach((miniature, i) => {
          if (i == this.active_function) {
            miniature.scale.set(
              miniature.scale.x +
                (this.options.miniature.active.scale - miniature.scale.x) / 20,
              miniature.scale.y +
                (this.options.miniature.active.scale - miniature.scale.y) / 20,
              miniature.scale.z +
                (this.options.miniature.active.scale - miniature.scale.z) / 20
            );
          } else {
            miniature.scale.set(
              miniature.scale.x +
                (this.options.miniature.inactive.scale - miniature.scale.x) /
                  20,
              miniature.scale.y +
                (this.options.miniature.inactive.scale - miniature.scale.y) /
                  20,
              miniature.scale.z +
                (this.options.miniature.inactive.scale - miniature.scale.z) / 20
            );
          }
        });
      });

      control_center.add(control_center_miniatures);

      control_center.scale.set(0.2, 0.2, 0.2);
      control_center.position.x = this.options.grid.size.x / 2 + 4;
      control_center.position.z = -this.options.grid.size.z / 2;
      control_center.position.y = 2;

      chart_scene.add(control_center);

      return chart_scene;
    },
  },
  mounted() {
    this.setUpScene();

    let chart_scene = this.createObjects();

    chart_scene.scale.set(0.05, 0.05, 0.05)
    chart_scene.position.y = -0.3;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    this.parent.add(light);

    this.parent.add(chart_scene);
  },
};
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
  outline: hidden;
  user-select: none;
}
body {
  background-color: #000;
}
canvas {
  width: 100vw !important;
  height: 100vh !important;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
}
.label {
  color: #fff;
  font-family: sans-serif;
  padding: 2px;
  background: rgba(0, 0, 0, 0.6);
}
</style>
