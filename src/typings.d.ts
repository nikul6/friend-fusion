interface Root {
  comments: number;
  imgUrl: string;
  likes: number;
  title: string;
  userId: string;
  userName: string;
}

interface User {
  uid: string;
  email: string | null;
  name?: string | null;
}

interface AuthState {
  user: User | null;
  error: string | null
}

interface Post {
  title: string;
  userId: string | undefined;
  userName: string;
  imgUrl: string;
  likes: number;
  comments: number;
}

interface PostsState {
  posts: Post[];
}

interface RegistrationData {
  inputedName: string;
  inputedEmail: string;
  inputedPassword: string;
}

interface AllUser {
  uid: string;
  email: string | null;
  name: string | null;
}

interface UserState {
  users: AllUser[];
}