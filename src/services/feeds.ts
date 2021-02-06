import axios from 'axios'

const baseUrl = 'http://message-list.appspot.com/messages'

const getFeeds = async(token:string = '') => {
  let url = ''
  if(token){
    url = `${baseUrl}?pageToken=${token}`
  }else{
    url = baseUrl
  }
  try {
    const response = await axios.get(url)
    return response.data 
  } catch (error) {
    return error.response
  }
}

export {
  getFeeds
}
