import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from '../src/services/public-holidays.service';

describe('Tests for getListOfPublicHolidays func:', () => {
  it('should return list of public holidays', async () => {
    const year = new Date().getFullYear();
    const country = 'FR';

    const result = await getListOfPublicHolidays(year, country);

    result.forEach((holiday: any) => {
      expect(holiday).toEqual({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
      });
    });
  });

  it('should throw error if year is not the current year', async () => {
    const year = 1999;
    const country = 'FR';

    await expect(getListOfPublicHolidays(year, country)).rejects.toThrow(new Error('Year provided not the current, received: 1999'));
  });

  it('should throw error if country is not supported', async () => {
    const year = new Date().getFullYear();
    const country = 'BY';
  
    await expect(getListOfPublicHolidays(year, country)).rejects.toThrow(new Error('Country provided is not supported, received: BY'));
  });
});

describe('Tests for checkIfTodayIsPublicHoliday func:', () => {
  it('should return boolean value', async () => {
    const country = 'FR';

    const result = await checkIfTodayIsPublicHoliday(country);

    await expect(result).toStrictEqual(expect.any(Boolean));
  });

  it('should throw error if country is not supported', async () => {
    const country = 'BY';
  
    await expect(checkIfTodayIsPublicHoliday(country)).rejects.toThrow(new Error('Country provided is not supported, received: BY'));
  });
});

describe('Tests for getNextPublicHolidays func:', () => {
  it('should return list of next public holidays', async () => {
    const country = 'FR';

    const result = await getNextPublicHolidays(country);

    result.forEach((holiday: any) => {
      expect(holiday).toEqual({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
      });
    });
  });

  it('should throw error if country is not supported', async () => {
    const country = 'BY';
  
    await expect(getNextPublicHolidays(country)).rejects.toThrow(new Error('Country provided is not supported, received: BY'));
  });
});
