<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  overscroll-behavior-y: contain;
  touch-action: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  background-color: darkorange;
  font-size: 16px;
  font-weight: bold;
  color: darkslategray;
  border: 2px solid darkslategray;
  width: 180px;
}
input {
  box-sizing: border-box;
  font-size: 16px;
  padding: 10px;
  margin: 10px;
  width: 180px;
  border: 2px solid darkslategray;
  border-radius: 4px;
}
</style>
