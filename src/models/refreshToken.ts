export interface RefreshToken {
  _id: string;
  expiresIn: number,
}

export interface RefreshTokenResponse {
  newRefreshToken: {
    expiresIn: number,
    _id: string;
  },
  token: string;
}