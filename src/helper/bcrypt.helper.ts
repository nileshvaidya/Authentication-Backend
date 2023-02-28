import  bcrypt  from 'bcryptjs';
const saltRounds = 8;

export const hashPassword = (plainPassword: string) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(plainPassword, saltRounds));
  });
};

export const comparePassword = (painPass: string, passFromDb: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(painPass, passFromDb, function (err: any, result: unknown) {
      if (err) reject(err);

      resolve(result);
    });
  });
};

module.exports = {
  hashPassword,
  comparePassword,
};
