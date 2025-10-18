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
