import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, prefix, ...other } = props;

  return (
    <NumberFormat
      {...other}
      prefix={props.prefix}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const NumberFormatCustomDollar = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, prefix, ...other } = props;

  return (
    <NumberFormat
      {...other}
      prefix={props.prefix}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
