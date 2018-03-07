<template>
  <div class="game">
    <div v-if="state === State.Joining" class="joining">
      Tell at least 2 other people to join using this code:
      <div class="code">{{code}}</div>
      <div class="players">
        Players:
        <div v-for="player in players" :key="player.id" class="player">
          {{player.name}}
        </div>
      </div>
      <div v-if="isPlayer(0)">
        Once everybody is ready press this:<br>
        <button @click="start">Start</button>
      </div>
      <div v-else>
        Once everybody is ready {{players[0]?players[0].name:'player 1'}} can start the game.
      </div>
    </div>

    <div v-if="state === State.Started">

      <div v-if="room === 0">
        Welcome!

        {{formatDuration(duration / 1000)}}

        <a href="#" @click.prevent="room = 1">▶</a>
      </div>

      <div v-if="room === 1">
        <a href="https://www.youtube.com/watch?v=Ct6BUPvE2sM" target="_blank">PIKOTARO</a>
        <button @click="clickPen" v-if="isPlayer(0)">🖊️</button>
        <button @click="setFS({ puz1pineapple: new Date() })" v-if="isPlayer(1)">🍍</button>
        <button @click="setFS({ puz1apple: new Date() })" v-if="isPlayer(2)">🍎</button>

        <a href="#" @click.prevent="room = 0">◀</a>
      </div>

    </div>

    <div v-if="state === State.Finished">
      <img src="../assets/win.jpg">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase';
import 'firebase/firestore';
import generateName from '../nameGenerator';

let db: firebase.firestore.Firestore;
let durationInterval: number;

enum State {
  Joining,
  Started,
  Finished,
}

interface Player {
  id: string;
  name: string;
}

export default Vue.extend({
  name: 'game',
  data() {
    return {
      game: '',
      code: '',
      state: State.Joining,
      startDate: null,
      duration: 0,
      players: [] as Player[],
      puz1pen: null,
      puz1pineapple: null,
      puz1apple: null,
      room: 0,
    };
  },
  created() {
    (this as any).State = State; // To make it accessible in templates

    db = firebase.firestore();

    const game = localStorage.getItem('game');
    if (game === null) {
      this.$router.replace('/');
    }
    this.game = game as string;

    let playerId = localStorage.getItem('playerId');
    if (playerId == null) {
      playerId = uuidv4();
      localStorage.setItem('playerId', playerId);
    }
    console.log(playerId);

    db.doc('games/' + this.game).onSnapshot((doc) => {
      const data = doc.data();
      if (data) {
        if (data.state) { this.state = data.state; }
        this.code = data.code;
        this.puz1pen = data.puz1pen;
        this.puz1pineapple = data.puz1pineapple;
        this.puz1apple = data.puz1apple;
        this.startDate = data.startDate;
      }
    });

    db.doc('games/' + this.game).collection('players').orderBy('created').onSnapshot((querySnapshot) => {
      this.players = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
        };
      });

      // Add the player if it doesn't exist yet:
      if (!this.players.some((p) => p.id === playerId)) {
        db.doc('games/' + this.game).collection('players').doc(playerId as string).set({
          created: new Date(),
          name: generateName(),
        }).catch((error) => {
          console.log(error); // TODO
        });
      }
    });
  },
  methods: {
    start() {
      if (this.players.length < 3) {
        alert('Didn\'t I tell you you need at least 3 players?');
      } else {
        this.setFS({
          state: State.Started,
          startDate: new Date(),
        });
      }
    },
    clickPen() {
      if (this.puz1pen && this.puz1pineapple && this.puz1apple &&
          this.puz1pen! < this.puz1pineapple! &&
          this.puz1pineapple! < this.puz1apple!) {
        this.setFS({ state: State.Finished });
      } else {
        this.setFS({ puz1pen: new Date() });
      }
    },
    setFS(obj: object) {
      db.doc('games/' + this.game).set(obj, { merge: true }).catch((error) => {
        console.log(error); // TODO
      });
    },
    isPlayer(n: number) {
      if (n >= this.players.length) {
        return false;
      }
      return this.players[n].id === localStorage.getItem('playerId');
    },
    formatDuration(duration: number) {
      const hours   = Math.floor(duration / 3600);
      const minutes = Math.floor((duration - (hours * 3600)) / 60);
      const seconds = Math.floor(duration - (hours * 3600) - (minutes * 60));

      return (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
    },
  },
  watch: {
    startDate(newVal, oldVal) {
      if (newVal && !oldVal) {
        durationInterval = window.setInterval(() => {
          this.duration = new Date().getTime() - newVal.getTime();
        }, 1000);
      }
    },
  },
  beforeDestroy() {
    window.clearInterval(durationInterval);
  },
});

/* tslint:disable */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
/* tslint:enable */
</script>

<style scoped>
.joining {
  padding: 20px;
  margin: 0 auto;
  max-width: 500px;
}
.code {
  padding: 10px;
  margin: 10px auto;
  font-size: 20px;
  background-color: azure;
  width: 80px;
}
.players {
  margin: 30px;
}
.player {
  border-bottom: 1px solid hotpink;
  margin: 5px;
}
</style>
