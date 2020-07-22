import { expect } from '@lykmapipo/test-helpers';
import {
  TYPE_FIXED_LINE,
  TYPE_FIXED_LINE_OR_MOBILE,
  TYPE_MOBILE,
  TYPE_PAGER,
  TYPE_PERSONAL_NUMBER,
  TYPE_PREMIUM_RATE,
  TYPE_SHARED_COST,
  TYPE_TOLL_FREE,
  TYPE_UAN,
  TYPE_UNKNOWN,
  TYPE_VOICEMAIL,
  TYPE_VOIP,
  TYPES,
  FORMAT_E164,
  FORMAT_INTERNATIONAL,
  FORMAT_NATIONAL,
  FORMAT_RFC3966,
  FORMATS,
  phoneNumberUtil,
  parseRawPhoneNumber,
  formatPhoneNumber,
  applyFormats,
  checkTypes,
} from '../src/utils';

describe('phone utils', () => {
  it('should exports phone number types', () => {
    expect(TYPE_FIXED_LINE).to.be.equal('FIXED_LINE');
    expect(TYPE_MOBILE).to.be.equal('MOBILE');
    expect(TYPE_PAGER).to.be.equal('PAGER');
    expect(TYPE_PERSONAL_NUMBER).to.be.equal('PERSONAL_NUMBER');
    expect(TYPE_PREMIUM_RATE).to.be.equal('PREMIUM_RATE');
    expect(TYPE_SHARED_COST).to.be.equal('SHARED_COST');
    expect(TYPE_TOLL_FREE).to.be.equal('TOLL_FREE');
    expect(TYPE_UAN).to.be.equal('UAN');
    expect(TYPE_UNKNOWN).to.be.equal('UNKNOWN');
    expect(TYPE_VOICEMAIL).to.be.equal('VOICEMAIL');
    expect(TYPE_VOIP).to.be.equal('VOIP');
    expect(TYPES).to.exist;
    expect(TYPES).to.be.an('array');
    expect(TYPES).to.have.length.at.least(1);
    expect(TYPES).to.be.eql([
      TYPE_FIXED_LINE,
      TYPE_FIXED_LINE_OR_MOBILE,
      TYPE_MOBILE,
      TYPE_PAGER,
      TYPE_PERSONAL_NUMBER,
      TYPE_PREMIUM_RATE,
      TYPE_SHARED_COST,
      TYPE_TOLL_FREE,
      TYPE_UAN,
      TYPE_UNKNOWN,
      TYPE_VOICEMAIL,
      TYPE_VOIP,
    ]);
  });

  it('should exports phone number formats', () => {
    expect(FORMAT_E164).to.be.equal('E164');
    expect(FORMAT_INTERNATIONAL).to.be.equal('INTERNATIONAL');
    expect(FORMAT_NATIONAL).to.be.equal('NATIONAL');
    expect(FORMAT_RFC3966).to.be.equal('RFC3966');
    expect(FORMATS).to.exist;
    expect(FORMATS).to.be.an('array');
    expect(FORMATS).to.have.length.at.least(1);
    expect(FORMATS).to.be.eql([
      FORMAT_E164,
      FORMAT_INTERNATIONAL,
      FORMAT_NATIONAL,
      FORMAT_RFC3966,
    ]);
  });

  it('should exports phone number util instance', () => {
    expect(phoneNumberUtil).to.exist;
    expect(phoneNumberUtil.parseAndKeepRawInput).to.exist.and.be.a('function');
  });

  it('should parse raw phone number', () => {
    expect(parseRawPhoneNumber).to.exist.and.be.a('function');
    expect(parseRawPhoneNumber('+255715333777')).to.exist;
    expect(parseRawPhoneNumber('+255715333777', 'TZ')).to.exist;
    expect(parseRawPhoneNumber('255715333777', 'TZ')).to.exist;
    expect(parseRawPhoneNumber('0715333777')).to.exist;
    expect(parseRawPhoneNumber('0715333777', 'TZ')).to.exist;
    expect(parseRawPhoneNumber('0715333777', 'TTT')).to.be.undefined;
    expect(parseRawPhoneNumber(null)).to.be.undefined;
    expect(parseRawPhoneNumber(undefined)).to.be.undefined;
    expect(parseRawPhoneNumber('')).to.be.undefined;
    expect(parseRawPhoneNumber(' ')).to.be.undefined;
  });

  it('should format raw phone number', () => {
    expect(formatPhoneNumber).to.exist.and.be.a('function');

    expect(
      formatPhoneNumber(parseRawPhoneNumber('+255715333777'), FORMAT_E164)
    ).to.be.eql({ e164: '+255715333777' });

    expect(
      formatPhoneNumber(parseRawPhoneNumber('+255715333777', 'TZ'), FORMAT_E164)
    ).to.be.eql({ e164: '+255715333777' });

    expect(
      formatPhoneNumber(parseRawPhoneNumber('255715333777', 'TZ'), FORMAT_E164)
    ).to.be.eql({ e164: '+255715333777' });

    expect(
      formatPhoneNumber(parseRawPhoneNumber('0715333777'), FORMAT_E164)
    ).to.be.eql({ e164: '+255715333777' });

    expect(
      formatPhoneNumber(parseRawPhoneNumber('0715333777', 'TZ'), FORMAT_E164)
    ).to.be.eql({ e164: '+255715333777' });

    expect(
      formatPhoneNumber(parseRawPhoneNumber('0715333777', 'TTT'), FORMAT_E164)
    ).to.be.eql({});

    expect(formatPhoneNumber(parseRawPhoneNumber(null), FORMAT_E164)).to.be.eql(
      {}
    );

    expect(
      formatPhoneNumber(parseRawPhoneNumber(undefined), FORMAT_E164)
    ).to.be.eql({});
  });

  it('should format phone number with all available formats', () => {
    expect(applyFormats).to.exist.and.be.a('function');

    expect(applyFormats(parseRawPhoneNumber('+255715333777'))).to.be.eql({
      e164: '+255715333777',
      international: '+255 715 333 777',
      national: '0715 333 777',
      rfc3966: 'tel:+255-715-333-777',
    });
  });

  it('should check phone number types validity', () => {
    expect(checkTypes).to.be.a('function');
    expect(checkTypes(parseRawPhoneNumber('+255715333777'))).to.be.eql({
      isFixedLine: false,
      isFixedLineOrMobile: false,
      isMobile: true,
      isPager: false,
      isPersonalNumber: false,
      isPremiumRate: false,
      isSharedCost: false,
      isTollFree: false,
      isUan: false,
      isUnknown: false,
      isVoicemail: false,
      isVoip: false,
      type: 'MOBILE',
    });
  });
});
