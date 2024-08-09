import axios from 'axios'
const baseUrl = '/api/blogs'

const getComments = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const createComment = async(id, comment) => {
  const base = `${baseUrl}/${id}/comments`
  const response = await axios.post(base, { comment })
  return response.data
}

export default { getComments, createComment }
