import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Artyoum from 'artyom.js'

import { AppConsumer, AppContext } from '../../ContextProvider'
import { Post, PostBody } from '../layout'

export default class Home extends Component {
  /**
   * Define our state
   */

  static contextType = AppContext;
  Jarvis = new Artyoum()

  state = {
    styles: {
      like: ''
    },
    isClicked: false,
    post: null,
    posts: [],
    showModal: false
  };

  /**
   * Manage state component
   */
  componentDidMount () {
    // Get our poats
    const { context } = this
    console.log('Context', context)
    this.getHomePosts(context)
    // setTimeout(() => {
    //   this.startJarvis()
    // }, 1500)
    // setTimeout(() => {
    //   this.jarvisAddCommands()
    // }, 2500)
  }

  post = null;

  getHomePosts = async (context) => {
    try {
      const postsResponse = await axios.get(`/api/posts`)
      const { data, status } = postsResponse
      const posts = data.reverse()
      console.log('Posts', { data, status })
      console.log('context', context)
      context.setPosts(posts)
    } catch (error) {
      console.log('home page', error)
    }
  };

  like = () => {
    const { isClicked } = this.state
    console.log('isClicked1', isClicked)
    if (!isClicked) {
      const styles = { like: 'active-icon' }
      this.setState({ styles })
      this.setState({ isClicked: true })
    } else {
      const styles = { like: '' }
      this.setState({ styles })
      this.setState({ isClicked: false })
    }
  };

  addComment = () => {
    const { showModal } = this.state
    !showModal
      ? this.setState({ showModal: true })
      : this.setState({ showModal: false })
    console.log('showModel', showModal)
  };

  // /**
  //  * Beginning of Artyoum Implementation
  //  */
  // startJarvis = () => {
  //   this.Jarvis.initialize({
  //     lang: 'en-US',
  //     continuous: true,
  //     debug: true,
  //     listen: true
  //   })
  //   window.alert('Jarvis is Running === !!!')
  // }

  // jarvisAddCommands = () => {
  //   this.Jarvis.addCommands({ indexes: ['hello', 'hay'],
  //     action: function (i) {
  //       const localJarvis = new Artyoum()
  //       if (i === 0) {
  //         window.alert('hello from Jarvis')
  //         localJarvis.say('hello i am here')
  //       }
  //     } })
  // }

  // stopJarvis = () => {
  //   this.Jarvis.fatality()
  // }

  /**
   * Beginning of Render Method
   */
  render () {
    const { styles } = this.state
    const { context } = this
    const { posts } = context.state
    return (
      <Fragment>
        <div className='container home-page'>
          <div className='row justify-content-center py-3'>
            <h2 className='home-page-title'>Home page</h2>
          </div>
          <div className='row justify-content-center  px-5'>
            <img
              className='img-fluid'
              src='https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
              alt='Connecting'
            />

            <div className='col-lg-12 text-center py-3'>
              {/* Post Form */}
              <div className='mt-3'>
                <AppConsumer>{context => <Post data={context} />}</AppConsumer>
              </div>
            </div>
          </div>
          <AppConsumer>
            {context => {
              const { posts } = context.state
              console.log('poste ==>', posts)
              return (
                <div className='container justify-content-center'>
                  {posts
                    ? posts.map((post, i) => (
                      <PostBody post={post.post} i={i} key={i} styles={styles} />
                    ))
                    : null}
                </div>
              )
            }}
          </AppConsumer>
        </div>
      </Fragment>
    )
  }
}
