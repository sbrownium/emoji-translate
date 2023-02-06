# Emoji Translate
**by Scott Brown**

## Motivation
Created as part of [General Assembly's](https://generalassemb.ly/) remote JavaScript Development course taken 11/14/22 through 2/6/23.

## Build Status
Working, with room for [improvement](#next-steps).

## What It Does
- *Emoji Translate* uses [Open Emoji API](https://emoji-api.com/) to populate the emoji data and [Unicode's](https://unicode.org/emoji/charts/full-emoji-list.html) official **CLDR Short Names** to create keywords on top of that data.
- The keywords are compared against the text that the user inputs and if there is a match *Emoji Translate* replaces that word. 
- The user can also manually choose up to three of their own words and emoji and *Emoji Translate* replaces the input text that way.

## Presentation
[Watch](https://www.loom.com/share/d64f217df54b4d5e85fad10a086659f8) me walk through  *Emoji Translate*.

## Deployment
The [live site](https://sbrownium.github.io/emoji-translate/) is deployed with [GitHub Pages](https://pages.github.com/).

## Known Issues
- If the data from Open Emoji API takes too long to load the user has no way of knowing so they will not know how to use manual translation.
- The manual emoji selection rules are buggy.

## Next Steps
- Add more comments to the code
- Create more conditions to return more accurate translation (as the translation is rule-based)
- Dynamically create manual translation pairs so it is not limited to three
- Clean up the CSS
- DRY the code
