#CMS Interface Specification

Primary document guide for all pages and sections of the toitoi CMS.

---

<a name="1.0"></a>
#1.0 Onboarding



<a name="1.1"></a>
##1.1 Get your site Configured


<a name="1.1.1"></a>
###1.1.1 Set a password

<a name="1.1.1.1"></a>
####1.1.1.1 Page construction
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Set a password below"
**Description** | Paragraph | "The first step to securing your site is setting a password. We won't make you remember some crazy complicated thing, however, you do have to put in at least one special character!"
**Form** | Form inputs | *Form as outlined in [**1.1.1.2**](#1.1.1.2)*
**Continue** | Button | *Navigate to [**1.1.2**](#1.1.2)*

<a name="1.1.1.2"></a>
####1.1.1.2 Form Eelements
Field | Type | Instruction
:---  |:---  |:---  
**Password** | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul>
**Re-Enter Password** | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul>
**Password strength indicator** | Progress Bar | Visual progress bar that adjusts as the password is being entered


<a name="1.1.2"></a>
###1.1.2 Confirm your site name

<a name="1.1.2.1"></a>
####1.1.2.1 Page construction
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Confirm your site name"
**Description** | Paragraph | "When you first signed up, you picked a name for your site. Take a moment to confirm this is what you want to call it. This will be your toitoi name from now on and cannot be changed once saved."
**Form** | Form inputs | *Form as outlined in [**1.1.2.2**](#1.1.2.2)*
**Have your own domain?** | CTA | *<ul><li>Clicking on this link will provide a text meassage that says the following, and will flag the flow to stop at [**1.1.3**](#1.1.3) where they can upgrade their account to a paid tier. </li><li>"Great! we've made a note and will ask you to upgrade your account in a few steps, don't worry, you'll be able to change your mind between now and then."</li></ul>*
**Continue** | Button | *Navigate to [**1.1.3**](#1.1.3) or to [**1.2.1**](#1.2.1) depending on selection above*

<a name="1.1.2.2"></a>
####1.1.2.2 Form Elements
Field | Type | Instruction
:---  |:---  |:---  
**Site Name** | input[type=text] | <ul><li>Needs to be a unique identifier</li><li>Maximum 24 characters</li><li>Cannot contain: <ul><li>Special characters</li><li>Spaces</li></ul>
**.toitoi.co** | Label | Label that is placed to the right of the input that reads .toitoi.co 


<a name="1.1.3"></a>
###1.1.3 Select your package

<a name="1.1.3.1"></a>
####1.1.3.1 Page construction
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Select your package"
**Description** | Paragraph | "Everyone starts with a free package at toitoi. If you'd like some additional features, or the ability to use your own domain name, please select one of the packages below. Don't worry, you can always change your mind later and either upgrade or downgrade your account!"
**Table** | Pricing Table | *Display pricing table as outlined in {{something}}*
**Customize your site** | Button | *Navigate to [**1.2.1**](#1.2.1)*



<a name="1.2"></a>
##1.2 Customize your site


<a name="1.2.1"></a>
###1.2.1 Pick a theme


<a name="1.2.2"></a>
###1.2.2 Pick your colour scheme


<a name="1.2.4"></a>
###1.2.4 Upload a hero image


<a name="1.2.5"></a>
###1.2.5 Customize your hero area

<a name="1.2.5.1"></a>
####1.2.5.1 Add a heading

<a name="1.2.5.2"></a>
####1.2.5.2 Add some intro text

<a name="1.2.5.3"></a>
####1.2.5.3 Make this a carousel
`Not for MVP`

<a name="1.2.5.4"></a>
####1.2.5.4 Add a call to action
`Not for MVP`


<a name="1.2.6"></a>
###1.2.6 Set up your domain name



<a name="1.3"></a>
##1.3 Get started with your content
This section will effectively iterate through the content groups in the following order:

* [2.0 - About you](#2.0)
* [3.0 - Social links](#3.0)
* [4.0 - Gallery](#4.0)
* [5.0 - Media relations](#5.0)
* [6.0 - Testimonials](#6.0)
* [7.0 - Public contact information](#7.0)
* [8.0 - PDF resume / bio](#8.0) `Not for MVP`
* [9.0 - Schmopera](#9.0) 
* [10.0 - Live social feed](#10.0) `Not for MVP`
* [11.0 - In the press](#11.0) `Not for MVP`
* [12.0 - Blog](#12.0) `Not for MVP`
* [13.0 - Schedule / Calendar](#13.0) `Not for MVP`


---


<a name="2.0"></a>
#2.0 About you



<a name="2.1"></a>
##2.1 What's your full name?



<a name="2.2"></a>
##2.2 What do you look like?



<a name="2.3"></a>
##2.3 Are you on Schmopera?



<a name="2.4"></a>
##2.4 What do you do?


---


<a name="3.0"></a>
#3.0 Social links


---


<a name="4.0"></a>
#4.0 Gallery


---


<a name="5.0"></a>
#5.0 Media relations


---


<a name="6.0"></a>
#6.0 Testimonials


---


<a name="7.0"></a>
#7.0 Public contact information


---


<a name="8.0"></a>
#8.0 PDF resume / bio
`Not for MVP`



---


<a name="9.0"></a>
#9.0 Schmopera


---


<a name="10.0"></a>
#10.0 Live social feed
`Not for MVP`


---


<a name="11.0"></a>
#11.0 In the press
`Not for MVP`


---


<a name="12.0"></a>
#12.0 Blog
`Not for MVP`


---


<a name="13.0"></a>
#13.0 Schedule / Calendar
`Not for MVP`





