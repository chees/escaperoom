# Online Escape Room

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build and deploy to Firebase
npm run deploy
```

## Notes

- Vue
- Firebase
- Mobile first
- Multiplayer


- A Player creates a game on the site
- Other players join the game
- The game starts
- Each player gets their own view


## Models

Game
- String code
- Player[] players
- State state
- Puzzle1 puzzle1 

Player
- String uuid

State
"joining", "started", "puzzle1", "finished"

Puzzle1
- Date pen
- Date pineapple
- Date apple


## Puzzles

Puzzle 1:
Each player gets a button with 🖊️, 🍍 or 🍎.
Once they are pressed in the correct order the game continues with the next part.


Don't push button (reset)

Memes:
- Pen Pineapple Apple Pen
- I have no idea what I'm doing
- Yes, this is dog
- Insanity wolf
- Rick Roll
- Ermagehrd, sner
- One does not simply
- Floof
- https://i.imgur.com/kQu9YVu.jpg
- This is dog
- Doge
- Monorail cat
- I can't even
- Computer says no
- I can haz
- Table flip
- Well well well
