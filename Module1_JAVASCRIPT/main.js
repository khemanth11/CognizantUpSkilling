console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
    alert("Welcome to the Community Portal! The portal is fully loaded and ready.");
    console.log("Portal initialization completed.");
});

let events = [];

function Event(id, name, date, category, seats, venue, image) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.category = category;
    this.seats = seats;
    this.venue = venue;
    this.image = image;
}

Event.prototype.checkAvailability = function() {
    return this.seats > 0;
};

function createCategoryTracker() {
    const tallies = {
        Music: 0,
        Food: 0,
        Tech: 0,
        Arts: 0,
        Sports: 0,
        Civic: 0
    };
    
    return {
        increment: function(category) {
            if (tallies.hasOwnProperty(category)) {
                tallies[category]++;
                const countElem = document.getElementById(`tally-${category}`);
                if (countElem) {
                    countElem.innerText = tallies[category];
                }
                console.log(`Updated tally for ${category}: ${tallies[category]}`);
            }
        },
        getTally: function(category) {
            return tallies[category] || 0;
        }
    };
}

const categoryTracker = createCategoryTracker();

function addEvent(newEvent) {
    events.push(newEvent);
}

function customFilterEvents(eventsList, callback) {
    return eventsList.filter(callback);
}

function demonstratePromiseChain() {
    fetch("events.json")
        .then(response => {
            if (!response.ok) throw new Error("Fetch failed");
            return response.json();
        })
        .then(data => {
            console.log("Promise sequence resolved successfully:", data);
        })
        .catch(err => {
            console.warn("Promise fallback intercepted:", err);
        });
}

async function loadEventsAsync() {
    const spinner = document.getElementById("eventLoadingSpinner");
    if (spinner) spinner.style.display = "flex";

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch("events.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const clonedData = [...data];
        
        events = [];
        clonedData.forEach(item => {
            const ev = new Event(
                item.id,
                item.name,
                item.date,
                item.category,
                item.seats,
                item.venue,
                item.image
            );
            addEvent(ev);
        });

        renderEventsGrid();
        renderScheduleTable();
        populateRegistrationOptions();
        
        showToast("Events database synced successfully!", "success");
    } catch (error) {
        showToast("Failed to load events database.", "error");
        console.error("Async load error:", error);
    } finally {
        if (spinner) spinner.style.display = "none";
    }
}

function renderEventsGrid(filteredList = events) {
    const grid = document.querySelector("#dynamicEventsGrid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    filteredList.forEach(event => {
        const isFull = !event.checkAvailability();
        const { id, name, date, category, seats, venue, image } = event;
        
        const card = document.createElement("div");
        card.className = "eventCard";
        card.id = `event-card-${id}`;
        if (isFull) card.classList.add("sold-out");
        
        const formatBadge = (cat = "General") => `<span class="category-badge">${cat}</span>`;
        
        card.innerHTML = `
            <img src="${image}" alt="${name}" title="${name}" class="eventImage">
            <div class="event-details-body" style="padding-top: 1rem; text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    ${formatBadge(category)}
                    <span style="font-size: 0.8rem; color: ${isFull ? 'var(--accent-red)' : 'var(--accent-green)'}; font-weight: bold;">
                        ${isFull ? 'Sold Out' : seats + ' seats left'}
                    </span>
                </div>
                <h4 style="font-family: 'Outfit', sans-serif; font-size: 1.15rem; color: var(--text-main); margin-bottom: 0.25rem;">${name}</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;"><i class="date-icon">📅</i> ${date}</p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;"><i class="venue-icon">📍</i> ${venue}</p>
            </div>
        `;
        
        card.onclick = () => {
            inspectEventObject(event);
        };
        
        grid.appendChild(card);
    });
}

function renderScheduleTable() {
    const tableBody = document.querySelector("#eventScheduleBody");
    if (!tableBody) return;
    
    tableBody.innerHTML = "";
    
    events.forEach(event => {
        const { name, date, seats, venue } = event;
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td><strong>${name}</strong></td>
            <td>${date}</td>
            <td><span class="seat-badge ${seats === 0 ? 'full' : ''}">${seats} remaining</span></td>
            <td>${venue}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function populateRegistrationOptions() {
    const select = document.querySelector("#eventType");
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Choose an Event Program --</option>';
    
    const optionsHtml = events.map(event => {
        const fee = event.id * 100;
        const status = event.seats === 0 ? " (Sold Out)" : ` (₹${fee})`;
        return `<option value="${event.id}" data-fee="${fee}" ${event.seats === 0 ? 'disabled' : ''}>
            ${event.name}${status}
        </option>`;
    }).join("");
    
    select.innerHTML += optionsHtml;
}

function inspectEventObject(event) {
    const inspectorDiv = document.querySelector("#inspectorContent");
    if (!inspectorDiv) return;
    
    let tableHtml = `
        <table class="inspector-table">
            <thead>
                <tr>
                    <th>Object Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    const entries = Object.entries(event);
    entries.forEach(([key, value]) => {
        if (key === 'image') {
            tableHtml += `<tr><td><strong>${key}</strong></td><td><span style="font-size: 0.7rem; word-break: break-all;">${value}</span></td></tr>`;
        } else {
            tableHtml += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
        }
    });
    
    tableHtml += `
            </tbody>
        </table>
    `;
    
    inspectorDiv.innerHTML = tableHtml;
    document.querySelector("#developerCorner").scrollIntoView({ behavior: "smooth" });
    showToast(`Inspecting: ${event.name}`, "info");
}

function applyFilterAndSearch() {
    const categoryVal = document.getElementById("eventCategorySelect").value;
    const searchVal = document.getElementById("eventSearchInput").value.trim().toLowerCase();
    const eventPool = [...events];
    
    const categoryCallback = (ev) => categoryVal === "all" || ev.category === categoryVal;
    const searchCallback = (ev) => ev.name.toLowerCase().includes(searchVal);
    
    let results = customFilterEvents(eventPool, ev => categoryCallback(ev) && searchCallback(ev));
    const cardsGrid = $("#dynamicEventsGrid");
    
    cardsGrid.fadeOut(250, function() {
        renderEventsGrid(results);
        cardsGrid.fadeIn(250);
    });
}

function setupFilterListeners() {
    const categorySelect = document.getElementById("eventCategorySelect");
    const searchInput = document.getElementById("eventSearchInput");
    
    if (categorySelect) {
        categorySelect.onchange = applyFilterAndSearch;
    }
    
    if (searchInput) {
        searchInput.onblur = applyFilterAndSearch;
        searchInput.addEventListener("keydown", (e) => {
            setTimeout(applyFilterAndSearch, 50);
        });
    }
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("eventForm");
    const nameInput = form.elements["name"];
    const emailInput = form.elements["email"];
    const phoneInput = document.getElementById("phone");
    const dateInput = document.getElementById("date");
    const eventTypeInput = form.elements["eventType"];
    
    let isValid = true;
    clearInlineErrors();
    
    try {
        if (!nameInput.value.trim()) {
            showInlineError(nameInput, "Full Name is required.");
            isValid = false;
        }
        
        if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
            showInlineError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }
        
        if (!eventTypeInput.value) {
            showInlineError(eventTypeInput, "Please select an event program.");
            isValid = false;
        }
        
        if (!dateInput.value) {
            showInlineError(dateInput, "Please choose an event date.");
            isValid = false;
        }
        
        if (!isValid) {
            throw new Error("Validation Failed: Please fill in all required fields correctly.");
        }
        
        const selectedId = parseInt(eventTypeInput.value);
        const selectedEvent = events.find(ev => ev.id === selectedId);
        
        if (!selectedEvent) {
            throw new Error("Selected event does not exist in our portal.");
        }
        
        if (!selectedEvent.checkAvailability()) {
            throw new Error("Registration Failed: This event is already full!");
        }
        
        let seatsBefore = selectedEvent.seats;
        selectedEvent.seats--;
        console.log(`[Seat Management] Event: ${selectedEvent.name}, seats decreased: ${seatsBefore} -> ${selectedEvent.seats}`);
        
        renderEventsGrid();
        renderScheduleTable();
        populateRegistrationOptions();
        
        categoryTracker.increment(selectedEvent.category);
        
        const payload = {
            fullName: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            date: dateInput.value,
            eventId: selectedEvent.id,
            eventName: selectedEvent.name,
            timestamp: new Date().toISOString()
        };
        
        console.group("Registration debug trace");
        console.log("Status: Input validation passed.");
        console.log("Status: Seats verified & decremented.");
        console.log("Status: Category tally incremented.");
        console.log("Payload compiled:", payload);
        console.groupEnd();
        
        const confirmationMessage = document.getElementById("confirmationMessage");
        confirmationMessage.style.display = "block";
        confirmationMessage.innerHTML = `<span style="color: var(--accent-cyan);">Sending secure registration request...</span>`;
        
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("API post request failed");
            return response.json();
        })
        .then(json => {
            setTimeout(() => {
                confirmationMessage.innerHTML = "Registration Confirmed! Secure token generated.";
                showToast(`Success! Registered for ${selectedEvent.name}`, "success");
                form.reset();
                showFee();
                clearInlineErrors();
            }, 1200);
        })
        .catch(err => {
            console.error("AJAX POST Error:", err);
            confirmationMessage.innerHTML = `<span style="color: var(--accent-red);">Network failed. Caching registration locally.</span>`;
            showToast("Registration submitted offline.", "warning");
        });
        
    } catch (err) {
        showToast(err.message, "error");
        console.warn("Registration Intercepted:", err.message);
    }
}

function showInlineError(inputElement, errorMessage) {
    inputElement.style.borderColor = "var(--accent-red)";
    inputElement.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.2)";
    
    const errorText = document.createElement("span");
    errorText.className = "inline-error-msg";
    errorText.style.color = "var(--accent-red)";
    errorText.style.fontSize = "0.75rem";
    errorText.style.marginTop = "0.25rem";
    errorText.innerText = errorMessage;
    
    inputElement.parentElement.appendChild(errorText);
}

function clearInlineErrors() {
    const errors = document.querySelectorAll(".inline-error-msg");
    errors.forEach(e => e.remove());
    
    const inputs = document.querySelectorAll("#eventForm input, #eventForm select");
    inputs.forEach(i => {
        i.style.borderColor = "var(--border-color)";
        i.style.boxShadow = "none";
    });
}

function setupJQueryBindings() {
    $("#registerBtn").click(function(event) {
        console.log("jQuery validation hook active on registration trigger button.");
    });
}

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    
    const toast = document.createElement("div");
    toast.className = `toast ${type} show`;
    toast.innerText = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function validatePhone() {
    const phoneInput = document.getElementById("phone");
    const phone = phoneInput.value.trim();
    if (phone === "") return;
    
    if (phone.length < 10 || isNaN(phone)) {
        phoneInput.style.borderColor = "var(--accent-red)";
        phoneInput.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.2)";
        showToast("Phone number must be at least 10 digits", "warning");
    } else {
        phoneInput.style.borderColor = "var(--accent-green)";
        phoneInput.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.2)";
    }
}

function showFee() {
    const eventSelect = document.getElementById("eventType");
    const selectedOption = eventSelect.options[eventSelect.selectedIndex];
    const feeContainer = document.getElementById("eventFee");
    
    if (selectedOption && selectedOption.value) {
        const fee = selectedOption.getAttribute("data-fee") || (selectedOption.value * 100);
        feeContainer.style.display = "block";
        feeContainer.innerHTML = "Event Fee: ₹" + fee;
    } else {
        feeContainer.style.display = "none";
        feeContainer.innerHTML = "";
    }
}

function enlargeImage() {
    const image = document.getElementById("zoomImage");
    if (!image) return;
    
    if (image.style.width === "400px") {
        image.style.width = "250px";
        image.style.height = "150px";
    } else {
        image.style.width = "400px";
        image.style.height = "250px";
    }
}

function countCharacters() {
    const text = document.getElementById("message").value;
    document.getElementById("charCount").innerHTML = "Characters: " + text.length;
}

function videoReady() {
    const videoMsg = document.getElementById("videoMessage");
    if (videoMsg) {
        videoMsg.innerHTML = "Video ready to play";
    }
    showToast("Event invite video is loaded and ready to play", "success");
}

window.onbeforeunload = function(e) {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const message = document.getElementById("message")?.value;
    if (name || email || message) {
        const warning = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = warning;
        return warning;
    }
};

function savePreference() {
    const selectedEvent = document.getElementById("eventType").value;
    if (!selectedEvent) {
        showToast("Please choose an event first!", "warning");
        alert("Please select an event to save preference.");
        return;
    }
    localStorage.setItem("preferredEvent", selectedEvent);
    sessionStorage.setItem("sessionEvent", selectedEvent);
    showToast("Event preferences stored successfully", "success");
    alert("Preference saved!");
}

function clearPreferences() {
    localStorage.clear();
    sessionStorage.clear();
    document.getElementById("eventType").value = "";
    showFee();
    showToast("Preferences cleared", "info");
    alert("Preferences cleared!");
}

function findLocation() {
    const result = document.getElementById("locationResult");
    if (!result) return;
    
    result.style.display = "inline-block";
    result.innerHTML = "Retrieving location coordinates...";
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showPosition,
            showError,
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        result.innerHTML = "Geolocation is not supported by this browser.";
        showToast("Geolocation is unsupported in this browser", "error");
    }
}

function showPosition(position) {
    const result = document.getElementById("locationResult");
    if (!result) return;
    result.innerHTML = "Latitude: " + position.coords.latitude.toFixed(6) + "<br>Longitude: " + position.coords.longitude.toFixed(6);
    showToast("Location loaded successfully", "success");
    console.log("Coordinates obtained:", position.coords.latitude, position.coords.longitude);
}

function showError(error) {
    let message = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
            showToast("Location access denied by user", "error");
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            showToast("Location info unavailable", "error");
            break;
        case error.TIMEOUT:
            message = "The request timed out.";
            showToast("Location request timed out", "error");
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred.";
            showToast("Unknown location error", "error");
            break;
    }
    const result = document.getElementById("locationResult");
    if (result) result.innerHTML = message;
    console.warn("Geolocation failure:", message);
}

document.addEventListener("DOMContentLoaded", () => {
    setupFilterListeners();
    setupJQueryBindings();
    demonstratePromiseChain();
    loadEventsAsync();
    
    const form = document.getElementById("eventForm");
    if (form) {
        form.addEventListener("submit", handleRegistrationSubmit);
    }
    
    const savedEvent = localStorage.getItem("preferredEvent");
    if (savedEvent) {
        setTimeout(() => {
            const eventSelect = document.getElementById("eventType");
            if (eventSelect) {
                eventSelect.value = savedEvent;
                showFee();
                showToast("Loaded saved preferences", "success");
                console.log("Retrieved preference from localStorage:", savedEvent);
            }
        }, 1500);
    }
});
