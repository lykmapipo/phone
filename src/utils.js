import clone from 'lodash/clone';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import toLower from 'lodash/toLower';
import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil,
} from 'google-libphonenumber';
import { mergeObjects, tryCatch, sortedUniq } from '@lykmapipo/common';
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
 * phoneNumberUtil.parseAndKeepRawInput('0715333777', 'TZ');
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

/**
 * @name formatPhoneNumber
 * @function formatPhoneNumber
 * @description Format phone number use given format
 * @param {object} phoneNumber Valid instance of parsed phone number
 * @param {string} [format] Valid phone number format
 * @returns {object} Formatted phone number
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * import { formatPhoneNumber, FORMAT_E164 } from '@lykmapipo/phone';
 *
 * const phoneNumber = parseRawPhoneNumber('0715333777', 'TZ');
 * formatPhoneNumber(phoneNumber, FORMAT_E164);
 *
 * //=> result
 * {
 *   e164: '+255715333777'
 * }
 *
 */
export const formatPhoneNumber = (phoneNumber, format) => {
  try {
    // try format parsed phone number
    const phoneNumberFormat = toLower(format);
    const formattedPhoneNumber = phoneNumberUtil.format(
      phoneNumber,
      PhoneNumberFormat[format]
    );
    return { [phoneNumberFormat]: formattedPhoneNumber };
  } catch (e) {
    // fail to format phone number
    return {};
  }
};

/**
 * @name format
 * @function format
 * @description Format phone number using available phone number formats
 * @param {object} phoneNumber Instance of parsed phone number
 * @returns {object} Formatted phone number(s)
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.2.0
 * @private
 * @example
 *
 * import { format } from '@lykmapipo/phone';
 *
 * const phoneNumber = parseRawPhoneNumber('0715333777', 'TZ');
 * format(phoneNumber);
 *
 * //=> result
 * {
 *  e164: '+255715333777',
 *  international: '+255 715 333 777',
 *  national: '0715 333 777',
 *  rfc3966: 'tel:+255-715-333-777'
 * }
 *
 */
export const format = (phoneNumber) => {
  // initialize formats
  let formats = {};

  // format phone number per each available format
  forEach(FORMATS, (phoneNumberFormat) => {
    const formattedPhoneNumber = formatPhoneNumber(
      phoneNumber,
      phoneNumberFormat
    );
    formats = mergeObjects(formats, formattedPhoneNumber);
  });

  // return formatted phone number
  return formats;
};

/**
 * @name checkValidity
 * @function checkValidity
 * @description Derive phone number type validity
 * @param {object} phoneNumber Instance of parsed phone number
 * @returns {object} Validities of a phone number
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.5.0
 * @version 0.1.0
 * @private
 * @example
 *
 * import { checkValidity } from '@lykmapipo/phone';
 *
 * const phoneNumber = parseRawPhoneNumber('0715333777', 'TZ');
 * checkValidity(phoneNumber);
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
export const checkValidity = (phoneNumber) => {
  // initialize types validity
  const types = {};

  // obtain parsed phone number type
  const phoneNumberType = tryCatch(
    () => phoneNumberUtil.getNumberType(phoneNumber),
    -1
  );

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
  forEach(PhoneNumberType, checkType);

  // return types validity
  return types;
};
