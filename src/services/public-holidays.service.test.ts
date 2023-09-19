import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { PublicHoliday } from '../types';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';

const getRequestSpy = jest.spyOn(axios, 'get');

const holidays: PublicHoliday[] = [{
  date: 'date',
  localName: 'localName',
  name: 'name',
  countryCode: 'countryCode',
  fixed: true,
  global: false,
  counties: [],
  launchYear: null,
  types: [],
}];

const year = new Date().getFullYear();
const country = 'FR';

describe('Tests for getListOfPublicHolidays func:', () => {
  it('should return list of holidays', async () => {
    getRequestSpy.mockResolvedValueOnce({ data: holidays });

    const result = await getListOfPublicHolidays(year, country);

    expect(getRequestSpy).toBeCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    expect(result).toEqual([{ date: 'date', localName: 'localName', name: 'name' }]);
  });

  it('should return empty array if request failed', async () => {
    getRequestSpy.mockRejectedValueOnce(new Error());

    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual([]);
  });
});

describe('Tests for checkIfTodayIsPublicHoliday func:', () => {
  it('should return true if request status is 200', async () => {
    getRequestSpy.mockResolvedValueOnce({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(getRequestSpy).toBeCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
    expect(result).toBe(true);
  });

  it('should return false if request failed', async () => {
    getRequestSpy.mockRejectedValueOnce(new Error());

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(false);
  });
});

describe('Tests for getNextPublicHolidays func:', () => {
  it('should return list of holidays', async () => {
    getRequestSpy.mockResolvedValueOnce({ data: holidays });

    const result = await getNextPublicHolidays(country);

    expect(getRequestSpy).toBeCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
    expect(result).toEqual([{ date: 'date', localName: 'localName', name: 'name' }]);
  });

  it('should return empty array if request failed', async () => {
    getRequestSpy.mockRejectedValueOnce(new Error());

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([]);
  });
});
