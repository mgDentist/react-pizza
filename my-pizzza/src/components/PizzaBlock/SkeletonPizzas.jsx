import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPizzas = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={485}
        viewBox="0 0 280 485"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="130" cy="130" r="130" />
        <rect x="0" y="270" rx="20" ry="20" width="280" height="47" />
        <rect x="0" y="330" rx="20" ry="20" width="280" height="83" />
        <rect x="0" y="429" rx="20" ry="20" width="92" height="44" />
        <rect x="123" y="429" rx="20" ry="20" width="155" height="44" />
    </ContentLoader>
)

export default SkeletonPizzas