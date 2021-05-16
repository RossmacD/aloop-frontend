import React from 'react'

interface Props {
    selectedTextChan: [number, String],
    setSelectedTextChan: React.Dispatch<React.SetStateAction<[number, String] | undefined>>
}

export const ManageWindow: React.FC<Props> = ({ children, selectedTextChan }) => {



    return (
        <div>
            {children}
        </div>
    )
}