//XY oscillator pad by Hussein Farkhani

/**
INSTRUCTIONS
?drag or click mode?
Drag your mouse to play 4 different types of fundamental waves;
- TOP RIGHT box/pad = Sine wave
- BOTTOM RIGHT pad = Square wave
- TOP LEFT pad = Saw wave
- BOTTOM LEFT pad = triangle wave

Click and hold the left/right mouse button to hold a note at a precise area (x/y coordinate) 
and then move your mouse to play in a different area

X coordinates/horizontal movements are for frequency
y coordinates/vertical movements are for amplitude

DEFUALTS
- max frequency: 2000 (0 to 400 multiplied by the frequencyMultiplier- defualt frequencyMultiplier is 5)
- max amplitude: 1 (or 100%)
- delay: 0.1 seconds 

--p5.sound library must be included in the html file, in order for this program to work

canvas size 800 width, 500 height
**/

//the 4 fundamental waves the oscillator can produce
var sinePad;
var squarePad;
var trianglePad
var sawPad;

//varaibles for moding the oscillator pad - only change them if you want to mod the sounds
var frequencyMultiplier = 5; //here you can decrease/increase the frequency range
var ampMod = 0; //decrease/increase the amplitude range
var delayMod = 0.1; //delaying the time an amplitude increases/decreases

//stops the oscillator constantly playing
var soundSwitch = false;


//----COLOUR VARIABLES-----------
//sinePad - will turn yellow
var sineRed = 0, sineGreen = 0, sineBlue = 0;

//squarePad - will turn blue
var squareRed = 0, squareGreen = 0, squareBlue = 0;

//trianglePad - will turn green
var triangleRed = 0, triangleGreen = 0, triangleBlue = 0;

//sawPad - will turn red
var sawRed = 0, sawGreen = 0, sawBlue = 0;
//-------------------------------


function setup() {

  createCanvas(800, 500); //this shouldn't change, any changes wil mess up the pad's dedicated areas

  //needs to be called only once
  createSinePad(0,20); //(startingAmplitude,startingFrequency)
  createSquarePad(0,20);
  createSawPad(0,20);
  createTrianglePad(0,20);
}

function draw() {

  drawUI(); // this will create the actual pads
}

function drawUI() {
	noStroke();

  //sine pad - yellow
  fill(sineRed, sineGreen, sineBlue);
  rect(400, 0, 400, 250);

  //square pad - blue
  fill(squareRed, squareGreen, squareBlue);
  rect(400, 250, 400, 250);

  //saw pad - red
  fill(sawRed, sawGreen, sawBlue);
  rect(0, 0, 400, 250);

  //triangle pad - green
  fill(triangleRed, triangleGreen, triangleBlue);
  rect(0, 250, 400, 250);
}


function mouseMoved() { 
	
	//most important function, this is where the user can create sounds with mouse movement

	if (mouseX > 400 && mouseX < 800 && mouseY < 250 && mouseY > 0) { 
  	playSinePad();
  	}

 	if (mouseX > 400 && mouseX < 800 && mouseY > 250 && mouseY < 500) { 
  	playSquarePad();
	}

	if (mouseX > 0 && mouseX < 400 && mouseY < 250 && mouseY > 0) { 
  	playSawPad();
  	}

  	if (mouseX > 0 && mouseX < 400 && mouseY < 500 && mouseY > 250) { 
  	playTrianglePad();
  	}

  }

//---------------------------------------------------------------------  

function createSinePad(startingAmplitude,startingFrequency){
  
  // from the p5.sound library
  sinePad = new p5.Oscillator();

  //intial values for the oscillator
  sinePad.setType('sine');
  sinePad.freq(startingFrequency);
  sinePad.amp(startingAmplitude);

  //activate the sine pad
  sinePad.start();
}

function createSquarePad(startingAmplitude,startingFrequency){
  
  // from the p5.sound library
  squarePad = new p5.Oscillator();

  //intial values for the oscillator
  squarePad.setType('square');
  squarePad.freq(startingFrequency);
  squarePad.amp(startingAmplitude);

  //activate the square pad
  squarePad.start();
}

function createSawPad(startingAmplitude,startingFrequency){
  
  // from the p5.sound library
  sawPad = new p5.Oscillator();

  //intial values for the oscillator
  sawPad.setType('sawtooth');
  sawPad.freq(startingFrequency);
  sawPad.amp(startingAmplitude);

  //activate the saw pad
  sawPad.start();
}

function createTrianglePad(startingAmplitude,startingFrequency){
  // from the p5.sound library
  trianglePad = new p5.Oscillator();

  //intial values for the oscillator
  trianglePad.setType('triangle');
  trianglePad.freq(startingFrequency);
  trianglePad.amp(startingAmplitude);

  //activate the triangle pad
  trianglePad.start();
}

//---------------------------------------------------------------------


function playSquarePad(){
   
  
  //square Pad area
    
    if (soundSwitch === false) { // acts like a on/off Switch
      
      // ramp amplitude up in 0.1 seconds(default delay) - user now has control of amplitude
      squarePad.amp((mouseY - 250) / 250 + ampMod, delayMod); // the 250 is to scale the pad veritical area into a range (0 to 1)
      
      //user can now adjust frequency
      squarePad.freq((mouseX - 400) * frequencyMultiplier); //the 400 is to scale the pad horizontal area into a range (20 to 2000)

      //change pad colour
      squareBlue += random(125, 255);
      

      soundSwitch = true; // we can exit this block now

    } else {

      // ramp amplitude down to 0 in 0.1 seconds

      squarePad.amp(0, delayMod); //off

      //frequency does not need to be turned off, with amplitude at zero you can't hear the sound wave anyway

      // user can now play again
      soundSwitch = false;

      // change pad colour back from blueish to defualt black 
      squareBlue = 0;
      

    }
}

function playSinePad(){
   
  
  //sine Pad area
    
    if (soundSwitch === false) { // acts like a on/off Switch
      
      // ramp amplitude up in 0.1 seconds(default delay) - user now has control of amplitude
      sinePad.amp(mouseY / 250 + ampMod, delayMod); // the 250 is to scale the pad veritical area into a range (0 to 1)
      
      //user can now adjust frequency
      sinePad.freq((mouseX - 400) * frequencyMultiplier); //the 400 is to scale the pad horizontal area into a range (20 to 2000)

      //change pad colour
      sineRed += random(125, 255);
      sineGreen += random(125, 255);

      soundSwitch = true; // we can exit this block now

    } else {

      // ramp amplitude down to 0 in 0.1 seconds

      sinePad.amp(0, delayMod); //off

      //frequency does not need to be turned off, with amplitude at zero you can't hear the sound wave anyway

      // user can now play again
      soundSwitch = false;

      // change pad colour back from yellowish to defualt black 
      sineRed = 0;
      sineGreen = 0;

    }
}

function playSawPad(){
   
  
    
    if (soundSwitch === false) { // acts like a on/off Switch
      
      // ramp amplitude up in 0.1 seconds(default delay) - user now has control of amplitude
      sawPad.amp(mouseY / 250 + ampMod, delayMod); // the 250 is to scale the pad veritical area into a range (0 to 1)
      
      //user can now adjust frequency
      sawPad.freq(mouseX * frequencyMultiplier); 

      //change pad colour
      sawRed += random(125, 255);
      

      soundSwitch = true; // we can exit this block now




    } else {

      // ramp amplitude down to 0 in 0.1 seconds

      sawPad.amp(0, delayMod); //off

      //frequency does not need to be turned off, with amplitude at zero you can't hear the sound wave anyway

      // user can now play again
      soundSwitch = false;

      // change pad colour back from yellowish to defualt black 
      sawRed = 0;
      

    }
}

function playTrianglePad(){

	if (soundSwitch === false) { // acts like a on/off Switch
      
      // ramp amplitude up in 0.1 seconds(default delay) - user now has control of amplitude
      trianglePad.amp((mouseY - 250) / 250 + ampMod, delayMod); // the 250 is to scale the pad veritical area into a range (0 to 1)
      
      //user can now adjust frequency
      trianglePad.freq(mouseX * frequencyMultiplier); 

      //change pad colour
      triangleGreen += random(125, 255);
      

      soundSwitch = true; // we can exit this block now




    } else {

      // ramp amplitude down to 0 in 0.1 seconds

      trianglePad.amp(0, delayMod); //off

      //frequency does not need to be turned off, with amplitude at zero you can't hear the sound wave anyway

      // user can now play again
      soundSwitch = false;

      // change pad colour back from yellowish to defualt black 
      triangleGreen = 0;
    }	
}

