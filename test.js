if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    alert();
   }


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


