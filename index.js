// imports
const blogLinks = [
    {
        url: "https://medium.com/@jns368/building-cross-platform-mobile-applications-with-react-native-1e3e120e4a29",
        title: "Building Cross-Platform Mobile Applications with React Native",
        description: `While, React Native as a framework allows us to write consistently useable 
        code for both iOS and Android, there are often times when we may want to or have to separate 
        our code for the former and the latter devices to build the desired universal UI/logic. 
        One way to do this is with the Platform`,
        image: './images/cross-platform.gif',
        published: 'April 12, 2020'
    },
    {
        url: "https://levelup.gitconnected.com/what-are-proptypes-why-use-them-933744e7583e",
        title: "What are PropTypes and Why Do We Use Them?",
        description: `React can be used to seamlessly spin up sophisticated webs of data 
        that flow and transform throughout a program’s course. However, an application’s 
        complex structure can just as seamlessly unravel and devolve into utter chaos and 
        darkness. One of the most helpful ways I’ve recently found to debug and manage data 
        flow in React has been with the use of PropTypes.`,
        image: './images/giphy.gif',
        published: 'April 4, 2020'

    },
    {
        url: "https://levelup.gitconnected.com/function-currying-in-javascript-46d7ccee1a0e",
        title: "Function Currying in JavaScript",
        description: `Function currying is a useful technique in 
        functional programming that allows us to evaluate a function which 
        would have taken multiple arguments into a function with a series of sequential inner
        functions each with single arguments instead. Although not unique to JavaScript by any 
        means, the technique is carried out in JavaScript by using closures`,
        image: './images/currying.png',
        published: 'March 29, 2020'
    }  
]
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
let footer = document.querySelector('.time');

const blogs = document.querySelector('.blogs');

//***************************************/
//functions

function displayTime() {
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

            <button id="hide">X</button>

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
const blogsInitialState = blogs.innerHTML;

const blogTitle = '<h1 id="bi-title">Blog Posts</h1><hr />';

blogs.addEventListener('click', () => {
    blogs.classList.remove('hover');
    blogs.insertAdjacentHTML('beforebegin', blogTitle);
    blogs.innerHTML = addBlogs(blogLinks);
})


const addBlogs = () => {
    return blogLinks.map(blog => {
        return `
        <div class="blogs-container">
            <blockquote class="embedly-card">
                <h2>${blog.published}</h2>
                <h4>
                    <a href="${blog.url}"target="_blank">
                        ${blog.title}
                        <img class="bi-link" src="${blog.image}" />
                    </a>
                </h4>
                <p>
                    ${blog.description}
                    <a class="bi-link" href="${blog.url}" target="_blank"> 
                    ...continue reading </a>
                </p> 
            </blockquote>
        </div>
        `
    })
}



//************************************************/
//function calls 

//creates the timer
setInterval(displayTime, 1000);

//gives each bullet in the navbar its associated image
displayNavListBullets();


// "Jack Staffen is a ..." moves left from off screen right
animateParagraph();

