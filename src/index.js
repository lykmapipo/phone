import clone from 'lodash/clone';
import camelCase from 'lodash/camelCase';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import merge from 'lodash/merge';
import toUpper from 'lodash/toUpper';
import { uniq } from '@lykmapipo/common';
import { getStringSet, getCountryCode } from '@lykmapipo/env';
import { PhoneNumberType } from 'google-libphonenumber';

import { phoneNumberUtil, parseRawPhoneNumber, format } from './utils';

export * from './utils';

/* helpers */

/**
 * @name checkValidity
 * @function checkValidity
 * @description Derive phone number type validity
 * @param {object} phoneNumber Instance of parsed phone number
 * @returns {object} Validities of a phone number
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @private
 * @example
 *
 * const validity = checkValidity(number);
 *
 * //=> result
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

    // type checker
    const checkType = (typeIndex, typeName) => {
      // derive type name and check phone number type
      const numberTypeName = camelCase(`is${typeName}`);
      const numberTypeIs = phoneNumberType === typeIndex;

      // set type is flag
      types[numberTypeName] = numberTypeIs;

      // set type name string
      if (numberTypeIs) {
        types.type = typeName;
      }
    };

    // check phone number type validity
    forEach(phoneNumberTypes, checkType);
  } catch (error) {
    // handle unknown types
    types = undefined;
  }

  // return types validity
  return types;
};

/**
 * @name parsePhoneNumber
 * @function parsePhoneNumber
 * @description Parse provided phone number to obtain its information
 * @param {string} phoneNumber Valid phone number
 * @param {...string} [countryCode] Valid country code(s) for validation. If
 * not provided `process.env.DEFAULT_COUNTRY_CODE` or `os country code` will
 * be used as a default
 * @returns {object | undefined} Parsed phone number or undefined
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * import { parsePhoneNumber } from '@lykmapipo/phone';
 *
 * const phoneNumber = parsePhoneNumber('+255715333777');
 * const phoneNumber = parsePhoneNumber('+255715333777', 'TZ');
 *
 * //=> result
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
    let countryCodes = getStringSet('DEFAULT_COUNTRY_CODES', getCountryCode());
    countryCodes = uniq([...countryCode, ...countryCodes]);
    countryCodes = uniq(map(countryCodes, toUpper));

    // parse phone number per country code
    const parseByCountryCode = (givenCountryCode) => {
      // parse phone number
      const parsed = parseRawPhoneNumber(raw, givenCountryCode);

      // prepare parse phone number result
      let phone = {};

      // set raw phone number
      phone.raw = raw;

      // set phone country code
      phone.countryCode =
        phoneNumberUtil.getRegionCodeForNumber(parsed) || givenCountryCode;

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
    };

    // test parsing for provided country codes
    const phones = map(countryCodes, parseByCountryCode);

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
 * @name toE164
 * @function toE164
 * @description Format provided mobile phone number to E.164 format
 * @param {string} phoneNumber a mobile phone number to be formatted
 * @param {string} [countryCode] 2 or 3 letter ISO country code
 * @returns {string} E.164 formatted phone number without leading plus sign
 * @see {@link https://en.wikipedia.org/wiki/E.164|e.164}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * import { toE164 } from '@lykmapipo/phone';
 *
 * const phoneNumber = toE164('0715333777');
 * const phoneNumber = toE164('0715333777', 'TZ');
 *
 * //=> result
 * 255715333777
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
