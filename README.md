# Solid Comment

A simple Solid application meant to read and write comments into users’ [pods](https://solidproject.org/users/get-a-pod).
This application is only the gateway to Solid and still needs a storing mechanism in a parent application – meaning your application will import this library, which will allow the communication with Solid, but the

## Reminder

- The app needs control access, there needs to be in the trust applications section with full access.

## To-do

- [x] The import and export in examples does not work properly (Resolved by dropping TS)
- [x] How does the application in itself authenticate?
- [x] Every comment, one file?
  - Means a request per comment
- [ ] Integrate with Indico
- [ ] Introduce integration tests with Jest
  - Use json-server for storage endpoint
- [ ] Think about some caching possbilities
  - don't load image twice if it is the same person
- [x] ACL for resource and container
  - two scenarios: 1. container private, resource public; container public, resource public
- [x] Refactor ACL part out of solid-model
- [x] Improve login flow, currently needs new session after every refresh
  - [x] WebId input can be hidden, when logged in
  - [x] Input form should be hidden, when logged out
- [x] Improve DOM and component rendering
  - render text when no comments
- [x] Change from persisting the WebID of the authors to persisting all comment URLs
- [ ] Reduce the bundled size of this library
- [ ] Solve case where comment was deleted
  - [ ] Deletion from interface -> remove in app DB and pod
  - [ ] Deletion from pod -> catch 404 on request and delete in app DB
  - [ ] (?) Deletion from app -> no way to fetch from pod?
- [x] Bug: private event does not work all of a sudden
  - This was only because the app did not have control ACL on the pod.

## Usage

1. Install Solid Comment

```bash
npm i solid-comment
```

2. Import the library into your project

```js
// const SolidComment = require("solid-comment")
import SolidComment from "solid-comment"
```

3. Configuration

* `solidCommentId`: is the unique identifier for the specific instance this module is loaded. This will always have to be unique, otherwise it will override/write to other existing directories.
* `eventVisibility`: decides if the comments can be discovered without the direct link.
* `serverStorageEndpointUrl`: is the endpoint where the application implementing this module will persist references to the comments that have been posted. This endpoint will receive a JSON object with a `url` key and its value the URL to the comment. No more information is needed nor should be stored.

```js
const solidComment = new SolidComment({
    solidCommentId: "sc-development-private-event-1",
    eventVisibility: "private",
    serverStorageEndpointUrl: "https://server-where-comment-urls-are-persisted"
}) // TODO:
```

4. Initialize application

This will render all the components as soon as the DOM is completely rendered. This is important as the components need elements from the DOM to attach to. The application will also check for a session, this is important for the authentication with a Solid identity provider. **Unfortunately the authentication library used still has a bug where the session is lost after a refresh of the page.**

```js
solidComment.initApp()
```

5. Pass comment URLs to application

If the comments cannot be retrieved immediately on page render, they can be asynchronously fetched and passed to the application.

```js
// these should be [{ url: "url-to-comment" }, …]
solidComment.setComments(comments)
```

### Indico

1. Install solid-comment in Indico

```bash
npm i solid-comment
```

2. Import library in the JavaScript files where it is needed

```js
// indico/modules/events/client/js/display.js

import { SolidComment } from 'solid-comment'
```

3. Add HTML and JavaScript to initialize solid-comment

```html
<!-- indico/modules/events/templates/display/indico/meeting.html -->
<main class="solid-comment">
    <!-- paste content of src/index.html -->
</main>

<script>
window.onload = () => {
    const serverUrl = "http://localhost:3001/comments"
    const solidComment = new SolidComment({
        solidCommentId: "sc-development-indico-private-event-1",
        eventVisibility: "private",
        serverStorageEndpointUrl: serverUrl
    })

    async function main() {
        await solidComment.initApp()
        await fetch(serverUrl)
            .then(response => response.json())
            .then(data => solidComment.setComments(data))
    }
    main()
}
</script>
```

## Development

1. Clone the repository

```bash
git clone git@github.com:janschill/solid-comment.git
cd solid-comment
```

2. Install dependencies

```bash
npm ci
```

3. Run webpack development server

```
npm start
```

4. Copy `index.html` into `dist/` directory

```bash
cp src/index.html dist/index.html
```

## Design Choices

* This library stores each comment in a single file. Also, will the parent application implementing this library hold the reference URL to each comment. This enables the easiest possibility to add a pagination feature and thus improve performance by only loading the necessary comments.
* If a comment fails to be fetch from the by the server (Indico) persisted list of references to the comment, it will simply show a “Comment is unavailable.” notice in the interface.
