# Dhruv Mistry One-Page Portfolio

## Changes in this version
- Removed the live clock and date completely.
- Added a Visit Project button to every project card.
- Added the contact email: dhruvmistry22@gmail.com.
- Added GitHub, LinkedIn and Instagram buttons.
- Moved Visitor Reviews to the final section of the page.
- Kept the black, cerulean blue and neon rose colour theme.

## Design
- Jet Black: `#0A0A0A`
- Cerulean Blue: `#007BA7`
- Neon Rose: `#FF2D95`
- Single scrolling page, no profile photo.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in Chrome or Edge.
3. For development, open the folder in VS Code and use Live Server.

## Project links
In `index.html`, replace each Visit Project button's `href="#"` with your actual deployed project URL or GitHub repository URL.

## Social links
Replace the generic GitHub, LinkedIn and Instagram links in the Contact section with your personal profile URLs.

## Shared visitor count and reviews
The shared visitor counter and public reviews require Firebase configuration:
1. Create a project at https://console.firebase.google.com/
2. Add a Web App and copy its config into `firebase-config.js`.
3. Create a Realtime Database and set its database URL in `firebase-config.js`.
4. Follow the Firebase rules guidance in the previous setup notes. Do not use unrestricted public write rules for a production website.

## Personalize
Check the education details and update them before publishing.
