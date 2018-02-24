(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
window.Cryptium = require('./src/cryptium');
}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_772d411e.js","/")
},{"./src/cryptium":13,"buffer":3,"lYpoI2":10}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")
},{"buffer":3,"lYpoI2":10}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")
},{"base64-js":2,"buffer":3,"ieee754":11,"lYpoI2":10}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Buffer = require('buffer').Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")
},{"buffer":3,"lYpoI2":10}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var Buffer = require('buffer').Buffer
var sha = require('./sha')
var sha256 = require('./sha256')
var rng = require('./rng')
var md5 = require('./md5')

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")
},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,"buffer":3,"lYpoI2":10}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var helpers = require('./helpers');

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")
},{"./helpers":4,"buffer":3,"lYpoI2":10}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")
},{"buffer":3,"lYpoI2":10}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var helpers = require('./helpers');

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")
},{"./helpers":4,"buffer":3,"lYpoI2":10}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var helpers = require('./helpers');

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
  /* append padding */
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")
},{"./helpers":4,"buffer":3,"lYpoI2":10}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")
},{"buffer":3,"lYpoI2":10}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")
},{"buffer":3,"lYpoI2":10}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// compatible cipher between browser and node server
var NODE_ALG = "aes-256-cbc";
var BROWSER_ALG = "AES-CBC";
var BROWSER_HASH = "SHA-256";
var NODE_HASH = "sha256";

/**
 * get cipher based on AES
 * @param {string} password password for the ecnription
 * @param {string} iv_string inititalization vector in base 64 (optional)
 */
function Browser_cipher(password, iv_string) {
  this.iv_string = iv_string;
  this.iv = fromBase64(iv_string);
  this.pwUint8 = new TextEncoder().encode(password);
}

/**
 * Init key
 */
Browser_cipher.prototype.getKey = function() {
  return crypto.subtle.digest(BROWSER_HASH, this.pwUint8).then(function(pwHash)  {
    this.pwHash = pwHash;
    this.alg = {
      name: BROWSER_ALG,
      iv: this.iv
    };
    return crypto.subtle
      .importKey("raw", this.pwHash, this.alg, false, ["encrypt", "decrypt"])
      .then(function(key)  {
        this.key = key;
        return this;
      });
  });
};

/**
 * encrypt a string
 * @param {string} toEncrypt string to be encrypted
 */
Browser_cipher.prototype.encrypt = function(toEncrypt) {
  return this.getKey()
    .then(function()  {
      var ptUtf8 = new TextEncoder().encode(toEncrypt);
      return crypto.subtle.encrypt(this.alg, this.key, ptUtf8);
    })
    .then(function(arrayBuffer)  {
      return toBase64(arrayBuffer);
    });
};

/**
 * decrypt a string
 * @param {string} toDecrypt string to be decrypted
 */
Browser_cipher.prototype.decrypt = function(toDecrypt) {
  return this.getKey().then(function()  {
    ctBuffer = fromBase64(toDecrypt);
    return crypto.subtle
      .decrypt(this.alg, this.key, ctBuffer)
      .then(function(ptBuffer ) {
        return (plaintext = new TextDecoder().decode(ptBuffer));
      });
  });
};

/**
 * get the initialization vector
 * @return {string} the initialization vector in base64
 */
Browser_cipher.prototype.getIv = function() {
  return this.iv_string;
};

/**
 * create a random initialization vector
 * @return {string} the initialization vector in base64
 */
function Browser_createIv() {
  return toBase64(crypto.getRandomValues(new Uint8Array(16)));
}

function toBase64(arrayBuffer) {
  return btoa(
    new Uint8Array(arrayBuffer).reduce(
      function(data, byte)  {return data + String.fromCharCode(byte)},
      ""
    )
  );
}
// from base 64 to uint8 array
function fromBase64(base64_string) {
  return Uint8Array.from(atob(base64_string), function(character){
    return character.charCodeAt(0)
  } 
    
  );
}

/**
 * get cipher based on AES, Node side encryption decryption
 * @param {string} password password for the ecnription
 * @param {string} iv_string inititalization vector in base 64 (optional)
 */
function Node_aes_cipher(password, iv) {
  var crypto = require("crypto");
  this.key = crypto.createHash(NODE_HASH).update(password, "utf8").digest();
  this.iv = new Buffer(iv, "base64");
}

/**
 * encrypt a string
 * @param {string} toEncrypt string to be encrypted
 */
Node_aes_cipher.prototype.encrypt = function(toEncrypt) {
  var crypto = require("crypto");
  var cipher = crypto.createCipheriv(NODE_ALG, this.key, this.iv);
  var encrypted = cipher.update(toEncrypt, "utf8", "base64");
  encrypted += cipher.final("base64");
  return new Promise(function (res, rej)  {
    res(encrypted);
  });
};

/**
 * decrypt a string
 * @param {string} toDecrypt string to be decrypted
 */
Node_aes_cipher.prototype.decrypt = function(toDecrypt) {
  var crypto = require("crypto");
  // create the decipher
  var decipher = crypto.createDecipheriv(NODE_ALG, this.key, this.iv);
  var decrypted = decipher.update(toDecrypt, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return new Promise(function (res, rej)  {
    res(decrypted);
  });
};

/**
 * get the initialization vector
 * @return {string} the initialization vector in base64
 */
Node_aes_cipher.prototype.getIv = function() {
  return this.iv.toString("base64");
};

/**
 * create a random initialization vector
 * @return {string} the initialization vector in base64
 */
function Node_createIv() {
  var crypto = require("crypto");
  return new Buffer(crypto.randomBytes(16)).toString("base64");
}

module.exports = {
  Node_aes_cipher,
  Browser_cipher,
  Browser_createIv,
  Node_createIv
};

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src/aescipher.js","/src")
},{"buffer":3,"crypto":5,"lYpoI2":10}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Import helpers
var helpers = require("./helpers");
var aescipher = require("./aescipher");

/**
 * Convert a byte array to a hex string
 * Implementation from crypt-js
 * @param {number} bytes 
 */
function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return hex.join("");
}

/** 
 * Generates a crypto secure random string
* @param {number} items
* items is the number of random hex characters, as the minimum item is a 32 bytes the minimum output is 4
*/
function getRandomValues(items) {
  var token = "";

  if (helpers.isNode()) {
    // Node version
    // note that in the browser the items are 32bits whereas here are Bytes
    // i.e. 4 times longer in the browser
    var buffer = require("crypto").randomBytes(items * 4);
    token = buffer.toString("hex");
  } else if (window.crypto != "undefined") {
    // Browser version
    var cryptoObj = window.crypto || window.msCrypto; // for IE 11
    var array = new Uint32Array(items);
    cryptoObj.getRandomValues(array);
    token = bytesToHex(array);
  }
  return token;
}

// add a salt to a given string
/**
 * 
 * @param {string} input 
 * @param {string} saltBytes 
 */
function addSalt(input, saltBytes) {
  var newString = input + "|" + getRandomValues(saltBytes);
  return newString;
}

/**
 * remove salt from a salted string
 * @param {string} saltedString 
 */
function removeSalt(saltedString) {
  var fields = saltedString.split("|");
  return fields[0];
}

/**
 * get encryption based on RSA pub-priv keys
 * @param {string} pub public key
 * @param {string} priv private key
 */
function createEncrypter(pub, priv) {
  if (helpers.isNode()) {
    return new helpers.Node_RSA(pub, priv);
  } else {
    return new helpers.Browser_RSA(pub, priv);
  }
}

/**
 * get cipher based on AES
 * @param {string} password password for the ecnriptio
 * @param {string} iv_input inititalization vector in base 64 (optional)
 */
function createCipher(password, iv_input) {
  if (iv_input == undefined) {
    // generate a new iv
    if (helpers.isNode()) {
      var iv = aescipher.Node_createIv();
    } else {
      var iv = aescipher.Browser_createIv();
    }
  } else {
    var iv = iv_input;
  }
  if (helpers.isNode()) {
    return new aescipher.Node_aes_cipher(password, iv);
  } else {
    return new aescipher.Browser_cipher(password, iv);
  }
}
/**
 * Encrypts an Notification and it's content
 * 
 * @param  {string} destination
 * @param  {string} content
 * @param  {string} pub
 */
function encryptNotification(destination, content, pub) {
  var encrypt = createEncrypter(pub, null);
  var encryptedDestination = encrypt.encrypt(destination);
  // encrypt content using AES
  var AESCipher = createCipher(destination);
  var iv = AESCipher.getIv();
  return AESCipher.encrypt(content).then(function(encryptedContent) {
    return { destination: encryptedDestination, iv: iv, content: encryptedContent };
  });
}

/**
 * decrypt an Notification
 * 
 * @param  {string} destination
 * @param  {string} content
 * @param  {string} iv
 * @param  {string} priv
 */
function decryptNotification(destination, content, iv, priv) {
  var encrypt = createEncrypter(null, priv);
  var decryptedNotification = encrypt.decrypt(destination);
  // encrypt content using AES
  var AESCipher = createCipher(decryptedNotification, iv);
  return AESCipher.decrypt(content).then(function(decryptedContent ) {
    return { destination: decryptedNotification, content: decryptedContent };
  });
}

// module exports
module.exports = {
  getRandomValues: getRandomValues,
  addSalt: addSalt,
  removeSalt: removeSalt,
  createEncrypter: createEncrypter,
  createCipher: createCipher,
  encryptNotification: encryptNotification,
  decryptNotification: decryptNotification
};

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src/cryptium.js","/src")
},{"./aescipher":12,"./helpers":14,"buffer":3,"crypto":5,"lYpoI2":10}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
function isNode() {
  return typeof window === "undefined";
}

// Browser encryption decryption
function Browser_RSA(pubkey, privkey) {
  this.pubkey = pubkey;
  this.privkey = privkey;
}
Browser_RSA.prototype.encrypt = function(input) {
  var JSEncrypt = require("./jsencrypt");
  var encrypter = new JSEncrypt.JSEncrypt();
  encrypter.setPublicKey(this.pubkey);
  return encrypter.encrypt(input);
};
Browser_RSA.prototype.decrypt = function(input) {
  var JSEncrypt = require("./jsencrypt");
  var encrypter = new JSEncrypt.JSEncrypt();
  encrypter.setPrivateKey(this.privkey);
  return encrypter.decrypt(input);
};

// Node side encryption decryption
function Node_RSA(pubkey, privkey) {
  this.privateKey = privkey;
  this.publicKey = pubkey;
}
Node_RSA.prototype.encrypt = function(toEncrypt) {
  var crypto = require("crypto");
  var buffer = new Buffer(toEncrypt);
  var encrypted = crypto.publicEncrypt(
    { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer
  );
  return encrypted.toString("base64");
};
Node_RSA.prototype.decrypt = function(toDecrypt) {
  var crypto = require("crypto");
  var buffer = new Buffer(toDecrypt, "base64");
  var decrypted = crypto.privateDecrypt(
    { key: this.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer
  );
  return decrypted.toString("utf8");
};

module.exports = {
  isNode: isNode,
  Browser_RSA: Browser_RSA,
  Node_RSA: Node_RSA
};

}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src/helpers.js","/src")
},{"./jsencrypt":15,"buffer":3,"crypto":5,"lYpoI2":10}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*! JSEncrypt v2.3.1 | https://npmcdn.com/jsencrypt@2.3.1/LICENSE.txt */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // Node, CommonJS-like
    factory(module.exports);
  } else {
    factory(root);
  }
})(this, function (exports) {
  // Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+this.DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return (this.s<0)?-r:r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
function bnIntValue() {
  if(this.s < 0) {
    if(this.t == 1) return this[0]-this.DV;
    else if(this.t == 0) return -1;
  }
  else if(this.t == 1) return this[0];
  else if(this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
}

// (public) return value as byte
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if(this.s < 0) return -1;
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if(b == null) b = 10;
  if(this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b,cs);
  var d = nbv(a), y = nbi(), z = nbi(), r = "";
  this.divRemTo(d,y,z);
  while(y.signum() > 0) {
    r = (a+z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d,y,z);
  }
  return z.intValue().toString(b) + r;
}

// (protected) convert from radix string
function bnpFromRadix(s,b) {
  this.fromInt(0);
  if(b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
  for(var i = 0; i < s.length; ++i) {
    var x = intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
      continue;
    }
    w = b*w+x;
    if(++j >= cs) {
      this.dMultiply(d);
      this.dAddOffset(w,0);
      j = 0;
      w = 0;
    }
  }
  if(j > 0) {
    this.dMultiply(Math.pow(b,j));
    this.dAddOffset(w,0);
  }
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) alternate constructor
function bnpFromNumber(a,b,c) {
  if("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if(a < 2) this.fromInt(1);
    else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1))	// force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      if(this.isEven()) this.dAddOffset(1,0); // force odd
      while(!this.isProbablePrime(b)) {
        this.dAddOffset(2,0);
        if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
      }
    }
  }
  else {
    // new BigInteger(int,RNG)
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var i = this.t, r = new Array();
  r[0] = this.s;
  var p = this.DB-(i*this.DB)%8, d, k = 0;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
      r[k++] = d|(this.s<<(this.DB-p));
    while(i >= 0) {
      if(p < 8) {
        d = (this[i]&((1<<p)-1))<<(8-p);
        d |= this[--i]>>(p+=this.DB-8);
      }
      else {
        d = (this[i]>>(p-=8))&0xff;
        if(p <= 0) { p += this.DB; --i; }
      }
      if((d&0x80) != 0) d |= -256;
      if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
      if(k > 0 || d != this.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a) { return(this.compareTo(a)==0); }
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a,op,r) {
  var i, f, m = Math.min(a.t,this.t);
  for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
  if(a.t < this.t) {
    f = a.s&this.DM;
    for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
    r.t = this.t;
  }
  else {
    f = this.s&this.DM;
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
    r.t = a.t;
  }
  r.s = op(this.s,a.s);
  r.clamp();
}

// (public) this & a
function op_and(x,y) { return x&y; }
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
function op_or(x,y) { return x|y; }
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
function op_xor(x,y) { return x^y; }
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
function op_andnot(x,y) { return x&~y; }
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
function bnNot() {
  var r = nbi();
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}

// (public) this << n
function bnShiftLeft(n) {
  var r = nbi();
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
  return r;
}

// (public) this >> n
function bnShiftRight(n) {
  var r = nbi();
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
  return r;
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if(x == 0) return -1;
  var r = 0;
  if((x&0xffff) == 0) { x >>= 16; r += 16; }
  if((x&0xff) == 0) { x >>= 8; r += 8; }
  if((x&0xf) == 0) { x >>= 4; r += 4; }
  if((x&3) == 0) { x >>= 2; r += 2; }
  if((x&1) == 0) ++r;
  return r;
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for(var i = 0; i < this.t; ++i)
    if(this[i] != 0) return i*this.DB+lbit(this[i]);
  if(this.s < 0) return this.t*this.DB;
  return -1;
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while(x != 0) { x &= x-1; ++r; }
  return r;
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0, x = this.s&this.DM;
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
  return r;
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n/this.DB);
  if(j >= this.t) return(this.s!=0);
  return((this[j]&(1<<(n%this.DB)))!=0);
}

// (protected) this op (1<<n)
function bnpChangeBit(n,op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r,op,r);
  return r;
}

// (public) this | (1<<n)
function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
function bnpAddTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]+a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c += a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c += a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = (c<0)?-1:0;
  if(c > 0) r[i++] = c;
  else if(c < -1) r[i++] = this.DV+c;
  r.t = i;
  r.clamp();
}

// (public) this + a
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this^2
function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

// (public) this / a
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = nbi(), r = nbi();
  this.divRemTo(a,q,r);
  return new Array(q,r);
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0,n-1,this,0,0,this.t);
  ++this.t;
  this.clamp();
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n,w) {
  if(n == 0) return;
  while(this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while(this[w] >= this.DV) {
    this[w] -= this.DV;
    if(++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}

// A "null" reducer
function NullExp() {}
function nNop(x) { return x; }
function nMulTo(x,y,r) { x.multiplyTo(y,r); }
function nSqrTo(x,r) { x.squareTo(r); }

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a,n,r) {
  var i = Math.min(this.t+a.t,n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while(i > 0) r[--i] = 0;
  var j;
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
  r.clamp();
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a,n,r) {
  --n;
  var i = r.t = this.t+a.t-n;
  r.s = 0; // assumes a,this >= 0
  while(--i >= 0) r[i] = 0;
  for(i = Math.max(n-this.t,0); i < a.t; ++i)
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
  r.clamp();
  r.drShiftTo(1,r);
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
  else if(x.compareTo(this.m) < 0) return x;
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
}

function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  x.drShiftTo(this.m.t-1,this.r2);
  if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
  this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
  this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
  while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
  x.subTo(this.r2,x);
  while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = x^2 mod m; x != r
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
function bnModPow(e,m) {
  var i = e.bitLength(), k, r = nbv(1), z;
  if(i <= 0) return r;
  else if(i < 18) k = 1;
  else if(i < 48) k = 3;
  else if(i < 144) k = 4;
  else if(i < 768) k = 5;
  else k = 6;
  if(i < 8)
    z = new Classic(m);
  else if(m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);

  // precomputation
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
  g[1] = z.convert(this);
  if(k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1],g2);
    while(n <= km) {
      g[n] = nbi();
      z.mulTo(g2,g[n-2],g[n]);
      n += 2;
    }
  }

  var j = e.t-1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j])-1;
  while(j >= 0) {
    if(i >= k1) w = (e[j]>>(i-k1))&km;
    else {
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
    }

    n = k;
    while((w&1) == 0) { w >>= 1; --n; }
    if((i -= n) < 0) { i += this.DB; --j; }
    if(is1) {	// ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else {
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
      z.mulTo(r2,g[w],r);
    }

    while(j >= 0 && (e[j]&(1<<i)) == 0) {
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;
      if(--i < 0) { i = this.DB-1; --j; }
    }
  }
  return z.revert(r);
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s<0)?this.negate():this.clone();
  var y = (a.s<0)?a.negate():a.clone();
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();
  if(g < 0) return x;
  if(i < g) g = i;
  if(g > 0) {
    x.rShiftTo(g,x);
    y.rShiftTo(g,y);
  }
  while(x.signum() > 0) {
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
    if(x.compareTo(y) >= 0) {
      x.subTo(y,x);
      x.rShiftTo(1,x);
    }
    else {
      y.subTo(x,y);
      y.rShiftTo(1,y);
    }
  }
  if(g > 0) y.lShiftTo(g,y);
  return y;
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if(n <= 0) return 0;
  var d = this.DV%n, r = (this.s<0)?n-1:0;
  if(this.t > 0)
    if(d == 0) r = this[0]%n;
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
  return r;
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven();
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(), v = this.clone();
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
  while(u.signum() != 0) {
    while(u.isEven()) {
      u.rShiftTo(1,u);
      if(ac) {
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
        a.rShiftTo(1,a);
      }
      else if(!b.isEven()) b.subTo(m,b);
      b.rShiftTo(1,b);
    }
    while(v.isEven()) {
      v.rShiftTo(1,v);
      if(ac) {
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
        c.rShiftTo(1,c);
      }
      else if(!d.isEven()) d.subTo(m,d);
      d.rShiftTo(1,d);
    }
    if(u.compareTo(v) >= 0) {
      u.subTo(v,u);
      if(ac) a.subTo(c,a);
      b.subTo(d,b);
    }
    else {
      v.subTo(u,v);
      if(ac) c.subTo(a,c);
      d.subTo(b,d);
    }
  }
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if(d.compareTo(m) >= 0) return d.subtract(m);
  if(d.signum() < 0) d.addTo(m,d); else return d;
  if(d.signum() < 0) return d.add(m); else return d;
}

var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
var lplim = (1<<26)/lowprimes[lowprimes.length-1];

// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {
  var i, x = this.abs();
  if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
    for(i = 0; i < lowprimes.length; ++i)
      if(x[0] == lowprimes[i]) return true;
    return false;
  }
  if(x.isEven()) return false;
  i = 1;
  while(i < lowprimes.length) {
    var m = lowprimes[i], j = i+1;
    while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
    m = x.modInt(m);
    while(i < j) if(m%lowprimes[i++] == 0) return false;
  }
  return x.millerRabin(t);
}

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if(k <= 0) return false;
  var r = n1.shiftRight(k);
  t = (t+1)>>1;
  if(t > lowprimes.length) t = lowprimes.length;
  var a = nbi();
  for(var i = 0; i < t; ++i) {
    //Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);
    var y = a.modPow(r,this);
    if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1;
      while(j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2,this);
        if(y.compareTo(BigInteger.ONE) == 0) return false;
      }
      if(y.compareTo(n1) != 0) return false;
    }
  }
  return true;
}

// protected
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;

// public
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

// JSBN-specific extension
BigInteger.prototype.square = bnSquare;

// BigInteger interfaces not implemented in jsbn:

// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)

// prng4.js - uses Arcfour as a PRNG

function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}

// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
  var i, j, t;
  for(i = 0; i < 256; ++i)
    this.S[i] = i;
  j = 0;
  for(i = 0; i < 256; ++i) {
    j = (j + this.S[i] + key[i % key.length]) & 255;
    t = this.S[i];
    this.S[i] = this.S[j];
    this.S[j] = t;
  }
  this.i = 0;
  this.j = 0;
}

function ARC4next() {
  var t;
  this.i = (this.i + 1) & 255;
  this.j = (this.j + this.S[this.i]) & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[(t + this.S[this.i]) & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;

// Random number generator - requires a PRNG backend, e.g. prng4.js
var rng_state;
var rng_pool;
var rng_pptr;

// Initialize the pool with junk if needed.
if(rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  if(window.crypto && window.crypto.getRandomValues) {
    // Extract entropy (2048 bits) from RNG if available
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
    for (t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = z[t] & 255;
  }

  // Use mouse events for entropy, if we do not have enough entropy by the time
  // we need it, entropy will be generated by Math.random.
  var onMouseMoveListener = function(ev) {
    this.count = this.count || 0;
    if (this.count >= 256 || rng_pptr >= rng_psize) {
      if (window.removeEventListener)
        window.removeEventListener("mousemove", onMouseMoveListener, false);
      else if (window.detachEvent)
        window.detachEvent("onmousemove", onMouseMoveListener);
      return;
    }
    try {
      var mouseCoordinates = ev.x + ev.y;
      rng_pool[rng_pptr++] = mouseCoordinates & 255;
      this.count += 1;
    } catch (e) {
      // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
    }
  };
  if (window.addEventListener)
    window.addEventListener("mousemove", onMouseMoveListener, false);
  else if (window.attachEvent)
    window.attachEvent("onmousemove", onMouseMoveListener);

}

function rng_get_byte() {
  if(rng_state == null) {
    rng_state = prng_newstate();
    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
    while (rng_pptr < rng_psize) {
      var random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}

function rng_get_bytes(ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;

// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str,r) {
  return new BigInteger(str,r);
}

function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
  if(b < 0x10)
    return "0" + b.toString(16);
  else
    return b.toString(16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
  if(n < s.length + 11) { // TODO: fix for utf-8
    console.error("Message too long for RSA");
    return null;
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

// "empty" RSA key constructor
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
  }
  else
    console.error("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

// Depends on rsa.js and jsbn2.js

// Version 1.1: support utf-8 decoding in pkcs1unpad2

// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d,n) {
  var b = d.toByteArray();
  var i = 0;
  while(i < b.length && b[i] == 0) ++i;
  if(b.length-i != n-1 || b[i] != 2)
    return null;
  ++i;
  while(b[i] != 0)
    if(++i >= b.length) return null;
  var ret = "";
  while(++i < b.length) {
    var c = b[i] & 255;
    if(c < 128) { // utf-8 decode
      ret += String.fromCharCode(c);
    }
    else if((c > 191) && (c < 224)) {
      ret += String.fromCharCode(((c & 31) << 6) | (b[i+1] & 63));
      ++i;
    }
    else {
      ret += String.fromCharCode(((c & 15) << 12) | ((b[i+1] & 63) << 6) | (b[i+2] & 63));
      i += 2;
    }
  }
  return ret;
}

// Set the private key fields N, e, and d from hex strings
function RSASetPrivate(N,E,D) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
    this.d = parseBigInt(D,16);
  }
  else
    console.error("Invalid RSA private key");
}

// Set the private key fields N, e, d and CRT params from hex strings
function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
    this.d = parseBigInt(D,16);
    this.p = parseBigInt(P,16);
    this.q = parseBigInt(Q,16);
    this.dmp1 = parseBigInt(DP,16);
    this.dmq1 = parseBigInt(DQ,16);
    this.coeff = parseBigInt(C,16);
  }
  else
    console.error("Invalid RSA private key");
}

// Generate a new random private key B bits long, using public expt E
function RSAGenerate(B,E) {
  var rng = new SecureRandom();
  var qs = B>>1;
  this.e = parseInt(E,16);
  var ee = new BigInteger(E,16);
  for(;;) {
    for(;;) {
      this.p = new BigInteger(B-qs,1,rng);
      if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) break;
    }
    for(;;) {
      this.q = new BigInteger(qs,1,rng);
      if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) break;
    }
    if(this.p.compareTo(this.q) <= 0) {
      var t = this.p;
      this.p = this.q;
      this.q = t;
    }
    var p1 = this.p.subtract(BigInteger.ONE);
    var q1 = this.q.subtract(BigInteger.ONE);
    var phi = p1.multiply(q1);
    if(phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
      this.n = this.p.multiply(this.q);
      this.d = ee.modInverse(phi);
      this.dmp1 = this.d.mod(p1);
      this.dmq1 = this.d.mod(q1);
      this.coeff = this.q.modInverse(this.p);
      break;
    }
  }
}

// Perform raw private operation on "x": return x^d (mod n)
function RSADoPrivate(x) {
  if(this.p == null || this.q == null)
    return x.modPow(this.d, this.n);

  // TODO: re-calculate any missing CRT params
  var xp = x.mod(this.p).modPow(this.dmp1, this.p);
  var xq = x.mod(this.q).modPow(this.dmq1, this.q);

  while(xp.compareTo(xq) < 0)
    xp = xp.add(this.p);
  return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
}

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is an even-length hex string and the output is a plain string.
function RSADecrypt(ctext) {
  var c = parseBigInt(ctext, 16);
  var m = this.doPrivate(c);
  if(m == null) return null;
  return pkcs1unpad2(m, (this.n.bitLength()+7)>>3);
}

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is a Base64-encoded string and the output is a plain string.
//function RSAB64Decrypt(ctext) {
//  var h = b64tohex(ctext);
//  if(h) return this.decrypt(h); else return null;
//}

// protected
RSAKey.prototype.doPrivate = RSADoPrivate;

// public
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
//RSAKey.prototype.b64_decrypt = RSAB64Decrypt;

// Copyright (c) 2011  Kevin M Burns Jr.
// All Rights Reserved.
// See "LICENSE" for details.
//
// Extension to jsbn which adds facilities for asynchronous RSA key generation
// Primarily created to avoid execution timeout on mobile devices
//
// http://www-cs-students.stanford.edu/~tjw/jsbn/
//
// ---

(function(){

// Generate a new random private key B bits long, using public expt E
var RSAGenerateAsync = function (B, E, callback) {
    //var rng = new SeededRandom();
    var rng = new SecureRandom();
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new BigInteger(E, 16);
    var rsa = this;
    // These functions have non-descript names because they were originally for(;;) loops.
    // I don't know about cryptography to give them better names than loop1-4.
    var loop1 = function() {
        var loop4 = function() {
            if (rsa.p.compareTo(rsa.q) <= 0) {
                var t = rsa.p;
                rsa.p = rsa.q;
                rsa.q = t;
            }
            var p1 = rsa.p.subtract(BigInteger.ONE);
            var q1 = rsa.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                rsa.n = rsa.p.multiply(rsa.q);
                rsa.d = ee.modInverse(phi);
                rsa.dmp1 = rsa.d.mod(p1);
                rsa.dmq1 = rsa.d.mod(q1);
                rsa.coeff = rsa.q.modInverse(rsa.p);
                setTimeout(function(){callback()},0); // escape
            } else {
                setTimeout(loop1,0);
            }
        };
        var loop3 = function() {
            rsa.q = nbi();
            rsa.q.fromNumberAsync(qs, 1, rng, function(){
                rsa.q.subtract(BigInteger.ONE).gcda(ee, function(r){
                    if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                        setTimeout(loop4,0);
                    } else {
                        setTimeout(loop3,0);
                    }
                });
            });
        };
        var loop2 = function() {
            rsa.p = nbi();
            rsa.p.fromNumberAsync(B - qs, 1, rng, function(){
                rsa.p.subtract(BigInteger.ONE).gcda(ee, function(r){
                    if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                        setTimeout(loop3,0);
                    } else {
                        setTimeout(loop2,0);
                    }
                });
            });
        };
        setTimeout(loop2,0);
    };
    setTimeout(loop1,0);
};
RSAKey.prototype.generateAsync = RSAGenerateAsync;

// Public API method
var bnGCDAsync = function (a, callback) {
    var x = (this.s < 0) ? this.negate() : this.clone();
    var y = (a.s < 0) ? a.negate() : a.clone();
    if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
    }
    var i = x.getLowestSetBit(),
        g = y.getLowestSetBit();
    if (g < 0) {
        callback(x);
        return;
    }
    if (i < g) g = i;
    if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
    }
    // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
    var gcda1 = function() {
        if ((i = x.getLowestSetBit()) > 0){ x.rShiftTo(i, x); }
        if ((i = y.getLowestSetBit()) > 0){ y.rShiftTo(i, y); }
        if (x.compareTo(y) >= 0) {
            x.subTo(y, x);
            x.rShiftTo(1, x);
        } else {
            y.subTo(x, y);
            y.rShiftTo(1, y);
        }
        if(!(x.signum() > 0)) {
            if (g > 0) y.lShiftTo(g, y);
            setTimeout(function(){callback(y)},0); // escape
        } else {
            setTimeout(gcda1,0);
        }
    };
    setTimeout(gcda1,10);
};
BigInteger.prototype.gcda = bnGCDAsync;

// (protected) alternate constructor
var bnpFromNumberAsync = function (a,b,c,callback) {
  if("number" == typeof b) {
    if(a < 2) {
        this.fromInt(1);
    } else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1)){
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      }
      if(this.isEven()) {
        this.dAddOffset(1,0);
      }
      var bnp = this;
      var bnpfn1 = function(){
        bnp.dAddOffset(2,0);
        if(bnp.bitLength() > a) bnp.subTo(BigInteger.ONE.shiftLeft(a-1),bnp);
        if(bnp.isProbablePrime(b)) {
            setTimeout(function(){callback()},0); // escape
        } else {
            setTimeout(bnpfn1,0);
        }
      };
      setTimeout(bnpfn1,0);
    }
  } else {
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
};
BigInteger.prototype.fromNumberAsync = bnpFromNumberAsync;

})();
var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";

function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 == h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 == h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
  var ret = ""
  var i;
  var k = 0; // b64 state, 0-3
  var slop;
  for(i = 0; i < s.length; ++i) {
    if(s.charAt(i) == b64pad) break;
    v = b64map.indexOf(s.charAt(i));
    if(v < 0) continue;
    if(k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if(k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if(k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if(k == 1)
    ret += int2char(slop << 2);
  return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
  //piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = new Array();
  for(i = 0; 2*i < h.length; ++i) {
    a[i] = parseInt(h.substring(2*i,2*i+2),16);
  }
  return a;
}

/*! asn1-1.0.2.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
 */

var JSX = JSX || {};
JSX.env = JSX.env || {};

var L = JSX, OP = Object.prototype, FUNCTION_TOSTRING = '[object Function]',ADD = ["toString", "valueOf"];

JSX.env.parseUA = function(agent) {

    var numberify = function(s) {
        var c = 0;
        return parseFloat(s.replace(/\./g, function() {
            return (c++ == 1) ? '' : '.';
        }));
    },

    nav = navigator,
    o = {
        ie: 0,
        opera: 0,
        gecko: 0,
        webkit: 0,
        chrome: 0,
        mobile: null,
        air: 0,
        ipad: 0,
        iphone: 0,
        ipod: 0,
        ios: null,
        android: 0,
        webos: 0,
        caja: nav && nav.cajaVersion,
        secure: false,
        os: null

    },

    ua = agent || (navigator && navigator.userAgent),
    loc = window && window.location,
    href = loc && loc.href,
    m;

    o.secure = href && (href.toLowerCase().indexOf("https") === 0);

    if (ua) {

        if ((/windows|win32/i).test(ua)) {
            o.os = 'windows';
        } else if ((/macintosh/i).test(ua)) {
            o.os = 'macintosh';
        } else if ((/rhino/i).test(ua)) {
            o.os = 'rhino';
        }
        if ((/KHTML/).test(ua)) {
            o.webkit = 1;
        }
        m = ua.match(/AppleWebKit\/([^\s]*)/);
        if (m && m[1]) {
            o.webkit = numberify(m[1]);
            if (/ Mobile\//.test(ua)) {
                o.mobile = 'Apple'; // iPhone or iPod Touch
                m = ua.match(/OS ([^\s]*)/);
                if (m && m[1]) {
                    m = numberify(m[1].replace('_', '.'));
                }
                o.ios = m;
                o.ipad = o.ipod = o.iphone = 0;
                m = ua.match(/iPad|iPod|iPhone/);
                if (m && m[0]) {
                    o[m[0].toLowerCase()] = o.ios;
                }
            } else {
                m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (m) {
                    o.mobile = m[0];
                }
                if (/webOS/.test(ua)) {
                    o.mobile = 'WebOS';
                    m = ua.match(/webOS\/([^\s]*);/);
                    if (m && m[1]) {
                        o.webos = numberify(m[1]);
                    }
                }
                if (/ Android/.test(ua)) {
                    o.mobile = 'Android';
                    m = ua.match(/Android ([^\s]*);/);
                    if (m && m[1]) {
                        o.android = numberify(m[1]);
                    }
                }
            }
            m = ua.match(/Chrome\/([^\s]*)/);
            if (m && m[1]) {
                o.chrome = numberify(m[1]); // Chrome
            } else {
                m = ua.match(/AdobeAIR\/([^\s]*)/);
                if (m) {
                    o.air = m[0]; // Adobe AIR 1.0 or better
                }
            }
        }
        if (!o.webkit) {
            m = ua.match(/Opera[\s\/]([^\s]*)/);
            if (m && m[1]) {
                o.opera = numberify(m[1]);
                m = ua.match(/Version\/([^\s]*)/);
                if (m && m[1]) {
                    o.opera = numberify(m[1]); // opera 10+
                }
                m = ua.match(/Opera Mini[^;]*/);
                if (m) {
                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                m = ua.match(/MSIE\s([^;]*)/);
                if (m && m[1]) {
                    o.ie = numberify(m[1]);
                } else { // not opera, webkit, or ie
                    m = ua.match(/Gecko\/([^\s]*)/);
                    if (m) {
                        o.gecko = 1; // Gecko detected, look for revision
                        m = ua.match(/rv:([^\s\)]*)/);
                        if (m && m[1]) {
                            o.gecko = numberify(m[1]);
                        }
                    }
                }
            }
        }
    }
    return o;
};

JSX.env.ua = JSX.env.parseUA();

JSX.isFunction = function(o) {
    return (typeof o === 'function') || OP.toString.apply(o) === FUNCTION_TOSTRING;
};

JSX._IEEnumFix = (JSX.env.ua.ie) ? function(r, s) {
    var i, fname, f;
    for (i=0;i<ADD.length;i=i+1) {

        fname = ADD[i];
        f = s[fname];

        if (L.isFunction(f) && f!=OP[fname]) {
            r[fname]=f;
        }
    }
} : function(){};

JSX.extend = function(subc, superc, overrides) {
    if (!superc||!subc) {
        throw new Error("extend failed, please check that " +
                        "all dependencies are included.");
    }
    var F = function() {}, i;
    F.prototype=superc.prototype;
    subc.prototype=new F();
    subc.prototype.constructor=subc;
    subc.superclass=superc.prototype;
    if (superc.prototype.constructor == OP.constructor) {
        superc.prototype.constructor=superc;
    }

    if (overrides) {
        for (i in overrides) {
            if (L.hasOwnProperty(overrides, i)) {
                subc.prototype[i]=overrides[i];
            }
        }

        L._IEEnumFix(subc.prototype, overrides);
    }
};

/*
 * asn1.js - ASN.1 DER encoder classes
 *
 * Copyright (c) 2013 Kenji Urushima (kenji.urushima@gmail.com)
 *
 * This software is licensed under the terms of the MIT License.
 * http://kjur.github.com/jsrsasign/license
 *
 * The above copyright and license notice shall be 
 * included in all copies or substantial portions of the Software.
 */

/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version 1.0.2 (2013-May-30)
 * @since 2.1
 * @license <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 */

/** 
 * kjur's class library name space
 * <p>
 * This name space provides following name spaces:
 * <ul>
 * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
 * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
 * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature 
 * class and utilities</li>
 * </ul>
 * </p> 
 * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
  * @name KJUR
 * @namespace kjur's class library name space
 */
var KJUR;
if (typeof KJUR == "undefined" || !KJUR) KJUR = {};

/**
 * kjur's ASN.1 class library name space
 * <p>
 * This is ITU-T X.690 ASN.1 DER encoder class library and
 * class structure and methods is very similar to 
 * org.bouncycastle.asn1 package of 
 * well known BouncyCaslte Cryptography Library.
 *
 * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
 * Here are ASN.1 DER primitive classes.
 * <ul>
 * <li>{@link KJUR.asn1.DERBoolean}</li>
 * <li>{@link KJUR.asn1.DERInteger}</li>
 * <li>{@link KJUR.asn1.DERBitString}</li>
 * <li>{@link KJUR.asn1.DEROctetString}</li>
 * <li>{@link KJUR.asn1.DERNull}</li>
 * <li>{@link KJUR.asn1.DERObjectIdentifier}</li>
 * <li>{@link KJUR.asn1.DERUTF8String}</li>
 * <li>{@link KJUR.asn1.DERNumericString}</li>
 * <li>{@link KJUR.asn1.DERPrintableString}</li>
 * <li>{@link KJUR.asn1.DERTeletexString}</li>
 * <li>{@link KJUR.asn1.DERIA5String}</li>
 * <li>{@link KJUR.asn1.DERUTCTime}</li>
 * <li>{@link KJUR.asn1.DERGeneralizedTime}</li>
 * <li>{@link KJUR.asn1.DERSequence}</li>
 * <li>{@link KJUR.asn1.DERSet}</li>
 * </ul>
 *
 * <h4>OTHER ASN.1 CLASSES</h4>
 * <ul>
 * <li>{@link KJUR.asn1.ASN1Object}</li>
 * <li>{@link KJUR.asn1.DERAbstractString}</li>
 * <li>{@link KJUR.asn1.DERAbstractTime}</li>
 * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
 * <li>{@link KJUR.asn1.DERTaggedObject}</li>
 * </ul>
 * </p>
 * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
 * @name KJUR.asn1
 * @namespace
 */
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};

/**
 * ASN1 utilities class
 * @name KJUR.asn1.ASN1Util
 * @classs ASN1 utilities class
 * @since asn1 1.0.2
 */
KJUR.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(i) {
	var h = i.toString(16);
	if ((h.length % 2) == 1) h = '0' + h;
	return h;
    };
    this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
	var h = bigIntegerValue.toString(16);
	if (h.substr(0, 1) != '-') {
	    if (h.length % 2 == 1) {
		h = '0' + h;
	    } else {
		if (! h.match(/^[0-7]/)) {
		    h = '00' + h;
		}
	    }
	} else {
	    var hPos = h.substr(1);
	    var xorLen = hPos.length;
	    if (xorLen % 2 == 1) {
		xorLen += 1;
	    } else {
		if (! h.match(/^[0-7]/)) {
		    xorLen += 2;
		}
	    }
	    var hMask = '';
	    for (var i = 0; i < xorLen; i++) {
		hMask += 'f';
	    }
	    var biMask = new BigInteger(hMask, 16);
	    var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
	    h = biNeg.toString(16).replace(/^-/, '');
	}
	return h;
    };
    /**
     * get PEM string from hexadecimal data and header string
     * @name getPEMStringFromHex
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {String} dataHex hexadecimal string of PEM body
     * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
     * @return {String} PEM formatted string of input data
     * @description
     * @example
     * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
     * // value of pem will be:
     * -----BEGIN PRIVATE KEY-----
     * YWFh
     * -----END PRIVATE KEY-----
     */
    this.getPEMStringFromHex = function(dataHex, pemHeader) {
	var dataWA = CryptoJS.enc.Hex.parse(dataHex);
	var dataB64 = CryptoJS.enc.Base64.stringify(dataWA);
	var pemBody = dataB64.replace(/(.{64})/g, "$1\r\n");
        pemBody = pemBody.replace(/\r\n$/, '');
	return "-----BEGIN " + pemHeader + "-----\r\n" + 
               pemBody + 
               "\r\n-----END " + pemHeader + "-----\r\n";
    };
};

// ********************************************************************
//  Abstract ASN.1 Classes
// ********************************************************************

// ********************************************************************

/**
 * base class for ASN.1 DER encoder object
 * @name KJUR.asn1.ASN1Object
 * @class base class for ASN.1 DER encoder object
 * @property {Boolean} isModified flag whether internal data was changed
 * @property {String} hTLV hexadecimal string of ASN.1 TLV
 * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
 * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
 * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
 * @description
 */
KJUR.asn1.ASN1Object = function() {
    var isModified = true;
    var hTLV = null;
    var hT = '00'
    var hL = '00';
    var hV = '';

    /**
     * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
     * @name getLengthHexFromValue
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV length(L)
     */
    this.getLengthHexFromValue = function() {
	if (typeof this.hV == "undefined" || this.hV == null) {
	    throw "this.hV is null or undefined.";
	}
	if (this.hV.length % 2 == 1) {
	    throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
	}
	var n = this.hV.length / 2;
	var hN = n.toString(16);
	if (hN.length % 2 == 1) {
	    hN = "0" + hN;
	}
	if (n < 128) {
	    return hN;
	} else {
	    var hNlen = hN.length / 2;
	    if (hNlen > 15) {
		throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
	    }
	    var head = 128 + hNlen;
	    return head.toString(16) + hN;
	}
    };

    /**
     * get hexadecimal string of ASN.1 TLV bytes
     * @name getEncodedHex
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV
     */
    this.getEncodedHex = function() {
	if (this.hTLV == null || this.isModified) {
	    this.hV = this.getFreshValueHex();
	    this.hL = this.getLengthHexFromValue();
	    this.hTLV = this.hT + this.hL + this.hV;
	    this.isModified = false;
	    //console.error("first time: " + this.hTLV);
	}
	return this.hTLV;
    };

    /**
     * get hexadecimal string of ASN.1 TLV value(V) bytes
     * @name getValueHex
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
     */
    this.getValueHex = function() {
	this.getEncodedHex();
	return this.hV;
    }

    this.getFreshValueHex = function() {
	return '';
    };
};

// == BEGIN DERAbstractString ================================================
/**
 * base class for ASN.1 DER string classes
 * @name KJUR.asn1.DERAbstractString
 * @class base class for ASN.1 DER string classes
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @property {String} s internal string of value
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERAbstractString = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var s = null;
    var hV = null;

    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @return {String} string value of this string object
     */
    this.getString = function() {
	return this.s;
    };

    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @param {String} newS value by a string to set
     */
    this.setString = function(newS) {
	this.hTLV = null;
	this.isModified = true;
	this.s = newS;
	this.hV = stohex(this.s);
    };

    /**
     * set value by a hexadecimal string
     * @name setStringHex
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @param {String} newHexString value by a hexadecimal string to set
     */
    this.setStringHex = function(newHexString) {
	this.hTLV = null;
	this.isModified = true;
	this.s = null;
	this.hV = newHexString;
    };

    this.getFreshValueHex = function() {
	return this.hV;
    };

    if (typeof params != "undefined") {
	if (typeof params['str'] != "undefined") {
	    this.setString(params['str']);
	} else if (typeof params['hex'] != "undefined") {
	    this.setStringHex(params['hex']);
	}
    }
};
JSX.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
// == END   DERAbstractString ================================================

// == BEGIN DERAbstractTime ==================================================
/**
 * base class for ASN.1 DER Generalized/UTCTime class
 * @name KJUR.asn1.DERAbstractTime
 * @class base class for ASN.1 DER Generalized/UTCTime class
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractTime = function(params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    var s = null;
    var date = null;

    // --- PRIVATE METHODS --------------------
    this.localDateToUTC = function(d) {
	utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var utcDate = new Date(utc);
	return utcDate;
    };

    this.formatDate = function(dateObject, type) {
	var pad = this.zeroPadding;
	var d = this.localDateToUTC(dateObject);
	var year = String(d.getFullYear());
	if (type == 'utc') year = year.substr(2, 2);
	var month = pad(String(d.getMonth() + 1), 2);
	var day = pad(String(d.getDate()), 2);
	var hour = pad(String(d.getHours()), 2);
	var min = pad(String(d.getMinutes()), 2);
	var sec = pad(String(d.getSeconds()), 2);
	return year + month + day + hour + min + sec + 'Z';
    };

    this.zeroPadding = function(s, len) {
	if (s.length >= len) return s;
	return new Array(len - s.length + 1).join('0') + s;
    };

    // --- PUBLIC METHODS --------------------
    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @return {String} string value of this time object
     */
    this.getString = function() {
	return this.s;
    };

    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @param {String} newS value by a string to set such like "130430235959Z"
     */
    this.setString = function(newS) {
	this.hTLV = null;
	this.isModified = true;
	this.s = newS;
	this.hV = stohex(this.s);
    };

    /**
     * set value by a Date object
     * @name setByDateValue
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @param {Integer} year year of date (ex. 2013)
     * @param {Integer} month month of date between 1 and 12 (ex. 12)
     * @param {Integer} day day of month
     * @param {Integer} hour hours of date
     * @param {Integer} min minutes of date
     * @param {Integer} sec seconds of date
     */
    this.setByDateValue = function(year, month, day, hour, min, sec) {
	var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
	this.setByDate(dateObject);
    };

    this.getFreshValueHex = function() {
	return this.hV;
    };
};
JSX.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
// == END   DERAbstractTime ==================================================

// == BEGIN DERAbstractStructured ============================================
/**
 * base class for ASN.1 DER structured class
 * @name KJUR.asn1.DERAbstractStructured
 * @class base class for ASN.1 DER structured class
 * @property {Array} asn1Array internal array of ASN1Object
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERAbstractStructured = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var asn1Array = null;

    /**
     * set value by array of ASN1Object
     * @name setByASN1ObjectArray
     * @memberOf KJUR.asn1.DERAbstractStructured
     * @function
     * @param {array} asn1ObjectArray array of ASN1Object to set
     */
    this.setByASN1ObjectArray = function(asn1ObjectArray) {
	this.hTLV = null;
	this.isModified = true;
	this.asn1Array = asn1ObjectArray;
    };

    /**
     * append an ASN1Object to internal array
     * @name appendASN1Object
     * @memberOf KJUR.asn1.DERAbstractStructured
     * @function
     * @param {ASN1Object} asn1Object to add
     */
    this.appendASN1Object = function(asn1Object) {
	this.hTLV = null;
	this.isModified = true;
	this.asn1Array.push(asn1Object);
    };

    this.asn1Array = new Array();
    if (typeof params != "undefined") {
	if (typeof params['array'] != "undefined") {
	    this.asn1Array = params['array'];
	}
    }
};
JSX.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);


// ********************************************************************
//  ASN.1 Object Classes
// ********************************************************************

// ********************************************************************
/**
 * class for ASN.1 DER Boolean
 * @name KJUR.asn1.DERBoolean
 * @class class for ASN.1 DER Boolean
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
};
JSX.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER Integer
 * @name KJUR.asn1.DERInteger
 * @class class for ASN.1 DER Integer
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>int - specify initial ASN.1 value(V) by integer value</li>
 * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERInteger = function(params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";

    /**
     * set value by Tom Wu's BigInteger object
     * @name setByBigInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {BigInteger} bigIntegerValue to set
     */
    this.setByBigInteger = function(bigIntegerValue) {
	this.hTLV = null;
	this.isModified = true;
	this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };

    /**
     * set value by integer value
     * @name setByInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {Integer} integer value to set
     */
    this.setByInteger = function(intValue) {
	var bi = new BigInteger(String(intValue), 10);
	this.setByBigInteger(bi);
    };

    /**
     * set value by integer value
     * @name setValueHex
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {String} hexadecimal string of integer value
     * @description
     * <br/>
     * NOTE: Value shall be represented by minimum octet length of
     * two's complement representation.
     */
    this.setValueHex = function(newHexString) {
	this.hV = newHexString;
    };

    this.getFreshValueHex = function() {
	return this.hV;
    };

    if (typeof params != "undefined") {
	if (typeof params['bigint'] != "undefined") {
	    this.setByBigInteger(params['bigint']);
	} else if (typeof params['int'] != "undefined") {
	    this.setByInteger(params['int']);
	} else if (typeof params['hex'] != "undefined") {
	    this.setValueHex(params['hex']);
	}
    }
};
JSX.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER encoded BitString primitive
 * @name KJUR.asn1.DERBitString
 * @class class for ASN.1 DER encoded BitString primitive
 * @extends KJUR.asn1.ASN1Object
 * @description 
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>bin - specify binary string (ex. '10111')</li>
 * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
 * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERBitString = function(params) {
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";

    /**
     * set ASN.1 value(V) by a hexadecimal string including unused bits
     * @name setHexValueIncludingUnusedBits
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {String} newHexStringIncludingUnusedBits
     */
    this.setHexValueIncludingUnusedBits = function(newHexStringIncludingUnusedBits) {
	this.hTLV = null;
	this.isModified = true;
	this.hV = newHexStringIncludingUnusedBits;
    };

    /**
     * set ASN.1 value(V) by unused bit and hexadecimal string of value
     * @name setUnusedBitsAndHexValue
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} unusedBits
     * @param {String} hValue
     */
    this.setUnusedBitsAndHexValue = function(unusedBits, hValue) {
	if (unusedBits < 0 || 7 < unusedBits) {
	    throw "unused bits shall be from 0 to 7: u = " + unusedBits;
	}
	var hUnusedBits = "0" + unusedBits;
	this.hTLV = null;
	this.isModified = true;
	this.hV = hUnusedBits + hValue;
    };

    /**
     * set ASN.1 DER BitString by binary string
     * @name setByBinaryString
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {String} binaryString binary value string (i.e. '10111')
     * @description
     * Its unused bits will be calculated automatically by length of 
     * 'binaryValue'. <br/>
     * NOTE: Trailing zeros '0' will be ignored.
     */
    this.setByBinaryString = function(binaryString) {
	binaryString = binaryString.replace(/0+$/, '');
	var unusedBits = 8 - binaryString.length % 8;
	if (unusedBits == 8) unusedBits = 0;
	for (var i = 0; i <= unusedBits; i++) {
	    binaryString += '0';
	}
	var h = '';
	for (var i = 0; i < binaryString.length - 1; i += 8) {
	    var b = binaryString.substr(i, 8);
	    var x = parseInt(b, 2).toString(16);
	    if (x.length == 1) x = '0' + x;
	    h += x;  
	}
	this.hTLV = null;
	this.isModified = true;
	this.hV = '0' + unusedBits + h;
    };

    /**
     * set ASN.1 TLV value(V) by an array of boolean
     * @name setByBooleanArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {array} booleanArray array of boolean (ex. [true, false, true])
     * @description
     * NOTE: Trailing falses will be ignored.
     */
    this.setByBooleanArray = function(booleanArray) {
	var s = '';
	for (var i = 0; i < booleanArray.length; i++) {
	    if (booleanArray[i] == true) {
		s += '1';
	    } else {
		s += '0';
	    }
	}
	this.setByBinaryString(s);
    };

    /**
     * generate an array of false with specified length
     * @name newFalseArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} nLength length of array to generate
     * @return {array} array of boolean faluse
     * @description
     * This static method may be useful to initialize boolean array.
     */
    this.newFalseArray = function(nLength) {
	var a = new Array(nLength);
	for (var i = 0; i < nLength; i++) {
	    a[i] = false;
	}
	return a;
    };

    this.getFreshValueHex = function() {
	return this.hV;
    };

    if (typeof params != "undefined") {
	if (typeof params['hex'] != "undefined") {
	    this.setHexValueIncludingUnusedBits(params['hex']);
	} else if (typeof params['bin'] != "undefined") {
	    this.setByBinaryString(params['bin']);
	} else if (typeof params['array'] != "undefined") {
	    this.setByBooleanArray(params['array']);
	}
    }
};
JSX.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER OctetString
 * @name KJUR.asn1.DEROctetString
 * @class class for ASN.1 DER OctetString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DEROctetString = function(params) {
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
};
JSX.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER Null
 * @name KJUR.asn1.DERNull
 * @class class for ASN.1 DER Null
 * @extends KJUR.asn1.ASN1Object
 * @description
 * @see KJUR.asn1.ASN1Object - superclass
 */
KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
};
JSX.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER ObjectIdentifier
 * @name KJUR.asn1.DERObjectIdentifier
 * @class class for ASN.1 DER ObjectIdentifier
 * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERObjectIdentifier = function(params) {
    var itox = function(i) {
	var h = i.toString(16);
	if (h.length == 1) h = '0' + h;
	return h;
    };
    var roidtox = function(roid) {
	var h = '';
	var bi = new BigInteger(roid, 10);
	var b = bi.toString(2);
	var padLen = 7 - b.length % 7;
	if (padLen == 7) padLen = 0;
	var bPad = '';
	for (var i = 0; i < padLen; i++) bPad += '0';
	b = bPad + b;
	for (var i = 0; i < b.length - 1; i += 7) {
	    var b8 = b.substr(i, 7);
	    if (i != b.length - 7) b8 = '1' + b8;
	    h += itox(parseInt(b8, 2));
	}
	return h;
    }

    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";

    /**
     * set value by a hexadecimal string
     * @name setValueHex
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} newHexString hexadecimal value of OID bytes
     */
    this.setValueHex = function(newHexString) {
	this.hTLV = null;
	this.isModified = true;
	this.s = null;
	this.hV = newHexString;
    };

    /**
     * set value by a OID string
     * @name setValueOidString
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} oidString OID string (ex. 2.5.4.13)
     */
    this.setValueOidString = function(oidString) {
	if (! oidString.match(/^[0-9.]+$/)) {
	    throw "malformed oid string: " + oidString;
	}
	var h = '';
	var a = oidString.split('.');
	var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
	h += itox(i0);
	a.splice(0, 2);
	for (var i = 0; i < a.length; i++) {
	    h += roidtox(a[i]);
	}
	this.hTLV = null;
	this.isModified = true;
	this.s = null;
	this.hV = h;
    };

    /**
     * set value by a OID name
     * @name setValueName
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} oidName OID name (ex. 'serverAuth')
     * @since 1.0.1
     * @description
     * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
     * Otherwise raise error.
     */
    this.setValueName = function(oidName) {
	if (typeof KJUR.asn1.x509.OID.name2oidList[oidName] != "undefined") {
	    var oid = KJUR.asn1.x509.OID.name2oidList[oidName];
	    this.setValueOidString(oid);
	} else {
	    throw "DERObjectIdentifier oidName undefined: " + oidName;
	}
    };

    this.getFreshValueHex = function() {
	return this.hV;
    };

    if (typeof params != "undefined") {
	if (typeof params['oid'] != "undefined") {
	    this.setValueOidString(params['oid']);
	} else if (typeof params['hex'] != "undefined") {
	    this.setValueHex(params['hex']);
	} else if (typeof params['name'] != "undefined") {
	    this.setValueName(params['name']);
	}
    }
};
JSX.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);

// ********************************************************************
/**
 * class for ASN.1 DER UTF8String
 * @name KJUR.asn1.DERUTF8String
 * @class class for ASN.1 DER UTF8String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERUTF8String = function(params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
};
JSX.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER NumericString
 * @name KJUR.asn1.DERNumericString
 * @class class for ASN.1 DER NumericString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERNumericString = function(params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
};
JSX.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER PrintableString
 * @name KJUR.asn1.DERPrintableString
 * @class class for ASN.1 DER PrintableString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERPrintableString = function(params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
};
JSX.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER TeletexString
 * @name KJUR.asn1.DERTeletexString
 * @class class for ASN.1 DER TeletexString
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERTeletexString = function(params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
};
JSX.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER IA5String
 * @name KJUR.asn1.DERIA5String
 * @class class for ASN.1 DER IA5String
 * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
 * @extends KJUR.asn1.DERAbstractString
 * @description
 * @see KJUR.asn1.DERAbstractString - superclass
 */
KJUR.asn1.DERIA5String = function(params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
};
JSX.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);

// ********************************************************************
/**
 * class for ASN.1 DER UTCTime
 * @name KJUR.asn1.DERUTCTime
 * @class class for ASN.1 DER UTCTime
 * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 * <h4>EXAMPLES</h4>
 * @example
 * var d1 = new KJUR.asn1.DERUTCTime();
 * d1.setString('130430125959Z');
 *
 * var d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
 *
 * var d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
 */
KJUR.asn1.DERUTCTime = function(params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";

    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERUTCTime
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     */
    this.setByDate = function(dateObject) {
	this.hTLV = null;
	this.isModified = true;
	this.date = dateObject;
	this.s = this.formatDate(this.date, 'utc');
	this.hV = stohex(this.s);
    };

    if (typeof params != "undefined") {
	if (typeof params['str'] != "undefined") {
	    this.setString(params['str']);
	} else if (typeof params['hex'] != "undefined") {
	    this.setStringHex(params['hex']);
	} else if (typeof params['date'] != "undefined") {
	    this.setByDate(params['date']);
	}
    }
};
JSX.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);

// ********************************************************************
/**
 * class for ASN.1 DER GeneralizedTime
 * @name KJUR.asn1.DERGeneralizedTime
 * @class class for ASN.1 DER GeneralizedTime
 * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
 * @extends KJUR.asn1.DERAbstractTime
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
 * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
 * <li>date - specify Date object.</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERGeneralizedTime = function(params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";

    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERGeneralizedTime
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     * @example
     * When you specify UTC time, use 'Date.UTC' method like this:<br/>
     * var o = new DERUTCTime();
     * var date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
     * o.setByDate(date);
     */
    this.setByDate = function(dateObject) {
	this.hTLV = null;
	this.isModified = true;
	this.date = dateObject;
	this.s = this.formatDate(this.date, 'gen');
	this.hV = stohex(this.s);
    };

    if (typeof params != "undefined") {
	if (typeof params['str'] != "undefined") {
	    this.setString(params['str']);
	} else if (typeof params['hex'] != "undefined") {
	    this.setStringHex(params['hex']);
	} else if (typeof params['date'] != "undefined") {
	    this.setByDate(params['date']);
	}
    }
};
JSX.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);

// ********************************************************************
/**
 * class for ASN.1 DER Sequence
 * @name KJUR.asn1.DERSequence
 * @class class for ASN.1 DER Sequence
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERSequence = function(params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";
    this.getFreshValueHex = function() {
	var h = '';
	for (var i = 0; i < this.asn1Array.length; i++) {
	    var asn1Obj = this.asn1Array[i];
	    h += asn1Obj.getEncodedHex();
	}
	this.hV = h;
	return this.hV;
    };
};
JSX.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

// ********************************************************************
/**
 * class for ASN.1 DER Set
 * @name KJUR.asn1.DERSet
 * @class class for ASN.1 DER Set
 * @extends KJUR.asn1.DERAbstractStructured
 * @description
 * <br/>
 * As for argument 'params' for constructor, you can specify one of
 * following properties:
 * <ul>
 * <li>array - specify array of ASN1Object to set elements of content</li>
 * </ul>
 * NOTE: 'params' can be omitted.
 */
KJUR.asn1.DERSet = function(params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.getFreshValueHex = function() {
	var a = new Array();
	for (var i = 0; i < this.asn1Array.length; i++) {
	    var asn1Obj = this.asn1Array[i];
	    a.push(asn1Obj.getEncodedHex());
	}
	a.sort();
	this.hV = a.join('');
	return this.hV;
    };
};
JSX.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);

// ********************************************************************
/**
 * class for ASN.1 DER TaggedObject
 * @name KJUR.asn1.DERTaggedObject
 * @class class for ASN.1 DER TaggedObject
 * @extends KJUR.asn1.ASN1Object
 * @description
 * <br/>
 * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
 * For example, if you find '[1]' tag in a ASN.1 dump, 
 * 'tagNoHex' will be 'a1'.
 * <br/>
 * As for optional argument 'params' for constructor, you can specify *ANY* of
 * following properties:
 * <ul>
 * <li>explicit - specify true if this is explicit tag otherwise false 
 *     (default is 'true').</li>
 * <li>tag - specify tag (default is 'a0' which means [0])</li>
 * <li>obj - specify ASN1Object which is tagged</li>
 * </ul>
 * @example
 * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
 * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
 * hex = d2.getEncodedHex();
 */
KJUR.asn1.DERTaggedObject = function(params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = '';
    this.isExplicit = true;
    this.asn1Object = null;

    /**
     * set value by an ASN1Object
     * @name setString
     * @memberOf KJUR.asn1.DERTaggedObject
     * @function
     * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
     * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
     * @param {ASN1Object} asn1Object ASN.1 to encapsulate
     */
    this.setASN1Object = function(isExplicitFlag, tagNoHex, asn1Object) {
	this.hT = tagNoHex;
	this.isExplicit = isExplicitFlag;
	this.asn1Object = asn1Object;
	if (this.isExplicit) {
	    this.hV = this.asn1Object.getEncodedHex();
	    this.hTLV = null;
	    this.isModified = true;
	} else {
	    this.hV = null;
	    this.hTLV = asn1Object.getEncodedHex();
	    this.hTLV = this.hTLV.replace(/^../, tagNoHex);
	    this.isModified = false;
	}
    };

    this.getFreshValueHex = function() {
	return this.hV;
    };

    if (typeof params != "undefined") {
	if (typeof params['tag'] != "undefined") {
	    this.hT = params['tag'];
	}
	if (typeof params['explicit'] != "undefined") {
	    this.isExplicit = params['explicit'];
	}
	if (typeof params['obj'] != "undefined") {
	    this.asn1Object = params['obj'];
	    this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
	}
    }
};
JSX.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
// Hex JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
(function (undefined) {
"use strict";

var Hex = {},
    decoder;

Hex.decode = function(a) {
    var i;
    if (decoder === undefined) {
        var hex = "0123456789ABCDEF",
            ignore = " \f\n\r\t\u00A0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 16; ++i)
            decoder[hex.charAt(i)] = i;
        hex = hex.toLowerCase();
        for (i = 10; i < 16; ++i)
            decoder[hex.charAt(i)] = i;
        for (i = 0; i < ignore.length; ++i)
            decoder[ignore.charAt(i)] = -1;
    }
    var out = [],
        bits = 0,
        char_count = 0;
    for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=')
            break;
        c = decoder[c];
        if (c == -1)
            continue;
        if (c === undefined)
            throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 2) {
            out[out.length] = bits;
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 4;
        }
    }
    if (char_count)
        throw "Hex encoding incomplete: 4 bits missing";
    return out;
};

// export globals
window.Hex = Hex;
})();
// Base64 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
(function (undefined) {
"use strict";

var Base64 = {},
    decoder;

Base64.decode = function (a) {
    var i;
    if (decoder === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            ignore = "= \f\n\r\t\u00A0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 64; ++i)
            decoder[b64.charAt(i)] = i;
        for (i = 0; i < ignore.length; ++i)
            decoder[ignore.charAt(i)] = -1;
    }
    var out = [];
    var bits = 0, char_count = 0;
    for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=')
            break;
        c = decoder[c];
        if (c == -1)
            continue;
        if (c === undefined)
            throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 4) {
            out[out.length] = (bits >> 16);
            out[out.length] = (bits >> 8) & 0xFF;
            out[out.length] = bits & 0xFF;
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 6;
        }
    }
    switch (char_count) {
      case 1:
        throw "Base64 encoding incomplete: at least 2 bits missing";
      case 2:
        out[out.length] = (bits >> 10);
        break;
      case 3:
        out[out.length] = (bits >> 16);
        out[out.length] = (bits >> 8) & 0xFF;
        break;
    }
    return out;
};

Base64.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
Base64.unarmor = function (a) {
    var m = Base64.re.exec(a);
    if (m) {
        if (m[1])
            a = m[1];
        else if (m[2])
            a = m[2];
        else
            throw "RegExp out of sync";
    }
    return Base64.decode(a);
};

// export globals
window.Base64 = Base64;
})();
// ASN.1 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
/*global oids */
(function (undefined) {
"use strict";

var hardLimit = 100,
    ellipsis = "\u2026",
    DOM = {
        tag: function (tagName, className) {
            var t = document.createElement(tagName);
            t.className = className;
            return t;
        },
        text: function (str) {
            return document.createTextNode(str);
        }
    };

function Stream(enc, pos) {
    if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
    } else {
        this.enc = enc;
        this.pos = pos;
    }
}
Stream.prototype.get = function (pos) {
    if (pos === undefined)
        pos = this.pos++;
    if (pos >= this.enc.length)
        throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
    return this.enc[pos];
};
Stream.prototype.hexDigits = "0123456789ABCDEF";
Stream.prototype.hexByte = function (b) {
    return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
};
Stream.prototype.hexDump = function (start, end, raw) {
    var s = "";
    for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        if (raw !== true)
            switch (i & 0xF) {
            case 0x7: s += "  "; break;
            case 0xF: s += "\n"; break;
            default:  s += " ";
            }
    }
    return s;
};
Stream.prototype.parseStringISO = function (start, end) {
    var s = "";
    for (var i = start; i < end; ++i)
        s += String.fromCharCode(this.get(i));
    return s;
};
Stream.prototype.parseStringUTF = function (start, end) {
    var s = "";
    for (var i = start; i < end; ) {
        var c = this.get(i++);
        if (c < 128)
            s += String.fromCharCode(c);
        else if ((c > 191) && (c < 224))
            s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));
        else
            s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));
    }
    return s;
};
Stream.prototype.parseStringBMP = function (start, end) {
    var str = ""
    for (var i = start; i < end; i += 2) {
        var high_byte = this.get(i);
        var low_byte = this.get(i + 1);
        str += String.fromCharCode( (high_byte << 8) + low_byte );
    }

    return str;
};
Stream.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
Stream.prototype.parseTime = function (start, end) {
    var s = this.parseStringISO(start, end),
        m = this.reTime.exec(s);
    if (!m)
        return "Unrecognized time: " + s;
    s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
    if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
            s += ":" + m[6];
            if (m[7])
                s += "." + m[7];
        }
    }
    if (m[8]) {
        s += " UTC";
        if (m[8] != 'Z') {
            s += m[8];
            if (m[9])
                s += ":" + m[9];
        }
    }
    return s;
};
Stream.prototype.parseInteger = function (start, end) {
    //TODO support negative numbers
    var len = end - start;
    if (len > 4) {
        len <<= 3;
        var s = this.get(start);
        if (s === 0)
            len -= 8;
        else
            while (s < 128) {
                s <<= 1;
                --len;
            }
        return "(" + len + " bit)";
    }
    var n = 0;
    for (var i = start; i < end; ++i)
        n = (n << 8) | this.get(i);
    return n;
};
Stream.prototype.parseBitString = function (start, end) {
    var unusedBit = this.get(start),
        lenBit = ((end - start - 1) << 3) - unusedBit,
        s = "(" + lenBit + " bit)";
    if (lenBit <= 20) {
        var skip = unusedBit;
        s += " ";
        for (var i = end - 1; i > start; --i) {
            var b = this.get(i);
            for (var j = skip; j < 8; ++j)
                s += (b >> j) & 1 ? "1" : "0";
            skip = 0;
        }
    }
    return s;
};
Stream.prototype.parseOctetString = function (start, end) {
    var len = end - start,
        s = "(" + len + " byte) ";
    if (len > hardLimit)
        end = start + hardLimit;
    for (var i = start; i < end; ++i)
        s += this.hexByte(this.get(i)); //TODO: also try Latin1?
    if (len > hardLimit)
        s += ellipsis;
    return s;
};
Stream.prototype.parseOID = function (start, end) {
    var s = '',
        n = 0,
        bits = 0;
    for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n = (n << 7) | (v & 0x7F);
        bits += 7;
        if (!(v & 0x80)) { // finished
            if (s === '') {
                var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                s = m + "." + (n - m * 40);
            } else
                s += "." + ((bits >= 31) ? "bigint" : n);
            n = bits = 0;
        }
    }
    return s;
};

function ASN1(stream, header, length, tag, sub) {
    this.stream = stream;
    this.header = header;
    this.length = length;
    this.tag = tag;
    this.sub = sub;
}
ASN1.prototype.typeName = function () {
    if (this.tag === undefined)
        return "unknown";
    var tagClass = this.tag >> 6,
        tagConstructed = (this.tag >> 5) & 1,
        tagNumber = this.tag & 0x1F;
    switch (tagClass) {
    case 0: // universal
        switch (tagNumber) {
        case 0x00: return "EOC";
        case 0x01: return "BOOLEAN";
        case 0x02: return "INTEGER";
        case 0x03: return "BIT_STRING";
        case 0x04: return "OCTET_STRING";
        case 0x05: return "NULL";
        case 0x06: return "OBJECT_IDENTIFIER";
        case 0x07: return "ObjectDescriptor";
        case 0x08: return "EXTERNAL";
        case 0x09: return "REAL";
        case 0x0A: return "ENUMERATED";
        case 0x0B: return "EMBEDDED_PDV";
        case 0x0C: return "UTF8String";
        case 0x10: return "SEQUENCE";
        case 0x11: return "SET";
        case 0x12: return "NumericString";
        case 0x13: return "PrintableString"; // ASCII subset
        case 0x14: return "TeletexString"; // aka T61String
        case 0x15: return "VideotexString";
        case 0x16: return "IA5String"; // ASCII
        case 0x17: return "UTCTime";
        case 0x18: return "GeneralizedTime";
        case 0x19: return "GraphicString";
        case 0x1A: return "VisibleString"; // ASCII subset
        case 0x1B: return "GeneralString";
        case 0x1C: return "UniversalString";
        case 0x1E: return "BMPString";
        default:   return "Universal_" + tagNumber.toString(16);
        }
    case 1: return "Application_" + tagNumber.toString(16);
    case 2: return "[" + tagNumber + "]"; // Context
    case 3: return "Private_" + tagNumber.toString(16);
    }
};
ASN1.prototype.reSeemsASCII = /^[ -~]+$/;
ASN1.prototype.content = function () {
    if (this.tag === undefined)
        return null;
    var tagClass = this.tag >> 6,
        tagNumber = this.tag & 0x1F,
        content = this.posContent(),
        len = Math.abs(this.length);
    if (tagClass !== 0) { // universal
        if (this.sub !== null)
            return "(" + this.sub.length + " elem)";
        //TODO: TRY TO PARSE ASCII STRING
        var s = this.stream.parseStringISO(content, content + Math.min(len, hardLimit));
        if (this.reSeemsASCII.test(s))
            return s.substring(0, 2 * hardLimit) + ((s.length > 2 * hardLimit) ? ellipsis : "");
        else
            return this.stream.parseOctetString(content, content + len);
    }
    switch (tagNumber) {
    case 0x01: // BOOLEAN
        return (this.stream.get(content) === 0) ? "false" : "true";
    case 0x02: // INTEGER
        return this.stream.parseInteger(content, content + len);
    case 0x03: // BIT_STRING
        return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseBitString(content, content + len);
    case 0x04: // OCTET_STRING
        return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseOctetString(content, content + len);
    //case 0x05: // NULL
    case 0x06: // OBJECT_IDENTIFIER
        return this.stream.parseOID(content, content + len);
    //case 0x07: // ObjectDescriptor
    //case 0x08: // EXTERNAL
    //case 0x09: // REAL
    //case 0x0A: // ENUMERATED
    //case 0x0B: // EMBEDDED_PDV
    case 0x10: // SEQUENCE
    case 0x11: // SET
        return "(" + this.sub.length + " elem)";
    case 0x0C: // UTF8String
        return this.stream.parseStringUTF(content, content + len);
    case 0x12: // NumericString
    case 0x13: // PrintableString
    case 0x14: // TeletexString
    case 0x15: // VideotexString
    case 0x16: // IA5String
    //case 0x19: // GraphicString
    case 0x1A: // VisibleString
    //case 0x1B: // GeneralString
    //case 0x1C: // UniversalString
        return this.stream.parseStringISO(content, content + len);
    case 0x1E: // BMPString
        return this.stream.parseStringBMP(content, content + len);
    case 0x17: // UTCTime
    case 0x18: // GeneralizedTime
        return this.stream.parseTime(content, content + len);
    }
    return null;
};
ASN1.prototype.toString = function () {
    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
};
ASN1.prototype.print = function (indent) {
    if (indent === undefined) indent = '';
    document.writeln(indent + this);
    if (this.sub !== null) {
        indent += '  ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
            this.sub[i].print(indent);
    }
};
ASN1.prototype.toPrettyString = function (indent) {
    if (indent === undefined) indent = '';
    var s = indent + this.typeName() + " @" + this.stream.pos;
    if (this.length >= 0)
        s += "+";
    s += this.length;
    if (this.tag & 0x20)
        s += " (constructed)";
    else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null))
        s += " (encapsulates)";
    s += "\n";
    if (this.sub !== null) {
        indent += '  ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
            s += this.sub[i].toPrettyString(indent);
    }
    return s;
};
ASN1.prototype.toDOM = function () {
    var node = DOM.tag("div", "node");
    node.asn1 = this;
    var head = DOM.tag("div", "head");
    var s = this.typeName().replace(/_/g, " ");
    head.innerHTML = s;
    var content = this.content();
    if (content !== null) {
        content = String(content).replace(/</g, "&lt;");
        var preview = DOM.tag("span", "preview");
        preview.appendChild(DOM.text(content));
        head.appendChild(preview);
    }
    node.appendChild(head);
    this.node = node;
    this.head = head;
    var value = DOM.tag("div", "value");
    s = "Offset: " + this.stream.pos + "<br/>";
    s += "Length: " + this.header + "+";
    if (this.length >= 0)
        s += this.length;
    else
        s += (-this.length) + " (undefined)";
    if (this.tag & 0x20)
        s += "<br/>(constructed)";
    else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null))
        s += "<br/>(encapsulates)";
    //TODO if (this.tag == 0x03) s += "Unused bits: "
    if (content !== null) {
        s += "<br/>Value:<br/><b>" + content + "</b>";
        if ((typeof oids === 'object') && (this.tag == 0x06)) {
            var oid = oids[content];
            if (oid) {
                if (oid.d) s += "<br/>" + oid.d;
                if (oid.c) s += "<br/>" + oid.c;
                if (oid.w) s += "<br/>(warning!)";
            }
        }
    }
    value.innerHTML = s;
    node.appendChild(value);
    var sub = DOM.tag("div", "sub");
    if (this.sub !== null) {
        for (var i = 0, max = this.sub.length; i < max; ++i)
            sub.appendChild(this.sub[i].toDOM());
    }
    node.appendChild(sub);
    head.onclick = function () {
        node.className = (node.className == "node collapsed") ? "node" : "node collapsed";
    };
    return node;
};
ASN1.prototype.posStart = function () {
    return this.stream.pos;
};
ASN1.prototype.posContent = function () {
    return this.stream.pos + this.header;
};
ASN1.prototype.posEnd = function () {
    return this.stream.pos + this.header + Math.abs(this.length);
};
ASN1.prototype.fakeHover = function (current) {
    this.node.className += " hover";
    if (current)
        this.head.className += " hover";
};
ASN1.prototype.fakeOut = function (current) {
    var re = / ?hover/;
    this.node.className = this.node.className.replace(re, "");
    if (current)
        this.head.className = this.head.className.replace(re, "");
};
ASN1.prototype.toHexDOM_sub = function (node, className, stream, start, end) {
    if (start >= end)
        return;
    var sub = DOM.tag("span", className);
    sub.appendChild(DOM.text(
        stream.hexDump(start, end)));
    node.appendChild(sub);
};
ASN1.prototype.toHexDOM = function (root) {
    var node = DOM.tag("span", "hex");
    if (root === undefined) root = node;
    this.head.hexNode = node;
    this.head.onmouseover = function () { this.hexNode.className = "hexCurrent"; };
    this.head.onmouseout  = function () { this.hexNode.className = "hex"; };
    node.asn1 = this;
    node.onmouseover = function () {
        var current = !root.selected;
        if (current) {
            root.selected = this.asn1;
            this.className = "hexCurrent";
        }
        this.asn1.fakeHover(current);
    };
    node.onmouseout  = function () {
        var current = (root.selected == this.asn1);
        this.asn1.fakeOut(current);
        if (current) {
            root.selected = null;
            this.className = "hex";
        }
    };
    this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
    this.toHexDOM_sub(node, (this.length >= 0) ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
    if (this.sub === null)
        node.appendChild(DOM.text(
            this.stream.hexDump(this.posContent(), this.posEnd())));
    else if (this.sub.length > 0) {
        var first = this.sub[0];
        var last = this.sub[this.sub.length - 1];
        this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
        for (var i = 0, max = this.sub.length; i < max; ++i)
            node.appendChild(this.sub[i].toHexDOM(root));
        this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
    }
    return node;
};
ASN1.prototype.toHexString = function (root) {
    return this.stream.hexDump(this.posStart(), this.posEnd(), true);
};
ASN1.decodeLength = function (stream) {
    var buf = stream.get(),
        len = buf & 0x7F;
    if (len == buf)
        return len;
    if (len > 3)
        throw "Length over 24 bits not supported at position " + (stream.pos - 1);
    if (len === 0)
        return -1; // undefined
    buf = 0;
    for (var i = 0; i < len; ++i)
        buf = (buf << 8) | stream.get();
    return buf;
};
ASN1.hasContent = function (tag, len, stream) {
    if (tag & 0x20) // constructed
        return true;
    if ((tag < 0x03) || (tag > 0x04))
        return false;
    var p = new Stream(stream);
    if (tag == 0x03) p.get(); // BitString unused bits, must be in [0, 7]
    var subTag = p.get();
    if ((subTag >> 6) & 0x01) // not (universal or context)
        return false;
    try {
        var subLength = ASN1.decodeLength(p);
        return ((p.pos - stream.pos) + subLength == len);
    } catch (exception) {
        return false;
    }
};
ASN1.decode = function (stream) {
    if (!(stream instanceof Stream))
        stream = new Stream(stream, 0);
    var streamStart = new Stream(stream),
        tag = stream.get(),
        len = ASN1.decodeLength(stream),
        header = stream.pos - streamStart.pos,
        sub = null;
    if (ASN1.hasContent(tag, len, stream)) {
        // it has content, so we decode it
        var start = stream.pos;
        if (tag == 0x03) stream.get(); // skip BitString unused bits, must be in [0, 7]
        sub = [];
        if (len >= 0) {
            // definite length
            var end = start + len;
            while (stream.pos < end)
                sub[sub.length] = ASN1.decode(stream);
            if (stream.pos != end)
                throw "Content size is not correct for container starting at offset " + start;
        } else {
            // undefined length
            try {
                for (;;) {
                    var s = ASN1.decode(stream);
                    if (s.tag === 0)
                        break;
                    sub[sub.length] = s;
                }
                len = start - stream.pos;
            } catch (e) {
                throw "Exception while decoding undefined length content: " + e;
            }
        }
    } else
        stream.pos += len; // skip content
    return new ASN1(streamStart, header, len, tag, sub);
};
ASN1.test = function () {
    var test = [
        { value: [0x27],                   expected: 0x27     },
        { value: [0x81, 0xC9],             expected: 0xC9     },
        { value: [0x83, 0xFE, 0xDC, 0xBA], expected: 0xFEDCBA }
    ];
    for (var i = 0, max = test.length; i < max; ++i) {
        var pos = 0,
            stream = new Stream(test[i].value, 0),
            res = ASN1.decodeLength(stream);
        if (res != test[i].expected)
            document.write("In test[" + i + "] expected " + test[i].expected + " got " + res + "\n");
    }
};

// export globals
window.ASN1 = ASN1;
})();
/**
 * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
 * @returns {string}
 * @public
 */
ASN1.prototype.getHexStringValue = function () {
  var hexString = this.toHexString();
  var offset = this.header * 2;
  var length = this.length * 2;
  return hexString.substr(offset, length);
};

/**
 * Method to parse a pem encoded string containing both a public or private key.
 * The method will translate the pem encoded string in a der encoded string and
 * will parse private key and public key parameters. This method accepts public key
 * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
 *
 * @todo Check how many rsa formats use the same format of pkcs #1.
 *
 * The format is defined as:
 * PublicKeyInfo ::= SEQUENCE {
 *   algorithm       AlgorithmIdentifier,
 *   PublicKey       BIT STRING
 * }
 * Where AlgorithmIdentifier is:
 * AlgorithmIdentifier ::= SEQUENCE {
 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
 * }
 * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
 * RSAPublicKey ::= SEQUENCE {
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER   -- e
 * }
 * it's possible to examine the structure of the keys obtained from openssl using
 * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
 * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
 * @private
 */
RSAKey.prototype.parseKey = function (pem) {
  try {
    var modulus = 0;
    var public_exponent = 0;
    var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
    var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
    var asn1 = ASN1.decode(der);

    //Fixes a bug with OpenSSL 1.0+ private keys
    if(asn1.sub.length === 3){
        asn1 = asn1.sub[2].sub[0];
    }
    if (asn1.sub.length === 9) {

      // Parse the private key.
      modulus = asn1.sub[1].getHexStringValue(); //bigint
      this.n = parseBigInt(modulus, 16);

      public_exponent = asn1.sub[2].getHexStringValue(); //int
      this.e = parseInt(public_exponent, 16);

      var private_exponent = asn1.sub[3].getHexStringValue(); //bigint
      this.d = parseBigInt(private_exponent, 16);

      var prime1 = asn1.sub[4].getHexStringValue(); //bigint
      this.p = parseBigInt(prime1, 16);

      var prime2 = asn1.sub[5].getHexStringValue(); //bigint
      this.q = parseBigInt(prime2, 16);

      var exponent1 = asn1.sub[6].getHexStringValue(); //bigint
      this.dmp1 = parseBigInt(exponent1, 16);

      var exponent2 = asn1.sub[7].getHexStringValue(); //bigint
      this.dmq1 = parseBigInt(exponent2, 16);

      var coefficient = asn1.sub[8].getHexStringValue(); //bigint
      this.coeff = parseBigInt(coefficient, 16);

    }
    else if (asn1.sub.length === 2) {

      // Parse the public key.
      var bit_string = asn1.sub[1];
      var sequence = bit_string.sub[0];

      modulus = sequence.sub[0].getHexStringValue();
      this.n = parseBigInt(modulus, 16);
      public_exponent = sequence.sub[1].getHexStringValue();
      this.e = parseInt(public_exponent, 16);

    }
    else {
      return false;
    }
    return true;
  }
  catch (ex) {
    return false;
  }
};

/**
 * Translate rsa parameters in a hex encoded string representing the rsa key.
 *
 * The translation follow the ASN.1 notation :
 * RSAPrivateKey ::= SEQUENCE {
 *   version           Version,
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER,  -- e
 *   privateExponent   INTEGER,  -- d
 *   prime1            INTEGER,  -- p
 *   prime2            INTEGER,  -- q
 *   exponent1         INTEGER,  -- d mod (p1)
 *   exponent2         INTEGER,  -- d mod (q-1)
 *   coefficient       INTEGER,  -- (inverse of q) mod p
 * }
 * @returns {string}  DER Encoded String representing the rsa private key
 * @private
 */
RSAKey.prototype.getPrivateBaseKey = function () {
  var options = {
    'array': [
      new KJUR.asn1.DERInteger({'int': 0}),
      new KJUR.asn1.DERInteger({'bigint': this.n}),
      new KJUR.asn1.DERInteger({'int': this.e}),
      new KJUR.asn1.DERInteger({'bigint': this.d}),
      new KJUR.asn1.DERInteger({'bigint': this.p}),
      new KJUR.asn1.DERInteger({'bigint': this.q}),
      new KJUR.asn1.DERInteger({'bigint': this.dmp1}),
      new KJUR.asn1.DERInteger({'bigint': this.dmq1}),
      new KJUR.asn1.DERInteger({'bigint': this.coeff})
    ]
  };
  var seq = new KJUR.asn1.DERSequence(options);
  return seq.getEncodedHex();
};

/**
 * base64 (pem) encoded version of the DER encoded representation
 * @returns {string} pem encoded representation without header and footer
 * @public
 */
RSAKey.prototype.getPrivateBaseKeyB64 = function () {
  return hex2b64(this.getPrivateBaseKey());
};

/**
 * Translate rsa parameters in a hex encoded string representing the rsa public key.
 * The representation follow the ASN.1 notation :
 * PublicKeyInfo ::= SEQUENCE {
 *   algorithm       AlgorithmIdentifier,
 *   PublicKey       BIT STRING
 * }
 * Where AlgorithmIdentifier is:
 * AlgorithmIdentifier ::= SEQUENCE {
 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
 * }
 * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
 * RSAPublicKey ::= SEQUENCE {
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER   -- e
 * }
 * @returns {string} DER Encoded String representing the rsa public key
 * @private
 */
RSAKey.prototype.getPublicBaseKey = function () {
  var options = {
    'array': [
      new KJUR.asn1.DERObjectIdentifier({'oid': '1.2.840.113549.1.1.1'}), //RSA Encryption pkcs #1 oid
      new KJUR.asn1.DERNull()
    ]
  };
  var first_sequence = new KJUR.asn1.DERSequence(options);

  options = {
    'array': [
      new KJUR.asn1.DERInteger({'bigint': this.n}),
      new KJUR.asn1.DERInteger({'int': this.e})
    ]
  };
  var second_sequence = new KJUR.asn1.DERSequence(options);

  options = {
    'hex': '00' + second_sequence.getEncodedHex()
  };
  var bit_string = new KJUR.asn1.DERBitString(options);

  options = {
    'array': [
      first_sequence,
      bit_string
    ]
  };
  var seq = new KJUR.asn1.DERSequence(options);
  return seq.getEncodedHex();
};

/**
 * base64 (pem) encoded version of the DER encoded representation
 * @returns {string} pem encoded representation without header and footer
 * @public
 */
RSAKey.prototype.getPublicBaseKeyB64 = function () {
  return hex2b64(this.getPublicBaseKey());
};

/**
 * wrap the string in block of width chars. The default value for rsa keys is 64
 * characters.
 * @param {string} str the pem encoded string without header and footer
 * @param {Number} [width=64] - the length the string has to be wrapped at
 * @returns {string}
 * @private
 */
RSAKey.prototype.wordwrap = function (str, width) {
  width = width || 64;
  if (!str) {
    return str;
  }
  var regex = '(.{1,' + width + '})( +|$\n?)|(.{1,' + width + '})';
  return str.match(RegExp(regex, 'g')).join('\n');
};

/**
 * Retrieve the pem encoded private key
 * @returns {string} the pem encoded private key with header/footer
 * @public
 */
RSAKey.prototype.getPrivateKey = function () {
  var key = "-----BEGIN RSA PRIVATE KEY-----\n";
  key += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
  key += "-----END RSA PRIVATE KEY-----";
  return key;
};

/**
 * Retrieve the pem encoded public key
 * @returns {string} the pem encoded public key with header/footer
 * @public
 */
RSAKey.prototype.getPublicKey = function () {
  var key = "-----BEGIN PUBLIC KEY-----\n";
  key += this.wordwrap(this.getPublicBaseKeyB64()) + "\n";
  key += "-----END PUBLIC KEY-----";
  return key;
};

/**
 * Check if the object contains the necessary parameters to populate the rsa modulus
 * and public exponent parameters.
 * @param {Object} [obj={}] - An object that may contain the two public key
 * parameters
 * @returns {boolean} true if the object contains both the modulus and the public exponent
 * properties (n and e)
 * @todo check for types of n and e. N should be a parseable bigInt object, E should
 * be a parseable integer number
 * @private
 */
RSAKey.prototype.hasPublicKeyProperty = function (obj) {
  obj = obj || {};
  return (
    obj.hasOwnProperty('n') &&
    obj.hasOwnProperty('e')
  );
};

/**
 * Check if the object contains ALL the parameters of an RSA key.
 * @param {Object} [obj={}] - An object that may contain nine rsa key
 * parameters
 * @returns {boolean} true if the object contains all the parameters needed
 * @todo check for types of the parameters all the parameters but the public exponent
 * should be parseable bigint objects, the public exponent should be a parseable integer number
 * @private
 */
RSAKey.prototype.hasPrivateKeyProperty = function (obj) {
  obj = obj || {};
  return (
    obj.hasOwnProperty('n') &&
    obj.hasOwnProperty('e') &&
    obj.hasOwnProperty('d') &&
    obj.hasOwnProperty('p') &&
    obj.hasOwnProperty('q') &&
    obj.hasOwnProperty('dmp1') &&
    obj.hasOwnProperty('dmq1') &&
    obj.hasOwnProperty('coeff')
  );
};

/**
 * Parse the properties of obj in the current rsa object. Obj should AT LEAST
 * include the modulus and public exponent (n, e) parameters.
 * @param {Object} obj - the object containing rsa parameters
 * @private
 */
RSAKey.prototype.parsePropertiesFrom = function (obj) {
  this.n = obj.n;
  this.e = obj.e;

  if (obj.hasOwnProperty('d')) {
    this.d = obj.d;
    this.p = obj.p;
    this.q = obj.q;
    this.dmp1 = obj.dmp1;
    this.dmq1 = obj.dmq1;
    this.coeff = obj.coeff;
  }
};

/**
 * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
 * This object is just a decorator for parsing the key parameter
 * @param {string|Object} key - The key in string format, or an object containing
 * the parameters needed to build a RSAKey object.
 * @constructor
 */
var JSEncryptRSAKey = function (key) {
  // Call the super constructor.
  RSAKey.call(this);
  // If a key key was provided.
  if (key) {
    // If this is a string...
    if (typeof key === 'string') {
      this.parseKey(key);
    }
    else if (
      this.hasPrivateKeyProperty(key) ||
      this.hasPublicKeyProperty(key)
    ) {
      // Set the values for the key.
      this.parsePropertiesFrom(key);
    }
  }
};

// Derive from RSAKey.
JSEncryptRSAKey.prototype = new RSAKey();

// Reset the contructor.
JSEncryptRSAKey.prototype.constructor = JSEncryptRSAKey;


/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */
var JSEncrypt = function (options) {
  options = options || {};
  this.default_key_size = parseInt(options.default_key_size) || 1024;
  this.default_public_exponent = options.default_public_exponent || '010001'; //65537 default openssl public exponent for rsa key type
  this.log = options.log || false;
  // The private and public key.
  this.key = null;
};

/**
 * Method to set the rsa key parameter (one method is enough to set both the public
 * and the private key, since the private key contains the public key paramenters)
 * Log a warning if logs are enabled
 * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
 * @public
 */
JSEncrypt.prototype.setKey = function (key) {
  if (this.log && this.key) {
    console.warn('A key was already set, overriding existing.');
  }
  this.key = new JSEncryptRSAKey(key);
};

/**
 * Proxy method for setKey, for api compatibility
 * @see setKey
 * @public
 */
JSEncrypt.prototype.setPrivateKey = function (privkey) {
  // Create the key.
  this.setKey(privkey);
};

/**
 * Proxy method for setKey, for api compatibility
 * @see setKey
 * @public
 */
JSEncrypt.prototype.setPublicKey = function (pubkey) {
  // Sets the public key.
  this.setKey(pubkey);
};

/**
 * Proxy method for RSAKey object's decrypt, decrypt the string using the private
 * components of the rsa key object. Note that if the object was not set will be created
 * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
 * @param {string} string base64 encoded crypted string to decrypt
 * @return {string} the decrypted string
 * @public
 */
JSEncrypt.prototype.decrypt = function (string) {
  // Return the decrypted string.
  try {
    return this.getKey().decrypt(b64tohex(string));
  }
  catch (ex) {
    return false;
  }
};

/**
 * Proxy method for RSAKey object's encrypt, encrypt the string using the public
 * components of the rsa key object. Note that if the object was not set will be created
 * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
 * @param {string} string the string to encrypt
 * @return {string} the encrypted string encoded in base64
 * @public
 */
JSEncrypt.prototype.encrypt = function (string) {
  // Return the encrypted string.
  try {
    return hex2b64(this.getKey().encrypt(string));
  }
  catch (ex) {
    return false;
  }
};

/**
 * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
 * will be created and returned
 * @param {callback} [cb] the callback to be called if we want the key to be generated
 * in an async fashion
 * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
 * @public
 */
JSEncrypt.prototype.getKey = function (cb) {
  // Only create new if it does not exist.
  if (!this.key) {
    // Get a new private key.
    this.key = new JSEncryptRSAKey();
    if (cb && {}.toString.call(cb) === '[object Function]') {
      this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
      return;
    }
    // Generate the key.
    this.key.generate(this.default_key_size, this.default_public_exponent);
  }
  return this.key;
};

/**
 * Returns the pem encoded representation of the private key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the private key WITH header and footer
 * @public
 */
JSEncrypt.prototype.getPrivateKey = function () {
  // Return the private representation of this key.
  return this.getKey().getPrivateKey();
};

/**
 * Returns the pem encoded representation of the private key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the private key WITHOUT header and footer
 * @public
 */
JSEncrypt.prototype.getPrivateKeyB64 = function () {
  // Return the private representation of this key.
  return this.getKey().getPrivateBaseKeyB64();
};


/**
 * Returns the pem encoded representation of the public key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the public key WITH header and footer
 * @public
 */
JSEncrypt.prototype.getPublicKey = function () {
  // Return the private representation of this key.
  return this.getKey().getPublicKey();
};

/**
 * Returns the pem encoded representation of the public key
 * If the key doesn't exists a new key will be created
 * @returns {string} pem encoded representation of the public key WITHOUT header and footer
 * @public
 */
JSEncrypt.prototype.getPublicKeyB64 = function () {
  // Return the private representation of this key.
  return this.getKey().getPublicBaseKeyB64();
};


  JSEncrypt.version = '2.3.1';
  exports.JSEncrypt = JSEncrypt;
});
}).call(this,require("lYpoI2"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src/jsencrypt.js","/src")
},{"buffer":3,"lYpoI2":10}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JhdWxucy93b3Jrc3BhY2UvbWVyY3VyZS9wYWNrYWdlcy9jcnlwdGl1bS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9yYXVsbnMvd29ya3NwYWNlL21lcmN1cmUvcGFja2FnZXMvY3J5cHRpdW0vZmFrZV83NzJkNDExZS5qcyIsIi9ob21lL3JhdWxucy93b3Jrc3BhY2UvbWVyY3VyZS9wYWNrYWdlcy9jcnlwdGl1bS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIi9ob21lL3JhdWxucy93b3Jrc3BhY2UvbWVyY3VyZS9wYWNrYWdlcy9jcnlwdGl1bS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCIvaG9tZS9yYXVsbnMvd29ya3NwYWNlL21lcmN1cmUvcGFja2FnZXMvY3J5cHRpdW0vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaGVscGVycy5qcyIsIi9ob21lL3JhdWxucy93b3Jrc3BhY2UvbWVyY3VyZS9wYWNrYWdlcy9jcnlwdGl1bS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qcyIsIi9ob21lL3JhdWxucy93b3Jrc3BhY2UvbWVyY3VyZS9wYWNrYWdlcy9jcnlwdGl1bS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanMiLCIvaG9tZS9yYXVsbnMvd29ya3NwYWNlL21lcmN1cmUvcGFja2FnZXMvY3J5cHRpdW0vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzIiwiL2hvbWUvcmF1bG5zL3dvcmtzcGFjZS9tZXJjdXJlL3BhY2thZ2VzL2NyeXB0aXVtL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qcyIsIi9ob21lL3JhdWxucy93b3Jrc3BhY2UvbWVyY3VyZS9wYWNrYWdlcy9jcnlwdGl1bS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanMiLCIvaG9tZS9yYXVsbnMvd29ya3NwYWNlL21lcmN1cmUvcGFja2FnZXMvY3J5cHRpdW0vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiL2hvbWUvcmF1bG5zL3dvcmtzcGFjZS9tZXJjdXJlL3BhY2thZ2VzL2NyeXB0aXVtL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiL2hvbWUvcmF1bG5zL3dvcmtzcGFjZS9tZXJjdXJlL3BhY2thZ2VzL2NyeXB0aXVtL3NyYy9hZXNjaXBoZXIuanMiLCIvaG9tZS9yYXVsbnMvd29ya3NwYWNlL21lcmN1cmUvcGFja2FnZXMvY3J5cHRpdW0vc3JjL2NyeXB0aXVtLmpzIiwiL2hvbWUvcmF1bG5zL3dvcmtzcGFjZS9tZXJjdXJlL3BhY2thZ2VzL2NyeXB0aXVtL3NyYy9oZWxwZXJzLmpzIiwiL2hvbWUvcmF1bG5zL3dvcmtzcGFjZS9tZXJjdXJlL3BhY2thZ2VzL2NyeXB0aXVtL3NyYy9qc2VuY3J5cHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xud2luZG93LkNyeXB0aXVtID0gcmVxdWlyZSgnLi9zcmMvY3J5cHRpdW0nKTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV83NzJkNDExZS5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cdHZhciBQTFVTX1VSTF9TQUZFID0gJy0nLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMClcblxuXHRmdW5jdGlvbiBkZWNvZGUgKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMClcblx0XHRpZiAoY29kZSA9PT0gUExVUyB8fFxuXHRcdCAgICBjb2RlID09PSBQTFVTX1VSTF9TQUZFKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSCB8fFxuXHRcdCAgICBjb2RlID09PSBTTEFTSF9VUkxfU0FGRSlcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyAodGhpcy5iYXNlNjRqcyA9IHt9KSA6IGV4cG9ydHMpKVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImxZcG9JMlwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYlwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTJcblxuLyoqXG4gKiBJZiBgQnVmZmVyLl91c2VUeXBlZEFycmF5c2A6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChjb21wYXRpYmxlIGRvd24gdG8gSUU2KVxuICovXG5CdWZmZXIuX3VzZVR5cGVkQXJyYXlzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSkoKVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pXG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdFxuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdClcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9J1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdClcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpXG4gICAgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCkgLy8gYXNzdW1lIHRoYXQgb2JqZWN0IGlzIGFycmF5LWxpa2VcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKVxuXG4gIHZhciBidWZcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzXG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aFxuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgaVxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdClcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKVxuICAgICAgZWxzZVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0W2ldXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXRcbiAgc3RyID0gc3RyICsgJydcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDJcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArXG4gICAgICAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF1cbiAgfVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZVxuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDJcbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHsgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIG9mZnNldCA9IGxlbmd0aFxuICAgIGxlbmd0aCA9IHN3YXBcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwXG4gIGVuZCA9IChlbmQgIT09IHVuZGVmaW5lZClcbiAgICA/IE51bWJlcihlbmQpXG4gICAgOiBlbmQgPSBzZWxmLmxlbmd0aFxuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpXG4gICAgcmV0dXJuICcnXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpc1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwXG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKVxuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCxcbiAgICAgICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpXG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydClcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnRcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KVxuICB9XG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJ1xuICB2YXIgdG1wID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICAgICAgdG1wID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKVxufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspXG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpXG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2krMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMClcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbilcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZlxuICB9XG59XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKVxuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgM11cbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLFxuICAgICAgICAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEZsb2F0IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZilcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVyblxuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MClcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsXG4gICAgICAgICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKVxuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWVcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXVxuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pXG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJ1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKVxuICAgICAgICBidWZbaV0gPSB0aGlzW2ldXG4gICAgICByZXR1cm4gYnVmLmJ1ZmZlclxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWVcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0XG4gIGFyci5fc2V0ID0gYXJyLnNldFxuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmNvcHkgPSBCUC5jb3B5XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50OFxuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRVxuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRVxuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRVxuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRVxuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRVxuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRVxuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFXG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkVcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRVxuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkVcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFXG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcCAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlXG4gIGluZGV4ID0gfn5pbmRleDsgIC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgaW5kZXggKz0gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gY29lcmNlIChsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKVxuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGhcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nXG4gIH0pKHN1YmplY3QpXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2ggKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8XG4gICAgICBzdWJqZWN0ICYmIHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChiIDw9IDB4N0YpXG4gICAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSlcbiAgICBlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGlcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrXG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkrMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspXG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKVxuICAgICAgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhciAoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCAodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxufVxuXG5mdW5jdGlvbiBhc3NlcnQgKHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpXG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcbnZhciBpbnRTaXplID0gNDtcbnZhciB6ZXJvQnVmZmVyID0gbmV3IEJ1ZmZlcihpbnRTaXplKTsgemVyb0J1ZmZlci5maWxsKDApO1xudmFyIGNocnN6ID0gODtcblxuZnVuY3Rpb24gdG9BcnJheShidWYsIGJpZ0VuZGlhbikge1xuICBpZiAoKGJ1Zi5sZW5ndGggJSBpbnRTaXplKSAhPT0gMCkge1xuICAgIHZhciBsZW4gPSBidWYubGVuZ3RoICsgKGludFNpemUgLSAoYnVmLmxlbmd0aCAlIGludFNpemUpKTtcbiAgICBidWYgPSBCdWZmZXIuY29uY2F0KFtidWYsIHplcm9CdWZmZXJdLCBsZW4pO1xuICB9XG5cbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgZm4gPSBiaWdFbmRpYW4gPyBidWYucmVhZEludDMyQkUgOiBidWYucmVhZEludDMyTEU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmLmxlbmd0aDsgaSArPSBpbnRTaXplKSB7XG4gICAgYXJyLnB1c2goZm4uY2FsbChidWYsIGkpKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiB0b0J1ZmZlcihhcnIsIHNpemUsIGJpZ0VuZGlhbikge1xuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcihzaXplKTtcbiAgdmFyIGZuID0gYmlnRW5kaWFuID8gYnVmLndyaXRlSW50MzJCRSA6IGJ1Zi53cml0ZUludDMyTEU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgZm4uY2FsbChidWYsIGFycltpXSwgaSAqIDQsIHRydWUpO1xuICB9XG4gIHJldHVybiBidWY7XG59XG5cbmZ1bmN0aW9uIGhhc2goYnVmLCBmbiwgaGFzaFNpemUsIGJpZ0VuZGlhbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBuZXcgQnVmZmVyKGJ1Zik7XG4gIHZhciBhcnIgPSBmbih0b0FycmF5KGJ1ZiwgYmlnRW5kaWFuKSwgYnVmLmxlbmd0aCAqIGNocnN6KTtcbiAgcmV0dXJuIHRvQnVmZmVyKGFyciwgaGFzaFNpemUsIGJpZ0VuZGlhbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBoYXNoOiBoYXNoIH07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaGVscGVycy5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlclxudmFyIHNoYSA9IHJlcXVpcmUoJy4vc2hhJylcbnZhciBzaGEyNTYgPSByZXF1aXJlKCcuL3NoYTI1NicpXG52YXIgcm5nID0gcmVxdWlyZSgnLi9ybmcnKVxudmFyIG1kNSA9IHJlcXVpcmUoJy4vbWQ1JylcblxudmFyIGFsZ29yaXRobXMgPSB7XG4gIHNoYTE6IHNoYSxcbiAgc2hhMjU2OiBzaGEyNTYsXG4gIG1kNTogbWQ1XG59XG5cbnZhciBibG9ja3NpemUgPSA2NFxudmFyIHplcm9CdWZmZXIgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSk7IHplcm9CdWZmZXIuZmlsbCgwKVxuZnVuY3Rpb24gaG1hYyhmbiwga2V5LCBkYXRhKSB7XG4gIGlmKCFCdWZmZXIuaXNCdWZmZXIoa2V5KSkga2V5ID0gbmV3IEJ1ZmZlcihrZXkpXG4gIGlmKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpXG5cbiAgaWYoa2V5Lmxlbmd0aCA+IGJsb2Nrc2l6ZSkge1xuICAgIGtleSA9IGZuKGtleSlcbiAgfSBlbHNlIGlmKGtleS5sZW5ndGggPCBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBCdWZmZXIuY29uY2F0KFtrZXksIHplcm9CdWZmZXJdLCBibG9ja3NpemUpXG4gIH1cblxuICB2YXIgaXBhZCA9IG5ldyBCdWZmZXIoYmxvY2tzaXplKSwgb3BhZCA9IG5ldyBCdWZmZXIoYmxvY2tzaXplKVxuICBmb3IodmFyIGkgPSAwOyBpIDwgYmxvY2tzaXplOyBpKyspIHtcbiAgICBpcGFkW2ldID0ga2V5W2ldIF4gMHgzNlxuICAgIG9wYWRbaV0gPSBrZXlbaV0gXiAweDVDXG4gIH1cblxuICB2YXIgaGFzaCA9IGZuKEJ1ZmZlci5jb25jYXQoW2lwYWQsIGRhdGFdKSlcbiAgcmV0dXJuIGZuKEJ1ZmZlci5jb25jYXQoW29wYWQsIGhhc2hdKSlcbn1cblxuZnVuY3Rpb24gaGFzaChhbGcsIGtleSkge1xuICBhbGcgPSBhbGcgfHwgJ3NoYTEnXG4gIHZhciBmbiA9IGFsZ29yaXRobXNbYWxnXVxuICB2YXIgYnVmcyA9IFtdXG4gIHZhciBsZW5ndGggPSAwXG4gIGlmKCFmbikgZXJyb3IoJ2FsZ29yaXRobTonLCBhbGcsICdpcyBub3QgeWV0IHN1cHBvcnRlZCcpXG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWYoIUJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkgZGF0YSA9IG5ldyBCdWZmZXIoZGF0YSlcbiAgICAgICAgXG4gICAgICBidWZzLnB1c2goZGF0YSlcbiAgICAgIGxlbmd0aCArPSBkYXRhLmxlbmd0aFxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGRpZ2VzdDogZnVuY3Rpb24gKGVuYykge1xuICAgICAgdmFyIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoYnVmcylcbiAgICAgIHZhciByID0ga2V5ID8gaG1hYyhmbiwga2V5LCBidWYpIDogZm4oYnVmKVxuICAgICAgYnVmcyA9IG51bGxcbiAgICAgIHJldHVybiBlbmMgPyByLnRvU3RyaW5nKGVuYykgOiByXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGVycm9yICgpIHtcbiAgdmFyIG0gPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbignICcpXG4gIHRocm93IG5ldyBFcnJvcihbXG4gICAgbSxcbiAgICAnd2UgYWNjZXB0IHB1bGwgcmVxdWVzdHMnLFxuICAgICdodHRwOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9jcnlwdG8tYnJvd3NlcmlmeSdcbiAgICBdLmpvaW4oJ1xcbicpKVxufVxuXG5leHBvcnRzLmNyZWF0ZUhhc2ggPSBmdW5jdGlvbiAoYWxnKSB7IHJldHVybiBoYXNoKGFsZykgfVxuZXhwb3J0cy5jcmVhdGVIbWFjID0gZnVuY3Rpb24gKGFsZywga2V5KSB7IHJldHVybiBoYXNoKGFsZywga2V5KSB9XG5leHBvcnRzLnJhbmRvbUJ5dGVzID0gZnVuY3Rpb24oc2l6ZSwgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwpIHtcbiAgICB0cnkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQsIG5ldyBCdWZmZXIocm5nKHNpemUpKSlcbiAgICB9IGNhdGNoIChlcnIpIHsgY2FsbGJhY2soZXJyKSB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIocm5nKHNpemUpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2goYSwgZikge1xuICBmb3IodmFyIGkgaW4gYSlcbiAgICBmKGFbaV0sIGkpXG59XG5cbi8vIHRoZSBsZWFzdCBJIGNhbiBkbyBpcyBtYWtlIGVycm9yIG1lc3NhZ2VzIGZvciB0aGUgcmVzdCBvZiB0aGUgbm9kZS5qcy9jcnlwdG8gYXBpLlxuZWFjaChbJ2NyZWF0ZUNyZWRlbnRpYWxzJ1xuLCAnY3JlYXRlQ2lwaGVyJ1xuLCAnY3JlYXRlQ2lwaGVyaXYnXG4sICdjcmVhdGVEZWNpcGhlcidcbiwgJ2NyZWF0ZURlY2lwaGVyaXYnXG4sICdjcmVhdGVTaWduJ1xuLCAnY3JlYXRlVmVyaWZ5J1xuLCAnY3JlYXRlRGlmZmllSGVsbG1hbidcbiwgJ3Bia2RmMiddLCBmdW5jdGlvbiAobmFtZSkge1xuICBleHBvcnRzW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgIGVycm9yKCdzb3JyeSwnLCBuYW1lLCAnaXMgbm90IGltcGxlbWVudGVkIHlldCcpXG4gIH1cbn0pXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qXHJcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcclxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cclxuICogVmVyc2lvbiAyLjEgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDAyLlxyXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XHJcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxyXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxyXG4gKi9cclxuXHJcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XHJcblxyXG4vKlxyXG4gKiBQZXJmb3JtIGEgc2ltcGxlIHNlbGYtdGVzdCB0byBzZWUgaWYgdGhlIFZNIGlzIHdvcmtpbmdcclxuICovXHJcbmZ1bmN0aW9uIG1kNV92bV90ZXN0KClcclxue1xyXG4gIHJldHVybiBoZXhfbWQ1KFwiYWJjXCIpID09IFwiOTAwMTUwOTgzY2QyNGZiMGQ2OTYzZjdkMjhlMTdmNzJcIjtcclxufVxyXG5cclxuLypcclxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aFxyXG4gKi9cclxuZnVuY3Rpb24gY29yZV9tZDUoeCwgbGVuKVxyXG57XHJcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cclxuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8ICgobGVuKSAlIDMyKTtcclxuICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XHJcblxyXG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XHJcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xyXG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XHJcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICBmb3IodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpXHJcbiAge1xyXG4gICAgdmFyIG9sZGEgPSBhO1xyXG4gICAgdmFyIG9sZGIgPSBiO1xyXG4gICAgdmFyIG9sZGMgPSBjO1xyXG4gICAgdmFyIG9sZGQgPSBkO1xyXG5cclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyAwXSwgNyAsIC02ODA4NzY5MzYpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsgMl0sIDE3LCAgNjA2MTA1ODE5KTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyA0XSwgNyAsIC0xNzY0MTg4OTcpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyA4XSwgNyAsICAxNzcwMDM1NDE2KTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XHJcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDcgLCAgMTgwNDYwMzY4Mik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krMTRdLCAxNywgLTE1MDIwMDIyOTApO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyAxXSwgNSAsIC0xNjU3OTY1MTApO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDZdLCA5ICwgLTEwNjk1MDE2MzIpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA1XSwgNSAsIC03MDE1NTg2OTEpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTBdLCA5ICwgIDM4MDE2MDgzKTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDRdLCAyMCwgLTQwNTUzNzg0OCk7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsgOV0sIDUgLCAgNTY4NDQ2NDM4KTtcclxuICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpKzE0XSwgOSAsIC0xMDE5ODAzNjkwKTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKyAzXSwgMTQsIC0xODczNjM5NjEpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krMTNdLCA1ICwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDJdLCA5ICwgLTUxNDAzNzg0KTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgNV0sIDQgLCAtMzc4NTU4KTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKzE0XSwgMjMsIC0zNTMwOTU1Nik7XHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgMV0sIDQgLCAtMTUzMDk5MjA2MCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsgN10sIDE2LCAtMTU1NDk3NjMyKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKzEzXSwgNCAsICA2ODEyNzkxNzQpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDBdLCAxMSwgLTM1ODUzNzIyMik7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgOV0sIDQgLCAtNjQwMzY0NDg3KTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcclxuXHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgMF0sIDYgLCAtMTk4NjMwODQ0KTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKzE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDYgLCAgMTcwMDQ4NTU3MSk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsgM10sIDEwLCAtMTg5NDk4NjYwNik7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgOF0sIDYgLCAgMTg3MzMxMzM1OSk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xyXG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krIDRdLCA2ICwgLTE0NTUyMzA3MCk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcclxuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcclxuICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcclxuICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcclxuICB9XHJcbiAgcmV0dXJuIEFycmF5KGEsIGIsIGMsIGQpO1xyXG5cclxufVxyXG5cclxuLypcclxuICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cclxuICovXHJcbmZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLGIpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9nZyhhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5mdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5cclxuLypcclxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxyXG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxyXG4gKi9cclxuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcclxue1xyXG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XHJcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xyXG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KVxyXG57XHJcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1kNShidWYpIHtcclxuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9tZDUsIDE2KTtcclxufTtcclxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImxZcG9JMlwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L21kNS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLy8gT3JpZ2luYWwgY29kZSBhZGFwdGVkIGZyb20gUm9iZXJ0IEtpZWZmZXIuXG4vLyBkZXRhaWxzIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBfZ2xvYmFsID0gdGhpcztcblxuICB2YXIgbWF0aFJORywgd2hhdHdnUk5HO1xuXG4gIC8vIE5PVEU6IE1hdGgucmFuZG9tKCkgZG9lcyBub3QgZ3VhcmFudGVlIFwiY3J5cHRvZ3JhcGhpYyBxdWFsaXR5XCJcbiAgbWF0aFJORyA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICB2YXIgYnl0ZXMgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgdmFyIHI7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IHNpemU7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIGJ5dGVzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBieXRlcztcbiAgfVxuXG4gIGlmIChfZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgd2hhdHdnUk5HID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IHdoYXR3Z1JORyB8fCBtYXRoUk5HO1xuXG59KCkpXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0xLCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIFBVQiAxODAtMVxuICogVmVyc2lvbiAyLjFhIENvcHlyaWdodCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDAyLlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAqL1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBTSEEtMSBvZiBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGNvcmVfc2hhMSh4LCBsZW4pXG57XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbGVuICUgMzIpO1xuICB4WygobGVuICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsZW47XG5cbiAgdmFyIHcgPSBBcnJheSg4MCk7XG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xuICB2YXIgZSA9IC0xMDA5NTg5Nzc2O1xuXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcbiAge1xuICAgIHZhciBvbGRhID0gYTtcbiAgICB2YXIgb2xkYiA9IGI7XG4gICAgdmFyIG9sZGMgPSBjO1xuICAgIHZhciBvbGRkID0gZDtcbiAgICB2YXIgb2xkZSA9IGU7XG5cbiAgICBmb3IodmFyIGogPSAwOyBqIDwgODA7IGorKylcbiAgICB7XG4gICAgICBpZihqIDwgMTYpIHdbal0gPSB4W2kgKyBqXTtcbiAgICAgIGVsc2Ugd1tqXSA9IHJvbCh3W2otM10gXiB3W2otOF0gXiB3W2otMTRdIF4gd1tqLTE2XSwgMSk7XG4gICAgICB2YXIgdCA9IHNhZmVfYWRkKHNhZmVfYWRkKHJvbChhLCA1KSwgc2hhMV9mdChqLCBiLCBjLCBkKSksXG4gICAgICAgICAgICAgICAgICAgICAgIHNhZmVfYWRkKHNhZmVfYWRkKGUsIHdbal0pLCBzaGExX2t0KGopKSk7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IHJvbChiLCAzMCk7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSB0O1xuICAgIH1cblxuICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICBlID0gc2FmZV9hZGQoZSwgb2xkZSk7XG4gIH1cbiAgcmV0dXJuIEFycmF5KGEsIGIsIGMsIGQsIGUpO1xuXG59XG5cbi8qXG4gKiBQZXJmb3JtIHRoZSBhcHByb3ByaWF0ZSB0cmlwbGV0IGNvbWJpbmF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgY3VycmVudFxuICogaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfZnQodCwgYiwgYywgZClcbntcbiAgaWYodCA8IDIwKSByZXR1cm4gKGIgJiBjKSB8ICgofmIpICYgZCk7XG4gIGlmKHQgPCA0MCkgcmV0dXJuIGIgXiBjIF4gZDtcbiAgaWYodCA8IDYwKSByZXR1cm4gKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpO1xuICByZXR1cm4gYiBeIGMgXiBkO1xufVxuXG4vKlxuICogRGV0ZXJtaW5lIHRoZSBhcHByb3ByaWF0ZSBhZGRpdGl2ZSBjb25zdGFudCBmb3IgdGhlIGN1cnJlbnQgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfa3QodClcbntcbiAgcmV0dXJuICh0IDwgMjApID8gIDE1MTg1MDAyNDkgOiAodCA8IDQwKSA/ICAxODU5Nzc1MzkzIDpcbiAgICAgICAgICh0IDwgNjApID8gLTE4OTQwMDc1ODggOiAtODk5NDk3NTE0O1xufVxuXG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcbntcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn1cblxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuZnVuY3Rpb24gcm9sKG51bSwgY250KVxue1xuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhMShidWYpIHtcbiAgcmV0dXJuIGhlbHBlcnMuaGFzaChidWYsIGNvcmVfc2hhMSwgMjAsIHRydWUpO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJsWXBvSTJcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblxuLyoqXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTI1NiwgYXMgZGVmaW5lZFxuICogaW4gRklQUyAxODAtMlxuICogVmVyc2lvbiAyLjItYmV0YSBDb3B5cmlnaHQgQW5nZWwgTWFyaW4sIFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDkuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKlxuICovXG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbnZhciBzYWZlX2FkZCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn07XG5cbnZhciBTID0gZnVuY3Rpb24oWCwgbikge1xuICByZXR1cm4gKFggPj4+IG4pIHwgKFggPDwgKDMyIC0gbikpO1xufTtcblxudmFyIFIgPSBmdW5jdGlvbihYLCBuKSB7XG4gIHJldHVybiAoWCA+Pj4gbik7XG59O1xuXG52YXIgQ2ggPSBmdW5jdGlvbih4LCB5LCB6KSB7XG4gIHJldHVybiAoKHggJiB5KSBeICgofngpICYgeikpO1xufTtcblxudmFyIE1haiA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgcmV0dXJuICgoeCAmIHkpIF4gKHggJiB6KSBeICh5ICYgeikpO1xufTtcblxudmFyIFNpZ21hMDI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDIpIF4gUyh4LCAxMykgXiBTKHgsIDIyKSk7XG59O1xuXG52YXIgU2lnbWExMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgNikgXiBTKHgsIDExKSBeIFMoeCwgMjUpKTtcbn07XG5cbnZhciBHYW1tYTAyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCA3KSBeIFMoeCwgMTgpIF4gUih4LCAzKSk7XG59O1xuXG52YXIgR2FtbWExMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgMTcpIF4gUyh4LCAxOSkgXiBSKHgsIDEwKSk7XG59O1xuXG52YXIgY29yZV9zaGEyNTYgPSBmdW5jdGlvbihtLCBsKSB7XG4gIHZhciBLID0gbmV3IEFycmF5KDB4NDI4QTJGOTgsMHg3MTM3NDQ5MSwweEI1QzBGQkNGLDB4RTlCNURCQTUsMHgzOTU2QzI1QiwweDU5RjExMUYxLDB4OTIzRjgyQTQsMHhBQjFDNUVENSwweEQ4MDdBQTk4LDB4MTI4MzVCMDEsMHgyNDMxODVCRSwweDU1MEM3REMzLDB4NzJCRTVENzQsMHg4MERFQjFGRSwweDlCREMwNkE3LDB4QzE5QkYxNzQsMHhFNDlCNjlDMSwweEVGQkU0Nzg2LDB4RkMxOURDNiwweDI0MENBMUNDLDB4MkRFOTJDNkYsMHg0QTc0ODRBQSwweDVDQjBBOURDLDB4NzZGOTg4REEsMHg5ODNFNTE1MiwweEE4MzFDNjZELDB4QjAwMzI3QzgsMHhCRjU5N0ZDNywweEM2RTAwQkYzLDB4RDVBNzkxNDcsMHg2Q0E2MzUxLDB4MTQyOTI5NjcsMHgyN0I3MEE4NSwweDJFMUIyMTM4LDB4NEQyQzZERkMsMHg1MzM4MEQxMywweDY1MEE3MzU0LDB4NzY2QTBBQkIsMHg4MUMyQzkyRSwweDkyNzIyQzg1LDB4QTJCRkU4QTEsMHhBODFBNjY0QiwweEMyNEI4QjcwLDB4Qzc2QzUxQTMsMHhEMTkyRTgxOSwweEQ2OTkwNjI0LDB4RjQwRTM1ODUsMHgxMDZBQTA3MCwweDE5QTRDMTE2LDB4MUUzNzZDMDgsMHgyNzQ4Nzc0QywweDM0QjBCQ0I1LDB4MzkxQzBDQjMsMHg0RUQ4QUE0QSwweDVCOUNDQTRGLDB4NjgyRTZGRjMsMHg3NDhGODJFRSwweDc4QTU2MzZGLDB4ODRDODc4MTQsMHg4Q0M3MDIwOCwweDkwQkVGRkZBLDB4QTQ1MDZDRUIsMHhCRUY5QTNGNywweEM2NzE3OEYyKTtcbiAgdmFyIEhBU0ggPSBuZXcgQXJyYXkoMHg2QTA5RTY2NywgMHhCQjY3QUU4NSwgMHgzQzZFRjM3MiwgMHhBNTRGRjUzQSwgMHg1MTBFNTI3RiwgMHg5QjA1Njg4QywgMHgxRjgzRDlBQiwgMHg1QkUwQ0QxOSk7XG4gICAgdmFyIFcgPSBuZXcgQXJyYXkoNjQpO1xuICAgIHZhciBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoLCBpLCBqO1xuICAgIHZhciBUMSwgVDI7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIG1bbCA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGwgJSAzMik7XG4gIG1bKChsICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgYSA9IEhBU0hbMF07IGIgPSBIQVNIWzFdOyBjID0gSEFTSFsyXTsgZCA9IEhBU0hbM107IGUgPSBIQVNIWzRdOyBmID0gSEFTSFs1XTsgZyA9IEhBU0hbNl07IGggPSBIQVNIWzddO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgNjQ7IGorKykge1xuICAgICAgaWYgKGogPCAxNikge1xuICAgICAgICBXW2pdID0gbVtqICsgaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBXW2pdID0gc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoR2FtbWExMjU2KFdbaiAtIDJdKSwgV1tqIC0gN10pLCBHYW1tYTAyNTYoV1tqIC0gMTVdKSksIFdbaiAtIDE2XSk7XG4gICAgICB9XG4gICAgICBUMSA9IHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKGgsIFNpZ21hMTI1NihlKSksIENoKGUsIGYsIGcpKSwgS1tqXSksIFdbal0pO1xuICAgICAgVDIgPSBzYWZlX2FkZChTaWdtYTAyNTYoYSksIE1haihhLCBiLCBjKSk7XG4gICAgICBoID0gZzsgZyA9IGY7IGYgPSBlOyBlID0gc2FmZV9hZGQoZCwgVDEpOyBkID0gYzsgYyA9IGI7IGIgPSBhOyBhID0gc2FmZV9hZGQoVDEsIFQyKTtcbiAgICB9XG4gICAgSEFTSFswXSA9IHNhZmVfYWRkKGEsIEhBU0hbMF0pOyBIQVNIWzFdID0gc2FmZV9hZGQoYiwgSEFTSFsxXSk7IEhBU0hbMl0gPSBzYWZlX2FkZChjLCBIQVNIWzJdKTsgSEFTSFszXSA9IHNhZmVfYWRkKGQsIEhBU0hbM10pO1xuICAgIEhBU0hbNF0gPSBzYWZlX2FkZChlLCBIQVNIWzRdKTsgSEFTSFs1XSA9IHNhZmVfYWRkKGYsIEhBU0hbNV0pOyBIQVNIWzZdID0gc2FmZV9hZGQoZywgSEFTSFs2XSk7IEhBU0hbN10gPSBzYWZlX2FkZChoLCBIQVNIWzddKTtcbiAgfVxuICByZXR1cm4gSEFTSDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhMjU2KGJ1Zikge1xuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9zaGEyNTYsIDMyLCB0cnVlKTtcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhMjU2LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJsWXBvSTJcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvaWVlZTc1NFwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8vIGNvbXBhdGlibGUgY2lwaGVyIGJldHdlZW4gYnJvd3NlciBhbmQgbm9kZSBzZXJ2ZXJcbnZhciBOT0RFX0FMRyA9IFwiYWVzLTI1Ni1jYmNcIjtcbnZhciBCUk9XU0VSX0FMRyA9IFwiQUVTLUNCQ1wiO1xudmFyIEJST1dTRVJfSEFTSCA9IFwiU0hBLTI1NlwiO1xudmFyIE5PREVfSEFTSCA9IFwic2hhMjU2XCI7XG5cbi8qKlxuICogZ2V0IGNpcGhlciBiYXNlZCBvbiBBRVNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBwYXNzd29yZCBmb3IgdGhlIGVjbnJpcHRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBpdl9zdHJpbmcgaW5pdGl0YWxpemF0aW9uIHZlY3RvciBpbiBiYXNlIDY0IChvcHRpb25hbClcbiAqL1xuZnVuY3Rpb24gQnJvd3Nlcl9jaXBoZXIocGFzc3dvcmQsIGl2X3N0cmluZykge1xuICB0aGlzLml2X3N0cmluZyA9IGl2X3N0cmluZztcbiAgdGhpcy5pdiA9IGZyb21CYXNlNjQoaXZfc3RyaW5nKTtcbiAgdGhpcy5wd1VpbnQ4ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHBhc3N3b3JkKTtcbn1cblxuLyoqXG4gKiBJbml0IGtleVxuICovXG5Ccm93c2VyX2NpcGhlci5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjcnlwdG8uc3VidGxlLmRpZ2VzdChCUk9XU0VSX0hBU0gsIHRoaXMucHdVaW50OCkudGhlbihmdW5jdGlvbihwd0hhc2gpICB7XG4gICAgdGhpcy5wd0hhc2ggPSBwd0hhc2g7XG4gICAgdGhpcy5hbGcgPSB7XG4gICAgICBuYW1lOiBCUk9XU0VSX0FMRyxcbiAgICAgIGl2OiB0aGlzLml2XG4gICAgfTtcbiAgICByZXR1cm4gY3J5cHRvLnN1YnRsZVxuICAgICAgLmltcG9ydEtleShcInJhd1wiLCB0aGlzLnB3SGFzaCwgdGhpcy5hbGcsIGZhbHNlLCBbXCJlbmNyeXB0XCIsIFwiZGVjcnlwdFwiXSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGtleSkgIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBlbmNyeXB0IGEgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9FbmNyeXB0IHN0cmluZyB0byBiZSBlbmNyeXB0ZWRcbiAqL1xuQnJvd3Nlcl9jaXBoZXIucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbih0b0VuY3J5cHQpIHtcbiAgcmV0dXJuIHRoaXMuZ2V0S2V5KClcbiAgICAudGhlbihmdW5jdGlvbigpICB7XG4gICAgICB2YXIgcHRVdGY4ID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHRvRW5jcnlwdCk7XG4gICAgICByZXR1cm4gY3J5cHRvLnN1YnRsZS5lbmNyeXB0KHRoaXMuYWxnLCB0aGlzLmtleSwgcHRVdGY4KTtcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uKGFycmF5QnVmZmVyKSAge1xuICAgICAgcmV0dXJuIHRvQmFzZTY0KGFycmF5QnVmZmVyKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogZGVjcnlwdCBhIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRvRGVjcnlwdCBzdHJpbmcgdG8gYmUgZGVjcnlwdGVkXG4gKi9cbkJyb3dzZXJfY2lwaGVyLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24odG9EZWNyeXB0KSB7XG4gIHJldHVybiB0aGlzLmdldEtleSgpLnRoZW4oZnVuY3Rpb24oKSAge1xuICAgIGN0QnVmZmVyID0gZnJvbUJhc2U2NCh0b0RlY3J5cHQpO1xuICAgIHJldHVybiBjcnlwdG8uc3VidGxlXG4gICAgICAuZGVjcnlwdCh0aGlzLmFsZywgdGhpcy5rZXksIGN0QnVmZmVyKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocHRCdWZmZXIgKSB7XG4gICAgICAgIHJldHVybiAocGxhaW50ZXh0ID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKHB0QnVmZmVyKSk7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGdldCB0aGUgaW5pdGlhbGl6YXRpb24gdmVjdG9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBpbml0aWFsaXphdGlvbiB2ZWN0b3IgaW4gYmFzZTY0XG4gKi9cbkJyb3dzZXJfY2lwaGVyLnByb3RvdHlwZS5nZXRJdiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pdl9zdHJpbmc7XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBhIHJhbmRvbSBpbml0aWFsaXphdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGluaXRpYWxpemF0aW9uIHZlY3RvciBpbiBiYXNlNjRcbiAqL1xuZnVuY3Rpb24gQnJvd3Nlcl9jcmVhdGVJdigpIHtcbiAgcmV0dXJuIHRvQmFzZTY0KGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTYpKSk7XG59XG5cbmZ1bmN0aW9uIHRvQmFzZTY0KGFycmF5QnVmZmVyKSB7XG4gIHJldHVybiBidG9hKFxuICAgIG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKS5yZWR1Y2UoXG4gICAgICBmdW5jdGlvbihkYXRhLCBieXRlKSAge3JldHVybiBkYXRhICsgU3RyaW5nLmZyb21DaGFyQ29kZShieXRlKX0sXG4gICAgICBcIlwiXG4gICAgKVxuICApO1xufVxuLy8gZnJvbSBiYXNlIDY0IHRvIHVpbnQ4IGFycmF5XG5mdW5jdGlvbiBmcm9tQmFzZTY0KGJhc2U2NF9zdHJpbmcpIHtcbiAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShhdG9iKGJhc2U2NF9zdHJpbmcpLCBmdW5jdGlvbihjaGFyYWN0ZXIpe1xuICAgIHJldHVybiBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKVxuICB9IFxuICAgIFxuICApO1xufVxuXG4vKipcbiAqIGdldCBjaXBoZXIgYmFzZWQgb24gQUVTLCBOb2RlIHNpZGUgZW5jcnlwdGlvbiBkZWNyeXB0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgcGFzc3dvcmQgZm9yIHRoZSBlY25yaXB0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gaXZfc3RyaW5nIGluaXRpdGFsaXphdGlvbiB2ZWN0b3IgaW4gYmFzZSA2NCAob3B0aW9uYWwpXG4gKi9cbmZ1bmN0aW9uIE5vZGVfYWVzX2NpcGhlcihwYXNzd29yZCwgaXYpIHtcbiAgdmFyIGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG4gIHRoaXMua2V5ID0gY3J5cHRvLmNyZWF0ZUhhc2goTk9ERV9IQVNIKS51cGRhdGUocGFzc3dvcmQsIFwidXRmOFwiKS5kaWdlc3QoKTtcbiAgdGhpcy5pdiA9IG5ldyBCdWZmZXIoaXYsIFwiYmFzZTY0XCIpO1xufVxuXG4vKipcbiAqIGVuY3J5cHQgYSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b0VuY3J5cHQgc3RyaW5nIHRvIGJlIGVuY3J5cHRlZFxuICovXG5Ob2RlX2Flc19jaXBoZXIucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbih0b0VuY3J5cHQpIHtcbiAgdmFyIGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG4gIHZhciBjaXBoZXIgPSBjcnlwdG8uY3JlYXRlQ2lwaGVyaXYoTk9ERV9BTEcsIHRoaXMua2V5LCB0aGlzLml2KTtcbiAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci51cGRhdGUodG9FbmNyeXB0LCBcInV0ZjhcIiwgXCJiYXNlNjRcIik7XG4gIGVuY3J5cHRlZCArPSBjaXBoZXIuZmluYWwoXCJiYXNlNjRcIik7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzLCByZWopICB7XG4gICAgcmVzKGVuY3J5cHRlZCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBkZWNyeXB0IGEgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9EZWNyeXB0IHN0cmluZyB0byBiZSBkZWNyeXB0ZWRcbiAqL1xuTm9kZV9hZXNfY2lwaGVyLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24odG9EZWNyeXB0KSB7XG4gIHZhciBjcnlwdG8gPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuICAvLyBjcmVhdGUgdGhlIGRlY2lwaGVyXG4gIHZhciBkZWNpcGhlciA9IGNyeXB0by5jcmVhdGVEZWNpcGhlcml2KE5PREVfQUxHLCB0aGlzLmtleSwgdGhpcy5pdik7XG4gIHZhciBkZWNyeXB0ZWQgPSBkZWNpcGhlci51cGRhdGUodG9EZWNyeXB0LCBcImJhc2U2NFwiLCBcInV0Zi04XCIpO1xuICBkZWNyeXB0ZWQgKz0gZGVjaXBoZXIuZmluYWwoXCJ1dGYtOFwiKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXMsIHJlaikgIHtcbiAgICByZXMoZGVjcnlwdGVkKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGdldCB0aGUgaW5pdGlhbGl6YXRpb24gdmVjdG9yXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBpbml0aWFsaXphdGlvbiB2ZWN0b3IgaW4gYmFzZTY0XG4gKi9cbk5vZGVfYWVzX2NpcGhlci5wcm90b3R5cGUuZ2V0SXYgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuaXYudG9TdHJpbmcoXCJiYXNlNjRcIik7XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBhIHJhbmRvbSBpbml0aWFsaXphdGlvbiB2ZWN0b3JcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGluaXRpYWxpemF0aW9uIHZlY3RvciBpbiBiYXNlNjRcbiAqL1xuZnVuY3Rpb24gTm9kZV9jcmVhdGVJdigpIHtcbiAgdmFyIGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG4gIHJldHVybiBuZXcgQnVmZmVyKGNyeXB0by5yYW5kb21CeXRlcygxNikpLnRvU3RyaW5nKFwiYmFzZTY0XCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTm9kZV9hZXNfY2lwaGVyLFxuICBCcm93c2VyX2NpcGhlcixcbiAgQnJvd3Nlcl9jcmVhdGVJdixcbiAgTm9kZV9jcmVhdGVJdlxufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJsWXBvSTJcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9zcmMvYWVzY2lwaGVyLmpzXCIsXCIvc3JjXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLy8gSW1wb3J0IGhlbHBlcnNcbnZhciBoZWxwZXJzID0gcmVxdWlyZShcIi4vaGVscGVyc1wiKTtcbnZhciBhZXNjaXBoZXIgPSByZXF1aXJlKFwiLi9hZXNjaXBoZXJcIik7XG5cbi8qKlxuICogQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBoZXggc3RyaW5nXG4gKiBJbXBsZW1lbnRhdGlvbiBmcm9tIGNyeXB0LWpzXG4gKiBAcGFyYW0ge251bWJlcn0gYnl0ZXMgXG4gKi9cbmZ1bmN0aW9uIGJ5dGVzVG9IZXgoYnl0ZXMpIHtcbiAgZm9yICh2YXIgaGV4ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBoZXgucHVzaCgoYnl0ZXNbaV0gPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG4gICAgaGV4LnB1c2goKGJ5dGVzW2ldICYgMHhmKS50b1N0cmluZygxNikpO1xuICB9XG4gIHJldHVybiBoZXguam9pbihcIlwiKTtcbn1cblxuLyoqIFxuICogR2VuZXJhdGVzIGEgY3J5cHRvIHNlY3VyZSByYW5kb20gc3RyaW5nXG4qIEBwYXJhbSB7bnVtYmVyfSBpdGVtc1xuKiBpdGVtcyBpcyB0aGUgbnVtYmVyIG9mIHJhbmRvbSBoZXggY2hhcmFjdGVycywgYXMgdGhlIG1pbmltdW0gaXRlbSBpcyBhIDMyIGJ5dGVzIHRoZSBtaW5pbXVtIG91dHB1dCBpcyA0XG4qL1xuZnVuY3Rpb24gZ2V0UmFuZG9tVmFsdWVzKGl0ZW1zKSB7XG4gIHZhciB0b2tlbiA9IFwiXCI7XG5cbiAgaWYgKGhlbHBlcnMuaXNOb2RlKCkpIHtcbiAgICAvLyBOb2RlIHZlcnNpb25cbiAgICAvLyBub3RlIHRoYXQgaW4gdGhlIGJyb3dzZXIgdGhlIGl0ZW1zIGFyZSAzMmJpdHMgd2hlcmVhcyBoZXJlIGFyZSBCeXRlc1xuICAgIC8vIGkuZS4gNCB0aW1lcyBsb25nZXIgaW4gdGhlIGJyb3dzZXJcbiAgICB2YXIgYnVmZmVyID0gcmVxdWlyZShcImNyeXB0b1wiKS5yYW5kb21CeXRlcyhpdGVtcyAqIDQpO1xuICAgIHRva2VuID0gYnVmZmVyLnRvU3RyaW5nKFwiaGV4XCIpO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5jcnlwdG8gIT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEJyb3dzZXIgdmVyc2lvblxuICAgIHZhciBjcnlwdG9PYmogPSB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0bzsgLy8gZm9yIElFIDExXG4gICAgdmFyIGFycmF5ID0gbmV3IFVpbnQzMkFycmF5KGl0ZW1zKTtcbiAgICBjcnlwdG9PYmouZ2V0UmFuZG9tVmFsdWVzKGFycmF5KTtcbiAgICB0b2tlbiA9IGJ5dGVzVG9IZXgoYXJyYXkpO1xuICB9XG4gIHJldHVybiB0b2tlbjtcbn1cblxuLy8gYWRkIGEgc2FsdCB0byBhIGdpdmVuIHN0cmluZ1xuLyoqXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCBcbiAqIEBwYXJhbSB7c3RyaW5nfSBzYWx0Qnl0ZXMgXG4gKi9cbmZ1bmN0aW9uIGFkZFNhbHQoaW5wdXQsIHNhbHRCeXRlcykge1xuICB2YXIgbmV3U3RyaW5nID0gaW5wdXQgKyBcInxcIiArIGdldFJhbmRvbVZhbHVlcyhzYWx0Qnl0ZXMpO1xuICByZXR1cm4gbmV3U3RyaW5nO1xufVxuXG4vKipcbiAqIHJlbW92ZSBzYWx0IGZyb20gYSBzYWx0ZWQgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc2FsdGVkU3RyaW5nIFxuICovXG5mdW5jdGlvbiByZW1vdmVTYWx0KHNhbHRlZFN0cmluZykge1xuICB2YXIgZmllbGRzID0gc2FsdGVkU3RyaW5nLnNwbGl0KFwifFwiKTtcbiAgcmV0dXJuIGZpZWxkc1swXTtcbn1cblxuLyoqXG4gKiBnZXQgZW5jcnlwdGlvbiBiYXNlZCBvbiBSU0EgcHViLXByaXYga2V5c1xuICogQHBhcmFtIHtzdHJpbmd9IHB1YiBwdWJsaWMga2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gcHJpdiBwcml2YXRlIGtleVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbmNyeXB0ZXIocHViLCBwcml2KSB7XG4gIGlmIChoZWxwZXJzLmlzTm9kZSgpKSB7XG4gICAgcmV0dXJuIG5ldyBoZWxwZXJzLk5vZGVfUlNBKHB1YiwgcHJpdik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBoZWxwZXJzLkJyb3dzZXJfUlNBKHB1YiwgcHJpdik7XG4gIH1cbn1cblxuLyoqXG4gKiBnZXQgY2lwaGVyIGJhc2VkIG9uIEFFU1xuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIHBhc3N3b3JkIGZvciB0aGUgZWNucmlwdGlvXG4gKiBAcGFyYW0ge3N0cmluZ30gaXZfaW5wdXQgaW5pdGl0YWxpemF0aW9uIHZlY3RvciBpbiBiYXNlIDY0IChvcHRpb25hbClcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2lwaGVyKHBhc3N3b3JkLCBpdl9pbnB1dCkge1xuICBpZiAoaXZfaW5wdXQgPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gZ2VuZXJhdGUgYSBuZXcgaXZcbiAgICBpZiAoaGVscGVycy5pc05vZGUoKSkge1xuICAgICAgdmFyIGl2ID0gYWVzY2lwaGVyLk5vZGVfY3JlYXRlSXYoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGl2ID0gYWVzY2lwaGVyLkJyb3dzZXJfY3JlYXRlSXYoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl2ID0gaXZfaW5wdXQ7XG4gIH1cbiAgaWYgKGhlbHBlcnMuaXNOb2RlKCkpIHtcbiAgICByZXR1cm4gbmV3IGFlc2NpcGhlci5Ob2RlX2Flc19jaXBoZXIocGFzc3dvcmQsIGl2KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IGFlc2NpcGhlci5Ccm93c2VyX2NpcGhlcihwYXNzd29yZCwgaXYpO1xuICB9XG59XG4vKipcbiAqIEVuY3J5cHRzIGFuIE5vdGlmaWNhdGlvbiBhbmQgaXQncyBjb250ZW50XG4gKiBcbiAqIEBwYXJhbSAge3N0cmluZ30gZGVzdGluYXRpb25cbiAqIEBwYXJhbSAge3N0cmluZ30gY29udGVudFxuICogQHBhcmFtICB7c3RyaW5nfSBwdWJcbiAqL1xuZnVuY3Rpb24gZW5jcnlwdE5vdGlmaWNhdGlvbihkZXN0aW5hdGlvbiwgY29udGVudCwgcHViKSB7XG4gIHZhciBlbmNyeXB0ID0gY3JlYXRlRW5jcnlwdGVyKHB1YiwgbnVsbCk7XG4gIHZhciBlbmNyeXB0ZWREZXN0aW5hdGlvbiA9IGVuY3J5cHQuZW5jcnlwdChkZXN0aW5hdGlvbik7XG4gIC8vIGVuY3J5cHQgY29udGVudCB1c2luZyBBRVNcbiAgdmFyIEFFU0NpcGhlciA9IGNyZWF0ZUNpcGhlcihkZXN0aW5hdGlvbik7XG4gIHZhciBpdiA9IEFFU0NpcGhlci5nZXRJdigpO1xuICByZXR1cm4gQUVTQ2lwaGVyLmVuY3J5cHQoY29udGVudCkudGhlbihmdW5jdGlvbihlbmNyeXB0ZWRDb250ZW50KSB7XG4gICAgcmV0dXJuIHsgZGVzdGluYXRpb246IGVuY3J5cHRlZERlc3RpbmF0aW9uLCBpdjogaXYsIGNvbnRlbnQ6IGVuY3J5cHRlZENvbnRlbnQgfTtcbiAgfSk7XG59XG5cbi8qKlxuICogZGVjcnlwdCBhbiBOb3RpZmljYXRpb25cbiAqIFxuICogQHBhcmFtICB7c3RyaW5nfSBkZXN0aW5hdGlvblxuICogQHBhcmFtICB7c3RyaW5nfSBjb250ZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGl2XG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByaXZcbiAqL1xuZnVuY3Rpb24gZGVjcnlwdE5vdGlmaWNhdGlvbihkZXN0aW5hdGlvbiwgY29udGVudCwgaXYsIHByaXYpIHtcbiAgdmFyIGVuY3J5cHQgPSBjcmVhdGVFbmNyeXB0ZXIobnVsbCwgcHJpdik7XG4gIHZhciBkZWNyeXB0ZWROb3RpZmljYXRpb24gPSBlbmNyeXB0LmRlY3J5cHQoZGVzdGluYXRpb24pO1xuICAvLyBlbmNyeXB0IGNvbnRlbnQgdXNpbmcgQUVTXG4gIHZhciBBRVNDaXBoZXIgPSBjcmVhdGVDaXBoZXIoZGVjcnlwdGVkTm90aWZpY2F0aW9uLCBpdik7XG4gIHJldHVybiBBRVNDaXBoZXIuZGVjcnlwdChjb250ZW50KS50aGVuKGZ1bmN0aW9uKGRlY3J5cHRlZENvbnRlbnQgKSB7XG4gICAgcmV0dXJuIHsgZGVzdGluYXRpb246IGRlY3J5cHRlZE5vdGlmaWNhdGlvbiwgY29udGVudDogZGVjcnlwdGVkQ29udGVudCB9O1xuICB9KTtcbn1cblxuLy8gbW9kdWxlIGV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRSYW5kb21WYWx1ZXM6IGdldFJhbmRvbVZhbHVlcyxcbiAgYWRkU2FsdDogYWRkU2FsdCxcbiAgcmVtb3ZlU2FsdDogcmVtb3ZlU2FsdCxcbiAgY3JlYXRlRW5jcnlwdGVyOiBjcmVhdGVFbmNyeXB0ZXIsXG4gIGNyZWF0ZUNpcGhlcjogY3JlYXRlQ2lwaGVyLFxuICBlbmNyeXB0Tm90aWZpY2F0aW9uOiBlbmNyeXB0Tm90aWZpY2F0aW9uLFxuICBkZWNyeXB0Tm90aWZpY2F0aW9uOiBkZWNyeXB0Tm90aWZpY2F0aW9uXG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImxZcG9JMlwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3NyYy9jcnlwdGl1bS5qc1wiLFwiL3NyY1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbmZ1bmN0aW9uIGlzTm9kZSgpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCI7XG59XG5cbi8vIEJyb3dzZXIgZW5jcnlwdGlvbiBkZWNyeXB0aW9uXG5mdW5jdGlvbiBCcm93c2VyX1JTQShwdWJrZXksIHByaXZrZXkpIHtcbiAgdGhpcy5wdWJrZXkgPSBwdWJrZXk7XG4gIHRoaXMucHJpdmtleSA9IHByaXZrZXk7XG59XG5Ccm93c2VyX1JTQS5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHZhciBKU0VuY3J5cHQgPSByZXF1aXJlKFwiLi9qc2VuY3J5cHRcIik7XG4gIHZhciBlbmNyeXB0ZXIgPSBuZXcgSlNFbmNyeXB0LkpTRW5jcnlwdCgpO1xuICBlbmNyeXB0ZXIuc2V0UHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgcmV0dXJuIGVuY3J5cHRlci5lbmNyeXB0KGlucHV0KTtcbn07XG5Ccm93c2VyX1JTQS5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHZhciBKU0VuY3J5cHQgPSByZXF1aXJlKFwiLi9qc2VuY3J5cHRcIik7XG4gIHZhciBlbmNyeXB0ZXIgPSBuZXcgSlNFbmNyeXB0LkpTRW5jcnlwdCgpO1xuICBlbmNyeXB0ZXIuc2V0UHJpdmF0ZUtleSh0aGlzLnByaXZrZXkpO1xuICByZXR1cm4gZW5jcnlwdGVyLmRlY3J5cHQoaW5wdXQpO1xufTtcblxuLy8gTm9kZSBzaWRlIGVuY3J5cHRpb24gZGVjcnlwdGlvblxuZnVuY3Rpb24gTm9kZV9SU0EocHVia2V5LCBwcml2a2V5KSB7XG4gIHRoaXMucHJpdmF0ZUtleSA9IHByaXZrZXk7XG4gIHRoaXMucHVibGljS2V5ID0gcHVia2V5O1xufVxuTm9kZV9SU0EucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbih0b0VuY3J5cHQpIHtcbiAgdmFyIGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG4gIHZhciBidWZmZXIgPSBuZXcgQnVmZmVyKHRvRW5jcnlwdCk7XG4gIHZhciBlbmNyeXB0ZWQgPSBjcnlwdG8ucHVibGljRW5jcnlwdChcbiAgICB7IGtleTogdGhpcy5wdWJsaWNLZXksIHBhZGRpbmc6IGNyeXB0by5jb25zdGFudHMuUlNBX1BLQ1MxX1BBRERJTkcgfSxcbiAgICBidWZmZXJcbiAgKTtcbiAgcmV0dXJuIGVuY3J5cHRlZC50b1N0cmluZyhcImJhc2U2NFwiKTtcbn07XG5Ob2RlX1JTQS5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKHRvRGVjcnlwdCkge1xuICB2YXIgY3J5cHRvID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbiAgdmFyIGJ1ZmZlciA9IG5ldyBCdWZmZXIodG9EZWNyeXB0LCBcImJhc2U2NFwiKTtcbiAgdmFyIGRlY3J5cHRlZCA9IGNyeXB0by5wcml2YXRlRGVjcnlwdChcbiAgICB7IGtleTogdGhpcy5wcml2YXRlS2V5LCBwYWRkaW5nOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QS0NTMV9QQURESU5HIH0sXG4gICAgYnVmZmVyXG4gICk7XG4gIHJldHVybiBkZWNyeXB0ZWQudG9TdHJpbmcoXCJ1dGY4XCIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzTm9kZTogaXNOb2RlLFxuICBCcm93c2VyX1JTQTogQnJvd3Nlcl9SU0EsXG4gIE5vZGVfUlNBOiBOb2RlX1JTQVxufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJsWXBvSTJcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9zcmMvaGVscGVycy5qc1wiLFwiL3NyY1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qISBKU0VuY3J5cHQgdjIuMy4xIHwgaHR0cHM6Ly9ucG1jZG4uY29tL2pzZW5jcnlwdEAyLjMuMS9MSUNFTlNFLnR4dCAqL1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwb3J0cy5ub2RlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBOb2RlLCBDb21tb25KUy1saWtlXG4gICAgZmFjdG9yeShtb2R1bGUuZXhwb3J0cyk7XG4gIH0gZWxzZSB7XG4gICAgZmFjdG9yeShyb290KTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgLy8gQ29weXJpZ2h0IChjKSAyMDA1ICBUb20gV3Vcbi8vIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vLyBTZWUgXCJMSUNFTlNFXCIgZm9yIGRldGFpbHMuXG5cbi8vIEJhc2ljIEphdmFTY3JpcHQgQk4gbGlicmFyeSAtIHN1YnNldCB1c2VmdWwgZm9yIFJTQSBlbmNyeXB0aW9uLlxuXG4vLyBCaXRzIHBlciBkaWdpdFxudmFyIGRiaXRzO1xuXG4vLyBKYXZhU2NyaXB0IGVuZ2luZSBhbmFseXNpc1xudmFyIGNhbmFyeSA9IDB4ZGVhZGJlZWZjYWZlO1xudmFyIGpfbG0gPSAoKGNhbmFyeSYweGZmZmZmZik9PTB4ZWZjYWZlKTtcblxuLy8gKHB1YmxpYykgQ29uc3RydWN0b3JcbmZ1bmN0aW9uIEJpZ0ludGVnZXIoYSxiLGMpIHtcbiAgaWYoYSAhPSBudWxsKVxuICAgIGlmKFwibnVtYmVyXCIgPT0gdHlwZW9mIGEpIHRoaXMuZnJvbU51bWJlcihhLGIsYyk7XG4gICAgZWxzZSBpZihiID09IG51bGwgJiYgXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSkgdGhpcy5mcm9tU3RyaW5nKGEsMjU2KTtcbiAgICBlbHNlIHRoaXMuZnJvbVN0cmluZyhhLGIpO1xufVxuXG4vLyByZXR1cm4gbmV3LCB1bnNldCBCaWdJbnRlZ2VyXG5mdW5jdGlvbiBuYmkoKSB7IHJldHVybiBuZXcgQmlnSW50ZWdlcihudWxsKTsgfVxuXG4vLyBhbTogQ29tcHV0ZSB3X2ogKz0gKHgqdGhpc19pKSwgcHJvcGFnYXRlIGNhcnJpZXMsXG4vLyBjIGlzIGluaXRpYWwgY2FycnksIHJldHVybnMgZmluYWwgY2FycnkuXG4vLyBjIDwgMypkdmFsdWUsIHggPCAyKmR2YWx1ZSwgdGhpc19pIDwgZHZhbHVlXG4vLyBXZSBuZWVkIHRvIHNlbGVjdCB0aGUgZmFzdGVzdCBvbmUgdGhhdCB3b3JrcyBpbiB0aGlzIGVudmlyb25tZW50LlxuXG4vLyBhbTE6IHVzZSBhIHNpbmdsZSBtdWx0IGFuZCBkaXZpZGUgdG8gZ2V0IHRoZSBoaWdoIGJpdHMsXG4vLyBtYXggZGlnaXQgYml0cyBzaG91bGQgYmUgMjYgYmVjYXVzZVxuLy8gbWF4IGludGVybmFsIHZhbHVlID0gMipkdmFsdWVeMi0yKmR2YWx1ZSAoPCAyXjUzKVxuZnVuY3Rpb24gYW0xKGkseCx3LGosYyxuKSB7XG4gIHdoaWxlKC0tbiA+PSAwKSB7XG4gICAgdmFyIHYgPSB4KnRoaXNbaSsrXSt3W2pdK2M7XG4gICAgYyA9IE1hdGguZmxvb3Iodi8weDQwMDAwMDApO1xuICAgIHdbaisrXSA9IHYmMHgzZmZmZmZmO1xuICB9XG4gIHJldHVybiBjO1xufVxuLy8gYW0yIGF2b2lkcyBhIGJpZyBtdWx0LWFuZC1leHRyYWN0IGNvbXBsZXRlbHkuXG4vLyBNYXggZGlnaXQgYml0cyBzaG91bGQgYmUgPD0gMzAgYmVjYXVzZSB3ZSBkbyBiaXR3aXNlIG9wc1xuLy8gb24gdmFsdWVzIHVwIHRvIDIqaGR2YWx1ZV4yLWhkdmFsdWUtMSAoPCAyXjMxKVxuZnVuY3Rpb24gYW0yKGkseCx3LGosYyxuKSB7XG4gIHZhciB4bCA9IHgmMHg3ZmZmLCB4aCA9IHg+PjE1O1xuICB3aGlsZSgtLW4gPj0gMCkge1xuICAgIHZhciBsID0gdGhpc1tpXSYweDdmZmY7XG4gICAgdmFyIGggPSB0aGlzW2krK10+PjE1O1xuICAgIHZhciBtID0geGgqbCtoKnhsO1xuICAgIGwgPSB4bCpsKygobSYweDdmZmYpPDwxNSkrd1tqXSsoYyYweDNmZmZmZmZmKTtcbiAgICBjID0gKGw+Pj4zMCkrKG0+Pj4xNSkreGgqaCsoYz4+PjMwKTtcbiAgICB3W2orK10gPSBsJjB4M2ZmZmZmZmY7XG4gIH1cbiAgcmV0dXJuIGM7XG59XG4vLyBBbHRlcm5hdGVseSwgc2V0IG1heCBkaWdpdCBiaXRzIHRvIDI4IHNpbmNlIHNvbWVcbi8vIGJyb3dzZXJzIHNsb3cgZG93biB3aGVuIGRlYWxpbmcgd2l0aCAzMi1iaXQgbnVtYmVycy5cbmZ1bmN0aW9uIGFtMyhpLHgsdyxqLGMsbikge1xuICB2YXIgeGwgPSB4JjB4M2ZmZiwgeGggPSB4Pj4xNDtcbiAgd2hpbGUoLS1uID49IDApIHtcbiAgICB2YXIgbCA9IHRoaXNbaV0mMHgzZmZmO1xuICAgIHZhciBoID0gdGhpc1tpKytdPj4xNDtcbiAgICB2YXIgbSA9IHhoKmwraCp4bDtcbiAgICBsID0geGwqbCsoKG0mMHgzZmZmKTw8MTQpK3dbal0rYztcbiAgICBjID0gKGw+PjI4KSsobT4+MTQpK3hoKmg7XG4gICAgd1tqKytdID0gbCYweGZmZmZmZmY7XG4gIH1cbiAgcmV0dXJuIGM7XG59XG5pZihqX2xtICYmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiKSkge1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbSA9IGFtMjtcbiAgZGJpdHMgPSAzMDtcbn1cbmVsc2UgaWYoal9sbSAmJiAobmF2aWdhdG9yLmFwcE5hbWUgIT0gXCJOZXRzY2FwZVwiKSkge1xuICBCaWdJbnRlZ2VyLnByb3RvdHlwZS5hbSA9IGFtMTtcbiAgZGJpdHMgPSAyNjtcbn1cbmVsc2UgeyAvLyBNb3ppbGxhL05ldHNjYXBlIHNlZW1zIHRvIHByZWZlciBhbTNcbiAgQmlnSW50ZWdlci5wcm90b3R5cGUuYW0gPSBhbTM7XG4gIGRiaXRzID0gMjg7XG59XG5cbkJpZ0ludGVnZXIucHJvdG90eXBlLkRCID0gZGJpdHM7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5ETSA9ICgoMTw8ZGJpdHMpLTEpO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuRFYgPSAoMTw8ZGJpdHMpO1xuXG52YXIgQklfRlAgPSA1MjtcbkJpZ0ludGVnZXIucHJvdG90eXBlLkZWID0gTWF0aC5wb3coMixCSV9GUCk7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5GMSA9IEJJX0ZQLWRiaXRzO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuRjIgPSAyKmRiaXRzLUJJX0ZQO1xuXG4vLyBEaWdpdCBjb252ZXJzaW9uc1xudmFyIEJJX1JNID0gXCIwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcbnZhciBCSV9SQyA9IG5ldyBBcnJheSgpO1xudmFyIHJyLHZ2O1xucnIgPSBcIjBcIi5jaGFyQ29kZUF0KDApO1xuZm9yKHZ2ID0gMDsgdnYgPD0gOTsgKyt2dikgQklfUkNbcnIrK10gPSB2djtcbnJyID0gXCJhXCIuY2hhckNvZGVBdCgwKTtcbmZvcih2diA9IDEwOyB2diA8IDM2OyArK3Z2KSBCSV9SQ1tycisrXSA9IHZ2O1xucnIgPSBcIkFcIi5jaGFyQ29kZUF0KDApO1xuZm9yKHZ2ID0gMTA7IHZ2IDwgMzY7ICsrdnYpIEJJX1JDW3JyKytdID0gdnY7XG5cbmZ1bmN0aW9uIGludDJjaGFyKG4pIHsgcmV0dXJuIEJJX1JNLmNoYXJBdChuKTsgfVxuZnVuY3Rpb24gaW50QXQocyxpKSB7XG4gIHZhciBjID0gQklfUkNbcy5jaGFyQ29kZUF0KGkpXTtcbiAgcmV0dXJuIChjPT1udWxsKT8tMTpjO1xufVxuXG4vLyAocHJvdGVjdGVkKSBjb3B5IHRoaXMgdG8gclxuZnVuY3Rpb24gYm5wQ29weVRvKHIpIHtcbiAgZm9yKHZhciBpID0gdGhpcy50LTE7IGkgPj0gMDsgLS1pKSByW2ldID0gdGhpc1tpXTtcbiAgci50ID0gdGhpcy50O1xuICByLnMgPSB0aGlzLnM7XG59XG5cbi8vIChwcm90ZWN0ZWQpIHNldCBmcm9tIGludGVnZXIgdmFsdWUgeCwgLURWIDw9IHggPCBEVlxuZnVuY3Rpb24gYm5wRnJvbUludCh4KSB7XG4gIHRoaXMudCA9IDE7XG4gIHRoaXMucyA9ICh4PDApPy0xOjA7XG4gIGlmKHggPiAwKSB0aGlzWzBdID0geDtcbiAgZWxzZSBpZih4IDwgLTEpIHRoaXNbMF0gPSB4K3RoaXMuRFY7XG4gIGVsc2UgdGhpcy50ID0gMDtcbn1cblxuLy8gcmV0dXJuIGJpZ2ludCBpbml0aWFsaXplZCB0byB2YWx1ZVxuZnVuY3Rpb24gbmJ2KGkpIHsgdmFyIHIgPSBuYmkoKTsgci5mcm9tSW50KGkpOyByZXR1cm4gcjsgfVxuXG4vLyAocHJvdGVjdGVkKSBzZXQgZnJvbSBzdHJpbmcgYW5kIHJhZGl4XG5mdW5jdGlvbiBibnBGcm9tU3RyaW5nKHMsYikge1xuICB2YXIgaztcbiAgaWYoYiA9PSAxNikgayA9IDQ7XG4gIGVsc2UgaWYoYiA9PSA4KSBrID0gMztcbiAgZWxzZSBpZihiID09IDI1NikgayA9IDg7IC8vIGJ5dGUgYXJyYXlcbiAgZWxzZSBpZihiID09IDIpIGsgPSAxO1xuICBlbHNlIGlmKGIgPT0gMzIpIGsgPSA1O1xuICBlbHNlIGlmKGIgPT0gNCkgayA9IDI7XG4gIGVsc2UgeyB0aGlzLmZyb21SYWRpeChzLGIpOyByZXR1cm47IH1cbiAgdGhpcy50ID0gMDtcbiAgdGhpcy5zID0gMDtcbiAgdmFyIGkgPSBzLmxlbmd0aCwgbWkgPSBmYWxzZSwgc2ggPSAwO1xuICB3aGlsZSgtLWkgPj0gMCkge1xuICAgIHZhciB4ID0gKGs9PTgpP3NbaV0mMHhmZjppbnRBdChzLGkpO1xuICAgIGlmKHggPCAwKSB7XG4gICAgICBpZihzLmNoYXJBdChpKSA9PSBcIi1cIikgbWkgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIG1pID0gZmFsc2U7XG4gICAgaWYoc2ggPT0gMClcbiAgICAgIHRoaXNbdGhpcy50KytdID0geDtcbiAgICBlbHNlIGlmKHNoK2sgPiB0aGlzLkRCKSB7XG4gICAgICB0aGlzW3RoaXMudC0xXSB8PSAoeCYoKDE8PCh0aGlzLkRCLXNoKSktMSkpPDxzaDtcbiAgICAgIHRoaXNbdGhpcy50KytdID0gKHg+Pih0aGlzLkRCLXNoKSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgIHRoaXNbdGhpcy50LTFdIHw9IHg8PHNoO1xuICAgIHNoICs9IGs7XG4gICAgaWYoc2ggPj0gdGhpcy5EQikgc2ggLT0gdGhpcy5EQjtcbiAgfVxuICBpZihrID09IDggJiYgKHNbMF0mMHg4MCkgIT0gMCkge1xuICAgIHRoaXMucyA9IC0xO1xuICAgIGlmKHNoID4gMCkgdGhpc1t0aGlzLnQtMV0gfD0gKCgxPDwodGhpcy5EQi1zaCkpLTEpPDxzaDtcbiAgfVxuICB0aGlzLmNsYW1wKCk7XG4gIGlmKG1pKSBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcyx0aGlzKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgY2xhbXAgb2ZmIGV4Y2VzcyBoaWdoIHdvcmRzXG5mdW5jdGlvbiBibnBDbGFtcCgpIHtcbiAgdmFyIGMgPSB0aGlzLnMmdGhpcy5ETTtcbiAgd2hpbGUodGhpcy50ID4gMCAmJiB0aGlzW3RoaXMudC0xXSA9PSBjKSAtLXRoaXMudDtcbn1cblxuLy8gKHB1YmxpYykgcmV0dXJuIHN0cmluZyByZXByZXNlbnRhdGlvbiBpbiBnaXZlbiByYWRpeFxuZnVuY3Rpb24gYm5Ub1N0cmluZyhiKSB7XG4gIGlmKHRoaXMucyA8IDApIHJldHVybiBcIi1cIit0aGlzLm5lZ2F0ZSgpLnRvU3RyaW5nKGIpO1xuICB2YXIgaztcbiAgaWYoYiA9PSAxNikgayA9IDQ7XG4gIGVsc2UgaWYoYiA9PSA4KSBrID0gMztcbiAgZWxzZSBpZihiID09IDIpIGsgPSAxO1xuICBlbHNlIGlmKGIgPT0gMzIpIGsgPSA1O1xuICBlbHNlIGlmKGIgPT0gNCkgayA9IDI7XG4gIGVsc2UgcmV0dXJuIHRoaXMudG9SYWRpeChiKTtcbiAgdmFyIGttID0gKDE8PGspLTEsIGQsIG0gPSBmYWxzZSwgciA9IFwiXCIsIGkgPSB0aGlzLnQ7XG4gIHZhciBwID0gdGhpcy5EQi0oaSp0aGlzLkRCKSVrO1xuICBpZihpLS0gPiAwKSB7XG4gICAgaWYocCA8IHRoaXMuREIgJiYgKGQgPSB0aGlzW2ldPj5wKSA+IDApIHsgbSA9IHRydWU7IHIgPSBpbnQyY2hhcihkKTsgfVxuICAgIHdoaWxlKGkgPj0gMCkge1xuICAgICAgaWYocCA8IGspIHtcbiAgICAgICAgZCA9ICh0aGlzW2ldJigoMTw8cCktMSkpPDwoay1wKTtcbiAgICAgICAgZCB8PSB0aGlzWy0taV0+PihwKz10aGlzLkRCLWspO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGQgPSAodGhpc1tpXT4+KHAtPWspKSZrbTtcbiAgICAgICAgaWYocCA8PSAwKSB7IHAgKz0gdGhpcy5EQjsgLS1pOyB9XG4gICAgICB9XG4gICAgICBpZihkID4gMCkgbSA9IHRydWU7XG4gICAgICBpZihtKSByICs9IGludDJjaGFyKGQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbT9yOlwiMFwiO1xufVxuXG4vLyAocHVibGljKSAtdGhpc1xuZnVuY3Rpb24gYm5OZWdhdGUoKSB7IHZhciByID0gbmJpKCk7IEJpZ0ludGVnZXIuWkVSTy5zdWJUbyh0aGlzLHIpOyByZXR1cm4gcjsgfVxuXG4vLyAocHVibGljKSB8dGhpc3xcbmZ1bmN0aW9uIGJuQWJzKCkgeyByZXR1cm4gKHRoaXMuczwwKT90aGlzLm5lZ2F0ZSgpOnRoaXM7IH1cblxuLy8gKHB1YmxpYykgcmV0dXJuICsgaWYgdGhpcyA+IGEsIC0gaWYgdGhpcyA8IGEsIDAgaWYgZXF1YWxcbmZ1bmN0aW9uIGJuQ29tcGFyZVRvKGEpIHtcbiAgdmFyIHIgPSB0aGlzLnMtYS5zO1xuICBpZihyICE9IDApIHJldHVybiByO1xuICB2YXIgaSA9IHRoaXMudDtcbiAgciA9IGktYS50O1xuICBpZihyICE9IDApIHJldHVybiAodGhpcy5zPDApPy1yOnI7XG4gIHdoaWxlKC0taSA+PSAwKSBpZigocj10aGlzW2ldLWFbaV0pICE9IDApIHJldHVybiByO1xuICByZXR1cm4gMDtcbn1cblxuLy8gcmV0dXJucyBiaXQgbGVuZ3RoIG9mIHRoZSBpbnRlZ2VyIHhcbmZ1bmN0aW9uIG5iaXRzKHgpIHtcbiAgdmFyIHIgPSAxLCB0O1xuICBpZigodD14Pj4+MTYpICE9IDApIHsgeCA9IHQ7IHIgKz0gMTY7IH1cbiAgaWYoKHQ9eD4+OCkgIT0gMCkgeyB4ID0gdDsgciArPSA4OyB9XG4gIGlmKCh0PXg+PjQpICE9IDApIHsgeCA9IHQ7IHIgKz0gNDsgfVxuICBpZigodD14Pj4yKSAhPSAwKSB7IHggPSB0OyByICs9IDI7IH1cbiAgaWYoKHQ9eD4+MSkgIT0gMCkgeyB4ID0gdDsgciArPSAxOyB9XG4gIHJldHVybiByO1xufVxuXG4vLyAocHVibGljKSByZXR1cm4gdGhlIG51bWJlciBvZiBiaXRzIGluIFwidGhpc1wiXG5mdW5jdGlvbiBibkJpdExlbmd0aCgpIHtcbiAgaWYodGhpcy50IDw9IDApIHJldHVybiAwO1xuICByZXR1cm4gdGhpcy5EQioodGhpcy50LTEpK25iaXRzKHRoaXNbdGhpcy50LTFdXih0aGlzLnMmdGhpcy5ETSkpO1xufVxuXG4vLyAocHJvdGVjdGVkKSByID0gdGhpcyA8PCBuKkRCXG5mdW5jdGlvbiBibnBETFNoaWZ0VG8obixyKSB7XG4gIHZhciBpO1xuICBmb3IoaSA9IHRoaXMudC0xOyBpID49IDA7IC0taSkgcltpK25dID0gdGhpc1tpXTtcbiAgZm9yKGkgPSBuLTE7IGkgPj0gMDsgLS1pKSByW2ldID0gMDtcbiAgci50ID0gdGhpcy50K247XG4gIHIucyA9IHRoaXMucztcbn1cblxuLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgPj4gbipEQlxuZnVuY3Rpb24gYm5wRFJTaGlmdFRvKG4scikge1xuICBmb3IodmFyIGkgPSBuOyBpIDwgdGhpcy50OyArK2kpIHJbaS1uXSA9IHRoaXNbaV07XG4gIHIudCA9IE1hdGgubWF4KHRoaXMudC1uLDApO1xuICByLnMgPSB0aGlzLnM7XG59XG5cbi8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzIDw8IG5cbmZ1bmN0aW9uIGJucExTaGlmdFRvKG4scikge1xuICB2YXIgYnMgPSBuJXRoaXMuREI7XG4gIHZhciBjYnMgPSB0aGlzLkRCLWJzO1xuICB2YXIgYm0gPSAoMTw8Y2JzKS0xO1xuICB2YXIgZHMgPSBNYXRoLmZsb29yKG4vdGhpcy5EQiksIGMgPSAodGhpcy5zPDxicykmdGhpcy5ETSwgaTtcbiAgZm9yKGkgPSB0aGlzLnQtMTsgaSA+PSAwOyAtLWkpIHtcbiAgICByW2krZHMrMV0gPSAodGhpc1tpXT4+Y2JzKXxjO1xuICAgIGMgPSAodGhpc1tpXSZibSk8PGJzO1xuICB9XG4gIGZvcihpID0gZHMtMTsgaSA+PSAwOyAtLWkpIHJbaV0gPSAwO1xuICByW2RzXSA9IGM7XG4gIHIudCA9IHRoaXMudCtkcysxO1xuICByLnMgPSB0aGlzLnM7XG4gIHIuY2xhbXAoKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgPj4gblxuZnVuY3Rpb24gYm5wUlNoaWZ0VG8obixyKSB7XG4gIHIucyA9IHRoaXMucztcbiAgdmFyIGRzID0gTWF0aC5mbG9vcihuL3RoaXMuREIpO1xuICBpZihkcyA+PSB0aGlzLnQpIHsgci50ID0gMDsgcmV0dXJuOyB9XG4gIHZhciBicyA9IG4ldGhpcy5EQjtcbiAgdmFyIGNicyA9IHRoaXMuREItYnM7XG4gIHZhciBibSA9ICgxPDxicyktMTtcbiAgclswXSA9IHRoaXNbZHNdPj5icztcbiAgZm9yKHZhciBpID0gZHMrMTsgaSA8IHRoaXMudDsgKytpKSB7XG4gICAgcltpLWRzLTFdIHw9ICh0aGlzW2ldJmJtKTw8Y2JzO1xuICAgIHJbaS1kc10gPSB0aGlzW2ldPj5icztcbiAgfVxuICBpZihicyA+IDApIHJbdGhpcy50LWRzLTFdIHw9ICh0aGlzLnMmYm0pPDxjYnM7XG4gIHIudCA9IHRoaXMudC1kcztcbiAgci5jbGFtcCgpO1xufVxuXG4vLyAocHJvdGVjdGVkKSByID0gdGhpcyAtIGFcbmZ1bmN0aW9uIGJucFN1YlRvKGEscikge1xuICB2YXIgaSA9IDAsIGMgPSAwLCBtID0gTWF0aC5taW4oYS50LHRoaXMudCk7XG4gIHdoaWxlKGkgPCBtKSB7XG4gICAgYyArPSB0aGlzW2ldLWFbaV07XG4gICAgcltpKytdID0gYyZ0aGlzLkRNO1xuICAgIGMgPj49IHRoaXMuREI7XG4gIH1cbiAgaWYoYS50IDwgdGhpcy50KSB7XG4gICAgYyAtPSBhLnM7XG4gICAgd2hpbGUoaSA8IHRoaXMudCkge1xuICAgICAgYyArPSB0aGlzW2ldO1xuICAgICAgcltpKytdID0gYyZ0aGlzLkRNO1xuICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICB9XG4gICAgYyArPSB0aGlzLnM7XG4gIH1cbiAgZWxzZSB7XG4gICAgYyArPSB0aGlzLnM7XG4gICAgd2hpbGUoaSA8IGEudCkge1xuICAgICAgYyAtPSBhW2ldO1xuICAgICAgcltpKytdID0gYyZ0aGlzLkRNO1xuICAgICAgYyA+Pj0gdGhpcy5EQjtcbiAgICB9XG4gICAgYyAtPSBhLnM7XG4gIH1cbiAgci5zID0gKGM8MCk/LTE6MDtcbiAgaWYoYyA8IC0xKSByW2krK10gPSB0aGlzLkRWK2M7XG4gIGVsc2UgaWYoYyA+IDApIHJbaSsrXSA9IGM7XG4gIHIudCA9IGk7XG4gIHIuY2xhbXAoKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgKiBhLCByICE9IHRoaXMsYSAoSEFDIDE0LjEyKVxuLy8gXCJ0aGlzXCIgc2hvdWxkIGJlIHRoZSBsYXJnZXIgb25lIGlmIGFwcHJvcHJpYXRlLlxuZnVuY3Rpb24gYm5wTXVsdGlwbHlUbyhhLHIpIHtcbiAgdmFyIHggPSB0aGlzLmFicygpLCB5ID0gYS5hYnMoKTtcbiAgdmFyIGkgPSB4LnQ7XG4gIHIudCA9IGkreS50O1xuICB3aGlsZSgtLWkgPj0gMCkgcltpXSA9IDA7XG4gIGZvcihpID0gMDsgaSA8IHkudDsgKytpKSByW2kreC50XSA9IHguYW0oMCx5W2ldLHIsaSwwLHgudCk7XG4gIHIucyA9IDA7XG4gIHIuY2xhbXAoKTtcbiAgaWYodGhpcy5zICE9IGEucykgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHIscik7XG59XG5cbi8vIChwcm90ZWN0ZWQpIHIgPSB0aGlzXjIsIHIgIT0gdGhpcyAoSEFDIDE0LjE2KVxuZnVuY3Rpb24gYm5wU3F1YXJlVG8ocikge1xuICB2YXIgeCA9IHRoaXMuYWJzKCk7XG4gIHZhciBpID0gci50ID0gMip4LnQ7XG4gIHdoaWxlKC0taSA+PSAwKSByW2ldID0gMDtcbiAgZm9yKGkgPSAwOyBpIDwgeC50LTE7ICsraSkge1xuICAgIHZhciBjID0geC5hbShpLHhbaV0sciwyKmksMCwxKTtcbiAgICBpZigocltpK3gudF0rPXguYW0oaSsxLDIqeFtpXSxyLDIqaSsxLGMseC50LWktMSkpID49IHguRFYpIHtcbiAgICAgIHJbaSt4LnRdIC09IHguRFY7XG4gICAgICByW2kreC50KzFdID0gMTtcbiAgICB9XG4gIH1cbiAgaWYoci50ID4gMCkgcltyLnQtMV0gKz0geC5hbShpLHhbaV0sciwyKmksMCwxKTtcbiAgci5zID0gMDtcbiAgci5jbGFtcCgpO1xufVxuXG4vLyAocHJvdGVjdGVkKSBkaXZpZGUgdGhpcyBieSBtLCBxdW90aWVudCBhbmQgcmVtYWluZGVyIHRvIHEsIHIgKEhBQyAxNC4yMClcbi8vIHIgIT0gcSwgdGhpcyAhPSBtLiAgcSBvciByIG1heSBiZSBudWxsLlxuZnVuY3Rpb24gYm5wRGl2UmVtVG8obSxxLHIpIHtcbiAgdmFyIHBtID0gbS5hYnMoKTtcbiAgaWYocG0udCA8PSAwKSByZXR1cm47XG4gIHZhciBwdCA9IHRoaXMuYWJzKCk7XG4gIGlmKHB0LnQgPCBwbS50KSB7XG4gICAgaWYocSAhPSBudWxsKSBxLmZyb21JbnQoMCk7XG4gICAgaWYociAhPSBudWxsKSB0aGlzLmNvcHlUbyhyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYociA9PSBudWxsKSByID0gbmJpKCk7XG4gIHZhciB5ID0gbmJpKCksIHRzID0gdGhpcy5zLCBtcyA9IG0ucztcbiAgdmFyIG5zaCA9IHRoaXMuREItbmJpdHMocG1bcG0udC0xXSk7XHQvLyBub3JtYWxpemUgbW9kdWx1c1xuICBpZihuc2ggPiAwKSB7IHBtLmxTaGlmdFRvKG5zaCx5KTsgcHQubFNoaWZ0VG8obnNoLHIpOyB9XG4gIGVsc2UgeyBwbS5jb3B5VG8oeSk7IHB0LmNvcHlUbyhyKTsgfVxuICB2YXIgeXMgPSB5LnQ7XG4gIHZhciB5MCA9IHlbeXMtMV07XG4gIGlmKHkwID09IDApIHJldHVybjtcbiAgdmFyIHl0ID0geTAqKDE8PHRoaXMuRjEpKygoeXM+MSk/eVt5cy0yXT4+dGhpcy5GMjowKTtcbiAgdmFyIGQxID0gdGhpcy5GVi95dCwgZDIgPSAoMTw8dGhpcy5GMSkveXQsIGUgPSAxPDx0aGlzLkYyO1xuICB2YXIgaSA9IHIudCwgaiA9IGkteXMsIHQgPSAocT09bnVsbCk/bmJpKCk6cTtcbiAgeS5kbFNoaWZ0VG8oaix0KTtcbiAgaWYoci5jb21wYXJlVG8odCkgPj0gMCkge1xuICAgIHJbci50KytdID0gMTtcbiAgICByLnN1YlRvKHQscik7XG4gIH1cbiAgQmlnSW50ZWdlci5PTkUuZGxTaGlmdFRvKHlzLHQpO1xuICB0LnN1YlRvKHkseSk7XHQvLyBcIm5lZ2F0aXZlXCIgeSBzbyB3ZSBjYW4gcmVwbGFjZSBzdWIgd2l0aCBhbSBsYXRlclxuICB3aGlsZSh5LnQgPCB5cykgeVt5LnQrK10gPSAwO1xuICB3aGlsZSgtLWogPj0gMCkge1xuICAgIC8vIEVzdGltYXRlIHF1b3RpZW50IGRpZ2l0XG4gICAgdmFyIHFkID0gKHJbLS1pXT09eTApP3RoaXMuRE06TWF0aC5mbG9vcihyW2ldKmQxKyhyW2ktMV0rZSkqZDIpO1xuICAgIGlmKChyW2ldKz15LmFtKDAscWQscixqLDAseXMpKSA8IHFkKSB7XHQvLyBUcnkgaXQgb3V0XG4gICAgICB5LmRsU2hpZnRUbyhqLHQpO1xuICAgICAgci5zdWJUbyh0LHIpO1xuICAgICAgd2hpbGUocltpXSA8IC0tcWQpIHIuc3ViVG8odCxyKTtcbiAgICB9XG4gIH1cbiAgaWYocSAhPSBudWxsKSB7XG4gICAgci5kclNoaWZ0VG8oeXMscSk7XG4gICAgaWYodHMgIT0gbXMpIEJpZ0ludGVnZXIuWkVSTy5zdWJUbyhxLHEpO1xuICB9XG4gIHIudCA9IHlzO1xuICByLmNsYW1wKCk7XG4gIGlmKG5zaCA+IDApIHIuclNoaWZ0VG8obnNoLHIpO1x0Ly8gRGVub3JtYWxpemUgcmVtYWluZGVyXG4gIGlmKHRzIDwgMCkgQmlnSW50ZWdlci5aRVJPLnN1YlRvKHIscik7XG59XG5cbi8vIChwdWJsaWMpIHRoaXMgbW9kIGFcbmZ1bmN0aW9uIGJuTW9kKGEpIHtcbiAgdmFyIHIgPSBuYmkoKTtcbiAgdGhpcy5hYnMoKS5kaXZSZW1UbyhhLG51bGwscik7XG4gIGlmKHRoaXMucyA8IDAgJiYgci5jb21wYXJlVG8oQmlnSW50ZWdlci5aRVJPKSA+IDApIGEuc3ViVG8ocixyKTtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIE1vZHVsYXIgcmVkdWN0aW9uIHVzaW5nIFwiY2xhc3NpY1wiIGFsZ29yaXRobVxuZnVuY3Rpb24gQ2xhc3NpYyhtKSB7IHRoaXMubSA9IG07IH1cbmZ1bmN0aW9uIGNDb252ZXJ0KHgpIHtcbiAgaWYoeC5zIDwgMCB8fCB4LmNvbXBhcmVUbyh0aGlzLm0pID49IDApIHJldHVybiB4Lm1vZCh0aGlzLm0pO1xuICBlbHNlIHJldHVybiB4O1xufVxuZnVuY3Rpb24gY1JldmVydCh4KSB7IHJldHVybiB4OyB9XG5mdW5jdGlvbiBjUmVkdWNlKHgpIHsgeC5kaXZSZW1Ubyh0aGlzLm0sbnVsbCx4KTsgfVxuZnVuY3Rpb24gY011bFRvKHgseSxyKSB7IHgubXVsdGlwbHlUbyh5LHIpOyB0aGlzLnJlZHVjZShyKTsgfVxuZnVuY3Rpb24gY1NxclRvKHgscikgeyB4LnNxdWFyZVRvKHIpOyB0aGlzLnJlZHVjZShyKTsgfVxuXG5DbGFzc2ljLnByb3RvdHlwZS5jb252ZXJ0ID0gY0NvbnZlcnQ7XG5DbGFzc2ljLnByb3RvdHlwZS5yZXZlcnQgPSBjUmV2ZXJ0O1xuQ2xhc3NpYy5wcm90b3R5cGUucmVkdWNlID0gY1JlZHVjZTtcbkNsYXNzaWMucHJvdG90eXBlLm11bFRvID0gY011bFRvO1xuQ2xhc3NpYy5wcm90b3R5cGUuc3FyVG8gPSBjU3FyVG87XG5cbi8vIChwcm90ZWN0ZWQpIHJldHVybiBcIi0xL3RoaXMgJSAyXkRCXCI7IHVzZWZ1bCBmb3IgTW9udC4gcmVkdWN0aW9uXG4vLyBqdXN0aWZpY2F0aW9uOlxuLy8gICAgICAgICB4eSA9PSAxIChtb2QgbSlcbi8vICAgICAgICAgeHkgPSAgMStrbVxuLy8gICB4eSgyLXh5KSA9ICgxK2ttKSgxLWttKVxuLy8geFt5KDIteHkpXSA9IDEta14ybV4yXG4vLyB4W3koMi14eSldID09IDEgKG1vZCBtXjIpXG4vLyBpZiB5IGlzIDEveCBtb2QgbSwgdGhlbiB5KDIteHkpIGlzIDEveCBtb2QgbV4yXG4vLyBzaG91bGQgcmVkdWNlIHggYW5kIHkoMi14eSkgYnkgbV4yIGF0IGVhY2ggc3RlcCB0byBrZWVwIHNpemUgYm91bmRlZC5cbi8vIEpTIG11bHRpcGx5IFwib3ZlcmZsb3dzXCIgZGlmZmVyZW50bHkgZnJvbSBDL0MrKywgc28gY2FyZSBpcyBuZWVkZWQgaGVyZS5cbmZ1bmN0aW9uIGJucEludkRpZ2l0KCkge1xuICBpZih0aGlzLnQgPCAxKSByZXR1cm4gMDtcbiAgdmFyIHggPSB0aGlzWzBdO1xuICBpZigoeCYxKSA9PSAwKSByZXR1cm4gMDtcbiAgdmFyIHkgPSB4JjM7XHRcdC8vIHkgPT0gMS94IG1vZCAyXjJcbiAgeSA9ICh5KigyLSh4JjB4ZikqeSkpJjB4ZjtcdC8vIHkgPT0gMS94IG1vZCAyXjRcbiAgeSA9ICh5KigyLSh4JjB4ZmYpKnkpKSYweGZmO1x0Ly8geSA9PSAxL3ggbW9kIDJeOFxuICB5ID0gKHkqKDItKCgoeCYweGZmZmYpKnkpJjB4ZmZmZikpKSYweGZmZmY7XHQvLyB5ID09IDEveCBtb2QgMl4xNlxuICAvLyBsYXN0IHN0ZXAgLSBjYWxjdWxhdGUgaW52ZXJzZSBtb2QgRFYgZGlyZWN0bHk7XG4gIC8vIGFzc3VtZXMgMTYgPCBEQiA8PSAzMiBhbmQgYXNzdW1lcyBhYmlsaXR5IHRvIGhhbmRsZSA0OC1iaXQgaW50c1xuICB5ID0gKHkqKDIteCp5JXRoaXMuRFYpKSV0aGlzLkRWO1x0XHQvLyB5ID09IDEveCBtb2QgMl5kYml0c1xuICAvLyB3ZSByZWFsbHkgd2FudCB0aGUgbmVnYXRpdmUgaW52ZXJzZSwgYW5kIC1EViA8IHkgPCBEVlxuICByZXR1cm4gKHk+MCk/dGhpcy5EVi15Oi15O1xufVxuXG4vLyBNb250Z29tZXJ5IHJlZHVjdGlvblxuZnVuY3Rpb24gTW9udGdvbWVyeShtKSB7XG4gIHRoaXMubSA9IG07XG4gIHRoaXMubXAgPSBtLmludkRpZ2l0KCk7XG4gIHRoaXMubXBsID0gdGhpcy5tcCYweDdmZmY7XG4gIHRoaXMubXBoID0gdGhpcy5tcD4+MTU7XG4gIHRoaXMudW0gPSAoMTw8KG0uREItMTUpKS0xO1xuICB0aGlzLm10MiA9IDIqbS50O1xufVxuXG4vLyB4UiBtb2QgbVxuZnVuY3Rpb24gbW9udENvbnZlcnQoeCkge1xuICB2YXIgciA9IG5iaSgpO1xuICB4LmFicygpLmRsU2hpZnRUbyh0aGlzLm0udCxyKTtcbiAgci5kaXZSZW1Ubyh0aGlzLm0sbnVsbCxyKTtcbiAgaWYoeC5zIDwgMCAmJiByLmNvbXBhcmVUbyhCaWdJbnRlZ2VyLlpFUk8pID4gMCkgdGhpcy5tLnN1YlRvKHIscik7XG4gIHJldHVybiByO1xufVxuXG4vLyB4L1IgbW9kIG1cbmZ1bmN0aW9uIG1vbnRSZXZlcnQoeCkge1xuICB2YXIgciA9IG5iaSgpO1xuICB4LmNvcHlUbyhyKTtcbiAgdGhpcy5yZWR1Y2Uocik7XG4gIHJldHVybiByO1xufVxuXG4vLyB4ID0geC9SIG1vZCBtIChIQUMgMTQuMzIpXG5mdW5jdGlvbiBtb250UmVkdWNlKHgpIHtcbiAgd2hpbGUoeC50IDw9IHRoaXMubXQyKVx0Ly8gcGFkIHggc28gYW0gaGFzIGVub3VnaCByb29tIGxhdGVyXG4gICAgeFt4LnQrK10gPSAwO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5tLnQ7ICsraSkge1xuICAgIC8vIGZhc3RlciB3YXkgb2YgY2FsY3VsYXRpbmcgdTAgPSB4W2ldKm1wIG1vZCBEVlxuICAgIHZhciBqID0geFtpXSYweDdmZmY7XG4gICAgdmFyIHUwID0gKGoqdGhpcy5tcGwrKCgoaip0aGlzLm1waCsoeFtpXT4+MTUpKnRoaXMubXBsKSZ0aGlzLnVtKTw8MTUpKSZ4LkRNO1xuICAgIC8vIHVzZSBhbSB0byBjb21iaW5lIHRoZSBtdWx0aXBseS1zaGlmdC1hZGQgaW50byBvbmUgY2FsbFxuICAgIGogPSBpK3RoaXMubS50O1xuICAgIHhbal0gKz0gdGhpcy5tLmFtKDAsdTAseCxpLDAsdGhpcy5tLnQpO1xuICAgIC8vIHByb3BhZ2F0ZSBjYXJyeVxuICAgIHdoaWxlKHhbal0gPj0geC5EVikgeyB4W2pdIC09IHguRFY7IHhbKytqXSsrOyB9XG4gIH1cbiAgeC5jbGFtcCgpO1xuICB4LmRyU2hpZnRUbyh0aGlzLm0udCx4KTtcbiAgaWYoeC5jb21wYXJlVG8odGhpcy5tKSA+PSAwKSB4LnN1YlRvKHRoaXMubSx4KTtcbn1cblxuLy8gciA9IFwieF4yL1IgbW9kIG1cIjsgeCAhPSByXG5mdW5jdGlvbiBtb250U3FyVG8oeCxyKSB7IHguc3F1YXJlVG8ocik7IHRoaXMucmVkdWNlKHIpOyB9XG5cbi8vIHIgPSBcInh5L1IgbW9kIG1cIjsgeCx5ICE9IHJcbmZ1bmN0aW9uIG1vbnRNdWxUbyh4LHkscikgeyB4Lm11bHRpcGx5VG8oeSxyKTsgdGhpcy5yZWR1Y2Uocik7IH1cblxuTW9udGdvbWVyeS5wcm90b3R5cGUuY29udmVydCA9IG1vbnRDb252ZXJ0O1xuTW9udGdvbWVyeS5wcm90b3R5cGUucmV2ZXJ0ID0gbW9udFJldmVydDtcbk1vbnRnb21lcnkucHJvdG90eXBlLnJlZHVjZSA9IG1vbnRSZWR1Y2U7XG5Nb250Z29tZXJ5LnByb3RvdHlwZS5tdWxUbyA9IG1vbnRNdWxUbztcbk1vbnRnb21lcnkucHJvdG90eXBlLnNxclRvID0gbW9udFNxclRvO1xuXG4vLyAocHJvdGVjdGVkKSB0cnVlIGlmZiB0aGlzIGlzIGV2ZW5cbmZ1bmN0aW9uIGJucElzRXZlbigpIHsgcmV0dXJuICgodGhpcy50PjApPyh0aGlzWzBdJjEpOnRoaXMucykgPT0gMDsgfVxuXG4vLyAocHJvdGVjdGVkKSB0aGlzXmUsIGUgPCAyXjMyLCBkb2luZyBzcXIgYW5kIG11bCB3aXRoIFwiclwiIChIQUMgMTQuNzkpXG5mdW5jdGlvbiBibnBFeHAoZSx6KSB7XG4gIGlmKGUgPiAweGZmZmZmZmZmIHx8IGUgPCAxKSByZXR1cm4gQmlnSW50ZWdlci5PTkU7XG4gIHZhciByID0gbmJpKCksIHIyID0gbmJpKCksIGcgPSB6LmNvbnZlcnQodGhpcyksIGkgPSBuYml0cyhlKS0xO1xuICBnLmNvcHlUbyhyKTtcbiAgd2hpbGUoLS1pID49IDApIHtcbiAgICB6LnNxclRvKHIscjIpO1xuICAgIGlmKChlJigxPDxpKSkgPiAwKSB6Lm11bFRvKHIyLGcscik7XG4gICAgZWxzZSB7IHZhciB0ID0gcjsgciA9IHIyOyByMiA9IHQ7IH1cbiAgfVxuICByZXR1cm4gei5yZXZlcnQocik7XG59XG5cbi8vIChwdWJsaWMpIHRoaXNeZSAlIG0sIDAgPD0gZSA8IDJeMzJcbmZ1bmN0aW9uIGJuTW9kUG93SW50KGUsbSkge1xuICB2YXIgejtcbiAgaWYoZSA8IDI1NiB8fCBtLmlzRXZlbigpKSB6ID0gbmV3IENsYXNzaWMobSk7IGVsc2UgeiA9IG5ldyBNb250Z29tZXJ5KG0pO1xuICByZXR1cm4gdGhpcy5leHAoZSx6KTtcbn1cblxuLy8gcHJvdGVjdGVkXG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5jb3B5VG8gPSBibnBDb3B5VG87XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tSW50ID0gYm5wRnJvbUludDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmZyb21TdHJpbmcgPSBibnBGcm9tU3RyaW5nO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuY2xhbXAgPSBibnBDbGFtcDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmRsU2hpZnRUbyA9IGJucERMU2hpZnRUbztcbkJpZ0ludGVnZXIucHJvdG90eXBlLmRyU2hpZnRUbyA9IGJucERSU2hpZnRUbztcbkJpZ0ludGVnZXIucHJvdG90eXBlLmxTaGlmdFRvID0gYm5wTFNoaWZ0VG87XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5yU2hpZnRUbyA9IGJucFJTaGlmdFRvO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuc3ViVG8gPSBibnBTdWJUbztcbkJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5VG8gPSBibnBNdWx0aXBseVRvO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuc3F1YXJlVG8gPSBibnBTcXVhcmVUbztcbkJpZ0ludGVnZXIucHJvdG90eXBlLmRpdlJlbVRvID0gYm5wRGl2UmVtVG87XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5pbnZEaWdpdCA9IGJucEludkRpZ2l0O1xuQmlnSW50ZWdlci5wcm90b3R5cGUuaXNFdmVuID0gYm5wSXNFdmVuO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZXhwID0gYm5wRXhwO1xuXG4vLyBwdWJsaWNcbkJpZ0ludGVnZXIucHJvdG90eXBlLnRvU3RyaW5nID0gYm5Ub1N0cmluZztcbkJpZ0ludGVnZXIucHJvdG90eXBlLm5lZ2F0ZSA9IGJuTmVnYXRlO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuYWJzID0gYm5BYnM7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5jb21wYXJlVG8gPSBibkNvbXBhcmVUbztcbkJpZ0ludGVnZXIucHJvdG90eXBlLmJpdExlbmd0aCA9IGJuQml0TGVuZ3RoO1xuQmlnSW50ZWdlci5wcm90b3R5cGUubW9kID0gYm5Nb2Q7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RQb3dJbnQgPSBibk1vZFBvd0ludDtcblxuLy8gXCJjb25zdGFudHNcIlxuQmlnSW50ZWdlci5aRVJPID0gbmJ2KDApO1xuQmlnSW50ZWdlci5PTkUgPSBuYnYoMSk7XG5cbi8vIENvcHlyaWdodCAoYykgMjAwNS0yMDA5ICBUb20gV3Vcbi8vIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vLyBTZWUgXCJMSUNFTlNFXCIgZm9yIGRldGFpbHMuXG5cbi8vIEV4dGVuZGVkIEphdmFTY3JpcHQgQk4gZnVuY3Rpb25zLCByZXF1aXJlZCBmb3IgUlNBIHByaXZhdGUgb3BzLlxuXG4vLyBWZXJzaW9uIDEuMTogbmV3IEJpZ0ludGVnZXIoXCIwXCIsIDEwKSByZXR1cm5zIFwicHJvcGVyXCIgemVyb1xuLy8gVmVyc2lvbiAxLjI6IHNxdWFyZSgpIEFQSSwgaXNQcm9iYWJsZVByaW1lIGZpeFxuXG4vLyAocHVibGljKVxuZnVuY3Rpb24gYm5DbG9uZSgpIHsgdmFyIHIgPSBuYmkoKTsgdGhpcy5jb3B5VG8ocik7IHJldHVybiByOyB9XG5cbi8vIChwdWJsaWMpIHJldHVybiB2YWx1ZSBhcyBpbnRlZ2VyXG5mdW5jdGlvbiBibkludFZhbHVlKCkge1xuICBpZih0aGlzLnMgPCAwKSB7XG4gICAgaWYodGhpcy50ID09IDEpIHJldHVybiB0aGlzWzBdLXRoaXMuRFY7XG4gICAgZWxzZSBpZih0aGlzLnQgPT0gMCkgcmV0dXJuIC0xO1xuICB9XG4gIGVsc2UgaWYodGhpcy50ID09IDEpIHJldHVybiB0aGlzWzBdO1xuICBlbHNlIGlmKHRoaXMudCA9PSAwKSByZXR1cm4gMDtcbiAgLy8gYXNzdW1lcyAxNiA8IERCIDwgMzJcbiAgcmV0dXJuICgodGhpc1sxXSYoKDE8PCgzMi10aGlzLkRCKSktMSkpPDx0aGlzLkRCKXx0aGlzWzBdO1xufVxuXG4vLyAocHVibGljKSByZXR1cm4gdmFsdWUgYXMgYnl0ZVxuZnVuY3Rpb24gYm5CeXRlVmFsdWUoKSB7IHJldHVybiAodGhpcy50PT0wKT90aGlzLnM6KHRoaXNbMF08PDI0KT4+MjQ7IH1cblxuLy8gKHB1YmxpYykgcmV0dXJuIHZhbHVlIGFzIHNob3J0IChhc3N1bWVzIERCPj0xNilcbmZ1bmN0aW9uIGJuU2hvcnRWYWx1ZSgpIHsgcmV0dXJuICh0aGlzLnQ9PTApP3RoaXMuczoodGhpc1swXTw8MTYpPj4xNjsgfVxuXG4vLyAocHJvdGVjdGVkKSByZXR1cm4geCBzLnQuIHJeeCA8IERWXG5mdW5jdGlvbiBibnBDaHVua1NpemUocikgeyByZXR1cm4gTWF0aC5mbG9vcihNYXRoLkxOMip0aGlzLkRCL01hdGgubG9nKHIpKTsgfVxuXG4vLyAocHVibGljKSAwIGlmIHRoaXMgPT0gMCwgMSBpZiB0aGlzID4gMFxuZnVuY3Rpb24gYm5TaWdOdW0oKSB7XG4gIGlmKHRoaXMucyA8IDApIHJldHVybiAtMTtcbiAgZWxzZSBpZih0aGlzLnQgPD0gMCB8fCAodGhpcy50ID09IDEgJiYgdGhpc1swXSA8PSAwKSkgcmV0dXJuIDA7XG4gIGVsc2UgcmV0dXJuIDE7XG59XG5cbi8vIChwcm90ZWN0ZWQpIGNvbnZlcnQgdG8gcmFkaXggc3RyaW5nXG5mdW5jdGlvbiBibnBUb1JhZGl4KGIpIHtcbiAgaWYoYiA9PSBudWxsKSBiID0gMTA7XG4gIGlmKHRoaXMuc2lnbnVtKCkgPT0gMCB8fCBiIDwgMiB8fCBiID4gMzYpIHJldHVybiBcIjBcIjtcbiAgdmFyIGNzID0gdGhpcy5jaHVua1NpemUoYik7XG4gIHZhciBhID0gTWF0aC5wb3coYixjcyk7XG4gIHZhciBkID0gbmJ2KGEpLCB5ID0gbmJpKCksIHogPSBuYmkoKSwgciA9IFwiXCI7XG4gIHRoaXMuZGl2UmVtVG8oZCx5LHopO1xuICB3aGlsZSh5LnNpZ251bSgpID4gMCkge1xuICAgIHIgPSAoYSt6LmludFZhbHVlKCkpLnRvU3RyaW5nKGIpLnN1YnN0cigxKSArIHI7XG4gICAgeS5kaXZSZW1UbyhkLHkseik7XG4gIH1cbiAgcmV0dXJuIHouaW50VmFsdWUoKS50b1N0cmluZyhiKSArIHI7XG59XG5cbi8vIChwcm90ZWN0ZWQpIGNvbnZlcnQgZnJvbSByYWRpeCBzdHJpbmdcbmZ1bmN0aW9uIGJucEZyb21SYWRpeChzLGIpIHtcbiAgdGhpcy5mcm9tSW50KDApO1xuICBpZihiID09IG51bGwpIGIgPSAxMDtcbiAgdmFyIGNzID0gdGhpcy5jaHVua1NpemUoYik7XG4gIHZhciBkID0gTWF0aC5wb3coYixjcyksIG1pID0gZmFsc2UsIGogPSAwLCB3ID0gMDtcbiAgZm9yKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgeCA9IGludEF0KHMsaSk7XG4gICAgaWYoeCA8IDApIHtcbiAgICAgIGlmKHMuY2hhckF0KGkpID09IFwiLVwiICYmIHRoaXMuc2lnbnVtKCkgPT0gMCkgbWkgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHcgPSBiKncreDtcbiAgICBpZigrK2ogPj0gY3MpIHtcbiAgICAgIHRoaXMuZE11bHRpcGx5KGQpO1xuICAgICAgdGhpcy5kQWRkT2Zmc2V0KHcsMCk7XG4gICAgICBqID0gMDtcbiAgICAgIHcgPSAwO1xuICAgIH1cbiAgfVxuICBpZihqID4gMCkge1xuICAgIHRoaXMuZE11bHRpcGx5KE1hdGgucG93KGIsaikpO1xuICAgIHRoaXMuZEFkZE9mZnNldCh3LDApO1xuICB9XG4gIGlmKG1pKSBCaWdJbnRlZ2VyLlpFUk8uc3ViVG8odGhpcyx0aGlzKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgYWx0ZXJuYXRlIGNvbnN0cnVjdG9yXG5mdW5jdGlvbiBibnBGcm9tTnVtYmVyKGEsYixjKSB7XG4gIGlmKFwibnVtYmVyXCIgPT0gdHlwZW9mIGIpIHtcbiAgICAvLyBuZXcgQmlnSW50ZWdlcihpbnQsaW50LFJORylcbiAgICBpZihhIDwgMikgdGhpcy5mcm9tSW50KDEpO1xuICAgIGVsc2Uge1xuICAgICAgdGhpcy5mcm9tTnVtYmVyKGEsYyk7XG4gICAgICBpZighdGhpcy50ZXN0Qml0KGEtMSkpXHQvLyBmb3JjZSBNU0Igc2V0XG4gICAgICAgIHRoaXMuYml0d2lzZVRvKEJpZ0ludGVnZXIuT05FLnNoaWZ0TGVmdChhLTEpLG9wX29yLHRoaXMpO1xuICAgICAgaWYodGhpcy5pc0V2ZW4oKSkgdGhpcy5kQWRkT2Zmc2V0KDEsMCk7IC8vIGZvcmNlIG9kZFxuICAgICAgd2hpbGUoIXRoaXMuaXNQcm9iYWJsZVByaW1lKGIpKSB7XG4gICAgICAgIHRoaXMuZEFkZE9mZnNldCgyLDApO1xuICAgICAgICBpZih0aGlzLmJpdExlbmd0aCgpID4gYSkgdGhpcy5zdWJUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYS0xKSx0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gbmV3IEJpZ0ludGVnZXIoaW50LFJORylcbiAgICB2YXIgeCA9IG5ldyBBcnJheSgpLCB0ID0gYSY3O1xuICAgIHgubGVuZ3RoID0gKGE+PjMpKzE7XG4gICAgYi5uZXh0Qnl0ZXMoeCk7XG4gICAgaWYodCA+IDApIHhbMF0gJj0gKCgxPDx0KS0xKTsgZWxzZSB4WzBdID0gMDtcbiAgICB0aGlzLmZyb21TdHJpbmcoeCwyNTYpO1xuICB9XG59XG5cbi8vIChwdWJsaWMpIGNvbnZlcnQgdG8gYmlnZW5kaWFuIGJ5dGUgYXJyYXlcbmZ1bmN0aW9uIGJuVG9CeXRlQXJyYXkoKSB7XG4gIHZhciBpID0gdGhpcy50LCByID0gbmV3IEFycmF5KCk7XG4gIHJbMF0gPSB0aGlzLnM7XG4gIHZhciBwID0gdGhpcy5EQi0oaSp0aGlzLkRCKSU4LCBkLCBrID0gMDtcbiAgaWYoaS0tID4gMCkge1xuICAgIGlmKHAgPCB0aGlzLkRCICYmIChkID0gdGhpc1tpXT4+cCkgIT0gKHRoaXMucyZ0aGlzLkRNKT4+cClcbiAgICAgIHJbaysrXSA9IGR8KHRoaXMuczw8KHRoaXMuREItcCkpO1xuICAgIHdoaWxlKGkgPj0gMCkge1xuICAgICAgaWYocCA8IDgpIHtcbiAgICAgICAgZCA9ICh0aGlzW2ldJigoMTw8cCktMSkpPDwoOC1wKTtcbiAgICAgICAgZCB8PSB0aGlzWy0taV0+PihwKz10aGlzLkRCLTgpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGQgPSAodGhpc1tpXT4+KHAtPTgpKSYweGZmO1xuICAgICAgICBpZihwIDw9IDApIHsgcCArPSB0aGlzLkRCOyAtLWk7IH1cbiAgICAgIH1cbiAgICAgIGlmKChkJjB4ODApICE9IDApIGQgfD0gLTI1NjtcbiAgICAgIGlmKGsgPT0gMCAmJiAodGhpcy5zJjB4ODApICE9IChkJjB4ODApKSArK2s7XG4gICAgICBpZihrID4gMCB8fCBkICE9IHRoaXMucykgcltrKytdID0gZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGJuRXF1YWxzKGEpIHsgcmV0dXJuKHRoaXMuY29tcGFyZVRvKGEpPT0wKTsgfVxuZnVuY3Rpb24gYm5NaW4oYSkgeyByZXR1cm4odGhpcy5jb21wYXJlVG8oYSk8MCk/dGhpczphOyB9XG5mdW5jdGlvbiBibk1heChhKSB7IHJldHVybih0aGlzLmNvbXBhcmVUbyhhKT4wKT90aGlzOmE7IH1cblxuLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgb3AgYSAoYml0d2lzZSlcbmZ1bmN0aW9uIGJucEJpdHdpc2VUbyhhLG9wLHIpIHtcbiAgdmFyIGksIGYsIG0gPSBNYXRoLm1pbihhLnQsdGhpcy50KTtcbiAgZm9yKGkgPSAwOyBpIDwgbTsgKytpKSByW2ldID0gb3AodGhpc1tpXSxhW2ldKTtcbiAgaWYoYS50IDwgdGhpcy50KSB7XG4gICAgZiA9IGEucyZ0aGlzLkRNO1xuICAgIGZvcihpID0gbTsgaSA8IHRoaXMudDsgKytpKSByW2ldID0gb3AodGhpc1tpXSxmKTtcbiAgICByLnQgPSB0aGlzLnQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgZiA9IHRoaXMucyZ0aGlzLkRNO1xuICAgIGZvcihpID0gbTsgaSA8IGEudDsgKytpKSByW2ldID0gb3AoZixhW2ldKTtcbiAgICByLnQgPSBhLnQ7XG4gIH1cbiAgci5zID0gb3AodGhpcy5zLGEucyk7XG4gIHIuY2xhbXAoKTtcbn1cblxuLy8gKHB1YmxpYykgdGhpcyAmIGFcbmZ1bmN0aW9uIG9wX2FuZCh4LHkpIHsgcmV0dXJuIHgmeTsgfVxuZnVuY3Rpb24gYm5BbmQoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLmJpdHdpc2VUbyhhLG9wX2FuZCxyKTsgcmV0dXJuIHI7IH1cblxuLy8gKHB1YmxpYykgdGhpcyB8IGFcbmZ1bmN0aW9uIG9wX29yKHgseSkgeyByZXR1cm4geHx5OyB9XG5mdW5jdGlvbiBibk9yKGEpIHsgdmFyIHIgPSBuYmkoKTsgdGhpcy5iaXR3aXNlVG8oYSxvcF9vcixyKTsgcmV0dXJuIHI7IH1cblxuLy8gKHB1YmxpYykgdGhpcyBeIGFcbmZ1bmN0aW9uIG9wX3hvcih4LHkpIHsgcmV0dXJuIHheeTsgfVxuZnVuY3Rpb24gYm5Yb3IoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLmJpdHdpc2VUbyhhLG9wX3hvcixyKTsgcmV0dXJuIHI7IH1cblxuLy8gKHB1YmxpYykgdGhpcyAmIH5hXG5mdW5jdGlvbiBvcF9hbmRub3QoeCx5KSB7IHJldHVybiB4Jn55OyB9XG5mdW5jdGlvbiBibkFuZE5vdChhKSB7IHZhciByID0gbmJpKCk7IHRoaXMuYml0d2lzZVRvKGEsb3BfYW5kbm90LHIpOyByZXR1cm4gcjsgfVxuXG4vLyAocHVibGljKSB+dGhpc1xuZnVuY3Rpb24gYm5Ob3QoKSB7XG4gIHZhciByID0gbmJpKCk7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnQ7ICsraSkgcltpXSA9IHRoaXMuRE0mfnRoaXNbaV07XG4gIHIudCA9IHRoaXMudDtcbiAgci5zID0gfnRoaXMucztcbiAgcmV0dXJuIHI7XG59XG5cbi8vIChwdWJsaWMpIHRoaXMgPDwgblxuZnVuY3Rpb24gYm5TaGlmdExlZnQobikge1xuICB2YXIgciA9IG5iaSgpO1xuICBpZihuIDwgMCkgdGhpcy5yU2hpZnRUbygtbixyKTsgZWxzZSB0aGlzLmxTaGlmdFRvKG4scik7XG4gIHJldHVybiByO1xufVxuXG4vLyAocHVibGljKSB0aGlzID4+IG5cbmZ1bmN0aW9uIGJuU2hpZnRSaWdodChuKSB7XG4gIHZhciByID0gbmJpKCk7XG4gIGlmKG4gPCAwKSB0aGlzLmxTaGlmdFRvKC1uLHIpOyBlbHNlIHRoaXMuclNoaWZ0VG8obixyKTtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIHJldHVybiBpbmRleCBvZiBsb3dlc3QgMS1iaXQgaW4geCwgeCA8IDJeMzFcbmZ1bmN0aW9uIGxiaXQoeCkge1xuICBpZih4ID09IDApIHJldHVybiAtMTtcbiAgdmFyIHIgPSAwO1xuICBpZigoeCYweGZmZmYpID09IDApIHsgeCA+Pj0gMTY7IHIgKz0gMTY7IH1cbiAgaWYoKHgmMHhmZikgPT0gMCkgeyB4ID4+PSA4OyByICs9IDg7IH1cbiAgaWYoKHgmMHhmKSA9PSAwKSB7IHggPj49IDQ7IHIgKz0gNDsgfVxuICBpZigoeCYzKSA9PSAwKSB7IHggPj49IDI7IHIgKz0gMjsgfVxuICBpZigoeCYxKSA9PSAwKSArK3I7XG4gIHJldHVybiByO1xufVxuXG4vLyAocHVibGljKSByZXR1cm5zIGluZGV4IG9mIGxvd2VzdCAxLWJpdCAob3IgLTEgaWYgbm9uZSlcbmZ1bmN0aW9uIGJuR2V0TG93ZXN0U2V0Qml0KCkge1xuICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy50OyArK2kpXG4gICAgaWYodGhpc1tpXSAhPSAwKSByZXR1cm4gaSp0aGlzLkRCK2xiaXQodGhpc1tpXSk7XG4gIGlmKHRoaXMucyA8IDApIHJldHVybiB0aGlzLnQqdGhpcy5EQjtcbiAgcmV0dXJuIC0xO1xufVxuXG4vLyByZXR1cm4gbnVtYmVyIG9mIDEgYml0cyBpbiB4XG5mdW5jdGlvbiBjYml0KHgpIHtcbiAgdmFyIHIgPSAwO1xuICB3aGlsZSh4ICE9IDApIHsgeCAmPSB4LTE7ICsrcjsgfVxuICByZXR1cm4gcjtcbn1cblxuLy8gKHB1YmxpYykgcmV0dXJuIG51bWJlciBvZiBzZXQgYml0c1xuZnVuY3Rpb24gYm5CaXRDb3VudCgpIHtcbiAgdmFyIHIgPSAwLCB4ID0gdGhpcy5zJnRoaXMuRE07XG4gIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnQ7ICsraSkgciArPSBjYml0KHRoaXNbaV1eeCk7XG4gIHJldHVybiByO1xufVxuXG4vLyAocHVibGljKSB0cnVlIGlmZiBudGggYml0IGlzIHNldFxuZnVuY3Rpb24gYm5UZXN0Qml0KG4pIHtcbiAgdmFyIGogPSBNYXRoLmZsb29yKG4vdGhpcy5EQik7XG4gIGlmKGogPj0gdGhpcy50KSByZXR1cm4odGhpcy5zIT0wKTtcbiAgcmV0dXJuKCh0aGlzW2pdJigxPDwobiV0aGlzLkRCKSkpIT0wKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgdGhpcyBvcCAoMTw8bilcbmZ1bmN0aW9uIGJucENoYW5nZUJpdChuLG9wKSB7XG4gIHZhciByID0gQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KG4pO1xuICB0aGlzLmJpdHdpc2VUbyhyLG9wLHIpO1xuICByZXR1cm4gcjtcbn1cblxuLy8gKHB1YmxpYykgdGhpcyB8ICgxPDxuKVxuZnVuY3Rpb24gYm5TZXRCaXQobikgeyByZXR1cm4gdGhpcy5jaGFuZ2VCaXQobixvcF9vcik7IH1cblxuLy8gKHB1YmxpYykgdGhpcyAmIH4oMTw8bilcbmZ1bmN0aW9uIGJuQ2xlYXJCaXQobikgeyByZXR1cm4gdGhpcy5jaGFuZ2VCaXQobixvcF9hbmRub3QpOyB9XG5cbi8vIChwdWJsaWMpIHRoaXMgXiAoMTw8bilcbmZ1bmN0aW9uIGJuRmxpcEJpdChuKSB7IHJldHVybiB0aGlzLmNoYW5nZUJpdChuLG9wX3hvcik7IH1cblxuLy8gKHByb3RlY3RlZCkgciA9IHRoaXMgKyBhXG5mdW5jdGlvbiBibnBBZGRUbyhhLHIpIHtcbiAgdmFyIGkgPSAwLCBjID0gMCwgbSA9IE1hdGgubWluKGEudCx0aGlzLnQpO1xuICB3aGlsZShpIDwgbSkge1xuICAgIGMgKz0gdGhpc1tpXSthW2ldO1xuICAgIHJbaSsrXSA9IGMmdGhpcy5ETTtcbiAgICBjID4+PSB0aGlzLkRCO1xuICB9XG4gIGlmKGEudCA8IHRoaXMudCkge1xuICAgIGMgKz0gYS5zO1xuICAgIHdoaWxlKGkgPCB0aGlzLnQpIHtcbiAgICAgIGMgKz0gdGhpc1tpXTtcbiAgICAgIHJbaSsrXSA9IGMmdGhpcy5ETTtcbiAgICAgIGMgPj49IHRoaXMuREI7XG4gICAgfVxuICAgIGMgKz0gdGhpcy5zO1xuICB9XG4gIGVsc2Uge1xuICAgIGMgKz0gdGhpcy5zO1xuICAgIHdoaWxlKGkgPCBhLnQpIHtcbiAgICAgIGMgKz0gYVtpXTtcbiAgICAgIHJbaSsrXSA9IGMmdGhpcy5ETTtcbiAgICAgIGMgPj49IHRoaXMuREI7XG4gICAgfVxuICAgIGMgKz0gYS5zO1xuICB9XG4gIHIucyA9IChjPDApPy0xOjA7XG4gIGlmKGMgPiAwKSByW2krK10gPSBjO1xuICBlbHNlIGlmKGMgPCAtMSkgcltpKytdID0gdGhpcy5EVitjO1xuICByLnQgPSBpO1xuICByLmNsYW1wKCk7XG59XG5cbi8vIChwdWJsaWMpIHRoaXMgKyBhXG5mdW5jdGlvbiBibkFkZChhKSB7IHZhciByID0gbmJpKCk7IHRoaXMuYWRkVG8oYSxyKTsgcmV0dXJuIHI7IH1cblxuLy8gKHB1YmxpYykgdGhpcyAtIGFcbmZ1bmN0aW9uIGJuU3VidHJhY3QoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLnN1YlRvKGEscik7IHJldHVybiByOyB9XG5cbi8vIChwdWJsaWMpIHRoaXMgKiBhXG5mdW5jdGlvbiBibk11bHRpcGx5KGEpIHsgdmFyIHIgPSBuYmkoKTsgdGhpcy5tdWx0aXBseVRvKGEscik7IHJldHVybiByOyB9XG5cbi8vIChwdWJsaWMpIHRoaXNeMlxuZnVuY3Rpb24gYm5TcXVhcmUoKSB7IHZhciByID0gbmJpKCk7IHRoaXMuc3F1YXJlVG8ocik7IHJldHVybiByOyB9XG5cbi8vIChwdWJsaWMpIHRoaXMgLyBhXG5mdW5jdGlvbiBibkRpdmlkZShhKSB7IHZhciByID0gbmJpKCk7IHRoaXMuZGl2UmVtVG8oYSxyLG51bGwpOyByZXR1cm4gcjsgfVxuXG4vLyAocHVibGljKSB0aGlzICUgYVxuZnVuY3Rpb24gYm5SZW1haW5kZXIoYSkgeyB2YXIgciA9IG5iaSgpOyB0aGlzLmRpdlJlbVRvKGEsbnVsbCxyKTsgcmV0dXJuIHI7IH1cblxuLy8gKHB1YmxpYykgW3RoaXMvYSx0aGlzJWFdXG5mdW5jdGlvbiBibkRpdmlkZUFuZFJlbWFpbmRlcihhKSB7XG4gIHZhciBxID0gbmJpKCksIHIgPSBuYmkoKTtcbiAgdGhpcy5kaXZSZW1UbyhhLHEscik7XG4gIHJldHVybiBuZXcgQXJyYXkocSxyKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgdGhpcyAqPSBuLCB0aGlzID49IDAsIDEgPCBuIDwgRFZcbmZ1bmN0aW9uIGJucERNdWx0aXBseShuKSB7XG4gIHRoaXNbdGhpcy50XSA9IHRoaXMuYW0oMCxuLTEsdGhpcywwLDAsdGhpcy50KTtcbiAgKyt0aGlzLnQ7XG4gIHRoaXMuY2xhbXAoKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgdGhpcyArPSBuIDw8IHcgd29yZHMsIHRoaXMgPj0gMFxuZnVuY3Rpb24gYm5wREFkZE9mZnNldChuLHcpIHtcbiAgaWYobiA9PSAwKSByZXR1cm47XG4gIHdoaWxlKHRoaXMudCA8PSB3KSB0aGlzW3RoaXMudCsrXSA9IDA7XG4gIHRoaXNbd10gKz0gbjtcbiAgd2hpbGUodGhpc1t3XSA+PSB0aGlzLkRWKSB7XG4gICAgdGhpc1t3XSAtPSB0aGlzLkRWO1xuICAgIGlmKCsrdyA+PSB0aGlzLnQpIHRoaXNbdGhpcy50KytdID0gMDtcbiAgICArK3RoaXNbd107XG4gIH1cbn1cblxuLy8gQSBcIm51bGxcIiByZWR1Y2VyXG5mdW5jdGlvbiBOdWxsRXhwKCkge31cbmZ1bmN0aW9uIG5Ob3AoeCkgeyByZXR1cm4geDsgfVxuZnVuY3Rpb24gbk11bFRvKHgseSxyKSB7IHgubXVsdGlwbHlUbyh5LHIpOyB9XG5mdW5jdGlvbiBuU3FyVG8oeCxyKSB7IHguc3F1YXJlVG8ocik7IH1cblxuTnVsbEV4cC5wcm90b3R5cGUuY29udmVydCA9IG5Ob3A7XG5OdWxsRXhwLnByb3RvdHlwZS5yZXZlcnQgPSBuTm9wO1xuTnVsbEV4cC5wcm90b3R5cGUubXVsVG8gPSBuTXVsVG87XG5OdWxsRXhwLnByb3RvdHlwZS5zcXJUbyA9IG5TcXJUbztcblxuLy8gKHB1YmxpYykgdGhpc15lXG5mdW5jdGlvbiBiblBvdyhlKSB7IHJldHVybiB0aGlzLmV4cChlLG5ldyBOdWxsRXhwKCkpOyB9XG5cbi8vIChwcm90ZWN0ZWQpIHIgPSBsb3dlciBuIHdvcmRzIG9mIFwidGhpcyAqIGFcIiwgYS50IDw9IG5cbi8vIFwidGhpc1wiIHNob3VsZCBiZSB0aGUgbGFyZ2VyIG9uZSBpZiBhcHByb3ByaWF0ZS5cbmZ1bmN0aW9uIGJucE11bHRpcGx5TG93ZXJUbyhhLG4scikge1xuICB2YXIgaSA9IE1hdGgubWluKHRoaXMudCthLnQsbik7XG4gIHIucyA9IDA7IC8vIGFzc3VtZXMgYSx0aGlzID49IDBcbiAgci50ID0gaTtcbiAgd2hpbGUoaSA+IDApIHJbLS1pXSA9IDA7XG4gIHZhciBqO1xuICBmb3IoaiA9IHIudC10aGlzLnQ7IGkgPCBqOyArK2kpIHJbaSt0aGlzLnRdID0gdGhpcy5hbSgwLGFbaV0scixpLDAsdGhpcy50KTtcbiAgZm9yKGogPSBNYXRoLm1pbihhLnQsbik7IGkgPCBqOyArK2kpIHRoaXMuYW0oMCxhW2ldLHIsaSwwLG4taSk7XG4gIHIuY2xhbXAoKTtcbn1cblxuLy8gKHByb3RlY3RlZCkgciA9IFwidGhpcyAqIGFcIiB3aXRob3V0IGxvd2VyIG4gd29yZHMsIG4gPiAwXG4vLyBcInRoaXNcIiBzaG91bGQgYmUgdGhlIGxhcmdlciBvbmUgaWYgYXBwcm9wcmlhdGUuXG5mdW5jdGlvbiBibnBNdWx0aXBseVVwcGVyVG8oYSxuLHIpIHtcbiAgLS1uO1xuICB2YXIgaSA9IHIudCA9IHRoaXMudCthLnQtbjtcbiAgci5zID0gMDsgLy8gYXNzdW1lcyBhLHRoaXMgPj0gMFxuICB3aGlsZSgtLWkgPj0gMCkgcltpXSA9IDA7XG4gIGZvcihpID0gTWF0aC5tYXgobi10aGlzLnQsMCk7IGkgPCBhLnQ7ICsraSlcbiAgICByW3RoaXMudCtpLW5dID0gdGhpcy5hbShuLWksYVtpXSxyLDAsMCx0aGlzLnQraS1uKTtcbiAgci5jbGFtcCgpO1xuICByLmRyU2hpZnRUbygxLHIpO1xufVxuXG4vLyBCYXJyZXR0IG1vZHVsYXIgcmVkdWN0aW9uXG5mdW5jdGlvbiBCYXJyZXR0KG0pIHtcbiAgLy8gc2V0dXAgQmFycmV0dFxuICB0aGlzLnIyID0gbmJpKCk7XG4gIHRoaXMucTMgPSBuYmkoKTtcbiAgQmlnSW50ZWdlci5PTkUuZGxTaGlmdFRvKDIqbS50LHRoaXMucjIpO1xuICB0aGlzLm11ID0gdGhpcy5yMi5kaXZpZGUobSk7XG4gIHRoaXMubSA9IG07XG59XG5cbmZ1bmN0aW9uIGJhcnJldHRDb252ZXJ0KHgpIHtcbiAgaWYoeC5zIDwgMCB8fCB4LnQgPiAyKnRoaXMubS50KSByZXR1cm4geC5tb2QodGhpcy5tKTtcbiAgZWxzZSBpZih4LmNvbXBhcmVUbyh0aGlzLm0pIDwgMCkgcmV0dXJuIHg7XG4gIGVsc2UgeyB2YXIgciA9IG5iaSgpOyB4LmNvcHlUbyhyKTsgdGhpcy5yZWR1Y2Uocik7IHJldHVybiByOyB9XG59XG5cbmZ1bmN0aW9uIGJhcnJldHRSZXZlcnQoeCkgeyByZXR1cm4geDsgfVxuXG4vLyB4ID0geCBtb2QgbSAoSEFDIDE0LjQyKVxuZnVuY3Rpb24gYmFycmV0dFJlZHVjZSh4KSB7XG4gIHguZHJTaGlmdFRvKHRoaXMubS50LTEsdGhpcy5yMik7XG4gIGlmKHgudCA+IHRoaXMubS50KzEpIHsgeC50ID0gdGhpcy5tLnQrMTsgeC5jbGFtcCgpOyB9XG4gIHRoaXMubXUubXVsdGlwbHlVcHBlclRvKHRoaXMucjIsdGhpcy5tLnQrMSx0aGlzLnEzKTtcbiAgdGhpcy5tLm11bHRpcGx5TG93ZXJUbyh0aGlzLnEzLHRoaXMubS50KzEsdGhpcy5yMik7XG4gIHdoaWxlKHguY29tcGFyZVRvKHRoaXMucjIpIDwgMCkgeC5kQWRkT2Zmc2V0KDEsdGhpcy5tLnQrMSk7XG4gIHguc3ViVG8odGhpcy5yMix4KTtcbiAgd2hpbGUoeC5jb21wYXJlVG8odGhpcy5tKSA+PSAwKSB4LnN1YlRvKHRoaXMubSx4KTtcbn1cblxuLy8gciA9IHheMiBtb2QgbTsgeCAhPSByXG5mdW5jdGlvbiBiYXJyZXR0U3FyVG8oeCxyKSB7IHguc3F1YXJlVG8ocik7IHRoaXMucmVkdWNlKHIpOyB9XG5cbi8vIHIgPSB4KnkgbW9kIG07IHgseSAhPSByXG5mdW5jdGlvbiBiYXJyZXR0TXVsVG8oeCx5LHIpIHsgeC5tdWx0aXBseVRvKHkscik7IHRoaXMucmVkdWNlKHIpOyB9XG5cbkJhcnJldHQucHJvdG90eXBlLmNvbnZlcnQgPSBiYXJyZXR0Q29udmVydDtcbkJhcnJldHQucHJvdG90eXBlLnJldmVydCA9IGJhcnJldHRSZXZlcnQ7XG5CYXJyZXR0LnByb3RvdHlwZS5yZWR1Y2UgPSBiYXJyZXR0UmVkdWNlO1xuQmFycmV0dC5wcm90b3R5cGUubXVsVG8gPSBiYXJyZXR0TXVsVG87XG5CYXJyZXR0LnByb3RvdHlwZS5zcXJUbyA9IGJhcnJldHRTcXJUbztcblxuLy8gKHB1YmxpYykgdGhpc15lICUgbSAoSEFDIDE0Ljg1KVxuZnVuY3Rpb24gYm5Nb2RQb3coZSxtKSB7XG4gIHZhciBpID0gZS5iaXRMZW5ndGgoKSwgaywgciA9IG5idigxKSwgejtcbiAgaWYoaSA8PSAwKSByZXR1cm4gcjtcbiAgZWxzZSBpZihpIDwgMTgpIGsgPSAxO1xuICBlbHNlIGlmKGkgPCA0OCkgayA9IDM7XG4gIGVsc2UgaWYoaSA8IDE0NCkgayA9IDQ7XG4gIGVsc2UgaWYoaSA8IDc2OCkgayA9IDU7XG4gIGVsc2UgayA9IDY7XG4gIGlmKGkgPCA4KVxuICAgIHogPSBuZXcgQ2xhc3NpYyhtKTtcbiAgZWxzZSBpZihtLmlzRXZlbigpKVxuICAgIHogPSBuZXcgQmFycmV0dChtKTtcbiAgZWxzZVxuICAgIHogPSBuZXcgTW9udGdvbWVyeShtKTtcblxuICAvLyBwcmVjb21wdXRhdGlvblxuICB2YXIgZyA9IG5ldyBBcnJheSgpLCBuID0gMywgazEgPSBrLTEsIGttID0gKDE8PGspLTE7XG4gIGdbMV0gPSB6LmNvbnZlcnQodGhpcyk7XG4gIGlmKGsgPiAxKSB7XG4gICAgdmFyIGcyID0gbmJpKCk7XG4gICAgei5zcXJUbyhnWzFdLGcyKTtcbiAgICB3aGlsZShuIDw9IGttKSB7XG4gICAgICBnW25dID0gbmJpKCk7XG4gICAgICB6Lm11bFRvKGcyLGdbbi0yXSxnW25dKTtcbiAgICAgIG4gKz0gMjtcbiAgICB9XG4gIH1cblxuICB2YXIgaiA9IGUudC0xLCB3LCBpczEgPSB0cnVlLCByMiA9IG5iaSgpLCB0O1xuICBpID0gbmJpdHMoZVtqXSktMTtcbiAgd2hpbGUoaiA+PSAwKSB7XG4gICAgaWYoaSA+PSBrMSkgdyA9IChlW2pdPj4oaS1rMSkpJmttO1xuICAgIGVsc2Uge1xuICAgICAgdyA9IChlW2pdJigoMTw8KGkrMSkpLTEpKTw8KGsxLWkpO1xuICAgICAgaWYoaiA+IDApIHcgfD0gZVtqLTFdPj4odGhpcy5EQitpLWsxKTtcbiAgICB9XG5cbiAgICBuID0gaztcbiAgICB3aGlsZSgodyYxKSA9PSAwKSB7IHcgPj49IDE7IC0tbjsgfVxuICAgIGlmKChpIC09IG4pIDwgMCkgeyBpICs9IHRoaXMuREI7IC0tajsgfVxuICAgIGlmKGlzMSkge1x0Ly8gcmV0ID09IDEsIGRvbid0IGJvdGhlciBzcXVhcmluZyBvciBtdWx0aXBseWluZyBpdFxuICAgICAgZ1t3XS5jb3B5VG8ocik7XG4gICAgICBpczEgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB3aGlsZShuID4gMSkgeyB6LnNxclRvKHIscjIpOyB6LnNxclRvKHIyLHIpOyBuIC09IDI7IH1cbiAgICAgIGlmKG4gPiAwKSB6LnNxclRvKHIscjIpOyBlbHNlIHsgdCA9IHI7IHIgPSByMjsgcjIgPSB0OyB9XG4gICAgICB6Lm11bFRvKHIyLGdbd10scik7XG4gICAgfVxuXG4gICAgd2hpbGUoaiA+PSAwICYmIChlW2pdJigxPDxpKSkgPT0gMCkge1xuICAgICAgei5zcXJUbyhyLHIyKTsgdCA9IHI7IHIgPSByMjsgcjIgPSB0O1xuICAgICAgaWYoLS1pIDwgMCkgeyBpID0gdGhpcy5EQi0xOyAtLWo7IH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHoucmV2ZXJ0KHIpO1xufVxuXG4vLyAocHVibGljKSBnY2QodGhpcyxhKSAoSEFDIDE0LjU0KVxuZnVuY3Rpb24gYm5HQ0QoYSkge1xuICB2YXIgeCA9ICh0aGlzLnM8MCk/dGhpcy5uZWdhdGUoKTp0aGlzLmNsb25lKCk7XG4gIHZhciB5ID0gKGEuczwwKT9hLm5lZ2F0ZSgpOmEuY2xvbmUoKTtcbiAgaWYoeC5jb21wYXJlVG8oeSkgPCAwKSB7IHZhciB0ID0geDsgeCA9IHk7IHkgPSB0OyB9XG4gIHZhciBpID0geC5nZXRMb3dlc3RTZXRCaXQoKSwgZyA9IHkuZ2V0TG93ZXN0U2V0Qml0KCk7XG4gIGlmKGcgPCAwKSByZXR1cm4geDtcbiAgaWYoaSA8IGcpIGcgPSBpO1xuICBpZihnID4gMCkge1xuICAgIHguclNoaWZ0VG8oZyx4KTtcbiAgICB5LnJTaGlmdFRvKGcseSk7XG4gIH1cbiAgd2hpbGUoeC5zaWdudW0oKSA+IDApIHtcbiAgICBpZigoaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCkpID4gMCkgeC5yU2hpZnRUbyhpLHgpO1xuICAgIGlmKChpID0geS5nZXRMb3dlc3RTZXRCaXQoKSkgPiAwKSB5LnJTaGlmdFRvKGkseSk7XG4gICAgaWYoeC5jb21wYXJlVG8oeSkgPj0gMCkge1xuICAgICAgeC5zdWJUbyh5LHgpO1xuICAgICAgeC5yU2hpZnRUbygxLHgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHkuc3ViVG8oeCx5KTtcbiAgICAgIHkuclNoaWZ0VG8oMSx5KTtcbiAgICB9XG4gIH1cbiAgaWYoZyA+IDApIHkubFNoaWZ0VG8oZyx5KTtcbiAgcmV0dXJuIHk7XG59XG5cbi8vIChwcm90ZWN0ZWQpIHRoaXMgJSBuLCBuIDwgMl4yNlxuZnVuY3Rpb24gYm5wTW9kSW50KG4pIHtcbiAgaWYobiA8PSAwKSByZXR1cm4gMDtcbiAgdmFyIGQgPSB0aGlzLkRWJW4sIHIgPSAodGhpcy5zPDApP24tMTowO1xuICBpZih0aGlzLnQgPiAwKVxuICAgIGlmKGQgPT0gMCkgciA9IHRoaXNbMF0lbjtcbiAgICBlbHNlIGZvcih2YXIgaSA9IHRoaXMudC0xOyBpID49IDA7IC0taSkgciA9IChkKnIrdGhpc1tpXSklbjtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIChwdWJsaWMpIDEvdGhpcyAlIG0gKEhBQyAxNC42MSlcbmZ1bmN0aW9uIGJuTW9kSW52ZXJzZShtKSB7XG4gIHZhciBhYyA9IG0uaXNFdmVuKCk7XG4gIGlmKCh0aGlzLmlzRXZlbigpICYmIGFjKSB8fCBtLnNpZ251bSgpID09IDApIHJldHVybiBCaWdJbnRlZ2VyLlpFUk87XG4gIHZhciB1ID0gbS5jbG9uZSgpLCB2ID0gdGhpcy5jbG9uZSgpO1xuICB2YXIgYSA9IG5idigxKSwgYiA9IG5idigwKSwgYyA9IG5idigwKSwgZCA9IG5idigxKTtcbiAgd2hpbGUodS5zaWdudW0oKSAhPSAwKSB7XG4gICAgd2hpbGUodS5pc0V2ZW4oKSkge1xuICAgICAgdS5yU2hpZnRUbygxLHUpO1xuICAgICAgaWYoYWMpIHtcbiAgICAgICAgaWYoIWEuaXNFdmVuKCkgfHwgIWIuaXNFdmVuKCkpIHsgYS5hZGRUbyh0aGlzLGEpOyBiLnN1YlRvKG0sYik7IH1cbiAgICAgICAgYS5yU2hpZnRUbygxLGEpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZighYi5pc0V2ZW4oKSkgYi5zdWJUbyhtLGIpO1xuICAgICAgYi5yU2hpZnRUbygxLGIpO1xuICAgIH1cbiAgICB3aGlsZSh2LmlzRXZlbigpKSB7XG4gICAgICB2LnJTaGlmdFRvKDEsdik7XG4gICAgICBpZihhYykge1xuICAgICAgICBpZighYy5pc0V2ZW4oKSB8fCAhZC5pc0V2ZW4oKSkgeyBjLmFkZFRvKHRoaXMsYyk7IGQuc3ViVG8obSxkKTsgfVxuICAgICAgICBjLnJTaGlmdFRvKDEsYyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKCFkLmlzRXZlbigpKSBkLnN1YlRvKG0sZCk7XG4gICAgICBkLnJTaGlmdFRvKDEsZCk7XG4gICAgfVxuICAgIGlmKHUuY29tcGFyZVRvKHYpID49IDApIHtcbiAgICAgIHUuc3ViVG8odix1KTtcbiAgICAgIGlmKGFjKSBhLnN1YlRvKGMsYSk7XG4gICAgICBiLnN1YlRvKGQsYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdi5zdWJUbyh1LHYpO1xuICAgICAgaWYoYWMpIGMuc3ViVG8oYSxjKTtcbiAgICAgIGQuc3ViVG8oYixkKTtcbiAgICB9XG4gIH1cbiAgaWYodi5jb21wYXJlVG8oQmlnSW50ZWdlci5PTkUpICE9IDApIHJldHVybiBCaWdJbnRlZ2VyLlpFUk87XG4gIGlmKGQuY29tcGFyZVRvKG0pID49IDApIHJldHVybiBkLnN1YnRyYWN0KG0pO1xuICBpZihkLnNpZ251bSgpIDwgMCkgZC5hZGRUbyhtLGQpOyBlbHNlIHJldHVybiBkO1xuICBpZihkLnNpZ251bSgpIDwgMCkgcmV0dXJuIGQuYWRkKG0pOyBlbHNlIHJldHVybiBkO1xufVxuXG52YXIgbG93cHJpbWVzID0gWzIsMyw1LDcsMTEsMTMsMTcsMTksMjMsMjksMzEsMzcsNDEsNDMsNDcsNTMsNTksNjEsNjcsNzEsNzMsNzksODMsODksOTcsMTAxLDEwMywxMDcsMTA5LDExMywxMjcsMTMxLDEzNywxMzksMTQ5LDE1MSwxNTcsMTYzLDE2NywxNzMsMTc5LDE4MSwxOTEsMTkzLDE5NywxOTksMjExLDIyMywyMjcsMjI5LDIzMywyMzksMjQxLDI1MSwyNTcsMjYzLDI2OSwyNzEsMjc3LDI4MSwyODMsMjkzLDMwNywzMTEsMzEzLDMxNywzMzEsMzM3LDM0NywzNDksMzUzLDM1OSwzNjcsMzczLDM3OSwzODMsMzg5LDM5Nyw0MDEsNDA5LDQxOSw0MjEsNDMxLDQzMyw0MzksNDQzLDQ0OSw0NTcsNDYxLDQ2Myw0NjcsNDc5LDQ4Nyw0OTEsNDk5LDUwMyw1MDksNTIxLDUyMyw1NDEsNTQ3LDU1Nyw1NjMsNTY5LDU3MSw1NzcsNTg3LDU5Myw1OTksNjAxLDYwNyw2MTMsNjE3LDYxOSw2MzEsNjQxLDY0Myw2NDcsNjUzLDY1OSw2NjEsNjczLDY3Nyw2ODMsNjkxLDcwMSw3MDksNzE5LDcyNyw3MzMsNzM5LDc0Myw3NTEsNzU3LDc2MSw3NjksNzczLDc4Nyw3OTcsODA5LDgxMSw4MjEsODIzLDgyNyw4MjksODM5LDg1Myw4NTcsODU5LDg2Myw4NzcsODgxLDg4Myw4ODcsOTA3LDkxMSw5MTksOTI5LDkzNyw5NDEsOTQ3LDk1Myw5NjcsOTcxLDk3Nyw5ODMsOTkxLDk5N107XG52YXIgbHBsaW0gPSAoMTw8MjYpL2xvd3ByaW1lc1tsb3dwcmltZXMubGVuZ3RoLTFdO1xuXG4vLyAocHVibGljKSB0ZXN0IHByaW1hbGl0eSB3aXRoIGNlcnRhaW50eSA+PSAxLS41XnRcbmZ1bmN0aW9uIGJuSXNQcm9iYWJsZVByaW1lKHQpIHtcbiAgdmFyIGksIHggPSB0aGlzLmFicygpO1xuICBpZih4LnQgPT0gMSAmJiB4WzBdIDw9IGxvd3ByaW1lc1tsb3dwcmltZXMubGVuZ3RoLTFdKSB7XG4gICAgZm9yKGkgPSAwOyBpIDwgbG93cHJpbWVzLmxlbmd0aDsgKytpKVxuICAgICAgaWYoeFswXSA9PSBsb3dwcmltZXNbaV0pIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZih4LmlzRXZlbigpKSByZXR1cm4gZmFsc2U7XG4gIGkgPSAxO1xuICB3aGlsZShpIDwgbG93cHJpbWVzLmxlbmd0aCkge1xuICAgIHZhciBtID0gbG93cHJpbWVzW2ldLCBqID0gaSsxO1xuICAgIHdoaWxlKGogPCBsb3dwcmltZXMubGVuZ3RoICYmIG0gPCBscGxpbSkgbSAqPSBsb3dwcmltZXNbaisrXTtcbiAgICBtID0geC5tb2RJbnQobSk7XG4gICAgd2hpbGUoaSA8IGopIGlmKG0lbG93cHJpbWVzW2krK10gPT0gMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB4Lm1pbGxlclJhYmluKHQpO1xufVxuXG4vLyAocHJvdGVjdGVkKSB0cnVlIGlmIHByb2JhYmx5IHByaW1lIChIQUMgNC4yNCwgTWlsbGVyLVJhYmluKVxuZnVuY3Rpb24gYm5wTWlsbGVyUmFiaW4odCkge1xuICB2YXIgbjEgPSB0aGlzLnN1YnRyYWN0KEJpZ0ludGVnZXIuT05FKTtcbiAgdmFyIGsgPSBuMS5nZXRMb3dlc3RTZXRCaXQoKTtcbiAgaWYoayA8PSAwKSByZXR1cm4gZmFsc2U7XG4gIHZhciByID0gbjEuc2hpZnRSaWdodChrKTtcbiAgdCA9ICh0KzEpPj4xO1xuICBpZih0ID4gbG93cHJpbWVzLmxlbmd0aCkgdCA9IGxvd3ByaW1lcy5sZW5ndGg7XG4gIHZhciBhID0gbmJpKCk7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCB0OyArK2kpIHtcbiAgICAvL1BpY2sgYmFzZXMgYXQgcmFuZG9tLCBpbnN0ZWFkIG9mIHN0YXJ0aW5nIGF0IDJcbiAgICBhLmZyb21JbnQobG93cHJpbWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpsb3dwcmltZXMubGVuZ3RoKV0pO1xuICAgIHZhciB5ID0gYS5tb2RQb3cocix0aGlzKTtcbiAgICBpZih5LmNvbXBhcmVUbyhCaWdJbnRlZ2VyLk9ORSkgIT0gMCAmJiB5LmNvbXBhcmVUbyhuMSkgIT0gMCkge1xuICAgICAgdmFyIGogPSAxO1xuICAgICAgd2hpbGUoaisrIDwgayAmJiB5LmNvbXBhcmVUbyhuMSkgIT0gMCkge1xuICAgICAgICB5ID0geS5tb2RQb3dJbnQoMix0aGlzKTtcbiAgICAgICAgaWYoeS5jb21wYXJlVG8oQmlnSW50ZWdlci5PTkUpID09IDApIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmKHkuY29tcGFyZVRvKG4xKSAhPSAwKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyBwcm90ZWN0ZWRcbkJpZ0ludGVnZXIucHJvdG90eXBlLmNodW5rU2l6ZSA9IGJucENodW5rU2l6ZTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLnRvUmFkaXggPSBibnBUb1JhZGl4O1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbVJhZGl4ID0gYm5wRnJvbVJhZGl4O1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZnJvbU51bWJlciA9IGJucEZyb21OdW1iZXI7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXR3aXNlVG8gPSBibnBCaXR3aXNlVG87XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5jaGFuZ2VCaXQgPSBibnBDaGFuZ2VCaXQ7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5hZGRUbyA9IGJucEFkZFRvO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZE11bHRpcGx5ID0gYm5wRE11bHRpcGx5O1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZEFkZE9mZnNldCA9IGJucERBZGRPZmZzZXQ7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseUxvd2VyVG8gPSBibnBNdWx0aXBseUxvd2VyVG87XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseVVwcGVyVG8gPSBibnBNdWx0aXBseVVwcGVyVG87XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5tb2RJbnQgPSBibnBNb2RJbnQ7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5taWxsZXJSYWJpbiA9IGJucE1pbGxlclJhYmluO1xuXG4vLyBwdWJsaWNcbkJpZ0ludGVnZXIucHJvdG90eXBlLmNsb25lID0gYm5DbG9uZTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmludFZhbHVlID0gYm5JbnRWYWx1ZTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmJ5dGVWYWx1ZSA9IGJuQnl0ZVZhbHVlO1xuQmlnSW50ZWdlci5wcm90b3R5cGUuc2hvcnRWYWx1ZSA9IGJuU2hvcnRWYWx1ZTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLnNpZ251bSA9IGJuU2lnTnVtO1xuQmlnSW50ZWdlci5wcm90b3R5cGUudG9CeXRlQXJyYXkgPSBiblRvQnl0ZUFycmF5O1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZXF1YWxzID0gYm5FcXVhbHM7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5taW4gPSBibk1pbjtcbkJpZ0ludGVnZXIucHJvdG90eXBlLm1heCA9IGJuTWF4O1xuQmlnSW50ZWdlci5wcm90b3R5cGUuYW5kID0gYm5BbmQ7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5vciA9IGJuT3I7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS54b3IgPSBiblhvcjtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmFuZE5vdCA9IGJuQW5kTm90O1xuQmlnSW50ZWdlci5wcm90b3R5cGUubm90ID0gYm5Ob3Q7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5zaGlmdExlZnQgPSBiblNoaWZ0TGVmdDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0UmlnaHQgPSBiblNoaWZ0UmlnaHQ7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5nZXRMb3dlc3RTZXRCaXQgPSBibkdldExvd2VzdFNldEJpdDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmJpdENvdW50ID0gYm5CaXRDb3VudDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLnRlc3RCaXQgPSBiblRlc3RCaXQ7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5zZXRCaXQgPSBiblNldEJpdDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmNsZWFyQml0ID0gYm5DbGVhckJpdDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmZsaXBCaXQgPSBibkZsaXBCaXQ7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5hZGQgPSBibkFkZDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLnN1YnRyYWN0ID0gYm5TdWJ0cmFjdDtcbkJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5ID0gYm5NdWx0aXBseTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZSA9IGJuRGl2aWRlO1xuQmlnSW50ZWdlci5wcm90b3R5cGUucmVtYWluZGVyID0gYm5SZW1haW5kZXI7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGVBbmRSZW1haW5kZXIgPSBibkRpdmlkZUFuZFJlbWFpbmRlcjtcbkJpZ0ludGVnZXIucHJvdG90eXBlLm1vZFBvdyA9IGJuTW9kUG93O1xuQmlnSW50ZWdlci5wcm90b3R5cGUubW9kSW52ZXJzZSA9IGJuTW9kSW52ZXJzZTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLnBvdyA9IGJuUG93O1xuQmlnSW50ZWdlci5wcm90b3R5cGUuZ2NkID0gYm5HQ0Q7XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5pc1Byb2JhYmxlUHJpbWUgPSBibklzUHJvYmFibGVQcmltZTtcblxuLy8gSlNCTi1zcGVjaWZpYyBleHRlbnNpb25cbkJpZ0ludGVnZXIucHJvdG90eXBlLnNxdWFyZSA9IGJuU3F1YXJlO1xuXG4vLyBCaWdJbnRlZ2VyIGludGVyZmFjZXMgbm90IGltcGxlbWVudGVkIGluIGpzYm46XG5cbi8vIEJpZ0ludGVnZXIoaW50IHNpZ251bSwgYnl0ZVtdIG1hZ25pdHVkZSlcbi8vIGRvdWJsZSBkb3VibGVWYWx1ZSgpXG4vLyBmbG9hdCBmbG9hdFZhbHVlKClcbi8vIGludCBoYXNoQ29kZSgpXG4vLyBsb25nIGxvbmdWYWx1ZSgpXG4vLyBzdGF0aWMgQmlnSW50ZWdlciB2YWx1ZU9mKGxvbmcgdmFsKVxuXG4vLyBwcm5nNC5qcyAtIHVzZXMgQXJjZm91ciBhcyBhIFBSTkdcblxuZnVuY3Rpb24gQXJjZm91cigpIHtcbiAgdGhpcy5pID0gMDtcbiAgdGhpcy5qID0gMDtcbiAgdGhpcy5TID0gbmV3IEFycmF5KCk7XG59XG5cbi8vIEluaXRpYWxpemUgYXJjZm91ciBjb250ZXh0IGZyb20ga2V5LCBhbiBhcnJheSBvZiBpbnRzLCBlYWNoIGZyb20gWzAuLjI1NV1cbmZ1bmN0aW9uIEFSQzRpbml0KGtleSkge1xuICB2YXIgaSwgaiwgdDtcbiAgZm9yKGkgPSAwOyBpIDwgMjU2OyArK2kpXG4gICAgdGhpcy5TW2ldID0gaTtcbiAgaiA9IDA7XG4gIGZvcihpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgaiA9IChqICsgdGhpcy5TW2ldICsga2V5W2kgJSBrZXkubGVuZ3RoXSkgJiAyNTU7XG4gICAgdCA9IHRoaXMuU1tpXTtcbiAgICB0aGlzLlNbaV0gPSB0aGlzLlNbal07XG4gICAgdGhpcy5TW2pdID0gdDtcbiAgfVxuICB0aGlzLmkgPSAwO1xuICB0aGlzLmogPSAwO1xufVxuXG5mdW5jdGlvbiBBUkM0bmV4dCgpIHtcbiAgdmFyIHQ7XG4gIHRoaXMuaSA9ICh0aGlzLmkgKyAxKSAmIDI1NTtcbiAgdGhpcy5qID0gKHRoaXMuaiArIHRoaXMuU1t0aGlzLmldKSAmIDI1NTtcbiAgdCA9IHRoaXMuU1t0aGlzLmldO1xuICB0aGlzLlNbdGhpcy5pXSA9IHRoaXMuU1t0aGlzLmpdO1xuICB0aGlzLlNbdGhpcy5qXSA9IHQ7XG4gIHJldHVybiB0aGlzLlNbKHQgKyB0aGlzLlNbdGhpcy5pXSkgJiAyNTVdO1xufVxuXG5BcmNmb3VyLnByb3RvdHlwZS5pbml0ID0gQVJDNGluaXQ7XG5BcmNmb3VyLnByb3RvdHlwZS5uZXh0ID0gQVJDNG5leHQ7XG5cbi8vIFBsdWcgaW4geW91ciBSTkcgY29uc3RydWN0b3IgaGVyZVxuZnVuY3Rpb24gcHJuZ19uZXdzdGF0ZSgpIHtcbiAgcmV0dXJuIG5ldyBBcmNmb3VyKCk7XG59XG5cbi8vIFBvb2wgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCBhbmQgZ3JlYXRlciB0aGFuIDMyLlxuLy8gQW4gYXJyYXkgb2YgYnl0ZXMgdGhlIHNpemUgb2YgdGhlIHBvb2wgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpXG52YXIgcm5nX3BzaXplID0gMjU2O1xuXG4vLyBSYW5kb20gbnVtYmVyIGdlbmVyYXRvciAtIHJlcXVpcmVzIGEgUFJORyBiYWNrZW5kLCBlLmcuIHBybmc0LmpzXG52YXIgcm5nX3N0YXRlO1xudmFyIHJuZ19wb29sO1xudmFyIHJuZ19wcHRyO1xuXG4vLyBJbml0aWFsaXplIHRoZSBwb29sIHdpdGgganVuayBpZiBuZWVkZWQuXG5pZihybmdfcG9vbCA9PSBudWxsKSB7XG4gIHJuZ19wb29sID0gbmV3IEFycmF5KCk7XG4gIHJuZ19wcHRyID0gMDtcbiAgdmFyIHQ7XG4gIGlmKHdpbmRvdy5jcnlwdG8gJiYgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBFeHRyYWN0IGVudHJvcHkgKDIwNDggYml0cykgZnJvbSBSTkcgaWYgYXZhaWxhYmxlXG4gICAgdmFyIHogPSBuZXcgVWludDMyQXJyYXkoMjU2KTtcbiAgICB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh6KTtcbiAgICBmb3IgKHQgPSAwOyB0IDwgei5sZW5ndGg7ICsrdClcbiAgICAgIHJuZ19wb29sW3JuZ19wcHRyKytdID0gelt0XSAmIDI1NTtcbiAgfVxuXG4gIC8vIFVzZSBtb3VzZSBldmVudHMgZm9yIGVudHJvcHksIGlmIHdlIGRvIG5vdCBoYXZlIGVub3VnaCBlbnRyb3B5IGJ5IHRoZSB0aW1lXG4gIC8vIHdlIG5lZWQgaXQsIGVudHJvcHkgd2lsbCBiZSBnZW5lcmF0ZWQgYnkgTWF0aC5yYW5kb20uXG4gIHZhciBvbk1vdXNlTW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oZXYpIHtcbiAgICB0aGlzLmNvdW50ID0gdGhpcy5jb3VudCB8fCAwO1xuICAgIGlmICh0aGlzLmNvdW50ID49IDI1NiB8fCBybmdfcHB0ciA+PSBybmdfcHNpemUpIHtcbiAgICAgIGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgZWxzZSBpZiAod2luZG93LmRldGFjaEV2ZW50KVxuICAgICAgICB3aW5kb3cuZGV0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtb3VzZUNvb3JkaW5hdGVzID0gZXYueCArIGV2Lnk7XG4gICAgICBybmdfcG9vbFtybmdfcHB0cisrXSA9IG1vdXNlQ29vcmRpbmF0ZXMgJiAyNTU7XG4gICAgICB0aGlzLmNvdW50ICs9IDE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gU29tZXRpbWVzIEZpcmVmb3ggd2lsbCBkZW55IHBlcm1pc3Npb24gdG8gYWNjZXNzIGV2ZW50IHByb3BlcnRpZXMgZm9yIHNvbWUgcmVhc29uLiBJZ25vcmUuXG4gICAgfVxuICB9O1xuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lciwgZmFsc2UpO1xuICBlbHNlIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpXG4gICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmVMaXN0ZW5lcik7XG5cbn1cblxuZnVuY3Rpb24gcm5nX2dldF9ieXRlKCkge1xuICBpZihybmdfc3RhdGUgPT0gbnVsbCkge1xuICAgIHJuZ19zdGF0ZSA9IHBybmdfbmV3c3RhdGUoKTtcbiAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBtYXkgbm90IGhhdmUgY29sbGVjdGVkIGVub3VnaCBlbnRyb3B5LiAgSWYgbm90LCBmYWxsIGJhY2sgdG8gTWF0aC5yYW5kb21cbiAgICB3aGlsZSAocm5nX3BwdHIgPCBybmdfcHNpemUpIHtcbiAgICAgIHZhciByYW5kb20gPSBNYXRoLmZsb29yKDY1NTM2ICogTWF0aC5yYW5kb20oKSk7XG4gICAgICBybmdfcG9vbFtybmdfcHB0cisrXSA9IHJhbmRvbSAmIDI1NTtcbiAgICB9XG4gICAgcm5nX3N0YXRlLmluaXQocm5nX3Bvb2wpO1xuICAgIGZvcihybmdfcHB0ciA9IDA7IHJuZ19wcHRyIDwgcm5nX3Bvb2wubGVuZ3RoOyArK3JuZ19wcHRyKVxuICAgICAgcm5nX3Bvb2xbcm5nX3BwdHJdID0gMDtcbiAgICBybmdfcHB0ciA9IDA7XG4gIH1cbiAgLy8gVE9ETzogYWxsb3cgcmVzZWVkaW5nIGFmdGVyIGZpcnN0IHJlcXVlc3RcbiAgcmV0dXJuIHJuZ19zdGF0ZS5uZXh0KCk7XG59XG5cbmZ1bmN0aW9uIHJuZ19nZXRfYnl0ZXMoYmEpIHtcbiAgdmFyIGk7XG4gIGZvcihpID0gMDsgaSA8IGJhLmxlbmd0aDsgKytpKSBiYVtpXSA9IHJuZ19nZXRfYnl0ZSgpO1xufVxuXG5mdW5jdGlvbiBTZWN1cmVSYW5kb20oKSB7fVxuXG5TZWN1cmVSYW5kb20ucHJvdG90eXBlLm5leHRCeXRlcyA9IHJuZ19nZXRfYnl0ZXM7XG5cbi8vIERlcGVuZHMgb24ganNibi5qcyBhbmQgcm5nLmpzXG5cbi8vIFZlcnNpb24gMS4xOiBzdXBwb3J0IHV0Zi04IGVuY29kaW5nIGluIHBrY3MxcGFkMlxuXG4vLyBjb252ZXJ0IGEgKGhleCkgc3RyaW5nIHRvIGEgYmlnbnVtIG9iamVjdFxuZnVuY3Rpb24gcGFyc2VCaWdJbnQoc3RyLHIpIHtcbiAgcmV0dXJuIG5ldyBCaWdJbnRlZ2VyKHN0cixyKTtcbn1cblxuZnVuY3Rpb24gbGluZWJyayhzLG4pIHtcbiAgdmFyIHJldCA9IFwiXCI7XG4gIHZhciBpID0gMDtcbiAgd2hpbGUoaSArIG4gPCBzLmxlbmd0aCkge1xuICAgIHJldCArPSBzLnN1YnN0cmluZyhpLGkrbikgKyBcIlxcblwiO1xuICAgIGkgKz0gbjtcbiAgfVxuICByZXR1cm4gcmV0ICsgcy5zdWJzdHJpbmcoaSxzLmxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGJ5dGUySGV4KGIpIHtcbiAgaWYoYiA8IDB4MTApXG4gICAgcmV0dXJuIFwiMFwiICsgYi50b1N0cmluZygxNik7XG4gIGVsc2VcbiAgICByZXR1cm4gYi50b1N0cmluZygxNik7XG59XG5cbi8vIFBLQ1MjMSAodHlwZSAyLCByYW5kb20pIHBhZCBpbnB1dCBzdHJpbmcgcyB0byBuIGJ5dGVzLCBhbmQgcmV0dXJuIGEgYmlnaW50XG5mdW5jdGlvbiBwa2NzMXBhZDIocyxuKSB7XG4gIGlmKG4gPCBzLmxlbmd0aCArIDExKSB7IC8vIFRPRE86IGZpeCBmb3IgdXRmLThcbiAgICBjb25zb2xlLmVycm9yKFwiTWVzc2FnZSB0b28gbG9uZyBmb3IgUlNBXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciBiYSA9IG5ldyBBcnJheSgpO1xuICB2YXIgaSA9IHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUoaSA+PSAwICYmIG4gPiAwKSB7XG4gICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoaS0tKTtcbiAgICBpZihjIDwgMTI4KSB7IC8vIGVuY29kZSB1c2luZyB1dGYtOFxuICAgICAgYmFbLS1uXSA9IGM7XG4gICAgfVxuICAgIGVsc2UgaWYoKGMgPiAxMjcpICYmIChjIDwgMjA0OCkpIHtcbiAgICAgIGJhWy0tbl0gPSAoYyAmIDYzKSB8IDEyODtcbiAgICAgIGJhWy0tbl0gPSAoYyA+PiA2KSB8IDE5MjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBiYVstLW5dID0gKGMgJiA2MykgfCAxMjg7XG4gICAgICBiYVstLW5dID0gKChjID4+IDYpICYgNjMpIHwgMTI4O1xuICAgICAgYmFbLS1uXSA9IChjID4+IDEyKSB8IDIyNDtcbiAgICB9XG4gIH1cbiAgYmFbLS1uXSA9IDA7XG4gIHZhciBybmcgPSBuZXcgU2VjdXJlUmFuZG9tKCk7XG4gIHZhciB4ID0gbmV3IEFycmF5KCk7XG4gIHdoaWxlKG4gPiAyKSB7IC8vIHJhbmRvbSBub24temVybyBwYWRcbiAgICB4WzBdID0gMDtcbiAgICB3aGlsZSh4WzBdID09IDApIHJuZy5uZXh0Qnl0ZXMoeCk7XG4gICAgYmFbLS1uXSA9IHhbMF07XG4gIH1cbiAgYmFbLS1uXSA9IDI7XG4gIGJhWy0tbl0gPSAwO1xuICByZXR1cm4gbmV3IEJpZ0ludGVnZXIoYmEpO1xufVxuXG4vLyBcImVtcHR5XCIgUlNBIGtleSBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUlNBS2V5KCkge1xuICB0aGlzLm4gPSBudWxsO1xuICB0aGlzLmUgPSAwO1xuICB0aGlzLmQgPSBudWxsO1xuICB0aGlzLnAgPSBudWxsO1xuICB0aGlzLnEgPSBudWxsO1xuICB0aGlzLmRtcDEgPSBudWxsO1xuICB0aGlzLmRtcTEgPSBudWxsO1xuICB0aGlzLmNvZWZmID0gbnVsbDtcbn1cblxuLy8gU2V0IHRoZSBwdWJsaWMga2V5IGZpZWxkcyBOIGFuZCBlIGZyb20gaGV4IHN0cmluZ3NcbmZ1bmN0aW9uIFJTQVNldFB1YmxpYyhOLEUpIHtcbiAgaWYoTiAhPSBudWxsICYmIEUgIT0gbnVsbCAmJiBOLmxlbmd0aCA+IDAgJiYgRS5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5uID0gcGFyc2VCaWdJbnQoTiwxNik7XG4gICAgdGhpcy5lID0gcGFyc2VJbnQoRSwxNik7XG4gIH1cbiAgZWxzZVxuICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIFJTQSBwdWJsaWMga2V5XCIpO1xufVxuXG4vLyBQZXJmb3JtIHJhdyBwdWJsaWMgb3BlcmF0aW9uIG9uIFwieFwiOiByZXR1cm4geF5lIChtb2QgbilcbmZ1bmN0aW9uIFJTQURvUHVibGljKHgpIHtcbiAgcmV0dXJuIHgubW9kUG93SW50KHRoaXMuZSwgdGhpcy5uKTtcbn1cblxuLy8gUmV0dXJuIHRoZSBQS0NTIzEgUlNBIGVuY3J5cHRpb24gb2YgXCJ0ZXh0XCIgYXMgYW4gZXZlbi1sZW5ndGggaGV4IHN0cmluZ1xuZnVuY3Rpb24gUlNBRW5jcnlwdCh0ZXh0KSB7XG4gIHZhciBtID0gcGtjczFwYWQyKHRleHQsKHRoaXMubi5iaXRMZW5ndGgoKSs3KT4+Myk7XG4gIGlmKG0gPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIHZhciBjID0gdGhpcy5kb1B1YmxpYyhtKTtcbiAgaWYoYyA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgdmFyIGggPSBjLnRvU3RyaW5nKDE2KTtcbiAgaWYoKGgubGVuZ3RoICYgMSkgPT0gMCkgcmV0dXJuIGg7IGVsc2UgcmV0dXJuIFwiMFwiICsgaDtcbn1cblxuLy8gUmV0dXJuIHRoZSBQS0NTIzEgUlNBIGVuY3J5cHRpb24gb2YgXCJ0ZXh0XCIgYXMgYSBCYXNlNjQtZW5jb2RlZCBzdHJpbmdcbi8vZnVuY3Rpb24gUlNBRW5jcnlwdEI2NCh0ZXh0KSB7XG4vLyAgdmFyIGggPSB0aGlzLmVuY3J5cHQodGV4dCk7XG4vLyAgaWYoaCkgcmV0dXJuIGhleDJiNjQoaCk7IGVsc2UgcmV0dXJuIG51bGw7XG4vL31cblxuLy8gcHJvdGVjdGVkXG5SU0FLZXkucHJvdG90eXBlLmRvUHVibGljID0gUlNBRG9QdWJsaWM7XG5cbi8vIHB1YmxpY1xuUlNBS2V5LnByb3RvdHlwZS5zZXRQdWJsaWMgPSBSU0FTZXRQdWJsaWM7XG5SU0FLZXkucHJvdG90eXBlLmVuY3J5cHQgPSBSU0FFbmNyeXB0O1xuLy9SU0FLZXkucHJvdG90eXBlLmVuY3J5cHRfYjY0ID0gUlNBRW5jcnlwdEI2NDtcblxuLy8gRGVwZW5kcyBvbiByc2EuanMgYW5kIGpzYm4yLmpzXG5cbi8vIFZlcnNpb24gMS4xOiBzdXBwb3J0IHV0Zi04IGRlY29kaW5nIGluIHBrY3MxdW5wYWQyXG5cbi8vIFVuZG8gUEtDUyMxICh0eXBlIDIsIHJhbmRvbSkgcGFkZGluZyBhbmQsIGlmIHZhbGlkLCByZXR1cm4gdGhlIHBsYWludGV4dFxuZnVuY3Rpb24gcGtjczF1bnBhZDIoZCxuKSB7XG4gIHZhciBiID0gZC50b0J5dGVBcnJheSgpO1xuICB2YXIgaSA9IDA7XG4gIHdoaWxlKGkgPCBiLmxlbmd0aCAmJiBiW2ldID09IDApICsraTtcbiAgaWYoYi5sZW5ndGgtaSAhPSBuLTEgfHwgYltpXSAhPSAyKVxuICAgIHJldHVybiBudWxsO1xuICArK2k7XG4gIHdoaWxlKGJbaV0gIT0gMClcbiAgICBpZigrK2kgPj0gYi5sZW5ndGgpIHJldHVybiBudWxsO1xuICB2YXIgcmV0ID0gXCJcIjtcbiAgd2hpbGUoKytpIDwgYi5sZW5ndGgpIHtcbiAgICB2YXIgYyA9IGJbaV0gJiAyNTU7XG4gICAgaWYoYyA8IDEyOCkgeyAvLyB1dGYtOCBkZWNvZGVcbiAgICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgIH1cbiAgICBlbHNlIGlmKChjID4gMTkxKSAmJiAoYyA8IDIyNCkpIHtcbiAgICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDMxKSA8PCA2KSB8IChiW2krMV0gJiA2MykpO1xuICAgICAgKytpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDE1KSA8PCAxMikgfCAoKGJbaSsxXSAmIDYzKSA8PCA2KSB8IChiW2krMl0gJiA2MykpO1xuICAgICAgaSArPSAyO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vLyBTZXQgdGhlIHByaXZhdGUga2V5IGZpZWxkcyBOLCBlLCBhbmQgZCBmcm9tIGhleCBzdHJpbmdzXG5mdW5jdGlvbiBSU0FTZXRQcml2YXRlKE4sRSxEKSB7XG4gIGlmKE4gIT0gbnVsbCAmJiBFICE9IG51bGwgJiYgTi5sZW5ndGggPiAwICYmIEUubGVuZ3RoID4gMCkge1xuICAgIHRoaXMubiA9IHBhcnNlQmlnSW50KE4sMTYpO1xuICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsMTYpO1xuICAgIHRoaXMuZCA9IHBhcnNlQmlnSW50KEQsMTYpO1xuICB9XG4gIGVsc2VcbiAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBSU0EgcHJpdmF0ZSBrZXlcIik7XG59XG5cbi8vIFNldCB0aGUgcHJpdmF0ZSBrZXkgZmllbGRzIE4sIGUsIGQgYW5kIENSVCBwYXJhbXMgZnJvbSBoZXggc3RyaW5nc1xuZnVuY3Rpb24gUlNBU2V0UHJpdmF0ZUV4KE4sRSxELFAsUSxEUCxEUSxDKSB7XG4gIGlmKE4gIT0gbnVsbCAmJiBFICE9IG51bGwgJiYgTi5sZW5ndGggPiAwICYmIEUubGVuZ3RoID4gMCkge1xuICAgIHRoaXMubiA9IHBhcnNlQmlnSW50KE4sMTYpO1xuICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsMTYpO1xuICAgIHRoaXMuZCA9IHBhcnNlQmlnSW50KEQsMTYpO1xuICAgIHRoaXMucCA9IHBhcnNlQmlnSW50KFAsMTYpO1xuICAgIHRoaXMucSA9IHBhcnNlQmlnSW50KFEsMTYpO1xuICAgIHRoaXMuZG1wMSA9IHBhcnNlQmlnSW50KERQLDE2KTtcbiAgICB0aGlzLmRtcTEgPSBwYXJzZUJpZ0ludChEUSwxNik7XG4gICAgdGhpcy5jb2VmZiA9IHBhcnNlQmlnSW50KEMsMTYpO1xuICB9XG4gIGVsc2VcbiAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBSU0EgcHJpdmF0ZSBrZXlcIik7XG59XG5cbi8vIEdlbmVyYXRlIGEgbmV3IHJhbmRvbSBwcml2YXRlIGtleSBCIGJpdHMgbG9uZywgdXNpbmcgcHVibGljIGV4cHQgRVxuZnVuY3Rpb24gUlNBR2VuZXJhdGUoQixFKSB7XG4gIHZhciBybmcgPSBuZXcgU2VjdXJlUmFuZG9tKCk7XG4gIHZhciBxcyA9IEI+PjE7XG4gIHRoaXMuZSA9IHBhcnNlSW50KEUsMTYpO1xuICB2YXIgZWUgPSBuZXcgQmlnSW50ZWdlcihFLDE2KTtcbiAgZm9yKDs7KSB7XG4gICAgZm9yKDs7KSB7XG4gICAgICB0aGlzLnAgPSBuZXcgQmlnSW50ZWdlcihCLXFzLDEscm5nKTtcbiAgICAgIGlmKHRoaXMucC5zdWJ0cmFjdChCaWdJbnRlZ2VyLk9ORSkuZ2NkKGVlKS5jb21wYXJlVG8oQmlnSW50ZWdlci5PTkUpID09IDAgJiYgdGhpcy5wLmlzUHJvYmFibGVQcmltZSgxMCkpIGJyZWFrO1xuICAgIH1cbiAgICBmb3IoOzspIHtcbiAgICAgIHRoaXMucSA9IG5ldyBCaWdJbnRlZ2VyKHFzLDEscm5nKTtcbiAgICAgIGlmKHRoaXMucS5zdWJ0cmFjdChCaWdJbnRlZ2VyLk9ORSkuZ2NkKGVlKS5jb21wYXJlVG8oQmlnSW50ZWdlci5PTkUpID09IDAgJiYgdGhpcy5xLmlzUHJvYmFibGVQcmltZSgxMCkpIGJyZWFrO1xuICAgIH1cbiAgICBpZih0aGlzLnAuY29tcGFyZVRvKHRoaXMucSkgPD0gMCkge1xuICAgICAgdmFyIHQgPSB0aGlzLnA7XG4gICAgICB0aGlzLnAgPSB0aGlzLnE7XG4gICAgICB0aGlzLnEgPSB0O1xuICAgIH1cbiAgICB2YXIgcDEgPSB0aGlzLnAuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpO1xuICAgIHZhciBxMSA9IHRoaXMucS5zdWJ0cmFjdChCaWdJbnRlZ2VyLk9ORSk7XG4gICAgdmFyIHBoaSA9IHAxLm11bHRpcGx5KHExKTtcbiAgICBpZihwaGkuZ2NkKGVlKS5jb21wYXJlVG8oQmlnSW50ZWdlci5PTkUpID09IDApIHtcbiAgICAgIHRoaXMubiA9IHRoaXMucC5tdWx0aXBseSh0aGlzLnEpO1xuICAgICAgdGhpcy5kID0gZWUubW9kSW52ZXJzZShwaGkpO1xuICAgICAgdGhpcy5kbXAxID0gdGhpcy5kLm1vZChwMSk7XG4gICAgICB0aGlzLmRtcTEgPSB0aGlzLmQubW9kKHExKTtcbiAgICAgIHRoaXMuY29lZmYgPSB0aGlzLnEubW9kSW52ZXJzZSh0aGlzLnApO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbi8vIFBlcmZvcm0gcmF3IHByaXZhdGUgb3BlcmF0aW9uIG9uIFwieFwiOiByZXR1cm4geF5kIChtb2QgbilcbmZ1bmN0aW9uIFJTQURvUHJpdmF0ZSh4KSB7XG4gIGlmKHRoaXMucCA9PSBudWxsIHx8IHRoaXMucSA9PSBudWxsKVxuICAgIHJldHVybiB4Lm1vZFBvdyh0aGlzLmQsIHRoaXMubik7XG5cbiAgLy8gVE9ETzogcmUtY2FsY3VsYXRlIGFueSBtaXNzaW5nIENSVCBwYXJhbXNcbiAgdmFyIHhwID0geC5tb2QodGhpcy5wKS5tb2RQb3codGhpcy5kbXAxLCB0aGlzLnApO1xuICB2YXIgeHEgPSB4Lm1vZCh0aGlzLnEpLm1vZFBvdyh0aGlzLmRtcTEsIHRoaXMucSk7XG5cbiAgd2hpbGUoeHAuY29tcGFyZVRvKHhxKSA8IDApXG4gICAgeHAgPSB4cC5hZGQodGhpcy5wKTtcbiAgcmV0dXJuIHhwLnN1YnRyYWN0KHhxKS5tdWx0aXBseSh0aGlzLmNvZWZmKS5tb2QodGhpcy5wKS5tdWx0aXBseSh0aGlzLnEpLmFkZCh4cSk7XG59XG5cbi8vIFJldHVybiB0aGUgUEtDUyMxIFJTQSBkZWNyeXB0aW9uIG9mIFwiY3RleHRcIi5cbi8vIFwiY3RleHRcIiBpcyBhbiBldmVuLWxlbmd0aCBoZXggc3RyaW5nIGFuZCB0aGUgb3V0cHV0IGlzIGEgcGxhaW4gc3RyaW5nLlxuZnVuY3Rpb24gUlNBRGVjcnlwdChjdGV4dCkge1xuICB2YXIgYyA9IHBhcnNlQmlnSW50KGN0ZXh0LCAxNik7XG4gIHZhciBtID0gdGhpcy5kb1ByaXZhdGUoYyk7XG4gIGlmKG0gPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBwa2NzMXVucGFkMihtLCAodGhpcy5uLmJpdExlbmd0aCgpKzcpPj4zKTtcbn1cblxuLy8gUmV0dXJuIHRoZSBQS0NTIzEgUlNBIGRlY3J5cHRpb24gb2YgXCJjdGV4dFwiLlxuLy8gXCJjdGV4dFwiIGlzIGEgQmFzZTY0LWVuY29kZWQgc3RyaW5nIGFuZCB0aGUgb3V0cHV0IGlzIGEgcGxhaW4gc3RyaW5nLlxuLy9mdW5jdGlvbiBSU0FCNjREZWNyeXB0KGN0ZXh0KSB7XG4vLyAgdmFyIGggPSBiNjR0b2hleChjdGV4dCk7XG4vLyAgaWYoaCkgcmV0dXJuIHRoaXMuZGVjcnlwdChoKTsgZWxzZSByZXR1cm4gbnVsbDtcbi8vfVxuXG4vLyBwcm90ZWN0ZWRcblJTQUtleS5wcm90b3R5cGUuZG9Qcml2YXRlID0gUlNBRG9Qcml2YXRlO1xuXG4vLyBwdWJsaWNcblJTQUtleS5wcm90b3R5cGUuc2V0UHJpdmF0ZSA9IFJTQVNldFByaXZhdGU7XG5SU0FLZXkucHJvdG90eXBlLnNldFByaXZhdGVFeCA9IFJTQVNldFByaXZhdGVFeDtcblJTQUtleS5wcm90b3R5cGUuZ2VuZXJhdGUgPSBSU0FHZW5lcmF0ZTtcblJTQUtleS5wcm90b3R5cGUuZGVjcnlwdCA9IFJTQURlY3J5cHQ7XG4vL1JTQUtleS5wcm90b3R5cGUuYjY0X2RlY3J5cHQgPSBSU0FCNjREZWNyeXB0O1xuXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTEgIEtldmluIE0gQnVybnMgSnIuXG4vLyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy8gU2VlIFwiTElDRU5TRVwiIGZvciBkZXRhaWxzLlxuLy9cbi8vIEV4dGVuc2lvbiB0byBqc2JuIHdoaWNoIGFkZHMgZmFjaWxpdGllcyBmb3IgYXN5bmNocm9ub3VzIFJTQSBrZXkgZ2VuZXJhdGlvblxuLy8gUHJpbWFyaWx5IGNyZWF0ZWQgdG8gYXZvaWQgZXhlY3V0aW9uIHRpbWVvdXQgb24gbW9iaWxlIGRldmljZXNcbi8vXG4vLyBodHRwOi8vd3d3LWNzLXN0dWRlbnRzLnN0YW5mb3JkLmVkdS9+dGp3L2pzYm4vXG4vL1xuLy8gLS0tXG5cbihmdW5jdGlvbigpe1xuXG4vLyBHZW5lcmF0ZSBhIG5ldyByYW5kb20gcHJpdmF0ZSBrZXkgQiBiaXRzIGxvbmcsIHVzaW5nIHB1YmxpYyBleHB0IEVcbnZhciBSU0FHZW5lcmF0ZUFzeW5jID0gZnVuY3Rpb24gKEIsIEUsIGNhbGxiYWNrKSB7XG4gICAgLy92YXIgcm5nID0gbmV3IFNlZWRlZFJhbmRvbSgpO1xuICAgIHZhciBybmcgPSBuZXcgU2VjdXJlUmFuZG9tKCk7XG4gICAgdmFyIHFzID0gQiA+PiAxO1xuICAgIHRoaXMuZSA9IHBhcnNlSW50KEUsIDE2KTtcbiAgICB2YXIgZWUgPSBuZXcgQmlnSW50ZWdlcihFLCAxNik7XG4gICAgdmFyIHJzYSA9IHRoaXM7XG4gICAgLy8gVGhlc2UgZnVuY3Rpb25zIGhhdmUgbm9uLWRlc2NyaXB0IG5hbWVzIGJlY2F1c2UgdGhleSB3ZXJlIG9yaWdpbmFsbHkgZm9yKDs7KSBsb29wcy5cbiAgICAvLyBJIGRvbid0IGtub3cgYWJvdXQgY3J5cHRvZ3JhcGh5IHRvIGdpdmUgdGhlbSBiZXR0ZXIgbmFtZXMgdGhhbiBsb29wMS00LlxuICAgIHZhciBsb29wMSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbG9vcDQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyc2EucC5jb21wYXJlVG8ocnNhLnEpIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHJzYS5wO1xuICAgICAgICAgICAgICAgIHJzYS5wID0gcnNhLnE7XG4gICAgICAgICAgICAgICAgcnNhLnEgPSB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHAxID0gcnNhLnAuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpO1xuICAgICAgICAgICAgdmFyIHExID0gcnNhLnEuc3VidHJhY3QoQmlnSW50ZWdlci5PTkUpO1xuICAgICAgICAgICAgdmFyIHBoaSA9IHAxLm11bHRpcGx5KHExKTtcbiAgICAgICAgICAgIGlmIChwaGkuZ2NkKGVlKS5jb21wYXJlVG8oQmlnSW50ZWdlci5PTkUpID09IDApIHtcbiAgICAgICAgICAgICAgICByc2EubiA9IHJzYS5wLm11bHRpcGx5KHJzYS5xKTtcbiAgICAgICAgICAgICAgICByc2EuZCA9IGVlLm1vZEludmVyc2UocGhpKTtcbiAgICAgICAgICAgICAgICByc2EuZG1wMSA9IHJzYS5kLm1vZChwMSk7XG4gICAgICAgICAgICAgICAgcnNhLmRtcTEgPSByc2EuZC5tb2QocTEpO1xuICAgICAgICAgICAgICAgIHJzYS5jb2VmZiA9IHJzYS5xLm1vZEludmVyc2UocnNhLnApO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtjYWxsYmFjaygpfSwwKTsgLy8gZXNjYXBlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDEsMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBsb29wMyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcnNhLnEgPSBuYmkoKTtcbiAgICAgICAgICAgIHJzYS5xLmZyb21OdW1iZXJBc3luYyhxcywgMSwgcm5nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJzYS5xLnN1YnRyYWN0KEJpZ0ludGVnZXIuT05FKS5nY2RhKGVlLCBmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSA9PSAwICYmIHJzYS5xLmlzUHJvYmFibGVQcmltZSgxMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDQsMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AzLDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxvb3AyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByc2EucCA9IG5iaSgpO1xuICAgICAgICAgICAgcnNhLnAuZnJvbU51bWJlckFzeW5jKEIgLSBxcywgMSwgcm5nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJzYS5wLnN1YnRyYWN0KEJpZ0ludGVnZXIuT05FKS5nY2RhKGVlLCBmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuY29tcGFyZVRvKEJpZ0ludGVnZXIuT05FKSA9PSAwICYmIHJzYS5wLmlzUHJvYmFibGVQcmltZSgxMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobG9vcDMsMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AyLDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChsb29wMiwwKTtcbiAgICB9O1xuICAgIHNldFRpbWVvdXQobG9vcDEsMCk7XG59O1xuUlNBS2V5LnByb3RvdHlwZS5nZW5lcmF0ZUFzeW5jID0gUlNBR2VuZXJhdGVBc3luYztcblxuLy8gUHVibGljIEFQSSBtZXRob2RcbnZhciBibkdDREFzeW5jID0gZnVuY3Rpb24gKGEsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHggPSAodGhpcy5zIDwgMCkgPyB0aGlzLm5lZ2F0ZSgpIDogdGhpcy5jbG9uZSgpO1xuICAgIHZhciB5ID0gKGEucyA8IDApID8gYS5uZWdhdGUoKSA6IGEuY2xvbmUoKTtcbiAgICBpZiAoeC5jb21wYXJlVG8oeSkgPCAwKSB7XG4gICAgICAgIHZhciB0ID0geDtcbiAgICAgICAgeCA9IHk7XG4gICAgICAgIHkgPSB0O1xuICAgIH1cbiAgICB2YXIgaSA9IHguZ2V0TG93ZXN0U2V0Qml0KCksXG4gICAgICAgIGcgPSB5LmdldExvd2VzdFNldEJpdCgpO1xuICAgIGlmIChnIDwgMCkge1xuICAgICAgICBjYWxsYmFjayh4KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaSA8IGcpIGcgPSBpO1xuICAgIGlmIChnID4gMCkge1xuICAgICAgICB4LnJTaGlmdFRvKGcsIHgpO1xuICAgICAgICB5LnJTaGlmdFRvKGcsIHkpO1xuICAgIH1cbiAgICAvLyBXb3JraG9yc2Ugb2YgdGhlIGFsZ29yaXRobSwgZ2V0cyBjYWxsZWQgMjAwIC0gODAwIHRpbWVzIHBlciA1MTIgYml0IGtleWdlbi5cbiAgICB2YXIgZ2NkYTEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKChpID0geC5nZXRMb3dlc3RTZXRCaXQoKSkgPiAwKXsgeC5yU2hpZnRUbyhpLCB4KTsgfVxuICAgICAgICBpZiAoKGkgPSB5LmdldExvd2VzdFNldEJpdCgpKSA+IDApeyB5LnJTaGlmdFRvKGksIHkpOyB9XG4gICAgICAgIGlmICh4LmNvbXBhcmVUbyh5KSA+PSAwKSB7XG4gICAgICAgICAgICB4LnN1YlRvKHksIHgpO1xuICAgICAgICAgICAgeC5yU2hpZnRUbygxLCB4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHkuc3ViVG8oeCwgeSk7XG4gICAgICAgICAgICB5LnJTaGlmdFRvKDEsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCEoeC5zaWdudW0oKSA+IDApKSB7XG4gICAgICAgICAgICBpZiAoZyA+IDApIHkubFNoaWZ0VG8oZywgeSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Y2FsbGJhY2soeSl9LDApOyAvLyBlc2NhcGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZ2NkYTEsMCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHNldFRpbWVvdXQoZ2NkYTEsMTApO1xufTtcbkJpZ0ludGVnZXIucHJvdG90eXBlLmdjZGEgPSBibkdDREFzeW5jO1xuXG4vLyAocHJvdGVjdGVkKSBhbHRlcm5hdGUgY29uc3RydWN0b3JcbnZhciBibnBGcm9tTnVtYmVyQXN5bmMgPSBmdW5jdGlvbiAoYSxiLGMsY2FsbGJhY2spIHtcbiAgaWYoXCJudW1iZXJcIiA9PSB0eXBlb2YgYikge1xuICAgIGlmKGEgPCAyKSB7XG4gICAgICAgIHRoaXMuZnJvbUludCgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mcm9tTnVtYmVyKGEsYyk7XG4gICAgICBpZighdGhpcy50ZXN0Qml0KGEtMSkpe1xuICAgICAgICB0aGlzLmJpdHdpc2VUbyhCaWdJbnRlZ2VyLk9ORS5zaGlmdExlZnQoYS0xKSxvcF9vcix0aGlzKTtcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuaXNFdmVuKCkpIHtcbiAgICAgICAgdGhpcy5kQWRkT2Zmc2V0KDEsMCk7XG4gICAgICB9XG4gICAgICB2YXIgYm5wID0gdGhpcztcbiAgICAgIHZhciBibnBmbjEgPSBmdW5jdGlvbigpe1xuICAgICAgICBibnAuZEFkZE9mZnNldCgyLDApO1xuICAgICAgICBpZihibnAuYml0TGVuZ3RoKCkgPiBhKSBibnAuc3ViVG8oQmlnSW50ZWdlci5PTkUuc2hpZnRMZWZ0KGEtMSksYm5wKTtcbiAgICAgICAgaWYoYm5wLmlzUHJvYmFibGVQcmltZShiKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe2NhbGxiYWNrKCl9LDApOyAvLyBlc2NhcGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoYm5wZm4xLDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgc2V0VGltZW91dChibnBmbjEsMCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB4ID0gbmV3IEFycmF5KCksIHQgPSBhJjc7XG4gICAgeC5sZW5ndGggPSAoYT4+MykrMTtcbiAgICBiLm5leHRCeXRlcyh4KTtcbiAgICBpZih0ID4gMCkgeFswXSAmPSAoKDE8PHQpLTEpOyBlbHNlIHhbMF0gPSAwO1xuICAgIHRoaXMuZnJvbVN0cmluZyh4LDI1Nik7XG4gIH1cbn07XG5CaWdJbnRlZ2VyLnByb3RvdHlwZS5mcm9tTnVtYmVyQXN5bmMgPSBibnBGcm9tTnVtYmVyQXN5bmM7XG5cbn0pKCk7XG52YXIgYjY0bWFwPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xudmFyIGI2NHBhZD1cIj1cIjtcblxuZnVuY3Rpb24gaGV4MmI2NChoKSB7XG4gIHZhciBpO1xuICB2YXIgYztcbiAgdmFyIHJldCA9IFwiXCI7XG4gIGZvcihpID0gMDsgaSszIDw9IGgubGVuZ3RoOyBpKz0zKSB7XG4gICAgYyA9IHBhcnNlSW50KGguc3Vic3RyaW5nKGksaSszKSwxNik7XG4gICAgcmV0ICs9IGI2NG1hcC5jaGFyQXQoYyA+PiA2KSArIGI2NG1hcC5jaGFyQXQoYyAmIDYzKTtcbiAgfVxuICBpZihpKzEgPT0gaC5sZW5ndGgpIHtcbiAgICBjID0gcGFyc2VJbnQoaC5zdWJzdHJpbmcoaSxpKzEpLDE2KTtcbiAgICByZXQgKz0gYjY0bWFwLmNoYXJBdChjIDw8IDIpO1xuICB9XG4gIGVsc2UgaWYoaSsyID09IGgubGVuZ3RoKSB7XG4gICAgYyA9IHBhcnNlSW50KGguc3Vic3RyaW5nKGksaSsyKSwxNik7XG4gICAgcmV0ICs9IGI2NG1hcC5jaGFyQXQoYyA+PiAyKSArIGI2NG1hcC5jaGFyQXQoKGMgJiAzKSA8PCA0KTtcbiAgfVxuICB3aGlsZSgocmV0Lmxlbmd0aCAmIDMpID4gMCkgcmV0ICs9IGI2NHBhZDtcbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gY29udmVydCBhIGJhc2U2NCBzdHJpbmcgdG8gaGV4XG5mdW5jdGlvbiBiNjR0b2hleChzKSB7XG4gIHZhciByZXQgPSBcIlwiXG4gIHZhciBpO1xuICB2YXIgayA9IDA7IC8vIGI2NCBzdGF0ZSwgMC0zXG4gIHZhciBzbG9wO1xuICBmb3IoaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYocy5jaGFyQXQoaSkgPT0gYjY0cGFkKSBicmVhaztcbiAgICB2ID0gYjY0bWFwLmluZGV4T2Yocy5jaGFyQXQoaSkpO1xuICAgIGlmKHYgPCAwKSBjb250aW51ZTtcbiAgICBpZihrID09IDApIHtcbiAgICAgIHJldCArPSBpbnQyY2hhcih2ID4+IDIpO1xuICAgICAgc2xvcCA9IHYgJiAzO1xuICAgICAgayA9IDE7XG4gICAgfVxuICAgIGVsc2UgaWYoayA9PSAxKSB7XG4gICAgICByZXQgKz0gaW50MmNoYXIoKHNsb3AgPDwgMikgfCAodiA+PiA0KSk7XG4gICAgICBzbG9wID0gdiAmIDB4ZjtcbiAgICAgIGsgPSAyO1xuICAgIH1cbiAgICBlbHNlIGlmKGsgPT0gMikge1xuICAgICAgcmV0ICs9IGludDJjaGFyKHNsb3ApO1xuICAgICAgcmV0ICs9IGludDJjaGFyKHYgPj4gMik7XG4gICAgICBzbG9wID0gdiAmIDM7XG4gICAgICBrID0gMztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXQgKz0gaW50MmNoYXIoKHNsb3AgPDwgMikgfCAodiA+PiA0KSk7XG4gICAgICByZXQgKz0gaW50MmNoYXIodiAmIDB4Zik7XG4gICAgICBrID0gMDtcbiAgICB9XG4gIH1cbiAgaWYoayA9PSAxKVxuICAgIHJldCArPSBpbnQyY2hhcihzbG9wIDw8IDIpO1xuICByZXR1cm4gcmV0O1xufVxuXG4vLyBjb252ZXJ0IGEgYmFzZTY0IHN0cmluZyB0byBhIGJ5dGUvbnVtYmVyIGFycmF5XG5mdW5jdGlvbiBiNjR0b0JBKHMpIHtcbiAgLy9waWdneWJhY2sgb24gYjY0dG9oZXggZm9yIG5vdywgb3B0aW1pemUgbGF0ZXJcbiAgdmFyIGggPSBiNjR0b2hleChzKTtcbiAgdmFyIGk7XG4gIHZhciBhID0gbmV3IEFycmF5KCk7XG4gIGZvcihpID0gMDsgMippIDwgaC5sZW5ndGg7ICsraSkge1xuICAgIGFbaV0gPSBwYXJzZUludChoLnN1YnN0cmluZygyKmksMippKzIpLDE2KTtcbiAgfVxuICByZXR1cm4gYTtcbn1cblxuLyohIGFzbjEtMS4wLjIuanMgKGMpIDIwMTMgS2VuamkgVXJ1c2hpbWEgfCBranVyLmdpdGh1Yi5jb20vanNyc2FzaWduL2xpY2Vuc2VcbiAqL1xuXG52YXIgSlNYID0gSlNYIHx8IHt9O1xuSlNYLmVudiA9IEpTWC5lbnYgfHwge307XG5cbnZhciBMID0gSlNYLCBPUCA9IE9iamVjdC5wcm90b3R5cGUsIEZVTkNUSU9OX1RPU1RSSU5HID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxBREQgPSBbXCJ0b1N0cmluZ1wiLCBcInZhbHVlT2ZcIl07XG5cbkpTWC5lbnYucGFyc2VVQSA9IGZ1bmN0aW9uKGFnZW50KSB7XG5cbiAgICB2YXIgbnVtYmVyaWZ5ID0gZnVuY3Rpb24ocykge1xuICAgICAgICB2YXIgYyA9IDA7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHMucmVwbGFjZSgvXFwuL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIChjKysgPT0gMSkgPyAnJyA6ICcuJztcbiAgICAgICAgfSkpO1xuICAgIH0sXG5cbiAgICBuYXYgPSBuYXZpZ2F0b3IsXG4gICAgbyA9IHtcbiAgICAgICAgaWU6IDAsXG4gICAgICAgIG9wZXJhOiAwLFxuICAgICAgICBnZWNrbzogMCxcbiAgICAgICAgd2Via2l0OiAwLFxuICAgICAgICBjaHJvbWU6IDAsXG4gICAgICAgIG1vYmlsZTogbnVsbCxcbiAgICAgICAgYWlyOiAwLFxuICAgICAgICBpcGFkOiAwLFxuICAgICAgICBpcGhvbmU6IDAsXG4gICAgICAgIGlwb2Q6IDAsXG4gICAgICAgIGlvczogbnVsbCxcbiAgICAgICAgYW5kcm9pZDogMCxcbiAgICAgICAgd2Vib3M6IDAsXG4gICAgICAgIGNhamE6IG5hdiAmJiBuYXYuY2FqYVZlcnNpb24sXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIG9zOiBudWxsXG5cbiAgICB9LFxuXG4gICAgdWEgPSBhZ2VudCB8fCAobmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQpLFxuICAgIGxvYyA9IHdpbmRvdyAmJiB3aW5kb3cubG9jYXRpb24sXG4gICAgaHJlZiA9IGxvYyAmJiBsb2MuaHJlZixcbiAgICBtO1xuXG4gICAgby5zZWN1cmUgPSBocmVmICYmIChocmVmLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImh0dHBzXCIpID09PSAwKTtcblxuICAgIGlmICh1YSkge1xuXG4gICAgICAgIGlmICgoL3dpbmRvd3N8d2luMzIvaSkudGVzdCh1YSkpIHtcbiAgICAgICAgICAgIG8ub3MgPSAnd2luZG93cyc7XG4gICAgICAgIH0gZWxzZSBpZiAoKC9tYWNpbnRvc2gvaSkudGVzdCh1YSkpIHtcbiAgICAgICAgICAgIG8ub3MgPSAnbWFjaW50b3NoJztcbiAgICAgICAgfSBlbHNlIGlmICgoL3JoaW5vL2kpLnRlc3QodWEpKSB7XG4gICAgICAgICAgICBvLm9zID0gJ3JoaW5vJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKC9LSFRNTC8pLnRlc3QodWEpKSB7XG4gICAgICAgICAgICBvLndlYmtpdCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgbSA9IHVhLm1hdGNoKC9BcHBsZVdlYktpdFxcLyhbXlxcc10qKS8pO1xuICAgICAgICBpZiAobSAmJiBtWzFdKSB7XG4gICAgICAgICAgICBvLndlYmtpdCA9IG51bWJlcmlmeShtWzFdKTtcbiAgICAgICAgICAgIGlmICgvIE1vYmlsZVxcLy8udGVzdCh1YSkpIHtcbiAgICAgICAgICAgICAgICBvLm1vYmlsZSA9ICdBcHBsZSc7IC8vIGlQaG9uZSBvciBpUG9kIFRvdWNoXG4gICAgICAgICAgICAgICAgbSA9IHVhLm1hdGNoKC9PUyAoW15cXHNdKikvKTtcbiAgICAgICAgICAgICAgICBpZiAobSAmJiBtWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIG0gPSBudW1iZXJpZnkobVsxXS5yZXBsYWNlKCdfJywgJy4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG8uaW9zID0gbTtcbiAgICAgICAgICAgICAgICBvLmlwYWQgPSBvLmlwb2QgPSBvLmlwaG9uZSA9IDA7XG4gICAgICAgICAgICAgICAgbSA9IHVhLm1hdGNoKC9pUGFkfGlQb2R8aVBob25lLyk7XG4gICAgICAgICAgICAgICAgaWYgKG0gJiYgbVswXSkge1xuICAgICAgICAgICAgICAgICAgICBvW21bMF0udG9Mb3dlckNhc2UoKV0gPSBvLmlvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG0gPSB1YS5tYXRjaCgvTm9raWFOW15cXC9dKnxBbmRyb2lkIFxcZFxcLlxcZHx3ZWJPU1xcL1xcZFxcLlxcZC8pO1xuICAgICAgICAgICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ubW9iaWxlID0gbVswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC93ZWJPUy8udGVzdCh1YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgby5tb2JpbGUgPSAnV2ViT1MnO1xuICAgICAgICAgICAgICAgICAgICBtID0gdWEubWF0Y2goL3dlYk9TXFwvKFteXFxzXSopOy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobSAmJiBtWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLndlYm9zID0gbnVtYmVyaWZ5KG1bMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvIEFuZHJvaWQvLnRlc3QodWEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ubW9iaWxlID0gJ0FuZHJvaWQnO1xuICAgICAgICAgICAgICAgICAgICBtID0gdWEubWF0Y2goL0FuZHJvaWQgKFteXFxzXSopOy8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobSAmJiBtWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLmFuZHJvaWQgPSBudW1iZXJpZnkobVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtID0gdWEubWF0Y2goL0Nocm9tZVxcLyhbXlxcc10qKS8pO1xuICAgICAgICAgICAgaWYgKG0gJiYgbVsxXSkge1xuICAgICAgICAgICAgICAgIG8uY2hyb21lID0gbnVtYmVyaWZ5KG1bMV0pOyAvLyBDaHJvbWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbSA9IHVhLm1hdGNoKC9BZG9iZUFJUlxcLyhbXlxcc10qKS8pO1xuICAgICAgICAgICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uYWlyID0gbVswXTsgLy8gQWRvYmUgQUlSIDEuMCBvciBiZXR0ZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvLndlYmtpdCkge1xuICAgICAgICAgICAgbSA9IHVhLm1hdGNoKC9PcGVyYVtcXHNcXC9dKFteXFxzXSopLyk7XG4gICAgICAgICAgICBpZiAobSAmJiBtWzFdKSB7XG4gICAgICAgICAgICAgICAgby5vcGVyYSA9IG51bWJlcmlmeShtWzFdKTtcbiAgICAgICAgICAgICAgICBtID0gdWEubWF0Y2goL1ZlcnNpb25cXC8oW15cXHNdKikvKTtcbiAgICAgICAgICAgICAgICBpZiAobSAmJiBtWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ub3BlcmEgPSBudW1iZXJpZnkobVsxXSk7IC8vIG9wZXJhIDEwK1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtID0gdWEubWF0Y2goL09wZXJhIE1pbmlbXjtdKi8pO1xuICAgICAgICAgICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ubW9iaWxlID0gbVswXTsgLy8gZXg6IE9wZXJhIE1pbmkvMi4wLjQ1MDkvMTMxNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vdCBvcGVyYSBvciB3ZWJraXRcbiAgICAgICAgICAgICAgICBtID0gdWEubWF0Y2goL01TSUVcXHMoW147XSopLyk7XG4gICAgICAgICAgICAgICAgaWYgKG0gJiYgbVsxXSkge1xuICAgICAgICAgICAgICAgICAgICBvLmllID0gbnVtYmVyaWZ5KG1bMV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vdCBvcGVyYSwgd2Via2l0LCBvciBpZVxuICAgICAgICAgICAgICAgICAgICBtID0gdWEubWF0Y2goL0dlY2tvXFwvKFteXFxzXSopLyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLmdlY2tvID0gMTsgLy8gR2Vja28gZGV0ZWN0ZWQsIGxvb2sgZm9yIHJldmlzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gdWEubWF0Y2goL3J2OihbXlxcc1xcKV0qKS8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0gJiYgbVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uZ2Vja28gPSBudW1iZXJpZnkobVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG87XG59O1xuXG5KU1guZW52LnVhID0gSlNYLmVudi5wYXJzZVVBKCk7XG5cbkpTWC5pc0Z1bmN0aW9uID0gZnVuY3Rpb24obykge1xuICAgIHJldHVybiAodHlwZW9mIG8gPT09ICdmdW5jdGlvbicpIHx8IE9QLnRvU3RyaW5nLmFwcGx5KG8pID09PSBGVU5DVElPTl9UT1NUUklORztcbn07XG5cbkpTWC5fSUVFbnVtRml4ID0gKEpTWC5lbnYudWEuaWUpID8gZnVuY3Rpb24ociwgcykge1xuICAgIHZhciBpLCBmbmFtZSwgZjtcbiAgICBmb3IgKGk9MDtpPEFERC5sZW5ndGg7aT1pKzEpIHtcblxuICAgICAgICBmbmFtZSA9IEFERFtpXTtcbiAgICAgICAgZiA9IHNbZm5hbWVdO1xuXG4gICAgICAgIGlmIChMLmlzRnVuY3Rpb24oZikgJiYgZiE9T1BbZm5hbWVdKSB7XG4gICAgICAgICAgICByW2ZuYW1lXT1mO1xuICAgICAgICB9XG4gICAgfVxufSA6IGZ1bmN0aW9uKCl7fTtcblxuSlNYLmV4dGVuZCA9IGZ1bmN0aW9uKHN1YmMsIHN1cGVyYywgb3ZlcnJpZGVzKSB7XG4gICAgaWYgKCFzdXBlcmN8fCFzdWJjKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImV4dGVuZCBmYWlsZWQsIHBsZWFzZSBjaGVjayB0aGF0IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxsIGRlcGVuZGVuY2llcyBhcmUgaW5jbHVkZWQuXCIpO1xuICAgIH1cbiAgICB2YXIgRiA9IGZ1bmN0aW9uKCkge30sIGk7XG4gICAgRi5wcm90b3R5cGU9c3VwZXJjLnByb3RvdHlwZTtcbiAgICBzdWJjLnByb3RvdHlwZT1uZXcgRigpO1xuICAgIHN1YmMucHJvdG90eXBlLmNvbnN0cnVjdG9yPXN1YmM7XG4gICAgc3ViYy5zdXBlcmNsYXNzPXN1cGVyYy5wcm90b3R5cGU7XG4gICAgaWYgKHN1cGVyYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPT0gT1AuY29uc3RydWN0b3IpIHtcbiAgICAgICAgc3VwZXJjLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1zdXBlcmM7XG4gICAgfVxuXG4gICAgaWYgKG92ZXJyaWRlcykge1xuICAgICAgICBmb3IgKGkgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICAgICAgICBpZiAoTC5oYXNPd25Qcm9wZXJ0eShvdmVycmlkZXMsIGkpKSB7XG4gICAgICAgICAgICAgICAgc3ViYy5wcm90b3R5cGVbaV09b3ZlcnJpZGVzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgTC5fSUVFbnVtRml4KHN1YmMucHJvdG90eXBlLCBvdmVycmlkZXMpO1xuICAgIH1cbn07XG5cbi8qXG4gKiBhc24xLmpzIC0gQVNOLjEgREVSIGVuY29kZXIgY2xhc3Nlc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMyBLZW5qaSBVcnVzaGltYSAoa2VuamkudXJ1c2hpbWFAZ21haWwuY29tKVxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHA6Ly9ranVyLmdpdGh1Yi5jb20vanNyc2FzaWduL2xpY2Vuc2VcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IGFuZCBsaWNlbnNlIG5vdGljZSBzaGFsbCBiZSBcbiAqIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICovXG5cbi8qKlxuICogQGZpbGVPdmVydmlld1xuICogQG5hbWUgYXNuMS0xLjAuanNcbiAqIEBhdXRob3IgS2VuamkgVXJ1c2hpbWEga2VuamkudXJ1c2hpbWFAZ21haWwuY29tXG4gKiBAdmVyc2lvbiAxLjAuMiAoMjAxMy1NYXktMzApXG4gKiBAc2luY2UgMi4xXG4gKiBAbGljZW5zZSA8YSBocmVmPVwiaHR0cDovL2tqdXIuZ2l0aHViLmlvL2pzcnNhc2lnbi9saWNlbnNlL1wiPk1JVCBMaWNlbnNlPC9hPlxuICovXG5cbi8qKiBcbiAqIGtqdXIncyBjbGFzcyBsaWJyYXJ5IG5hbWUgc3BhY2VcbiAqIDxwPlxuICogVGhpcyBuYW1lIHNwYWNlIHByb3ZpZGVzIGZvbGxvd2luZyBuYW1lIHNwYWNlczpcbiAqIDx1bD5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xfSAtIEFTTi4xIHByaW1pdGl2ZSBoZXhhZGVjaW1hbCBlbmNvZGVyPC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLng1MDl9IC0gQVNOLjEgc3RydWN0dXJlIGZvciBYLjUwOSBjZXJ0aWZpY2F0ZSBhbmQgQ1JMPC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5jcnlwdG99IC0gSmF2YSBDcnlwdG9ncmFwaGljIEV4dGVuc2lvbihKQ0UpIHN0eWxlIE1lc3NhZ2VEaWdlc3QvU2lnbmF0dXJlIFxuICogY2xhc3MgYW5kIHV0aWxpdGllczwvbGk+XG4gKiA8L3VsPlxuICogPC9wPiBcbiAqIE5PVEU6IFBsZWFzZSBpZ25vcmUgbWV0aG9kIHN1bW1hcnkgYW5kIGRvY3VtZW50IG9mIHRoaXMgbmFtZXNwYWNlLiBUaGlzIGNhdXNlZCBieSBhIGJ1ZyBvZiBqc2RvYzIuXG4gICogQG5hbWUgS0pVUlxuICogQG5hbWVzcGFjZSBranVyJ3MgY2xhc3MgbGlicmFyeSBuYW1lIHNwYWNlXG4gKi9cbnZhciBLSlVSO1xuaWYgKHR5cGVvZiBLSlVSID09IFwidW5kZWZpbmVkXCIgfHwgIUtKVVIpIEtKVVIgPSB7fTtcblxuLyoqXG4gKiBranVyJ3MgQVNOLjEgY2xhc3MgbGlicmFyeSBuYW1lIHNwYWNlXG4gKiA8cD5cbiAqIFRoaXMgaXMgSVRVLVQgWC42OTAgQVNOLjEgREVSIGVuY29kZXIgY2xhc3MgbGlicmFyeSBhbmRcbiAqIGNsYXNzIHN0cnVjdHVyZSBhbmQgbWV0aG9kcyBpcyB2ZXJ5IHNpbWlsYXIgdG8gXG4gKiBvcmcuYm91bmN5Y2FzdGxlLmFzbjEgcGFja2FnZSBvZiBcbiAqIHdlbGwga25vd24gQm91bmN5Q2FzbHRlIENyeXB0b2dyYXBoeSBMaWJyYXJ5LlxuICpcbiAqIDxoND5QUk9WSURJTkcgQVNOLjEgUFJJTUlUSVZFUzwvaDQ+XG4gKiBIZXJlIGFyZSBBU04uMSBERVIgcHJpbWl0aXZlIGNsYXNzZXMuXG4gKiA8dWw+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJCb29sZWFufTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJJbnRlZ2VyfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmd9PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJOdWxsfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJVVEY4U3RyaW5nfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJQcmludGFibGVTdHJpbmd9PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUlRlbGV0ZXhTdHJpbmd9PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUklBNVN0cmluZ308L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSVVRDVGltZX08L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJTZXF1ZW5jZX08L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSU2V0fTwvbGk+XG4gKiA8L3VsPlxuICpcbiAqIDxoND5PVEhFUiBBU04uMSBDTEFTU0VTPC9oND5cbiAqIDx1bD5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkFTTjFPYmplY3R9PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nfTwvbGk+XG4gKiA8bGk+e0BsaW5rIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWV9PC9saT5cbiAqIDxsaT57QGxpbmsgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZH08L2xpPlxuICogPGxpPntAbGluayBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0fTwvbGk+XG4gKiA8L3VsPlxuICogPC9wPlxuICogTk9URTogUGxlYXNlIGlnbm9yZSBtZXRob2Qgc3VtbWFyeSBhbmQgZG9jdW1lbnQgb2YgdGhpcyBuYW1lc3BhY2UuIFRoaXMgY2F1c2VkIGJ5IGEgYnVnIG9mIGpzZG9jMi5cbiAqIEBuYW1lIEtKVVIuYXNuMVxuICogQG5hbWVzcGFjZVxuICovXG5pZiAodHlwZW9mIEtKVVIuYXNuMSA9PSBcInVuZGVmaW5lZFwiIHx8ICFLSlVSLmFzbjEpIEtKVVIuYXNuMSA9IHt9O1xuXG4vKipcbiAqIEFTTjEgdXRpbGl0aWVzIGNsYXNzXG4gKiBAbmFtZSBLSlVSLmFzbjEuQVNOMVV0aWxcbiAqIEBjbGFzc3MgQVNOMSB1dGlsaXRpZXMgY2xhc3NcbiAqIEBzaW5jZSBhc24xIDEuMC4yXG4gKi9cbktKVVIuYXNuMS5BU04xVXRpbCA9IG5ldyBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmludGVnZXJUb0J5dGVIZXggPSBmdW5jdGlvbihpKSB7XG5cdHZhciBoID0gaS50b1N0cmluZygxNik7XG5cdGlmICgoaC5sZW5ndGggJSAyKSA9PSAxKSBoID0gJzAnICsgaDtcblx0cmV0dXJuIGg7XG4gICAgfTtcbiAgICB0aGlzLmJpZ0ludFRvTWluVHdvc0NvbXBsZW1lbnRzSGV4ID0gZnVuY3Rpb24oYmlnSW50ZWdlclZhbHVlKSB7XG5cdHZhciBoID0gYmlnSW50ZWdlclZhbHVlLnRvU3RyaW5nKDE2KTtcblx0aWYgKGguc3Vic3RyKDAsIDEpICE9ICctJykge1xuXHQgICAgaWYgKGgubGVuZ3RoICUgMiA9PSAxKSB7XG5cdFx0aCA9ICcwJyArIGg7XG5cdCAgICB9IGVsc2Uge1xuXHRcdGlmICghIGgubWF0Y2goL15bMC03XS8pKSB7XG5cdFx0ICAgIGggPSAnMDAnICsgaDtcblx0XHR9XG5cdCAgICB9XG5cdH0gZWxzZSB7XG5cdCAgICB2YXIgaFBvcyA9IGguc3Vic3RyKDEpO1xuXHQgICAgdmFyIHhvckxlbiA9IGhQb3MubGVuZ3RoO1xuXHQgICAgaWYgKHhvckxlbiAlIDIgPT0gMSkge1xuXHRcdHhvckxlbiArPSAxO1xuXHQgICAgfSBlbHNlIHtcblx0XHRpZiAoISBoLm1hdGNoKC9eWzAtN10vKSkge1xuXHRcdCAgICB4b3JMZW4gKz0gMjtcblx0XHR9XG5cdCAgICB9XG5cdCAgICB2YXIgaE1hc2sgPSAnJztcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeG9yTGVuOyBpKyspIHtcblx0XHRoTWFzayArPSAnZic7XG5cdCAgICB9XG5cdCAgICB2YXIgYmlNYXNrID0gbmV3IEJpZ0ludGVnZXIoaE1hc2ssIDE2KTtcblx0ICAgIHZhciBiaU5lZyA9IGJpTWFzay54b3IoYmlnSW50ZWdlclZhbHVlKS5hZGQoQmlnSW50ZWdlci5PTkUpO1xuXHQgICAgaCA9IGJpTmVnLnRvU3RyaW5nKDE2KS5yZXBsYWNlKC9eLS8sICcnKTtcblx0fVxuXHRyZXR1cm4gaDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdldCBQRU0gc3RyaW5nIGZyb20gaGV4YWRlY2ltYWwgZGF0YSBhbmQgaGVhZGVyIHN0cmluZ1xuICAgICAqIEBuYW1lIGdldFBFTVN0cmluZ0Zyb21IZXhcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFVdGlsXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFIZXggaGV4YWRlY2ltYWwgc3RyaW5nIG9mIFBFTSBib2R5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBlbUhlYWRlciBQRU0gaGVhZGVyIHN0cmluZyAoZXguICdSU0EgUFJJVkFURSBLRVknKVxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gUEVNIGZvcm1hdHRlZCBzdHJpbmcgb2YgaW5wdXQgZGF0YVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHBlbSAgPSBLSlVSLmFzbjEuQVNOMVV0aWwuZ2V0UEVNU3RyaW5nRnJvbUhleCgnNjE2MTYxJywgJ1JTQSBQUklWQVRFIEtFWScpO1xuICAgICAqIC8vIHZhbHVlIG9mIHBlbSB3aWxsIGJlOlxuICAgICAqIC0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuICAgICAqIFlXRmhcbiAgICAgKiAtLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4gICAgICovXG4gICAgdGhpcy5nZXRQRU1TdHJpbmdGcm9tSGV4ID0gZnVuY3Rpb24oZGF0YUhleCwgcGVtSGVhZGVyKSB7XG5cdHZhciBkYXRhV0EgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGRhdGFIZXgpO1xuXHR2YXIgZGF0YUI2NCA9IENyeXB0b0pTLmVuYy5CYXNlNjQuc3RyaW5naWZ5KGRhdGFXQSk7XG5cdHZhciBwZW1Cb2R5ID0gZGF0YUI2NC5yZXBsYWNlKC8oLns2NH0pL2csIFwiJDFcXHJcXG5cIik7XG4gICAgICAgIHBlbUJvZHkgPSBwZW1Cb2R5LnJlcGxhY2UoL1xcclxcbiQvLCAnJyk7XG5cdHJldHVybiBcIi0tLS0tQkVHSU4gXCIgKyBwZW1IZWFkZXIgKyBcIi0tLS0tXFxyXFxuXCIgKyBcbiAgICAgICAgICAgICAgIHBlbUJvZHkgKyBcbiAgICAgICAgICAgICAgIFwiXFxyXFxuLS0tLS1FTkQgXCIgKyBwZW1IZWFkZXIgKyBcIi0tLS0tXFxyXFxuXCI7XG4gICAgfTtcbn07XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQWJzdHJhY3QgQVNOLjEgQ2xhc3Nlc1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuLyoqXG4gKiBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgZW5jb2RlciBvYmplY3RcbiAqIEBuYW1lIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAY2xhc3MgYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIGVuY29kZXIgb2JqZWN0XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzTW9kaWZpZWQgZmxhZyB3aGV0aGVyIGludGVybmFsIGRhdGEgd2FzIGNoYW5nZWRcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBoVExWIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFZcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBoVCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIHRhZyhUKVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGhMIGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgbGVuZ3RoKEwpXG4gKiBAcHJvcGVydHkge1N0cmluZ30gaFYgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMViB2YWx1ZShWKVxuICogQGRlc2NyaXB0aW9uXG4gKi9cbktKVVIuYXNuMS5BU04xT2JqZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlzTW9kaWZpZWQgPSB0cnVlO1xuICAgIHZhciBoVExWID0gbnVsbDtcbiAgICB2YXIgaFQgPSAnMDAnXG4gICAgdmFyIGhMID0gJzAwJztcbiAgICB2YXIgaFYgPSAnJztcblxuICAgIC8qKlxuICAgICAqIGdldCBoZXhhZGVjaW1hbCBBU04uMSBUTFYgbGVuZ3RoKEwpIGJ5dGVzIGZyb20gVExWIHZhbHVlKFYpXG4gICAgICogQG5hbWUgZ2V0TGVuZ3RoSGV4RnJvbVZhbHVlXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIGxlbmd0aChMKVxuICAgICAqL1xuICAgIHRoaXMuZ2V0TGVuZ3RoSGV4RnJvbVZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgdGhpcy5oViA9PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMuaFYgPT0gbnVsbCkge1xuXHQgICAgdGhyb3cgXCJ0aGlzLmhWIGlzIG51bGwgb3IgdW5kZWZpbmVkLlwiO1xuXHR9XG5cdGlmICh0aGlzLmhWLmxlbmd0aCAlIDIgPT0gMSkge1xuXHQgICAgdGhyb3cgXCJ2YWx1ZSBoZXggbXVzdCBiZSBldmVuIGxlbmd0aDogbj1cIiArIGhWLmxlbmd0aCArIFwiLHY9XCIgKyB0aGlzLmhWO1xuXHR9XG5cdHZhciBuID0gdGhpcy5oVi5sZW5ndGggLyAyO1xuXHR2YXIgaE4gPSBuLnRvU3RyaW5nKDE2KTtcblx0aWYgKGhOLmxlbmd0aCAlIDIgPT0gMSkge1xuXHQgICAgaE4gPSBcIjBcIiArIGhOO1xuXHR9XG5cdGlmIChuIDwgMTI4KSB7XG5cdCAgICByZXR1cm4gaE47XG5cdH0gZWxzZSB7XG5cdCAgICB2YXIgaE5sZW4gPSBoTi5sZW5ndGggLyAyO1xuXHQgICAgaWYgKGhObGVuID4gMTUpIHtcblx0XHR0aHJvdyBcIkFTTi4xIGxlbmd0aCB0b28gbG9uZyB0byByZXByZXNlbnQgYnkgOHg6IG4gPSBcIiArIG4udG9TdHJpbmcoMTYpO1xuXHQgICAgfVxuXHQgICAgdmFyIGhlYWQgPSAxMjggKyBoTmxlbjtcblx0ICAgIHJldHVybiBoZWFkLnRvU3RyaW5nKDE2KSArIGhOO1xuXHR9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGdldCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIGJ5dGVzXG4gICAgICogQG5hbWUgZ2V0RW5jb2RlZEhleFxuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIFRMVlxuICAgICAqL1xuICAgIHRoaXMuZ2V0RW5jb2RlZEhleCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAodGhpcy5oVExWID09IG51bGwgfHwgdGhpcy5pc01vZGlmaWVkKSB7XG5cdCAgICB0aGlzLmhWID0gdGhpcy5nZXRGcmVzaFZhbHVlSGV4KCk7XG5cdCAgICB0aGlzLmhMID0gdGhpcy5nZXRMZW5ndGhIZXhGcm9tVmFsdWUoKTtcblx0ICAgIHRoaXMuaFRMViA9IHRoaXMuaFQgKyB0aGlzLmhMICsgdGhpcy5oVjtcblx0ICAgIHRoaXMuaXNNb2RpZmllZCA9IGZhbHNlO1xuXHQgICAgLy9jb25zb2xlLmVycm9yKFwiZmlyc3QgdGltZTogXCIgKyB0aGlzLmhUTFYpO1xuXHR9XG5cdHJldHVybiB0aGlzLmhUTFY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGdldCBoZXhhZGVjaW1hbCBzdHJpbmcgb2YgQVNOLjEgVExWIHZhbHVlKFYpIGJ5dGVzXG4gICAgICogQG5hbWUgZ2V0VmFsdWVIZXhcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkFTTjFPYmplY3RcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSBUTFYgdmFsdWUoVikgYnl0ZXNcbiAgICAgKi9cbiAgICB0aGlzLmdldFZhbHVlSGV4ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZ2V0RW5jb2RlZEhleCgpO1xuXHRyZXR1cm4gdGhpcy5oVjtcbiAgICB9XG5cbiAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuICcnO1xuICAgIH07XG59O1xuXG4vLyA9PSBCRUdJTiBERVJBYnN0cmFjdFN0cmluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8qKlxuICogYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIHN0cmluZyBjbGFzc2VzXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBjbGFzcyBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgc3RyaW5nIGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcyBpbnRlcm5hbCBzdHJpbmcgb2YgdmFsdWVcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5zdHIgLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBzdHJpbmc8L2xpPlxuICogPGxpPmhleCAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZzwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbktKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gICAgdmFyIHMgPSBudWxsO1xuICAgIHZhciBoViA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBnZXQgc3RyaW5nIHZhbHVlIG9mIHRoaXMgc3RyaW5nIG9iamVjdFxuICAgICAqIEBuYW1lIGdldFN0cmluZ1xuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyB2YWx1ZSBvZiB0aGlzIHN0cmluZyBvYmplY3RcbiAgICAgKi9cbiAgICB0aGlzLmdldFN0cmluZyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5zO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdmFsdWUgYnkgYSBzdHJpbmdcbiAgICAgKiBAbmFtZSBzZXRTdHJpbmdcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5ld1MgdmFsdWUgYnkgYSBzdHJpbmcgdG8gc2V0XG4gICAgICovXG4gICAgdGhpcy5zZXRTdHJpbmcgPSBmdW5jdGlvbihuZXdTKSB7XG5cdHRoaXMuaFRMViA9IG51bGw7XG5cdHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG5cdHRoaXMucyA9IG5ld1M7XG5cdHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2V0IHZhbHVlIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nXG4gICAgICogQG5hbWUgc2V0U3RyaW5nSGV4XG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdIZXhTdHJpbmcgdmFsdWUgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmcgdG8gc2V0XG4gICAgICovXG4gICAgdGhpcy5zZXRTdHJpbmdIZXggPSBmdW5jdGlvbihuZXdIZXhTdHJpbmcpIHtcblx0dGhpcy5oVExWID0gbnVsbDtcblx0dGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcblx0dGhpcy5zID0gbnVsbDtcblx0dGhpcy5oViA9IG5ld0hleFN0cmluZztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmhWO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2YgcGFyYW1zWydzdHInXSAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICB0aGlzLnNldFN0cmluZyhwYXJhbXNbJ3N0ciddKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydoZXgnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICB0aGlzLnNldFN0cmluZ0hleChwYXJhbXNbJ2hleCddKTtcblx0fVxuICAgIH1cbn07XG5KU1guZXh0ZW5kKEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZywgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuLy8gPT0gRU5EICAgREVSQWJzdHJhY3RTdHJpbmcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vID09IEJFR0lOIERFUkFic3RyYWN0VGltZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLyoqXG4gKiBiYXNlIGNsYXNzIGZvciBBU04uMSBERVIgR2VuZXJhbGl6ZWQvVVRDVGltZSBjbGFzc1xuICogQG5hbWUgS0pVUi5hc24xLkRFUkFic3RyYWN0VGltZVxuICogQGNsYXNzIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBHZW5lcmFsaXplZC9VVENUaW1lIGNsYXNzXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJzEzMDQzMDIzNTk1OVonfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgICB2YXIgcyA9IG51bGw7XG4gICAgdmFyIGRhdGUgPSBudWxsO1xuXG4gICAgLy8gLS0tIFBSSVZBVEUgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHRoaXMubG9jYWxEYXRlVG9VVEMgPSBmdW5jdGlvbihkKSB7XG5cdHV0YyA9IGQuZ2V0VGltZSgpICsgKGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwKTtcblx0dmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZSh1dGMpO1xuXHRyZXR1cm4gdXRjRGF0ZTtcbiAgICB9O1xuXG4gICAgdGhpcy5mb3JtYXREYXRlID0gZnVuY3Rpb24oZGF0ZU9iamVjdCwgdHlwZSkge1xuXHR2YXIgcGFkID0gdGhpcy56ZXJvUGFkZGluZztcblx0dmFyIGQgPSB0aGlzLmxvY2FsRGF0ZVRvVVRDKGRhdGVPYmplY3QpO1xuXHR2YXIgeWVhciA9IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpO1xuXHRpZiAodHlwZSA9PSAndXRjJykgeWVhciA9IHllYXIuc3Vic3RyKDIsIDIpO1xuXHR2YXIgbW9udGggPSBwYWQoU3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLCAyKTtcblx0dmFyIGRheSA9IHBhZChTdHJpbmcoZC5nZXREYXRlKCkpLCAyKTtcblx0dmFyIGhvdXIgPSBwYWQoU3RyaW5nKGQuZ2V0SG91cnMoKSksIDIpO1xuXHR2YXIgbWluID0gcGFkKFN0cmluZyhkLmdldE1pbnV0ZXMoKSksIDIpO1xuXHR2YXIgc2VjID0gcGFkKFN0cmluZyhkLmdldFNlY29uZHMoKSksIDIpO1xuXHRyZXR1cm4geWVhciArIG1vbnRoICsgZGF5ICsgaG91ciArIG1pbiArIHNlYyArICdaJztcbiAgICB9O1xuXG4gICAgdGhpcy56ZXJvUGFkZGluZyA9IGZ1bmN0aW9uKHMsIGxlbikge1xuXHRpZiAocy5sZW5ndGggPj0gbGVuKSByZXR1cm4gcztcblx0cmV0dXJuIG5ldyBBcnJheShsZW4gLSBzLmxlbmd0aCArIDEpLmpvaW4oJzAnKSArIHM7XG4gICAgfTtcblxuICAgIC8vIC0tLSBQVUJMSUMgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqIGdldCBzdHJpbmcgdmFsdWUgb2YgdGhpcyBzdHJpbmcgb2JqZWN0XG4gICAgICogQG5hbWUgZ2V0U3RyaW5nXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWVcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyB2YWx1ZSBvZiB0aGlzIHRpbWUgb2JqZWN0XG4gICAgICovXG4gICAgdGhpcy5nZXRTdHJpbmcgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMucztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2V0IHZhbHVlIGJ5IGEgc3RyaW5nXG4gICAgICogQG5hbWUgc2V0U3RyaW5nXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWVcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3UyB2YWx1ZSBieSBhIHN0cmluZyB0byBzZXQgc3VjaCBsaWtlIFwiMTMwNDMwMjM1OTU5WlwiXG4gICAgICovXG4gICAgdGhpcy5zZXRTdHJpbmcgPSBmdW5jdGlvbihuZXdTKSB7XG5cdHRoaXMuaFRMViA9IG51bGw7XG5cdHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG5cdHRoaXMucyA9IG5ld1M7XG5cdHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2V0IHZhbHVlIGJ5IGEgRGF0ZSBvYmplY3RcbiAgICAgKiBAbmFtZSBzZXRCeURhdGVWYWx1ZVxuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB5ZWFyIHllYXIgb2YgZGF0ZSAoZXguIDIwMTMpXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBtb250aCBtb250aCBvZiBkYXRlIGJldHdlZW4gMSBhbmQgMTIgKGV4LiAxMilcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGRheSBkYXkgb2YgbW9udGhcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGhvdXIgaG91cnMgb2YgZGF0ZVxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gbWluIG1pbnV0ZXMgb2YgZGF0ZVxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gc2VjIHNlY29uZHMgb2YgZGF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2V0QnlEYXRlVmFsdWUgPSBmdW5jdGlvbih5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW4sIHNlYykge1xuXHR2YXIgZGF0ZU9iamVjdCA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW4sIHNlYywgMCkpO1xuXHR0aGlzLnNldEJ5RGF0ZShkYXRlT2JqZWN0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmhWO1xuICAgIH07XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyA9PSBFTkQgICBERVJBYnN0cmFjdFRpbWUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gPT0gQkVHSU4gREVSQWJzdHJhY3RTdHJ1Y3R1cmVkID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vKipcbiAqIGJhc2UgY2xhc3MgZm9yIEFTTi4xIERFUiBzdHJ1Y3R1cmVkIGNsYXNzXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXG4gKiBAY2xhc3MgYmFzZSBjbGFzcyBmb3IgQVNOLjEgREVSIHN0cnVjdHVyZWQgY2xhc3NcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IGFzbjFBcnJheSBpbnRlcm5hbCBhcnJheSBvZiBBU04xT2JqZWN0XG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5BU04xT2JqZWN0IC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgICB2YXIgYXNuMUFycmF5ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIHNldCB2YWx1ZSBieSBhcnJheSBvZiBBU04xT2JqZWN0XG4gICAgICogQG5hbWUgc2V0QnlBU04xT2JqZWN0QXJyYXlcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZFxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFzbjFPYmplY3RBcnJheSBhcnJheSBvZiBBU04xT2JqZWN0IHRvIHNldFxuICAgICAqL1xuICAgIHRoaXMuc2V0QnlBU04xT2JqZWN0QXJyYXkgPSBmdW5jdGlvbihhc24xT2JqZWN0QXJyYXkpIHtcblx0dGhpcy5oVExWID0gbnVsbDtcblx0dGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcblx0dGhpcy5hc24xQXJyYXkgPSBhc24xT2JqZWN0QXJyYXk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGFwcGVuZCBhbiBBU04xT2JqZWN0IHRvIGludGVybmFsIGFycmF5XG4gICAgICogQG5hbWUgYXBwZW5kQVNOMU9iamVjdFxuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtBU04xT2JqZWN0fSBhc24xT2JqZWN0IHRvIGFkZFxuICAgICAqL1xuICAgIHRoaXMuYXBwZW5kQVNOMU9iamVjdCA9IGZ1bmN0aW9uKGFzbjFPYmplY3QpIHtcblx0dGhpcy5oVExWID0gbnVsbDtcblx0dGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcblx0dGhpcy5hc24xQXJyYXkucHVzaChhc24xT2JqZWN0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hc24xQXJyYXkgPSBuZXcgQXJyYXkoKTtcbiAgICBpZiAodHlwZW9mIHBhcmFtcyAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2YgcGFyYW1zWydhcnJheSddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuYXNuMUFycmF5ID0gcGFyYW1zWydhcnJheSddO1xuXHR9XG4gICAgfVxufTtcbkpTWC5leHRlbmQoS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZCwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQVNOLjEgT2JqZWN0IENsYXNzZXNcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgQm9vbGVhblxuICogQG5hbWUgS0pVUi5hc24xLkRFUkJvb2xlYW5cbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIEJvb2xlYW5cbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJCb29sZWFuID0gZnVuY3Rpb24oKSB7XG4gICAgS0pVUi5hc24xLkRFUkJvb2xlYW4uc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuaFQgPSBcIjAxXCI7XG4gICAgdGhpcy5oVExWID0gXCIwMTAxZmZcIjtcbn07XG5KU1guZXh0ZW5kKEtKVVIuYXNuMS5ERVJCb29sZWFuLCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgSW50ZWdlclxuICogQG5hbWUgS0pVUi5hc24xLkRFUkludGVnZXJcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIEludGVnZXJcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5pbnQgLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgaW50ZWdlciB2YWx1ZTwvbGk+XG4gKiA8bGk+YmlnaW50IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IEJpZ0ludGVnZXIgb2JqZWN0PC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5LSlVSLmFzbjEuREVSSW50ZWdlciA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIEtKVVIuYXNuMS5ERVJJbnRlZ2VyLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmhUID0gXCIwMlwiO1xuXG4gICAgLyoqXG4gICAgICogc2V0IHZhbHVlIGJ5IFRvbSBXdSdzIEJpZ0ludGVnZXIgb2JqZWN0XG4gICAgICogQG5hbWUgc2V0QnlCaWdJbnRlZ2VyXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJJbnRlZ2VyXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtCaWdJbnRlZ2VyfSBiaWdJbnRlZ2VyVmFsdWUgdG8gc2V0XG4gICAgICovXG4gICAgdGhpcy5zZXRCeUJpZ0ludGVnZXIgPSBmdW5jdGlvbihiaWdJbnRlZ2VyVmFsdWUpIHtcblx0dGhpcy5oVExWID0gbnVsbDtcblx0dGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcblx0dGhpcy5oViA9IEtKVVIuYXNuMS5BU04xVXRpbC5iaWdJbnRUb01pblR3b3NDb21wbGVtZW50c0hleChiaWdJbnRlZ2VyVmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdmFsdWUgYnkgaW50ZWdlciB2YWx1ZVxuICAgICAqIEBuYW1lIHNldEJ5SW50ZWdlclxuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSSW50ZWdlclxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW50ZWdlciB2YWx1ZSB0byBzZXRcbiAgICAgKi9cbiAgICB0aGlzLnNldEJ5SW50ZWdlciA9IGZ1bmN0aW9uKGludFZhbHVlKSB7XG5cdHZhciBiaSA9IG5ldyBCaWdJbnRlZ2VyKFN0cmluZyhpbnRWYWx1ZSksIDEwKTtcblx0dGhpcy5zZXRCeUJpZ0ludGVnZXIoYmkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdmFsdWUgYnkgaW50ZWdlciB2YWx1ZVxuICAgICAqIEBuYW1lIHNldFZhbHVlSGV4XG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJJbnRlZ2VyXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhleGFkZWNpbWFsIHN0cmluZyBvZiBpbnRlZ2VyIHZhbHVlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogPGJyLz5cbiAgICAgKiBOT1RFOiBWYWx1ZSBzaGFsbCBiZSByZXByZXNlbnRlZCBieSBtaW5pbXVtIG9jdGV0IGxlbmd0aCBvZlxuICAgICAqIHR3bydzIGNvbXBsZW1lbnQgcmVwcmVzZW50YXRpb24uXG4gICAgICovXG4gICAgdGhpcy5zZXRWYWx1ZUhleCA9IGZ1bmN0aW9uKG5ld0hleFN0cmluZykge1xuXHR0aGlzLmhWID0gbmV3SGV4U3RyaW5nO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaFY7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiBwYXJhbXNbJ2JpZ2ludCddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0QnlCaWdJbnRlZ2VyKHBhcmFtc1snYmlnaW50J10pO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2ludCddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0QnlJbnRlZ2VyKHBhcmFtc1snaW50J10pO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2hleCddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0VmFsdWVIZXgocGFyYW1zWydoZXgnXSk7XG5cdH1cbiAgICB9XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVSSW50ZWdlciwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIGVuY29kZWQgQml0U3RyaW5nIHByaW1pdGl2ZVxuICogQG5hbWUgS0pVUi5hc24xLkRFUkJpdFN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgZW5jb2RlZCBCaXRTdHJpbmcgcHJpbWl0aXZlXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uIFxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPmJpbiAtIHNwZWNpZnkgYmluYXJ5IHN0cmluZyAoZXguICcxMDExMScpPC9saT5cbiAqIDxsaT5hcnJheSAtIHNwZWNpZnkgYXJyYXkgb2YgYm9vbGVhbiAoZXguIFt0cnVlLGZhbHNlLHRydWUsdHJ1ZV0pPC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGhleGFkZWNpbWFsIHN0cmluZyBvZiBBU04uMSB2YWx1ZShWKSBpbmNsdWRpbmcgdW51c2VkIGJpdHM8L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5LSlVSLmFzbjEuREVSQml0U3RyaW5nID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgS0pVUi5hc24xLkRFUkJpdFN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gICAgdGhpcy5oVCA9IFwiMDNcIjtcblxuICAgIC8qKlxuICAgICAqIHNldCBBU04uMSB2YWx1ZShWKSBieSBhIGhleGFkZWNpbWFsIHN0cmluZyBpbmNsdWRpbmcgdW51c2VkIGJpdHNcbiAgICAgKiBAbmFtZSBzZXRIZXhWYWx1ZUluY2x1ZGluZ1VudXNlZEJpdHNcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZ1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdIZXhTdHJpbmdJbmNsdWRpbmdVbnVzZWRCaXRzXG4gICAgICovXG4gICAgdGhpcy5zZXRIZXhWYWx1ZUluY2x1ZGluZ1VudXNlZEJpdHMgPSBmdW5jdGlvbihuZXdIZXhTdHJpbmdJbmNsdWRpbmdVbnVzZWRCaXRzKSB7XG5cdHRoaXMuaFRMViA9IG51bGw7XG5cdHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG5cdHRoaXMuaFYgPSBuZXdIZXhTdHJpbmdJbmNsdWRpbmdVbnVzZWRCaXRzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXQgQVNOLjEgdmFsdWUoVikgYnkgdW51c2VkIGJpdCBhbmQgaGV4YWRlY2ltYWwgc3RyaW5nIG9mIHZhbHVlXG4gICAgICogQG5hbWUgc2V0VW51c2VkQml0c0FuZEhleFZhbHVlXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmdcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHVudXNlZEJpdHNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaFZhbHVlXG4gICAgICovXG4gICAgdGhpcy5zZXRVbnVzZWRCaXRzQW5kSGV4VmFsdWUgPSBmdW5jdGlvbih1bnVzZWRCaXRzLCBoVmFsdWUpIHtcblx0aWYgKHVudXNlZEJpdHMgPCAwIHx8IDcgPCB1bnVzZWRCaXRzKSB7XG5cdCAgICB0aHJvdyBcInVudXNlZCBiaXRzIHNoYWxsIGJlIGZyb20gMCB0byA3OiB1ID0gXCIgKyB1bnVzZWRCaXRzO1xuXHR9XG5cdHZhciBoVW51c2VkQml0cyA9IFwiMFwiICsgdW51c2VkQml0cztcblx0dGhpcy5oVExWID0gbnVsbDtcblx0dGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcblx0dGhpcy5oViA9IGhVbnVzZWRCaXRzICsgaFZhbHVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBzZXQgQVNOLjEgREVSIEJpdFN0cmluZyBieSBiaW5hcnkgc3RyaW5nXG4gICAgICogQG5hbWUgc2V0QnlCaW5hcnlTdHJpbmdcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZ1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiaW5hcnlTdHJpbmcgYmluYXJ5IHZhbHVlIHN0cmluZyAoaS5lLiAnMTAxMTEnKVxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEl0cyB1bnVzZWQgYml0cyB3aWxsIGJlIGNhbGN1bGF0ZWQgYXV0b21hdGljYWxseSBieSBsZW5ndGggb2YgXG4gICAgICogJ2JpbmFyeVZhbHVlJy4gPGJyLz5cbiAgICAgKiBOT1RFOiBUcmFpbGluZyB6ZXJvcyAnMCcgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHRoaXMuc2V0QnlCaW5hcnlTdHJpbmcgPSBmdW5jdGlvbihiaW5hcnlTdHJpbmcpIHtcblx0YmluYXJ5U3RyaW5nID0gYmluYXJ5U3RyaW5nLnJlcGxhY2UoLzArJC8sICcnKTtcblx0dmFyIHVudXNlZEJpdHMgPSA4IC0gYmluYXJ5U3RyaW5nLmxlbmd0aCAlIDg7XG5cdGlmICh1bnVzZWRCaXRzID09IDgpIHVudXNlZEJpdHMgPSAwO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8PSB1bnVzZWRCaXRzOyBpKyspIHtcblx0ICAgIGJpbmFyeVN0cmluZyArPSAnMCc7XG5cdH1cblx0dmFyIGggPSAnJztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiaW5hcnlTdHJpbmcubGVuZ3RoIC0gMTsgaSArPSA4KSB7XG5cdCAgICB2YXIgYiA9IGJpbmFyeVN0cmluZy5zdWJzdHIoaSwgOCk7XG5cdCAgICB2YXIgeCA9IHBhcnNlSW50KGIsIDIpLnRvU3RyaW5nKDE2KTtcblx0ICAgIGlmICh4Lmxlbmd0aCA9PSAxKSB4ID0gJzAnICsgeDtcblx0ICAgIGggKz0geDsgIFxuXHR9XG5cdHRoaXMuaFRMViA9IG51bGw7XG5cdHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG5cdHRoaXMuaFYgPSAnMCcgKyB1bnVzZWRCaXRzICsgaDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2V0IEFTTi4xIFRMViB2YWx1ZShWKSBieSBhbiBhcnJheSBvZiBib29sZWFuXG4gICAgICogQG5hbWUgc2V0QnlCb29sZWFuQXJyYXlcbiAgICAgKiBAbWVtYmVyT2YgS0pVUi5hc24xLkRFUkJpdFN0cmluZ1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGJvb2xlYW5BcnJheSBhcnJheSBvZiBib29sZWFuIChleC4gW3RydWUsIGZhbHNlLCB0cnVlXSlcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBOT1RFOiBUcmFpbGluZyBmYWxzZXMgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHRoaXMuc2V0QnlCb29sZWFuQXJyYXkgPSBmdW5jdGlvbihib29sZWFuQXJyYXkpIHtcblx0dmFyIHMgPSAnJztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBib29sZWFuQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0ICAgIGlmIChib29sZWFuQXJyYXlbaV0gPT0gdHJ1ZSkge1xuXHRcdHMgKz0gJzEnO1xuXHQgICAgfSBlbHNlIHtcblx0XHRzICs9ICcwJztcblx0ICAgIH1cblx0fVxuXHR0aGlzLnNldEJ5QmluYXJ5U3RyaW5nKHMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBnZW5lcmF0ZSBhbiBhcnJheSBvZiBmYWxzZSB3aXRoIHNwZWNpZmllZCBsZW5ndGhcbiAgICAgKiBAbmFtZSBuZXdGYWxzZUFycmF5XG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJCaXRTdHJpbmdcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IG5MZW5ndGggbGVuZ3RoIG9mIGFycmF5IHRvIGdlbmVyYXRlXG4gICAgICogQHJldHVybiB7YXJyYXl9IGFycmF5IG9mIGJvb2xlYW4gZmFsdXNlXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogVGhpcyBzdGF0aWMgbWV0aG9kIG1heSBiZSB1c2VmdWwgdG8gaW5pdGlhbGl6ZSBib29sZWFuIGFycmF5LlxuICAgICAqL1xuICAgIHRoaXMubmV3RmFsc2VBcnJheSA9IGZ1bmN0aW9uKG5MZW5ndGgpIHtcblx0dmFyIGEgPSBuZXcgQXJyYXkobkxlbmd0aCk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbkxlbmd0aDsgaSsrKSB7XG5cdCAgICBhW2ldID0gZmFsc2U7XG5cdH1cblx0cmV0dXJuIGE7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0RnJlc2hWYWx1ZUhleCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5oVjtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgIT0gXCJ1bmRlZmluZWRcIikge1xuXHRpZiAodHlwZW9mIHBhcmFtc1snaGV4J10gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdGhpcy5zZXRIZXhWYWx1ZUluY2x1ZGluZ1VudXNlZEJpdHMocGFyYW1zWydoZXgnXSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snYmluJ10gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdGhpcy5zZXRCeUJpbmFyeVN0cmluZyhwYXJhbXNbJ2JpbiddKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWydhcnJheSddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0QnlCb29sZWFuQXJyYXkocGFyYW1zWydhcnJheSddKTtcblx0fVxuICAgIH1cbn07XG5KU1guZXh0ZW5kKEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBPY3RldFN0cmluZ1xuICogQG5hbWUgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBPY3RldFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcbiAqL1xuS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgS0pVUi5hc24xLkRFUk9jdGV0U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICAgIHRoaXMuaFQgPSBcIjA0XCI7XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVST2N0ZXRTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgTnVsbFxuICogQG5hbWUgS0pVUi5hc24xLkRFUk51bGxcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIE51bGxcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkFTTjFPYmplY3QgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJOdWxsID0gZnVuY3Rpb24oKSB7XG4gICAgS0pVUi5hc24xLkRFUk51bGwuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuaFQgPSBcIjA1XCI7XG4gICAgdGhpcy5oVExWID0gXCIwNTAwXCI7XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVSTnVsbCwgS0pVUi5hc24xLkFTTjFPYmplY3QpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIE9iamVjdElkZW50aWZpZXJcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBPYmplY3RJZGVudGlmaWVyXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnb2lkJzogJzIuNS40LjUnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5BU04xT2JqZWN0XG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5vaWQgLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBvaWQgc3RyaW5nIChleC4gMi41LjQuMTMpPC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5LSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllciA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciBpdG94ID0gZnVuY3Rpb24oaSkge1xuXHR2YXIgaCA9IGkudG9TdHJpbmcoMTYpO1xuXHRpZiAoaC5sZW5ndGggPT0gMSkgaCA9ICcwJyArIGg7XG5cdHJldHVybiBoO1xuICAgIH07XG4gICAgdmFyIHJvaWR0b3ggPSBmdW5jdGlvbihyb2lkKSB7XG5cdHZhciBoID0gJyc7XG5cdHZhciBiaSA9IG5ldyBCaWdJbnRlZ2VyKHJvaWQsIDEwKTtcblx0dmFyIGIgPSBiaS50b1N0cmluZygyKTtcblx0dmFyIHBhZExlbiA9IDcgLSBiLmxlbmd0aCAlIDc7XG5cdGlmIChwYWRMZW4gPT0gNykgcGFkTGVuID0gMDtcblx0dmFyIGJQYWQgPSAnJztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwYWRMZW47IGkrKykgYlBhZCArPSAnMCc7XG5cdGIgPSBiUGFkICsgYjtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aCAtIDE7IGkgKz0gNykge1xuXHQgICAgdmFyIGI4ID0gYi5zdWJzdHIoaSwgNyk7XG5cdCAgICBpZiAoaSAhPSBiLmxlbmd0aCAtIDcpIGI4ID0gJzEnICsgYjg7XG5cdCAgICBoICs9IGl0b3gocGFyc2VJbnQoYjgsIDIpKTtcblx0fVxuXHRyZXR1cm4gaDtcbiAgICB9XG5cbiAgICBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllci5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gICAgdGhpcy5oVCA9IFwiMDZcIjtcblxuICAgIC8qKlxuICAgICAqIHNldCB2YWx1ZSBieSBhIGhleGFkZWNpbWFsIHN0cmluZ1xuICAgICAqIEBuYW1lIHNldFZhbHVlSGV4XG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5ld0hleFN0cmluZyBoZXhhZGVjaW1hbCB2YWx1ZSBvZiBPSUQgYnl0ZXNcbiAgICAgKi9cbiAgICB0aGlzLnNldFZhbHVlSGV4ID0gZnVuY3Rpb24obmV3SGV4U3RyaW5nKSB7XG5cdHRoaXMuaFRMViA9IG51bGw7XG5cdHRoaXMuaXNNb2RpZmllZCA9IHRydWU7XG5cdHRoaXMucyA9IG51bGw7XG5cdHRoaXMuaFYgPSBuZXdIZXhTdHJpbmc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHNldCB2YWx1ZSBieSBhIE9JRCBzdHJpbmdcbiAgICAgKiBAbmFtZSBzZXRWYWx1ZU9pZFN0cmluZ1xuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVST2JqZWN0SWRlbnRpZmllclxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvaWRTdHJpbmcgT0lEIHN0cmluZyAoZXguIDIuNS40LjEzKVxuICAgICAqL1xuICAgIHRoaXMuc2V0VmFsdWVPaWRTdHJpbmcgPSBmdW5jdGlvbihvaWRTdHJpbmcpIHtcblx0aWYgKCEgb2lkU3RyaW5nLm1hdGNoKC9eWzAtOS5dKyQvKSkge1xuXHQgICAgdGhyb3cgXCJtYWxmb3JtZWQgb2lkIHN0cmluZzogXCIgKyBvaWRTdHJpbmc7XG5cdH1cblx0dmFyIGggPSAnJztcblx0dmFyIGEgPSBvaWRTdHJpbmcuc3BsaXQoJy4nKTtcblx0dmFyIGkwID0gcGFyc2VJbnQoYVswXSkgKiA0MCArIHBhcnNlSW50KGFbMV0pO1xuXHRoICs9IGl0b3goaTApO1xuXHRhLnNwbGljZSgwLCAyKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBoICs9IHJvaWR0b3goYVtpXSk7XG5cdH1cblx0dGhpcy5oVExWID0gbnVsbDtcblx0dGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcblx0dGhpcy5zID0gbnVsbDtcblx0dGhpcy5oViA9IGg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHNldCB2YWx1ZSBieSBhIE9JRCBuYW1lXG4gICAgICogQG5hbWUgc2V0VmFsdWVOYW1lXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9pZE5hbWUgT0lEIG5hbWUgKGV4LiAnc2VydmVyQXV0aCcpXG4gICAgICogQHNpbmNlIDEuMC4xXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogT0lEIG5hbWUgc2hhbGwgYmUgZGVmaW5lZCBpbiAnS0pVUi5hc24xLng1MDkuT0lELm5hbWUyb2lkTGlzdCcuXG4gICAgICogT3RoZXJ3aXNlIHJhaXNlIGVycm9yLlxuICAgICAqL1xuICAgIHRoaXMuc2V0VmFsdWVOYW1lID0gZnVuY3Rpb24ob2lkTmFtZSkge1xuXHRpZiAodHlwZW9mIEtKVVIuYXNuMS54NTA5Lk9JRC5uYW1lMm9pZExpc3Rbb2lkTmFtZV0gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdmFyIG9pZCA9IEtKVVIuYXNuMS54NTA5Lk9JRC5uYW1lMm9pZExpc3Rbb2lkTmFtZV07XG5cdCAgICB0aGlzLnNldFZhbHVlT2lkU3RyaW5nKG9pZCk7XG5cdH0gZWxzZSB7XG5cdCAgICB0aHJvdyBcIkRFUk9iamVjdElkZW50aWZpZXIgb2lkTmFtZSB1bmRlZmluZWQ6IFwiICsgb2lkTmFtZTtcblx0fVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaFY7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiBwYXJhbXNbJ29pZCddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0VmFsdWVPaWRTdHJpbmcocGFyYW1zWydvaWQnXSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snaGV4J10gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdGhpcy5zZXRWYWx1ZUhleChwYXJhbXNbJ2hleCddKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zWyduYW1lJ10gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdGhpcy5zZXRWYWx1ZU5hbWUocGFyYW1zWyduYW1lJ10pO1xuXHR9XG4gICAgfVxufTtcbkpTWC5leHRlbmQoS0pVUi5hc24xLkRFUk9iamVjdElkZW50aWZpZXIsIEtKVVIuYXNuMS5BU04xT2JqZWN0KTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBVVEY4U3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSVVRGOFN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgVVRGOFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcbiAqL1xuS0pVUi5hc24xLkRFUlVURjhTdHJpbmcgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBLSlVSLmFzbjEuREVSVVRGOFN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgICB0aGlzLmhUID0gXCIwY1wiO1xufTtcbkpTWC5leHRlbmQoS0pVUi5hc24xLkRFUlVURjhTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgTnVtZXJpY1N0cmluZ1xuICogQG5hbWUgS0pVUi5hc24xLkRFUk51bWVyaWNTdHJpbmdcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIE51bWVyaWNTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBkZXNjcmlwdGlvblxuICogQHNlZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgS0pVUi5hc24xLkRFUk51bWVyaWNTdHJpbmcuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gICAgdGhpcy5oVCA9IFwiMTJcIjtcbn07XG5KU1guZXh0ZW5kKEtKVVIuYXNuMS5ERVJOdW1lcmljU3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFByaW50YWJsZVN0cmluZ1xuICogQG5hbWUgS0pVUi5hc24xLkRFUlByaW50YWJsZVN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgUHJpbnRhYmxlU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJ2FhYSd9KVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nXG4gKiBAZGVzY3JpcHRpb25cbiAqIEBzZWUgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nIC0gc3VwZXJjbGFzc1xuICovXG5LSlVSLmFzbjEuREVSUHJpbnRhYmxlU3RyaW5nID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgS0pVUi5hc24xLkRFUlByaW50YWJsZVN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgICB0aGlzLmhUID0gXCIxM1wiO1xufTtcbkpTWC5leHRlbmQoS0pVUi5hc24xLkRFUlByaW50YWJsZVN0cmluZywgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RyaW5nKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBUZWxldGV4U3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZ1xuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgVGVsZXRleFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICdhYWEnfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZ1xuICogQGRlc2NyaXB0aW9uXG4gKiBAc2VlIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyAtIHN1cGVyY2xhc3NcbiAqL1xuS0pVUi5hc24xLkRFUlRlbGV0ZXhTdHJpbmcgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBLSlVSLmFzbjEuREVSVGVsZXRleFN0cmluZy5zdXBlcmNsYXNzLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyYW1zKTtcbiAgICB0aGlzLmhUID0gXCIxNFwiO1xufTtcbkpTWC5leHRlbmQoS0pVUi5hc24xLkRFUlRlbGV0ZXhTdHJpbmcsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cmluZyk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIGNsYXNzIGZvciBBU04uMSBERVIgSUE1U3RyaW5nXG4gKiBAbmFtZSBLSlVSLmFzbjEuREVSSUE1U3RyaW5nXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBJQTVTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBhc3NvY2lhdGl2ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIChleC4geydzdHInOiAnYWFhJ30pXG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmdcbiAqIEBkZXNjcmlwdGlvblxuICogQHNlZSBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcgLSBzdXBlcmNsYXNzXG4gKi9cbktKVVIuYXNuMS5ERVJJQTVTdHJpbmcgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBLSlVSLmFzbjEuREVSSUE1U3RyaW5nLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICAgIHRoaXMuaFQgPSBcIjE2XCI7XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVSSUE1U3RyaW5nLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJpbmcpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFVUQ1RpbWVcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJVVENUaW1lXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBVVENUaW1lXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgYXNzb2NpYXRpdmUgYXJyYXkgb2YgcGFyYW1ldGVycyAoZXguIHsnc3RyJzogJzEzMDQzMDIzNTk1OVonfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWVcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPnN0ciAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIHN0cmluZyAoZXguJzEzMDQzMDIzNTk1OVonKTwvbGk+XG4gKiA8bGk+aGV4IC0gc3BlY2lmeSBpbml0aWFsIEFTTi4xIHZhbHVlKFYpIGJ5IGEgaGV4YWRlY2ltYWwgc3RyaW5nPC9saT5cbiAqIDxsaT5kYXRlIC0gc3BlY2lmeSBEYXRlIG9iamVjdC48L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICogPGg0PkVYQU1QTEVTPC9oND5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZDEgPSBuZXcgS0pVUi5hc24xLkRFUlVUQ1RpbWUoKTtcbiAqIGQxLnNldFN0cmluZygnMTMwNDMwMTI1OTU5WicpO1xuICpcbiAqIHZhciBkMiA9IG5ldyBLSlVSLmFzbjEuREVSVVRDVGltZSh7J3N0cic6ICcxMzA0MzAxMjU5NTlaJ30pO1xuICpcbiAqIHZhciBkMyA9IG5ldyBLSlVSLmFzbjEuREVSVVRDVGltZSh7J2RhdGUnOiBuZXcgRGF0ZShEYXRlLlVUQygyMDE1LCAwLCAzMSwgMCwgMCwgMCwgMCkpfSk7XG4gKi9cbktKVVIuYXNuMS5ERVJVVENUaW1lID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgS0pVUi5hc24xLkRFUlVUQ1RpbWUuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gICAgdGhpcy5oVCA9IFwiMTdcIjtcblxuICAgIC8qKlxuICAgICAqIHNldCB2YWx1ZSBieSBhIERhdGUgb2JqZWN0XG4gICAgICogQG5hbWUgc2V0QnlEYXRlXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJVVENUaW1lXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlT2JqZWN0IERhdGUgb2JqZWN0IHRvIHNldCBBU04uMSB2YWx1ZShWKVxuICAgICAqL1xuICAgIHRoaXMuc2V0QnlEYXRlID0gZnVuY3Rpb24oZGF0ZU9iamVjdCkge1xuXHR0aGlzLmhUTFYgPSBudWxsO1xuXHR0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuXHR0aGlzLmRhdGUgPSBkYXRlT2JqZWN0O1xuXHR0aGlzLnMgPSB0aGlzLmZvcm1hdERhdGUodGhpcy5kYXRlLCAndXRjJyk7XG5cdHRoaXMuaFYgPSBzdG9oZXgodGhpcy5zKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgIT0gXCJ1bmRlZmluZWRcIikge1xuXHRpZiAodHlwZW9mIHBhcmFtc1snc3RyJ10gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdGhpcy5zZXRTdHJpbmcocGFyYW1zWydzdHInXSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snaGV4J10gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdGhpcy5zZXRTdHJpbmdIZXgocGFyYW1zWydoZXgnXSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtc1snZGF0ZSddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0QnlEYXRlKHBhcmFtc1snZGF0ZSddKTtcblx0fVxuICAgIH1cbn07XG5KU1guZXh0ZW5kKEtKVVIuYXNuMS5ERVJVVENUaW1lLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBHZW5lcmFsaXplZFRpbWVcbiAqIEBuYW1lIEtKVVIuYXNuMS5ERVJHZW5lcmFsaXplZFRpbWVcbiAqIEBjbGFzcyBjbGFzcyBmb3IgQVNOLjEgREVSIEdlbmVyYWxpemVkVGltZVxuICogQHBhcmFtIHtBcnJheX0gcGFyYW1zIGFzc29jaWF0aXZlIGFycmF5IG9mIHBhcmFtZXRlcnMgKGV4LiB7J3N0cic6ICcyMDEzMDQzMDIzNTk1OVonfSlcbiAqIEBleHRlbmRzIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFRpbWVcbiAqIEBkZXNjcmlwdGlvblxuICogPGJyLz5cbiAqIEFzIGZvciBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSBvbmUgb2ZcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogPHVsPlxuICogPGxpPnN0ciAtIHNwZWNpZnkgaW5pdGlhbCBBU04uMSB2YWx1ZShWKSBieSBhIHN0cmluZyAoZXguJzIwMTMwNDMwMjM1OTU5WicpPC9saT5cbiAqIDxsaT5oZXggLSBzcGVjaWZ5IGluaXRpYWwgQVNOLjEgdmFsdWUoVikgYnkgYSBoZXhhZGVjaW1hbCBzdHJpbmc8L2xpPlxuICogPGxpPmRhdGUgLSBzcGVjaWZ5IERhdGUgb2JqZWN0LjwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbktKVVIuYXNuMS5ERVJHZW5lcmFsaXplZFRpbWUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lLnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICAgIHRoaXMuaFQgPSBcIjE4XCI7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdmFsdWUgYnkgYSBEYXRlIG9iamVjdFxuICAgICAqIEBuYW1lIHNldEJ5RGF0ZVxuICAgICAqIEBtZW1iZXJPZiBLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtEYXRlfSBkYXRlT2JqZWN0IERhdGUgb2JqZWN0IHRvIHNldCBBU04uMSB2YWx1ZShWKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogV2hlbiB5b3Ugc3BlY2lmeSBVVEMgdGltZSwgdXNlICdEYXRlLlVUQycgbWV0aG9kIGxpa2UgdGhpczo8YnIvPlxuICAgICAqIHZhciBvID0gbmV3IERFUlVUQ1RpbWUoKTtcbiAgICAgKiB2YXIgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDIwMTUsIDAsIDMxLCAyMywgNTksIDU5LCAwKSk7ICMyMDE1SkFOMzEgMjM6NTk6NTlcbiAgICAgKiBvLnNldEJ5RGF0ZShkYXRlKTtcbiAgICAgKi9cbiAgICB0aGlzLnNldEJ5RGF0ZSA9IGZ1bmN0aW9uKGRhdGVPYmplY3QpIHtcblx0dGhpcy5oVExWID0gbnVsbDtcblx0dGhpcy5pc01vZGlmaWVkID0gdHJ1ZTtcblx0dGhpcy5kYXRlID0gZGF0ZU9iamVjdDtcblx0dGhpcy5zID0gdGhpcy5mb3JtYXREYXRlKHRoaXMuZGF0ZSwgJ2dlbicpO1xuXHR0aGlzLmhWID0gc3RvaGV4KHRoaXMucyk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiBwYXJhbXNbJ3N0ciddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0U3RyaW5nKHBhcmFtc1snc3RyJ10pO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2hleCddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuc2V0U3RyaW5nSGV4KHBhcmFtc1snaGV4J10pO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbJ2RhdGUnXSAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICB0aGlzLnNldEJ5RGF0ZShwYXJhbXNbJ2RhdGUnXSk7XG5cdH1cbiAgICB9XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVSR2VuZXJhbGl6ZWRUaW1lLCBLSlVSLmFzbjEuREVSQWJzdHJhY3RUaW1lKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogY2xhc3MgZm9yIEFTTi4xIERFUiBTZXF1ZW5jZVxuICogQG5hbWUgS0pVUi5hc24xLkRFUlNlcXVlbmNlXG4gKiBAY2xhc3MgY2xhc3MgZm9yIEFTTi4xIERFUiBTZXF1ZW5jZVxuICogQGV4dGVuZHMgS0pVUi5hc24xLkRFUkFic3RyYWN0U3RydWN0dXJlZFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogQXMgZm9yIGFyZ3VtZW50ICdwYXJhbXMnIGZvciBjb25zdHJ1Y3RvciwgeW91IGNhbiBzcGVjaWZ5IG9uZSBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+YXJyYXkgLSBzcGVjaWZ5IGFycmF5IG9mIEFTTjFPYmplY3QgdG8gc2V0IGVsZW1lbnRzIG9mIGNvbnRlbnQ8L2xpPlxuICogPC91bD5cbiAqIE5PVEU6ICdwYXJhbXMnIGNhbiBiZSBvbWl0dGVkLlxuICovXG5LSlVSLmFzbjEuREVSU2VxdWVuY2UgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBLSlVSLmFzbjEuREVSU2VxdWVuY2Uuc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gICAgdGhpcy5oVCA9IFwiMzBcIjtcbiAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbigpIHtcblx0dmFyIGggPSAnJztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFzbjFBcnJheS5sZW5ndGg7IGkrKykge1xuXHQgICAgdmFyIGFzbjFPYmogPSB0aGlzLmFzbjFBcnJheVtpXTtcblx0ICAgIGggKz0gYXNuMU9iai5nZXRFbmNvZGVkSGV4KCk7XG5cdH1cblx0dGhpcy5oViA9IGg7XG5cdHJldHVybiB0aGlzLmhWO1xuICAgIH07XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVSU2VxdWVuY2UsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFNldFxuICogQG5hbWUgS0pVUi5hc24xLkRFUlNldFxuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgU2V0XG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuREVSQWJzdHJhY3RTdHJ1Y3R1cmVkXG4gKiBAZGVzY3JpcHRpb25cbiAqIDxici8+XG4gKiBBcyBmb3IgYXJndW1lbnQgJ3BhcmFtcycgZm9yIGNvbnN0cnVjdG9yLCB5b3UgY2FuIHNwZWNpZnkgb25lIG9mXG4gKiBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIDx1bD5cbiAqIDxsaT5hcnJheSAtIHNwZWNpZnkgYXJyYXkgb2YgQVNOMU9iamVjdCB0byBzZXQgZWxlbWVudHMgb2YgY29udGVudDwvbGk+XG4gKiA8L3VsPlxuICogTk9URTogJ3BhcmFtcycgY2FuIGJlIG9taXR0ZWQuXG4gKi9cbktKVVIuYXNuMS5ERVJTZXQgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICBLSlVSLmFzbjEuREVSU2V0LnN1cGVyY2xhc3MuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJhbXMpO1xuICAgIHRoaXMuaFQgPSBcIjMxXCI7XG4gICAgdGhpcy5nZXRGcmVzaFZhbHVlSGV4ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBhID0gbmV3IEFycmF5KCk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hc24xQXJyYXkubGVuZ3RoOyBpKyspIHtcblx0ICAgIHZhciBhc24xT2JqID0gdGhpcy5hc24xQXJyYXlbaV07XG5cdCAgICBhLnB1c2goYXNuMU9iai5nZXRFbmNvZGVkSGV4KCkpO1xuXHR9XG5cdGEuc29ydCgpO1xuXHR0aGlzLmhWID0gYS5qb2luKCcnKTtcblx0cmV0dXJuIHRoaXMuaFY7XG4gICAgfTtcbn07XG5KU1guZXh0ZW5kKEtKVVIuYXNuMS5ERVJTZXQsIEtKVVIuYXNuMS5ERVJBYnN0cmFjdFN0cnVjdHVyZWQpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBjbGFzcyBmb3IgQVNOLjEgREVSIFRhZ2dlZE9iamVjdFxuICogQG5hbWUgS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdFxuICogQGNsYXNzIGNsYXNzIGZvciBBU04uMSBERVIgVGFnZ2VkT2JqZWN0XG4gKiBAZXh0ZW5kcyBLSlVSLmFzbjEuQVNOMU9iamVjdFxuICogQGRlc2NyaXB0aW9uXG4gKiA8YnIvPlxuICogUGFyYW1ldGVyICd0YWdOb05leCcgaXMgQVNOLjEgdGFnKFQpIHZhbHVlIGZvciB0aGlzIG9iamVjdC5cbiAqIEZvciBleGFtcGxlLCBpZiB5b3UgZmluZCAnWzFdJyB0YWcgaW4gYSBBU04uMSBkdW1wLCBcbiAqICd0YWdOb0hleCcgd2lsbCBiZSAnYTEnLlxuICogPGJyLz5cbiAqIEFzIGZvciBvcHRpb25hbCBhcmd1bWVudCAncGFyYW1zJyBmb3IgY29uc3RydWN0b3IsIHlvdSBjYW4gc3BlY2lmeSAqQU5ZKiBvZlxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiA8dWw+XG4gKiA8bGk+ZXhwbGljaXQgLSBzcGVjaWZ5IHRydWUgaWYgdGhpcyBpcyBleHBsaWNpdCB0YWcgb3RoZXJ3aXNlIGZhbHNlIFxuICogICAgIChkZWZhdWx0IGlzICd0cnVlJykuPC9saT5cbiAqIDxsaT50YWcgLSBzcGVjaWZ5IHRhZyAoZGVmYXVsdCBpcyAnYTAnIHdoaWNoIG1lYW5zIFswXSk8L2xpPlxuICogPGxpPm9iaiAtIHNwZWNpZnkgQVNOMU9iamVjdCB3aGljaCBpcyB0YWdnZWQ8L2xpPlxuICogPC91bD5cbiAqIEBleGFtcGxlXG4gKiBkMSA9IG5ldyBLSlVSLmFzbjEuREVSVVRGOFN0cmluZyh7J3N0cic6J2EnfSk7XG4gKiBkMiA9IG5ldyBLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0KHsnb2JqJzogZDF9KTtcbiAqIGhleCA9IGQyLmdldEVuY29kZWRIZXgoKTtcbiAqL1xuS0pVUi5hc24xLkRFUlRhZ2dlZE9iamVjdCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIEtKVVIuYXNuMS5ERVJUYWdnZWRPYmplY3Quc3VwZXJjbGFzcy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuaFQgPSBcImEwXCI7XG4gICAgdGhpcy5oViA9ICcnO1xuICAgIHRoaXMuaXNFeHBsaWNpdCA9IHRydWU7XG4gICAgdGhpcy5hc24xT2JqZWN0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIHNldCB2YWx1ZSBieSBhbiBBU04xT2JqZWN0XG4gICAgICogQG5hbWUgc2V0U3RyaW5nXG4gICAgICogQG1lbWJlck9mIEtKVVIuYXNuMS5ERVJUYWdnZWRPYmplY3RcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzRXhwbGljaXRGbGFnIGZsYWcgZm9yIGV4cGxpY2l0L2ltcGxpY2l0IHRhZ1xuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGFnTm9IZXggaGV4YWRlY2ltYWwgc3RyaW5nIG9mIEFTTi4xIHRhZ1xuICAgICAqIEBwYXJhbSB7QVNOMU9iamVjdH0gYXNuMU9iamVjdCBBU04uMSB0byBlbmNhcHN1bGF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2V0QVNOMU9iamVjdCA9IGZ1bmN0aW9uKGlzRXhwbGljaXRGbGFnLCB0YWdOb0hleCwgYXNuMU9iamVjdCkge1xuXHR0aGlzLmhUID0gdGFnTm9IZXg7XG5cdHRoaXMuaXNFeHBsaWNpdCA9IGlzRXhwbGljaXRGbGFnO1xuXHR0aGlzLmFzbjFPYmplY3QgPSBhc24xT2JqZWN0O1xuXHRpZiAodGhpcy5pc0V4cGxpY2l0KSB7XG5cdCAgICB0aGlzLmhWID0gdGhpcy5hc24xT2JqZWN0LmdldEVuY29kZWRIZXgoKTtcblx0ICAgIHRoaXMuaFRMViA9IG51bGw7XG5cdCAgICB0aGlzLmlzTW9kaWZpZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHQgICAgdGhpcy5oViA9IG51bGw7XG5cdCAgICB0aGlzLmhUTFYgPSBhc24xT2JqZWN0LmdldEVuY29kZWRIZXgoKTtcblx0ICAgIHRoaXMuaFRMViA9IHRoaXMuaFRMVi5yZXBsYWNlKC9eLi4vLCB0YWdOb0hleCk7XG5cdCAgICB0aGlzLmlzTW9kaWZpZWQgPSBmYWxzZTtcblx0fVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZyZXNoVmFsdWVIZXggPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaFY7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcGFyYW1zICE9IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiBwYXJhbXNbJ3RhZyddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuaFQgPSBwYXJhbXNbJ3RhZyddO1xuXHR9XG5cdGlmICh0eXBlb2YgcGFyYW1zWydleHBsaWNpdCddICE9IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIHRoaXMuaXNFeHBsaWNpdCA9IHBhcmFtc1snZXhwbGljaXQnXTtcblx0fVxuXHRpZiAodHlwZW9mIHBhcmFtc1snb2JqJ10gIT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgdGhpcy5hc24xT2JqZWN0ID0gcGFyYW1zWydvYmonXTtcblx0ICAgIHRoaXMuc2V0QVNOMU9iamVjdCh0aGlzLmlzRXhwbGljaXQsIHRoaXMuaFQsIHRoaXMuYXNuMU9iamVjdCk7XG5cdH1cbiAgICB9XG59O1xuSlNYLmV4dGVuZChLSlVSLmFzbjEuREVSVGFnZ2VkT2JqZWN0LCBLSlVSLmFzbjEuQVNOMU9iamVjdCk7XG4vLyBIZXggSmF2YVNjcmlwdCBkZWNvZGVyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMyBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cblxuLy8gUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG4vLyBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQsIHByb3ZpZGVkIHRoYXQgdGhlIGFib3ZlXG4vLyBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIGFwcGVhciBpbiBhbGwgY29waWVzLlxuLy8gXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xuLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1Jcbi8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcbi8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0Zcbi8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgaW1tZWQ6IHRydWUsIGxhdGVkZWY6IHRydWUsIHVuZGVmOiB0cnVlLCByZWdleGRhc2g6IGZhbHNlICovXG4oZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBIZXggPSB7fSxcbiAgICBkZWNvZGVyO1xuXG5IZXguZGVjb2RlID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBpO1xuICAgIGlmIChkZWNvZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGhleCA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiLFxuICAgICAgICAgICAgaWdub3JlID0gXCIgXFxmXFxuXFxyXFx0XFx1MDBBMFxcdTIwMjhcXHUyMDI5XCI7XG4gICAgICAgIGRlY29kZXIgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyArK2kpXG4gICAgICAgICAgICBkZWNvZGVyW2hleC5jaGFyQXQoaSldID0gaTtcbiAgICAgICAgaGV4ID0gaGV4LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGZvciAoaSA9IDEwOyBpIDwgMTY7ICsraSlcbiAgICAgICAgICAgIGRlY29kZXJbaGV4LmNoYXJBdChpKV0gPSBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaWdub3JlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgZGVjb2RlcltpZ25vcmUuY2hhckF0KGkpXSA9IC0xO1xuICAgIH1cbiAgICB2YXIgb3V0ID0gW10sXG4gICAgICAgIGJpdHMgPSAwLFxuICAgICAgICBjaGFyX2NvdW50ID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IGEuY2hhckF0KGkpO1xuICAgICAgICBpZiAoYyA9PSAnPScpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgYyA9IGRlY29kZXJbY107XG4gICAgICAgIGlmIChjID09IC0xKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyAnSWxsZWdhbCBjaGFyYWN0ZXIgYXQgb2Zmc2V0ICcgKyBpO1xuICAgICAgICBiaXRzIHw9IGM7XG4gICAgICAgIGlmICgrK2NoYXJfY291bnQgPj0gMikge1xuICAgICAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cztcbiAgICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgICAgY2hhcl9jb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiaXRzIDw8PSA0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFyX2NvdW50KVxuICAgICAgICB0aHJvdyBcIkhleCBlbmNvZGluZyBpbmNvbXBsZXRlOiA0IGJpdHMgbWlzc2luZ1wiO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vLyBleHBvcnQgZ2xvYmFsc1xud2luZG93LkhleCA9IEhleDtcbn0pKCk7XG4vLyBCYXNlNjQgSmF2YVNjcmlwdCBkZWNvZGVyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMyBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cblxuLy8gUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG4vLyBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQsIHByb3ZpZGVkIHRoYXQgdGhlIGFib3ZlXG4vLyBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIGFwcGVhciBpbiBhbGwgY29waWVzLlxuLy8gXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xuLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1Jcbi8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcbi8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0Zcbi8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgaW1tZWQ6IHRydWUsIGxhdGVkZWY6IHRydWUsIHVuZGVmOiB0cnVlLCByZWdleGRhc2g6IGZhbHNlICovXG4oZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCYXNlNjQgPSB7fSxcbiAgICBkZWNvZGVyO1xuXG5CYXNlNjQuZGVjb2RlID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgaTtcbiAgICBpZiAoZGVjb2RlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBiNjQgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIixcbiAgICAgICAgICAgIGlnbm9yZSA9IFwiPSBcXGZcXG5cXHJcXHRcXHUwMEEwXFx1MjAyOFxcdTIwMjlcIjtcbiAgICAgICAgZGVjb2RlciA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7ICsraSlcbiAgICAgICAgICAgIGRlY29kZXJbYjY0LmNoYXJBdChpKV0gPSBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaWdub3JlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgZGVjb2RlcltpZ25vcmUuY2hhckF0KGkpXSA9IC0xO1xuICAgIH1cbiAgICB2YXIgb3V0ID0gW107XG4gICAgdmFyIGJpdHMgPSAwLCBjaGFyX2NvdW50ID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IGEuY2hhckF0KGkpO1xuICAgICAgICBpZiAoYyA9PSAnPScpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgYyA9IGRlY29kZXJbY107XG4gICAgICAgIGlmIChjID09IC0xKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmIChjID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyAnSWxsZWdhbCBjaGFyYWN0ZXIgYXQgb2Zmc2V0ICcgKyBpO1xuICAgICAgICBiaXRzIHw9IGM7XG4gICAgICAgIGlmICgrK2NoYXJfY291bnQgPj0gNCkge1xuICAgICAgICAgICAgb3V0W291dC5sZW5ndGhdID0gKGJpdHMgPj4gMTYpO1xuICAgICAgICAgICAgb3V0W291dC5sZW5ndGhdID0gKGJpdHMgPj4gOCkgJiAweEZGO1xuICAgICAgICAgICAgb3V0W291dC5sZW5ndGhdID0gYml0cyAmIDB4RkY7XG4gICAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAgIGNoYXJfY291bnQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYml0cyA8PD0gNjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2ggKGNoYXJfY291bnQpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhyb3cgXCJCYXNlNjQgZW5jb2RpbmcgaW5jb21wbGV0ZTogYXQgbGVhc3QgMiBiaXRzIG1pc3NpbmdcIjtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gKGJpdHMgPj4gMTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgb3V0W291dC5sZW5ndGhdID0gKGJpdHMgPj4gMTYpO1xuICAgICAgICBvdXRbb3V0Lmxlbmd0aF0gPSAoYml0cyA+PiA4KSAmIDB4RkY7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuQmFzZTY0LnJlID0gLy0tLS0tQkVHSU4gW14tXSstLS0tLShbQS1aYS16MC05K1xcLz1cXHNdKyktLS0tLUVORCBbXi1dKy0tLS0tfGJlZ2luLWJhc2U2NFteXFxuXStcXG4oW0EtWmEtejAtOStcXC89XFxzXSspPT09PS87XG5CYXNlNjQudW5hcm1vciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIG0gPSBCYXNlNjQucmUuZXhlYyhhKTtcbiAgICBpZiAobSkge1xuICAgICAgICBpZiAobVsxXSlcbiAgICAgICAgICAgIGEgPSBtWzFdO1xuICAgICAgICBlbHNlIGlmIChtWzJdKVxuICAgICAgICAgICAgYSA9IG1bMl07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IFwiUmVnRXhwIG91dCBvZiBzeW5jXCI7XG4gICAgfVxuICAgIHJldHVybiBCYXNlNjQuZGVjb2RlKGEpO1xufTtcblxuLy8gZXhwb3J0IGdsb2JhbHNcbndpbmRvdy5CYXNlNjQgPSBCYXNlNjQ7XG59KSgpO1xuLy8gQVNOLjEgSmF2YVNjcmlwdCBkZWNvZGVyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMyBMYXBvIEx1Y2hpbmkgPGxhcG9AbGFwby5pdD5cblxuLy8gUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG4vLyBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQsIHByb3ZpZGVkIHRoYXQgdGhlIGFib3ZlXG4vLyBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIGFwcGVhciBpbiBhbGwgY29waWVzLlxuLy8gXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFU1xuLy8gV0lUSCBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1Jcbi8vIEFOWSBTUEVDSUFMLCBESVJFQ1QsIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVNcbi8vIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST00gTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0Zcbi8vIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgaW1tZWQ6IHRydWUsIGxhdGVkZWY6IHRydWUsIHVuZGVmOiB0cnVlLCByZWdleGRhc2g6IGZhbHNlICovXG4vKmdsb2JhbCBvaWRzICovXG4oZnVuY3Rpb24gKHVuZGVmaW5lZCkge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBoYXJkTGltaXQgPSAxMDAsXG4gICAgZWxsaXBzaXMgPSBcIlxcdTIwMjZcIixcbiAgICBET00gPSB7XG4gICAgICAgIHRhZzogZnVuY3Rpb24gKHRhZ05hbWUsIGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgICAgICAgdC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cik7XG4gICAgICAgIH1cbiAgICB9O1xuXG5mdW5jdGlvbiBTdHJlYW0oZW5jLCBwb3MpIHtcbiAgICBpZiAoZW5jIGluc3RhbmNlb2YgU3RyZWFtKSB7XG4gICAgICAgIHRoaXMuZW5jID0gZW5jLmVuYztcbiAgICAgICAgdGhpcy5wb3MgPSBlbmMucG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5jID0gZW5jO1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB9XG59XG5TdHJlYW0ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICBpZiAocG9zID09PSB1bmRlZmluZWQpXG4gICAgICAgIHBvcyA9IHRoaXMucG9zKys7XG4gICAgaWYgKHBvcyA+PSB0aGlzLmVuYy5sZW5ndGgpXG4gICAgICAgIHRocm93ICdSZXF1ZXN0aW5nIGJ5dGUgb2Zmc2V0ICcgKyBwb3MgKyAnIG9uIGEgc3RyZWFtIG9mIGxlbmd0aCAnICsgdGhpcy5lbmMubGVuZ3RoO1xuICAgIHJldHVybiB0aGlzLmVuY1twb3NdO1xufTtcblN0cmVhbS5wcm90b3R5cGUuaGV4RGlnaXRzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG5TdHJlYW0ucHJvdG90eXBlLmhleEJ5dGUgPSBmdW5jdGlvbiAoYikge1xuICAgIHJldHVybiB0aGlzLmhleERpZ2l0cy5jaGFyQXQoKGIgPj4gNCkgJiAweEYpICsgdGhpcy5oZXhEaWdpdHMuY2hhckF0KGIgJiAweEYpO1xufTtcblN0cmVhbS5wcm90b3R5cGUuaGV4RHVtcCA9IGZ1bmN0aW9uIChzdGFydCwgZW5kLCByYXcpIHtcbiAgICB2YXIgcyA9IFwiXCI7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgICAgcyArPSB0aGlzLmhleEJ5dGUodGhpcy5nZXQoaSkpO1xuICAgICAgICBpZiAocmF3ICE9PSB0cnVlKVxuICAgICAgICAgICAgc3dpdGNoIChpICYgMHhGKSB7XG4gICAgICAgICAgICBjYXNlIDB4NzogcyArPSBcIiAgXCI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAweEY6IHMgKz0gXCJcXG5cIjsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiAgcyArPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHM7XG59O1xuU3RyZWFtLnByb3RvdHlwZS5wYXJzZVN0cmluZ0lTTyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdmFyIHMgPSBcIlwiO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKVxuICAgICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5nZXQoaSkpO1xuICAgIHJldHVybiBzO1xufTtcblN0cmVhbS5wcm90b3R5cGUucGFyc2VTdHJpbmdVVEYgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIHZhciBzID0gXCJcIjtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuZ2V0KGkrKyk7XG4gICAgICAgIGlmIChjIDwgMTI4KVxuICAgICAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgICBlbHNlIGlmICgoYyA+IDE5MSkgJiYgKGMgPCAyMjQpKVxuICAgICAgICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDB4MUYpIDw8IDYpIHwgKHRoaXMuZ2V0KGkrKykgJiAweDNGKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAweDBGKSA8PCAxMikgfCAoKHRoaXMuZ2V0KGkrKykgJiAweDNGKSA8PCA2KSB8ICh0aGlzLmdldChpKyspICYgMHgzRikpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbn07XG5TdHJlYW0ucHJvdG90eXBlLnBhcnNlU3RyaW5nQk1QID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgc3RyID0gXCJcIlxuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAyKSB7XG4gICAgICAgIHZhciBoaWdoX2J5dGUgPSB0aGlzLmdldChpKTtcbiAgICAgICAgdmFyIGxvd19ieXRlID0gdGhpcy5nZXQoaSArIDEpO1xuICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSggKGhpZ2hfYnl0ZSA8PCA4KSArIGxvd19ieXRlICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbn07XG5TdHJlYW0ucHJvdG90eXBlLnJlVGltZSA9IC9eKCg/OjFbODldfDJcXGQpP1xcZFxcZCkoMFsxLTldfDFbMC0yXSkoMFsxLTldfFsxMl1cXGR8M1swMV0pKFswMV1cXGR8MlswLTNdKSg/OihbMC01XVxcZCkoPzooWzAtNV1cXGQpKD86Wy4sXShcXGR7MSwzfSkpPyk/KT8oWnxbLStdKD86WzBdXFxkfDFbMC0yXSkoWzAtNV1cXGQpPyk/JC87XG5TdHJlYW0ucHJvdG90eXBlLnBhcnNlVGltZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdmFyIHMgPSB0aGlzLnBhcnNlU3RyaW5nSVNPKHN0YXJ0LCBlbmQpLFxuICAgICAgICBtID0gdGhpcy5yZVRpbWUuZXhlYyhzKTtcbiAgICBpZiAoIW0pXG4gICAgICAgIHJldHVybiBcIlVucmVjb2duaXplZCB0aW1lOiBcIiArIHM7XG4gICAgcyA9IG1bMV0gKyBcIi1cIiArIG1bMl0gKyBcIi1cIiArIG1bM10gKyBcIiBcIiArIG1bNF07XG4gICAgaWYgKG1bNV0pIHtcbiAgICAgICAgcyArPSBcIjpcIiArIG1bNV07XG4gICAgICAgIGlmIChtWzZdKSB7XG4gICAgICAgICAgICBzICs9IFwiOlwiICsgbVs2XTtcbiAgICAgICAgICAgIGlmIChtWzddKVxuICAgICAgICAgICAgICAgIHMgKz0gXCIuXCIgKyBtWzddO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtWzhdKSB7XG4gICAgICAgIHMgKz0gXCIgVVRDXCI7XG4gICAgICAgIGlmIChtWzhdICE9ICdaJykge1xuICAgICAgICAgICAgcyArPSBtWzhdO1xuICAgICAgICAgICAgaWYgKG1bOV0pXG4gICAgICAgICAgICAgICAgcyArPSBcIjpcIiArIG1bOV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHM7XG59O1xuU3RyZWFtLnByb3RvdHlwZS5wYXJzZUludGVnZXIgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIC8vVE9ETyBzdXBwb3J0IG5lZ2F0aXZlIG51bWJlcnNcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG4gICAgaWYgKGxlbiA+IDQpIHtcbiAgICAgICAgbGVuIDw8PSAzO1xuICAgICAgICB2YXIgcyA9IHRoaXMuZ2V0KHN0YXJ0KTtcbiAgICAgICAgaWYgKHMgPT09IDApXG4gICAgICAgICAgICBsZW4gLT0gODtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2hpbGUgKHMgPCAxMjgpIHtcbiAgICAgICAgICAgICAgICBzIDw8PSAxO1xuICAgICAgICAgICAgICAgIC0tbGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCIoXCIgKyBsZW4gKyBcIiBiaXQpXCI7XG4gICAgfVxuICAgIHZhciBuID0gMDtcbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSlcbiAgICAgICAgbiA9IChuIDw8IDgpIHwgdGhpcy5nZXQoaSk7XG4gICAgcmV0dXJuIG47XG59O1xuU3RyZWFtLnByb3RvdHlwZS5wYXJzZUJpdFN0cmluZyA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdmFyIHVudXNlZEJpdCA9IHRoaXMuZ2V0KHN0YXJ0KSxcbiAgICAgICAgbGVuQml0ID0gKChlbmQgLSBzdGFydCAtIDEpIDw8IDMpIC0gdW51c2VkQml0LFxuICAgICAgICBzID0gXCIoXCIgKyBsZW5CaXQgKyBcIiBiaXQpXCI7XG4gICAgaWYgKGxlbkJpdCA8PSAyMCkge1xuICAgICAgICB2YXIgc2tpcCA9IHVudXNlZEJpdDtcbiAgICAgICAgcyArPSBcIiBcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IGVuZCAtIDE7IGkgPiBzdGFydDsgLS1pKSB7XG4gICAgICAgICAgICB2YXIgYiA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IHNraXA7IGogPCA4OyArK2opXG4gICAgICAgICAgICAgICAgcyArPSAoYiA+PiBqKSAmIDEgPyBcIjFcIiA6IFwiMFwiO1xuICAgICAgICAgICAgc2tpcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHM7XG59O1xuU3RyZWFtLnByb3RvdHlwZS5wYXJzZU9jdGV0U3RyaW5nID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQsXG4gICAgICAgIHMgPSBcIihcIiArIGxlbiArIFwiIGJ5dGUpIFwiO1xuICAgIGlmIChsZW4gPiBoYXJkTGltaXQpXG4gICAgICAgIGVuZCA9IHN0YXJ0ICsgaGFyZExpbWl0O1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKVxuICAgICAgICBzICs9IHRoaXMuaGV4Qnl0ZSh0aGlzLmdldChpKSk7IC8vVE9ETzogYWxzbyB0cnkgTGF0aW4xP1xuICAgIGlmIChsZW4gPiBoYXJkTGltaXQpXG4gICAgICAgIHMgKz0gZWxsaXBzaXM7XG4gICAgcmV0dXJuIHM7XG59O1xuU3RyZWFtLnByb3RvdHlwZS5wYXJzZU9JRCA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgdmFyIHMgPSAnJyxcbiAgICAgICAgbiA9IDAsXG4gICAgICAgIGJpdHMgPSAwO1xuICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICAgIHZhciB2ID0gdGhpcy5nZXQoaSk7XG4gICAgICAgIG4gPSAobiA8PCA3KSB8ICh2ICYgMHg3Rik7XG4gICAgICAgIGJpdHMgKz0gNztcbiAgICAgICAgaWYgKCEodiAmIDB4ODApKSB7IC8vIGZpbmlzaGVkXG4gICAgICAgICAgICBpZiAocyA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IG4gPCA4MCA/IG4gPCA0MCA/IDAgOiAxIDogMjtcbiAgICAgICAgICAgICAgICBzID0gbSArIFwiLlwiICsgKG4gLSBtICogNDApO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgcyArPSBcIi5cIiArICgoYml0cyA+PSAzMSkgPyBcImJpZ2ludFwiIDogbik7XG4gICAgICAgICAgICBuID0gYml0cyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHM7XG59O1xuXG5mdW5jdGlvbiBBU04xKHN0cmVhbSwgaGVhZGVyLCBsZW5ndGgsIHRhZywgc3ViKSB7XG4gICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5zdWIgPSBzdWI7XG59XG5BU04xLnByb3RvdHlwZS50eXBlTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy50YWcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIFwidW5rbm93blwiO1xuICAgIHZhciB0YWdDbGFzcyA9IHRoaXMudGFnID4+IDYsXG4gICAgICAgIHRhZ0NvbnN0cnVjdGVkID0gKHRoaXMudGFnID4+IDUpICYgMSxcbiAgICAgICAgdGFnTnVtYmVyID0gdGhpcy50YWcgJiAweDFGO1xuICAgIHN3aXRjaCAodGFnQ2xhc3MpIHtcbiAgICBjYXNlIDA6IC8vIHVuaXZlcnNhbFxuICAgICAgICBzd2l0Y2ggKHRhZ051bWJlcikge1xuICAgICAgICBjYXNlIDB4MDA6IHJldHVybiBcIkVPQ1wiO1xuICAgICAgICBjYXNlIDB4MDE6IHJldHVybiBcIkJPT0xFQU5cIjtcbiAgICAgICAgY2FzZSAweDAyOiByZXR1cm4gXCJJTlRFR0VSXCI7XG4gICAgICAgIGNhc2UgMHgwMzogcmV0dXJuIFwiQklUX1NUUklOR1wiO1xuICAgICAgICBjYXNlIDB4MDQ6IHJldHVybiBcIk9DVEVUX1NUUklOR1wiO1xuICAgICAgICBjYXNlIDB4MDU6IHJldHVybiBcIk5VTExcIjtcbiAgICAgICAgY2FzZSAweDA2OiByZXR1cm4gXCJPQkpFQ1RfSURFTlRJRklFUlwiO1xuICAgICAgICBjYXNlIDB4MDc6IHJldHVybiBcIk9iamVjdERlc2NyaXB0b3JcIjtcbiAgICAgICAgY2FzZSAweDA4OiByZXR1cm4gXCJFWFRFUk5BTFwiO1xuICAgICAgICBjYXNlIDB4MDk6IHJldHVybiBcIlJFQUxcIjtcbiAgICAgICAgY2FzZSAweDBBOiByZXR1cm4gXCJFTlVNRVJBVEVEXCI7XG4gICAgICAgIGNhc2UgMHgwQjogcmV0dXJuIFwiRU1CRURERURfUERWXCI7XG4gICAgICAgIGNhc2UgMHgwQzogcmV0dXJuIFwiVVRGOFN0cmluZ1wiO1xuICAgICAgICBjYXNlIDB4MTA6IHJldHVybiBcIlNFUVVFTkNFXCI7XG4gICAgICAgIGNhc2UgMHgxMTogcmV0dXJuIFwiU0VUXCI7XG4gICAgICAgIGNhc2UgMHgxMjogcmV0dXJuIFwiTnVtZXJpY1N0cmluZ1wiO1xuICAgICAgICBjYXNlIDB4MTM6IHJldHVybiBcIlByaW50YWJsZVN0cmluZ1wiOyAvLyBBU0NJSSBzdWJzZXRcbiAgICAgICAgY2FzZSAweDE0OiByZXR1cm4gXCJUZWxldGV4U3RyaW5nXCI7IC8vIGFrYSBUNjFTdHJpbmdcbiAgICAgICAgY2FzZSAweDE1OiByZXR1cm4gXCJWaWRlb3RleFN0cmluZ1wiO1xuICAgICAgICBjYXNlIDB4MTY6IHJldHVybiBcIklBNVN0cmluZ1wiOyAvLyBBU0NJSVxuICAgICAgICBjYXNlIDB4MTc6IHJldHVybiBcIlVUQ1RpbWVcIjtcbiAgICAgICAgY2FzZSAweDE4OiByZXR1cm4gXCJHZW5lcmFsaXplZFRpbWVcIjtcbiAgICAgICAgY2FzZSAweDE5OiByZXR1cm4gXCJHcmFwaGljU3RyaW5nXCI7XG4gICAgICAgIGNhc2UgMHgxQTogcmV0dXJuIFwiVmlzaWJsZVN0cmluZ1wiOyAvLyBBU0NJSSBzdWJzZXRcbiAgICAgICAgY2FzZSAweDFCOiByZXR1cm4gXCJHZW5lcmFsU3RyaW5nXCI7XG4gICAgICAgIGNhc2UgMHgxQzogcmV0dXJuIFwiVW5pdmVyc2FsU3RyaW5nXCI7XG4gICAgICAgIGNhc2UgMHgxRTogcmV0dXJuIFwiQk1QU3RyaW5nXCI7XG4gICAgICAgIGRlZmF1bHQ6ICAgcmV0dXJuIFwiVW5pdmVyc2FsX1wiICsgdGFnTnVtYmVyLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfVxuICAgIGNhc2UgMTogcmV0dXJuIFwiQXBwbGljYXRpb25fXCIgKyB0YWdOdW1iZXIudG9TdHJpbmcoMTYpO1xuICAgIGNhc2UgMjogcmV0dXJuIFwiW1wiICsgdGFnTnVtYmVyICsgXCJdXCI7IC8vIENvbnRleHRcbiAgICBjYXNlIDM6IHJldHVybiBcIlByaXZhdGVfXCIgKyB0YWdOdW1iZXIudG9TdHJpbmcoMTYpO1xuICAgIH1cbn07XG5BU04xLnByb3RvdHlwZS5yZVNlZW1zQVNDSUkgPSAvXlsgLX5dKyQvO1xuQVNOMS5wcm90b3R5cGUuY29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy50YWcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgdmFyIHRhZ0NsYXNzID0gdGhpcy50YWcgPj4gNixcbiAgICAgICAgdGFnTnVtYmVyID0gdGhpcy50YWcgJiAweDFGLFxuICAgICAgICBjb250ZW50ID0gdGhpcy5wb3NDb250ZW50KCksXG4gICAgICAgIGxlbiA9IE1hdGguYWJzKHRoaXMubGVuZ3RoKTtcbiAgICBpZiAodGFnQ2xhc3MgIT09IDApIHsgLy8gdW5pdmVyc2FsXG4gICAgICAgIGlmICh0aGlzLnN1YiAhPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIihcIiArIHRoaXMuc3ViLmxlbmd0aCArIFwiIGVsZW0pXCI7XG4gICAgICAgIC8vVE9ETzogVFJZIFRPIFBBUlNFIEFTQ0lJIFNUUklOR1xuICAgICAgICB2YXIgcyA9IHRoaXMuc3RyZWFtLnBhcnNlU3RyaW5nSVNPKGNvbnRlbnQsIGNvbnRlbnQgKyBNYXRoLm1pbihsZW4sIGhhcmRMaW1pdCkpO1xuICAgICAgICBpZiAodGhpcy5yZVNlZW1zQVNDSUkudGVzdChzKSlcbiAgICAgICAgICAgIHJldHVybiBzLnN1YnN0cmluZygwLCAyICogaGFyZExpbWl0KSArICgocy5sZW5ndGggPiAyICogaGFyZExpbWl0KSA/IGVsbGlwc2lzIDogXCJcIik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wYXJzZU9jdGV0U3RyaW5nKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRhZ051bWJlcikge1xuICAgIGNhc2UgMHgwMTogLy8gQk9PTEVBTlxuICAgICAgICByZXR1cm4gKHRoaXMuc3RyZWFtLmdldChjb250ZW50KSA9PT0gMCkgPyBcImZhbHNlXCIgOiBcInRydWVcIjtcbiAgICBjYXNlIDB4MDI6IC8vIElOVEVHRVJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBhcnNlSW50ZWdlcihjb250ZW50LCBjb250ZW50ICsgbGVuKTtcbiAgICBjYXNlIDB4MDM6IC8vIEJJVF9TVFJJTkdcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViID8gXCIoXCIgKyB0aGlzLnN1Yi5sZW5ndGggKyBcIiBlbGVtKVwiIDpcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnBhcnNlQml0U3RyaW5nKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pO1xuICAgIGNhc2UgMHgwNDogLy8gT0NURVRfU1RSSU5HXG4gICAgICAgIHJldHVybiB0aGlzLnN1YiA/IFwiKFwiICsgdGhpcy5zdWIubGVuZ3RoICsgXCIgZWxlbSlcIiA6XG4gICAgICAgICAgICB0aGlzLnN0cmVhbS5wYXJzZU9jdGV0U3RyaW5nKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pO1xuICAgIC8vY2FzZSAweDA1OiAvLyBOVUxMXG4gICAgY2FzZSAweDA2OiAvLyBPQkpFQ1RfSURFTlRJRklFUlxuICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VPSUQoY29udGVudCwgY29udGVudCArIGxlbik7XG4gICAgLy9jYXNlIDB4MDc6IC8vIE9iamVjdERlc2NyaXB0b3JcbiAgICAvL2Nhc2UgMHgwODogLy8gRVhURVJOQUxcbiAgICAvL2Nhc2UgMHgwOTogLy8gUkVBTFxuICAgIC8vY2FzZSAweDBBOiAvLyBFTlVNRVJBVEVEXG4gICAgLy9jYXNlIDB4MEI6IC8vIEVNQkVEREVEX1BEVlxuICAgIGNhc2UgMHgxMDogLy8gU0VRVUVOQ0VcbiAgICBjYXNlIDB4MTE6IC8vIFNFVFxuICAgICAgICByZXR1cm4gXCIoXCIgKyB0aGlzLnN1Yi5sZW5ndGggKyBcIiBlbGVtKVwiO1xuICAgIGNhc2UgMHgwQzogLy8gVVRGOFN0cmluZ1xuICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VTdHJpbmdVVEYoY29udGVudCwgY29udGVudCArIGxlbik7XG4gICAgY2FzZSAweDEyOiAvLyBOdW1lcmljU3RyaW5nXG4gICAgY2FzZSAweDEzOiAvLyBQcmludGFibGVTdHJpbmdcbiAgICBjYXNlIDB4MTQ6IC8vIFRlbGV0ZXhTdHJpbmdcbiAgICBjYXNlIDB4MTU6IC8vIFZpZGVvdGV4U3RyaW5nXG4gICAgY2FzZSAweDE2OiAvLyBJQTVTdHJpbmdcbiAgICAvL2Nhc2UgMHgxOTogLy8gR3JhcGhpY1N0cmluZ1xuICAgIGNhc2UgMHgxQTogLy8gVmlzaWJsZVN0cmluZ1xuICAgIC8vY2FzZSAweDFCOiAvLyBHZW5lcmFsU3RyaW5nXG4gICAgLy9jYXNlIDB4MUM6IC8vIFVuaXZlcnNhbFN0cmluZ1xuICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW0ucGFyc2VTdHJpbmdJU08oY29udGVudCwgY29udGVudCArIGxlbik7XG4gICAgY2FzZSAweDFFOiAvLyBCTVBTdHJpbmdcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBhcnNlU3RyaW5nQk1QKGNvbnRlbnQsIGNvbnRlbnQgKyBsZW4pO1xuICAgIGNhc2UgMHgxNzogLy8gVVRDVGltZVxuICAgIGNhc2UgMHgxODogLy8gR2VuZXJhbGl6ZWRUaW1lXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVhbS5wYXJzZVRpbWUoY29udGVudCwgY29udGVudCArIGxlbik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbkFTTjEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGVOYW1lKCkgKyBcIkBcIiArIHRoaXMuc3RyZWFtLnBvcyArIFwiW2hlYWRlcjpcIiArIHRoaXMuaGVhZGVyICsgXCIsbGVuZ3RoOlwiICsgdGhpcy5sZW5ndGggKyBcIixzdWI6XCIgKyAoKHRoaXMuc3ViID09PSBudWxsKSA/ICdudWxsJyA6IHRoaXMuc3ViLmxlbmd0aCkgKyBcIl1cIjtcbn07XG5BU04xLnByb3RvdHlwZS5wcmludCA9IGZ1bmN0aW9uIChpbmRlbnQpIHtcbiAgICBpZiAoaW5kZW50ID09PSB1bmRlZmluZWQpIGluZGVudCA9ICcnO1xuICAgIGRvY3VtZW50LndyaXRlbG4oaW5kZW50ICsgdGhpcyk7XG4gICAgaWYgKHRoaXMuc3ViICE9PSBudWxsKSB7XG4gICAgICAgIGluZGVudCArPSAnICAnO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGhpcy5zdWIubGVuZ3RoOyBpIDwgbWF4OyArK2kpXG4gICAgICAgICAgICB0aGlzLnN1YltpXS5wcmludChpbmRlbnQpO1xuICAgIH1cbn07XG5BU04xLnByb3RvdHlwZS50b1ByZXR0eVN0cmluZyA9IGZ1bmN0aW9uIChpbmRlbnQpIHtcbiAgICBpZiAoaW5kZW50ID09PSB1bmRlZmluZWQpIGluZGVudCA9ICcnO1xuICAgIHZhciBzID0gaW5kZW50ICsgdGhpcy50eXBlTmFtZSgpICsgXCIgQFwiICsgdGhpcy5zdHJlYW0ucG9zO1xuICAgIGlmICh0aGlzLmxlbmd0aCA+PSAwKVxuICAgICAgICBzICs9IFwiK1wiO1xuICAgIHMgKz0gdGhpcy5sZW5ndGg7XG4gICAgaWYgKHRoaXMudGFnICYgMHgyMClcbiAgICAgICAgcyArPSBcIiAoY29uc3RydWN0ZWQpXCI7XG4gICAgZWxzZSBpZiAoKCh0aGlzLnRhZyA9PSAweDAzKSB8fCAodGhpcy50YWcgPT0gMHgwNCkpICYmICh0aGlzLnN1YiAhPT0gbnVsbCkpXG4gICAgICAgIHMgKz0gXCIgKGVuY2Fwc3VsYXRlcylcIjtcbiAgICBzICs9IFwiXFxuXCI7XG4gICAgaWYgKHRoaXMuc3ViICE9PSBudWxsKSB7XG4gICAgICAgIGluZGVudCArPSAnICAnO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGhpcy5zdWIubGVuZ3RoOyBpIDwgbWF4OyArK2kpXG4gICAgICAgICAgICBzICs9IHRoaXMuc3ViW2ldLnRvUHJldHR5U3RyaW5nKGluZGVudCk7XG4gICAgfVxuICAgIHJldHVybiBzO1xufTtcbkFTTjEucHJvdG90eXBlLnRvRE9NID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBub2RlID0gRE9NLnRhZyhcImRpdlwiLCBcIm5vZGVcIik7XG4gICAgbm9kZS5hc24xID0gdGhpcztcbiAgICB2YXIgaGVhZCA9IERPTS50YWcoXCJkaXZcIiwgXCJoZWFkXCIpO1xuICAgIHZhciBzID0gdGhpcy50eXBlTmFtZSgpLnJlcGxhY2UoL18vZywgXCIgXCIpO1xuICAgIGhlYWQuaW5uZXJIVE1MID0gcztcbiAgICB2YXIgY29udGVudCA9IHRoaXMuY29udGVudCgpO1xuICAgIGlmIChjb250ZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnRlbnQgPSBTdHJpbmcoY29udGVudCkucmVwbGFjZSgvPC9nLCBcIiZsdDtcIik7XG4gICAgICAgIHZhciBwcmV2aWV3ID0gRE9NLnRhZyhcInNwYW5cIiwgXCJwcmV2aWV3XCIpO1xuICAgICAgICBwcmV2aWV3LmFwcGVuZENoaWxkKERPTS50ZXh0KGNvbnRlbnQpKTtcbiAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChwcmV2aWV3KTtcbiAgICB9XG4gICAgbm9kZS5hcHBlbmRDaGlsZChoZWFkKTtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMuaGVhZCA9IGhlYWQ7XG4gICAgdmFyIHZhbHVlID0gRE9NLnRhZyhcImRpdlwiLCBcInZhbHVlXCIpO1xuICAgIHMgPSBcIk9mZnNldDogXCIgKyB0aGlzLnN0cmVhbS5wb3MgKyBcIjxici8+XCI7XG4gICAgcyArPSBcIkxlbmd0aDogXCIgKyB0aGlzLmhlYWRlciArIFwiK1wiO1xuICAgIGlmICh0aGlzLmxlbmd0aCA+PSAwKVxuICAgICAgICBzICs9IHRoaXMubGVuZ3RoO1xuICAgIGVsc2VcbiAgICAgICAgcyArPSAoLXRoaXMubGVuZ3RoKSArIFwiICh1bmRlZmluZWQpXCI7XG4gICAgaWYgKHRoaXMudGFnICYgMHgyMClcbiAgICAgICAgcyArPSBcIjxici8+KGNvbnN0cnVjdGVkKVwiO1xuICAgIGVsc2UgaWYgKCgodGhpcy50YWcgPT0gMHgwMykgfHwgKHRoaXMudGFnID09IDB4MDQpKSAmJiAodGhpcy5zdWIgIT09IG51bGwpKVxuICAgICAgICBzICs9IFwiPGJyLz4oZW5jYXBzdWxhdGVzKVwiO1xuICAgIC8vVE9ETyBpZiAodGhpcy50YWcgPT0gMHgwMykgcyArPSBcIlVudXNlZCBiaXRzOiBcIlxuICAgIGlmIChjb250ZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHMgKz0gXCI8YnIvPlZhbHVlOjxici8+PGI+XCIgKyBjb250ZW50ICsgXCI8L2I+XCI7XG4gICAgICAgIGlmICgodHlwZW9mIG9pZHMgPT09ICdvYmplY3QnKSAmJiAodGhpcy50YWcgPT0gMHgwNikpIHtcbiAgICAgICAgICAgIHZhciBvaWQgPSBvaWRzW2NvbnRlbnRdO1xuICAgICAgICAgICAgaWYgKG9pZCkge1xuICAgICAgICAgICAgICAgIGlmIChvaWQuZCkgcyArPSBcIjxici8+XCIgKyBvaWQuZDtcbiAgICAgICAgICAgICAgICBpZiAob2lkLmMpIHMgKz0gXCI8YnIvPlwiICsgb2lkLmM7XG4gICAgICAgICAgICAgICAgaWYgKG9pZC53KSBzICs9IFwiPGJyLz4od2FybmluZyEpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsdWUuaW5uZXJIVE1MID0gcztcbiAgICBub2RlLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICB2YXIgc3ViID0gRE9NLnRhZyhcImRpdlwiLCBcInN1YlwiKTtcbiAgICBpZiAodGhpcy5zdWIgIT09IG51bGwpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG1heCA9IHRoaXMuc3ViLmxlbmd0aDsgaSA8IG1heDsgKytpKVxuICAgICAgICAgICAgc3ViLmFwcGVuZENoaWxkKHRoaXMuc3ViW2ldLnRvRE9NKCkpO1xuICAgIH1cbiAgICBub2RlLmFwcGVuZENoaWxkKHN1Yik7XG4gICAgaGVhZC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBub2RlLmNsYXNzTmFtZSA9IChub2RlLmNsYXNzTmFtZSA9PSBcIm5vZGUgY29sbGFwc2VkXCIpID8gXCJub2RlXCIgOiBcIm5vZGUgY29sbGFwc2VkXCI7XG4gICAgfTtcbiAgICByZXR1cm4gbm9kZTtcbn07XG5BU04xLnByb3RvdHlwZS5wb3NTdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJlYW0ucG9zO1xufTtcbkFTTjEucHJvdG90eXBlLnBvc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyZWFtLnBvcyArIHRoaXMuaGVhZGVyO1xufTtcbkFTTjEucHJvdG90eXBlLnBvc0VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJlYW0ucG9zICsgdGhpcy5oZWFkZXIgKyBNYXRoLmFicyh0aGlzLmxlbmd0aCk7XG59O1xuQVNOMS5wcm90b3R5cGUuZmFrZUhvdmVyID0gZnVuY3Rpb24gKGN1cnJlbnQpIHtcbiAgICB0aGlzLm5vZGUuY2xhc3NOYW1lICs9IFwiIGhvdmVyXCI7XG4gICAgaWYgKGN1cnJlbnQpXG4gICAgICAgIHRoaXMuaGVhZC5jbGFzc05hbWUgKz0gXCIgaG92ZXJcIjtcbn07XG5BU04xLnByb3RvdHlwZS5mYWtlT3V0ID0gZnVuY3Rpb24gKGN1cnJlbnQpIHtcbiAgICB2YXIgcmUgPSAvID9ob3Zlci87XG4gICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMubm9kZS5jbGFzc05hbWUucmVwbGFjZShyZSwgXCJcIik7XG4gICAgaWYgKGN1cnJlbnQpXG4gICAgICAgIHRoaXMuaGVhZC5jbGFzc05hbWUgPSB0aGlzLmhlYWQuY2xhc3NOYW1lLnJlcGxhY2UocmUsIFwiXCIpO1xufTtcbkFTTjEucHJvdG90eXBlLnRvSGV4RE9NX3N1YiA9IGZ1bmN0aW9uIChub2RlLCBjbGFzc05hbWUsIHN0cmVhbSwgc3RhcnQsIGVuZCkge1xuICAgIGlmIChzdGFydCA+PSBlbmQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgc3ViID0gRE9NLnRhZyhcInNwYW5cIiwgY2xhc3NOYW1lKTtcbiAgICBzdWIuYXBwZW5kQ2hpbGQoRE9NLnRleHQoXG4gICAgICAgIHN0cmVhbS5oZXhEdW1wKHN0YXJ0LCBlbmQpKSk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChzdWIpO1xufTtcbkFTTjEucHJvdG90eXBlLnRvSGV4RE9NID0gZnVuY3Rpb24gKHJvb3QpIHtcbiAgICB2YXIgbm9kZSA9IERPTS50YWcoXCJzcGFuXCIsIFwiaGV4XCIpO1xuICAgIGlmIChyb290ID09PSB1bmRlZmluZWQpIHJvb3QgPSBub2RlO1xuICAgIHRoaXMuaGVhZC5oZXhOb2RlID0gbm9kZTtcbiAgICB0aGlzLmhlYWQub25tb3VzZW92ZXIgPSBmdW5jdGlvbiAoKSB7IHRoaXMuaGV4Tm9kZS5jbGFzc05hbWUgPSBcImhleEN1cnJlbnRcIjsgfTtcbiAgICB0aGlzLmhlYWQub25tb3VzZW91dCAgPSBmdW5jdGlvbiAoKSB7IHRoaXMuaGV4Tm9kZS5jbGFzc05hbWUgPSBcImhleFwiOyB9O1xuICAgIG5vZGUuYXNuMSA9IHRoaXM7XG4gICAgbm9kZS5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSAhcm9vdC5zZWxlY3RlZDtcbiAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJvb3Quc2VsZWN0ZWQgPSB0aGlzLmFzbjE7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IFwiaGV4Q3VycmVudFwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXNuMS5mYWtlSG92ZXIoY3VycmVudCk7XG4gICAgfTtcbiAgICBub2RlLm9ubW91c2VvdXQgID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IChyb290LnNlbGVjdGVkID09IHRoaXMuYXNuMSk7XG4gICAgICAgIHRoaXMuYXNuMS5mYWtlT3V0KGN1cnJlbnQpO1xuICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgcm9vdC5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IFwiaGV4XCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMudG9IZXhET01fc3ViKG5vZGUsIFwidGFnXCIsIHRoaXMuc3RyZWFtLCB0aGlzLnBvc1N0YXJ0KCksIHRoaXMucG9zU3RhcnQoKSArIDEpO1xuICAgIHRoaXMudG9IZXhET01fc3ViKG5vZGUsICh0aGlzLmxlbmd0aCA+PSAwKSA/IFwiZGxlblwiIDogXCJ1bGVuXCIsIHRoaXMuc3RyZWFtLCB0aGlzLnBvc1N0YXJ0KCkgKyAxLCB0aGlzLnBvc0NvbnRlbnQoKSk7XG4gICAgaWYgKHRoaXMuc3ViID09PSBudWxsKVxuICAgICAgICBub2RlLmFwcGVuZENoaWxkKERPTS50ZXh0KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0uaGV4RHVtcCh0aGlzLnBvc0NvbnRlbnQoKSwgdGhpcy5wb3NFbmQoKSkpKTtcbiAgICBlbHNlIGlmICh0aGlzLnN1Yi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmaXJzdCA9IHRoaXMuc3ViWzBdO1xuICAgICAgICB2YXIgbGFzdCA9IHRoaXMuc3ViW3RoaXMuc3ViLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLnRvSGV4RE9NX3N1Yihub2RlLCBcImludHJvXCIsIHRoaXMuc3RyZWFtLCB0aGlzLnBvc0NvbnRlbnQoKSwgZmlyc3QucG9zU3RhcnQoKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSB0aGlzLnN1Yi5sZW5ndGg7IGkgPCBtYXg7ICsraSlcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGhpcy5zdWJbaV0udG9IZXhET00ocm9vdCkpO1xuICAgICAgICB0aGlzLnRvSGV4RE9NX3N1Yihub2RlLCBcIm91dHJvXCIsIHRoaXMuc3RyZWFtLCBsYXN0LnBvc0VuZCgpLCB0aGlzLnBvc0VuZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59O1xuQVNOMS5wcm90b3R5cGUudG9IZXhTdHJpbmcgPSBmdW5jdGlvbiAocm9vdCkge1xuICAgIHJldHVybiB0aGlzLnN0cmVhbS5oZXhEdW1wKHRoaXMucG9zU3RhcnQoKSwgdGhpcy5wb3NFbmQoKSwgdHJ1ZSk7XG59O1xuQVNOMS5kZWNvZGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgdmFyIGJ1ZiA9IHN0cmVhbS5nZXQoKSxcbiAgICAgICAgbGVuID0gYnVmICYgMHg3RjtcbiAgICBpZiAobGVuID09IGJ1ZilcbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICBpZiAobGVuID4gMylcbiAgICAgICAgdGhyb3cgXCJMZW5ndGggb3ZlciAyNCBiaXRzIG5vdCBzdXBwb3J0ZWQgYXQgcG9zaXRpb24gXCIgKyAoc3RyZWFtLnBvcyAtIDEpO1xuICAgIGlmIChsZW4gPT09IDApXG4gICAgICAgIHJldHVybiAtMTsgLy8gdW5kZWZpbmVkXG4gICAgYnVmID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgICBidWYgPSAoYnVmIDw8IDgpIHwgc3RyZWFtLmdldCgpO1xuICAgIHJldHVybiBidWY7XG59O1xuQVNOMS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKHRhZywgbGVuLCBzdHJlYW0pIHtcbiAgICBpZiAodGFnICYgMHgyMCkgLy8gY29uc3RydWN0ZWRcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKCh0YWcgPCAweDAzKSB8fCAodGFnID4gMHgwNCkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB2YXIgcCA9IG5ldyBTdHJlYW0oc3RyZWFtKTtcbiAgICBpZiAodGFnID09IDB4MDMpIHAuZ2V0KCk7IC8vIEJpdFN0cmluZyB1bnVzZWQgYml0cywgbXVzdCBiZSBpbiBbMCwgN11cbiAgICB2YXIgc3ViVGFnID0gcC5nZXQoKTtcbiAgICBpZiAoKHN1YlRhZyA+PiA2KSAmIDB4MDEpIC8vIG5vdCAodW5pdmVyc2FsIG9yIGNvbnRleHQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICB2YXIgc3ViTGVuZ3RoID0gQVNOMS5kZWNvZGVMZW5ndGgocCk7XG4gICAgICAgIHJldHVybiAoKHAucG9zIC0gc3RyZWFtLnBvcykgKyBzdWJMZW5ndGggPT0gbGVuKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5BU04xLmRlY29kZSA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICBpZiAoIShzdHJlYW0gaW5zdGFuY2VvZiBTdHJlYW0pKVxuICAgICAgICBzdHJlYW0gPSBuZXcgU3RyZWFtKHN0cmVhbSwgMCk7XG4gICAgdmFyIHN0cmVhbVN0YXJ0ID0gbmV3IFN0cmVhbShzdHJlYW0pLFxuICAgICAgICB0YWcgPSBzdHJlYW0uZ2V0KCksXG4gICAgICAgIGxlbiA9IEFTTjEuZGVjb2RlTGVuZ3RoKHN0cmVhbSksXG4gICAgICAgIGhlYWRlciA9IHN0cmVhbS5wb3MgLSBzdHJlYW1TdGFydC5wb3MsXG4gICAgICAgIHN1YiA9IG51bGw7XG4gICAgaWYgKEFTTjEuaGFzQ29udGVudCh0YWcsIGxlbiwgc3RyZWFtKSkge1xuICAgICAgICAvLyBpdCBoYXMgY29udGVudCwgc28gd2UgZGVjb2RlIGl0XG4gICAgICAgIHZhciBzdGFydCA9IHN0cmVhbS5wb3M7XG4gICAgICAgIGlmICh0YWcgPT0gMHgwMykgc3RyZWFtLmdldCgpOyAvLyBza2lwIEJpdFN0cmluZyB1bnVzZWQgYml0cywgbXVzdCBiZSBpbiBbMCwgN11cbiAgICAgICAgc3ViID0gW107XG4gICAgICAgIGlmIChsZW4gPj0gMCkge1xuICAgICAgICAgICAgLy8gZGVmaW5pdGUgbGVuZ3RoXG4gICAgICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW47XG4gICAgICAgICAgICB3aGlsZSAoc3RyZWFtLnBvcyA8IGVuZClcbiAgICAgICAgICAgICAgICBzdWJbc3ViLmxlbmd0aF0gPSBBU04xLmRlY29kZShzdHJlYW0pO1xuICAgICAgICAgICAgaWYgKHN0cmVhbS5wb3MgIT0gZW5kKVxuICAgICAgICAgICAgICAgIHRocm93IFwiQ29udGVudCBzaXplIGlzIG5vdCBjb3JyZWN0IGZvciBjb250YWluZXIgc3RhcnRpbmcgYXQgb2Zmc2V0IFwiICsgc3RhcnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1bmRlZmluZWQgbGVuZ3RoXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSBBU04xLmRlY29kZShzdHJlYW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy50YWcgPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgc3ViW3N1Yi5sZW5ndGhdID0gcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGVuID0gc3RhcnQgLSBzdHJlYW0ucG9zO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IFwiRXhjZXB0aW9uIHdoaWxlIGRlY29kaW5nIHVuZGVmaW5lZCBsZW5ndGggY29udGVudDogXCIgKyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHN0cmVhbS5wb3MgKz0gbGVuOyAvLyBza2lwIGNvbnRlbnRcbiAgICByZXR1cm4gbmV3IEFTTjEoc3RyZWFtU3RhcnQsIGhlYWRlciwgbGVuLCB0YWcsIHN1Yik7XG59O1xuQVNOMS50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ZXN0ID0gW1xuICAgICAgICB7IHZhbHVlOiBbMHgyN10sICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiAweDI3ICAgICB9LFxuICAgICAgICB7IHZhbHVlOiBbMHg4MSwgMHhDOV0sICAgICAgICAgICAgIGV4cGVjdGVkOiAweEM5ICAgICB9LFxuICAgICAgICB7IHZhbHVlOiBbMHg4MywgMHhGRSwgMHhEQywgMHhCQV0sIGV4cGVjdGVkOiAweEZFRENCQSB9XG4gICAgXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGVzdC5sZW5ndGg7IGkgPCBtYXg7ICsraSkge1xuICAgICAgICB2YXIgcG9zID0gMCxcbiAgICAgICAgICAgIHN0cmVhbSA9IG5ldyBTdHJlYW0odGVzdFtpXS52YWx1ZSwgMCksXG4gICAgICAgICAgICByZXMgPSBBU04xLmRlY29kZUxlbmd0aChzdHJlYW0pO1xuICAgICAgICBpZiAocmVzICE9IHRlc3RbaV0uZXhwZWN0ZWQpXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZShcIkluIHRlc3RbXCIgKyBpICsgXCJdIGV4cGVjdGVkIFwiICsgdGVzdFtpXS5leHBlY3RlZCArIFwiIGdvdCBcIiArIHJlcyArIFwiXFxuXCIpO1xuICAgIH1cbn07XG5cbi8vIGV4cG9ydCBnbG9iYWxzXG53aW5kb3cuQVNOMSA9IEFTTjE7XG59KSgpO1xuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgaGV4YWRlY2ltYWwgdmFsdWUgKGFzIGEgc3RyaW5nKSBvZiB0aGUgY3VycmVudCBBU04uMSBlbGVtZW50XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5BU04xLnByb3RvdHlwZS5nZXRIZXhTdHJpbmdWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhleFN0cmluZyA9IHRoaXMudG9IZXhTdHJpbmcoKTtcbiAgdmFyIG9mZnNldCA9IHRoaXMuaGVhZGVyICogMjtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoICogMjtcbiAgcmV0dXJuIGhleFN0cmluZy5zdWJzdHIob2Zmc2V0LCBsZW5ndGgpO1xufTtcblxuLyoqXG4gKiBNZXRob2QgdG8gcGFyc2UgYSBwZW0gZW5jb2RlZCBzdHJpbmcgY29udGFpbmluZyBib3RoIGEgcHVibGljIG9yIHByaXZhdGUga2V5LlxuICogVGhlIG1ldGhvZCB3aWxsIHRyYW5zbGF0ZSB0aGUgcGVtIGVuY29kZWQgc3RyaW5nIGluIGEgZGVyIGVuY29kZWQgc3RyaW5nIGFuZFxuICogd2lsbCBwYXJzZSBwcml2YXRlIGtleSBhbmQgcHVibGljIGtleSBwYXJhbWV0ZXJzLiBUaGlzIG1ldGhvZCBhY2NlcHRzIHB1YmxpYyBrZXlcbiAqIGluIHRoZSByc2FlbmNyeXB0aW9uIHBrY3MgIzEgZm9ybWF0IChvaWQ6IDEuMi44NDAuMTEzNTQ5LjEuMS4xKS5cbiAqXG4gKiBAdG9kbyBDaGVjayBob3cgbWFueSByc2EgZm9ybWF0cyB1c2UgdGhlIHNhbWUgZm9ybWF0IG9mIHBrY3MgIzEuXG4gKlxuICogVGhlIGZvcm1hdCBpcyBkZWZpbmVkIGFzOlxuICogUHVibGljS2V5SW5mbyA6Oj0gU0VRVUVOQ0Uge1xuICogICBhbGdvcml0aG0gICAgICAgQWxnb3JpdGhtSWRlbnRpZmllcixcbiAqICAgUHVibGljS2V5ICAgICAgIEJJVCBTVFJJTkdcbiAqIH1cbiAqIFdoZXJlIEFsZ29yaXRobUlkZW50aWZpZXIgaXM6XG4gKiBBbGdvcml0aG1JZGVudGlmaWVyIDo6PSBTRVFVRU5DRSB7XG4gKiAgIGFsZ29yaXRobSAgICAgICBPQkpFQ1QgSURFTlRJRklFUiwgICAgIHRoZSBPSUQgb2YgdGhlIGVuYyBhbGdvcml0aG1cbiAqICAgcGFyYW1ldGVycyAgICAgIEFOWSBERUZJTkVEIEJZIGFsZ29yaXRobSBPUFRJT05BTCAoTlVMTCBmb3IgUEtDUyAjMSlcbiAqIH1cbiAqIGFuZCBQdWJsaWNLZXkgaXMgYSBTRVFVRU5DRSBlbmNhcHN1bGF0ZWQgaW4gYSBCSVQgU1RSSU5HXG4gKiBSU0FQdWJsaWNLZXkgOjo9IFNFUVVFTkNFIHtcbiAqICAgbW9kdWx1cyAgICAgICAgICAgSU5URUdFUiwgIC0tIG5cbiAqICAgcHVibGljRXhwb25lbnQgICAgSU5URUdFUiAgIC0tIGVcbiAqIH1cbiAqIGl0J3MgcG9zc2libGUgdG8gZXhhbWluZSB0aGUgc3RydWN0dXJlIG9mIHRoZSBrZXlzIG9idGFpbmVkIGZyb20gb3BlbnNzbCB1c2luZ1xuICogYW4gYXNuLjEgZHVtcGVyIGFzIHRoZSBvbmUgdXNlZCBoZXJlIHRvIHBhcnNlIHRoZSBjb21wb25lbnRzOiBodHRwOi8vbGFwby5pdC9hc24xanMvXG4gKiBAYXJndW1lbnQge3N0cmluZ30gcGVtIHRoZSBwZW0gZW5jb2RlZCBzdHJpbmcsIGNhbiBpbmNsdWRlIHRoZSBCRUdJTi9FTkQgaGVhZGVyL2Zvb3RlclxuICogQHByaXZhdGVcbiAqL1xuUlNBS2V5LnByb3RvdHlwZS5wYXJzZUtleSA9IGZ1bmN0aW9uIChwZW0pIHtcbiAgdHJ5IHtcbiAgICB2YXIgbW9kdWx1cyA9IDA7XG4gICAgdmFyIHB1YmxpY19leHBvbmVudCA9IDA7XG4gICAgdmFyIHJlSGV4ID0gL15cXHMqKD86WzAtOUEtRmEtZl1bMC05QS1GYS1mXVxccyopKyQvO1xuICAgIHZhciBkZXIgPSByZUhleC50ZXN0KHBlbSkgPyBIZXguZGVjb2RlKHBlbSkgOiBCYXNlNjQudW5hcm1vcihwZW0pO1xuICAgIHZhciBhc24xID0gQVNOMS5kZWNvZGUoZGVyKTtcblxuICAgIC8vRml4ZXMgYSBidWcgd2l0aCBPcGVuU1NMIDEuMCsgcHJpdmF0ZSBrZXlzXG4gICAgaWYoYXNuMS5zdWIubGVuZ3RoID09PSAzKXtcbiAgICAgICAgYXNuMSA9IGFzbjEuc3ViWzJdLnN1YlswXTtcbiAgICB9XG4gICAgaWYgKGFzbjEuc3ViLmxlbmd0aCA9PT0gOSkge1xuXG4gICAgICAvLyBQYXJzZSB0aGUgcHJpdmF0ZSBrZXkuXG4gICAgICBtb2R1bHVzID0gYXNuMS5zdWJbMV0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy9iaWdpbnRcbiAgICAgIHRoaXMubiA9IHBhcnNlQmlnSW50KG1vZHVsdXMsIDE2KTtcblxuICAgICAgcHVibGljX2V4cG9uZW50ID0gYXNuMS5zdWJbMl0uZ2V0SGV4U3RyaW5nVmFsdWUoKTsgLy9pbnRcbiAgICAgIHRoaXMuZSA9IHBhcnNlSW50KHB1YmxpY19leHBvbmVudCwgMTYpO1xuXG4gICAgICB2YXIgcHJpdmF0ZV9leHBvbmVudCA9IGFzbjEuc3ViWzNdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vYmlnaW50XG4gICAgICB0aGlzLmQgPSBwYXJzZUJpZ0ludChwcml2YXRlX2V4cG9uZW50LCAxNik7XG5cbiAgICAgIHZhciBwcmltZTEgPSBhc24xLnN1Yls0XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvL2JpZ2ludFxuICAgICAgdGhpcy5wID0gcGFyc2VCaWdJbnQocHJpbWUxLCAxNik7XG5cbiAgICAgIHZhciBwcmltZTIgPSBhc24xLnN1Yls1XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvL2JpZ2ludFxuICAgICAgdGhpcy5xID0gcGFyc2VCaWdJbnQocHJpbWUyLCAxNik7XG5cbiAgICAgIHZhciBleHBvbmVudDEgPSBhc24xLnN1Yls2XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvL2JpZ2ludFxuICAgICAgdGhpcy5kbXAxID0gcGFyc2VCaWdJbnQoZXhwb25lbnQxLCAxNik7XG5cbiAgICAgIHZhciBleHBvbmVudDIgPSBhc24xLnN1Yls3XS5nZXRIZXhTdHJpbmdWYWx1ZSgpOyAvL2JpZ2ludFxuICAgICAgdGhpcy5kbXExID0gcGFyc2VCaWdJbnQoZXhwb25lbnQyLCAxNik7XG5cbiAgICAgIHZhciBjb2VmZmljaWVudCA9IGFzbjEuc3ViWzhdLmdldEhleFN0cmluZ1ZhbHVlKCk7IC8vYmlnaW50XG4gICAgICB0aGlzLmNvZWZmID0gcGFyc2VCaWdJbnQoY29lZmZpY2llbnQsIDE2KTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChhc24xLnN1Yi5sZW5ndGggPT09IDIpIHtcblxuICAgICAgLy8gUGFyc2UgdGhlIHB1YmxpYyBrZXkuXG4gICAgICB2YXIgYml0X3N0cmluZyA9IGFzbjEuc3ViWzFdO1xuICAgICAgdmFyIHNlcXVlbmNlID0gYml0X3N0cmluZy5zdWJbMF07XG5cbiAgICAgIG1vZHVsdXMgPSBzZXF1ZW5jZS5zdWJbMF0uZ2V0SGV4U3RyaW5nVmFsdWUoKTtcbiAgICAgIHRoaXMubiA9IHBhcnNlQmlnSW50KG1vZHVsdXMsIDE2KTtcbiAgICAgIHB1YmxpY19leHBvbmVudCA9IHNlcXVlbmNlLnN1YlsxXS5nZXRIZXhTdHJpbmdWYWx1ZSgpO1xuICAgICAgdGhpcy5lID0gcGFyc2VJbnQocHVibGljX2V4cG9uZW50LCAxNik7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNhdGNoIChleCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgcnNhIHBhcmFtZXRlcnMgaW4gYSBoZXggZW5jb2RlZCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSByc2Ega2V5LlxuICpcbiAqIFRoZSB0cmFuc2xhdGlvbiBmb2xsb3cgdGhlIEFTTi4xIG5vdGF0aW9uIDpcbiAqIFJTQVByaXZhdGVLZXkgOjo9IFNFUVVFTkNFIHtcbiAqICAgdmVyc2lvbiAgICAgICAgICAgVmVyc2lvbixcbiAqICAgbW9kdWx1cyAgICAgICAgICAgSU5URUdFUiwgIC0tIG5cbiAqICAgcHVibGljRXhwb25lbnQgICAgSU5URUdFUiwgIC0tIGVcbiAqICAgcHJpdmF0ZUV4cG9uZW50ICAgSU5URUdFUiwgIC0tIGRcbiAqICAgcHJpbWUxICAgICAgICAgICAgSU5URUdFUiwgIC0tIHBcbiAqICAgcHJpbWUyICAgICAgICAgICAgSU5URUdFUiwgIC0tIHFcbiAqICAgZXhwb25lbnQxICAgICAgICAgSU5URUdFUiwgIC0tIGQgbW9kIChwMSlcbiAqICAgZXhwb25lbnQyICAgICAgICAgSU5URUdFUiwgIC0tIGQgbW9kIChxLTEpXG4gKiAgIGNvZWZmaWNpZW50ICAgICAgIElOVEVHRVIsICAtLSAoaW52ZXJzZSBvZiBxKSBtb2QgcFxuICogfVxuICogQHJldHVybnMge3N0cmluZ30gIERFUiBFbmNvZGVkIFN0cmluZyByZXByZXNlbnRpbmcgdGhlIHJzYSBwcml2YXRlIGtleVxuICogQHByaXZhdGVcbiAqL1xuUlNBS2V5LnByb3RvdHlwZS5nZXRQcml2YXRlQmFzZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgJ2FycmF5JzogW1xuICAgICAgbmV3IEtKVVIuYXNuMS5ERVJJbnRlZ2VyKHsnaW50JzogMH0pLFxuICAgICAgbmV3IEtKVVIuYXNuMS5ERVJJbnRlZ2VyKHsnYmlnaW50JzogdGhpcy5ufSksXG4gICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeydpbnQnOiB0aGlzLmV9KSxcbiAgICAgIG5ldyBLSlVSLmFzbjEuREVSSW50ZWdlcih7J2JpZ2ludCc6IHRoaXMuZH0pLFxuICAgICAgbmV3IEtKVVIuYXNuMS5ERVJJbnRlZ2VyKHsnYmlnaW50JzogdGhpcy5wfSksXG4gICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeydiaWdpbnQnOiB0aGlzLnF9KSxcbiAgICAgIG5ldyBLSlVSLmFzbjEuREVSSW50ZWdlcih7J2JpZ2ludCc6IHRoaXMuZG1wMX0pLFxuICAgICAgbmV3IEtKVVIuYXNuMS5ERVJJbnRlZ2VyKHsnYmlnaW50JzogdGhpcy5kbXExfSksXG4gICAgICBuZXcgS0pVUi5hc24xLkRFUkludGVnZXIoeydiaWdpbnQnOiB0aGlzLmNvZWZmfSlcbiAgICBdXG4gIH07XG4gIHZhciBzZXEgPSBuZXcgS0pVUi5hc24xLkRFUlNlcXVlbmNlKG9wdGlvbnMpO1xuICByZXR1cm4gc2VxLmdldEVuY29kZWRIZXgoKTtcbn07XG5cbi8qKlxuICogYmFzZTY0IChwZW0pIGVuY29kZWQgdmVyc2lvbiBvZiB0aGUgREVSIGVuY29kZWQgcmVwcmVzZW50YXRpb25cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIHdpdGhvdXQgaGVhZGVyIGFuZCBmb290ZXJcbiAqIEBwdWJsaWNcbiAqL1xuUlNBS2V5LnByb3RvdHlwZS5nZXRQcml2YXRlQmFzZUtleUI2NCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGhleDJiNjQodGhpcy5nZXRQcml2YXRlQmFzZUtleSgpKTtcbn07XG5cbi8qKlxuICogVHJhbnNsYXRlIHJzYSBwYXJhbWV0ZXJzIGluIGEgaGV4IGVuY29kZWQgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcnNhIHB1YmxpYyBrZXkuXG4gKiBUaGUgcmVwcmVzZW50YXRpb24gZm9sbG93IHRoZSBBU04uMSBub3RhdGlvbiA6XG4gKiBQdWJsaWNLZXlJbmZvIDo6PSBTRVFVRU5DRSB7XG4gKiAgIGFsZ29yaXRobSAgICAgICBBbGdvcml0aG1JZGVudGlmaWVyLFxuICogICBQdWJsaWNLZXkgICAgICAgQklUIFNUUklOR1xuICogfVxuICogV2hlcmUgQWxnb3JpdGhtSWRlbnRpZmllciBpczpcbiAqIEFsZ29yaXRobUlkZW50aWZpZXIgOjo9IFNFUVVFTkNFIHtcbiAqICAgYWxnb3JpdGhtICAgICAgIE9CSkVDVCBJREVOVElGSUVSLCAgICAgdGhlIE9JRCBvZiB0aGUgZW5jIGFsZ29yaXRobVxuICogICBwYXJhbWV0ZXJzICAgICAgQU5ZIERFRklORUQgQlkgYWxnb3JpdGhtIE9QVElPTkFMIChOVUxMIGZvciBQS0NTICMxKVxuICogfVxuICogYW5kIFB1YmxpY0tleSBpcyBhIFNFUVVFTkNFIGVuY2Fwc3VsYXRlZCBpbiBhIEJJVCBTVFJJTkdcbiAqIFJTQVB1YmxpY0tleSA6Oj0gU0VRVUVOQ0Uge1xuICogICBtb2R1bHVzICAgICAgICAgICBJTlRFR0VSLCAgLS0gblxuICogICBwdWJsaWNFeHBvbmVudCAgICBJTlRFR0VSICAgLS0gZVxuICogfVxuICogQHJldHVybnMge3N0cmluZ30gREVSIEVuY29kZWQgU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcnNhIHB1YmxpYyBrZXlcbiAqIEBwcml2YXRlXG4gKi9cblJTQUtleS5wcm90b3R5cGUuZ2V0UHVibGljQmFzZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgJ2FycmF5JzogW1xuICAgICAgbmV3IEtKVVIuYXNuMS5ERVJPYmplY3RJZGVudGlmaWVyKHsnb2lkJzogJzEuMi44NDAuMTEzNTQ5LjEuMS4xJ30pLCAvL1JTQSBFbmNyeXB0aW9uIHBrY3MgIzEgb2lkXG4gICAgICBuZXcgS0pVUi5hc24xLkRFUk51bGwoKVxuICAgIF1cbiAgfTtcbiAgdmFyIGZpcnN0X3NlcXVlbmNlID0gbmV3IEtKVVIuYXNuMS5ERVJTZXF1ZW5jZShvcHRpb25zKTtcblxuICBvcHRpb25zID0ge1xuICAgICdhcnJheSc6IFtcbiAgICAgIG5ldyBLSlVSLmFzbjEuREVSSW50ZWdlcih7J2JpZ2ludCc6IHRoaXMubn0pLFxuICAgICAgbmV3IEtKVVIuYXNuMS5ERVJJbnRlZ2VyKHsnaW50JzogdGhpcy5lfSlcbiAgICBdXG4gIH07XG4gIHZhciBzZWNvbmRfc2VxdWVuY2UgPSBuZXcgS0pVUi5hc24xLkRFUlNlcXVlbmNlKG9wdGlvbnMpO1xuXG4gIG9wdGlvbnMgPSB7XG4gICAgJ2hleCc6ICcwMCcgKyBzZWNvbmRfc2VxdWVuY2UuZ2V0RW5jb2RlZEhleCgpXG4gIH07XG4gIHZhciBiaXRfc3RyaW5nID0gbmV3IEtKVVIuYXNuMS5ERVJCaXRTdHJpbmcob3B0aW9ucyk7XG5cbiAgb3B0aW9ucyA9IHtcbiAgICAnYXJyYXknOiBbXG4gICAgICBmaXJzdF9zZXF1ZW5jZSxcbiAgICAgIGJpdF9zdHJpbmdcbiAgICBdXG4gIH07XG4gIHZhciBzZXEgPSBuZXcgS0pVUi5hc24xLkRFUlNlcXVlbmNlKG9wdGlvbnMpO1xuICByZXR1cm4gc2VxLmdldEVuY29kZWRIZXgoKTtcbn07XG5cbi8qKlxuICogYmFzZTY0IChwZW0pIGVuY29kZWQgdmVyc2lvbiBvZiB0aGUgREVSIGVuY29kZWQgcmVwcmVzZW50YXRpb25cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIHdpdGhvdXQgaGVhZGVyIGFuZCBmb290ZXJcbiAqIEBwdWJsaWNcbiAqL1xuUlNBS2V5LnByb3RvdHlwZS5nZXRQdWJsaWNCYXNlS2V5QjY0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaGV4MmI2NCh0aGlzLmdldFB1YmxpY0Jhc2VLZXkoKSk7XG59O1xuXG4vKipcbiAqIHdyYXAgdGhlIHN0cmluZyBpbiBibG9jayBvZiB3aWR0aCBjaGFycy4gVGhlIGRlZmF1bHQgdmFsdWUgZm9yIHJzYSBrZXlzIGlzIDY0XG4gKiBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgcGVtIGVuY29kZWQgc3RyaW5nIHdpdGhvdXQgaGVhZGVyIGFuZCBmb290ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGg9NjRdIC0gdGhlIGxlbmd0aCB0aGUgc3RyaW5nIGhhcyB0byBiZSB3cmFwcGVkIGF0XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuUlNBS2V5LnByb3RvdHlwZS53b3Jkd3JhcCA9IGZ1bmN0aW9uIChzdHIsIHdpZHRoKSB7XG4gIHdpZHRoID0gd2lkdGggfHwgNjQ7XG4gIGlmICghc3RyKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuICB2YXIgcmVnZXggPSAnKC57MSwnICsgd2lkdGggKyAnfSkoICt8JFxcbj8pfCguezEsJyArIHdpZHRoICsgJ30pJztcbiAgcmV0dXJuIHN0ci5tYXRjaChSZWdFeHAocmVnZXgsICdnJykpLmpvaW4oJ1xcbicpO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgcGVtIGVuY29kZWQgcHJpdmF0ZSBrZXlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBwZW0gZW5jb2RlZCBwcml2YXRlIGtleSB3aXRoIGhlYWRlci9mb290ZXJcbiAqIEBwdWJsaWNcbiAqL1xuUlNBS2V5LnByb3RvdHlwZS5nZXRQcml2YXRlS2V5ID0gZnVuY3Rpb24gKCkge1xuICB2YXIga2V5ID0gXCItLS0tLUJFR0lOIFJTQSBQUklWQVRFIEtFWS0tLS0tXFxuXCI7XG4gIGtleSArPSB0aGlzLndvcmR3cmFwKHRoaXMuZ2V0UHJpdmF0ZUJhc2VLZXlCNjQoKSkgKyBcIlxcblwiO1xuICBrZXkgKz0gXCItLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLVwiO1xuICByZXR1cm4ga2V5O1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgcGVtIGVuY29kZWQgcHVibGljIGtleVxuICogQHJldHVybnMge3N0cmluZ30gdGhlIHBlbSBlbmNvZGVkIHB1YmxpYyBrZXkgd2l0aCBoZWFkZXIvZm9vdGVyXG4gKiBAcHVibGljXG4gKi9cblJTQUtleS5wcm90b3R5cGUuZ2V0UHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICB2YXIga2V5ID0gXCItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxcblwiO1xuICBrZXkgKz0gdGhpcy53b3Jkd3JhcCh0aGlzLmdldFB1YmxpY0Jhc2VLZXlCNjQoKSkgKyBcIlxcblwiO1xuICBrZXkgKz0gXCItLS0tLUVORCBQVUJMSUMgS0VZLS0tLS1cIjtcbiAgcmV0dXJuIGtleTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIG9iamVjdCBjb250YWlucyB0aGUgbmVjZXNzYXJ5IHBhcmFtZXRlcnMgdG8gcG9wdWxhdGUgdGhlIHJzYSBtb2R1bHVzXG4gKiBhbmQgcHVibGljIGV4cG9uZW50IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iaj17fV0gLSBBbiBvYmplY3QgdGhhdCBtYXkgY29udGFpbiB0aGUgdHdvIHB1YmxpYyBrZXlcbiAqIHBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBvYmplY3QgY29udGFpbnMgYm90aCB0aGUgbW9kdWx1cyBhbmQgdGhlIHB1YmxpYyBleHBvbmVudFxuICogcHJvcGVydGllcyAobiBhbmQgZSlcbiAqIEB0b2RvIGNoZWNrIGZvciB0eXBlcyBvZiBuIGFuZCBlLiBOIHNob3VsZCBiZSBhIHBhcnNlYWJsZSBiaWdJbnQgb2JqZWN0LCBFIHNob3VsZFxuICogYmUgYSBwYXJzZWFibGUgaW50ZWdlciBudW1iZXJcbiAqIEBwcml2YXRlXG4gKi9cblJTQUtleS5wcm90b3R5cGUuaGFzUHVibGljS2V5UHJvcGVydHkgPSBmdW5jdGlvbiAob2JqKSB7XG4gIG9iaiA9IG9iaiB8fCB7fTtcbiAgcmV0dXJuIChcbiAgICBvYmouaGFzT3duUHJvcGVydHkoJ24nKSAmJlxuICAgIG9iai5oYXNPd25Qcm9wZXJ0eSgnZScpXG4gICk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBvYmplY3QgY29udGFpbnMgQUxMIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIFJTQSBrZXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iaj17fV0gLSBBbiBvYmplY3QgdGhhdCBtYXkgY29udGFpbiBuaW5lIHJzYSBrZXlcbiAqIHBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBvYmplY3QgY29udGFpbnMgYWxsIHRoZSBwYXJhbWV0ZXJzIG5lZWRlZFxuICogQHRvZG8gY2hlY2sgZm9yIHR5cGVzIG9mIHRoZSBwYXJhbWV0ZXJzIGFsbCB0aGUgcGFyYW1ldGVycyBidXQgdGhlIHB1YmxpYyBleHBvbmVudFxuICogc2hvdWxkIGJlIHBhcnNlYWJsZSBiaWdpbnQgb2JqZWN0cywgdGhlIHB1YmxpYyBleHBvbmVudCBzaG91bGQgYmUgYSBwYXJzZWFibGUgaW50ZWdlciBudW1iZXJcbiAqIEBwcml2YXRlXG4gKi9cblJTQUtleS5wcm90b3R5cGUuaGFzUHJpdmF0ZUtleVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaikge1xuICBvYmogPSBvYmogfHwge307XG4gIHJldHVybiAoXG4gICAgb2JqLmhhc093blByb3BlcnR5KCduJykgJiZcbiAgICBvYmouaGFzT3duUHJvcGVydHkoJ2UnKSAmJlxuICAgIG9iai5oYXNPd25Qcm9wZXJ0eSgnZCcpICYmXG4gICAgb2JqLmhhc093blByb3BlcnR5KCdwJykgJiZcbiAgICBvYmouaGFzT3duUHJvcGVydHkoJ3EnKSAmJlxuICAgIG9iai5oYXNPd25Qcm9wZXJ0eSgnZG1wMScpICYmXG4gICAgb2JqLmhhc093blByb3BlcnR5KCdkbXExJykgJiZcbiAgICBvYmouaGFzT3duUHJvcGVydHkoJ2NvZWZmJylcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIHByb3BlcnRpZXMgb2Ygb2JqIGluIHRoZSBjdXJyZW50IHJzYSBvYmplY3QuIE9iaiBzaG91bGQgQVQgTEVBU1RcbiAqIGluY2x1ZGUgdGhlIG1vZHVsdXMgYW5kIHB1YmxpYyBleHBvbmVudCAobiwgZSkgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSB0aGUgb2JqZWN0IGNvbnRhaW5pbmcgcnNhIHBhcmFtZXRlcnNcbiAqIEBwcml2YXRlXG4gKi9cblJTQUtleS5wcm90b3R5cGUucGFyc2VQcm9wZXJ0aWVzRnJvbSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdGhpcy5uID0gb2JqLm47XG4gIHRoaXMuZSA9IG9iai5lO1xuXG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoJ2QnKSkge1xuICAgIHRoaXMuZCA9IG9iai5kO1xuICAgIHRoaXMucCA9IG9iai5wO1xuICAgIHRoaXMucSA9IG9iai5xO1xuICAgIHRoaXMuZG1wMSA9IG9iai5kbXAxO1xuICAgIHRoaXMuZG1xMSA9IG9iai5kbXExO1xuICAgIHRoaXMuY29lZmYgPSBvYmouY29lZmY7XG4gIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IEpTRW5jcnlwdFJTQUtleSB0aGF0IGV4dGVuZHMgVG9tIFd1J3MgUlNBIGtleSBvYmplY3QuXG4gKiBUaGlzIG9iamVjdCBpcyBqdXN0IGEgZGVjb3JhdG9yIGZvciBwYXJzaW5nIHRoZSBrZXkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IGtleSAtIFRoZSBrZXkgaW4gc3RyaW5nIGZvcm1hdCwgb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmdcbiAqIHRoZSBwYXJhbWV0ZXJzIG5lZWRlZCB0byBidWlsZCBhIFJTQUtleSBvYmplY3QuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIEpTRW5jcnlwdFJTQUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgLy8gQ2FsbCB0aGUgc3VwZXIgY29uc3RydWN0b3IuXG4gIFJTQUtleS5jYWxsKHRoaXMpO1xuICAvLyBJZiBhIGtleSBrZXkgd2FzIHByb3ZpZGVkLlxuICBpZiAoa2V5KSB7XG4gICAgLy8gSWYgdGhpcyBpcyBhIHN0cmluZy4uLlxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5wYXJzZUtleShrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHRoaXMuaGFzUHJpdmF0ZUtleVByb3BlcnR5KGtleSkgfHxcbiAgICAgIHRoaXMuaGFzUHVibGljS2V5UHJvcGVydHkoa2V5KVxuICAgICkge1xuICAgICAgLy8gU2V0IHRoZSB2YWx1ZXMgZm9yIHRoZSBrZXkuXG4gICAgICB0aGlzLnBhcnNlUHJvcGVydGllc0Zyb20oa2V5KTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIERlcml2ZSBmcm9tIFJTQUtleS5cbkpTRW5jcnlwdFJTQUtleS5wcm90b3R5cGUgPSBuZXcgUlNBS2V5KCk7XG5cbi8vIFJlc2V0IHRoZSBjb250cnVjdG9yLlxuSlNFbmNyeXB0UlNBS2V5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEpTRW5jcnlwdFJTQUtleTtcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMgPSB7fV0gLSBBbiBvYmplY3QgdG8gY3VzdG9taXplIEpTRW5jcnlwdCBiZWhhdmlvdXJcbiAqIHBvc3NpYmxlIHBhcmFtZXRlcnMgYXJlOlxuICogLSBkZWZhdWx0X2tleV9zaXplICAgICAgICB7bnVtYmVyfSAgZGVmYXVsdDogMTAyNCB0aGUga2V5IHNpemUgaW4gYml0XG4gKiAtIGRlZmF1bHRfcHVibGljX2V4cG9uZW50IHtzdHJpbmd9ICBkZWZhdWx0OiAnMDEwMDAxJyB0aGUgaGV4YWRlY2ltYWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHB1YmxpYyBleHBvbmVudFxuICogLSBsb2cgICAgICAgICAgICAgICAgICAgICB7Ym9vbGVhbn0gZGVmYXVsdDogZmFsc2Ugd2hldGhlciBsb2cgd2Fybi9lcnJvciBvciBub3RcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgSlNFbmNyeXB0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMuZGVmYXVsdF9rZXlfc2l6ZSA9IHBhcnNlSW50KG9wdGlvbnMuZGVmYXVsdF9rZXlfc2l6ZSkgfHwgMTAyNDtcbiAgdGhpcy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCA9IG9wdGlvbnMuZGVmYXVsdF9wdWJsaWNfZXhwb25lbnQgfHwgJzAxMDAwMSc7IC8vNjU1MzcgZGVmYXVsdCBvcGVuc3NsIHB1YmxpYyBleHBvbmVudCBmb3IgcnNhIGtleSB0eXBlXG4gIHRoaXMubG9nID0gb3B0aW9ucy5sb2cgfHwgZmFsc2U7XG4gIC8vIFRoZSBwcml2YXRlIGFuZCBwdWJsaWMga2V5LlxuICB0aGlzLmtleSA9IG51bGw7XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byBzZXQgdGhlIHJzYSBrZXkgcGFyYW1ldGVyIChvbmUgbWV0aG9kIGlzIGVub3VnaCB0byBzZXQgYm90aCB0aGUgcHVibGljXG4gKiBhbmQgdGhlIHByaXZhdGUga2V5LCBzaW5jZSB0aGUgcHJpdmF0ZSBrZXkgY29udGFpbnMgdGhlIHB1YmxpYyBrZXkgcGFyYW1lbnRlcnMpXG4gKiBMb2cgYSB3YXJuaW5nIGlmIGxvZ3MgYXJlIGVuYWJsZWRcbiAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30ga2V5IHRoZSBwZW0gZW5jb2RlZCBzdHJpbmcgb3IgYW4gb2JqZWN0ICh3aXRoIG9yIHdpdGhvdXQgaGVhZGVyL2Zvb3RlcilcbiAqIEBwdWJsaWNcbiAqL1xuSlNFbmNyeXB0LnByb3RvdHlwZS5zZXRLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIGlmICh0aGlzLmxvZyAmJiB0aGlzLmtleSkge1xuICAgIGNvbnNvbGUud2FybignQSBrZXkgd2FzIGFscmVhZHkgc2V0LCBvdmVycmlkaW5nIGV4aXN0aW5nLicpO1xuICB9XG4gIHRoaXMua2V5ID0gbmV3IEpTRW5jcnlwdFJTQUtleShrZXkpO1xufTtcblxuLyoqXG4gKiBQcm94eSBtZXRob2QgZm9yIHNldEtleSwgZm9yIGFwaSBjb21wYXRpYmlsaXR5XG4gKiBAc2VlIHNldEtleVxuICogQHB1YmxpY1xuICovXG5KU0VuY3J5cHQucHJvdG90eXBlLnNldFByaXZhdGVLZXkgPSBmdW5jdGlvbiAocHJpdmtleSkge1xuICAvLyBDcmVhdGUgdGhlIGtleS5cbiAgdGhpcy5zZXRLZXkocHJpdmtleSk7XG59O1xuXG4vKipcbiAqIFByb3h5IG1ldGhvZCBmb3Igc2V0S2V5LCBmb3IgYXBpIGNvbXBhdGliaWxpdHlcbiAqIEBzZWUgc2V0S2V5XG4gKiBAcHVibGljXG4gKi9cbkpTRW5jcnlwdC5wcm90b3R5cGUuc2V0UHVibGljS2V5ID0gZnVuY3Rpb24gKHB1YmtleSkge1xuICAvLyBTZXRzIHRoZSBwdWJsaWMga2V5LlxuICB0aGlzLnNldEtleShwdWJrZXkpO1xufTtcblxuLyoqXG4gKiBQcm94eSBtZXRob2QgZm9yIFJTQUtleSBvYmplY3QncyBkZWNyeXB0LCBkZWNyeXB0IHRoZSBzdHJpbmcgdXNpbmcgdGhlIHByaXZhdGVcbiAqIGNvbXBvbmVudHMgb2YgdGhlIHJzYSBrZXkgb2JqZWN0LiBOb3RlIHRoYXQgaWYgdGhlIG9iamVjdCB3YXMgbm90IHNldCB3aWxsIGJlIGNyZWF0ZWRcbiAqIG9uIHRoZSBmbHkgKGJ5IHRoZSBnZXRLZXkgbWV0aG9kKSB1c2luZyB0aGUgcGFyYW1ldGVycyBwYXNzZWQgaW4gdGhlIEpTRW5jcnlwdCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBiYXNlNjQgZW5jb2RlZCBjcnlwdGVkIHN0cmluZyB0byBkZWNyeXB0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBkZWNyeXB0ZWQgc3RyaW5nXG4gKiBAcHVibGljXG4gKi9cbkpTRW5jcnlwdC5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgLy8gUmV0dXJuIHRoZSBkZWNyeXB0ZWQgc3RyaW5nLlxuICB0cnkge1xuICAgIHJldHVybiB0aGlzLmdldEtleSgpLmRlY3J5cHQoYjY0dG9oZXgoc3RyaW5nKSk7XG4gIH1cbiAgY2F0Y2ggKGV4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIFByb3h5IG1ldGhvZCBmb3IgUlNBS2V5IG9iamVjdCdzIGVuY3J5cHQsIGVuY3J5cHQgdGhlIHN0cmluZyB1c2luZyB0aGUgcHVibGljXG4gKiBjb21wb25lbnRzIG9mIHRoZSByc2Ega2V5IG9iamVjdC4gTm90ZSB0aGF0IGlmIHRoZSBvYmplY3Qgd2FzIG5vdCBzZXQgd2lsbCBiZSBjcmVhdGVkXG4gKiBvbiB0aGUgZmx5IChieSB0aGUgZ2V0S2V5IG1ldGhvZCkgdXNpbmcgdGhlIHBhcmFtZXRlcnMgcGFzc2VkIGluIHRoZSBKU0VuY3J5cHQgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgdGhlIHN0cmluZyB0byBlbmNyeXB0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlbmNyeXB0ZWQgc3RyaW5nIGVuY29kZWQgaW4gYmFzZTY0XG4gKiBAcHVibGljXG4gKi9cbkpTRW5jcnlwdC5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgLy8gUmV0dXJuIHRoZSBlbmNyeXB0ZWQgc3RyaW5nLlxuICB0cnkge1xuICAgIHJldHVybiBoZXgyYjY0KHRoaXMuZ2V0S2V5KCkuZW5jcnlwdChzdHJpbmcpKTtcbiAgfVxuICBjYXRjaCAoZXgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogR2V0dGVyIGZvciB0aGUgY3VycmVudCBKU0VuY3J5cHRSU0FLZXkgb2JqZWN0LiBJZiBpdCBkb2Vzbid0IGV4aXN0cyBhIG5ldyBvYmplY3RcbiAqIHdpbGwgYmUgY3JlYXRlZCBhbmQgcmV0dXJuZWRcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IFtjYl0gdGhlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBpZiB3ZSB3YW50IHRoZSBrZXkgdG8gYmUgZ2VuZXJhdGVkXG4gKiBpbiBhbiBhc3luYyBmYXNoaW9uXG4gKiBAcmV0dXJucyB7SlNFbmNyeXB0UlNBS2V5fSB0aGUgSlNFbmNyeXB0UlNBS2V5IG9iamVjdFxuICogQHB1YmxpY1xuICovXG5KU0VuY3J5cHQucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uIChjYikge1xuICAvLyBPbmx5IGNyZWF0ZSBuZXcgaWYgaXQgZG9lcyBub3QgZXhpc3QuXG4gIGlmICghdGhpcy5rZXkpIHtcbiAgICAvLyBHZXQgYSBuZXcgcHJpdmF0ZSBrZXkuXG4gICAgdGhpcy5rZXkgPSBuZXcgSlNFbmNyeXB0UlNBS2V5KCk7XG4gICAgaWYgKGNiICYmIHt9LnRvU3RyaW5nLmNhbGwoY2IpID09PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICB0aGlzLmtleS5nZW5lcmF0ZUFzeW5jKHRoaXMuZGVmYXVsdF9rZXlfc2l6ZSwgdGhpcy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBHZW5lcmF0ZSB0aGUga2V5LlxuICAgIHRoaXMua2V5LmdlbmVyYXRlKHRoaXMuZGVmYXVsdF9rZXlfc2l6ZSwgdGhpcy5kZWZhdWx0X3B1YmxpY19leHBvbmVudCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMua2V5O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwZW0gZW5jb2RlZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJpdmF0ZSBrZXlcbiAqIElmIHRoZSBrZXkgZG9lc24ndCBleGlzdHMgYSBuZXcga2V5IHdpbGwgYmUgY3JlYXRlZFxuICogQHJldHVybnMge3N0cmluZ30gcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHByaXZhdGUga2V5IFdJVEggaGVhZGVyIGFuZCBmb290ZXJcbiAqIEBwdWJsaWNcbiAqL1xuSlNFbmNyeXB0LnByb3RvdHlwZS5nZXRQcml2YXRlS2V5ID0gZnVuY3Rpb24gKCkge1xuICAvLyBSZXR1cm4gdGhlIHByaXZhdGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBrZXkuXG4gIHJldHVybiB0aGlzLmdldEtleSgpLmdldFByaXZhdGVLZXkoKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcGVtIGVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHByaXZhdGUga2V5XG4gKiBJZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IGtleSB3aWxsIGJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwcml2YXRlIGtleSBXSVRIT1VUIGhlYWRlciBhbmQgZm9vdGVyXG4gKiBAcHVibGljXG4gKi9cbkpTRW5jcnlwdC5wcm90b3R5cGUuZ2V0UHJpdmF0ZUtleUI2NCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gUmV0dXJuIHRoZSBwcml2YXRlIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMga2V5LlxuICByZXR1cm4gdGhpcy5nZXRLZXkoKS5nZXRQcml2YXRlQmFzZUtleUI2NCgpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwdWJsaWMga2V5XG4gKiBJZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IGtleSB3aWxsIGJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwdWJsaWMga2V5IFdJVEggaGVhZGVyIGFuZCBmb290ZXJcbiAqIEBwdWJsaWNcbiAqL1xuSlNFbmNyeXB0LnByb3RvdHlwZS5nZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFJldHVybiB0aGUgcHJpdmF0ZSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGtleS5cbiAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZ2V0UHVibGljS2V5KCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwdWJsaWMga2V5XG4gKiBJZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3RzIGEgbmV3IGtleSB3aWxsIGJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBlbSBlbmNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwdWJsaWMga2V5IFdJVEhPVVQgaGVhZGVyIGFuZCBmb290ZXJcbiAqIEBwdWJsaWNcbiAqL1xuSlNFbmNyeXB0LnByb3RvdHlwZS5nZXRQdWJsaWNLZXlCNjQgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFJldHVybiB0aGUgcHJpdmF0ZSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGtleS5cbiAgcmV0dXJuIHRoaXMuZ2V0S2V5KCkuZ2V0UHVibGljQmFzZUtleUI2NCgpO1xufTtcblxuXG4gIEpTRW5jcnlwdC52ZXJzaW9uID0gJzIuMy4xJztcbiAgZXhwb3J0cy5KU0VuY3J5cHQgPSBKU0VuY3J5cHQ7XG59KTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwibFlwb0kyXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvc3JjL2pzZW5jcnlwdC5qc1wiLFwiL3NyY1wiKSJdfQ==
