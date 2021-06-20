// import React from 'react';
// import './style.css'
// const req = require.context('../../assets/svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)


export default function SvgIcon(props) {
    let name = `#icon-` + props.name
    return (
        <svg className="svgClass" aria-hidden="true">
            <use xlinkHref={name} />
        </svg>
    )
}