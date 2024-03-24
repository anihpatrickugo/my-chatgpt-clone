import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1.038 12.539 11.808 1 9.5 9.462h8.462L7.192 21 9.5 12.539H1.038Z"
    />
  </Svg>
)
export default SvgComponent

