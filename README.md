# DB-repos

To me, developing a REST API using MongoDB turned out to be quite easy. This was because I am since before
familiar with JavaScript - yet, I owe quite a bit to some web tutorials and communities. There were some pitfalls,
namely:
    1. The then-clause of subscribers.js, line 23. In addition, the use of square-brackets is mandatory.
    2. In server.js, lines 13-14, there are now both one .connect() and one .createConnection() call. To be honest, I
    don't know about the relation between these two.

As of feb 18th, the main task is to connect another db using the same connection call.

So far, the work has been part of my internship at NöjdPatient AB (https://nojdpatient.se), a startup MedTech company developing an application to be used by healthcare actors ("Clinics"). The files first uploaded included one sole Clinic Schema. Instances of this are intended to be the primary elements of the customer db of NöjdPatient. The last commit, +advices, includes another Schema. By uploading my package, I have mainly intended to present a simple, unbugged REST API - to anyone, hobby hackers or future employers.

To be continued, ...
Magnus
