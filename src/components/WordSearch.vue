<template>
  <div class="wordsearch" :style="{animationDuration: spinString}">
    <div v-for="l, i in letters" class="letter" :class="{selected: selected[i]}" @click="select(i)">
      {{l}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WordSearch',
  props: {
    msg: String,
  },
  data() {
    return {
      letters:
`I B A M B O O Z L E
 O M N O M N O M E T
 K S P I K D U M C T
 A T R O L O L O A U
 Y A W E S O M E F B
 F O O L F S + + L K
 L L O R K C I R L C
 T A C N A Y N B O I
 + E R M A H G E R D
 P I L F E L B A T U`.split(' '),
      selected: Array(100).fill(false),
      spin: 20,
    };
  },
  methods: {
    select(i: number) {
      this.$set(this.selected, i, !this.selected[i]);
      this.spin -= 1;
    },
  },
  computed: {
    spinString(): string {
      return this.spin + 's';
    },
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
  font-size: 24px;
  user-select: none;
  overflow: hidden;
  animation: 0s spin infinite linear;
}
.selected {
  background-color: black;
  color: white;
}
.spin {
  animation: 0s spin infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
