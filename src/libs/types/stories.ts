import { Type } from 'typescript';

export interface StoriesReducer {
  objects: number[];
}

export interface Comment {
  by: string,
  id: number,
  kids: number[],
  parent: number,
  text: string,
  time: number,
  type: string,
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