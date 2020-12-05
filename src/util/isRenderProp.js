import { isFunction } from './isFunction';

export const isRenderProp = children =>
  !!children && isFunction(children);
