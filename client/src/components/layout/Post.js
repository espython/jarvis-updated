import React, { Component } from 'react'
import { AppContext } from '../../ContextProvider'

import Artyoum from 'artyom.js'

import { createPost } from '../../utils/ApiReq'

export default class Post extends Component {
  /**
   * state Management
   */
  static contextType = AppContext;
  state = { post: null, posts: [], postData: null };
  Jarvis = new Artyoum()

  /**
   * Component did mount Method
   */
  componentDidMount () {
    const Jarvis = new Artyoum()
    setTimeout(() => {
      this.startJarvis()
    }, 1500)
    setTimeout(() => {
      this.jarvisAddCommands(Jarvis)
    }, 2500)

    //   this.Jarvis.redirectRecognizedTextOutput((recognized, isFinal) => {
    //     const { context } = this
    //     if (isFinal) {
    //       // Nothing
    //       this.setState({ post: null })
    //     } else {
    //       console.log('Spoken Text', recognized)
    //       this.setState({ post: recognized })
    //       const { post } = this.state
    //       const { posts } = context.state

  //       const userId = context.state.userData.id
  //       const postData = { postText: post, author: userId }
  //       createPost(postData, context).then(res => {
  //         console.log('Res', res)
  //         posts.unshift(res)
  //         context.setPosts(posts)
  //       })
  //       this.stopJarvis()
  //     }
  //   })
  }

  onChange = e => {
    this.post = e.target.value
    this.setState({ post: this.post })
  };

  onSubmit = (e, context) => {
    e.preventDefault()
    const { post } = this.state
    const { posts } = context.state

    // posts.push(post)
    // context.setPosts(posts)

    // create post
    const userId = context.state.userData.id
    const postData = { postText: post, author: userId }
    createPost(postData, context).then(res => {
      console.log('Res', res)
      posts.unshift(res)
      context.setPosts(posts)
    })

    e.target.reset()
  };

  /**
 * Beginning of Artyoum Implementation
 */
startJarvis = () => {
  this.Jarvis.fatality()
  this.Jarvis.initialize({
    lang: 'en-US',
    continuous: false,
    debug: true,
    listen: true
  })
  this.Jarvis.say('Hello, I am Jarvis I am  your virtual assistant please say begin to start writing your posts ')
}

jarvisAddCommands = (Jarvis) => {
  const UserDictation = this.Jarvis.newDictation({
    continuous: true, // Enable continuous if HTTPS connection
    onResult: function (text) {
      // Do something with the text
      console.log('myText', text)

      const { context } = this
      if (text) {
        this.setState({ post: text })
        const { post } = this.state
        const { posts } = context.state

        const userId = context.state.userData.id
        const postData = { postText: post, author: userId }
        createPost(postData, context).then(res => {
          console.log('Res', res)
          posts.unshift(res)
          context.setPosts(posts)
        })
      }
    }.bind(this),
    onStart: function () {
      console.log('Dictation started by the user')
    },
    onEnd: function () {
      alert('Dictation stopped by the user')
    }
  })
  this.Jarvis.addCommands({ indexes: ['begin', 'end'],
    action: function (i) {
      if (i === 0) {
        UserDictation.start()
      } else if (i === 1) {
        UserDictation.stop()
      }
    },
    speed: 1 })
}

stopJarvis = () => {
  this.Jarvis.fatality()
}

// UserDictation = this.Jarvis.newDictation({
//   continuous: true, // Enable continuous if HTTPS connection
//   onResult: function (text) {
//     // Do something with the text
//     console.log('myText', text)
//   },
//   onStart: function () {
//     console.log('Dictation started by the user')
//   },
//   onEnd: function () {
//     alert('Dictation stopped by the user')
//   }
// });
/**
 * Beginning of render method
 */

render () {
  const { data } = this.props
  return (
    <React.Fragment>
      <div className='card bg-dark p-3'>
        <form onSubmit={e => this.onSubmit(e, data)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder="What'sUp?"
              id='mainInput'
              onChange={this.onChange}
            />
          </div>

          <div className='d-flex flex-row-reverse'>
            <button className='btn btn-dark' type='submit'>
                Add Post
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
}
