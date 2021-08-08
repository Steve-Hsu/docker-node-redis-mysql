//@desc   Get data
exports.getData = (req, res, next) => {
  res.status(200).json({ success: true, data: 'you get data' });
}

//@desc   Create data
exports.createDate = (req, res, next) => {
  res.status(200).json({ success: true, data: 'you create data' });
}