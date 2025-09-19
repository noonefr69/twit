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
  likes: number;
  comments: Comment[];
  createdAt: string;
};
