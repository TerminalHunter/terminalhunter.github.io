var RandomEvents = [];
var ScriptedEvents = [];

//well, this could be done in far fewer lines...
//but I forgot to sleep and can't brain

var answer1 = {
text: "The answer!",
effect: function(){
	TestWorldScreen.Love += 50;
	TestWorldScreen.Bits += 50;
	}
}

var answer2 = {
text: "The other answer!",
effect: function(){
	TestWorldScreen.Love += 500;
	TestWorldScreen.Bits += 50;
	}
}

var answer3 = {
text: "The third answer!",
effect: function(){
	TestWorldScreen.Love += 150;
	TestWorldScreen.Bits += 50;
	}
}

var event1 = {
text: "Something has occured";
answer1: answer1;
answer2: answer2;
answer3: answer3;
}