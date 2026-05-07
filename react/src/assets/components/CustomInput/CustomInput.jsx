import React from 'react';
import './CustomInput.css';

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry, type }) => {
  return (
    <div className="input-container">
      <input
        className="custom-input"
        placeholder={placeholder}
        value={value}
        // Adaptando o onChangeText do Native para o onChange da Web
        onChange={(e) => onChangeText(e.target.value)}
        type={secureTextEntry ? 'password' : (type || 'text')}
      />
    </div>
  );
};

export default CustomInput;