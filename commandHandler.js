let commands = new Array(); // Array with all available commands

function handleCommand(terminal, command, line, param) {
    if(findByName(command.toLowerCase()) < 0) {             //COMMAND DOESNT EXIST
        // here feedback info if needed
        return;
    }
    currentCommand = commands[findByName(command.toLowerCase())];

    var paramsFiltered = param.filter(element => {          // FILTER PARAMS TO PASS ONLY VALID ONES
        return (currentCommand.params.includes(element));
    });

    if(param.length > 0 && paramsFiltered.length == 0) {   // NONE OF GIVEN PARAMETERS IS VALID
        invalidParam(terminal, command, param);
        return;
    }

    if(paramsFiltered.includes('help')) {         // ALWAYS DISPLAY INFO IF HELP PARAM WAS GIVEN
        currentCommand.showInfo(terminal);
        return;
    }

    if(paramsFiltered.length > 0) {
        currentCommand.execute(terminal, command, line, paramsFiltered);
    } else {
        currentCommand.execute(terminal, command, line);
    }
    return;
}

var findByName = function(name) {
    return commands.findIndex(function (e, i, a) { 
        if(e.name == name) {
            return true;
        }
        return false;
     });
}

function commandInfo(terminal, command, info, params) {
    terminal.println('*********');
    terminal.println('Command:    ' + '[' + command + ']');
    if(params.length > 0) {
        terminal.println('Parameters: ' + '[' + params + ']');
    }
    terminal.println('Effect:     ' + info);
    terminal.println('*********');
}

var invalidParam = function(t, c, p) {
    t.println('Command "' + c + '" does not accept parameter "' + p + '"');
}

/* #region ################# AVAILABLE COMMANDS ################# */
/* TODO decription */
commands.push(clear = {
    name: 'clear',
    info: 'Clears terminal content',
    params: ['help'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, param) {
        terminal.clear();
    }
    
});

commands.push(henlo = {
    name: 'henlo',
    info: 'Displays henlooo',
    params: ['help', 'any'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, param) {
        terminal.println('henlooo');
    }
});

commands.push(contact = {
    name: 'contact',
    info: 'Displays contact info',
    params: ['help'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, param) {
        terminal.println('Phone:  ' + '123 456 789');
        terminal.println('E-mail: ' + 'mpilch@mpilch.pl');
        terminal.println('GitHub: ' + 'github.com/mpilchPL');
    }
});

commands.push(typewrite = {
    name: 'typewrite',
    info: 'Simulates typewriting of given string',
    params: ['help', 'slow', 'normal', 'fast'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, p = ['normal']) {
        if (line.split(" ").length > 1) {
            // TODO wymyslic jak wyswietlac wynik bez komendy i bez parametru
            terminal.typewrite((line.substr(this.name.length+1)).split("\n"), p[0]);
        } else {
            terminal.println('Command ' + this.name + ' requires value.');
            terminal.println('Type "' + this.name + ' -help "' + 'for more info.');
        }
    }
});

/* #endregion ########################################### */


