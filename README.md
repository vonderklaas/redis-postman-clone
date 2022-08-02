### Postman Clone UI with Redis

#### Installation

```
npm i 
```

#### Run Server and Client (Terminal 1, Terminal 2)

in "/" and in "/api" folder

```
npm run start
```

Client: http://localhost:8080/ <br>
Express API: http://localhost:3000/ <br>


#### Run Redis

#### Server (Terminal 3)

```
redis-server
```

#### CLI (Terminal 4)

```
redis-cli
```

#### Additional

Go ahead, try to make some API calls and see how Time <br>
changes in-between, when Redis stores request and sends it to you from disk

Use flushall inside 'redis-cli' terminal to clear data stored in Cache, <br>
and by that update it next time we fetch the data
