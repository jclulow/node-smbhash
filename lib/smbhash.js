/*
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABigIntegerLITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * Copyright (C) 2011  Joshua M. Clulow <josh@sysmgr.org>
 */

var crypto = require('crypto');
var BigInteger = require('bigdecimal').BigInteger;

function zeroExtend(str, len)
{
	while (str.length < len)
		str = '0' + str;
	return (str);
}

/* number -> 8bit binary string */
function bbs(num)
{
	var s = BigInteger.valueOf(num).toString(2);
	return (zeroExtend(s, 8));
}

/* 7bit bit string -> 8bit odd parity bit string */
function oddpar(bitstr)
{
	var par = 1;
	for (var i = 0; i < bitstr.length; i++) {
		if (bitstr[i] === '1')
			par = (par + 1) % 2;
	}
	return (bitstr + String(par));
}

/* 64bit bit string -> 8byte binary string */
function binkey(bitstr)
{
	var out = new Buffer(8);
	var bi = new BigInteger(bitstr, 2);
	for (var i = 0; i < 8; i++) {
		var bi = new BigInteger(bitstr.substr(8 * i, 8), 2);
		out[i] = bi.intValue();
	}
	return out.toString('binary');
}

/*
 * Generate the LM Hash
 */
module.exports.lmhash = function lmhash(inputstr)
{
	/* ASCII --> uppercase */
	var x = inputstr.toUpperCase();

	/* null pad to 14 bytes */
	var y = "";
	for (var i = 0; i < 14; i++) {
		if (i < x.length)
			y += bbs(x.charCodeAt(i));
		else
			y += '00000000';
	}

	/* insert odd parity bits in key */
	var os = "";
	for (var i = 0; i < y.length / 7; i++) {
		os += oddpar(y.substr(i * 7, 7));
	}

	/* split into two 8-byte DES keys */
	var halves = [os.substr(0, 64), os.substr(64, 64)];

	/* DES encrypt magic number "KGS!@#$%" to two
	 * 8-byte ciphertexts, (ECB, no padding)
	 */
	var cts = [];
	for (var i = 0; i < halves.length; i++) {
		var des = crypto.createCipheriv('DES-ECB',
		    binkey(halves[i]), '');
		cts[i] = des.update('KGS!@#$%', 'binary', 'hex');
	}

	/* concat the two ciphertexts to form 16byte value,
	 * the LM hash */
	var out = zeroExtend(cts[0], 16) + zeroExtend(cts[1], 16);
	return (out.toUpperCase());
}

module.exports.nthash = function nthash(str)
{
	/* take MD4 hash of UCS-2 encoded password */
	var ucs2 = new Buffer(str, 'ucs2');
	var md4 = crypto.createHash('md4');
	md4.update(ucs2);
	return (zeroExtend(md4.digest('hex'), 32).toUpperCase());
}
