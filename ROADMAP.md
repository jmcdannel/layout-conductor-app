# Trestle (Train/Micro/Mini/Custom/Core) (Technologies/Solutions/Engineering) ~Layout Conductor~ Roadmap

## App / Api / Sketch

### Locos

- control via JMRI / CommandStation EX
- Throttle, Functions (via drawer?), Stop, Cruise
- Drive up to 3, Cruise up to 12

### Turnouts / Routes

- Servo via PCA96785
- Kato via Motor Controller
- Routes via SVG map
- Set / reset / Sweep / Mainline
- Map Options / Show/Hide Layers
- 

### Effects

- Arduino Pin Toggle
- Signals (via arduino pins)
- Sounds (via mqqt)
- Sensors (trigger effect)
- simple serial (send single digit - ie: use with led strip modes)
- Macro Effects

### Conductor

- Locos, Turnouts, Routes, Effets
- Drive up to 2, Cruise up to 3
- Mobile View

### Api
- auto configure serial connections
- auto load config on arduinos
- bug fixes
- simple serial (for led) [ie: :0,1,2,3,4,5,6,7,8,9:]

### Hardware Support
- RPi > Arduino w/Motor Shield
- (1-3) Arduino via USB Serial
    - PCA96785


### Software Support
JMRI, CommandStation EX

## Tamarack Junction

### Running Goals

#### October
[x] trains running on each section
[x] turnouts running on each section
[ ] connect sections
[x] town turnouts
[ ] routes
[ ] trackwork
[ ] helix install
[x] town terrain
[ ] full surface coverage

#### November
[ ] City
[ ] Station
[ ] 1 Bridge
[ ] Yard entrance / exit

#### December
[ ] Town Track & Roads
[ ] Tunnels
[ ] 2 Bridges

### App Tour

- voice, 
- fascia led lighting, 
- interactive app, 
- user train control

### LED Strip Lighting

- prebuilt routines - single digit
- parsed JSON (or more compact format)

## Layout Conductor Wishlist
[ ] Loco CRUD
[ ] Turnout CRUD
[ ] Effect CRUD (pin, signal, serial digit, serial json, sound, sensor)
[ ] Route Config / CRUD