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
- Add Code Snippet for Reply turns off and set's replyCode state to empty string
- Changed updateToken function so it won't set token as undefined to localStorage. Otherwise it sets it as undefined when login fails and if you refresh the page it goes to MainLayout (but shows not data of course). So refresh stays on Auth now.
- Updated Auth so now if login information is incorrect it gives an error message to user, stops loading icon and sets state back to empty.
- Added confirm message for deleting post

!!!!!! I saved original Auth file just in case this causes some issues. Works fine for now.

6/2/2021 - Hustin

- Edit post client side working, in modal
- Create post postMessage input autosizes now, minRow 6
- Changed reply-message padding left to 2.5em in FeedCard-Styles. When upvotes are in double digits the Badge and message were too close together.

6/2/2021 - Tristan

- updated codebase to use mostly props, left context on token
- fixed memory leak issue with useEffect and getPosts()

6/5/2021 - Hustin

- Separated Dashboard into index/display/card, total post votes shown
- Add code snippet is a collapse/panel

6/7/2021 - Hustin

- Only owner can edit and delete their posts or replies - server controllers

6/3/2021 - Tristan 
- Abtract fetch requests in FeedCard and CreatePost Component 
- add notification for deleted reply and created post 
- Cleaned up code in FeedCard

6/8/2021 - Hustin
- Added Skeleton to Dashboard - can't tell if it's working due to data coming in too fast
- Added a Get Started component if there are no posts found (for people cloning)
- In App.css for .ant-layout-content I changed height from 100% to 100vh, can change if causes issues
- Added an option to add code when creating a post. Updated post model.
