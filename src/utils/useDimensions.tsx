import React from 'react'

interface Props {

}

export const useDimensions: React.FC<Props> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}