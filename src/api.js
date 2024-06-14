import axios from "axios";

const ACCESS_KEY = "nTmfZBh3fHC-1xCDDBilQhBg_4ZKGGHwqFThAoBaxDc";
const BASE_URL = "https://api.unsplash.com";

export const searchImagesApi =  async (query, page) => 
    {
        console.log('query', query)
    const {data} = await 
    axios.get(`${BASE_URL}/search/photos`, {
        params : {query, page, per_page:10},
        headers : {
             Authorization: `Client-ID ${ACCESS_KEY}`,
        }
    }
    )
    return data.results
}

