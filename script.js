let fin = false;
let maxNumber=0;
let searchedNumber ; 
let newSection = null;
let NbTentative;
let tabEasy;
let tabMedium;
let tabHard;



function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


function StringToList(monStr){
	let tab;
	let arr=[];
	tab=monStr.split(',');
	tabFinal=[];
	for (let e=0;e<tab.length;e++){
		if (e%2==0){
			arr.push(tab[e]);
		}else{
			arr.push(tab[e]);
			tabFinal.push(arr);
			arr=[]
		}
	}
	return tabFinal;
}

function Start(){
	maxNumber=localStorage.getItem('maxNumber');
	let Title = document.getElementById("title");
	Title.innerHTML="Timer's on";
	document.getElementById("nbInput").disabled=false;
	searchedNumber=getRandomInt(maxNumber);
	console.log(searchedNumber);
	document.getElementById('nbInput').addEventListener("change",MoreOrLess);


	if (maxNumber==200){ //on traite les cas des trois différents niveaux
		
		tabEasy=localStorage.getItem('tabEasy');
		if (tabEasy==null){ //on fait ces 3 if pour ne pas réinitialisé le tableau à chaque fois qu'on refresh la page
			tabEasy=[];
		}else{
			let tabEasyStr=localStorage.getItem('tabEasy');
			tabEasy=StringToList(tabEasyStr);
		}

	}else if(maxNumber==500){

		tabMedium=localStorage.getItem('tabMedium');
		if (tabMedium==null){
			tabMedium=[];
		}else{
			let tabMediumStr=localStorage.getItem('tabMedium');
			tabMedium=StringToList(tabMediumStr);
		}

	}else{

		tabHard=localStorage.getItem('tabHard');
		if (tabHard==null){
			tabHard=[];
		}else{
			let tabHardStr=localStorage.getItem('tabHard');
			tabHard=StringToList(tabHardStr);
		}
}


fin=false;
NbTentative=0;

}




function MoreOrLess(){
	let nInput = document.getElementById('nbInput');
	let n = nInput.value;
	console.log(searchedNumber);

	if (newSection!=null){
		document.getElementById("Affichage Principal").removeChild(newSection);
	}
	newSection = document.createElement("section");
	let newContent;



	if (n==searchedNumber) {
		newContent = document.createTextNode('Correct');
		fin = true;
		console.log("correct");
		NbTentative ++;
		Stop();
	}else if (n>=searchedNumber){
		newContent = document.createTextNode('Less');
		console.log("Less");
		NbTentative ++;
	}else{
		newContent = document.createTextNode('More');
		console.log("More");
		NbTentative ++;
	}
	newSection.setAttribute('id','MoreOrLess');
	newSection.appendChild(newContent);


	let section = document.getElementById('section1');
	section.insertAdjacentElement("afterend",newSection);
	nInput.value=null;
	
	if (fin){
		document.getElementById('nbInput').removeEventListener("change",MoreOrLess); //on enlève le event listener dès qu'on a trouvé la bonne solution
		let Title = document.getElementById("title");
		Title.innerHTML="Partie terminée, click sur go pour recommencer";
		document.getElementById("nbInput").disabled=true;
		
		if (maxNumber==200){ //on traite les cas des trois différents niveaux
			tabEasy.push([NbTentative,valtemps]);
			localStorage.setItem('tabEasy',tabEasy);
		}else if(maxNumber==500){
			tabMedium.push([NbTentative,valtemps]);
			localStorage.setItem('tabMedium',tabMedium);
		}else{
			tabHard.push([NbTentative,valtemps]);
			localStorage.setItem('tabHard',tabHard);
		}

	}
	
	return fin;

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Partie concernant le chronometre

// on definit les variables pour le temps 
let milisecondes = 0;
let secondes = 0;
let minutes = 0;

//Regler le soucis de l'unique 0 quand on lance le timer 
let displayMilisecondes=0;
let displaySecondes=0;
let displayMinutes=0;

// Intervalle de rafraichissement grace à laquelle nous allons executer plusieurs fois le chrono 
let interval = null; 

//Variable qui stocke la valeur du chronomètre
let valtemps = '';

// fonction du chronometre pour incrementer les variables

function Chrono(){
	milisecondes++;

    // quand on va incrementer les autres 
    if (milisecondes/1000 === 1){
    	milisecondes = 0;
    	secondes++;

    	if (secondes/60 === 1){
    		secondes = 0;
    		minutes++;
    	}
    }

    if(milisecondes<10){
    	displayMilisecondes = "0"+milisecondes.toString();
    }
    else{
    	displayMilisecondes = milisecondes;
    }

    if(secondes<10){
    	displaySecondes = "0"+secondes.toString();
    }
    else{
    	displaySecondes = secondes;
    }

    if(minutes<10){
    	displayMinutes = "0"+minutes.toString();
    }
    else{
    	displayMinutes = minutes;
    }
    //modification des variables affichées 
    valtemps = displayMinutes + "m :" + displaySecondes + "s :" + displayMilisecondes+"ms";
    document.getElementById("display").innerHTML=valtemps;

}


//fonction pour démarrer et arreter le chrono
function startStop(){
		// On va reset le chrono avant de démarrer 
		Reset();
        // départ du chrono 
        interval = window.setInterval(Chrono,1);
    }

    function Stop(){
    	window.clearInterval(interval);
    }

//fonction pour reset le chrono (si nécessaire)
function Reset(){
	window.clearInterval(interval);
	secondes=0;
	minutes=0;
	heures=0;
	document.getElementById("display").innerHTML = "00m :00s :00ms";
}

///////////Fonction pour confirmation de quitter partie en cours /////////////////////////////:


function confirmation(){
	let quit = confirm("Do you really want to leave")
	if (quit==true)
	{
		window.location.href = './main.html';
	}else
	{
		null;
	}
}






















