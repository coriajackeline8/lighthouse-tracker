# Lighthouse Connection Tracker

A web application to track lighthouse visits and connections with people. Perfect for scouts, clubs, teams, or individual lighthouse enthusiasts.

## Features
- 📝 Track multiple lighthouse visits in one form
- 👥 Record connections made at each lighthouse
- 📅 Schedule future lighthouse visits
- 📊 Google Sheets integration for data storage
- 📱 Fully responsive design
- 🎨 Clean, modern user interface

## Live Website
Visit the live site: [https://your-username.github.io/lighthouse-tracker/](https://your-username.github.io/lighthouse-tracker/)

## Setup Google Sheets Integration

### Option 1: Use the existing setup (easiest)
The form is already configured with a sample Google Apps Script. To make it work:

1. **Copy the Google Sheet template**: [Make a copy of this template](https://docs.google.com/spreadsheets/d/1aqP0Ae18LqA-JuxPFcERLq4EnDfMN2p47LJqdhQYz6o/copy)

2. **Set up Google Apps Script**:
   - Open your Google Sheet
   - Go to Extensions → Apps Script
   - Replace the default code with the code from `google-apps-script.js`
   - Click Deploy → New Deployment
   - Select "Web app"
   - Set "Execute as" to "Me" and "Who has access" to "Anyone"
   - Copy the web app URL
   - Paste it in `script.js` at line 160 (replace the `GOOGLE_SCRIPT_URL`)

### Option 2: Local testing only
If you don't want Google Sheets integration, the form will still work locally and display submission summaries.

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/lighthouse-tracker.git