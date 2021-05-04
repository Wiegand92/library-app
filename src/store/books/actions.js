const storeBooks = books => ({
  type: "storeBooks",
  books
});

export const loadBooks = () => async (dispatch, getState, bookAPI) => {
  await bookAPI.loadBooks()
  .then(books => {
    dispatch(storeBooks(books))
  })
  .catch(err => console.error(err));
};
