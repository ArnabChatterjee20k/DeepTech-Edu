
# Deep Thought Api docs




#### Get event by its unique id

```http
  GET /events/id=${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `12-byte BSON type hexadecimal string` | **Required**. Event id |

#### Gets an event by its recency & paginate results by page number and limit of events per page

```http
  GET /events/?type=latest&limit=${limit}&page=${page}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `limit`      | `int` | **Required**. Page Size |
| `page`      | `int` | **Required**. Current Page |


#### Creates an event and returns the Id of the event i.e. created
```http
  POST /events/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `12-byte BSON type hexadecimal string` | **Required**. Event id |

#### Update the event
```http
  PUT /events/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `12-byte BSON type hexadecimal string` | **Required**. Event id |

#### Deletes an event based on its Unique Id
```http
  DELETE /events/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `12-byte BSON type hexadecimal string` | **Required**. Event id |




