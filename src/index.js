import {
  clone,
  camelCase,
  find,
  forEach,
  keys,
  map,
  merge,
  toLower,
  toUpper,
} from 'lodash';
import { uniq } from '@lykmapipo/common';
import { getStrings, getCountryCode } from '@lykmapipo/env';
import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil,
} from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

/* constants */
const PHONE_NUMBER_TYPES = keys(merge({}, PhoneNumberType));
const PHONE_NUMBER_FORMATS = keys(merge({}, PhoneNumberFormat));

/* helpers */

/**
 * @name checkValidity
 * @function checkValidity
 * @description derive phone number type validity
 * @param {object} phoneNumber an instance of parsed phone number
 * @returns {object} phone number type validity
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
const checkValidity = (phoneNumber) => {
  // initialize types validity
  let types = {};

  try {
    // obtain parsed phone number type
    const phoneNumberType = phoneNumberUtil.getNumberType(phoneNumber);

    // obtain available phone number types
    const phoneNumberTypes = merge({}, PhoneNumberType);

    // check phone number type validity
    forEach(phoneNumberTypes, function checkType(typeIndex, typeName) {
      // derive type name and check phone number type
      const numberTypeName = camelCase(`is${typeName}`);
      const numberTypeIs = phoneNumberType === typeIndex;

      // set type is flag
      types[numberTypeName] = numberTypeIs;

      // set type name string
      if (numberTypeIs) {
        types.type = typeName;
      }
    });
  } catch (error) {
    // handle unknown types
    types = undefined;
  }

  // return types validity
  return types;
};

/**
 * @name format
 * @function format
 * @description format phone number using available phone number formats
 * @param {object} phoneNumber an instance of parsed phone number
 * @returns {object} formated phone number(s)
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
const format = (phoneNumber) => {
  // initialize formats
  let formats = {};

  try {
    // obtain available phone number formats
    const phoneNumberFormats = merge({}, PhoneNumberFormat);

    // format phone number
    forEach(phoneNumberFormats, function formatNumber(value, key) {
      const numberFormat = toLower(key);
      const formatValue = phoneNumberUtil.format(
        phoneNumber,
        phoneNumberFormats[key]
      );
      formats[numberFormat] = formatValue;
    });
  } catch (error) {
    // handle unknown formats
    formats = undefined;
  }

  // return formatted phone number
  return formats;
};

/**
 * @name parsePhoneNumber
 * @function parsePhoneNumber
 * @description parse provided phone number to obtain its information
 * @param {string} phoneNumber a valid phone number
 * @param {...string} countryCode a valid country code(s) for validation. If not
 * provided process.env.DEFAULT_COUNTRY_CODE or os country code will be used as
 * as default
 * @returns {object | undefined} phone number type validity
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @private
 * @example
 *
 * const infor = parsePhoneNumber('+255715333777');
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
export const parsePhoneNumber = (phoneNumber, ...countryCode) => {
  try {
    // ensure raw phone number
    const raw = clone(phoneNumber);

    // collect country codes
    let countryCodes = getStrings('DEFAULT_COUNTRY_CODES', getCountryCode());
    countryCodes = uniq([...countryCode, ...countryCodes]);
    countryCodes = uniq(map(countryCodes, toUpper));

    // test parsing for provided country codes
    const phones = map(countryCodes, function _parse(_countryCode) {
      // parse phone number
      const parsed = phoneNumberUtil.parseAndKeepRawInput(raw, _countryCode);

      // prepare parse phone number result
      let phone = {};

      // set raw phone number
      phone.raw = raw;

      // set phone country code
      phone.countryCode =
        phoneNumberUtil.getRegionCodeForNumber(parsed) || _countryCode;

      // set phone country calling code
      phone.callingCode =
        parsed.getCountryCode() || parsed.getCountryCodeOrDefault();

      // set phone number extension
      phone.extension = parsed.getExtension() || parsed.getExtensionOrDefault();

      // set phone number valid flag
      phone.isValid = phoneNumberUtil.isValidNumber(parsed);

      // set possible flag
      phone.isPossible = phoneNumberUtil.isPossibleNumber(parsed);

      // set is valid for country(or region) code
      phone.isValidForCountryCode = phoneNumberUtil.isValidNumberForRegion(
        parsed,
        phone.countryCode
      );

      // set phone number type flags
      phone = merge({}, phone, checkValidity(parsed));

      // format phone number in accepted formats
      phone = merge({}, phone, format(parsed));

      // add e164 format with no plus
      if (phone.e164) {
        phone.e164NoPlus = phone.e164.replace(/\+/g, '');
      }

      // return parsed phone number
      return phone;
    });

    // return valid parsed or any
    const phone = find(phones, { isValid: true });
    return phone;
  } catch (error) {
    // fail to parse phone number
    return undefined;
  }
};

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
export const TYPES = [].concat(PHONE_NUMBER_TYPES);

// TODO: re-exports on default
forEach([].concat(PHONE_NUMBER_TYPES), (phoneNumberType) => {
  parsePhoneNumber[toUpper(`TYPE_${phoneNumberType}`)] = phoneNumberType;
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
export const FORMATS = [].concat(PHONE_NUMBER_FORMATS);

// TODO: re-export on default
forEach([].concat(PHONE_NUMBER_FORMATS), (phoneNumberFormat) => {
  parsePhoneNumber[toUpper(`FORMAT_${phoneNumberFormat}`)] = phoneNumberFormat;
});

/**
 * @name toE164
 * @description format provided mobile phone number to E.164 format
 * @param {string} phoneNumber a mobile phone number to be formatted
 * @param {string} [countryCode] 2 or 3 letter ISO country code
 * @returns {string} E.164 formated phone number without leading plus sign
 * @see {@link https://en.wikipedia.org/wiki/E.164|e.164}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
export const toE164 = (phoneNumber, countryCode) => {
  // try convert give phone number to e.164
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
    if (parsedNumber && parsedNumber.e164NoPlus) {
      return parsedNumber.e164NoPlus;
    }
    return phoneNumber;
  } catch (error) {
    // fail to convert, return original format
    return phoneNumber;
  }
};

/**
 * @name parsePhoneNumber
 * @function parsePhoneNumber
 * @description parse provided phone number to obtain its information
 * @param {string} phoneNumber a valid phone number
 * @param {string} countryCode a valid country code for validation. If not
 * provided process.env.DEFAULT_COUNTRY_CODE or os country code will be used as
 * as default
 * @returns {object} phone number type validity
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
// exports = exports.parsePhoneNumber = parsePhoneNumber;
export default parsePhoneNumber;
