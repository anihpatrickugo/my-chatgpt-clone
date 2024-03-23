
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.5 12.5a1.666 1.666 0 0 1-1.667 1.667h-10L2.5 17.5V4.167A1.667 1.667 0 0 1 4.167 2.5h11.666A1.666 1.666 0 0 1 17.5 4.167V12.5Z"
    />
  </Svg>
)
export default SvgComponent
