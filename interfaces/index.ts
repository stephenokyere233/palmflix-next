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