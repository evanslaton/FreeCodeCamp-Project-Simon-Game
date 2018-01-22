document.addEventListener("DOMContentLoaded", function() {

	const greenBtn = document.getElementById('greenBtn');
	const redBtn = document.getElementById('redBtn');
	const yellowBtn = document.getElementById('yellowBtn');
	const blueBtn = document.getElementById('blueBtn');
	const score = document.getElementById('score');
	const start = document.getElementById('start');
	const restart = document.getElementById('restart');
	const strict = document.getElementById('strict');
	const playBtns = document.getElementsByClassName('play-buttons');
	let win = false;
	let isPlayerTurn = false;
	let wrong = false;
	let strictModeOn = false;
	let playing = false;
	let sound = new Audio();

	const gameOrderArr = [];
	const btnArr = [greenBtn, redBtn, yellowBtn, blueBtn];
	const btnOrigColorArr = ['#0FA94C', '#9A1922', '#C5AA1E', '#2A458D'];
	const btnChangeColorArr = ['#17FF73', '#FF2938', '#FFDC27', '#4C7DFF'];
	const soundUrlArr = [
		'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
		'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
		'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'
	];
	
	const btnObject = {
		'greenBtn': greenBtn,
		'redBtn': redBtn,
		'yellowBtn': yellowBtn,
		'blueBtn': blueBtn
	};


	//Assigns click event listener to start
	var startClickEvent = () => {
		start.addEventListener('click', playGame);
		assignClickEvent();
	}

	//Assigns click event listener to playBtns
	var assignClickEvent = () => {
		for (i = 0; i < playBtns.length; i++) {
			playBtns[i].addEventListener('click', playerTurn);
		}
	}


	//Returns a random number between 0 and 3
	var getRandomInt = (min, max) => {
	    return Math.floor(Math.random() * ( max - min + 1) + min);
	};
	

	//Pushes getRandomInt() to gameOrderArr
	var pushRandomInt = randomNum => {
		gameOrderArr.push(randomNum);
	};


	//Toggles strict mode on/off
	var strictModeToggle = () => {
		if (!strictModeOn) {
			strictModeOn = true;
			strict.style.background = btnOrigColorArr[0];
		} else {
			strictModeOn = false;
			strict.style.background = btnOrigColorArr[1];
		}
	}


	//Plays sound
	var playSound = (url) => {
		sound.src = url;
		sound.play();
	}


	//Changes color, calls playSound() then returns to original color of selected playBtn
	var btnActive = (i) => {
		if (!isPlayerTurn) {
			setTimeout(() => {				
				btnArr[gameOrderArr[i]].setAttribute('style', `background-color: ${btnChangeColorArr[gameOrderArr[i]]};`);
				playSound(soundUrlArr[gameOrderArr[i]]);

				setTimeout(() => {
					btnArr[gameOrderArr[i]].setAttribute('style', `background-color: ${btnOrigColorArr[gameOrderArr[i]]};`);
				}, 800);
			}, 1000 * i);
		} else {
			btnArr[i].setAttribute('style', `background-color: ${btnChangeColorArr[i]};`);
			playSound(soundUrlArr[i]);

			setTimeout(() => {
				btnArr[i].setAttribute('style', `background-color: ${btnOrigColorArr[i]};`);
			}, 800);
		}
	};


	function playerTurn() {
		if (isPlayerTurn) {
			let btnId = this.id;
			let btnEl = btnObject[btnId];
			let btnIndex = btnArr.indexOf(btnEl);
			btnActive(btnIndex);


			console.log('btnId: ' + btnId);
			console.log('btnEl: ' + btnEl);
			console.log('btnIndex: ' + btnIndex);
			// isPlayerTurn = false;
		}
	};


	var playGame = () => {
		pushRandomInt(getRandomInt(0, 3));
		console.log(`gameOrderArr: ${gameOrderArr}`);

		if (!playing && !isPlayerTurn) {
			for (i = 0; i < gameOrderArr.length; i++) {
				btnActive(i);
			};

			playing = true;
			isPlayerTurn = true;
			score.textContent = gameOrderArr.length;
		} 
	};

	startClickEvent();
	// console.log(playBtns);
	// console.log(`: ${}`);
});