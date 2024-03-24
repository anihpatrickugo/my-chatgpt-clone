import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.333.667 11.5 17.333l-3.333-7.5L.667 6.5 17.333.667Z"
    />
  </Svg>
)
export default SvgComponent

