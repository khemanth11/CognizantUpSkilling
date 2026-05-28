document.getElementById("eventForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const output = document.getElementById("confirmationMessage");
    output.innerHTML = "Registration submitted successfully!";
    showToast("Registration submitted successfully!", "success");
});

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
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
        alert("Phone number must be at least 10 digits");
    } else {
        phoneInput.style.borderColor = "var(--accent-green)";
        phoneInput.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.2)";
    }
}

function showFee() {
    const eventType = document.getElementById("eventType");
    const fee = eventType.value;
    const feeContainer = document.getElementById("eventFee");
    if (fee) {
        feeContainer.style.display = "block";
        feeContainer.innerHTML = "Event Fee: ₹" + fee;
    } else {
        feeContainer.style.display = "none";
        feeContainer.innerHTML = "";
    }
}

function showConfirmation() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const eventType = document.getElementById("eventType").value;

    if (name && email && date && eventType) {
        alert("Form submitted successfully!");
    }
}

function enlargeImage() {
    const image = document.getElementById("zoomImage");
    if (image.style.width === "400px" || image.style.width === "400px") {
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
    videoMsg.innerHTML = "Video ready to play";
    showToast("Event invite video is loaded and ready to play", "success");
}

window.onbeforeunload = function(e) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
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

window.onload = function() {
    const savedEvent = localStorage.getItem("preferredEvent");
    if (savedEvent) {
        const eventSelect = document.getElementById("eventType");
        eventSelect.value = savedEvent;
        showFee();
        showToast("Loaded saved preferences", "success");
        console.log("Retrieved preference from localStorage:", savedEvent);
    }
};

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
    document.getElementById("locationResult").innerHTML = message;
    console.warn("Geolocation failure:", message);
}