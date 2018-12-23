console.log("%cDit is een riskante plek!", "background: red; color: white; font-size: 60px");
console.warn("%cAls iemand je verteld heeft om hier iets te plakken dan probeert hij in jouw account te komen!", "background: red; color: white; font-size: 30px");
console.warn("%cJe moet hier niks uitvoeren van iemand die je niet vertrouwt!", "background: red; color: white; font-size: 40px");
var currentacc = [];
var config = {
    apiKey: "AIzaSyAPLpJ2sBnDakbRN7-s6EupTaxnAso7LL8",
    authDomain: "lunex-chat.firebaseapp.com",
    databaseURL: "https://lunex-chat.firebaseio.com",
    projectId: "lunex-chat",
    storageBucket: "",
    messagingSenderId: "403391530824"
  };
  var de = atob("=Qmcvd3czFGc".split("").reverse().join(""));
  firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("Users");

function tos(a) {
	if(a) {
		document.getElementsByClassName("tosarea")[0].style.display="none";
		document.getElementsByClassName("signuparea")[0].style.display="block";
		document.getElementsByClassName("usernametext")[0].style.display="block";
		document.getElementsByClassName("passwordtext")[0].style.display="block";
	} else {
		document.getElementsByClassName("tosarea")[0].style.display="block";
		document.getElementsByClassName("signuparea")[0].style.display="none";
		document.getElementsByClassName("usernametext")[0].style.display="none";
		document.getElementsByClassName("passwordtext")[0].style.display="none";
	}
}

function confirmedLogin() {
	document.body.style.background="#333";
	document.getElementsByClassName("topbar")[0].style.background="#036";
	document.getElementsByClassName("divider")[0].style.background="#025";
	document.getElementsByClassName("forum")[0].style.display="block";
	var css = `
	.topbartext:hover {
		background: #038;
	}

	.forum:hover {
		background: #038;
		margin: 1.3vh 0 0 20px;
	}

	.settings:hover {
		background: #038;
		margin: 1.3vh 0 0 20px;
	}`;
	var style = document.createElement('style');

	if (style.styleSheet) {
 	   style.styleSheet.cssText = css;
	} else {
	    style.appendChild(document.createTextNode(css));
	}
	document.getElementsByTagName('head')[0].appendChild(style);
}


function signup() {
	var inputs = document.getElementsByTagName("input");
	var pass = inputs[0].value;
	var user = inputs[1].value;
	if(!pass||!user) return alert("Wil je alsjeblieft iets invullen?");
	if(!document.getElementsByClassName("tosbox")[0].checked) return alert("Lees alsjeblieft de servicevoorwaarden...");
	ref.once("value",data=>{
		if(data.val()!==(null||undefined)) {
		var users = data.val();
		var keys = Object.keys(users);
		var jsonv = {

		};
		var allow = true;
		for(var i=0;i<keys.length;i++) {
			var njs = {

			};
			njs[de]=data.val()[keys[i]][de];
			njs["logged"]=false;
			jsonv[keys[i]]=njs;
			if(keys[i]===pass) allow = false;
		}
		if(allow) {
			var njs = {

			};
			njs[de]=user;
			njs["logged"]=true;
			jsonv[pass]=njs;
			ref.set(jsonv);
			currentuser = [pass,user];
			confirmedLogin();
		} else alert("Gebruikersnaam is al gekozen!");
	}
	},err=>console.log("Fout: "+err));
}

function login() {
	var inputs = document.getElementsByTagName("input");
	var pass = inputs[3].value;
	var user = inputs[4].value;
	ref.once("value",data=>{
		if(data.val()!==(null||undefined)) {
		var users = data.val();
		var keys = Object.keys(users);
		var allow = false;
		var jsonv = {

		};
		for(var i=0;i<keys.length;i++) {
			if(keys[i]===pass&&data.val()[keys[i]][de]===user) allow = true;
			var njs = {

			};
			njs[de]=data.val()[keys[i]][de];
			njs["logged"]=data.val()[keys[i]]["logged"];
			jsonv[keys[i]]=njs;
		}

		if(allow) {
			var njs = {

			};
			njs[de]=user;
			njs["logged"]=true;
			jsonv[pass]=njs;
			ref.set(jsonv);
			currentuser = [pass,user];
			confirmedLogin();
		} else alert("Sorry maar de logingegevens zijn niet correct...");
	}
	},err=>console.log("Error: "+err));
}
onbeforeunload = function (evt) {
	var inputs = document.getElementsByTagName("input");
	var pass = currentuser[0];
	var user = currentuser[1];
	var message = "We moeten nog saven!";
		ref.once("value",data=>{
		if(data.val()!==(null||undefined)) {
		var users = data.val();
		var keys = Object.keys(users);
		var jsonv = {

		};
		var allow = true;
		for(var i=0;i<keys.length;i++) {
			if(keys[i]!==pass) {
			var njs = {

			};
			njs[de]=data.val()[keys[i]][de];
			njs["logged"]=data.val()[keys[i]]["logged"];
			jsonv[keys[i]]=njs;
		}
		}
		var njs = {

		};
			njs[de]=user;
			njs["logged"]=false;
			jsonv[pass]=njs;
			ref.set(jsonv);
		}
	});
	if (typeof evt == 'undefined') {
    evt = window.event;
  }
  if (evt) {
    evt.returnValue = message;
  }
  return message;
}

function changemenu(a) {
	if(a) {
		document.getElementsByClassName("loginarea")[0].style.display="block";
		document.getElementsByClassName("signuparea")[0].style.display="none";
	} else {
		document.getElementsByClassName("loginarea")[0].style.display="none";
		document.getElementsByClassName("signuparea")[0].style.display="block";
	}
}

(()=>{
	var dayms = 86400000;
	var da = new Date();
	da.setHours(0,0,0,0);
	var today = da.getTime()+3600000;
	var fact = database.ref("Fact");
	fact.once("value",data=>{
		var factc = parseInt(data.val()["Fact"])+1;
		if(factc>facts.length) factc = 0;
		if(today-parseInt(data.val()["Timestamp"])>=dayms) fact.set({"Fact": factc, "Timestamp": today});
		document.getElementsByClassName("currentfact")[0].innerHTML = facts[parseInt(data.val()["Fact"])];
	});
})();

var facts = ["Wanneer je gekke dingen doet, moet je gekke resultaten verwachten",
	"Ik droom van een betere toekomst, waar kippen de weg over kunnen steken en niet worden gevraagd over hun motieven",
	"Nee ik struikelde niet, de vloer zag eruit alsof het een knuffel nodig had",
	"Beter laat dan nooit, maar beter nooit laat is beter",
	"Ik was in the park en vroeg me af waarom frisbees groter worden terwijl ze dichterbij komen. Toen kreeg ik hem in mijn gezicht.",
	"Wanneer verleid om vuur met vuur te bestrijden, onthoud dan dat de brandweer normaal water gebruikt.",
	"Sommige zorgen voor blijdschap waar ze ook heen gaan; anderen wanneer ze weggaan.",
	"Je moet nooit de kracht van domme mensen in grote groepen onderschatten",
	"Een succesvolle man is iemand die meer geld verdient dan zijn vrouw kan uitgeven. Een succesvolle vrouw is iemand die zo'n man kan vinden.",
	"Achter elke fantastische man staat een vrouw met haar ogen te draaien.",
	"Perfectie is niet verkrijgbaar, maar als we perfectie zoeken vinden we uitstekendheid.",
	"Een idee is niet verantwoordelijk voor de mensen die het geloven.",
	"Ik wil graag doodgaan op Mars. Maar niet met impact.",
	"Als vrouwen de wereld regeerden dan zouden we geen oorlogen hebben, alleen maar intense onderhandelingen elke 28 dagen",
	"Tussen twee kwaadheden, kies ik altijd diegene die ik nog niet geprobeerd heb.",
	"Als twee keer verkeerd niet een goed maakt, probeer dan drie keer.",	
	"De mens kan niet met alleen met brood overleven; hij zal pindakaas moeten hebben.",
	"Een pessimist is een persoon die naar te veel optimisten heeft moeten luisteren.",
	"Alle mannen zijn even voor de vis.",
	"Ik heb nog nooit getrouwd, maar ik vertel mensen dat ik gescheiden ben zodat ze niet denken dat er iets mis met mij is.",
	"O Heer, help me om puur te zijn, maar nog niet nu.",
	"Ieder kind zal een boodschap voor je doen, als je hun bedtijd vraagt.",
	"We moeten de middeleeuwen de schuld geven voor de twee verschrikkelijkste uitvindingen - romantische liefde en buskruit.",
	"Schuld: het cadeau dat blijft geven.",
	"Het nut van oorlog is niet om dood te gaan voor je land, maar om de noob van de andere kant voor zijne doodgaan",
	"Je moet altijd lenen van een pessimist. Hij zal het niet terug verwachten.",
	"Honden hebben meesters. Katten hebben personeel.",
	"Kennis is weten dat een tomato een soort fruit is; wijsheid is om het niet in je fruit salade te doen.",
	"Waarom zeggen mensen \'Niet beledigend bedoelt\' voor ze je gaan beledigen?",
	"In ieder geval, trouw. Als je een goede vrouw krijgt, wordt je blij; als je een slechte krijgt, wordt je een filosoof.",
	"Ik vroeg god om een fiets, maar ik weet dat god niet zo werkt. Dus heb ik een fiets gestolen en gevraagt om vergiffenis.",
	"De beste manier om te liegen is om de waarheid te vertellen... De voorzichtig bewerkte waarheid.",
	"Je moet niet redeneren tegen een idioot. Hij zal je tot zijn niveau trekken en je verslaan met ervaring.",
	"Het enige mysterie in het leven is waarom kamikaze piloten helmen droegen.",
	"Naar kerk gaan maakt je niet meer een christen dan in een garage staan je auto maakt.",
	"Een borg niet iets dat je nodig hebt op een prijs die je niet kan weerstaan.",
	"Als je van een auteur steelt, is het plagiaat; als je van meerdere steelt is het onderzoek.",
	"Als je denkt dat niemand iets geeft of je leeft, probeer dan een paar keer een auto afbetaling niet te betalen.",
	"Waarom is het zo dat één lucifer een bosbrand kan veroorzaken maar dat het een heel doosje kost om een kampvuur aan te krijgen?",
	"God gaf ons onze familie; gelukkig kunnen we onze vrienden kiezen.",
	"Kinderen: Je moet de eerste twee jaar van hun leven hen leren om te lopen en te praten. Dan vertel je ze de volgende 16 jaar om te gaan zitten en hun mond te houden",
	"Niets is vervelender dan tijdens het moment van een meningsverschil doorhebben dat je het verkeerd hebt."//,
	// "By the time a man realizes that his father was right, he has a son who thinks he's wrong.",
	// "We've all heard that a million monkeys banging on a million typewriters will eventually reproduce the entire works of Shakespeare. Now, thanks to the Internet, we know this is not true.",
	// "Women who seek to be equal with men lack ambition.",
	// "When you go into court you are putting your fate into the hands of twelve people who weren't smart enough to get out of jury duty.",
	// "Those people who think they know everything are a great annoyance to those of us who do.",
	// "By working faithfully eight hours a day you may eventually get to be boss and work twelve hours a day.",
	// "When tempted to fight fire with fire, remember that the Fire Department usually uses water.",
	// "America is a country where half the money is spent buying food, and the other half is spent trying to lose weight.",
	// "A bank is a place that will lend you money, if you can prove that you don't need it.",
	// "The best time to give advice to your children is while they're still young enough to believe you know what you're talking about.",
	// "Tell a man there are 300 billion stars in the universe and he'll believe you. Tell him a bench has wet paint on it and he'll have to touch it to be sure.",
	// "The human brain is a wonderful thing. It starts working the moment you are born, and never stops until you stand up to speak in public.",
	// "At every party, there are two kinds of people'those who want to go home and those who don't. The trouble is, they are usually married to each other.",
	// "You love flowers, but you cut them. You love animals, but you eat them. You tell me you love me, so now I'm scared!",
	// "I don't need a hair stylist, my pillow gives me a new hairstyle every morning.",
	// "Don't worry if plan A fails, there are 25 more letters in the alphabet.",
	// "Studying means 10% reading and 90% complaining to your friends that you have to study.",
	// "If you want your wife to listen to you, then talk to another woman; she will be all ears.",
	// "You never realize how boring your life is until someone asks what you like to do for fun.",
	// "In the morning you beg to sleep more, in the afternoon you are dying to sleep, and at night you refuse to sleep.",
	// "When I said that I cleaned my room, I just meant I made a path from the doorway to my bed.",
	// "Life isn't measured by the number of breaths you take, but by the number of moments that take your breath away.",
	// "The great pleasure in life is doing what people say you cannot do.",
	// "If we were on a sinking ship, and there was only one life vest... I would miss you so much.",
	// "All my life I thought air was free, until I bought a bag of chips.",
	// "Long time ago I used to have a life, until someone told me to create a Facebook account.",
	/*"Never take life seriously. Nobody gets out alive anyway."*/];