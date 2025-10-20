const input_decimal = document.getElementById('input_decimal');
const input_binary  = document.getElementById('input_binary');
const input_octal   = document.getElementById('input_octal');
const input_hex     = document.getElementById('input_hex');

const hint_decimal = document.getElementById('hint_decimal');
const hint_binary  = document.getElementById('hint_binary');
const hint_octal   = document.getElementById('hint_octal');
const hint_hex     = document.getElementById('hint_hex');

const button_clear = document.getElementById('button_clear');

let is_updating = false;

const re_decimal = /^-?\d+$/;
const re_binary  = /^-?[01]+$/;
const re_octal   = /^-?[0-7]+$/;
const re_hex     = /^-?[0-9a-fA-F]+$/;

function set_hint(element, message, is_error = false)
{
  element.textContent = message || '';
  if (is_error)
    element.classList.add('error');
  else 
    element.classList.remove('error');
}

function parse_to_bigint(value_str, base)
{
  const sign = value_str[0] === '-' ? -1n : 1n;
  const trimmed = (value_str[0] === '+' || value_str[0] === '-') ? value_str.slice(1) : value_str;
  return sign * BigInt(parseInt(trimmed, base));
}

function bigint_to_base_string(value_bigint, base)
{
  if (value_bigint === 0n)
    return '0';
  const sign = value_bigint < 0n ? '-' : '';
  let v = value_bigint < 0n ? -value_bigint : value_bigint;
  if (base === 10) 
    return sign + v.toString();
  let s = v.toString(base);
  if (base === 16) 
    s = s.toUpperCase();
  return sign + s;
}

function clear_hints() 
{
  set_hint(hint_decimal, '');
  set_hint(hint_binary, '');
  set_hint(hint_octal, '');
  set_hint(hint_hex, '');
}

function update_all_from_decimal(decimal_str) 
{
  try 
  {
    const value_bigint = parse_to_bigint(decimal_str, 10);
    input_binary.value = bigint_to_base_string(value_bigint, 2);
    input_octal.value  = bigint_to_base_string(value_bigint, 8);
    input_hex.value    = bigint_to_base_string(value_bigint, 16);
    clear_hints();
  } 
  catch (e) 
  {
    set_hint(hint_decimal, 'invalid decimal', true);
  }
}
function update_all_from_binary(binary_str)
{
  try 
  {
    const value_bigint = parse_to_bigint(binary_str, 2);
    input_decimal.value = bigint_to_base_string(value_bigint, 10);
    input_octal.value   = bigint_to_base_string(value_bigint, 8);
    input_hex.value     = bigint_to_base_string(value_bigint, 16);
    clear_hints();
  }
  catch (e) {
    set_hint(hint_binary, 'invalid binary', true);
  }
}
