export interface ICurrentUser {
    currentUser: {
      userId: string;
      email: string;
      iat: number;
    } | null;
  }
  