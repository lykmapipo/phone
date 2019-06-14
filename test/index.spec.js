'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('@lykmapipo/test-helpers');


/* .env */
process.env.DEFAULT_COUNTRY_CODE = 'TZ';
process.env.DEFAULT_COUNTRY_CODES = 'TZ,US';


/* import */
const phone = require(path.join(__dirname, '..'));
const { TYPES, FORMATS, parsePhoneNumber } = phone;


describe('phone', () => {

  it('should exports phone number types', () => {
    expect(TYPES).to.exist;
    expect(TYPES).to.be.an('array');
    expect(TYPES).to.have.length.at.least(1);
    _.forEach([].concat(TYPES), (type) => {
      expect(phone[`TYPE_${type}`]).to.exist;
      expect(phone[`TYPE_${type}`]).to.be.a('string');
    });
  });

  it('should exports phone number formats', () => {
    expect(FORMATS).to.exist;
    expect(FORMATS).to.be.an('array');
    expect(FORMATS).to.have.length.at.least(1);
    expect(FORMATS).to.have.length.at.least(1);
    _.forEach([].concat(FORMATS), (format) => {
      expect(phone[`FORMAT_${format}`]).to.exist;
      expect(phone[`FORMAT_${format}`]).to.be.a('string');
    });
  });

  it('should parse phone number', () => {
    const rawPhoneNumber = '+255715333777';
    const countryCode = 'TZ';
    const phoneNumber = parsePhoneNumber(rawPhoneNumber, countryCode);
    expect(phoneNumber).to.exist;
    expect(phoneNumber.raw).to.exist;
    expect(phoneNumber.countryCode).to.exist;
    expect(phoneNumber.callingCode).to.exist;
    expect(phoneNumber.extension).to.exist;
    expect(phoneNumber.isValid).to.exist;
    expect(phoneNumber.isPossible).to.exist;
    expect(phoneNumber.isValidForCountryCode).to.exist;
    expect(phoneNumber.isFixedLine).to.exist;
    expect(phoneNumber.isMobile).to.exist;
    expect(phoneNumber.type).to.exist;
    expect(phoneNumber.isFixedLineOrMobile).to.exist;
    expect(phoneNumber.isTollFree).to.exist;
    expect(phoneNumber.isPremiumRate).to.exist;
    expect(phoneNumber.isSharedCost).to.exist;
    expect(phoneNumber.isVoip).to.exist;
    expect(phoneNumber.isPersonalNumber).to.exist;
    expect(phoneNumber.isPager).to.exist;
    expect(phoneNumber.isUan).to.exist;
    expect(phoneNumber.isVoicemail).to.exist;
    expect(phoneNumber.isUnknown).to.exist;
    expect(phoneNumber.e164).to.exist;
    expect(phoneNumber.international).to.exist;
    expect(phoneNumber.national).to.exist;
    expect(phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const rawPhoneNumber = '+255715333777';
    const phoneNumber = parsePhoneNumber(rawPhoneNumber);
    expect(phoneNumber).to.exist;
    expect(phoneNumber.raw).to.exist;
    expect(phoneNumber.countryCode).to.exist;
    expect(phoneNumber.callingCode).to.exist;
    expect(phoneNumber.extension).to.exist;
    expect(phoneNumber.isValid).to.exist;
    expect(phoneNumber.isPossible).to.exist;
    expect(phoneNumber.isValidForCountryCode).to.exist;
    expect(phoneNumber.isFixedLine).to.exist;
    expect(phoneNumber.isMobile).to.exist;
    expect(phoneNumber.type).to.exist;
    expect(phoneNumber.isFixedLineOrMobile).to.exist;
    expect(phoneNumber.isTollFree).to.exist;
    expect(phoneNumber.isPremiumRate).to.exist;
    expect(phoneNumber.isSharedCost).to.exist;
    expect(phoneNumber.isVoip).to.exist;
    expect(phoneNumber.isPersonalNumber).to.exist;
    expect(phoneNumber.isPager).to.exist;
    expect(phoneNumber.isUan).to.exist;
    expect(phoneNumber.isVoicemail).to.exist;
    expect(phoneNumber.isUnknown).to.exist;
    expect(phoneNumber.e164).to.exist;
    expect(phoneNumber.international).to.exist;
    expect(phoneNumber.national).to.exist;
    expect(phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const rawPhoneNumber = '0715333777';
    const countryCode = 'TZ';
    const phoneNumber = parsePhoneNumber(rawPhoneNumber, countryCode);
    expect(phoneNumber).to.exist;
    expect(phoneNumber.raw).to.exist;
    expect(phoneNumber.countryCode).to.exist;
    expect(phoneNumber.callingCode).to.exist;
    expect(phoneNumber.extension).to.exist;
    expect(phoneNumber.isValid).to.exist;
    expect(phoneNumber.isPossible).to.exist;
    expect(phoneNumber.isValidForCountryCode).to.exist;
    expect(phoneNumber.isFixedLine).to.exist;
    expect(phoneNumber.isMobile).to.exist;
    expect(phoneNumber.type).to.exist;
    expect(phoneNumber.isFixedLineOrMobile).to.exist;
    expect(phoneNumber.isTollFree).to.exist;
    expect(phoneNumber.isPremiumRate).to.exist;
    expect(phoneNumber.isSharedCost).to.exist;
    expect(phoneNumber.isVoip).to.exist;
    expect(phoneNumber.isPersonalNumber).to.exist;
    expect(phoneNumber.isPager).to.exist;
    expect(phoneNumber.isUan).to.exist;
    expect(phoneNumber.isVoicemail).to.exist;
    expect(phoneNumber.isUnknown).to.exist;
    expect(phoneNumber.e164).to.exist;
    expect(phoneNumber.international).to.exist;
    expect(phoneNumber.national).to.exist;
    expect(phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const rawPhoneNumber = '0715333777';
    const phoneNumber = parsePhoneNumber(rawPhoneNumber);
    expect(phoneNumber).to.exist;
    expect(phoneNumber.raw).to.exist;
    expect(phoneNumber.countryCode).to.exist;
    expect(phoneNumber.callingCode).to.exist;
    expect(phoneNumber.extension).to.exist;
    expect(phoneNumber.isValid).to.exist;
    expect(phoneNumber.isPossible).to.exist;
    expect(phoneNumber.isValidForCountryCode).to.exist;
    expect(phoneNumber.isFixedLine).to.exist;
    expect(phoneNumber.isMobile).to.exist;
    expect(phoneNumber.type).to.exist;
    expect(phoneNumber.isFixedLineOrMobile).to.exist;
    expect(phoneNumber.isTollFree).to.exist;
    expect(phoneNumber.isPremiumRate).to.exist;
    expect(phoneNumber.isSharedCost).to.exist;
    expect(phoneNumber.isVoip).to.exist;
    expect(phoneNumber.isPersonalNumber).to.exist;
    expect(phoneNumber.isPager).to.exist;
    expect(phoneNumber.isUan).to.exist;
    expect(phoneNumber.isVoicemail).to.exist;
    expect(phoneNumber.isUnknown).to.exist;
    expect(phoneNumber.e164).to.exist;
    expect(phoneNumber.international).to.exist;
    expect(phoneNumber.national).to.exist;
    expect(phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const rawPhoneNumber = '0715333777';
    const phoneNumber = parsePhoneNumber(rawPhoneNumber, 'US', 'TZ');
    expect(phoneNumber).to.exist;
    expect(phoneNumber.raw).to.exist;
    expect(phoneNumber.countryCode).to.exist;
    expect(phoneNumber.callingCode).to.exist;
    expect(phoneNumber.extension).to.exist;
    expect(phoneNumber.isValid).to.exist;
    expect(phoneNumber.isPossible).to.exist;
    expect(phoneNumber.isValidForCountryCode).to.exist;
    expect(phoneNumber.isFixedLine).to.exist;
    expect(phoneNumber.isMobile).to.exist;
    expect(phoneNumber.type).to.exist;
    expect(phoneNumber.isFixedLineOrMobile).to.exist;
    expect(phoneNumber.isTollFree).to.exist;
    expect(phoneNumber.isPremiumRate).to.exist;
    expect(phoneNumber.isSharedCost).to.exist;
    expect(phoneNumber.isVoip).to.exist;
    expect(phoneNumber.isPersonalNumber).to.exist;
    expect(phoneNumber.isPager).to.exist;
    expect(phoneNumber.isUan).to.exist;
    expect(phoneNumber.isVoicemail).to.exist;
    expect(phoneNumber.isUnknown).to.exist;
    expect(phoneNumber.e164).to.exist;
    expect(phoneNumber.international).to.exist;
    expect(phoneNumber.national).to.exist;
    expect(phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const rawPhoneNumber = '255715333777';
    const countryCode = 'TZ';
    const phoneNumber = parsePhoneNumber(rawPhoneNumber, countryCode);
    expect(phoneNumber).to.exist;
    expect(phoneNumber.raw).to.exist;
    expect(phoneNumber.countryCode).to.exist;
    expect(phoneNumber.callingCode).to.exist;
    expect(phoneNumber.extension).to.exist;
    expect(phoneNumber.isValid).to.exist;
    expect(phoneNumber.isPossible).to.exist;
    expect(phoneNumber.isValidForCountryCode).to.exist;
    expect(phoneNumber.isFixedLine).to.exist;
    expect(phoneNumber.isMobile).to.exist;
    expect(phoneNumber.type).to.exist;
    expect(phoneNumber.isFixedLineOrMobile).to.exist;
    expect(phoneNumber.isTollFree).to.exist;
    expect(phoneNumber.isPremiumRate).to.exist;
    expect(phoneNumber.isSharedCost).to.exist;
    expect(phoneNumber.isVoip).to.exist;
    expect(phoneNumber.isPersonalNumber).to.exist;
    expect(phoneNumber.isPager).to.exist;
    expect(phoneNumber.isUan).to.exist;
    expect(phoneNumber.isVoicemail).to.exist;
    expect(phoneNumber.isUnknown).to.exist;
    expect(phoneNumber.e164).to.exist;
    expect(phoneNumber.international).to.exist;
    expect(phoneNumber.national).to.exist;
    expect(phoneNumber.rfc3966).to.exist;
  });


});
