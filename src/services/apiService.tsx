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
}
export default apiService
