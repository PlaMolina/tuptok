const port = process.env.PORT || 3000;
const secretKey = 'B1566UN';
const expiredAfter = 60 * 60 * 1000;

module.exports = {
  port,
  secretKey,
  expiredAfter
};