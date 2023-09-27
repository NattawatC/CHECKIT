const apiService = {
  //TODO: add ERROR handling
  get: (endpoint: string) => fetch(endpoint).then((res) => res.json()),

  post: (endpoint: string, body: any) =>
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  put: (endpoint: string, body: any) =>
    fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  delete: (endpoint: string) =>
    fetch(endpoint, {
      method: 'DELETE',
    }),
}
