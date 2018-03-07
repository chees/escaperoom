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

Puzzle 2:
One does not simply press a button
press button -> get a phone number from OneDoesNotSimply

Puzzle 3:
Phone. Call number from puzzle 2 -> Hello, this is dog


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
- Doge
- Monorail cat
- I can't even
- Computer says no
- I can haz
- Table flip
- Well well well
- Thou shall not pass
- Impossibru
- All the things
- I don't always
- Please tell me more
- Facepalm
- cats
- Shut up and take my money
- Nyan cat
- trollface
- forever alone

◀ ▶ ▲ ▼
⇦ ⇨ ⇧ ⇩
⬅️➡️⬆️⬇️

Rooms:

    7 0 1
    6 8 2
    5 4 3
