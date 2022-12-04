export const priceFormat = (s) => { // priceFormat(1000)
    if (/[^0-9\.]/.test(s)) {
        return '0.00';
    }
    s = s.toString().replace(/^(\d*)$/, '$1.');
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    s = s.replace('.', ',');
    const re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, '$1,$2');
    }
    s = s.replace(/,(\d\d)$/, '.$1');
    return s.replace(/^\./, '0.');
}
export const isEmpty = val => {
    return typeof val === 'number' ? val === 0 : (true === !val || 0 == Object.keys(val).length);
}

export const sleep = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, time)
    })
}
