//import {handleCommand} from './commandHandler.js';

const o = $('#term');      // HANDLER OF OUTPUT TEXTAREA
const i = $('#term2');      // HANDLER OF INPUT TEXTAREA
const maxRows = 12;         // MAX NUMBER OF DISPLAYED ROWS
const keyCode = 13;
const commandPrompt = ">> ";
var welcomeText =  new Array(
    "Welcome to the site.",
    "You can use this terminal to navigate the site, learn about the author and more.",
    "Type 'cmd' or 'commands' to get the list of availabe commands."
    );
var terminal = new Terminal(o, i);  //CREATE TERMINAL INSTANCE
$(document).ready(function () {
    var newFontSize = Math.floor($('.container').height() * 0.9 / ((maxRows+1)*1.2));
    $('.container').css('font-size', newFontSize);
    o.attr('rows', maxRows);
    
    terminal.typewrite(welcomeText, 'fast');
});

$(window).resize(function () { 
    var newFontSize = Math.floor($('.container').height() * 0.9 / ((maxRows+1)*1.2));
    $('.container').css('font-size', newFontSize);
    terminal.scrollDown(true);
});
terminal.output.click(function (e) {  // FOCUS INPUT AREA WHEN CLICKED ON OUTPUT
    terminal.input.focus();
});

$('#terminal2').keydown(function (e) { 
    /* #region ################# ARROW KEYS ################# */
    // used to scroll through terminal
    if (e.which == 38) {                // UP KEY
        terminal.scrollUp();
    }
    if (e.which == 40) {                // DOWN KEY
        terminal.scrollDown();
    }
    /* #endregion ########################################### */

    /* #region ACTION TRIGGERED WHENEVER USER PRESSESS ENTER */
    if (e.which == keyCode) {         
        e.preventDefault();         // DISABLE DEFAULT BEHAVIOUR OF TEXTAREA WHEN PRESSED ENTER

        var rows = terminal.output.attr('rows');
        if (rows < maxRows) {                // PREVENT OUTPUT WINDOW TO BE HIGHER THAN MAX ROWS
            terminal.output.attr('rows', ++rows); // EXPAND OUTPUT AREA IF POSSIBLE
        }
    
        terminal.println(commandPrompt + terminal.input.val());
        var line = terminal.input.val(); // LINE THAT HAS BEEN SENT 
        var currentCommand = line.split(" ")[0];
        var parameters = [];

        if (line.split(" ").length > 1) {           // CHECK FOR PARAMETERS
            line.split(" ").forEach(element => {
                if (element.startsWith('-'))
                    parameters.push(element.substr(1));
            });
        }

        handleCommand(terminal, currentCommand, line, parameters);

        terminal.input.val("");                    // CLEAR INPUT CONTENT
        terminal.scrollDown(true);    // SCROLL OUTPUT WINDOW TO THE BOTTOM
    }
    /* #endregion */
});



function Terminal(output, input) {
    this.output = output;
    this.input = input;
}


Terminal.prototype.println = function(value) {
    return this.output.html(this.output.val() + value + "\n");
}

Terminal.prototype.print = function(value) {
    return this.output.html(this.output.val() + value);
}

Terminal.prototype.clear = function(value) {
    return this.output.html("");
}

Terminal.prototype.typewrite = function(value, speed = 'normal') {
    setArray(value);
    resetValues(speed);
    setDestination(this.output);
    typewriter(); 
}

Terminal.prototype.goto = function(target, speed) {
    $.scrollTo($('#' + target), speed);
}

Terminal.prototype.scrollUp = function() {
    var lineLenght = this.input.height();
    this.output.scrollTop(this.output.scrollTop() - lineLenght)
}

Terminal.prototype.scrollDown = function(bottom = false) {
    if(bottom) {
        this.output.scrollTop(999999); // scrolls window to the very bottom
    } else {
        var lineLenght = this.input.height(); // input will always be 1 row high, therefore its height is exactly the same as line height
        this.output.scrollTop(this.output.scrollTop() + lineLenght); // scrolls window for the amount of line height
    }
    
}

