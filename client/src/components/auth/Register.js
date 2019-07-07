import React, { Component } from 'react'
import { RegisterNewUser } from '../../utils/ApiReq'
import { AppConsumer, AppContext } from '../../ContextProvider'

export default class Register extends Component {
  /**
   * assign our state
   */
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    userAvatar: null,
    errors: {}
  };

  static contextType = AppContext;

  componentWillReceiveProps (nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/home') // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  /**
   * our custom Methods
   */

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  };

  /**
   * userProfileImage upload
   */
  onFileUpload = e => {
    const file = e.target.files[0]

    this.setState({ userAvatar: file })
  }

  onSubmit = e => {
    const { history } = this.props
    e.preventDefault()
    const { name, email, password, password2, userAvatar } = this.state

    const newUser = {
      name,
      email,
      password,
      password2,
      userAvatar
    }
    console.log(newUser)
    RegisterNewUser(newUser, history, this.context)
  };

  render () {
    const { context } = this
    const { name, email, password, password2, errors } = this.state

    return (
      <div className=' container login-page'>
        <div className='row justify-content-center pt-5 px-5'>
          <h3>Sign up Page</h3>
        </div>
        <form action='' onSubmit={this.onSubmit} className='my-5' encType='multipart/form-data'>
          <div className='form-group'>
            {context.state.errors ? (
              <div className='alert alert-danger login-errors' role='alert'>
                {JSON.stringify(context.state.errors.response.data)}
              </div>
            ) : null}
            <label htmlFor='exampleInputEmail1'>Name</label>
            <input
              onChange={this.onChange}
              value={name}
              error={errors.name}
              id='name'
              type='text'
              className='form-control'
              aria-describedby='nameHelp'
              placeholder='Enter your Name'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input
              onChange={this.onChange}
              value={email}
              error={errors.email}
              id='email'
              type='email'
              className='form-control'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              onChange={this.onChange}
              value={password}
              error={errors.password}
              id='password'
              type='password'
              className='form-control'
              placeholder='Password'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Confirm Password</label>
            <input
              onChange={this.onChange}
              value={password2}
              type='password'
              className='form-control'
              id='password2'
              placeholder='Confirm Password'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='userProfileImage'>upload your profile Image</label>
            <input
              name='userAvatar'
              onChange={e => { this.onFileUpload(e) }}
              type='file'
              className='form-control'
              id='userAvatar'
              placeholder='Confirm Password'
              required
            />
          </div>
          <button type='submit' className='btn btn-danger'>
            Submit
          </button>
        </form>
      </div>
    )
  }
}
