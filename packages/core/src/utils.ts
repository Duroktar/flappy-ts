export function rectCircleColliding(cx: number, cy: number, cr: number, rx: number, ry: number, rw: number, rh: number) {
  const distX = Math.abs(cx - rx - rw / 2)
  const distY = Math.abs(cy - ry - rh / 2)
  if (distX > (rw / 2 + cr)) {
    return false
  }
  if (distY > (rh / 2 + cr)) {
    return false
  }
  if (distX <= (rw / 2)) {
    return true
  }
  if (distY <= (rh / 2)) {
    return true
  }
  const dx = distX - rw / 2
  const dy = distY - rh / 2
  return (dx * dx + dy * dy <= (cr * cr))
}

export function numInWords (number: number) {
  const first = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  const tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
  const hundred = 'hundred ';
  let word = '';

  for (let i = 0; i < mad.length; i++) {
    let tempNumber = number%(100*Math.pow(1000,i));
    if (Math.floor(tempNumber/Math.pow(1000,i)) !== 0) {
      if (Math.floor(tempNumber/Math.pow(1000,i)) < 20) {
        word = first[Math.floor(tempNumber/Math.pow(1000,i))] + mad[i] + ' ' + word;
      } else {
        word = tens[Math.floor(tempNumber/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(tempNumber/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
      }
    }

    tempNumber = number%(Math.pow(1000,i+1));
    if (Math.floor(tempNumber/(100*Math.pow(1000,i))) !== 0) word = first[Math.floor(tempNumber/(100*Math.pow(1000,i)))] + hundred + word;
  }
    return word.trim();
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
