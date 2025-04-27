# Wolke

## SSL Certificates

To enable HTTPS locally, you need to create a self-signed certificate. You can generate it like this:

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
