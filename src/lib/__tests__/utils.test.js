import { constructItemIdSlices, getAgo, getHost, getSingularOrPlural } from "../utils";
import { MOCK_ITEM_IDS } from "../../mock/mock_data";


describe('constructItemIdSlices', () => {
  it('should return 1 array', () => {
    const slices = constructItemIdSlices(MOCK_ITEM_IDS.slice(0, 0));
    expect(slices.length).toBe(0);
  });

  it('should return 1 array of 1 array with 10 ids', () => {
    const slices = constructItemIdSlices(MOCK_ITEM_IDS.slice(0, 10));
    expect(slices[0].length).toBe(10);
  });

  it('should return 1 array of 3 arrays with 30, 30, 10 ids', () => {
    const slices = constructItemIdSlices(MOCK_ITEM_IDS.slice(0, 70));
    expect(slices[0].length).toBe(30);
    expect(slices[1].length).toBe(30);
    expect(slices[2].length).toBe(10);
  });
});

describe('getHost', () => {
  it('should return a string with 0 character for undefined', () => {
    expect(getHost(undefined).length).toBe(0);
  });

  it('should return a string with 0 character for an invalid URL', () => {
    expect(getHost('www.abc.com')).toEqual('');
  });

  it('should return a valid host for a valid URL with www.', () => {
    expect(getHost('https://www.abc.com')).toEqual('abc.com');
  });

  it('should return a valid host for a valid URL without www.', () => {
    expect(getHost('https://qwe.com')).toEqual('qwe.com');
  });
});

describe('getSingularOrPlural', () => {
  it('should return hour for elapsedTimemeasure = 1', () => {
    expect(getSingularOrPlural(1, 'hour')).toEqual('hour');
  });

  it('should return hourS for elapsedTimemeasure = 2', () => {
    expect(getSingularOrPlural(2, 'hour')).toEqual('hours');
  });
});

describe('getAgo', () => {
  it('should return an empty string', () => {
    expect(getAgo(undefined)).toEqual('');
  });

  it('should return 2 minutes ago', () => {
    const time = (+new Date() / 1000) - 60 * 2;
    expect(getAgo(time)).toEqual('2 minutes ago');
  });

  it('should return 59 minutes ago', () => {
    const time = (+new Date() / 1000) - 60 * 59;
    expect(getAgo(time)).toEqual('59 minutes ago');
  });

  it('should return 1 hour ago', () => {
    const time = (+new Date() / 1000) - 60 * 60;
    expect(getAgo(time)).toEqual('1 hour ago');
  });

  it('should return 3 hours ago', () => {
    const time = (+new Date() / 1000) - 60 * 60 * 3;
    expect(getAgo(time)).toEqual('3 hours ago');
  });

  it('should return 10 days ago', () => {
    const time = (+new Date() / 1000) - 60 * 60 * 24 * 10;
    expect(getAgo(time)).toEqual('10 days ago');
  });
});

// TODO: test the other utils