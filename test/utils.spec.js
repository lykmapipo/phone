import { expect } from '@lykmapipo/test-helpers';
import { FORMAT_E164 } from '../src/constants';
import {
  phoneNumberUtil,
  parseRawPhoneNumber,
  formatPhoneNumber,
  applyFormats,
  checkTypes,
} from '../src/utils';

describe('phone utils', () => {
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
