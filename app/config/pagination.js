/**
 * @function calculateLimitAndOffset
 * @param {number} currentPage page number to get
 * @param {number} pageLimit number of items per page/request
 * @returns {object} returns object containing limit and offset
 */
const calculateLimitAndOffset = (currentPage = 1, pageLimit = 20, textFilter = '', sortData = '') => {
  const offset = (currentPage ? Number(currentPage) - 1 : 0) * Number(pageLimit);
  const limit = Number(pageLimit);
  const filter = textFilter.toLowerCase();
  const sort = (sortData.indexOf("-")<0)?[sortData, 'ASC']:[sortData.substr(1), 'DESC'];
  return { offset, limit, filter, sort };
};
const calculateLimitAndOffsetArray = (currentPage = 1, pageLimit = 20, textFilter = '', sortData = []) => {
  const offset = (currentPage ? Number(currentPage) - 1 : 0) * Number(pageLimit);
  const limit = Number(pageLimit);
  const filter = textFilter.toLowerCase();
  const sort = sortData;
  return { offset, limit, filter, sort };
};
  
  /**
   * @function paginate
   * @param {number} currentPage page number to get
   * @param {number} count total number of items
   * @param {array} rows items
   * @param {number} pageLimit number of items per page/request
   * @returns {object} return the meta for pagination
   */
  const paginate = (currentPage, count, rows, pageLimit = 20) => {
    const meta = {
      currentPage: Number(currentPage) || 1,
      pageCount: Math.ceil(count / Number(pageLimit)),
      pageSize: rows.length,
      count
    };
    return meta;
  };
  
  module.exports = { calculateLimitAndOffset, paginate, calculateLimitAndOffsetArray };