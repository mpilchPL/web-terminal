function handleCommand(terminal, command, line, param) { 

    if(param == 'help') {
        switch (command.toLowerCase()) {
            case 'henlo':
                terminal.println('*********');
                terminal.println('command: {henlo}');
                terminal.println('effect: prints [henlooo]');
                terminal.println('*********');
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
    
            case 'phone':
                break;
    
            case '':
                break;
    
            case '':
                break;
    
            default:
                terminal.println('Invalid syntax');
                break;
        }
    } else {

        switch (command.toLowerCase()) {
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
    
            case 'contact':
                terminal.println('Phone number:');
                terminal.println('123 456 789');
                break;
    
            case '':
                break;
    
            case '':
                break;
    
            default:
                terminal.println('Invalid syntax');
                break;
        }
    }
 }