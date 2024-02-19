import React from 'react'

interface GenderModalProps {
  isOpen: boolean;
}

const GenderModal: React.FC<GenderModalProps> = ({ isOpen }) => {
  return (
    <>
      <div className='overlay-3'></div>
      <div className={`modal ${isOpen ? '' : 'hidden'}`}>
        <h3>Cinsiyetini Seç</h3>
        <div className='gender-option'>
          <div className='gender-male'>
            <input type="checkbox" />
            <label htmlFor="">Erkek</label>
          </div>
          <div className='gender-option'>
            <input type="checkbox" />
            <label htmlFor="">Kadın</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default GenderModal