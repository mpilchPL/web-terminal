

// script from: https://css-tricks.com/snippets/css/typewriter-effect/
// author: Geoff Graham



// set up text to print, each item in array is new line
var aText = new Array(
    "There are only 10 types of people in the world:", 
    "Those who understand binary, and those who don't"
);

var pause = 200; // pause time after each line
var iSpeed = 10; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 13; // start scrolling up at this many lines
    
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row
var destination = document.getElementById("term");

function typewriter() {
    iRow = Math.max(0, iIndex-iScrollAt);
    
    
 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '\n';  // TODO clean this,  sContent unnecesery
 }
    destination.html(destination.html() + aText[iIndex].charAt(iTextPos));
    if ( iTextPos++ == iArrLength ) {         // IF ITERATION MEETS END OF THE ELEMENT
        iTextPos = 0;
        iIndex++;
        destination.html( destination.html() + '\n'); // GO TO NEW LINE AFTER FINISHING EACH ELEMENT
        terminal.scrollDown();                        // SCROLL DOWN IF POSSIBLE
        if ( iIndex != aText.length ) {       
            iArrLength = aText[iIndex].length;        // SET LENGTH OF NEW LINE
            setTimeout("typewriter()", pause);           // LITTLE PAUSE AFTER EACH LINE IS FINISHED
        }
    } else {
        setTimeout("typewriter()", iSpeed);             // PROCEED TO NEXT ITERATION AFTER DELAY
    }
}

function resetValues() {
    iIndex = 0;
    iArrLength = aText[0].length;
    iTextPos = 0;
}

function setArray(value) {
    aText = value;
}

function setDestination(dest = document.getElementById("term")) { 
    destination = dest;
}
