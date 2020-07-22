import keys from 'lodash/keys';
import { PhoneNumberFormat, PhoneNumberType } from 'google-libphonenumber';
import { sortedUniq } from '@lykmapipo/common';

// types
export const TYPES = sortedUniq(keys(PhoneNumberType));
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

// formats
export const FORMATS = sortedUniq(keys(PhoneNumberFormat));
export const FORMAT_E164 = 'E164';
export const FORMAT_INTERNATIONAL = 'INTERNATIONAL';
export const FORMAT_NATIONAL = 'NATIONAL';
export const FORMAT_RFC3966 = 'RFC3966';
