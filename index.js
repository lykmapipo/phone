'use strict';


/* dependencies */
const _ = require('lodash');
const { uniq } = require('@lykmapipo/common');
const { getStrings, getCountryCode } = require('@lykmapipo/env');
const {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil
} = require('google-libphonenumber');
const phoneNumberUtil = PhoneNumberUtil.getInstance();


/* constants */
const TYPES = _.keys(_.merge({}, PhoneNumberType));
const FORMATS = _.keys(_.merge({}, PhoneNumberFormat));

/* helpers */

/**
 * @name checkValidity
 * @function checkValidity
 * @description derive phone number type validity
 * @param {PhoneNumber} phoneNumber an instance of parsed phone number
 * @return {Object} phone number type validity
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @private
 * @example
 *
 * const validity = checkValidity(number);
 *
 * // result
 * {
 *  isFixedLine: false,
 *  isMobile: true,
 *  isFixedLineOrMobile: false,
 *  isTollFree: false,
 *  isPremiumRate: false,
 *  isSharedCost: false,
 *  isVoip: false,
 *  isPersonalNumber: false,
 *  isPager: false,
 *  isUan: false,
 *  isVoicemail: false,
 *  isUnknown: false,
 *  type: 'MOBILE'
 * }
 *
 */
function checkValidity(phoneNumber) {

  // initialize types validity
  let types = {};

  try {

    // obtain parsed phone number type
    const phoneNumberType =
      phoneNumberUtil.getNumberType(phoneNumber);

    // obtain available phone number types
    const phoneNumberTypes = _.merge({}, PhoneNumberType);

    // check phone number type validity
    _.forEach(phoneNumberTypes, function checkType(typeIndex, typeName) {

      // derive type name and check phone number type
      const _typeName = _.camelCase(`is${typeName}`);
      const _typeIs = (phoneNumberType === typeIndex);

      // set type is flag
      types[_typeName] = _typeIs;

      //set type name string
      if (_typeIs) { types.type = typeName; }

    });

  } catch (error) {
    // handle unknown types
    types = undefined;
  }

  // return types validity
  return types;

}


/**
 * @name format
 * @function format
 * @description format phone number using available phone number formats
 * @param {PhoneNumber} phoneNumber an instance of parsed phone number
 * @return {Object} formated phone number(s)
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @private
 * @example
 *
 * const formats = format(phoneNumber);
 *
 * // result
 * {
 *  e164: '+255715333777',
 *  international: '+255 715 333 777',
 *  national: '0715 333 777',
 *  rfc3966: 'tel:+255-715-333-777'
 * }
 *
 */
function format(phoneNumber) {

  // initialize formats
  let formats = {};

  try {

    //obtain available phone number formats
    const phoneNumberFormats = _.merge({}, PhoneNumberFormat);

    // format phone number
    _.forEach(phoneNumberFormats, function formatNumber(value, key) {
      const format = _.toLower(key);
      const formatValue =
        phoneNumberUtil.format(phoneNumber, phoneNumberFormats[key]);
      formats[format] = formatValue;
    });

  } catch (error) {
    // handle unknown formats
    formats = undefined;
  }

  // return formatted phone number
  return formats;

}


/**
 * @name _parsePhoneNumber
 * @function _parsePhoneNumber
 * @description parse provided phone number to obtain its information
 * @param {String} phoneNumber a valid phone number
 * @param {...String} countryCode a valid country code(s) for validation. If not
 * provided process.env.DEFAULT_COUNTRY_CODE or os country code will be used as
 * as default
 * @return {Object|undefined} phone number type validity
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @private
 * @example
 *
 * const infor = _parsePhoneNumber('+255715333777');
 *
 * // result
 * {
 *  raw: '+255715333777',
 *  countryCode: 'TZ',
 *  callingCode: 255,
 *  extension: '',
 *  isValid: true,
 *  isPossible: true,
 *  isValidForCountryCode: true,
 *  isFixedLine: false,
 *  isMobile: true,
 *  type: 'MOBILE',
 *  isFixedLineOrMobile: false,
 *  isTollFree: false,
 *  isPremiumRate: false,
 *  isSharedCost: false,
 *  isVoip: false,
 *  isPersonalNumber: false,
 *  isPager: false,
 *  isUan: false,
 *  isVoicemail: false,
 *  isUnknown: false,
 *  e164: '+255715333777',
 *  international: '+255 715 333 777',
 *  national: '0715 333 777',
 *  rfc3966: 'tel:+255-715-333-777'
 * }
 *
 */
function _parsePhoneNumber(phoneNumber, ...countryCode) {

  try {
    // ensure raw phone number
    const raw = _.clone(phoneNumber);

    // collect country codes
    let countryCodes = getStrings('DEFAULT_COUNTRY_CODES', getCountryCode());
    countryCodes = uniq([...countryCodes, ...countryCode]);
    countryCodes = uniq(_.map(countryCodes, _.toUpper));

    // test parsing for provided country codes
    const phones = _.map(countryCodes, function _parse(_countryCode) {

      // parse phone number
      const parsed = phoneNumberUtil.parseAndKeepRawInput(raw, _countryCode);

      // prepare parse phone number result
      let phone = {};

      // set raw phone number
      phone.raw = raw;

      // set phone country code
      phone.countryCode =
        (phoneNumberUtil.getRegionCodeForNumber(parsed) || _countryCode);

      // set phone country calling code
      phone.callingCode =
        (parsed.getCountryCode() || parsed.getCountryCodeOrDefault());

      // set phone number extension
      phone.extension =
        (parsed.getExtension() || parsed.getExtensionOrDefault());

      // set phone number valid flag
      phone.isValid = phoneNumberUtil.isValidNumber(parsed);

      // set possible flag
      phone.isPossible = phoneNumberUtil.isPossibleNumber(parsed);

      // set is valid for country(or region) code
      phone.isValidForCountryCode =
        phoneNumberUtil.isValidNumberForRegion(parsed, phone.countryCode);

      // set phone number type flags
      phone = _.merge({}, phone, checkValidity(parsed));

      // format phone number in accepted formats
      phone = _.merge({}, phone, format(parsed));

      // add e164 format with no plus
      if (phone.e164) {
        phone.e164NoPlus = phone.e164.replace(/\+/g, '');
      }

      // return parsed phone number
      return phone;

    });

    // return valid parsed or any
    const phone = _.find(phones, { isValid: true });
    return phone;
  }

  // fail to parse phone number
  catch (error) {
    return undefined;
  }

}


/* exports */


/**
 * @name TYPES
 * @description phone number types
 * @type {Array}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * const { TYPES, TYPE_MOBILE } = phone;
 *
 */
exports.TYPES = [].concat(TYPES);
_.forEach([].concat(TYPES), function exportType(type) {
  exports[_.toUpper(`TYPE_${type}`)] = type;
});


/**
 * @name FORMATS
 * @description phone number formats
 * @type {Array}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * const { FORMATS, FORMAT_E164 } = phone;
 *
 */
exports.FORMATS = [].concat(FORMATS);
_.forEach([].concat(FORMATS), function exportFormat(format) {
  exports[_.toUpper(`FORMAT_${format}`)] = format;
});

/**
 * @name toE164
 * @description format provided mobile phone number to E.164 format
 * @param {String} phoneNumber a mobile phone number to be formatted
 * @param {String} [country] 2 or 3 letter ISO country code
 * @return {String} E.164 formated phone number without leading plus sign
 * @see {@link https://en.wikipedia.org/wiki/E.164|e.164}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
exports.toE164 = function toE164(phoneNumber, countryCode) {
  // try convert give phone number to e.164
  try {
    const parsedNumber = _parsePhoneNumber(phoneNumber, countryCode);
    if (parsedNumber && parsedNumber.e164NoPlus) {
      return parsedNumber.e164NoPlus;
    }
    return phoneNumber;
  }

  // fail to convert, return original format
  catch (error) {
    return phoneNumber;
  }
};


/**
 * @name parsePhoneNumber
 * @function parsePhoneNumber
 * @description parse provided phone number to obtain its information
 * @param {String} phoneNumber a valid phone number
 * @param {String} countryCode a valid country code for validation. If not
 * provided process.env.DEFAULT_COUNTRY_CODE or os country code will be used as
 * as default
 * @return {Object} phone number type validity
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 *
 * const { parsePhoneNumber } = phone;
 * const info = parsePhoneNumber('+255715333777');
 *
 * // result
 * {
 *  raw: '+255715333777',
 *  countryCode: 'TZ',
 *  callingCode: 255,
 *  extension: '',
 *  isValid: true,
 *  isPossible: true,
 *  isValidForCountryCode: true,
 *  isFixedLine: false,
 *  isMobile: true,
 *  type: 'MOBILE',
 *  isFixedLineOrMobile: false,
 *  isTollFree: false,
 *  isPremiumRate: false,
 *  isSharedCost: false,
 *  isVoip: false,
 *  isPersonalNumber: false,
 *  isPager: false,
 *  isUan: false,
 *  isVoicemail: false,
 *  isUnknown: false,
 *  e164: '+255715333777',
 *  international: '+255 715 333 777',
 *  national: '0715 333 777',
 *  rfc3966: 'tel:+255-715-333-777'
 * }
 *
 */
exports = exports.parsePhoneNumber = _parsePhoneNumber;
