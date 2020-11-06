module.exports = {
  RGBtoHSV: async function(rgb) {

      const split = await this.slitString(rgb);
      const hsv = await this.makeCalc(split[0], split[1], split[2]);
      return await this.DecimalHexTwosComplement(~~hsv.h);

  },
  makeCalc: async function(r, g, b) {
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    return {
        h: await this.choose(max, min, d, Number(r), Number(g), Number(b)),
        s: s * 1000,
        v: v * 1000
    };
  },
  choose: function(max, min, d, r, g, b) {
    return new Promise(resolve => {
        let h = 0;
        switch (max) {
            case min: h = 0; break;
            case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
            case g: h = (b - r) + d * 2; h /= 6 * d; break;
            case b: h = (r - g) + d * 4; h /= 6 * d; break;

        }
        resolve(h * 360);
    });
  },
  DecimalHexTwosComplement: async function(decimal) {
      var size = 4;
      let i;

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
    },
    slitString: function(toSplit) {
      return new Promise(resolve => {
          resolve(toSplit.split(','));
      });
    }
}
