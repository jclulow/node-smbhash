/*
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * Copyright (C) 2012  Joshua M. Clulow <josh@sysmgr.org>
 */

var $ = require('../lib/smbhash').ntlm;

var GOOD = [
  { messages: [
      'TlRMTVNTUAABAAAAA7IAAAoACgApAAAACQAJACAAAABMSUdIVENJVFlVUlNBLU1JTk9S',
      'TlRMTVNTUAACAAAAAAAAACgAAAABggAAU3J2Tm9uY2UAAAAAAAAAAA==',
      'TlRMTVNTUAADAAAAGAAYAHIAAAAYABgAigAAABQAFABAAAAADAAMAFQAAAASABIAYAAA' +
      'AAAAAACiAAAAAYIAAFUAUgBTAEEALQBNAEkATgBPAFIAWgBhAHAAaABvAGQATABJAEcA' +
      'SABUAEMASQBUAFkArYfKbe/jRoW5xDxHeoxC1gBmfWiS5+iX4OAN4xBKG/IFPwfH3agt' +
      'PEia6YnhsADT' ],
    hostname: 'LightCity',
    ntdomain: 'Ursa-Minor',
    username: 'Zaphod',
    password: 'Beeblebrox',
    nonce: 'SrvNonce'
  }
];

module.exports.type1_success = function(test) {
  test.expect(GOOD.length * 1);
  for (var i = 0; i < GOOD.length; i++) {
    var g = GOOD[i];
    var out = $.encodeType1(g.hostname, g.ntdomain);
    test.strictEqual(out.toString('base64'), g.messages[0]);
  }
  test.done();
}

module.exports.type2_success = function(test) {
  test.expect(GOOD.length * 1);
  for (var i = 0; i < GOOD.length; i++) {
    var g = GOOD[i];
    var inbuf = new Buffer(g.messages[1], 'base64');
    var out = $.decodeType2(inbuf);
    test.strictEqual(out.toString('binary'), g.nonce);
  }
  test.done();
}

module.exports.type3_success = function(test) {
  test.expect(GOOD.length * 1);
  for (var i = 0; i < GOOD.length; i++) {
    var g = GOOD[i];
    var out = $.encodeType3(g.username, g.hostname, g.ntdomain, g.nonce,
      g.password);
    test.strictEqual(out.toString('base64'), g.messages[2]);
  }
  test.done();
}
