const apiService = {
  // Function to convert from body format to query format
  bodyToQueryFormat: (bodyData: any) => {
    const searchParams = new URLSearchParams()

    for (const key in bodyData) {
      if (bodyData.hasOwnProperty(key)) {
        searchParams.append(key, bodyData[key])
      }
    }

    return searchParams.toString()
  },
  //TODO: add ERROR handling
  get: (endpoint: string) => fetch(endpoint).then((res) => res.json()),

  post: (endpoint: string, body: any) =>
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(apiService.bodyToQueryFormat(body)),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  put: (endpoint: string, body: any) =>
    fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(apiService.bodyToQueryFormat(body)),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  delete: (endpoint: string) =>
    fetch(endpoint, {
      method: 'DELETE',
    }),
}
