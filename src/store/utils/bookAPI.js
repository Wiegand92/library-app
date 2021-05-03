
const bookAPI = {
  loadBooks: async () => {
    return await fetch('/library')
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error(err))
  }
}

export default bookAPI;
