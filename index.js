'use strict';


/* dependencies */
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const { sync: getLocale } = require('os-locale');
const {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil
} = require('google-libphonenumber');
const phoneNumberUtil = PhoneNumberUtil.getInstance();


/* constants */
const TYPES = _.keys(_.merge({}, PhoneNumberType));
const FORMATS = _.keys(_.merge({}, PhoneNumberFormat));
const OS_LOCALE = (getLocale() || getLocale({ spawn: false }));
const OS_COUNTRY_CODE = _.toUpper(_.last(_.split(OS_LOCALE, '_')));


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
    _.forEach(phoneNumberTypes, function (typeIndex, typeName) {

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
    _.forEach(phoneNumberFormats, function (value, key) {
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
 * @param {String} countryCode a valid country code for validation. If not
 * provided process.env.DEFAULT_COUNTRY_CODE or os country code will be used as
 * as default
 * @return {Object} phone number type validity
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
function _parsePhoneNumber(phoneNumber, countryCode) {

  // ensure raw phone number
  const _rawPhoneNumber = _.clone(phoneNumber);

  // ensure country(or region) code
  let _countryCode = getString('DEFAULT_COUNTRY_CODE', OS_COUNTRY_CODE);
  _countryCode = (countryCode || _countryCode);

  // parse phone number
  const _parsedPhoneNumber =
    phoneNumberUtil.parseAndKeepRawInput(_rawPhoneNumber, _countryCode);

  // prepare parse result
  let _phoneNumber = {};

  // set raw phone number
  _phoneNumber.raw = _rawPhoneNumber;

  // set country code
  _phoneNumber.countryCode = (
    phoneNumberUtil.getRegionCodeForNumber(_parsedPhoneNumber) ||
    _countryCode
  );

  // set calling code
  _phoneNumber.callingCode = (
    _parsedPhoneNumber.getCountryCode() ||
    _parsedPhoneNumber.getCountryCodeOrDefault()
  );

  // set phone number extension
  _phoneNumber.extension = (
    _parsedPhoneNumber.getExtension() ||
    _parsedPhoneNumber.getExtensionOrDefault()
  );

  // set valid flag
  _phoneNumber.isValid = phoneNumberUtil.isValidNumber(_parsedPhoneNumber);

  // set possible flag
  _phoneNumber.isPossible = phoneNumberUtil.isPossibleNumber(_parsedPhoneNumber);

  // set is valid for country(or region) code
  _phoneNumber.isValidForCountryCode =
    phoneNumberUtil.isValidNumberForRegion(_parsedPhoneNumber, _phoneNumber.countryCode);


  // set phone number type flags
  _phoneNumber = _.merge({}, _phoneNumber, checkValidity(_parsedPhoneNumber));

  // format phone number in accepted formats
  _phoneNumber = _.merge({}, _phoneNumber, format(_parsedPhoneNumber));

  // return parsed phone number
  return _phoneNumber;

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
exports = exports.parsePhoneNumber =
  function parsePhoneNumber(phoneNumber, countryCode) {
    const phoneInfo = _parsePhoneNumber(phoneNumber, countryCode);
    return phoneInfo;
  };
