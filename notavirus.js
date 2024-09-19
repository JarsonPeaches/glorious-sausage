// ==UserScript==
// @name         Jarson Peaches' Glorious Sausage
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Modify Tinychat's UI and add new features
// @author       Jarson Peaches
// @match        https://tinychat.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the page to fully load
    window.addEventListener('load', () => {
        // Example 1: Change background color of the body
        document.body.style.backgroundColor = '#f0f0f0';

        // Example 2: Hide a specific element (e.g., an annoying ad)
        let adElement = document.querySelector('.ad-class-name'); // Replace with actual class or ID
        if (adElement) {
            adElement.style.display = 'none';
        }

        // Example 3: Add a custom button to the UI
        let customButton = document.createElement('button');
        customButton.innerText = 'Custom Feature';
        customButton.style.position = 'fixed';
        customButton.style.top = '10px';
        customButton.style.right = '10px';
        customButton.style.zIndex = '1000';
        document.body.appendChild(customButton);

        // Add event listener for the custom button
        customButton.addEventListener('click', () => {
            alert('Custom button clicked!');
            // Insert custom feature code here
        });

        // Example 4: Modify existing elements (e.g., change font size)
        let chatMessages = document.querySelectorAll('.message-class-name'); // Replace with actual class or ID
        chatMessages.forEach(message => {
            message.style.fontSize = '16px';
        });
    });
})();
