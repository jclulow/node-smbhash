# node-smbhash: Samba LM/NT Hash Library

## Introduction

This library converts passwords into the LAN Manager (LM) and
NT Hashes used by SMB/CIFS servers.  It was written to populate
the sambaLMPassword and sambaNTPassword values in an LDAP directory
for use with Samba.

In addition, the library also provides helper methods for encoding
and decoding the headers used during NTLM HTTP authentication.  This
functionality should presently be considered experimental.

## Installation

     npm install smbhash

## Hash Usage

```javascript
var lmhash = require('smbhash').lmhash;
var nthash = require('smbhash').nthash;

var pass = 'pass123';
console.log('LM Hash: ' + lmhash(pass));
console.log('NT Hash: ' + nthash(pass));
```

This produces output:

```
LM Hash: 4FB7D301186E0EB3AAD3B435B51404EE
NT Hash: 5FBC3D5FEC8206A30F4B6C473D68AE76
```

## NTLM Usage

NTLM HTTP Authentication headers are Base64-encoded packed structures of
three basic varieties.  Type 1 & 3 are sent from the client to the server,
and Type 2 is from server to client.  For example:

```javascript
var ntlm = require('smbhash').ntlm;

// Generate Type 1 to send to server in HTTP Request:
var buf = ntlm.encodeType1('hostname', 'ntdomain');
http.setHeader('Authorization', 'NTLM ' + buf.toString('base64'));

// Extract Type 2 from HTTP Response header, and use it here:
var hdr = http.getHeader('WWW-Authenticate');
var m = hdr.match('/^NTLM (.*)$/');
var inbuf = new Buffer(m[1], 'base64');
var serverNonce = ntlm.decodeType2(inbuf);

// Generate Type 3 to send as authentication to server:
var buf = ntlm.encodeType3('username', 'hostname', 'ntdomain',
  serverNonce, 'password');
http.setHeader('Authorization', 'NTLM ' + buf.toString('base64'));
```

## References

     The NTLM Authentication Protocol and Security Support Provider
     Copyright (C) 2003, 2006 Eric Glass
     http://davenport.sourceforge.net/ntlm.html
     
     NTLM Authentication Scheme for HTTP
     Ronald Tschalaer / 17. June 2003
     http://www.innovation.ch/personal/ronald/ntlm.html
