/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

const validate = (value, rules) => {
  let isValid = true;

  for (let rule in rules) {
    switch (rule) {
      case "minLength":
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;

      case "maxLength":
        isValid = isValid && maxLengthValidator(value, rules[rule]);
        break;

      case "isRequired":
        isValid = isValid && requiredValidator(value);
        break;

      case "isEmail":
        isValid = isValid && emailValidator(value);
        break;

      default:
        isValid = true;
    }
  }

  return isValid;
};

/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};

/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const maxLengthValidator = (value, maxLength) => {
  return value.length == maxLength;
};

/**
 * Check to confirm that feild is required
 *
 * @param  value
 * @return
 */
const requiredValidator = value => {
  return value !== null && value.trim() !== "";
};

/**
 * Email validation
 *
 * @param value
 * @return
 */
const emailValidator = value => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

/**
 * Name validation
 *
 * @param value
 * @return
 */
const nameValidator = value => {
  var re = /^[a-zA-Z]+((['. ][a-zA-Z ])?[a-zA-Z]*)*$/;
  return re.test(String(value).toLowerCase());
};
/**
 * Name validation
 *
 * @param value
 * @return
 */
const mobileValidator = value => {
  var re = /^[0-9]*$/;
  return re.test(String(value).toLowerCase());
};
/**
 * IP validation
 *
 * @param value
 * @return
 */
const ipValidator = value => {
  var re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  return re.test(String(value));
};
/**
 * IP validation
 *
 * @param value
 * @return
 */
const dateValidator = value => {
  var re = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/;
  return re.test(String(value));
};

export default validate;
