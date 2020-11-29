


$('#rowH').html(i.height() + " container: " + $('.container').height());

$('#trigger').click(function (e) { 
    var newFontSize = Math.floor($('.container').height() * 0.9 / ((maxRows+1)*1.2));
    $('.container').css('font-size', newFontSize);
    $('#rowH').html(i.height() + " container: " + $('.container').height() + "font " + $('.container').css('font-size'));

    var str1 = "amento mori dolori commodori*There are only 10 types of people in the world:*Those who understand binary, and those who don't";

    setDestination(o);
    setArray(str1.split("*"));
    resetValues();
    typewriter();
});


// TODO simplify this
$('#term_optionsButton').click(function (e) { 
    hideAllDropdowns();
    $('#term_optionsMenu').toggleClass('term_hidden');
});

$('#term_helpButton').click(function (e) { 
    hideAllDropdowns();
    $('#term_helpMenu').toggleClass('term_hidden');
});

$('#term_fileButton').click(function (e) { 
    hideAllDropdowns();
    $('#term_fileMenu').toggleClass('term_hidden');
});

function hideAllDropdowns() { 
    $('#term_optionsMenu').addClass('term_hidden');
    $('#term_helpMenu').addClass('term_hidden');
    $('#term_fileMenu').addClass('term_hidden');
 }

 $('#clearBTN').click(function (e) { 
     e.preventDefault();
     terminal.clear();
 });

$(window).click(function (e) { 
     if(!e.target.closest(".term_dropdown")) {
        hideAllDropdowns();
     }
     if(e.target.closest(".term_dropdownMenu_item")) {
        hideAllDropdowns();
     }
});