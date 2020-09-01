# Project Overview

[Final Project - Netlify](https://acpc-wardrobe.netlify.app/)

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description & Worksheet README.md | Complete
|Day 1| Wireframes / Priority Matrix / Timeline | Complete
|Day 2| Drop ideas in Planning folder & continue to work on [Backend](https://github.com/weilyl/project-2-backend) | Complete
|Day 3| Core Front-end Structure (HTML, jQuery) | Complete
|Day 4| Mobile-first CSS, jQuery troubleshooting | Complete
|Day 5| MVP, Final touches, Deployment | Complete
|Day 6| Present | Complete

## Project Description

The final result of this project will be a functional full-stack CRUD site and API utilizing MongoDB, Mongoose, and Express. The front end will mimic the stylings of Animal Crossing Pocket Camp and the backend will allow users to add new animals and clothing items, as well as view existing animals and clothing items, and update/delete existing pairings. 

## Wireframes

- [Mobile](https://res.cloudinary.com/dd3nkph31/image/upload/v1596417822/GAProject02/mobile-wireframe_hx2wyq.png)
- [Tablet](https://res.cloudinary.com/dd3nkph31/image/upload/v1596417822/GAProject02/tablet-wireframe_s3hqqy.png)
- [Desktop](https://res.cloudinary.com/dd3nkph31/image/upload/v1596417822/GAProject02/desktop-wireframe_xaqaek.png)

## Time/Priority Matrix 

- [Matrix](https://res.cloudinary.com/dd3nkph31/image/upload/v1596419387/GAProject02/frontendmatrix_uouekk.png)

## Functional Components

#### MVP

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: | :---: | :---: | 
| Base HTML elements, boiler plate, link docs | H | 2hr | 3hr |
| Current animals | H | 3hr | 5hr | 
| jQuery | H | 5hr | 24hr |
| Hamburger click | M | 2hr | 0.5hr |
| Hamburger show | M | 2hr | 0.5hr |
| Hamburger menu (mobile) | H | 3hr | 1hr |
| CSS styling | L | 5hr | 5hr| 
| CSS media queries/responsiveness | L | 5hr | 2hr |
| Total | H | 27hrs | 39hrs | 


#### PostMVP 

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: | 
| Document Issues | M | 3hr | 1hr |
| Seeding data | M | 2hr | -hr |
| Show existing data as cards | H | 5hr | -hr |
| View existing data by animals (as cards) | L | 10hr | 2hr |
| View existing data by clothing item (as cards) | L | 10hr | 2hr |
| Total | H | 30hrs| 5hrs | 

## Additional Libraries

https://code.jquery.com/

https://fonts.google.com/ 

https://getbootstrap.com/


## Code Snippet

```

```

## Issues and Resolutions

Documentation of all major issues encountered and their resolution.

**ERROR**: 

What's wrong:
What's supposed to happen:
Error info?

**RESOLUTION**: 

**ERROR**: 

Width of the page would either be too wide (forcing a horizontal scroll) or there would be a blank vertical stripe on the right of the viewport.

**RESOLUTION**:

Spacing along the right (either overhang or a blank margin) was solved by removing `width: 100vw` from header and footer, and adding `width: 100%` to a child element of header. 



**ERROR**: 

Instead of emptying out the database options followed by repopulating every time an animal and/or outfit is deleted/updated (which would delete the title options), I tried to have the populate menu functions generate the title options, and have the delete from database function to delete the individual option that was selected. Instead, the populate function no longer populates the drop-down menus and the delete function attached to the delete button via an on-click event listener removes both drop-down menus completely.

**RESOLUTION**: 

Used labels instead.



**ERROR**:

When using Bootstrap, the footer overlaps the hamburger/toggle navbar. When the user scrolls down to see the bottom of the navbar, the footer gets stuck in the navbar menu.  

**RESOLUTION**:

Replaced `div` tag with `footer` tag as before. Deleted all CSS stylings except the inline color stylings. Added `margin-top` to CSS for footer. 



**ERROR**:
When clicking delete button, following error occurs (and request to delete select-menu selections from menu is not completed):
```
400 Bad request
deleteFromMenuAndAPI	@	script.js:79
async function (async)		
deleteFromMenuAndAPI	@	script.js:67
dispatch	@	jquery-3.5.1.js:5429
elemData.handle	@	jquery-3.5.1.js:5233
```

In addition, Google Chrome console shows that the request is being made to `https://acpc-api.herokuapp.com/animals/--Please%20choose%20a%20clothing%20item--`, indicating that the base case if statement is not functioning as intended. 

**RESOLUTION**:
Multiple edits resolved the above error(s). 

The `value` attribute of the `options` prompts were set to `0` so they would not be affected by the delete button.

The jQuery selector `option:selected` was targeting the default options in both menus, so it was removed from global variables and selectors. 

Use of global variables inside function definitions were edited according to the removal of `option:selected` globally. 

The function to populate the outfits menu had originally included `option` tags without `value` attributes and that were not associated with JSON objects. These test options were removed to avoid going to an endpoint with no defined route in the backend server. 



**ERROR**: 

Unable to grab the `option` values or have the button event listener fire upon event rather than upon page load.

**RESOLUTION**: 

Lia figured out that since my jQuery & `script.js` script tags were higher on my HTML document than the `body` tag, both `script` tags needed the `defer` attribute so that they wouldn't run too early. The issue was fixed upon adding the `defer` attribute. 

One of the `select` on.change() event listeners was still firing upon page load rather than upon the event, so I will be sticking with callback functions or arrow functions. When testing event listeners, I will be sure to stick with arrow functions to `console.log`, or to put `console.log()` in a callback function.



**ERROR**: 

Drop-down menu (`select`) was not populating with `options` from my API call.

**RESOLUTION**: 

On Jordan's advice, using id-selectors instead of jQuery global variables fixed the issue. In further bugs, it seems the lack of defer attribute in my jQuery & `script.js` script tags contributed to the issue. 



**ERROR**: 

Bootstrap navbar displaying as if Bootstrap was not installed (links were display block rather than inline, the color/stylings were not being applied, some links were not being shown at all, and the hamburger icon was not displaying or toggling/collapsing).

**RESOLUTION**: 

Deleted all code from `head` tag. Instead of using CDN code from w3schools, I used code from `getBootstrap.com`. On Kwok's advice, I inserted the script tags at the bottom of the `body` tag and made sure to leave the defer attribute out of those tags.
