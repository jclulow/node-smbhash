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
 * Copyright (C) 2011-2012  Joshua M. Clulow <josh@sysmgr.org>
 */

var lmhash = require('../lib/smbhash').lmhash;
var nthash = require('../lib/smbhash').nthash;

var GOOD = [
  { password: 'pass123',
    lmhash: '4FB7D301186E0EB3AAD3B435B51404EE',
    nthash: '5FBC3D5FEC8206A30F4B6C473D68AE76' },
  { password: 'SecREt01',
    lmhash: 'FF3750BCC2B22412C2265B23734E0DAC',
    nthash: 'CD06CA7C7E10C99B1D33B7485A2ED808' },
  { password: 'Beeblebrox',
    lmhash: '919016F64EC7B00BA235028CA50C7A03',
    nthash: '8C1B59E32E666DADF175745FAD62C133' }
];

module.exports.nthash_success = function(test) {
  test.expect(GOOD.length * 2);
  for (var i = 0; i < GOOD.length; i++) {
    var g = GOOD[i];
    test.doesNotThrow(function() {
      var out = nthash(g.password);
      test.strictEqual(out, g.nthash);
    });
  }
  test.done();
}

module.exports.lmhash_success = function(test) {
  test.expect(GOOD.length * 2);
  for (var i = 0; i < GOOD.length; i++) {
    var g = GOOD[i];
    test.doesNotThrow(function() {
      var out = lmhash(g.password);
      test.strictEqual(out, g.lmhash);
    });
  }
  test.done();
}
