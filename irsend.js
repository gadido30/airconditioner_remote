const yup = require('yup');
const gpio = require('pi-gpio');

const outputPin = 16;

const optsSchema = yup.object()
  .shape({
    intro: yup.array()
      .of(yup.number().integer()),
    durationOne: yup.number()
      .integer()
      .required(),
    durationZero: yup.number()
      .integer()
      .required(),
    durationSeparator: yup.number()
      .integer()
      .required()
  });

function reverseBits(byte) {
  let b = 0;

  while (byte !== 0){
    b <<= 1;
    b |= (byte & 1);
    byte >>>= 1;
  }

  return b;
}

function build(buffer, opts) {
  const bufferBitCount = buffer.length * 8;
  const messageLength = bufferBitCount * 2 - 1;
  const message = new Array(messageLength);

  buffer.forEach((byte, i) => {
    for (let bit = 0; bit < 8; bit++) {
      const index = i * 16 + bit * 2;

      message[index] = (byte & 1) ? opts.durationOne : opts.durationZero;
      message[index] *= 1e3; // Convert to nanoseconds;

      if (index + 1 < messageLength) {
        message[index + 1] = opts.durationSeparator * 1e3; // Convert to nanoseconds.
      }

      byte >>>= 1;
    }
  });

  return (opts.intro || []).concat(message);
}

function nanoseconds(hrtime) {
  return hrtime[0] * 1e9 + hrtime[1];
}

function bitbang(timing) {
  const l = timing.length;

  let lastTick = nanoseconds(process.hrtime());
  let state = false;
  let dt = 0;
  let i = 0;

  function tick() {
    if (i >= l) {
      gpio.close(outputPin);
      return;
    }

    if (dt >= timing[i]) {
      console.log(dt);
      i++;
      dt = 0;
    }

    const odd = (i & 1) === 1;

    if (odd && state) {
      // Turn off.
      state = false;

      gpio.write(outputPin, 0);
    } else if (!odd && !state) {
      // Turn on.
      state = true;

      gpio.write(outputPin, 1);
    }

    const currentTick = nanoseconds(process.hrtime());

    dt += (currentTick - lastTick);
    lastTick = currentTick;

    process.nextTick(tick);
  }

  gpio.open(outputPin, function(err) {
    if (err) {
      console.error(err);
      return;
    }

    process.nextTick(tick);
  });
}

module.exports = function(buffer, opts) {
  const reversed = buffer.map(reverseBits);

  return optsSchema.validate(opts)
    .then(opts => build(reversed, opts))
    .then(bitbang);
};