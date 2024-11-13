// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <div style={{ width: '100%', height: 109, position: 'relative' }}>
      <div style={{
        width: '100%',
        height: 109,
        position: 'absolute',
        background: '#01E6FF'
      }} />

      {/* Informação de contato */}
      <div style={{
        width: 221,
        height: 29,
        right: 20,
        top: 13,
        position: 'absolute',
        color: 'black',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '400',
        wordWrap: 'break-word'
      }}>
        xxxxxxxx-xxxxxxx(xx)
      </div>
      <div style={{
        width: 197,
        height: 22,
        right: 20,
        top: 59,
        position: 'absolute',
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: '400',
        wordWrap: 'break-word'
      }}>
        emailaleatorio@gmail.com
      </div>

      {/* Ícones no lado esquerdo */}
      <div style={{
        width: 97,
        height: 90,
        left: 0,
        top: 13,
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.10)'
      }}>
        {/* Ícone 1 */}
        <div style={{ width: 38, height: 34, left: 56, top: 52, position: 'absolute' }}>
          <div style={{
            width: 35.5,
            height: 32.27,
            position: 'absolute',
            background: 'linear-gradient(135deg, #2489BE 0%, #0575B3 100%)'
          }}></div>
        </div>

        {/* Ícone 2 */}
        <div style={{ width: 39, height: 34, left: 7, top: 52, position: 'absolute' }}>
          <div style={{
            width: 38.83,
            height: 34,
            position: 'absolute',
            background: '#E0E0E0'
          }}></div>
          <div style={{
            width: 37.05,
            height: 32.45,
            left: 0.97,
            top: 0.59,
            position: 'absolute',
            background: 'linear-gradient(0deg, #20B038 0%, #60D66A 100%)'
          }}></div>
          <div style={{
            width: 19.41,
            height: 15.69,
            left: 9.87,
            top: 8.97,
            position: 'absolute',
            background: 'white'
          }}></div>
        </div>

        {/* Ícone 3 (Imagem de exemplo) */}
        <img style={{
          width: 37,
          height: 35,
          left: 56,
          top: 8,
          position: 'absolute'
        }} src="https://via.placeholder.com/37x35" alt="Icone" />

        {/* Ícone 4 */}
        <div style={{ width: 41, height: 38, left: 7, top: 8, position: 'absolute' }}>
          <div style={{
            width: 34.17,
            height: 31.67,
            left: 3.42,
            top: 3.17,
            position: 'absolute',
            background: '#C13584'
          }}></div>
          <div style={{
            width: 20.5,
            height: 19,
            left: 10.25,
            top: 9.5,
            position: 'absolute',
            background: 'white'
          }}></div>
          <div style={{
            width: 10.53,
            height: 9.76,
            left: 15.24,
            top: 14.13,
            position: 'absolute',
            background: 'white'
          }}></div>
          <div style={{
            width: 2.46,
            height: 2.28,
            left: 24.75,
            top: 12.79,
            position: 'absolute',
            background: 'white'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
