export type Comment = {
  user: string;
  text: string;
  createdAt: string; // or Date if you convert it
};

export type PostTypes = {
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  _id: string;
  post: string;
  image: string;
  likes: string[];
  comments: Comment[];
  createdAt?: string;
};

export interface UserType {
  _id: string;
  bio: string;
  name: string;
  email?: string;
  image?: string;
  cover?: string;
  following?: string;
  followers?: string;
  createdAt?: string;
  savedPost?: string[];
}

export interface UserStore {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: UserType | null) => void;
}
