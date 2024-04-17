import { weekDay, objLDK, month } from "./const.js";
import objDateBr from "./birthday.js";
const date = new Date();

document.querySelector('#day').innerHTML = (date.getUTCDate() >= 10) ? date.getUTCDate() : `0${date.getUTCDate()}`;
document.querySelector('#year').innerHTML = `${date.getFullYear()} год`;
document.querySelector('#month').innerHTML = month[date.getUTCMonth()];
document.querySelector('#weekDay').innerHTML = weekDay[date.getUTCDay()];

function getListName(time = new Date()) {//Возвращает список имен
		let listName = [];
		for (let index in objDateBr) {
			let list = objDateBr[index].Date.split('.'),
				dayBr = list[0],
				monthBr = list[1],
				getName = (dayBr == time.getDate()
					&& monthBr == (time.getMonth() + 1)) ? objDateBr[index].Name : 'none';
			if (getName != 'none') {
				listName.push(objDateBr[index].Name);
			}
		}
		return listName;
}

function getActualLesson(obj, time){
	for(let key in obj){
		if(obj[key].timeEnd > time){
			return key
		}
	}
}

function time(){
	const time = new Date(),
		hour = (time.getHours() >= 10) ? time.getHours().toString() : `0${time.getHours()}`,
		min = (time.getMinutes() >= 10) ? time.getMinutes().toString() : `0${time.getMinutes()}`,
		realTime = `${hour}:${min}`;

	document.querySelector('#time').innerHTML = realTime;
}
time()
setInterval(time, 30000);

function startConfetti() //Отрисовка конфенти
{
	confetti({
		particleCount: 200,
		spread: 1000,
		origin: { y: 0 },
	})
}

document.addEventListener("visibilitychange", () =>{
	if (!document.hidden){
		console.log('active')
		interval = setInterval(startConfetti, 6000)
	}else{
		console.log('hidden')
		clearInterval(interval)
	}
});

let sec = 0;
function actualLesson(){
	const time = new Date();
	let actualTime = `${
		(time.getHours() >= 10) ? 
		time.getHours().toString() : `0${time.getHours()}`
	}:${
		(time.getMinutes() >= 10) ? 
		time.getMinutes().toString() : `0${time.getMinutes()}`}`;

	let minutes = +objLDK[getActualLesson(objLDK, actualTime)].timeEnd.split(':')[1];
		minutes = minutes > time.getMinutes() ? minutes : minutes + 59;

	sec = sec >= 0 ? 59 : sec;
	document.querySelector('#type').innerHTML = objLDK[getActualLesson(objLDK, actualTime)].type;
	document.querySelector('#timer').innerHTML = `${
		((minutes - time.getMinutes())) < 10 ? 
		`0${(minutes - time.getMinutes())}` : (minutes - time.getMinutes()) 
	}:${
		(sec - time.getSeconds()) < 10 ? 
		`0${(sec - time.getSeconds())}` : (sec - time.getSeconds())
	}`
}
setInterval(actualLesson, 1000)

let listName = getListName()
;(function insertBirthdayName(){
	for(let index in listName){
		document.querySelector('#birthday').innerHTML += `<span class="birthdayName__card gradient__text">${listName[0]}</span>`
	}
})()

let interval
const test = await document.querySelectorAll('.birthdayName__card');

if (listName.length == 0){
	let birthday = document.querySelector('#third')
	birthday.style.display = 'none';
	clearInterval(interval)

}else if(listName.length > 1){
	let index = 0,
	lastIndex = 0;

	function opacity(){
		lastIndex = index;
		index = index >= test.length - 1 ? 0 : index + 1;
		test[index].style.opacity = "1";
		test[lastIndex].style.opacity = "0";
	}

	function display(){
		lastIndex = index;
		index = index >= test.length - 1 ? 0 : index + 1;
		test[index].style.display = "block";
		test[lastIndex].style.display = "none";
	}

	setInterval(display, 8000)
	setInterval(opacity, 4000)
}else{
	test[0].style.opacity = "1";
	test[0].style.display = "block";
}



