import React, { createContext, useContext, useState, useEffect} from 'react';


const MemberContext = createContext();
export const useMember = () => useContext(MemberContext);

export const MemberCard = ({ card }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCard, setEditedCard] = useState(card);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            // Optionally save the data here or pass it up to the parent to handle saving
            console.log('Saving data...', editedCard);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCard(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <MemberContext.Provider value={{handleEditToggle, handleChange}} >
            {card}
            <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="会员卡名称"
                        value={editedCard.会员卡名称}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="会员卡类型"
                        value={editedCard.会员卡类型}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="会员卡折扣"
                        value={editedCard.会员卡折扣}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="会员卡余额"
                        value={editedCard.会员卡余额}
                        onChange={handleChange}
                    />
                </>
            ) : (
                <>
                    <div>{editedCard.会员卡名称}</div>
                    <div>{editedCard.会员卡类型}</div>
                    <div>{editedCard.会员卡折扣}</div>
                    <div>{editedCard.会员卡余额}</div>
                </>
            )}
            <button onClick={handleEditToggle}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
        </MemberContext.Provider>
        
    );
}

export default MemberCard;