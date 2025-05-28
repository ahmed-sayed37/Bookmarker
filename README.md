# Bookmarker Web Application

A simple web application that allows users to save and manage their favorite website bookmarks.

## Features

- Add bookmarks with website names and URLs
- Visit saved bookmarks directly from the application
- Delete bookmarks
- Data persistence using localStorage
- Input validation for names and URLs
- Responsive design using Bootstrap

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Font Awesome

## How to Use

1. Clone the repository
2. Open `index.html` in your web browser
3. Enter a website name and URL
4. Click Submit to add the bookmark
5. Use the Visit button to open the website
6. Use the Delete button to remove bookmarks

## Input Validation Rules

- Website Name:
  - Must be between 3 and 50 characters
  - Can only contain letters, numbers, spaces, hyphens, and underscores
  - Must be unique (no duplicate names)

- Website URL:
  - Must be a valid URL format
  - Will automatically add https:// if no protocol is specified
  - Must contain a valid domain name 