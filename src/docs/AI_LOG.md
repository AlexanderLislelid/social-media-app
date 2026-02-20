## AI Usage Log

AI was used as a learning and support tool.
All implementation was understood, adapted and written manually

Usage and dates:

## 11.02

Guidance on deploying a Vite project to github pages.
Explanation of throw new Error()

## 12.02

Explanation of object destructuring.
Debugging 401 errors related to missing API key headers.
Discussing safe handling of API responses (e.g. HTTP 204 responses)

## 13.02

Guidance on structuring modal logic and separating responsibilities between files.

## 14.02

Feedback on repository structure.

## 15.02

Brainstorming structure and documentation improvements.

## 18.02

How to handle dynamic routes like #/user/<username> in a simple hash router

## 19.02

## 20.02.2026 – Debugging scroll issue after modal navigation

Prompt:
Help me debug an issue that occurred when navigating to a user’s profile from the updated post modal. After clicking “View Profile”, scrolling was disabled on the next page.

Context:
The issue appeared after adding navigation from the modal to a user profile route (#/user/username).
The page rendered correctly, but scrolling no longer worked.

Outcome:
The issue was caused by adding the overflow-hidden class to document.body when opening the post modal, but not removing it when navigating away using the newly created “View Profile” button
The fix was to remove the overflow-hidden class before updating the route.
