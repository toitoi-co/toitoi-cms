#CMS Interface Specification

Primary document guide for all pages and sections of the toitoi CMS.

---

#1.0 Onboarding

##1.1 Get your site Configured

###1.1.1 Set a password
| Field | Type | Contents |
|:---  |:---  |:---  |
| Title | Heading | `Set a password below` |
| Description | Paragraph | `The first step to securing your site is setting a password. We won't make you remember some crazy complicated thing, however, you do have to put in at least one special character!` |
| Password | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul> |
| Re-Enter Password | input[type=password] | <ul><li>Needs to match re-entered password</li><li>Must contain: <ul><li>Minimum 8 characters</li><li>One number of special character</li></ul></li></ul> |
| Password strength indicator | Progress Bar | Visual progress bar that adjusts as the password is being entered |
| Continue | button | Continues to **1.1.2** |
| Cancel | button[disabled] | Disabled |

###1.1.2 Confirm your Site name
* Got a domain?