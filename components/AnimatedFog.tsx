import React from 'react';

export const AnimatedFog: React.FC = () => {
    return (
        <>
            <style>{`
                @keyframes move-fg-1 {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-33.333%, 0, 0); }
                }
                @keyframes move-fg-2 {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(25%, 0, 0); }
                }
                .fog-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 0;
                }
                .fog-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 300%;
                    height: 100%;
                    opacity: 0.3;
                }
                .fog-img-first {
                    background: url('https://uploads-ssl.webflow.com/6561d3c1626f658093952f14/65688536f98108a95f9c5d0f_fog-1.png') 0 0 / 100% 100% repeat-x;
                    animation: move-fg-1 40s linear infinite;
                }
                .fog-img-second {
                    background: url('https://uploads-ssl.webflow.com/6561d3c1626f658093952f14/6568853765082161b3693638_fog-2.png') 0 0 / 100% 100% repeat-x;
                    animation: move-fg-2 60s linear infinite;
                }
            `}</style>
            <div className="fog-container">
                <div className="fog-img fog-img-first"></div>
                <div className="fog-img fog-img-second"></div>
            </div>
        </>
    );
};
