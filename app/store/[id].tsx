
import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const Index = () => {
	const { id } = useLocalSearchParams();
  return (
	<View>
	  <Text>Store {id}</Text>
	</View>
  )
}

export default Index
