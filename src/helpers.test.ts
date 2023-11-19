
import { PublicHoliday } from './types';
import { shortenPublicHoliday, validateInput } from './helpers';

describe('Tests for validateInput func:', () => {
  it('should throw error if country is not supported', () => {
    expect(() => validateInput({ country: 'BY' })).toThrowError(new Error('Country provided is not supported, received: BY'));
  });

  it('should throw error if year is not the current year', () => {
    expect(() => validateInput({ year: 1999 })).toThrowError(new Error('Year provided not the current, received: 1999'));
  });

  it('should return true if country is supported', () => {
    expect(validateInput({ country: 'FR' })).toBe(true);
  });

  it('should return true if year is the current year', () => {
    expect(validateInput({ year: new Date().getFullYear() })).toBe(true);
  });

  it('should return true if no arguments where passed', () => {
    expect(validateInput({})).toBe(true);
  });
});

describe('Tests for shortenPublicHoliday func:', () => {
  it('should return obj with date, name and localName props of argument', () => {
    const holiday: PublicHoliday = {
      date: 'date',
      localName: 'localName',
      name: 'name',
      countryCode: 'countryCode',
      fixed: true,
      global: false,
      counties: [],
      launchYear: null,
      types: [],
    };

    expect(shortenPublicHoliday(holiday)).toEqual({ date: 'date', localName: 'localName', name: 'name' });
  });
});
