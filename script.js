function loadingerror(fallbackid, imgid) {
    document.getElementById(imgid).style.display = 'none';
    document.getElementById(fallbackid).style.display = 'block';
}

function scrollup() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function navbarbuttonclick(id) {
    const navbar = document.getElementById("nav-link");

    const buttons = navbar.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.textDecoration = "none";
    }

    document.getElementById(id).style.textDecoration = "underline";
}

let homeupcomingtextstate = false;

function homeupcomingtext() {
    const heading = document.getElementById("homeupcomingh3");
    const description = document.getElementById("homeupcomingdescription");
    const button = document.getElementById("homeupcomingbutton"); 
    const bottomright = document.getElementById("homeupcoming-right-bottom-box"); 
    const bottomleft = document.getElementById("homeupcoming-left-bottom-box"); 
    if (!homeupcomingtextstate) { // Expand
        description.innerHTML = "Created by our student-led music association, this international playlist blends live performances from young musicians with AI-generated pieces composed using student-written algorithms. Combining music, technology, and therapy, it’s designed to support emotional well-being in hospitals and retirement homes—helping seniors reconnect with memories and find comfort through sound.";
        
        bottomright.style.minHeight = "65.5%"; 
        bottomright.style.marginTop = "8%"; 
        
        bottomleft.style.minHeight = "65.5%";
        bottomleft.style.marginTop = "8%";

        button.innerHTML = "Show Less";

    } else { // Shrink
        description.innerHTML = "Created by our student-led music association, this international playlist blends live performances from young musicians with AI-generated pieces composed using student-written algorithms. Combining music...";
        
        bottomright.style.minHeight = "48%"; 
        bottomright.style.marginTop = "8%"; 
        
        bottomleft.style.minHeight = "48%";
        bottomleft.style.marginTop = "8%";

        button.innerHTML = "Show More";
    }

    homeupcomingtextstate = !homeupcomingtextstate;
}


// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, observerOptions);

// Initialize animations and emailjs
window.onload = function () {
    emailjs.init("osOerPkbsXjU8BTFC");
    
    // Add animations to sections
    const sections = document.querySelectorAll('.homeintro, .homeaboutus, .homeupcoming, .homegetintouch, .homecontactus');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Add animations to cards and boxes
    const cards = document.querySelectorAll('.homeaboutus-bottom-box, .homeupcoming-grid .homeupcoming-left-grid, .homeupcoming-grid .homeupcoming-right-grid');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });

    // Add hover animations to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.transition = 'transform 0.3s ease-in-out';
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

function homecontactus_sendemail() {
    const button = document.getElementsByClassName("homecontactus-email-info-submit")[0];
    button.innerHTML = "Sending...";
    const templateParams = {
        name: document.getElementById("FirstName").value + " " + document.getElementById("Lastname").value,
        time: new Date().toLocaleTimeString(),
        message: document.getElementById("Message").value + "\n\nEmail: " + document.getElementById("Email").value + "\nPhone Number: " + document.getElementById("Phone").value,
    };

    const serviceID = "service_alexon9";
    const templateID = "template_kc9rdwd";

    emailjs.send(serviceID, templateID, templateParams).then(function (response) {
        alert("Email sent successfully!");
        button.innerHTML = "Submit";

    }, function (error) {
        alert("Failed to send email, please try again. ");
    });

    document.getElementById("FirstName").value = null;
    document.getElementById("Lastname").value = null;
    document.getElementById("Email").value = null;
    document.getElementById("Message").value = null;
    document.getElementById("Phone").value = null;

    console.log(templateParams);
}