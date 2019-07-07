import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from './setAuthToken'

/**
 * Registartion post Request
 */
export const RegisterNewUser = (userData, history, context) => {
  // Deconstruct the userData object
  const { name,
    email,
    password,
    password2,
    userAvatar } = userData
  // Initialize our Form data object
  let formData = new window.FormData()
  formData.append('name', name)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('password2', password2)
  formData.append('userAvatar', userAvatar)

  let config = { headers: { 'Content-Type': 'multipart/form-data' } }

  axios
    .post('/api/users/register', formData, config)
    .then(res => {
      context.setError(null)
      history.push('/login')
    }) // re-direct to login on successful register
    .catch(err => {
      console.log('ERR==>', err.response)
      context.setError(err)
    })
}

/**
 * Login Request
 */
export const setCurrentUser = (decoded, context) => {
  console.log('Context ==>', context)
  context.setAuth(true)
  context.setUserData(decoded)
}

// Login - get user token
export const loginUser = (userData, history, context) => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data
      console.log('Response', token)
      localStorage.setItem('jwtToken', token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwtDecode(token)

      // Set current user
      // context.setUserData(decoded);
      // context.setAuth(true);
      console.log('decoded', decoded)

      setCurrentUser(decoded, context)
      //
      history.push('/home')

      //
    })
    .catch(err => {
      console.log(err)
      context.setError(err.response.data)
    })
}

/**
 *
 * set auth token
 */

// Log user out
export const logoutUser = context => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  context.setAuth(false)
  // Set current user to empty object {} which will set isAuthenticated to false
  // setCurrentUser({});
}

/**
 * create post
 */
export const createPost = async postData => {
  try {
    const response = await axios.post('/api/post', postData)
    const { data } = response
    console.log('Post data ==> ', data)
    return data
  } catch (error) {
    console.log('Create Post Error ==> ', error)
  }
}
