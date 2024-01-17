import jwt from 'jsonwebtoken';
export class Token {
  static Decode(token: string): any {
    return jwt.verify(token, process.env.JWT_SECURITY!, function (err, decoded) {
      if (err) return
      return decoded
    });
  }
}
