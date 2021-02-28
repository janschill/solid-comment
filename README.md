# Solid Comment

A simple Solid application meant to read and write comments into users’ [pods](https://solidproject.org/users/get-a-pod).
This application is only the gateway to Solid and still needs a storing mechanism in a parent application – meaning your application will import this library, which will allow the communication with Solid, but the

## To-do

- [x] The import and export in examples does not work properly (Resolved by dropping TS)
- [x] How does the application in itself authenticate?
- [x] Every comment, one file?
  - Means a request per comment
- [ ] Integrate with Indico
- [ ] Introduce integration tests with Jest
- [ ] Think about some caching possbilities
  - don't load image twice if it is the same person
- [x] ACL for resource and container
  - two scenarios: 1. container private, resource public; container public, resource public
- [x] Refactor ACL part out of solid-model
- [ ] Improve login flow, currently needs new session after every refresh
  - [x] WebId input can be hidden, when logged in
  - [x] Input form should be hidden, when logged out
- [x] Improve DOM and component rendering
  - render text when no comments
- Change from persisting the WebID of the authors to persisting all comment URLs

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

```js
new SolidComment() // TODO:
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

* The library uses the WebIDs as a reference and fetches all comments from those WebIDs. The number of requests is bound to the number of individual comment authors. This could be changed to reference each comment with a timestamp. This would improve the performance (number of requests) for comment sections with a lot of comments, as pagination could be used.
