export interface ICurrentUser {
    currentUser: {
      userId: string;
      name: string;
      iat: number;
    } | null;
  }
  