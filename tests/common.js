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
 * Copyright (C) 2011  Joshua M. Clulow <josh@sysmgr.org>
 */

var $ = require('../lib/common');

var GOOD = [
  { key56: new Buffer([0x53, 0x45, 0x43, 0x52, 0x45, 0x54, 0x30]),
    raw64: new Buffer([0x52, 0xa2, 0x50, 0x6a, 0x24, 0x2a, 0x50, 0x60]),
    par64: new Buffer([0x52, 0xa2, 0x51, 0x6b, 0x25, 0x2a, 0x51, 0x61])
  }
];

function bufEq(a, b)
{
  if (a.length !== b.length)
    throw new Error(a.inspect() + ' !== ' + b.inspect());
  for (var i = 0; i < a.length; i++)
    if (a[i] !== b[i])
      throw new Error(a.inspect() + ' !== ' + b.inspect());
}

function oddpar_success(test)
{
  test.expect(GOOD.length * 2);
  for (var i = 0; i < GOOD.length; i++) {
    var g = GOOD[i];
    var out = $.expandkey(g.key56);
    test.doesNotThrow(function() { bufEq(out, g.raw64); });
    out = $.oddpar(out);
    test.doesNotThrow(function() { bufEq(out, g.par64); });
  }
  test.done();
}

module.exports.oddpar_success = oddpar_success;
