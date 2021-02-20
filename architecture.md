# Architecture

## What is this library doing?

- Authenticate agents with a Solid pod
- Read files from pods that are authorized to read for this application
- Write files to a pod through an authenticated agent

## What is needed from Indico?

- Event ID/unique identifier for directory creation
- WebIDs of the authors

## Schema

| Field | Type | Schema |
| -- | -- | -- |
| Comment | Comment | Schema:UserComments |
| Author | string | Schema:creator |
| Text | string | Schema:commentText |
| Date | Date | Schema:commentTime (Date ISO 8601) |

### Example

```ttl
@prefix ns1: <https://schema.org/> .

<some-comment-id> a ns1:UserComments ;
    ns1:creator <http://janschill.net/profile/card#me> ;
    ns1:commentText "This is my first comment" ;
    ns1:commentTime "2021-02-05T17:34:00.006Z".
```

