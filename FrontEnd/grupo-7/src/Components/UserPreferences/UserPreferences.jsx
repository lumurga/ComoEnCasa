import React from 'react';
import { useTranslation } from 'react-i18next';

import "./UserPreferences.scss"

const UserPreferences = ({name, lastName, email}) => {

    const { t } = useTranslation();

    return (
        <div className="userPreferencesContainer">
            <div className="userPreferences">
                <div className="userAvatar">
                    <p>{name[0] + lastName[0]}</p>
                </div>
                <div className="userProps">
                    <p className="userPrefLabel">{t('name')}: </p>
                    <p>{name}</p>
                </div>
                <div className="userProps">
                    <p className="userPrefLabel">{t('lastname')}: </p>
                    <p>{lastName}</p>
                </div>
                <div className="userPropsEmail">
                    <p className="userPrefLabel">{t('email')}: </p>
                    <p>{email}</p>
                </div>
            </div>
        </div>
    );
}

export default UserPreferences;
