import { ChangeEvent } from "react";

export interface IUser {
  dateRegistered: string;
  id: string;
  email: string;
  imageUrl: string | null;
  name: string | null;
}

export interface IReview {
  author_details: {
    avatar_path: null | string;
    username: string;
    rating: null | number;
  };
  content: string;
  created_at: string;
  id:string;
}

export interface NRInputProps  {
  title: string;
  type: string;
  autoComplete?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[] | undefined;
  name: string;
  maxLength?: number;
  placeholder?: string;
  width?: string;
  min?: number;
  max?: number;
  className?: string;
  styles?: string;
  isRequired: boolean;
  isDisabled?: boolean;
};
export interface Review {
  username: string;
  created_at: string;
  image: string | null;
  content: string;
  movieID: string;
  uid: string;
  email: string;
  type:string
}