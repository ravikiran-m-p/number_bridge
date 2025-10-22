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

function update_all_from_octal(octal_str)
{
  try
  {
    const value_bigint = parse_to_bigint(octal_str, 8);
    input_decimal.value = bigint_to_base_string(value_bigint, 10);
    input_binary.value  = bigint_to_base_string(value_bigint, 2);
    input_hex.value     = bigint_to_base_string(value_bigint, 16);
    clear_hints();
  }
  catch (e)
  {
    set_hint(hint_octal, 'invalid octal', true);
  }
}

function update_all_from_hex(hex_str)
{
  try
  {
    const value_bigint = parse_to_bigint(hex_str, 16);
    input_decimal.value = bigint_to_base_string(value_bigint, 10);
    input_binary.value  = bigint_to_base_string(value_bigint, 2);
    input_octal.value   = bigint_to_base_string(value_bigint, 8);
    clear_hints();
  }
  catch (e)
  {
    set_hint(hint_hex, 'invalid hex', true);
  }
}

input_decimal.addEventListener('input', function (){
  if (is_updating) 
  return;
  is_updating = true;
  const v = input_decimal.value.trim();
  clear_hints();
  if (v === '')
  {
    input_binary.value = input_octal.value = input_hex.value = '';
    is_updating = false;
    return;
  }
  if (!re_decimal.test(v))
  {
    set_hint(hint_decimal, 'only optional minus and digits 0-9', true);
    is_updating = false;
    return;
  }

   update_all_from_decimal(v);
  is_updating = false;
});

input_binary.addEventListener('input', function () {
  if (is_updating)
    return;
  is_updating = true;
  const v = input_binary.value.trim();
  clear_hints();
  if (v === '')
  {
    input_decimal.value = input_octal.value = input_hex.value = '';
    is_updating = false;
    return;
  }
  if (!re_binary.test(v))
  {
    set_hint(hint_binary, 'only 0 or 1 and optional leading minus', true);
    is_updating = false;
    return;
  }
  update_all_from_binary(v);
  is_updating = false;
});

input_octal.addEventListener('input', function () {
  if (is_updating) 
    return;
  is_updating = true;
  const v = input_octal.value.trim();
  clear_hints();
  if (v === '')
  {
    input_decimal.value = input_binary.value = input_hex.value = '';
    is_updating = false;
    return;
  }
  if (!re_octal.test(v))
  {
    set_hint(hint_octal, 'digits 0-7 only, optional minus', true);
    is_updating = false;
    return;
  }
  update_all_from_octal(v);
  is_updating = false;
});

input_hex.addEventListener('input', function () {
  if (is_updating) 
    return;
  is_updating = true;
  const v = input_hex.value.trim();
  clear_hints();
  if (v === '') {
    input_decimal.value = input_binary.value = input_octal.value = '';
    is_updating = false;
    return;
  }
  if (!re_hex.test(v)) {
    set_hint(hint_hex, 'hex digits 0-9 A-F, optional minus', true);
    is_updating = false;
    return;
  }
  update_all_from_hex(v);
  is_updating = false;
});


