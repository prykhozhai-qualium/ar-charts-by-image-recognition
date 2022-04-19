<template>
  <div class="home">
    <div id="container"></div>
    <Chart :parent="parent" v-if="parent"></Chart>
  </div>
</template>

<script>
import "mind-ar/dist/mindar-image-three.prod.js";
import Chart from "@/components/Chart.vue";

export default {
  name: "App",
  data: () => ({
    options: null,
    contact: 0,
    parent: null,
  }),
  components: {
    Chart,
  },
  methods: {
    setUpMainModel() {
      // let model = gltf.scene;
      // model.scale.set(0.5, 0.5, 0.5);
      // this.$store.state.scene.scene_anchor.group.add(model);
      this.parent = this.$store.state.scene.scene_anchor.group;
    },
    async loadOptions() {
      return await (
        await fetch("./options.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
      ).json();
    },
    async setUp() {
      this.options = await this.loadOptions();

      this.$nextTick(() => {
        this.$store.dispatch("setUpScene", this.options);
        this.setUpMainModel();
      });
    },
  },
  async mounted() {
    await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    this.setUp();
  },
};
</script>

<style>
#container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  float: right;
}

#control {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

button {
  border: 0;
  background-color: white;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  color: black;
  font-weight: bold;
  padding: 8px 20px;
  margin: 4px 4px 16px 4px;
}

.button_hidden {
  display: none;
}
</style>
