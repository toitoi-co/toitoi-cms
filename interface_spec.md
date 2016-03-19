#CMS Interface Specification

Primary document guide for all pages and sections of the toitoi CMS.

---

#1.0 Onboarding

##1.1 Get your site Configured

###1.1.1 Set a password
Field | Type | Contents
:---  |:---  |:---  
**Title** | Heading | "Set a password below"
**Description** | Paragraph | "The first step to securing your site is setting a password. We won't make you remember some crazy complicated thing, however, you do have to put in at least one special character!"
**Password** | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul>
**Re-Enter Password** | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul>
**Password strength indicator** | Progress Bar | Visual progress bar that adjusts as the password is being entered
**Continue** | button | Navigate to **1.1.2**
**Cancel** | button[disabled] | Disabled

###1.1.2 Confirm your site name
Field | Type | Contents
:---  |:---  |:---  
**Title** | Heading | Confirm your site name
**Description** | Paragraph | When you first signed up, you picked a name for your site. Take a moment to confirm this is what you want to call it. This will be your toitoi name from now on and cannot be changed once saved.
**Site Name** | input[type=text] | <ul><li>Needs to be a unique identifier</li><li>Maximum 24 characters</li><li>Cannot contain: <ul><li>Special characters</li><li>Spaces</li></ul>
**.toitoi.co** | Label | Label that is placed to the right of the input that reads .toitoi.co 
**Have your own domain?** | CTA | <ul><li>Clicking on this link will provide a text meassage that says the following, and will flag the flow to stop at **1.1.4** where they can upgrade their account to a paid tier. </li><li>"Great! we've made a note and will ask you to upgrade your account in a few steps, don't worry, you'll be able to change your mind between now and then."</li></ul>
**Continue** | button | Navigate to **1.1.3**
**Cancel** | button[disabled] | Disabled


###1.1.3 Confirm your full name

###1.1.4 Select your package

###1.1.5 Pick a theme

##1.2 Customize your theme

###1.2.1 Pick your colour scheme

###1.2.2 Upload a profile photo

###1.2.3 Upload a hero image

###1.2.5 Customize your hero area

###1.2.4 Set up your domain name

##1.3 Get started with your content