# DB-repos

To me, developing a REST API using MongoDB turned out to be quite easy. This was because I am since before
familiar with JavaScript - yet, I owe quite a bit to some web tutorials and communities. There were some pitfalls,
namely:
    1. The then-clause of subscribers.js, line 23. In addition, the use of square-brackets is mandatory.
    2. In server.js, lines 13-14, there are now both one .connect() and one .createConnection() call. To be honest, I
    don't know about the relation between these two.

As of feb 18th, the main task is to connect another db using the same connection call.

To be continued, ...
Magnus
