import React, { useState, useEffect } from 'react'
import Artyom from 'artyom.js'
import { AppContext, AppConsumer } from '../../ContextProvider'

const contextType = AppContext
const Jarvis = new Artyom()

const jarvisGoodMorningCommand = history => {
  // Or the artisan mode to write less

  // initialize jarvis
  Jarvis.initialize({
    lang: 'en-GB',
    debug: true, // Show what recognizes in the Console
    listen: true, // Start listening after this
    speed: 0.9, // Talk a little bit slow
    mode: 'normal' // This parameter is not required as it will be normal by default
  })

  Jarvis.on(['Sign up']).then(function (i) {
    history.push('/signup')
  })

  Jarvis.on(['Login']).then(function (i) {
    history.push('/login')
  })
}

const sayHello = () => {
  const { Jarvis } = this
  Jarvis.say('Hello I am Jarvis I am your virtual Assistant !')
}

const signUp = goSignup => {
  if (!goSignup) {
    this.setState({ goSignup: true })
  }
}

// go to signup page
const gotoSignUpPage = history => {
  history.push('/signup')
}

export default function Landing (props) {
  useEffect(() => {
    // Update the document title using the browser API
    const { history } = props
    console.log('history', history)
    jarvisGoodMorningCommand(history)
  })

  return (
    <div>
      <div className='landing-banner'>
        <div className='container'>
          <div className='row justify-content-center pt-5'>
            <h1>Social Media for Blind</h1>
          </div>
          <div className='row justify-content-center pt-3'>
            <h5>
              Communicate and interact with the community using your voice.
            </h5>
          </div>
          <div className='row justify-content-center pt-3 mt-4'>
            <button type='button' className='btn btn-danger text-capitalize'>
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className='container landing-description'>
        <div className='row justify-content-center pt-3 mt-3'>
          <h4>What is Social Media for Blind?</h4>
        </div>
        <div className='row justify-content-center pt-5 px-5'>
          <p>
            Social Media for Blind is a web application designed to help people
            with impaired visuals, specifically the blind ones to interact and
            communicate with each other around the world through voice by using
            softwares like TTS(Text-to-Speech) which converts text to audio and
            STT(Speech-to-Text) which converts audio to text, also known as
            Speech Recognition. The idea behind this is to make it possible for
            people with impaired visuals to keep track with their friends and
            families, even if they're blind, by allowing the site to read all
            the texts, posts and to even be able to identify what's in the
            pictures, ultimately acting as their eyes.
          </p>
        </div>
      </div>
    </div>
  )
}
