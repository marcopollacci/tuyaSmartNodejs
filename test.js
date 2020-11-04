/* accepts parameters
 * r  Object = {r:x, g:y, b:z}
 * OR 
 * r, g, b
*/
function RGBtoHSV(r, g, b) {
  if (arguments.length === 1) {
      g = r.g, b = r.b, r = r.r;
  }
  var max = Math.max(r, g, b), min = Math.min(r, g, b),
      d = max - min,
      h,
      s = (max === 0 ? 0 : d / max),
      v = max / 255;

      console.log('max', max);
      console.log('min', min);
      console.log('r', r);
      console.log('g', g);
      console.log('b', b);

  switch (max) {
      case min: h = 0; break;
      case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d;console.log('rosso'); break;
      case g: h = (b - r) + d * 2; h /= 6 * d; break;
      case b: h = (r - g) + d * 4; h /= 6 * d; break;
  }

  console.log('h', h);

  return {
      h: h * 360,
      s: s * 1000,
      v: v * 1000
  };
}

function DecimalHexTwosComplement(decimal) {
  console.log('decimal', decimal);
  var size = 4;

  if (decimal >= 0) {
    var hexadecimal = decimal.toString(16);

    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    return hexadecimal;
  } else {
    var hexadecimal = Math.abs(decimal).toString(16);
    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    var output = '';
    for (i = 0; i < hexadecimal.length; i++) {
      output += (0x0F - parseInt(hexadecimal[i], 16)).toString(16);
    }

    output = (0x01 + parseInt(output, 16)).toString(16);
    return output;
  }
}

//rgb(252, 139, 1)
const pippo = RGBtoHSV(252,139,1);
const bdca = DecimalHexTwosComplement(232);
// console.log('conversione', pippo);
// console.log('mh', pippo.h.toString(16))
console.log('fwefew', bdca);