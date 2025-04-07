window.addEventListener("scroll", function () {
	let navcontainer = document.getElementById("nav-container");
	if (this.scrollY > 45) {
		if (!navcontainer.classList.contains("stick")) {
			navcontainer.classList.add("stick");
		}
	} else navcontainer.classList.remove("stick");
});
function showMenu() {
	document.getElementById("menu").classList.add("menu");
}
function hideMenu() {
	document.getElementById("menu").classList.remove("menu");
}

//ANIMATION TYPES
var types = ["top", "left", "right", "bottom", "pop", "pop-spin"];
var wait = 150;

//IF IN USER VIEW ANIMATE ELSE REMOVE ANIMATION
function scrollAnimations() {
	let elements = document.querySelectorAll(".anim");
	for (let x = 0; x < elements.length; x++) {
		if (inView(elements[x]) === "in") {
			addScrollAnimation(elements[x]);
		}
		if (inView(elements[x]) === "out") {
			removeScrollAnimation(elements[x]);
		}
	}
}
function inView(elem) {
	let etop = elem.getBoundingClientRect().top;
	let ebottom = elem.getBoundingClientRect().bottom;
	let h = elem.offsetHeight;
	let animpoint = h / 2;

	if (ebottom < 1 || etop > window.innerHeight) return "out";
	if (etop - animpoint / 2 > 1 && etop + animpoint / 2 - window.innerHeight < 1) return "in";
	return "idle";
}

//HELPER FUNCTIONS
function hasAnimation(elem, animation) {
	return elem.classList.contains(animation);
}
function getAnimType(elem) {
	for (let x = 0; x < types.length; x++) {
		if (hasAnimation(elem, "anim-" + types[x])) {
			return types[x];
		}
	}
	return "none";
}

function getWait(elem) {
	let canwait = 0;
	if (window.matchMedia("(min-width: 1024px)").matches) canwait = 1;
	for (let i = 0, x = elem.classList.length; i < x; ++i) {
		if (/anim-wait-.*/.test(elem.classList[i])) return parseInt(elem.classList[i].split("-")[2]) * wait * canwait;
	}
	return 0;
}

//GET TYPE AND ANIMATE IF ANIMATION DOES NOT EXIST
function addScrollAnimation(elem) {
	let type = getAnimType(elem);
	if (!hasAnimation(elem, "show-anim-" + type) && type !== "none") {
		setTimeout(function () {
			elem.classList.add("show-anim-" + type);
		}, getWait(elem));
	}
}

//GET TYPE AND REMOVE IF ANIMATION EXISTS
function removeScrollAnimation(elem) {
	let type = getAnimType(elem);
	if (hasAnimation(elem, "show-anim-" + type) && !hasAnimation(elem, "anim-once")) {
		elem.classList.remove("show-anim-" + type);
	}
}

document.addEventListener("scroll", function () {
	scrollAnimations();
});
