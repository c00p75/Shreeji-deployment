import React from 'react';

const OneYearWarrantyBadge = () => {
  const badgeStyle = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50px',
    overflow: 'hidden',
    width: 'fit-content',
    border: '4px solid #807045',
    fontFamily: 'Arial, sans-serif'
  };

  const leftCircleStyle = {
    background: 'white',
    color: '#807045',
    padding: '20px 30px',
    fontSize: '48px',
    fontWeight: 'bold',
    borderRight: '4px solid #807045'
  };

  const rightRectStyle = {
    background: '#807045',
    color: 'white',
    padding: '10px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  };

  const yearStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#807045',
    background: 'white',
    padding: '5px 0'
  };

  const warrantyStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '5px'
  };

  return (
    <div style={badgeStyle}>
      <div style={leftCircleStyle}>1</div>
      <div style={rightRectStyle}>
        <div style={yearStyle}>YEAR</div>
        <div style={warrantyStyle}>WARRANTY</div>
      </div>
    </div>
  );
};

export default OneYearWarrantyBadge;
