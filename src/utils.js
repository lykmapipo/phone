import clone from 'lodash/clone';
import keys from 'lodash/keys';
import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil,
} from 'google-libphonenumber';
import { sortedUniq } from '@lykmapipo/common';
import { getCountryCode } from '@lykmapipo/env';

/**
 * @constant
 * @name TYPES
 * @description Allowed phone number types
 * @type {Array}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { TYPES, TYPE_MOBILE } from '@lykmapipo/phone';
 *
 * TYPES //=> [ 'MOBILE', ... ];
 * TYPE_MOBILE //=> 'MOBILE';
 */
export const TYPES = sortedUniq(keys(PhoneNumberType));

// types
export const TYPE_FIXED_LINE = 'FIXED_LINE';
export const TYPE_FIXED_LINE_OR_MOBILE = 'FIXED_LINE_OR_MOBILE';
export const TYPE_MOBILE = 'MOBILE';
export const TYPE_PAGER = 'PAGER';
export const TYPE_PERSONAL_NUMBER = 'PERSONAL_NUMBER';
export const TYPE_PREMIUM_RATE = 'PREMIUM_RATE';
export const TYPE_SHARED_COST = 'SHARED_COST';
export const TYPE_TOLL_FREE = 'TOLL_FREE';
export const TYPE_UAN = 'UAN';
export const TYPE_UNKNOWN = 'UNKNOWN';
export const TYPE_VOICEMAIL = 'VOICEMAIL';
export const TYPE_VOIP = 'VOIP';

/**
 * @constant
 * @name FORMATS
 * @description Allowed phone number formats
 * @type {Array}
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * import { FORMATS, FORMAT_E164 } from '@lykmapipo/phone';
 *
 * FORMATS //=> [ 'E164', ... ];
 * FORMAT_E164 //=> 'E164';
 */
export const FORMATS = sortedUniq(keys(PhoneNumberFormat));

// formats
export const FORMAT_E164 = 'E164';
export const FORMAT_INTERNATIONAL = 'INTERNATIONAL';
export const FORMAT_NATIONAL = 'NATIONAL';
export const FORMAT_RFC3966 = 'RFC3966';

/**
 * @name phoneNumberUtil
 * @function phoneNumberUtil
 * @description Internal instance of `PhoneNumberUtil`
 * @returns {object} Validity of `PhoneNumberUtil`
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * import { phoneNumberUtil } from '@lykmapipo/phone';
 *
 * phoneNumberUtil(number);
 *
 */
export const phoneNumberUtil = PhoneNumberUtil.getInstance();

/**
 * @name parseRawPhoneNumber
 * @function parseRawPhoneNumber
 * @description Attempt to parse given phone number
 * @param {string} phoneNumber Number that we are attempting to parse
 * @param {string} [countryCode] 2 or 3 letter ISO country code. Default to
 * `process.env.DEFAULT_COUNTRY_CODE` or `os country code`.
 * @returns {object} Validity of `PhoneNumberUtil`
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * import { parseRawPhoneNumber } from '@lykmapipo/phone';
 *
 * parseRawPhoneNumber('+255715333777');
 * parseRawPhoneNumber('0715333777', 'TZ');
 *
 */
export const parseRawPhoneNumber = (
  phoneNumber,
  countryCode = getCountryCode()
) => {
  try {
    // try parse phone number
    const rawPhoneNumber = clone(phoneNumber);
    const rawCountryCode = clone(countryCode);
    const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(
      rawPhoneNumber,
      rawCountryCode
    );
    return parsedPhoneNumber;
  } catch (e) {
    // fail to parse phone number
    return undefined;
  }
};
