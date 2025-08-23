import { icons } from 'lucide-react-native';
import { FC } from 'react';

type iconsName = keyof typeof icons


type IconTypes = {
    name:iconsName,
    color?:string | "#60A5FA",
    size?:number,
    focused?:any
}
const Icon:FC<IconTypes> = ({ name, color="#60A5FA", size, focused }) => {
  const CustomIcon = icons[name];

  return <CustomIcon 
             color={focused ? "#60A5FA":color} 
            fill={focused ? color : "none"}         
            size={size} 
        />;
};

export default Icon;