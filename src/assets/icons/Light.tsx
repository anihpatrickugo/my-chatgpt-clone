import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M10.5 14.167a4.167 4.167 0 1 0 0-8.334 4.167 4.167 0 0 0 0 8.334ZM10.5.833V2.5M10.5 17.5v1.667M4.017 3.517 5.2 4.7M15.8 15.3l1.183 1.183M1.333 10H3M18 10h1.667M4.017 16.483 5.2 15.3M15.8 4.7l1.183-1.183" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
