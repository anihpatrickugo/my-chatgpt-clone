import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.61 2.064 1.254 17.686A2.21 2.21 0 0 0 3.143 21h18.715a2.209 2.209 0 0 0 1.889-3.314L14.389 2.064a2.21 2.21 0 0 0-3.778 0ZM12.5 7.742v4.42M12.5 16.58h.011"
    />
  </Svg>
)
export default SvgComponent

