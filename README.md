# node-smbhash: Samba LM/NT Hash Library

## Introduction

This library converts passwords into the LAN Manager (LM) and
NT Hashes used by SMB/CIFS servers.  It was written to populate
the sambaLMPassword and sambaNTPassword values in an LDAP directory
for use with Samba.

## Installation

     npm install smbhash

## Usage

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

## References

     The NTLM Authentication Protocol and Security Support Provider
     Copyright (C) 2003, 2006 Eric Glass
     http://davenport.sourceforge.net/ntlm.html
     
     NTLM Authentication Scheme for HTTP
     Ronald Tschalaer / 17. June 2003
     http://www.innovation.ch/personal/ronald/ntlm.html
