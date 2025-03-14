import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Profile = () => {
  return (
	<View>
	  <Text>Profile</Text>
	  <Link href="/sign-in">Sign in</Link>
	</View>
  )
}

export default Profile
