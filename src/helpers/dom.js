function StringValue(value){ this.value = value; }
StringValue.prototype.toString = function(){
  return this.value != null ? this.value : '';
}

export function checked(isChecked){ return isChecked ? Object : null; }
export function value(value){ return new StringValue(value); }
