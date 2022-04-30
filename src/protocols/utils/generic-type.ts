export type IGenericType<T> = {
  [index in string | number | any]: T;
};