import * as satellite from 'https://cdn.jsdelivr.net/npm/satellite.js@5.0.0/dist/satellite.es.js'

const response = await fetch('/starlink.txt');
const text = await response.text();
const lines = text.split("\n").map(line => line.trim());

const sats = [];

for (let i = 0; i < lines.length; i += 3) {
    sats.push({ name: lines[i], line1: lines[i+1], line2: lines[i+2] })
}

const sat1 = sats[0]

const satrec = satellite.twoline2satrec(sat1.line1, sat1.line2);

const date = new Date();
const state = satellite.propagate(satrec, date);



if (state === null) {
  switch (satrec.error) {
    // all possible values are listed in SatRecError enum:
    case SatRecError.Decayed:
      console.log('The satellite has decayed')
    // ...
  }
  throw new Error("Couldn't propagate the satellite");
}

const positionEci = state.position,
      velocityEci = state.velocity;


console.log(positionEci, velocityEci)










