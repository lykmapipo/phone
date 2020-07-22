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
});
