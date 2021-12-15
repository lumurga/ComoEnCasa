import React from 'react';
import { useTranslation } from 'react-i18next';

import './Policies.scss';

const Politics = ({product}) => {

    const { t } = useTranslation();

    return (
        <section className = "policiesContainer">
            <h2>{t('policies_title_product')}</h2>
            <hr/>
            <div className = "info">
                <div className = "norms">
                    <h3>{t('policies_norms_product')}</h3>
                    <div className='aux'>
                        <p>{product.legals}</p>
                    </div>
                    {/* <ul>
                        <li>Check-out: 10:00</li>
                        <li>No se permite fumar en el lugar</li>
                        <li>No se permiten fiestas</li>
                    </ul> */}
                </div>
                <div className = "security">
                    <h3>{t('policies_norms_health_and_safety')}</h3> 
                    <div className='aux'>
                        <p>{product.safetyAndHygiene}</p>
                    </div>
                    {/* <ul>
                        <li>Se aplican pautas de distanciamiento social y otras normas relacionadas con el COVID-19</li>
                        <li>Detector de humo</li>
                        <li>Depósito de seguridad</li>
                    </ul> */}
                </div> 
                <div className = "annulment">
                    <h3>{t('policies_norms_cancelation')}</h3>
                    <div className='aux'>
                        <p>{product.cancellationPolicies}</p>
                    </div>
                    {/* <ul>
                        <li>Agregá las fechas de tu viaje para obtener los detalles de cancelación de esta estadía</li>
                    </ul> */}
                </div>
            </div>
        </section>   
    );
}

export default Politics;
