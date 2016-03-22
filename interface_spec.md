#CMS Interface Specification

Primary document guide for all pages and sections of the toitoi CMS.


---


<a name="0.0"></a>
#0.0 Login
`TODO - add general description`

<a name="0.0.1"></a>
##0.0.1 Page construct
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Welcome to your site!"
**Description** | Paragraph | "Hello, it's nice to see you again here at toitoi.co. We need you to sign in with your username and password to make sure you are who you say you are. If you think you're in the wrong place, head on over to [http://toitoi.co](http://toitoi.co)"
**Form** | Form inputs | *Form as outlined in [**0.0.2 Form elements**](#0.0.2)*
**Forgot your password?** | CTA | *Navigate to [**0.0.4 Password Recovery**](#0.0.4)*

<a name="0.0.2"></a>
##0.0.2 Form elements
Field | Type | Instruction
:---  |:---  |:---  
**Site Title** | Label | Diplay the site title for this account, based on the subdomain that has been used to reach this cms (http://`sitename`.toitoi.co/)
**Email Address** | input[type=email] | User's email address for login
**Password** | input[type=password] | User's password for login
**Log in** | Button | *<ul><li>If successul first time login, send user to [**0.1 - Onboarding**](#0.1) flow, otherwise, land on [**20.0 - Dashboard**](#20.0)</li><li>If unsuccessful login attempt, refer to [**0.0.3 Business rules**](#0.0.3)*

<a name="0.0.3"></a>
##0.0.3 Business rules
* **2 failed password attempts**, user will be prompted with a message "Did you forget your password? Click 'Forget your password?' below to recover it"
* **3 failed password attempts**, CAPTCHA will be displayed and a message "Sorry, you've failed to enter your password at least 3 times, you now have to prove that you're not a robot. Feel free to click below on 'Forget your password?' to recover your password at any point. You have only 2 more tries to guess your password, after which, we will lock your account for security purposes."
* **5 failed password attempts**, IP address is blocked for 30 minutes, and message is displayed "Your IP address has been blocked from any more password attempts for a while, please try again later"
* **20 failed password attempts**, Lock the account, forward all subsequent password attempts to this account to goatse **(don't actually do this)**

<a name="0.0.4"></a>
##0.0.4 Password recovery
`TODO - add general description`

<a name="0.0.4.1"></a>
###0.0.4.1 Page construct
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Forgot your password?"
**Description** | Paragraph | "No problem, we never remember our passwords either. Just put in your email address and we'll send you an email with instructions on how to reset your password."
**Form** | Form inputs | *Form as outlined in [**0.0.2 Form elements**](#0.0.2)*
**Log in** | Button | *If first time login, send user to [**0.1 - Onboarding**](#0.1) flow, otherwise, land on [**20.0 - Dashboard**](#20.0)*

<a name="0.0.4.2"></a>
###0.0.4.2 Form elements
Field | Type | Instruction
:---  |:---  |:---  
**Email Address** | input[type=email] | User's email address for password recovery
**Log in** | Button | *Outcome of which is described in [**0.0.4.3 Business rules**](#0.0.4.3)*

<a name="0.0.4.3"></a>
###0.0.4.3 Business rules
* If email address exists in user database, trigger [**0.0.4.4 Password recovery email**](#0.0.4.4)
* If email address does **not** exist in user database, display error message "Sorry, we couldn't find an account that matches that e-mail address, did you perhaps forget that too? Try again, and check for any typos, if you can't remember what e-mail address you used to sign up, we'll have to ask you to email us at support@toitoi.co and we'll do our best to help."

<a name="0.0.4.4"></a>
###0.0.4.4 Password recovery email
`TODO`


---


<a name="0.1"></a>
#0.1 Onboarding
`TODO - add general description`


<a name="0.1.1"></a>
##0.1.1 Configure your account
During the onboarding flow, the following sections will be grouped under this heading, and will be broken up into individual steps per logical question. Each subset (#.#) will be it's own step and should save content as the user navigates from step to step.

Configuring your site will include the following subsections, in this order:

* [1.0 - Configure your account](#1.0)
* [2.0 - Customize your site](#2.0)


<a name="0.1.2"></a>
##0.1.2 Get started with your content
During the onboarding flow, the following sections will be grouped under this heading, and will be broken up into individual steps per logical question. Each subset (#.#) will be it's own step and should save content as the user navigates from step to step.

Get started with your content will include the following subsections, in this order:

* [3.0 - About you](#3.0)
* [4.0 - Social links](#4.0)
* [5.0 - Gallery](#5.0)
* [6.0 - Media relations](#6.0)
* [7.0 - Testimonials](#7.0)
* [8.0 - Public contact information](#8.0)
* [9.0 - PDF resume / bio](#9.0) `Not for MVP`
* [10.0 - Schmopera](#10.0) 
* [11.0 - Live social feed](#11.0) `Not for MVP`
* [12.0 - In the press](#12.0) `Not for MVP`
* [13.0 - Blog](#13.0) `Not for MVP`
* [14.0 - Schedule / Calendar](#14.0) `Not for MVP`


---


<a name="1.0"></a>
#1.0 Configure your account
`TODO - add general description`

<a name="1.1"></a>
##1.1 Set a password
`TODO - add general description, business rules`

<a name="1.1.1"></a>
###1.1.1 Page construct
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Set a password below"
**Description** | Paragraph | "The first step to securing your site is setting a password. We won't make you remember some crazy complicated thing, however, you do have to put in at least one special character!"
**Form** | Form inputs | *Form as outlined in [**1.1.2 Form elements**](#1.1.2)*
**Continue** | Button | *Navigate to [**1.2 Confirm your site name**](#1.2)*

<a name="1.1.2"></a>
###1.1.2 Form elements
Field | Type | Instruction
:---  |:---  |:---  
**Password** | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul>
**Re-Enter Password** | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul>
**Password strength indicator** | Progress Bar | Visual progress bar that adjusts as the password is being entered

<a name="1.1.3"></a>
###1.1.3 Business rules



<a name="1.2"></a>
##1.2 Confirm your site name
`TODO - add general description`

<a name="1.2.1"></a>
###1.2.1 Page construct
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Confirm your site name"
**Description** | Paragraph | "When you first signed up, you picked a name for your site. Take a moment to confirm this is what you want to call it. This will be your toitoi name from now on and cannot be changed once saved."
**Form** | Form inputs | *Form as outlined in [**1.2.2 Form elements**](#1.2.2)*
**Have your own domain?** | CTA | *<ul><li>Clicking on this link will provide a text meassage that says the following, and will flag the flow to stop at [**1.3 Select your package**](#1.3) where they can upgrade their account to a paid tier. </li><li>"Great! we've made a note and will ask you to upgrade your account in a few steps, don't worry, you'll be able to change your mind between now and then."</li></ul>*
**Continue** | Button | *Navigate to [**1.3 Select your package**](#1.3) or to [**2.1 Pick a theme**](#2.1) depending on selection above*

<a name="1.2.2"></a>
###1.2.2 Form elements
Field | Type | Instruction
:---  |:---  |:---  
**Site Name** | input[type=text] | <ul><li>Needs to be a unique identifier</li><li>Maximum 24 characters</li><li>Cannot contain: <ul><li>Special characters</li><li>Spaces</li></ul>
**.toitoi.co** | Label | Label that is placed to the right of the input that reads .toitoi.co 


<a name="1.3"></a>
##1.3 Select your package
`TODO - add general description`

<a name="1.3.1"></a>
###1.3.1 Page construct
Section | Type | Content
:---  |:---  |:---  
**Title** | Heading | "Select your package"
**Description** | Paragraph | "Everyone starts with a free package with toitoi.co; However, if you'd like some additional features, or the ability to use your own domain name, please select one of the packages below. Don't worry, you can always change your mind later and either upgrade or downgrade your account."
**Table** | Pricing Table | *Display pricing table as outlined in {{something}}*
**Customize your site** | Button | *Navigate to [**2.1 Pick a theme**](#2.1)*



<a name="2.0"></a>
#2.0 Customize your site
`TODO`

<a name="2.1"></a>
##2.1 Pick a theme
`TODO`


<a name="2.2"></a>
##2.2 Pick your colour scheme
`TODO`


<a name="2.3"></a>
##2.3 Upload a hero image
`TODO`


<a name="2.4"></a>
##2.4 Customize your hero area
`TODO`

<a name="2.4.1"></a>
###2.4.1 Add a heading
`TODO`

<a name="2.4.2"></a>
###2.4.2 Add some intro text
`TODO`

<a name="2.4.3"></a>
###2.4.3 Make this a carousel
`Not for MVP`  
`TODO`

<a name="2.4.4"></a>
###2.4.4 Add a call to action
`Not for MVP`  
`TODO`


<a name="2.5"></a>
##2.5 Set up your domain name


---


<a name="3.0"></a>
#3.0 About you



<a name="3.1"></a>
##3.1 What's your full name?



<a name="3.2"></a>
##3.2 What do you look like?



<a name="3.3"></a>
##3.3 Are you on Schmopera?



<a name="3.4"></a>
##3.4 What do you do?


---


<a name="4.0"></a>
#4.0 Social links


---


<a name="5.0"></a>
#5.0 Gallery


---


<a name="6.0"></a>
#6.0 Media relations


---


<a name="7.0"></a>
#7.0 Testimonials


---


<a name="8.0"></a>
#8.0 Public contact information


---


<a name="9.0"></a>
#9.0 PDF resume / bio
`Not for MVP`



---


<a name="10.0"></a>
#10.0 Schmopera


---


<a name="11.0"></a>
#11.0 Live social feed
`Not for MVP`


---


<a name="12.0"></a>
#12.0 In the press
`Not for MVP`


---


<a name="13.0"></a>
#13.0 Blog
`Not for MVP`


---


<a name="14.0"></a>
#14.0 Schedule / Calendar
`Not for MVP`


---


<a name="20.0"></a>
#20.0 Dashboard




