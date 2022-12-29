# Trestle (Train/Micro/Mini/Custom/Core) (Technologies/Solutions/Engineering) ~Layout Conductor~ Roadmap

## App / Api / Sketch

### Throttles

- control via JMRI / CommandStation EX
- Functions (via drawer?)
- / loading / acquiring

### Turnouts / Routes

- / loading state

### Effects

- Arduino Pin Toggle
- Signals (via arduino pins)
- Sounds (via mqqt)
- Sensors (trigger effect)
- simple serial (send single digit - ie: use with led strip modes)
- Macro Effects

### Conductor

- / Route / Turnout Map SVG
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
[x] town turnouts
[x] routes
[x] town terrain

#### November
[ ] connect sections
[ ] trackwork
[ ] helix install

#### December
[ ] Yard entrance / exit
[ ] full surface coverage

#### January
[ ] 1 Bridge

#### February
[ ] City
[ ] Station

#### March
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
[ ] Loco CRUD / Admin Tool
[ ] Turnout CRUD / Admin Tool
[ ] Effect CRUD / Admin Tool (pin, signal, serial digit, serial json, sound, sensor)
[ ] Route Config / CRUD / Admin Tool