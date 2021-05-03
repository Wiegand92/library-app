const storeBooks = books => ({
  type: "storeBooks",
  books
});

export const loadBooks = () => async (dispatch, getState, bookAPI) => {
  await bookAPI.loadBooks()
  .then(books => {
    console.log(books)
    dispatch(storeBooks(books))
  });
};
