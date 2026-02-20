## AI Usage Log

AI tool used:
ChatGPT

Usage and dates:

## 11.02

Prompt:
Asked for guidance on deploying a Vite project to GitHub Pages.

Context:
My project is built with Vite and I was unsure how GitHub Pages works with the dist folder and how to update the site after new changes.

Outcome:
Set up a working deploy flow using vite build and deploying the dist folder to GitHub Pages.
Learned that I need to rebuild and redeploy when I push new changes.

---

Prompt:
Asked for an explanation of throw new Error() in JavaScript.

Context:
I saw it used inside async functions and API handling but was unsure what it actually does and how it affects the flow of the program.

Outcome:
Understood that throw new Error() stops execution in the current function and sends the error to the nearest catch block.
Learned how it is used for handling failed API requests and invalid responses.

## 12.02

Prompt:
Asked about safe handling of API responses, especially HTTP 204 responses.

Context:
Some requests (like DELETE) were returning 204 and my code was breaking when calling response.json().
I did not understand why it failed even though the request was successful.

Outcome:
Understood that HTTP 204 means the request was successful but returns no content.
Learned that calling response.json() on a 204 response causes an error because there is no body to parse.
Updated my API handling to avoid calling response.json() when the response has no content.

---

Prompt:
Asked for an explanation of the ternary operator in JavaScript.

Context:
I saw it used as a shorter way of writing simple if/else statements

Outcome:
Understood how the ternary operator works, but rarely used it since I am more comfortable writing regular if/else statements.

## 13.02

Prompt:
Asked for guidance on structuring my modal logic.

Context:
My modal code was becoming messy

Outcome:
Got a cleaner modal setup with a clear open/close flow and less messy code in the view file.

(note: Discovered later that <dialog> could be used, which made it easier to make modals in the future
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

## 14.02

Prompt:
Asked AI to review my file and folder structure and show examples of best practices for organizing a small SPA project.

Context:
I wanted to know how to create a well structured project

Outcome:
Made small adjustments to file and folder structure

## 15.02

Prompt:
Asked for a basic JSDoc template example

Outcome:
Saw a simple JSDoc template showing how to document parameters, return values and a short description above a function.
Used it as a reference when writing JSDoc comments for my own functions.

## 16.02

Prompt:
Asked for regex examples for validating form inputs.

Context:
I needed simple validation rules for my register/login forms.

Outcome:
Got regex examples I could use for basic input validation.

## 18.02

Prompt:
Asked how to handle dynamic routes like #/user/<username> in my simple hash router.
I wanted the router to understand the username from the URL and render the correct user profile.

Context:
My router only matched exact routes like #/login and #/profile.
When navigating to #/user/username, the full URL did not match any key in my routes object.

Outcome:
Added logic to check if the hash starts with #/user/, extract the username from the URL, and pass it into my renderUser function.
This made it possible to navigate to user profiles from posts

## 20.02

Prompt:
Help me debug an issue that occurred when navigating to a user’s profile from the updated post modal. After clicking “View Profile”, scrolling was disabled on the next page.

Context:
The issue appeared after adding navigation from the modal to a user profile route (#/user/username).
The page rendered correctly, but scrolling no longer worked.

Outcome:
The issue was caused by adding the overflow-hidden class to document.body when opening the post modal, but not removing it when navigating away using the newly created “View Profile” button
The fix was to remove the overflow-hidden class before updating the route.

---

Prompt:
Create a simple logo for a social media website.

Context:
I wanted a simple and clean logo to use in the navbar that matched the minimal style of the application.

Outcome:
Recieved a logo and adjusted the size.
