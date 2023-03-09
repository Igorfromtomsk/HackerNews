import { Type } from 'typescript';

export interface StoriesReducer {
  objects: number[];
}

export interface Story {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: Type,
  url: string
}