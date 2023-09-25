import axios, { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';

const API_URL = process.env.REACT_APP_API_URL;
const SLICE_LENGTH = parseInt(process.env.REACT_APP_SLICE_LENGTH || '30');

export const getItemIds = async (endpoint: string) => {
  const { data } = await axios.get(`${API_URL}/${endpoint}.json`);
  return data;
}

export const getItem = async (itemId: number) => {
  return axios.get(`${API_URL}/item/${itemId}.json`);
}

export const getAllItemResults = async (requests: Promise<AxiosResponse<any, any>>[]) => {
  const results = await axios.all(requests);
  return results.map(result => result.data);
}

export const constructItemIdSlices = (itemIds: number[]) => {
  const slices: number[][] = [];

  for (let i = 0; i < itemIds.length; i += SLICE_LENGTH) {
    slices.push(itemIds.slice(i, i + SLICE_LENGTH))
  }

  return slices;
}

/**
 * Only a boilerplate, would need more attention...
 * 
 * possible wrong scenarios:
 * abc.wordpress.com => wordpress.com
 * github.com/abc => github.com
 */
export const getHost = (url: string | undefined) => {
  if (!url) return '';

  try {
    const urlObject = new URL(url);
    const hostArr = urlObject.host.replace('www.', '').split('.');
    return `${hostArr[hostArr.length - 2]}.${hostArr[hostArr.length - 1]}`;
  } catch (err) {
    return '';
  }
}

export const getSingularOrPlural = (elapsedTimemeasure: number, timeMeasure: string) => {
  return elapsedTimemeasure > 1 ? `${timeMeasure}s` : timeMeasure;
}

const getRoundedTimeelapsed = (timeElapsed: number, divider: number) => {
  return Math.round(timeElapsed / divider);
}

export const getAgo = (time: number | undefined) => {
  if (!time) return '';

  const secsElapsed = Date.now() / 1000 - time;

  const minsElapsed = getRoundedTimeelapsed(secsElapsed, 60);
  if (secsElapsed < 60 * 60) {
    return `${minsElapsed} ${getSingularOrPlural(minsElapsed, 'minute')} ago`;
  }

  const hoursElapsed = getRoundedTimeelapsed(secsElapsed, 60 * 60);
  if (secsElapsed < 24 * 60 * 60) {
    return `${hoursElapsed} ${getSingularOrPlural(hoursElapsed, 'hour')} ago`;
  }

  const daysElapsed = getRoundedTimeelapsed(secsElapsed, 60 * 60 * 24);
  return `${daysElapsed} ${getSingularOrPlural(daysElapsed, 'day')} ago`;
}

export const getTotalPageCount = (ids: number[]) => {
  if (ids.length % SLICE_LENGTH === 0) {
    return Math.round(ids.length / SLICE_LENGTH);
  }

  return Math.ceil(ids.length / SLICE_LENGTH);
}

export const getOrder = (currentPage: number, idx: number) => {
  return ((currentPage - 1) * SLICE_LENGTH) + idx + 1;
}

export const closeNav = (setIsNavVisible: Dispatch<SetStateAction<boolean>>) => {
  setIsNavVisible((_: boolean) => {
    document.body.style.overflow = 'unset';
    return false;
  });
}