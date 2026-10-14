/* import React, {useEffect, useMemo} from "react"; */

export const Convert_func = (input1: number, input2: number, input3: number): number => {
    const temp = (input1 * input2) / input3;
    const res_temp = Number(temp.toFixed(10));
    return res_temp;
}
