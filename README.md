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

Puzzle 4:
Rotating word search

Puzzle 5:
WebGL scene with an AR marker in it.
Other user has to point phone to AR marker to see something with Web AR.

Puzzle 6:
Transparent chameleon ("I want to be yellow") on screen with camera. Point camera at something yellow to solve
https://static.gamespot.com/uploads/scale_small/362/3627313/3053060-0971451908-97714.jpg

Puzzle 7:
Pass it on. Pass some message between players.

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
- Be like

◀ ▶ ▲ ▼
⇦ ⇨ ⇧ ⇩
⬅️➡️⬆️⬇️

Rooms:

    7 0 1
    6 8 2
    5 4 3



wow
rickroll
ermahgerd
floof
doge
impossibru
facepalm
trollface
nyancat
tableflip
derp
okay
dickbutt
bamboozle
yodawg
roflol
mrw
tmi
darude
stahp
accidentally
dafuq
copypasta
feels
mudkips
chloe
orly
yolo
tldr
trololo
fail
epic
awesome
rainbow
nope
hipster
pwned
rekt
omnomnom


http://puzzlemaker.discoveryeducation.com/WordSearchSetupForm.asp?campaign=flyout_teachers_puzzle_wordcross

I B A M B O O Z L E 
O M N O M N O M E T 
K S P I K D U M C T 
A T R O L O L O A U 
Y A W E S O M E F B 
F O O L F S + + L K 
L L O R K C I R L C 
T A C N A Y N B O I 
+ E R M A H G E R D 
P I L F E L B A T U 

(Over,Down,Direction) 
AWESOME(2,5,E)
BAMBOOZLE(2,1,E)
DICKBUTT(10,9,N)
ERMAHGERD(2,9,E)
FLOOF(5,6,W)
IMPOSSIBRU(1,1,SE)
MUDKIPS(8,3,W)
NYANCAT(7,8,W)
OKAY(1,2,S)
OMNOMNOM(1,2,E)
RICKROLL(8,7,W)
TABLEFLIP(9,10,W)
TROLLFACE(9,10,N)
TROLOLO(2,4,E)



TODO
- make firebase listen on all urls to make /game work directly
- run in fullscreen
- prevent pull to refresh?
- show all the words of the wordsearch somewhere
- Use webvr api to get more than 20 deviceorientation events per second
- Allow dragging for the Wordsearch
