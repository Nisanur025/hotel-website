/*-----------
    PAGE 1 
-------------*/
// Hamburger Menu | Open
function openMenu() {
    document.getElementById("leftMenu").style.width = "25%";
}
// Hamburger Menu | Close
function closeNav() {
    document.getElementById("leftMenu").style.width = "0%";
}

// Update active dot, scroll to dot when clicked
(function () {
    const container = document.getElementById('snapContainer');
    const sections = Array.from(container.querySelectorAll('.snap-section'));
    const dotsWrapper = document.getElementById('rigthDots');

    // Creating Dots
    sections.forEach((sec, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Page ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            sections[i].scrollIntoView({ behavior: 'smooth' });
        });
        dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    // Shows which dot is active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Number(entry.target.dataset.index);
                dots.forEach(d => d.classList.remove('active'));
                dots[idx].classList.add('active');
            }
        });
    }, {
        root: container,
        threshold: 0.6 // If 60% of the section is displayed, it is active.
    });

    sections.forEach(s => observer.observe(s));
})();

// Reservation Form Page


// Check if the room is available
const roomAvailability = {
    "Room 101": [["2025-09-20", "2025-09-25"]],
    "Room 102": [["2025-09-21", "2025-09-23"]],
    "Room 103": [["2025-09-29", "2025-09-31"]],
    "Room 104": [],
    "Room 105": [],
    "Room 106": [],
    "Room 107": [],
    "Room 108": [],
};

function dateOnly(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Find room Btn 
document.getElementById("findRoomBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const checkInValue = document.getElementById("checkInInput").value;
    const checkOutValue = document.getElementById("checkOutInput").value;

    // warn if date is not selected
    if (!checkInValue || !checkOutValue) {
        alert("Please select check-in and check-out dates!");
        return;
    }

    const checkIn = new Date(checkInValue);
    const checkOut = new Date(checkOutValue);

    const groupDiv = document.getElementById("groups");
    const cards = groupDiv.querySelectorAll(".card");

    // Hide all cards first
    cards.forEach(card => card.style.display = "none");

    // The isAvailable function finds the available date based on the dates
    function isAvailable(room, checkIn, checkOut) {
        const bookings = roomAvailability[room];
        const ci = dateOnly(checkIn);
        const co = dateOnly(checkOut);

        for (let b of bookings) {
            const start = dateOnly(new Date(b[0]));
            const end = dateOnly(new Date(b[1]));
            if (!(co <= start || ci >= end)) {
                return false;
            }
        }
        return true;
    }

    // Show Available rooms
    let anyAvailable = false;
    cards.forEach(card => {
        const roomName = card.dataset.name;
        if (isAvailable(roomName, checkIn, checkOut)) {
            card.style.display = "flex";
            anyAvailable = true;
        }
    });

    if (anyAvailable) {
        // Hide reservation form
        document.getElementById("rsvForm-container").style.visibility = "hidden";

        // show choosing room page
        groupDiv.style.visibility = "visible";
    } else {
        alert("No rooms available on the selected dates!");
    }
});

// Back Label 
const backLbl_in_groups = document.getElementById("backLbl_in_groups"); //Goes to Reservation Form Page
const backLbl_in_guestInfo = document.getElementById("backLbl_in_guestInfo"); // Goes to Groups Page (Choosing room)
backLbl_in_groups.addEventListener("click", function () {
    document.getElementById("groups").style.visibility = "hidden";
    document.getElementById("rsvForm-container").style.visibility = "visible";
});

backLbl_in_guestInfo.addEventListener("click", function () {
    document.getElementById("groups").style.visibility = "visible";
    document.getElementById("guestInfo").style.visibility = "hidden";

});

// Choosing room page Btn (Make reservation)
const rsvBtn = document.querySelectorAll(".rsvBtn");
rsvBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        document.getElementById("groups").style.visibility = "hidden";
        document.getElementById("guestInfo").style.visibility = "visible";
    });
});

// Guest Information Page
// if checkbox is checked no need to get other guests information
const checkbox = document.querySelector(".sameGuest input");
const otherGuests = document.querySelector('.otherGuests');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        otherGuests.style.display = 'none';
    } else {
        otherGuests.style.display = 'inline';
    }
});

/*-----------
    PAGE 2 
-------------*/

// Opens large images (First page detailed photo and second page promo photos)
const btns = document.querySelectorAll(".open-promo-img, .detailedPhoto");
const modal = document.getElementById("modal");
const modalImages = document.getElementById("modalImages");

const nextBtn2 = document.getElementById("next2");
const prevBtn2 = document.getElementById("prev2");

let current2 = 0;
let currentImages = [];

// Image Groups
const imageGroups = {
    group1: ["https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?_gl=1*1thl5yd*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzNjY2JGo0MyRsMCRoMA..", "https://images.pexels.com/photos/37403/bora-bora-french-polynesia-sunset-ocean.jpg?_gl=1*1ujmtfa*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzNjk3JGoxMiRsMCRoMA.."],
    group2: ["https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?_gl=1*23xbny*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzNzQ1JGo0NyRsMCRoMA..", "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?_gl=1*16f2u0m*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzNzM1JGo1NyRsMCRoMA.."],
    group3: ["https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?_gl=1*j4yw5s*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzNzk1JGo1OSRsMCRoMA..", "https://images.pexels.com/photos/63340/pexels-photo-63340.jpeg?_gl=1*49l7q1*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzODA0JGo1MCRsMCRoMA.."],
    group4: ["https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?_gl=1*1c7urq*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzODQ5JGo1JGwwJGgwhttps://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?_gl=1*1c7urq*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzODQ5JGo1JGwwJGgw", "https://images.pexels.com/photos/2248523/pexels-photo-2248523.jpeg?_gl=1*1ubbcy8*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzODU1JGo1OSRsMCRoMA.."],
    group5: ["https://images.pexels.com/photos/391522/pexels-photo-391522.jpeg?_gl=1*kalqik*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTAzODM4JGoxNiRsMCRoMA.."],
    group6: ["https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?_gl=1*ncf05n*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDM2NDkkbzE5JGcxJHQxNzU4MTA0MDg3JGo1NyRsMCRoMA.."],
    group7: ["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA..", "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA.."],
    group8: ["https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA..", "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA.."],
    group9: ["https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA.."],
    group10: ["https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA..", "https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?_gl=1*17ytw4p*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2Nzk2JGo1OSRsMCRoMA.."],
    group11: ["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA..", "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA.."],
    group12: ["https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA..", "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA.."],
    group13: ["https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA.."],
    group14: ["https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA..", "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?_gl=1*tlx0cp*_ga*MTU2NDg5ODIwMC4xNzMxNjAyODIz*_ga_8JE65Q40S6*czE3NTgxMDY2MjgkbzIwJGcxJHQxNzU4MTA2NjQxJGo0NyRsMCRoMA.."]
};

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;

        // Clear items in the modal
        modalImages.innerHTML = "";

        // Load the new images
        currentImages = imageGroups[targetId] || [];
        current2 = 0;

        currentImages.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.style.display = index === 0 ? "block" : "none";
            modalImages.appendChild(img);
        });

        modal.style.display = "flex";
        // Show/hide controls based on image count
        if (currentImages.length <= 1) {
            document.querySelector(".closebtn").style.display = "none";
            document.getElementById("next2").style.display = "none";
            document.getElementById("prev2").style.display = "none";
        } else {
            document.querySelector(".closebtn").style.display = "block";
            document.getElementById("next2").style.display = "block";
            document.getElementById("prev2").style.display = "block";
        }
    });
});

// Right arrow
nextBtn2.addEventListener("click", () => {
    if (currentImages.length === 0) return;
    const imgs = modalImages.querySelectorAll("img");
    imgs[current2].style.display = "none";
    current2 = (current2 + 1) % imgs.length;
    imgs[current2].style.display = "block";
});

// Left arrow
prevBtn2.addEventListener("click", () => {
    if (currentImages.length === 0) return;
    const imgs = modalImages.querySelectorAll("img");
    imgs[current2].style.display = "none";
    current2 = (current2 === 0 ? imgs.length - 1 : current2 - 1);
    imgs[current2].style.display = "block";
});

// Close images
function closeBtn() {
    modal.style.display = "none";
    modalImages.innerHTML = "";
    currentImages = [];
    current2 = 0;
}

// To put the image in the background of the promo buttons
document.querySelectorAll('.open-promo-img').forEach(btn => {
    const bg = btn.dataset.bg;
    if (bg) btn.style.backgroundImage = `url(${bg})`;
});

/*-----------
    PAGE 3 
-------------*/

// Review Page
const track = document.querySelector('.slider-track');
const reviews = document.querySelectorAll('.review');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

let index = 0;
const cardWidth = reviews[0].offsetWidth + 30;

// Mark active half card
function updateHalfHighlight() {
    // Delete all of them first
    reviews.forEach(r => r.classList.remove('active-half'));

    // the index that will appear halfway on the right
    let halfIndex = index + 3;
    if (halfIndex < reviews.length) {
        reviews[halfIndex].classList.add('active-half');
    }
};
// Right Arrow
right.addEventListener('click', () => {
    if (index < reviews.length - 3) {
        index++;
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        updateHalfHighlight();
    }
});
// Left Arrow
left.addEventListener('click', () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        updateHalfHighlight();
    }
});

// run on first install
updateHalfHighlight();

// Review stars
document.querySelectorAll('.stars').forEach(el => {
    let rating = el.getAttribute('data-rating');
    el.innerHTML = '<i class="bi bi-star-fill"></i>'.repeat(rating);
});




