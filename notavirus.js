// ==UserScript==
// @name         Tinychat Room UI Modifier
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adjust Tinychat room layout: left 15% for info (user list and chat), right 85% for user cameras
// @author       Your Name
// @match        https://tinychat.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the room page to fully load
    window.addEventListener('load', () => {
        // Function to adjust the layout
        function adjustLayout() {
            // Create the main info panel if it doesn't exist
            let infoPanel = document.getElementById('custom-info-panel');
            if (!infoPanel) {
                infoPanel = document.createElement('div');
                infoPanel.id = 'custom-info-panel';
                infoPanel.style.position = 'fixed';
                infoPanel.style.left = '0';
                infoPanel.style.top = '0';
                infoPanel.style.width = '15%';
                infoPanel.style.height = '100%';
                infoPanel.style.backgroundColor = '#f4f4f4'; // Background color
                infoPanel.style.overflowY = 'hidden'; // Prevent scroll until split elements are added
                infoPanel.style.padding = '10px';
                infoPanel.style.zIndex = '1000';
                document.body.appendChild(infoPanel);

                // Create the top half for the user list
                let userListSection = document.createElement('div');
                userListSection.id = 'user-list-section';
                userListSection.style.height = '50%';
                userListSection.style.overflowY = 'auto';
                userListSection.innerHTML = '<h3>Users</h3><ul id="user-list"></ul>'; // Placeholder for user list
                infoPanel.appendChild(userListSection);

                // Create the bottom half for chat and info feed
                let chatSection = document.createElement('div');
                chatSection.id = 'chat-section';
                chatSection.style.height = '50%';
                chatSection.style.overflowY = 'auto';
                chatSection.innerHTML = '<h3>Chat & Info Feed</h3><div id="chat-feed"></div>'; // Placeholder for chat and feed
                infoPanel.appendChild(chatSection);
            }

            // Adjust the main room area to occupy the remaining 85%
            let mainRoomArea = document.getElementById('main-room-area');
            if (!mainRoomArea) {
                mainRoomArea = document.createElement('div');
                mainRoomArea.id = 'main-room-area';
                mainRoomArea.style.position = 'fixed';
                mainRoomArea.style.left = '15%';
                mainRoomArea.style.top = '0';
                mainRoomArea.style.width = '85%';
                mainRoomArea.style.height = '100%';
                mainRoomArea.style.overflow = 'hidden';
                document.body.appendChild(mainRoomArea);
            }

            // Move user camera elements into the main room area and arrange in a grid
            let userCameras = document.querySelectorAll('.user-camera-class'); // Replace with the actual class or ID for user cameras
            userCameras.forEach(camera => {
                mainRoomArea.appendChild(camera);
                camera.style.width = 'calc(33.33% - 10px)'; // Adjust this value to set the grid size (3 cameras per row)
                camera.style.height = 'auto';
                camera.style.margin = '5px';
                camera.style.display = 'inline-block';
            });

            // Adjust the main body content to avoid overlap
            document.body.style.paddingLeft = '15%';

            // Update the user list (this is a placeholder and needs to be updated based on actual elements on the page)
            let userList = document.getElementById('user-list');
            userList.innerHTML = ''; // Clear existing list
            let users = document.querySelectorAll('.user-list-class'); // Replace with the actual class for the user list
            users.forEach(user => {
                let listItem = document.createElement('li');
                listItem.textContent = user.textContent; // Get username

                // Add indicators for mod or broadcaster
                if (user.classList.contains('mod-class')) { // Replace with actual mod indicator class
                    listItem.textContent += ' (Mod)';
                }
                if (user.classList.contains('broadcasting-class')) { // Replace with actual broadcasting indicator class
                    listItem.textContent += ' (Broadcasting)';
                }

                userList.appendChild(listItem);
            });

            // Update the chat and info feed (placeholder implementation)
            let chatFeed = document.getElementById('chat-feed');
            chatFeed.innerHTML = ''; // Clear existing feed
            let chatMessages = document.querySelectorAll('.chat-message-class'); // Replace with the actual class for chat messages
            chatMessages.forEach(message => {
                let messageDiv = document.createElement('div');
                messageDiv.textContent = message.textContent; // Get the message text

                // Highlight user actions (join, leave, kick, ban, etc.)
                if (message.classList.contains('join-class')) { // Replace with actual join class
                    messageDiv.style.color = 'green';
                } else if (message.classList.contains('leave-class')) { // Replace with actual leave class
                    messageDiv.style.color = 'red';
                } else if (message.classList.contains('kick-class') || message.classList.contains('ban-class')) { // Replace with actual kick/ban class
                    messageDiv.style.color = 'orange';
                }

                chatFeed.appendChild(messageDiv);
            });
        }

        // Call the adjustLayout function when the page loads
        adjustLayout();

        // Optionally, use a MutationObserver to watch for changes in the page content and reapply the layout
        const observer = new MutationObserver(adjustLayout);
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
