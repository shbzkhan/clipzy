import {Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SliderData } from '../../constants/SliderData'

const Slider = () => {
    const [selectedSlider, setSelectedSlider] = useState<string>("All")
    console.log(selectedSlider)
    
  return (
    <ScrollView 
    contentContainerClassName='gap-3 px-4'
    horizontal
    showsHorizontalScrollIndicator={false}
    >
      {
        SliderData.map(item=>(
            <TouchableOpacity
            className='px-3 py-2 bg-secondary rounded-md dark:bg-dark-100'
            key={item._id}
            onPress={()=>setSelectedSlider(item.name)}
            >
                <Text className={`${selectedSlider === item.name && "text-primary-600 dark:text-primary-600"} font-rubik-medium text-md dark:text-white`}>{item.name}</Text>
            </TouchableOpacity>
        ))
      }
    </ScrollView>
  )
}

export default Slider