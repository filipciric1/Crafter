//---------------------------NAVIGACIJA--------------------------------------

let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('nav a');

window.onscroll=()=>{
    sections.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top>=offset && top<offset+height){
            navLinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        };
    });
};
// let menuList = document.getElementById("menuList")
//     menuList.style.maxHeight = "0px";

//     function toggleMenu(){
//         if(menuList.style.maxHeight == "0px"){
//             menuList.style.maxHeight = "300px";
//         }
//             else{
//                 menuList.style.maxHeight = "0px";
//             }
//         }

//------------------------SCROLL TO TOP---------------------------------------

let mybutton = document.getElementById("myBtn1");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


//-------------------FORMA--------------------------

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required,must be: Filip');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address,must be filip@gmail.com');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};

//----------------------HOME SLIDER------------------------------------------

var slides=document.querySelectorAll(".slide");
var btns=document.querySelectorAll(".btn");
let currentSlide=1;

var manualNav=function(manual){

    slides.forEach((slide)=>{
        slide.classList.remove('active1');
        btns.forEach((btn)=>{
            btn.classList.remove('active1');
        });
    });
    slides[manual].classList.add('active1');
    btns[manual].classList.add('active1');
}
btns.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        manualNav(i);
        currentSlide=i;
    });
});

var repeat=function(activeClass){
    let active=document.getElementsByClassName('active1');
    let i=1;
    
    var repeater=()=>{

        setTimeout(function(){
            [...active].forEach((activeSlide)=>{
                activeSlide.classList.remove('active1');
            });

            slides[i].classList.add('active1');
            btns[i].classList.add('active1');
            i++;

            if(slides.length==i){
                i=0;
            }
            if(i>=slides.length){
                return;
            }
            repeater();},10000);
    }
    repeater();
}
repeat();

//-----------------------SERVICE SLIDER------------------------------

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

//-----------------------ABOUT READ MORE------------------------------------------------

$(document).ready(function(){
    $(".rdmore").click(function(){
    $(this).siblings('.limit').toggle();
    if($(this).text() == 'Read Less'){
    $(this).text( 'Read More' );
    $(this).prev().toggle();
    }
    else{
    $(this).text( 'Read Less' );
    $(this).prev().toggle();
    }
    });
    });

//-------------------------GALLERY--------------------------------------------------------------

let nizSlika1=["1.jpg","2.jpg","3.jpg","4.jpg"];
let nizAlt1=["1","2","3","4"];

ispisSlika1="";

for(let i=0;i<nizSlika1.length;i++){
    ispisSlika1+=`<img src="image/${nizSlika1[i]}" alt="${nizAlt1[i]}"/>`
}
document.getElementById("slike1").innerHTML=ispisSlika1;

let nizSlika2=["5.jpg","6.jpg","7.jpg","8.jpg"];
let nizAlt2=["5","6","7","8"];

ispisSlika2="";

for(let i=0;i<nizSlika2.length;i++){
    ispisSlika2+=`<img src="image/${nizSlika2[i]}" alt="${nizAlt2[i]}"/>`
}
document.getElementById("slike2").innerHTML=ispisSlika2;

let nizSlika3=["9.jpg","10.jpg","14.jpg","15.jpg"];
let nizAlt3=["9","10","11","12"];

ispisSlika3="";

for(let i=0;i<nizSlika3.length;i++){
    ispisSlika3+=`<img src="image/${nizSlika3[i]}" alt="${nizAlt3[i]}"/>`
}
document.getElementById("slike3").innerHTML=ispisSlika3;

//--------------GALLERY SHOW MORE--------------------------------------------

function loadMore() {
    var dots = document.getElementById("dots");
    var moreImage = document.getElementById("more");
    var loadBtn = document.getElementById("load-more");
    var gallery = document.getElementById("gallery");

    if (dots.style.display === "none") {
      gallery.style.height="860px";
      dots.style.display = "inline";
      loadBtn.innerHTML = "Show More"; 
      moreImage.style.display = "none";
    } else {
      dots.style.display = "none";
      loadBtn.innerHTML = "Show Less"; 
      moreImage.style.display = "inline";
      gallery.style.height="1250px"
    }
  }
//----------------------------------------------------------------------- 

