import { useState, useRef, useEffect } from "react"
import { Affix, Button } from "@mantine/core";
import {useComputedColorScheme,useMantineColorScheme} from '@mantine/core';

const ColorTheme = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');
    const [buttonText, setButtonText] = useState('');
    
    useEffect(() => {
        if (computedColorScheme === 'light') {
          setButtonText('Light Mode');
        } else {
          setButtonText('Dark Mode');
        }
      }, [computedColorScheme]);
    return (
        <Affix bottom={20} left={20}>
            <Button color="grey"  onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>{buttonText}</Button>
        </Affix>
    );
};

export default ColorTheme;