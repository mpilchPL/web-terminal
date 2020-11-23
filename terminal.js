const o = $('#term');      // HANDLER OF OUTPUT TEXTAREA
const i = $('#term2');      // HANDLER OF INPUT TEXTAREA
const maxRows = 13;         // MAX NUMBER OF DISPLAYED ROWS
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
    terminal.typewrite(welcomeText);
});

$(window).resize(function () { 
    var newFontSize = Math.floor($('.container').height() * 0.9 / ((maxRows+1)*1.2));
    $('.container').css('font-size', newFontSize);
});
terminal.output.click(function (e) {  // FOCUS INPUT AREA WHEN CLICKED ON OUTPUT
    terminal.input.focus();
});

$('#terminal2').keydown(function (e) { 
    if (e.which == 38) { 
        terminal.scrollUp();
    }
    if (e.which == 40) { 
        terminal.scrollDown();
    }

    // ACTION TRIGGERED WHENEVER USER PRESSESS ENTER / RETURN KEY
    if (e.which == keyCode) {         //########## 13 - return / enter
        e.preventDefault();         // DISABLE DEFAULT BEHAVIOUR OF TEXTAREA WHEN PRESSED ENTER

        var rows = terminal.output.attr('rows');
        if (rows < maxRows) {                // PREVENT OUTPUT WINDOW TO BE HIGHER THAN MAX ROWS
            terminal.output.attr('rows', ++rows); // EXPAND OUTPUT AREA IF POSSIBLE
        }

        terminal.println(commandPrompt + terminal.input.val());
        var line = terminal.input.val(); // LINE THAT HAS BEEN SENT 
        terminal.input.val("");                    // CLEAR INPUT CONTENT
        var currentCommand = line.split(" ")[0];
        var parameter = '';
        if (line.split(" ").length > 1) {
            if (line.split(" ")[1].startsWith('-'))
                parameter = line.split(" ")[1].substr(1);
        }

        switch (currentCommand) {
            case 'henlo':
                terminal.println('henlooo');
                break
            case 'clear':
                terminal.clear();
                break;
            case 'typewrite':
                // if(parameter.length > 0) {
                //     terminal.typewrite(new Array(parameter));
                // } else {
                //     terminal.println('No valid parameter');
                // }
                if (line.split(" ").length > 1) {
                   terminal.typewrite((line.substr('typewrite'.length+1)).split("\n"));
                    
                }
                break;
            default:
                terminal.println(parameter);
                break;
        }

        terminal.output.scrollTop(123123123);    // SCROLL OUTPUT WINDOW TO THE BOTTOM (MUST BE HIGH NUMBER)
    }
});



function Terminal(output, input) {
    this.output = output;
    this.input = input;
}


Terminal.prototype.println = function(value) {
    return this.output.html(this.output.val() + value + "\n");
}

Terminal.prototype.clear = function(value) {
    return this.output.html("");
}

Terminal.prototype.add = function(value) {
    return this.output.val(this.output.val() + value);
}

Terminal.prototype.typewrite = function(value) {
    setArray(value);
    resetValues();
    setDestination(this.output);
    typewriter(); 
}


Terminal.prototype.scrollUp = function() {
    var lineLenght = this.input.height();
    this.output.scrollTop(this.output.scrollTop() - lineLenght)
}

Terminal.prototype.scrollDown = function() {
    var lineLenght = this.input.height();
    this.output.scrollTop(this.output.scrollTop() + lineLenght)
}