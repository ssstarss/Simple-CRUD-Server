export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type Resp = {
  status: number;
  response: string | User;
};
export const ERR_NOT_UUID = 400;
export const ERR_NO_USER = 404;
