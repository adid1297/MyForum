# MyForum
This shall host my submission for the GrowSari assessment exam

## API
- [X] Use proper HTTP headers and response codes
- [X] All ID’s are auto-generated and in UUID v1 format
- [X] All timestamps are auto-generated and in ISO8601 format
- [X] Token is in JWT format (Note: I opted to put the token in the header instead of the payload because of (1) JS constraints with respect to payloads in GET methods and (2) it seems like JWTs are often put in headers in practice)
- [X] Encrypt password
- [X] Include error checks
- [X] Users can only update and delete topics that they have created
- [X] Topics are sorted alphabetically
- [X] Messages are sorted in reverse chronological order

### Endpoints
- [X] User Registration
- [X] User Login
- [X] Create Topic
- [X] Update Topic
- [X] Delete Topic
- [X] Create Message in a Topic
- [X] Retrieve all topics 
- [X] Retrieve all messages in a topic
- [X] ** User Log out
- [X] ** Fetch single topic

### Optional
- [X] Pagination
  - [X] Get Topics
  - [X] Get Messages 
- [X] Mark as deleted
- [X] Token invalidation
- [ ] Unit Tests 
- [ ] GraphQL


## UI
- [X] Responsive
- [X] Intuitive
- [X] Informative (Errors)

### Endpoints
- [X] User Registration
- [X] User Login
- [X] ** User Log out
- [X] Create Topic
- [X] Update Topic
- [X] Delete Topic
- [X] Retrieve all topics 
- [X] ** Fetch single topic
- [X] Retrieve all messages in a topic
- [X] Create Message in a Topic

### Optional
- [ ] Pagination
  - [ ] Get Topics
  - [ ] Get Messages 
- [ ] PWA


## Docker
- [X] `docker-compose up`
