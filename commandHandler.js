let commands = new Array(); // Array with all available commands
const SCROLL_TARGETS = ['test1', 'test2', 'test3', 'test4'];
const ABOUT_ME = [
    'This is about me text,', 
    'each values of this array represents 1 line,',
    'in respect of window width obviously.'
];




function handleCommand(terminal, command, line, param) {
    if(findByName(command.toLowerCase()) < 0) {             //COMMAND DOESNT EXIST
        // here feedback info if needed
        return;
    }
    currentCommand = commands[findByName(command.toLowerCase())];

    var paramsFiltered = param.filter(element => {          // FILTER PARAMS TO PASS ONLY VALID ONES
        return (currentCommand.params.includes(element.toLowerCase()));
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

function commandInfo(terminal, command, info, params, values) {
    terminal.println('---------');
    terminal.println('Command:    ' + '[' + command + ']');
    if(params.length > 0) {
        terminal.println('Parameters: ' + '[' + params + ']');
    }
    if(values != undefined) {
        terminal.println('Values:     ' + '[' + values + ']');
    }
    terminal.println('Effect:     ' + info);
    terminal.println('---------');
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
    execute(terminal, command, line, p) {
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
    execute(terminal, command, line, p) {
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
    execute(terminal, command, line, p) {
        terminal.println('Phone:  ' + '123 456 789');
        terminal.println('E-mail: ' + 'mpilch@mpilch.pl');
        terminal.println('GitHub: ' + 'github.com/mpilchPL');
    }
});

commands.push(about = {
    name: 'about',
    info: 'Displays info about author',
    params: ['help'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, p) {
        terminal.typewrite(ABOUT_ME, 'fast');
    }
});

commands.push(cmd = {
    name: 'cmd',
    info: 'Displays all available commands',
    params: ['help'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, p) {
        commands.forEach( c => {
            terminal.println(c.name + ' - ' + c.info);
        });
        terminal.println('---------');
        terminal.println('For more information about each command type any command with \'help\' parameter.');
        terminal.println('Example: [goto -help]');
    }
});

commands.push(howTo = {
    name: 'howto',
    info: 'Displays instructions how to use terminal',
    params: ['help'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, p) {
        terminal.println('---------');
        terminal.println('instructions'); // TODO uzupelnic
        terminal.println('instructions');
        terminal.println('---------');
    }
});

commands.push(typewrite = {
    name: 'typewrite',
    info: 'Simulates typewriting of given string',
    params: ['help', 'slow', 'normal', 'fast'],
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params);
    },
    execute(terminal, command, line, p) {
        if (line.split(" ").length > 1) {
            if (p == undefined) {   // NO PARAMETER WAS GIVEN
                terminal.typewrite((line.substr(this.name.length+1)).split("\n"));  // TYPEWRITE LINE WITHOUT COMMAND
                return;
            }
            terminal.typewrite((line.substr(this.name.length + p[0].length + 3)).split("\n"), p[0].toLowerCase()); // TYPEWRITE LINE WITHOUT COMMAND AND PARAMETER
        } else {                                                                                        // NUMBER 3 STANDS FOR SPACES(2) AND '-'
            terminal.println('Command ' + this.name + ' requires value.');
            terminal.println('Type "' + this.name + ' -help "' + 'for more info.');
        }
    }
});

commands.push(goto = {
    name: 'goto',
    info: 'Scrolls website to the target',
    params: ['help'],
    values: SCROLL_TARGETS,
    showInfo(terminal) {
        commandInfo(terminal, this.name, this.info, this.params, this.values);
    },
    execute(terminal, command, line, p) {
        var target = line.substr(this.name.length+1);
        if(SCROLL_TARGETS.includes(target.toLowerCase())) {
            terminal.goto(target, 500);
        }
    }
});

/* #endregion ########################################### */


