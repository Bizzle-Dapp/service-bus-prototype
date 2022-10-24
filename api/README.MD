Create an env variable of CONNECTION_STRING with the value of the key from your shared access policies inside service bus.
Create an env variable of TOPIC_NAME with the name of your topic.

e.g Env File
```
CONNECTION_STRING="Endpoint=sb://your-service-bus-name.servicebus.windows.net/;SharedAccessKeyName=ssharedKeyName;SharedAccessKey=aksdjgaslkgadslksagdajkldgajklhads"
TOPIC_NAME="topic"
```


In Azure:

Make sure your subscriptions are called:
"local-api"
"local-api2"