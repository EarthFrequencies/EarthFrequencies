/** speed of light in m/s */
var SPEED_OF_LIGHT = 299792458;

function hzToHuman(value, fixedPlaces) {
	return valueToMagnitude(value, 'Hz', fixedPlaces);
}

/**
 Converts a 'readable form', such that according to the size the appropriate SI magnitude
 prefix is added and then the value adjusted appropriately. Note there is potential
 precision loss, so take this into account when reversing the operation.

 Also, not the supported magnitudes are kilo to yotta. For details on order of magnitiude,
 see: https://en.wikipedia.org/wiki/Order_of_magnitude
 */
function valueToMagnitude(value, unit, fixedPlaces) {
	var idx = 0,
		i, sign;
	var unitExponents = [
		[0, ''],
		[3, 'k'],
		[6, 'M'],
		[9, 'G'],
		[12, 'T'],
		[15, 'P'],
		[18, 'E'],
		[21, 'Y']
	];

	// For high precision or very small numbers you may want
	// to look at https://gist.github.com/ajmas/4193ac6911f5445ced37

	sign = (value < 0 ? -1 : 1);
	value = Math.abs(value);

	for (i = unitExponents.length - 1; i >= 0; i--) {
		if (value >= Math.pow(10, unitExponents[i][0])) {
			idx = i;
			break;
		}
	}
	value = (value / Math.pow(10, unitExponents[idx][0]));

	value = value * sign;

	if (fixedPlaces !== undefined) {
		value = (value * 1.0).toFixed(fixedPlaces);
	}

	return value + ' ' + unitExponents[idx][1] + unit;
}


function valueToSmallMagnitude(value, unit, fixedPlaces) {
	var idx = 0,
		i, sign;
	var unitExponents = [
		[0, ''],
		[-3, 'm'],
		[-6, 'µ'],
		[-9, 'n'],
		[-12, 'p'],
		[-15, 'n'],
		[-18, 'a'],
		[-21, 'z'],
		[-24, 'y']
	];

	// For high precision or very small numbers you may want
	// to look at https://gist.github.com/ajmas/4193ac6911f5445ced37

	sign = (value < 0 ? -1 : 1);
	value = Math.abs(value);

	for (i = unitExponents.length - 1; i >= 0; i--) {
		if (value >= Math.pow(10, unitExponents[i][0])) {
			idx = i;
			break;
		}
	}
	value = (value / Math.pow(10, unitExponents[idx][0]));

	value = value * sign;

	if (fixedPlaces !== undefined) {
		value = (value * 1.0).toFixed(fixedPlaces);
	}

	return value + ' ' + unitExponents[idx][1] + unit;
}

/**
 Converts the frequency in Hz to wavelength in meters
 */
function frequencyToWavelength(frequencyHz) {
    return SPEED_OF_LIGHT / frequencyHz;
}

/**
 Converts the wavelength in meters to frequency in Hz
 */
function wavelengthToFrequency(wavelengthM) {
    return SPEED_OF_LIGHT / wavelengthM;
}



/**
 Formats a number such that the 1000s are separated by the specified separator
 The decimals separator is assumed to be a full-stop (.)
 */
function spacify(num, separator) {
	var str = num.toString().split('.');
	if (str[0].length >= 5) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1' + separator);
	}
	if (str[1] && str[1].length >= 5) {
		str[1] = str[1].replace(/(\d{3})/g, '$1 ');
	}
	return str.join('.');
}
