// function asyncHandler(handler) {
//   return async (req, res, next) => {
//     try {
//       await handler(req, res);
//     } catch (error) {
//       next(error);
//     }
//   };
// }

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
