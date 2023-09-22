import request from 'supertest';

const NAGER_DATE_API_URL = 'https://date.nager.at/api/v3';

describe('Tests for GET PublicHolidays endpoint:', () => {
  it('should return status 200 and list of holidays', async () => {
    const year = 2023;
    const country = 'BY';

    const { status, body } = await request(NAGER_DATE_API_URL).get(`/PublicHolidays/${year}/${country}`);

    expect(status).toEqual(200);
    body.forEach((holiday: any) => {
      expect(holiday).toEqual({
        date: expect.any(String),
        localName: expect.any(String),
        name: expect.any(String),
        countryCode: country,
        fixed: expect.any(Boolean),
        global: expect.any(Boolean),
        counties: null,
        launchYear: null,
        types: expect.any(Array),
      });
    });
  });

  it('should return status 404 if country is not valid', async () => {
    const year = 2023;
    const country = 'EQ';

    const { status } = await request(NAGER_DATE_API_URL).get(`/PublicHolidays/${year}/${country}`);

    expect(status).toEqual(404);
  });

  it('should return status 400 if year is too big', async () => {
    const year = 9999;
    const country = 'BY';

    const { status } = await request(NAGER_DATE_API_URL).get(`/PublicHolidays/${year}/${country}`);

    expect(status).toEqual(400);
  });
});

describe('Tests for GET LongWeekend endpoint:', () => {
  it('should return status 200 and list of weekends', async () => {
    const year = 2023;
    const country = 'BY';

    const { status, body } = await request(NAGER_DATE_API_URL).get(`/LongWeekend/${year}/${country}`);

    expect(status).toEqual(200);
    body.forEach((holiday: any) => {
      expect(holiday).toEqual({
        startDate: expect.any(String),
        endDate: expect.any(String),
        dayCount: expect.any(Number),
        needBridgeDay: expect.any(Boolean),
      });
    });
  });

  it('should return status 404 if country is not valid', async () => {
    const year = 2023;
    const country = 'EQ';

    const { status } = await request(NAGER_DATE_API_URL).get(`/LongWeekend/${year}/${country}`);

    expect(status).toEqual(404);
  });
});
