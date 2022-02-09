export enum VARIANT {
  SUCCESS,
  FAIL
}

export enum SIZE {
  LARGE,
  SMALL
}

export interface IProps {
  variant?: VARIANT;
  size?: SIZE;
}
