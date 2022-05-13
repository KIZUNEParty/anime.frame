function resPi(m) {
    let rePi

    if(m < 10) {
        rePi = '00000' + m
    } else if (m < 100) {
        rePi = '0000' + m
    } else if (m < 1000) {
        rePi = '000' + m
    } else if (m < 10000) {
        rePi = '00' + m
    } else if (m < 100000) {
        rePi = '0' + m
    } else if (99999 < m) {
        rePi = m
    }

    return rePi
}

module.exports = {resPi}