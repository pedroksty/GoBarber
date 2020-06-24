export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAILPORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.PASS
  },
  default: {
    from: "Equipe Lar <pedrojogos2123@gmail.com>"
  }
};
