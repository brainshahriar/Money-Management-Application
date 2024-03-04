import React from "react";
import { CirclePicker } from "react-color";

const ColorPicker = ({ selectedColor, onSelectColor }) => {
  return (
    <CirclePicker
      color={selectedColor}
      onChangeComplete={(color) => onSelectColor(color.hex)}
    />
  );
};

export default ColorPicker;
