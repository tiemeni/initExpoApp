import React from "react";
import { Input } from "native-base"
import colors from "../../constants/colours";

const CustomInput = () => {
    const [code, setCode] = React.useState();

    const handleChange = (text) => {
        setCode(text);
    }

    return (
        <Input
            value={code}
            onChangeText={handleChange}
            borderColor={code ? colors.primary : 'transparent'}
            color={code ? colors.primary : colors.white}
            borderWidth={2}
            bg={code ? 'transparent' : colors.trans_primary}
            width={12} height={12}
            textAlign={'center'}
            borderRadius={'50%'}
            fontSize={24}
            fontWeight={'bold'}
            mr={2}
        />
    )
}

export default CustomInput;