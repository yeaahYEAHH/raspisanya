import { weekDay, objLDK, month, objUAK, objUPK } from "./const.js";
import objDateBr from "./birthday.js";
const date = new Date();

if(!(date.getHours() < 10 && date.getHours() < 16)){
	document.documentElement.style.setProperty('--darkBackgroundColor', '#F8F8F8');
	document.documentElement.style.setProperty('--darkContainerColor', '#FFFFFF');
	document.documentElement.style.setProperty('--darkItemColor', '#F3F4F6');
}


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
setInterval(time, 20000);

let hidden = true;
document.addEventListener("visibilitychange", () =>{
	hidden = !document.hidden ? true : false;
});

let sec = 0;
function actualLesson(obj){
	const time = new Date();
	let actualTime = `${
		(time.getHours() >= 10) ? 
		time.getHours().toString() : `0${time.getHours()}`
	}:${
		(time.getMinutes() >= 10) ? 
		time.getMinutes().toString() : `0${time.getMinutes()}`}`;

	let minutes = +obj[getActualLesson(obj, actualTime)].timeEnd.split(':')[1];
		minutes = minutes > time.getMinutes() ? minutes : minutes + 59;

	sec = sec <= 0 ? 59 : sec;
	document.querySelector('#type').innerHTML = obj[getActualLesson(obj, actualTime)].type;
	if(obj[getActualLesson(obj, actualTime)].type == "до урока"){
		document.querySelector('#aftertype').style.display = 'none';
	}
	document.querySelector('#timer').innerHTML = `${
		((minutes - time.getMinutes()) - 1) < 10 ? 
		`0${(minutes - time.getMinutes())}` : (minutes - time.getMinutes() - 1) 
	}:${
		(sec - time.getSeconds()) < 10 ? 
		`0${(sec - time.getSeconds())}` : (sec - time.getSeconds())
	}`
}


let listObj = {
	'LDK': objLDK,
	'UAK': objUAK,
	'UPK': objUPK
}

setInterval(actualLesson, 1000, listObj[document.title])

let listName = getListName()
;(function insertBirthdayName(){
	for(let index in listName){
		document.querySelector('#birthday').innerHTML += `
		<div class="birthdayName__card gradient__text">
		<img src="./assets//cake.svg" alt="cake">
		<p>${listName[index]}</p>
		</div>`
	}
})()

let birthday = listName.length == 0 ? false : true;
const cards = await document.querySelectorAll('.birthdayName__card');



if (!birthday){
	let none = document.querySelector('#third')
	none.style.display = 'none';
}

function confett(){
	if (birthday && hidden){
		confetti({
			particleCount: 200,
			spread: 1000,
			origin: { y: 0, x: 0.5},
		})
	}
}

setInterval(confett, 6000)

let content = document.querySelector('.birthdayName');

let step = 48;
let height = 0;
function slide(){
	height = height >= ((cards.length - 1) * step) ? 0 : height + step;
	content.style.top = `${-height}px`
}

setInterval(slide, 2000)