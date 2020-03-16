//constants

const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let mainContainer = document.querySelector('.supreme');
let infoContainer = document.querySelector('.info-container');

let downArrow;



let contactModal = document.querySelector('.contact-modal-container');
let contactDisplay = false;
let closeModalButton = document.getElementById('close-modal');



let videoCarousel = document.getElementById('video-carousel');
let demosLink = document.getElementById('demos-link');

let clipboards = document.querySelectorAll('.copy');

//***************************************/
//functions

function displayTime() {
    let footer = document.querySelector('.time');
    let d = new Date();

    let hourlyArr = calculateHour(d.getHours());

    let minutes = handleMinutes(d.getMinutes());

    let seconds = handleSecond(d.getSeconds());

    footer.innerHTML = `
        <h3>
            ${dayArray[d.getDay()]} - 
            ${monthArray[d.getMonth()]} ${d.getDate()},
            ${d.getFullYear()} - 
            ${hourlyArr[0]}:${minutes}:${seconds} 
            ${hourlyArr[1]}
        </h3>
    `
}

function calculateHour(hour) {
    return hour > 12 ? [hour - 12, 'PM'] : [`0${hour}`, 'AM'];
}

function handleMinutes(minutes) {
    return minutes.toString().length > 1 ? minutes : `0${minutes}`;
}

function handleSecond(seconds) {
    return seconds.toString().length > 1 ? seconds : `0${seconds}`;
}


const displayNavListBullets = () => {
    let navList = document.querySelectorAll('.navlist li');
    return [...navList].map(item => item
        .insertAdjacentHTML('afterbegin', 
            `<div class=bullet-container>
                <img src=${'./images/oval-bullet-point.png'} 
                width=10px height=8px class=bullet alt=bullet-point />
            </div>`));
}

function animateParagraph() {
    
    let bio = document.getElementById('mini-bio');

    if (window.innerWidth <= 850) {
        bio.style.right = '-40px';
        return;
    }
    let right = -1000;

    let moveLeft = setInterval(goLeft, 10);

    function goLeft() {
        if (right === -40) {
            clearInterval(moveLeft)
        } else {
            right++;
            bio.style.right = right + 'px';
        }
    }
};


const copyClip = (link) => {

    const el = document.createElement('textarea');
    el.value = link;
    el.setAttribute('readonly', ''); 
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';   
    document.body.appendChild(el);  
    el.select();                                    
    document.execCommand('copy');
    document.body.removeChild(el);
    document.querySelector('.copied').style.display = 'block';

    setTimeout(() => {
        document.querySelector('.copied').style.display = 'none';
    }, 2000)
    

}


//***************************** /
//Event Listeners

let contactButton = document.querySelector('.navlist').firstElementChild;

contactButton.addEventListener('click', (e) => {
    e.preventDefault();
    contactDisplay = !contactDisplay;

    if (contactDisplay) {
        mainContainer.style.filter = 'blur(2px)';
        contactModal.style.display = 'block';
    } else {
        mainContainer.style.filter = 'blur(0)';
        contactModal.style.display = 'none';
    }
    
});

closeModalButton.addEventListener('click', (e) => {
    contactDisplay = false;
    contactModal.style.display = 'none';
    mainContainer.style.filter = 'blur(0)';
});

videoCarousel.addEventListener('click', (e) => {
    if (e.target === videoCarousel.querySelector('#hide')) {

        videoCarousel.style.opacity = 1;
        demosLink.style.display = 'block';
        videoCarousel.innerHTML = null;
        videoCarousel.appendChild(demosLink);
        
    }
    
    let videos = document.querySelectorAll('#video-carousel iframe');
    let videoContainer = document.querySelector('.video-container');

    if (e.target === videos[1]) {
        videoContainer.scrollBy(500, 0);
    } else if (e.target === videos[0]) {
        videoContainer.scrollBy(-500, 0);
    }
});


demosLink.addEventListener('click', () => {
    demosLink.style.display = 'none';
    videoCarousel.innerHTML = `
        <article class="video-container">

            <button id="hide">x</button>

            <iframe width="460" height="290"
            src="https://www.youtube.com/embed/QHwTNesGLOA" 
            frameborder="0" allow="accelerometer; autoplay; 
            encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>

            <iframe width="460" height="290"
            src="https://www.youtube.com/embed/R0dju-rHvVE" 
            frameborder="0" allow="accelerometer; autoplay; 
            encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>

        </article>

        `
});

function slowScroll(horiz, vert, node) {
    let i = 0;
    let scroll = setInterval(scrollAnime, 40);

    function scrollAnime() {
        if (i === vert) {
            clearInterval(scroll);
            return;
        } else {
            node.scrollBy(horiz, i++);
        }
    }
}

if (window.innerWidth <= 850) {
    
    infoContainer.addEventListener('click', (e) => {
        if (e.target === document.getElementById('music')) {
            slowScroll(0, 15, infoContainer);
        }
    });

    let spans = document.querySelectorAll('.tooltip span');
    [...spans].map(node => {
        node.style.display = 'none';
    });


}

contactModal.addEventListener('click', (e) => {
    let clipArr = [...clipboards]
    if (e.target === clipArr[0]) {
        let email = document.querySelector('#email').innerText;
        copyClip(email)
    } else if (e.target === clipArr[1]) {
        let linkedin = document.querySelector('#linkedin').getAttribute('href');
        copyClip(linkedin)
    }
})





//************************************************/
//function calls 

//creates the timer
setInterval(displayTime, 1000);

//gives each bullet in the navbar its associated image
displayNavListBullets();


// "Jack Staffen is a ..." moves left from off screen right
animateParagraph();

