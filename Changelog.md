# Changelog

### Added

5/26/2021 - Hustin

- Added unsaved notification for save icon
- Added media query for emotional reponse footer

5/26/2021 - Tristan

- Fixed Routing
- Abstracted Routes

5/27/2021 - Tristan

- Worked on FocusedPost Component. (Viewing all replies on separate page)

5/31/2021 - Hustin

- Updated reply model to include replyCode
- Add replyCode client side/snippet button
- Fixed loading Spinner icon not in the center

6/1/2021 - Hustin

- Moved the container and content div's back into MainLayout, it was causing styling issues being in Routes. Not sure why.
- Delete reply server/client side
- Adjusted TextArea inputs for reply to have minRow of 4 and autosize
- Fixed saved post not showing up for users who didn't post it
- Edit/Delete reply buttons only show for that users reply
- Add Code Snippet for Reply turns off and set's replyCode to empty string
- Changed updateToken function so it won't set token as undefined to localStorage. Otherwise it sets it as undefined and if you refresh the page it goes to MainLayout (but shows not data of course). So refresh stays on Auth now.
- Updated Auth so now if login information is incorrect it gives an error message to user, stops loading icon and sets state back to empty.
- Added confirm message for deleting post

!!!!!! I saved original Auth file just in case this causes some issues. Works fine for now.

6/2/2021 - Hustin

- Edit post client side working, in modal
- Create post postMessage input autosizes now, minRow 6
