const asyncHandler = require('express-async-handler');
const { NoticeService } = require('../services');

class NoticeController {
  addNoticeToCategory = asyncHandler(async (req, res) => {
    const { id: owner } = req.user;
    const { title, sex, location } = req.body;

    if (!title || !sex || !location) {
      return res.status(400).json({ code: 400, status: 'failed', error: 'Missing required field' });
    }

    const notice = await NoticeService.addNoticeToCategory(owner, req.body);

    res.status(201).json({ code: 201, status: 'created', notice });
  });

  getNoticesByCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.params;
    let { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * limit;
    limit = parseInt(limit) > 20 ? 20 : limit;

    const data = await NoticeService.getNoticesByCategory(categoryName, skip, limit);

    res.status(200).json({ code: 200, status: 'success', data, page, limit });
  });

  getNoticeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notice = await NoticeService.getNoticeById(id);
    res.status(200).json({ code: 200, status: 'success', notice });
  });
}

module.exports = new NoticeController();
