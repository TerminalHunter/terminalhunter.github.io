TestWorldScreen = new Screen ({
	init: twsInit,
	update: twsUpdate,
	onKeyDown: twsOnKeyDown,
	backgroundColor: 0x66CC99
});

//Obviously, source code contains spoilers.

function twsInit()
{
	// IMPORTANT:
	// anything that you want to access
	// after the init() method completes
	// (i.e. in the update function),
	// you must attach it to the screen
	// via "this.variableName = ...",
	// instead of "var variableName = ..."

	var stageWorld = this.stage;
	
	//Filters
	this.grayFilter = new PIXI.GrayFilter();
	this.grayFilter.gray = 0.8;
	this.grayerFilter = new PIXI.GrayFilter();
	this.grayerFilter.gray = 1;
	this.pixellate = new PIXI.PixelateFilter();
	this.pixellate.size.x = 3;
	this.pixellate.size.y = 3;
	
	//Setting up the background
	
	this.canterlottexture = Images.getTexture("canterlot.png");
	this.canterlotBG = new PIXI.Sprite(this.canterlottexture);
	this.canterlotBG.filters = [this.pixellate];
	this.canterlotBG.width = STAGE_W/2 + 50;
	this.canterlotBG.x = 350;
	this.canterlotBG.y = -150;
	stageWorld.addChild(this.canterlotBG);
	
	var gfx = new PIXI.Graphics();
	gfx.beginFill(0x8f5f8f, 1);
	gfx.drawEllipse(600, 350, 250,50);
	gfx.drawRect(350, 350, 25, 25);
	gfx.beginFill(0x9f6f9f, 1);
	gfx.drawEllipse(600, 360, 250,45);
	gfx.drawRect(350, 360, 500, 500);
	stageWorld.addChild(gfx);
	
	//Pony Textures

	this.poniTextures = [];
	this.poniTextures.push(Images.getTexture("derpy.png"));
	this.poniTextures.push(Images.getTexture("amber_easter_egg.png"));
	
	this.Canterlot = [];
	
	//Easter Eggish Stuff
	var isDerpy = false; //haha, I assumed I'd have enough time to make more ponies besides derpy.... hahahaha
	var isAmber = false;
	
	//Resources
	this.Love = 100; //measured in "ships sailed"
	this.LPT = -100;
	this.Bits = 0;
	this.BPT = 0;
	
	this.rations = 0;
	
	this.PoniesAlive = 50;
	this.PoniesSick = 0;
	this.PoniesDead = 0;
	
	this.daysSurvived = 0;
	this.credits = false;
	
	//bluh, why do you do this to me PIXI.Text?
	//for some reason it defaults back to another font unless measures are taken to ensure the text is changed in teh update loop.
	//So I have to add hacky code to force all text to update for the first 100 frames

	this.slowinit = 100;
	
	this.eventStuff = [];
	this.clearEvent = false;
	this.updatesOn = true;
	this.executeCrim = false;
	
	// add text to screen to track framerate
	this.text = new PIXI.Text("", {
			font : "24px Germar",
			fill : "white"
		});
	this.text.position.x = 6;
	this.text.position.y = 6;
	stageWorld.addChild(this.text);
	
	this.date = new PIXI.Text("", {
			font : "24px Germar",
			fill : "white"
		});
	this.date.position.x = 580;
	this.date.position.y = 6;
	stageWorld.addChild(this.date);
	
	//text to track resource count
	this.lovetext = new PIXI.Text("a", {
		font: "24px Germar",
		fill: "white"
	});
	this.lovetext.position.x = 20;
	this.lovetext.position.y = 94;
	stageWorld.addChild(this.lovetext);
	
	this.bitstext = new PIXI.Text("b", {
		font: "24px Germar",
		fill: "white"
	});
	this.bitstext.position.x = 20;
	this.bitstext.position.y = 129;
	stageWorld.addChild(this.bitstext);
	
	this.timetext = new PIXI.Text("", {
		font: "24px Germar",
		fill: "white"
	});
	this.timetext.position.x = 20;
	this.timetext.position.y = 59;
	stageWorld.addChild(this.timetext);
	
	this.flavortext = new PIXI.Text("", {
		font: "24px Germar",
		fill: "white"
	});
	this.flavortext.position.x = 20;
	this.flavortext.position.y = 35;
	this.flavortext.setText("Love supplies will sustain");
	stageWorld.addChild(this.flavortext);

	// Populate Canterlot
	for (var i = 0; i < 50; i++) {
		//replace with get random poni texture
		var poni = new PIXI.Sprite(GetRandPoniTexture(this.poniTextures));
		
		poni.position.x = (Math.random() * (STAGE_W / 2) - 50) + (STAGE_W / 2) + 25;
		poni.position.y = ((i+1)/51) * ((STAGE_H/2) - 50) + (STAGE_H/2) + 25;
		poni.anchor.x = 0.5;
		poni.anchor.y = 0.5;
		poni.name = "background_pony";
		poni.status = "normal";
		poni.sickdays = 0;
		stageWorld.addChild(poni);
		if(i >= 2)
			poni.tint = GetRandColor();
		this.Canterlot.push(poni);
		
	}
	
	//Buttons
	
	var buttontexture = Images.getTexture("button.png");
	this.button1 = new PIXI.Sprite(buttontexture);
	this.button1.x = 20;
	this.button1.y = 200;
	this.button1.interactive = true;
	this.button1.buttonMode = true;
	this.button1.mousedown = function(){ElapseTurn();}
	this.button1.tap = function(){ElapseTurn();}
	stageWorld.addChild(this.button1);
	
	this.button1text = new PIXI.Text("Wait a day", {
		font: "20px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "260"
	});
	this.button1text.position.x = 40;
	this.button1text.position.y = 210;
	//this.button1text.width = 260;
	stageWorld.addChild(this.button1text);
	
	this.button2 = new PIXI.Sprite(buttontexture);
	this.button2.x = 20;
	this.button2.y = 240;
	this.button2.interactive = true;
	this.button2.buttonMode = true;
	this.button2.mousedown = function(){
		if(TestWorldScreen.PoniesAlive + TestWorldScreen.PoniesSick >= 1)
			Harvest();
	}
	this.button2.tap = function(){
		if(TestWorldScreen.PoniesAlive + TestWorldScreen.PoniesSick >= 1)
			Harvest();
	}
	stageWorld.addChild(this.button2);
	
	this.button2text = new PIXI.Text("Drain a pony of all its love", {
		font: "20px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "260"
	});
	this.button2text.position.x = 40;
	this.button2text.position.y = 250;
	//this.button2text.width = 260;
	stageWorld.addChild(this.button2text);
	
	this.button3 = new PIXI.Sprite(buttontexture);
	this.button3.x = 20;
	this.button3.y = 280;
	this.button3.interactive = true;
	this.button3.buttonMode = true;
	this.button3.mousedown = function(){
		if(TestWorldScreen.PoniesAlive>=10)
			Stalk();
	}
	this.button3.tap = function(){
		if(TestWorldScreen.PoniesAlive>=10)
			Stalk();
	}
	stageWorld.addChild(this.button3);
	
	this.button3text = new PIXI.Text(" some love", {
		font: "18px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "265"
	});
	this.button3text.position.x = 40;
	this.button3text.position.y = 292;
	//this.button3text.width = 260;
	stageWorld.addChild(this.button3text);
	
	
	//
	//EVENT-RELATED OBJECTS
	//

	
	this.bgbutton = new PIXI.Sprite(buttontexture);
	
	this.bgbutton.position.x = 100;
	this.bgbutton.position.y = 200;
	this.bgbutton.width = 600;
	this.bgbutton.height = 400;
	stageWorld.addChild(this.bgbutton);
	this.bgbutton.visible = false;
	
	this.eventtext = new PIXI.Text("",{
		font: "20px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "375"
	});
	
	this.eventtext.x = 225;
	this.eventtext.y = 275;
	stageWorld.addChild(this.eventtext);
	this.eventtext.visible = false;
	
	//you know you've lost sleep when you start shortening your button's names to exclusively "butt"
	
	this.ebutt1 = new PIXI.Sprite(buttontexture);
	this.ebutt1.x = 20+230;
	this.ebutt1.y = 200+220;
	stageWorld.addChild(this.ebutt1);
	this.ebutt1.visible = false;
	
	this.ebutt1text = new PIXI.Text("button1", {
		font: "18px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "260"
	});
	this.ebutt1text.position.x = 40+230;
	this.ebutt1text.position.y = 210+220;
	stageWorld.addChild(this.ebutt1text);
	this.ebutt1text.visible = false;
		
	this.ebutt2 = new PIXI.Sprite(buttontexture);
	this.ebutt2.x = 20+230;
	this.ebutt2.y = 240+220;
	stageWorld.addChild(this.ebutt2);
	this.ebutt2.visible = false;
	
	this.ebutt2text = new PIXI.Text("BUTTS!", {
		font: "20px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "260"
	});
	this.ebutt2text.position.x = 40+230;
	this.ebutt2text.position.y = 250+220;
	stageWorld.addChild(this.ebutt2text);
	this.ebutt2text.visible = false;
	
	this.ebutt3 = new PIXI.Sprite(buttontexture);
	this.ebutt3.x = 20+230;
	this.ebutt3.y = 280+220;
	stageWorld.addChild(this.ebutt3);
	this.ebutt3.visible = false;
	
	this.ebutt3text = new PIXI.Text("ALL OF THE BUTTS", {
		font: "18px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "265"
	});
	this.ebutt3text.position.x = 40+230;
	this.ebutt3text.position.y = 292+220;
	stageWorld.addChild(this.ebutt3text);
	this.ebutt3text.visible = false;
	
	
	this.thenight = new PIXI.Graphics();
	this.thenight.beginFill(0x000000);
	this.thenight.drawRect(-5,-5,900,700);
	
	this.creditstext = new PIXI.Text("",{
		font: "18px Germar",
		fill: "white",
		align: "center",
		wordWrap: "true",
		wordWrapWidth: "600"
	});
	
	this.creditstext.position.x = 50;
	this.creditstext.position.y = 650;
	

	function GetRandPoniTexture(poniTextures)
	{

		if(!isAmber){
			isAmber = true;
			return poniTextures[1];
		}
		
		//hahahha, because I thought I had enough time to make assets such that I'd only have one derpy in the crowd....
		if(!isDerpy){
			isDerpy = true;
			return poniTextures[0];
		}
		
		else{
		//replace me with randomized things!
		//or not because filters...
		return poniTextures[0];
		
		}

	}
	
	//ACTIONS//
	
	function ElapseTurn()
	{
		if(TestWorldScreen.Love < 0){
			GEEMOVER();
		}
		
		TestWorldScreen.Love = TestWorldScreen.Love + TestWorldScreen.LPT + TestWorldScreen.rations;
		TestWorldScreen.Bits += TestWorldScreen.BPT;
		
		for(var i = 0; i < TestWorldScreen.Canterlot.length; i++){
			if(TestWorldScreen.Canterlot[i].status == "sick"){
				TestWorldScreen.Canterlot[i].sickdays--;
				if(TestWorldScreen.Canterlot[i].sickdays == 0){
					TestWorldScreen.Canterlot[i].status = "normal";
					TestWorldScreen.PoniesSick--;
					TestWorldScreen.PoniesAlive++;
				}
			}
		}
		
		console.log(TestWorldScreen.LPT);
		
		console.log(TestWorldScreen.PoniesAlive+" alive - "+TestWorldScreen.PoniesSick+" sick - "+TestWorldScreen.PoniesDead+" dead");
		
		TestWorldScreen.daysSurvived++;
		
	}
	
	function Harvest()
	{
		var searching = true;
		while(searching){
			var curr = Math.floor(Math.random() * TestWorldScreen.Canterlot.length);
			//console.log(curr);
			if(TestWorldScreen.Canterlot[curr].status == "normal"){
				TestWorldScreen.Canterlot[curr].status = "ded";
				searching = false;
			}
		}
		TestWorldScreen.Love += 1000;
		TestWorldScreen.LPT -= 25;
		TestWorldScreen.PoniesAlive--;
		TestWorldScreen.PoniesDead++;
		ElapseTurn();
	}
	
	function Stalk()
	{
		var searchingfor = 10;
		while(searchingfor != 0){
			var curr = Math.floor(Math.random() * TestWorldScreen.Canterlot.length);
			if(TestWorldScreen.Canterlot[curr].status == "normal"){
				TestWorldScreen.Canterlot[curr].status = "sick";
				TestWorldScreen.Canterlot[curr].sickdays = Math.round(7 + (Math.random() * 3));
				searchingfor--;
			}
		}
		TestWorldScreen.PoniesAlive -= 10;
		TestWorldScreen.PoniesSick += 10;
		TestWorldScreen.Love += 175 + Math.floor(Math.abs(TestWorldScreen.LPT)/10);
		console.log("Gained "+(175 + Math.floor(Math.abs(TestWorldScreen.LPT)/10))+" love");
		TestWorldScreen.LPT--;
		ElapseTurn();
	
	}
	
	function GEEMOVER(){
		//blacken screen
		TestWorldScreen.stage.addChild(TestWorldScreen.thenight);
		
		//make things not work
		TestWorldScreen.button1.interactive = false;
		TestWorldScreen.button2.interactive = false;
		TestWorldScreen.button3.interactive = false;
		
		//roll credits
		TestWorldScreen.credits = true;
		
		TestWorldScreen.stage.addChild(TestWorldScreen.creditstext);
		
	}

}

function twsUpdate(delta)
{
	if(this.updatesOn){
	this.lovetext.setText("Love: " + this.Love);
	this.bitstext.setText("Bits: " + this.Bits);
	}
	this.timetext.setText("the hive for " + TimeCalc(this.Love, this.LPT));

	this.text.setText(DEBUG_MODE ? (Math.round(Game.fps) + " FPS") : "|:");
	this.date.setText(DateCalc(this.daysSurvived));
	
	//for some reason, the font doesn't want to play nice
	if(this.slowinit > 1){
		this.flavortext.setText("Love supplies will sustain");
		this.button1text.setText("Wait a day");
		this.button2text.setText("Drain a pony of all its love");
		this.button3text.setText("Drain some love from passers-by")
		this.slowinit--;
	}
	
	//when you start winning, a bit of the dehumanization goes away... er... deponyization?
	if(this.LPT > -51){
		this.button2text.setText("Drain a pony of all their love");
	}
	
	//this statement checks population and renders correct status effects
	for(var i = 0; i < this.Canterlot.length; i++){
		if(this.Canterlot[i].status == "normal"){
			this.Canterlot[i].filters = null;
		}
		if(this.Canterlot[i].status == "sick"){
			this.Canterlot[i].filters = [this.grayFilter];
		}
		if(this.Canterlot[i].status == "ded"){
			this.Canterlot[i].filters = [this.grayerFilter];
			this.Canterlot[i].rotation = Math.PI;
		}
	}
	
	//this checks buttons and if they need to be greyed out etc.
	if(this.PoniesAlive >= 10){
		this.button3.alpha = 1;
	}else{
		this.button3.alpha = 0.5;
	}
	
	if(this.PoniesAlive + this.PoniesSick >= 1){
		this.button2.alpha = 1;
	}else{
		this.button2.alpha = 0.5;
	}
	
	//scripted events
	
	for(var i = 0; i < ScriptedEvents.length; i++){
		if(this.daysSurvived == ScriptedEvents[i].day){
			displayEvent(ScriptedEvents[i].event);
			ScriptedEvents[i].day = -1;
			this.updatesOn = false
			
		}
	}
	
	//random events
	
	
	//hacky things to make events work
	
	if(this.clearEvent){
		this.bgbutton.visible = false;
		this.eventtext.visible = false;
		this.ebutt1.visible = false;
		this.ebutt2.visible = false;
		this.ebutt3.visible = false;
		this.ebutt1text.visible = false;
		this.ebutt2text.visible = false;
		this.ebutt3text.visible = false;

		this.bgbutton.interactive = false;

		this.button1.interactive = true;
		this.button2.interactive = true;
		this.button3.interactive = true;
		this.clearEvent = false;
		this.updatesOn = true;
	}
	
	
	//win and loss conditions
	
	if(this.credits){
		this.creditstext.position.y--;
		this.creditstext.setText("And thus the changelings dispersed, looking for more love.\n \n \n Game Over! \n \n Thanks for playing! \n\n\n\n	Most of the underlying code is borrwed wholesale from another game project I worked on: \n \n github.com/AndyBarron/CivilWar2014 \n \n So big thank you to everyone who contributed to that project and, inadvertently, this one.\n\n\n A thanks to Jadke, Raptor, and any artists I'm forgetting about from the Budding Friendships project \n I've nicked a sprite or two from that old project:\n github.com/KillerJaguar/budding-friendships \n \n \n Canterlot background made by Akili \n akili-amethyst.deviantart.com/art/Canterlot-Vector-345843552 \n \n If you're not a particularly fast reader, all this info is in the source code. \n \n Send a message to terminalconnection.tumblr.com if you'd like to see this properly finished and/or improved.");
	}
}

function twsOnKeyDown(keyCode)
{
	/* If I have time for menus, this can switch screens on ESC press
	if (arrayContains(KEYS_EXIT,keyCode))
	{
		//Game.setScreen(TestMenuScreen);
		Game.setScreen(SampleMiniGame);
	}
	*/
}

function displayEvent(event){

TestWorldScreen.bgbutton.visible = true;

TestWorldScreen.eventtext.visible = true;
TestWorldScreen.eventtext.setText(event.text);

TestWorldScreen.ebutt1.visible = true;
TestWorldScreen.ebutt1.interactive = true;
TestWorldScreen.ebutt1.buttonMode = true;
TestWorldScreen.ebutt2.visible = true;
TestWorldScreen.ebutt2.interactive = true;
TestWorldScreen.ebutt2.buttonMode = true;
TestWorldScreen.ebutt3.visible = true;
TestWorldScreen.ebutt3.interactive = true;
TestWorldScreen.ebutt3.buttonMode = true;


TestWorldScreen.ebutt1text.setText(event.answer1.text);
TestWorldScreen.ebutt1text.visible = true;
TestWorldScreen.ebutt2text.setText(event.answer2.text);
TestWorldScreen.ebutt2text.visible = true;
TestWorldScreen.ebutt3text.setText(event.answer3.text);
TestWorldScreen.ebutt3text.visible = true;

TestWorldScreen.button1.interactive = false;
TestWorldScreen.button2.interactive = false;
TestWorldScreen.button3.interactive = false;

TestWorldScreen.ebutt1.mousedown = function(){
		event.answer1.effect();
		TestWorldScreen.clearEvent = true;
	}
TestWorldScreen.ebutt1.mouseover = function(){
		event.answer1.moeffect();
	}
TestWorldScreen.ebutt1.mouseout = function(){
		event.answer1.mouteffect();
	}
TestWorldScreen.ebutt1.tap = function(){
		event.answer1.effect();
		TestWorldScreen.clearEvent = true;
	}
TestWorldScreen.ebutt2.mousedown = function(){
		event.answer2.effect();
		TestWorldScreen.clearEvent = true;
	}
TestWorldScreen.ebutt2.mouseover = function(){
		event.answer2.moeffect();
	}
TestWorldScreen.ebutt2.mouseout = function(){
		event.answer2.mouteffect();
	}
TestWorldScreen.ebutt2.tap = function(){
		event.answer2.effect();
		TestWorldScreen.clearEvent = true;
	}
TestWorldScreen.ebutt3.mousedown = function(){
		event.answer3.effect();
		TestWorldScreen.clearEvent = true;
	}
TestWorldScreen.ebutt3.mouseover = function(){
		event.answer3.moeffect();
	}
TestWorldScreen.ebutt3.mouseout = function(){
		event.answer3.mouteffect();
	}
TestWorldScreen.ebutt3.tap = function(){
		event.answer3.effect();
		TestWorldScreen.clearEvent = true;
	}

}

function TimeCalc(love, lpt){

var num = Math.floor(love/Math.abs(lpt));

var daystring;

if(num==1)
	daystring = " day.";
else if(num > 365){
	num = "";
	daystring = "a long time.";
}else
	daystring = " days.";

return num + daystring;

}

function DateCalc(day){

var daystring;

if(day==1)
	daystring = " day as queen.";
else
	daystring = " days as queen.";

return day + daystring;

}

function GetRandColor(){

//var num = Math.floor(Math.rand() * 6);
/*
0 - red
1 - yeller
2 - blue
3 - orange
4 - green
5 - purple
6 - black
*/

var color = Math.floor(Math.random() * 6);

if(color == 0)
	return 0xDD2222;
		
if(color == 1)		
	return 0xDDDD22;
	
if(color == 2)
	return 0x2222FF;

if(color == 3)
	return 0xDD9922;

if(color == 4)
	return 0x22DD22;
	
if(color == 5)
	return 0xDD22DD;
	
if(color == 6)
	return 0x222222;
	
}

//CONTENT!

var RandomEvents = [];
var ScriptedEvents = [];

//well, this could be done in far fewer lines...
//but I forgot to sleep and can't brain
//why code well when you can code fast

var answer1 = {
text: "Spend Love for the hive to fix it",
effect: function(){
	
	TestWorldScreen.Love -= 300;
	TestWorldScreen.LPS += 5;
	
	},
moeffect: function(){
	TestWorldScreen.lovetext.setText("Love: " + TestWorldScreen.Love + " - 300");
},
mouteffect: function(){
	TestWorldScreen.lovetext.setText("Love: " + TestWorldScreen.Love);
}
}

var answer2 = {
text: "Set up local puppet gov't",
effect: function(){

	TestWorldScreen.LPT += 25;
	
	},
moeffect: function(){},
mouteffect: function(){}
}

var answer3 = {
text: "The more holes, the better!",
effect: function(){
	TestWorldScreen.Love += 150;
	TestWorldScreen.Bits += 50;
	},
moeffect: function(){},
mouteffect:function(){}
}

var event1 = {
text: "A drone reports growing unrest and logisitical difficulties from the amount of holes in the roads of Canterlot that the invasion has caused.",
answer1: answer1,
answer2: answer2,
answer3: answer3
}

var scriptedevent1 = {
event: event1,
day: 10
}

ScriptedEvents.push(scriptedevent1);


//---//

var Banswer1 = {
text: "Employ the hive, pay Love/day",
effect: function(){
	TestWorldScreen.rations += 50;
	TestWorldScreen.LPT += 25;
	},
moeffect: function(){TestWorldScreen.lovetext.setText("Love: " + TestWorldScreen.Love + " - extra rations")},
mouteffect: function(){}
}

var Banswer2 = {
text: "Make an example of criminals",
effect: function(){
	TestWorldScreen.Love += 1500;
	TestWorldScreen.LPT -= 75;
	TestWorldScreen.executecrim = true;
	},
moeffect: function(){TestWorldScreen.lovetext.setText("Love: " + TestWorldScreen.Love + " + 1500");},
mouteffect: function(){TestWorldScreen.lovetext.setText("Love: " + TestWorldScreen.Love)}
}

var Banswer3 = {
text: "Ignore the distraction",
effect: function(){
	TestWorldScreen.LPT -= 50;
	},
moeffect: function(){TestWorldScreen.lovetext.setText("Love: " + TestWorldScreen.Love);},
mouteffect: function(){}
}

var Bevent1 = {
text: "Since the Royal Guard has been ousted, petty crime is on the rise. Your response?",
answer1: Banswer1,
answer2: Banswer2,
answer3: Banswer3
}

var Bscriptedevent1 = {
event: Bevent1,
day: 15
}

ScriptedEvents.push(Bscriptedevent1);

// --- //

var taxanswer1 = {
text: "Reinstate full taxation",
effect: function(){
	TestWorldScreen.BPT += 150;
	TestWorldScreen.LPT -= 10;
	},
moeffect: function(){},
mouteffect: function(){}
}

var taxanswer2 = {
text: "Collect tribute, if offered",
effect: function(){
	TestWorldScreen.Bits += 500;
	TestWorldScreen.LPT += 25;
	},
moeffect: function(){TestWorldScreen.bitstext.setText("Bits: " + TestWorldScreen.Bits + " + 500");},
mouteffect: function(){TestWorldScreen.bitstext.setText("Bits: " + TestWorldScreen.Bits);}
}

var taxanswer3 = {
text: "Keep to tradition, no taxes",
effect: function(){
	TestWorldScreen.LPT += 50;
	},
moeffect: function(){},
mouteffect: function(){}
}

var taxevent1 = {
text: "A drone reports general confusion among the population because today is 'tax day.' Changeling society has no use for bits, yet some of the ponies seem to be offering them to you.",
answer1: taxanswer1,
answer2: taxanswer2,
answer3: taxanswer3
}

var taxscriptedevent1 = {
event: taxevent1,
day: 21
}

ScriptedEvents.push(taxscriptedevent1);

// --- //

// --- //

var oopsanswer1 = {
text: "Forgive TerminalHunter",
effect: function(){
	TestWorldScreen.BPT += 150;
	TestWorldScreen.LPT += 100;
	TestWorldScreen.credits = true;
	},
moeffect: function(){},
mouteffect: function(){}
}

var oopsanswer2 = {
text: "You should have done more",
effect: function(){
	TestWorldScreen.Bits += 500;
	TestWorldScreen.LPT += 25;
	TestWorldScreen.credits = true;
	},
moeffect: function(){},
mouteffect: function(){}
}

var oopsanswer3 = {
text: "Sorry, I'd rather not.",
effect: function(){
	TestWorldScreen.Love = -50;
	},
moeffect: function(){},
mouteffect: function(){}
}

var oopsevent1 = {
text: "Congrats on making it this far! Unfortunately there wasn't enough time to fully flesh out the potential story and balance the game to make it more challenging. Feel free to keep playing! ... but nothing will happen until you lose.",
answer1: oopsanswer1,
answer2: oopsanswer2,
answer3: oopsanswer3
}

var oopsscriptedevent1 = {
event: oopsevent1,
day: 25
}

ScriptedEvents.push(oopsscriptedevent1);

// --- //