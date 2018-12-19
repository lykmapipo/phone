'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');


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
    const phoneNumber = '+255715333777';
    const countryCode = 'TZ';
    const _phoneNumber = parsePhoneNumber(phoneNumber, countryCode);
    expect(_phoneNumber).to.exist;
    expect(_phoneNumber.raw).to.exist;
    expect(_phoneNumber.countryCode).to.exist;
    expect(_phoneNumber.callingCode).to.exist;
    expect(_phoneNumber.extension).to.exist;
    expect(_phoneNumber.isValid).to.exist;
    expect(_phoneNumber.isPossible).to.exist;
    expect(_phoneNumber.isValidForCountryCode).to.exist;
    expect(_phoneNumber.isValidFor).to.exist;
    expect(_phoneNumber.isFixedLine).to.exist;
    expect(_phoneNumber.isMobile).to.exist;
    expect(_phoneNumber.type).to.exist;
    expect(_phoneNumber.isFixedLineOrMobile).to.exist;
    expect(_phoneNumber.isTollFree).to.exist;
    expect(_phoneNumber.isPremiumRate).to.exist;
    expect(_phoneNumber.isSharedCost).to.exist;
    expect(_phoneNumber.isVoip).to.exist;
    expect(_phoneNumber.isPersonalNumber).to.exist;
    expect(_phoneNumber.isPager).to.exist;
    expect(_phoneNumber.isUan).to.exist;
    expect(_phoneNumber.isVoicemail).to.exist;
    expect(_phoneNumber.isUnknown).to.exist;
    expect(_phoneNumber.e164).to.exist;
    expect(_phoneNumber.international).to.exist;
    expect(_phoneNumber.national).to.exist;
    expect(_phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const phoneNumber = '+255715333777';
    const _phoneNumber = parsePhoneNumber(phoneNumber);
    expect(_phoneNumber).to.exist;
    expect(_phoneNumber.raw).to.exist;
    expect(_phoneNumber.countryCode).to.exist;
    expect(_phoneNumber.callingCode).to.exist;
    expect(_phoneNumber.extension).to.exist;
    expect(_phoneNumber.isValid).to.exist;
    expect(_phoneNumber.isPossible).to.exist;
    expect(_phoneNumber.isValidForCountryCode).to.exist;
    expect(_phoneNumber.isValidFor).to.exist;
    expect(_phoneNumber.isFixedLine).to.exist;
    expect(_phoneNumber.isMobile).to.exist;
    expect(_phoneNumber.type).to.exist;
    expect(_phoneNumber.isFixedLineOrMobile).to.exist;
    expect(_phoneNumber.isTollFree).to.exist;
    expect(_phoneNumber.isPremiumRate).to.exist;
    expect(_phoneNumber.isSharedCost).to.exist;
    expect(_phoneNumber.isVoip).to.exist;
    expect(_phoneNumber.isPersonalNumber).to.exist;
    expect(_phoneNumber.isPager).to.exist;
    expect(_phoneNumber.isUan).to.exist;
    expect(_phoneNumber.isVoicemail).to.exist;
    expect(_phoneNumber.isUnknown).to.exist;
    expect(_phoneNumber.e164).to.exist;
    expect(_phoneNumber.international).to.exist;
    expect(_phoneNumber.national).to.exist;
    expect(_phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const phoneNumber = '0715333777';
    const countryCode = 'TZ';
    const _phoneNumber = parsePhoneNumber(phoneNumber, countryCode);
    expect(_phoneNumber).to.exist;
    expect(_phoneNumber.raw).to.exist;
    expect(_phoneNumber.countryCode).to.exist;
    expect(_phoneNumber.callingCode).to.exist;
    expect(_phoneNumber.extension).to.exist;
    expect(_phoneNumber.isValid).to.exist;
    expect(_phoneNumber.isPossible).to.exist;
    expect(_phoneNumber.isValidForCountryCode).to.exist;
    expect(_phoneNumber.isValidFor).to.exist;
    expect(_phoneNumber.isFixedLine).to.exist;
    expect(_phoneNumber.isMobile).to.exist;
    expect(_phoneNumber.type).to.exist;
    expect(_phoneNumber.isFixedLineOrMobile).to.exist;
    expect(_phoneNumber.isTollFree).to.exist;
    expect(_phoneNumber.isPremiumRate).to.exist;
    expect(_phoneNumber.isSharedCost).to.exist;
    expect(_phoneNumber.isVoip).to.exist;
    expect(_phoneNumber.isPersonalNumber).to.exist;
    expect(_phoneNumber.isPager).to.exist;
    expect(_phoneNumber.isUan).to.exist;
    expect(_phoneNumber.isVoicemail).to.exist;
    expect(_phoneNumber.isUnknown).to.exist;
    expect(_phoneNumber.e164).to.exist;
    expect(_phoneNumber.international).to.exist;
    expect(_phoneNumber.national).to.exist;
    expect(_phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const phoneNumber = '0715333777';
    const _phoneNumber = parsePhoneNumber(phoneNumber);
    expect(_phoneNumber).to.exist;
    expect(_phoneNumber.raw).to.exist;
    expect(_phoneNumber.countryCode).to.exist;
    expect(_phoneNumber.callingCode).to.exist;
    expect(_phoneNumber.extension).to.exist;
    expect(_phoneNumber.isValid).to.exist;
    expect(_phoneNumber.isPossible).to.exist;
    expect(_phoneNumber.isValidForCountryCode).to.exist;
    expect(_phoneNumber.isValidFor).to.exist;
    expect(_phoneNumber.isFixedLine).to.exist;
    expect(_phoneNumber.isMobile).to.exist;
    expect(_phoneNumber.type).to.exist;
    expect(_phoneNumber.isFixedLineOrMobile).to.exist;
    expect(_phoneNumber.isTollFree).to.exist;
    expect(_phoneNumber.isPremiumRate).to.exist;
    expect(_phoneNumber.isSharedCost).to.exist;
    expect(_phoneNumber.isVoip).to.exist;
    expect(_phoneNumber.isPersonalNumber).to.exist;
    expect(_phoneNumber.isPager).to.exist;
    expect(_phoneNumber.isUan).to.exist;
    expect(_phoneNumber.isVoicemail).to.exist;
    expect(_phoneNumber.isUnknown).to.exist;
    expect(_phoneNumber.e164).to.exist;
    expect(_phoneNumber.international).to.exist;
    expect(_phoneNumber.national).to.exist;
    expect(_phoneNumber.rfc3966).to.exist;
  });

  it('should parse phone number', () => {
    const phoneNumber = '0715333777';
    const _phoneNumber = parsePhoneNumber(phoneNumber, 'US', 'TZ', 'UK');
    expect(_phoneNumber).to.exist;
    expect(_phoneNumber.raw).to.exist;
    expect(_phoneNumber.countryCode).to.exist;
    expect(_phoneNumber.callingCode).to.exist;
    expect(_phoneNumber.extension).to.exist;
    expect(_phoneNumber.isValid).to.exist;
    expect(_phoneNumber.isPossible).to.exist;
    expect(_phoneNumber.isValidForCountryCode).to.exist;
    expect(_phoneNumber.isValidFor).to.exist;
    expect(_phoneNumber.isFixedLine).to.exist;
    expect(_phoneNumber.isMobile).to.exist;
    expect(_phoneNumber.type).to.exist;
    expect(_phoneNumber.isFixedLineOrMobile).to.exist;
    expect(_phoneNumber.isTollFree).to.exist;
    expect(_phoneNumber.isPremiumRate).to.exist;
    expect(_phoneNumber.isSharedCost).to.exist;
    expect(_phoneNumber.isVoip).to.exist;
    expect(_phoneNumber.isPersonalNumber).to.exist;
    expect(_phoneNumber.isPager).to.exist;
    expect(_phoneNumber.isUan).to.exist;
    expect(_phoneNumber.isVoicemail).to.exist;
    expect(_phoneNumber.isUnknown).to.exist;
    expect(_phoneNumber.e164).to.exist;
    expect(_phoneNumber.international).to.exist;
    expect(_phoneNumber.national).to.exist;
    expect(_phoneNumber.rfc3966).to.exist;
  });

});
