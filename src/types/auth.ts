export interface User {
  _id: string;
  id: number;
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
}

export interface AuthStoreType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
}
