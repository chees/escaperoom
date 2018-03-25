<template>
  <div class="wordsearch" ref="wordsearch">
    <div v-for="(l, i) in letters" class="letter" :class="{selected: selected[i]}" @click="select(i)" :key="i">
      {{l}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WordSearch',
  props: {
    stopped: Date,
  },
  watch: {
    stopped() {
      this.spinSpeed = 0;
    },
  },
  data() {
    return {
      letters:
`I B A M B O O Z L E
 O M N O M N O M E T
 K S P I K D U M C T
 A T R O L O L O A U
 Y A W E S O M E F B
 F O O L F S D O L K
 L L O R K C I R L C
 T A C N A Y N B O I
 H E R M A H G E R D
 P I L F E L B A T U`.split(' '),
      selected: Array(100).fill(false),
      spinSpeed: 0,
      rotation: 0,
    };
  },
  methods: {
    select(i: number) {
      this.$set(this.selected, i, !this.selected[i]);
      this.spinSpeed += .05;
    },
    spinStep() {
      if (!this.$refs.wordsearch) { return; }
      this.rotation += this.spinSpeed;
      (this.$refs.wordsearch as HTMLElement).style.transform = 'rotate(' + this.rotation + 'deg)';
      requestAnimationFrame(this.spinStep);
    },
  },
  mounted() {
    this.spinStep();
  },
});
</script>

<style scoped>
.wordsearch {
  margin-top: 50px;
  display: grid;
  width: calc(100vw - 100px);
  height: calc(100vw - 100px);
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  font-family: 'Itim', cursive;
  font-size: 7vw;
  user-select: none;
  overflow: hidden;
}
.selected {
  background-color: black;
  color: white;
}
.letter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
