document.addEventListener('DOMContentLoaded', function() {
    const lighthouseCountInput = document.getElementById('lighthouseCount');
    const generateEntriesBtn = document.getElementById('generateEntries');
    const lighthouseEntriesContainer = document.getElementById('lighthouseEntries');
    const addAnotherBtn = document.getElementById('addAnother');
    const lighthouseForm = document.getElementById('lighthouseForm');
    const userNameInput = document.getElementById('userName');
    const leaderNameInput = document.getElementById('leaderName');
    const userEmailInput = document.getElementById('userEmail');
    const userPhoneInput = document.getElementById('userPhone');
    const submitBtn = document.getElementById('submitBtn');
    const googleSheetsLink = document.getElementById('googleSheetsLink');
    
    let lighthouseCounter = 0;
    
   // Function to create a new lighthouse entry
    function createLighthouseEntry(entryNumber = null) {
        // If no entryNumber provided, use the next counter
        if (entryNumber === null) {
            lighthouseCounter++;
            entryNumber = lighthouseCounter;
        }
        
        const entryId = `lighthouse-${entryNumber}`;
        
        const entryHTML = `
            <div class="lighthouse-entry" id="${entryId}">
                <div class="entry-header">
                    <div class="entry-title">
                        <span class="counter-badge">${entryNumber}</span>
                        Lighthouse #${entryNumber}
                    </div>
                    <button type="button" class="remove-btn" onclick="removeLighthouseEntry('${entryId}')">Remove</button>
                </div>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label for="name-${entryId}" class="required-field">Lighthouse Host:</label>
                        <input type="text" id="name-${entryId}" placeholder="e.g., Cape Hatteras Lighthouse" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="location-${entryId}" class="required-field">Location:</label>
                        <input type="text" id="location-${entryId}" placeholder="e.g., Outer Banks, North Carolina" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="date-${entryId}" class="required-field">Scheduled Date & Time:</label>
                        <input type="datetime-local" id="date-${entryId}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="connections-${entryId}">People You Connected With:</label>
                        <div id="connections-container-${entryId}" class="connections-list">
                            <div class="connection-item">
                                <input type="text" class="connection-input" placeholder="Person's name">
                            </div>
                        </div>
                        <button type="button" class="add-connection-btn" onclick="addConnectionField('${entryId}')">+ Add Another Person</button>
                    </div>
                    
                    <div class="form-group">
                        <label for="notes-${entryId}">Additional Notes (optional):</label>
                        <textarea id="notes-${entryId}" rows="3" placeholder="Any additional information about this lighthouse visit..."></textarea>
                    </div>
                </div>
            </div>
        `;
        
        return entryHTML;
    }
    // Function to generate lighthouse entries based on count
    function generateLighthouseEntries() {
 // Check if there are existing entries
        const existingEntries = document.querySelectorAll('.lighthouse-entry');
        if (existingEntries.length > 0) {
            const confirmReset = confirm('Generating new entries will clear your current lighthouse data. Continue?');
            if (!confirmReset) return;
        }
        // First validate user info
        if (!userNameInput.value.trim()) {
            alert('Please enter your name before generating lighthouse entries.');
            userNameInput.focus();
            return;
        }
        
        if (!leaderNameInput.value.trim()) {
            alert('Please enter leader name before generating lighthouse entries.');
            leaderNameInput.focus();
            return;
        }
	// New: Validation phone number
	if (!userPhoneInput.value.trim()) {
	    alert ('Please enter your phone number before generating lighthouse.');
	    userPhoneInput.focus();
	    return;
	}
        
        const count = parseInt(lighthouseCountInput.value);
        
        if (isNaN(count) || count < 1) {
            alert('Please enter a valid number of lighthouses (at least 1)');
            return;
        }
        
        if (count > 20) {
            alert('Maximum number of lighthouses is 20');
            lighthouseCountInput.value = 20;
            return;
        }
        
        // Clear existing entries
        lighthouseEntriesContainer.innerHTML = '';
        lighthouseCounter = 0;
	lighthouseEntriesContainer.innerHTML = '';
        
        // Create new entries
        for (let i = 0; i < count; i++) {
            lighthouseEntriesContainer.insertAdjacentHTML('beforeend', createLighthouseEntry(i + 1));
        }
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().slice(0, 16);
        
        // Set default dates for all entries
        document.querySelectorAll('.lighthouse-entry').forEach(entry => {
            const dateInput = entry.querySelector('input[type="datetime-local"]');
            if (dateInput) {
                dateInput.value = formattedDate;
            }
        });
        
        // Scroll to lighthouse entries section
        document.querySelector('.form-section:nth-child(3)').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Function to add a connection field to a lighthouse entry
    window.addConnectionField = function(entryId) {
        const container = document.getElementById(`connections-container-${entryId}`);
        const newConnection = document.createElement('div');
        newConnection.className = 'connection-item';
        newConnection.innerHTML = `
            <input type="text" class="connection-input" placeholder="Person's name">
            <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
        `;
        container.appendChild(newConnection);
    };
    
    // Function to remove a lighthouse entry
    window.removeLighthouseEntry = function(entryId) {
        const entry = document.getElementById(entryId);
        if (entry) {
            if (document.querySelectorAll('.lighthouse-entry').length > 1) {
                entry.remove();
                updateEntryNumbers();
            } else {
                alert('You must have at least one lighthouse entry.');
            }
        }
    };
    
    // Function to update entry numbers after removal
    function updateEntryNumbers() {
        const entries = document.querySelectorAll('.lighthouse-entry');
        entries.forEach((entry, index) => {
            const badge = entry.querySelector('.counter-badge');
            const title = entry.querySelector('.entry-title');
            
            if (badge) badge.textContent = index + 1;
            if (title) {
                title.innerHTML = `<span class="counter-badge">${index + 1}</span> Lighthouse #${index + 1}`;
            }
        });
        
        lighthouseCounter = entries.length;
        lighthouseCountInput.value = entries.length;
    }
    // Function to add another lighthouse entry
    function addAnotherLighthouse() {
        // Validate user info before adding
        if (!userNameInput.value.trim()) {
            alert('Please enter your name before adding a lighthouse entry.');
            userNameInput.focus();
            return;
        }
        
        if (!leaderNameInput.value.trim()) {
            alert('Please enter leader name before adding a lighthouse entry.');
            leaderNameInput.focus();
            return;
        }
        
        // New: Validate phone number
        if (!userPhoneInput.value.trim()) {
            alert('Please enter your phone number before adding a lighthouse entry.');
            userPhoneInput.focus();
            return;
        }

        // Get current number of entries
        const currentEntries = document.querySelectorAll('.lighthouse-entry');
        const nextEntryNumber = currentEntries.length + 1;
        
        // Create the new entry
const newEntryHTML = createLighthouseEntry(nextEntryNumber);

// Append the new entry WITHOUT clearing existing ones
lighthouseEntriesContainer.insertAdjacentHTML('beforeend', newEntryHTML);

        // Update the counter to match
        lighthouseCounter = nextEntryNumber;
        lighthouseCountInput.value = lighthouseCounter;
        
        // Set default date to tomorrow for the new entry
        const allEntries = document.querySelectorAll('.lighthouse-entry');
        const lastEntry = allEntries[allEntries.length - 1];
        const dateInput = lastEntry.querySelector('input[type="datetime-local"]');
        
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().slice(0, 16);
        }
        
        // Scroll to the new entry
        lastEntry.scrollIntoView({ 
            behavior: 'smooth',
            block: 'nearest'
        });
        
        console.log('DEBUG: Added new entry #', nextEntryNumber);
        console.log('DEBUG: Total entries now:', allEntries.length);
    }
    // Function to send data to Google Sheets
    async function sendToGoogleSheets(formData) {
        // ============================================
        // SETUP REQUIRED: Replace with your Google Apps Script URL
        // ============================================
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7Mi24hyEAFFdDt6Uq5kB9jUK-xMYP_m75qnluo_RUm1lYKb0xY6FCFiH177Y8SmuS/exec';
        // ============================================
        
        try {
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span>Submitting...';
            submitBtn.disabled = true;
            
            // Send data to Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Since we're using no-cors, we can't read the response directly
            // But the data should be sent successfully
            
            // Reset button after a short delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
            
            return true;
            
        } catch (error) {
            console.error('Error sending to Google Sheets:', error);
            submitBtn.innerHTML = 'Error - Try Again';
            setTimeout(() => {
                submitBtn.innerHTML = 'Submit';
                submitBtn.disabled = false;
            }, 3000);
            return false;
        }
    }
    
    // Function to handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate user info
        if (!userNameInput.value.trim()) {
            alert('Please enter your name.');
            userNameInput.focus();
            return;
        }
        
        if (!leaderNameInput.value.trim()) {
            alert('Please enter leader name.');
            leaderNameInput.focus();
            return;
        }

	// Validate phone number
	if (!userPhoneInput.value.trim()) { 
	    alert('Please enter your phone number.');
	    userPhoneInput.focus();
	    return;
	}
        
        // Collect all lighthouse data
        const lighthouseEntries = document.querySelectorAll('.lighthouse-entry');
        const lighthouseData = [];
        
        // Check if there are any lighthouse entries
        if (lighthouseEntries.length === 0) {
            alert('Please add at least one lighthouse entry.');
            return;
        }
        
        // Validate all lighthouse entries
        let isValid = true;
        lighthouseEntries.forEach((entry, index) => {
            const name = entry.querySelector('input[type="text"][id^="name-"]');
            const location = entry.querySelector('input[type="text"][id^="location-"]');
            const dateTime = entry.querySelector('input[type="datetime-local"]');
            
            if (!name.value.trim() || !location.value.trim() || !dateTime.value) {
                isValid = false;
                alert(`Please fill in all required fields for Lighthouse #${index + 1}`);
            }
        });
        
        if (!isValid) return;
        
        // Collect data if all valid
        lighthouseEntries.forEach((entry, index) => {
            const name = entry.querySelector('input[type="text"][id^="name-"]').value;
            const location = entry.querySelector('input[type="text"][id^="location-"]').value;
            const dateTime = entry.querySelector('input[type="datetime-local"]').value;
            const notes = entry.querySelector('textarea[id^="notes-"]')?.value || '';
            
            // Collect connection names
            const connectionInputs = entry.querySelectorAll('.connection-input');
            const connections = Array.from(connectionInputs)
                .map(input => input.value.trim())
                .filter(name => name !== '');
            
            lighthouseData.push({
                lighthouseNumber: index + 1,
                name: name,
                location: location,
                scheduledDateTime: dateTime,
                connections: connections.join('; '), // Join with semicolon for Google Sheets
                notes: notes
            });
        });
        
        // Prepare data for Google Sheets
        const formData = {
            timestamp: new Date().toISOString(),
            submittedBy: userNameInput.value.trim(),
            leaderName: leaderNameInput.value.trim(),
            userEmail: userEmailInput.value.trim(),
            userPhone: userPhoneInput.value.trim(),
            totalLighthouses: lighthouseData.length,
            lighthouses: lighthouseData
        };
        
        // Try to send to Google Sheets
        const sentToGoogleSheets = await sendToGoogleSheets(formData);
        
        // Display the collected data
        displaySubmission(formData, sentToGoogleSheets);
    }
    
 // Function to display submission results
    function displaySubmission(formData, sentToGoogleSheets) {
        // Create a formatted display of the submitted data
        let summaryHTML = `
            <h2 class="section-title" style="margin-top: 30px;">
                ✅ Submitted Successfully!
            </h2>
            
            <div class="user-info-section" style="margin-bottom: 30px;">
         
                <h3 style="color: #005792; margin-bottom: 15px;">User Information</h3>
                <div class="user-info-grid">
                    <div class="form-group">
                        <label>Submitted By:</label>
                        <p style="padding: 10px; background-color: white; border-radius: 5px;">${formData.submittedBy}</p>
                    </div>
                    <div class="form-group">
                        <label>Leader Name:</label>
                        <p style="padding: 10px; background-color: white; border-radius: 5px;">${formData.leaderName}</p>
                    </div>
                    ${formData.userEmail ? `
                        <div class="form-group">
                            <label>Email:</label>
                            <p style="padding: 10px; background-color: white; border-radius: 5px;">${formData.userEmail}</p>
                        </div>
		    ` : ''}
                   ${formData.userPhone ? `
    <div class="form-group">
        <label>Phone Number:</label>
        <p style="padding: 10px; background-color: white; border-radius: 5px;">${formData.userPhone}</p>
    </div>
` : ''}
                </div>
            </div>
        `;
        
        formData.lighthouses.forEach(lighthouse => {
            const formattedDate = new Date(lighthouse.scheduledDateTime).toLocaleString();
            
            summaryHTML += `
                <div class="lighthouse-entry" style="background-color: #f0f9ff;">
                    <div class="entry-header">
                        <div class="entry-title">
                            <span class="counter-badge">${lighthouse.lighthouseNumber}</span>
                            ${lighthouse.name}
                        </div>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Location:</label>
                            <p style="padding: 10px; background-color: white; border-radius: 5px;">${lighthouse.location}</p>
                        </div>
                        <div class="form-group">
                            <label>Scheduled Date & Time:</label>
                            <p style="padding: 10px; background-color: white; border-radius: 5px;">${formattedDate}</p>
                        </div>
                        <div class="form-group">
                            <label>People Connected With:</label>
                            <div style="padding: 10px; background-color: white; border-radius: 5px;">
                                ${lighthouse.connections && lighthouse.connections !== '' 
                                    ? '<ul style="padding-left: 20px;">' + 
                                      lighthouse.connections.split('; ').map(person => `<li>${person}</li>`).join('') + 
                                      '</ul>'
                                    : '<p style="color: #888; font-style: italic;">No connections listed</p>'
                                }
                            </div>
                        </div>
                        ${lighthouse.notes ? `
                            <div class="form-group">
                                <label>Additional Notes:</label>
                                <p style="padding: 10px; background-color: white; border-radius: 5px;">${lighthouse.notes}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });
        
        // Create a modal-like display
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background-color: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
       modalContent.innerHTML = summaryHTML + `
    <div style="text-align: center; margin-top: 30px;">
        <button id="closeModal" class="btn btn-primary">Close and Start New Entry</button>
    </div>
`;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal functionality
        document.getElementById('closeModal').addEventListener('click', function() {
            document.body.removeChild(modal);
            // Reset the form
            lighthouseForm.reset();
            lighthouseEntriesContainer.innerHTML = '<div class="empty-state"><h3>No lighthouse entries yet</h3><p>Enter the number of lighthouses above and click "Generate Entry Forms" to get started.</p></div>';
            lighthouseCounter = 0;
            userNameInput.focus();
            });
        
        // Also log to console for debugging
        console.log('Form Submission:', formData);
    }
    
    // Event listeners
    generateEntriesBtn.addEventListener('click', generateLighthouseEntries);
    addAnotherBtn.addEventListener('click', addAnotherLighthouse);
    lighthouseForm.addEventListener('submit', handleFormSubmit);
    
    // Auto-focus on user name field when page loads
    userNameInput.focus();
    
    // Set default date for tomorrow (for when the form loads)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().slice(0, 16);
    
    // Store for later use when generating entries
    window.defaultDate = formattedDate;
});
