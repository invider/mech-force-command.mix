# Mech Force Command

*A 7 Day Roguelike Challenge game.*



## Intro

Nobody remembers how the war started,
but it has been going on for centuries.
Deadly machines are roaming this wasteland,
blowing each other to pieces.

You can take control over one of the armies.

The neural control interface can link
only with a single mech at any time.
However, you can jump between them
to give orders or take manual control.



## Mechs

Mechs are giant autonomous battle robots.
Each has firmware that determines its team.

Mechs without a team are considered neutrals.
They do not participate directly in the battle,
but can be captured by other teams.
A mech can interface and capture a neutral one
by ramming it.



## Teams

Up to 4 teams can be engaged in the battle.

The teams stat is shown on the title bar,
so you can instantly figure out how many mechs
each of them has.



## Mech Factories

Mech Factories are constantly producing new mechs.
They are marked with **$** symbol.
Initially, these mechs are neutral,
so you need to position a couple of your mechs nearby.
Set their order to "Ram Neutrals"


## How to Run from Sources

Run it with [Collider.JAM](http://collider.land):

```
jam
```


## Debug Options

```
--map N   - jump straight to the map N skipping the menu
--test N  - run a test map (menu still will be there, run with --map option to skip)
--test    - run through all tests
--box N   - run the N box
```
