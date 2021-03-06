import { expect } from '@lykmapipo/test-helpers';
import { TYPES, FORMATS, parsePhoneNumber, toE164 } from '../src/index';

describe('phone', () => {
  it('should exports phone number types', () => {
    expect(TYPES).to.exist;
    expect(TYPES).to.be.an('array');
    expect(TYPES).to.have.length.at.least(1);
  });

  it('should exports phone number formats', () => {
    expect(FORMATS).to.exist;
    expect(FORMATS).to.be.an('array');
    expect(FORMATS).to.have.length.at.least(1);
    expect(FORMATS).to.have.length.at.least(1);
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

  it('should expose toE164 formatter', () => {
    expect(toE164).to.exist;
    expect(toE164).to.be.a('function');
  });

  it('should use default country code', () => {
    const phoneNumber = toE164('0714969698');
    expect(phoneNumber).to.exist;
    expect(phoneNumber).to.be.eql('255714969698');
  });

  it('should use country code param', () => {
    const phoneNumber = toE164('254714969698', 'KE');
    expect(phoneNumber).to.exist;
    expect(phoneNumber).to.be.eql('254714969698');
  });

  it('should parse phone number', () => {
    const rawPhoneNumber = null;
    const countryCode = 'TZ';
    const phoneNumber = toE164(rawPhoneNumber, countryCode);
    expect(phoneNumber).to.be.equal(rawPhoneNumber);
  });
});
