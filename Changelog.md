# Changelog

## Added

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
- Added replyCode client side/snippet button
- Fixed loading Spinner icon not in the center

6/1/2021 - Hustin

- Moved the container and content div's back into MainLayout, it was causing styling issues being in Routes. Not sure why.
- Delete reply server/client side
- Adjusted TextArea inputs for reply to have minRow of 4 and autosize
- Fixed saved post not showing up for users who didn't post it
- Edit/Delete reply buttons only show for that users reply
- Add Code Snippet for Reply, turns off and set's replyCode state to empty string
- Changed updateToken function so that it won't set token as undefined to localStorage. Otherwise it sets it as undefined when login fails and if you refresh the page it goes to MainLayout (but shows not data). So refresh stays on Auth now.
- Updated Auth so now if login information is incorrect it gives an error message to user, stops loading icon and sets state back to empty.
- Added confirm message for deleting post

6/2/2021 - Hustin

- Added edit post (client)
- Create post postMessage input autosizes now, minRow 6
- Changed reply-message padding left to 2.5em in FeedCard-Styles. When upvotes are in double digits the Badge and message were too close together.

6/2/2021 - Tristan

- Updated codebase to use mostly props, left context on token
- Fixed memory leak issue with useEffect and getPosts()

6/5/2021 - Hustin

- Separated Dashboard into index/display/card, total post score shown
- "Add Code Snippet" for replies is an antd collapse/panel instead of DOM create element

6/7/2021 - Hustin

- Only owner can edit and delete their posts or replies - server controllers

6/3/2021 - Tristan

- Abtract fetch requests in FeedCard and CreatePost Component
- Added notifications for deleted replies and created posts
- Cleaned up code in FeedCard

6/8/2021 - Hustin

- Added Skeleton Card for Dashboard - Data coming in too fast to test?
- Added a Get Started component if there are no posts found (for people cloning)
- Added an option to add code when creating a post. Updated post model with "postCode".
- Added edit postCode for edit post
- Dashboard fetches top 5 most upvoted posts for "popular posts" with badge. text-overflow is now an ellipsis for post titles
- Popular topics go to Focused Post
- Refactored Emotional Response component

6/9/2021 - Hustin

- Updated font family and styling
- Upvote badge shows 1k+ if over 999, so it doesn't butt up against the upvote arrows

6/10/2021 - Tristan

- Added pagination for Feed (server/client)
- Added lazy loading (server/client)
- Refactored file structure
- Refactored Dashboards popular posts
- Added Popular Posts component
- Started Search component
- Cleaned up react-router-dom routes and client side post sorting

6/11/2021 - Hustin

- Fixed Edit Reply Modal ghosting
- Fixed empty Syntax highlighter displaying if no postCode (this might be a future issue with null or empty string on FeedCard (@ Line 488 6/11/2021)

6/14/2021 - Hustin

- Profile now responsive
- Fixed CreatePost card extending out of modal, changed width: 500 to width: 100%
- Font size 12px media query for 480px

6/22/2021 - Hustin

- Fixed key warnings, link nesting warning
- Fixed navbar styling
- Fixed drawer not closing when clicking links

6/23/2021 - Hustin

- Created a hook to check for window resize, if under 768px dashboard and emotion will be on top of feed instead of bottom
- Dashboard/Emotion tabs
- Added profile to nav
- Fixed focused post styling being narrow, duplicate container divs from MainLayout

6/24/2021 - Hustin

- Fixed saved posts displaying for all users in profile
