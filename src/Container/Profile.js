import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Home from '../Component/Pages/Home'

export class Profile extends Component {
  render() {
    const {profilerequest, profileDetails} = this.props
    return (
      <>
        <Home 
          profilerequest={profilerequest}
          profileDetails={profileDetails}
        />
      </>
    )
  }
}

export default Profile