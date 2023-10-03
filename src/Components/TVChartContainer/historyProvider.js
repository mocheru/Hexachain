var rp = require('request-promise').defaults({
    json: true
});
const history = {};
const url = "https://charts.astronomia.finance/get.php?symbol=0x6ae97e66eec23b4fdf77cd4ca423ecfbd439c39e&"

const defaultExport = {
    history: history,

    getBars: async function (symbolInfo, resolution, t) {
        
        return rp({
                url: `${url}resolution=${Number(resolution)}&from=${Number(t.from)}&to=${Number(t.to)}&currencyCode=USD`,
            })
            .then(data => {
                if (data.Response && data.Response === 'Error') {
                    return []
                }
                if (data.o.length) {
                    const newBars = [];
                    for (let i = 0; i < data.o.length; i++) {
                        newBars.push({
                            time: data.t[i] * 1000, // date string in api response
                            low: data.l[i],
                            high: data.h[i],
                            open: data.o[i],
                            close: data.c[i],
                            volume: data.v[i]      
                        })    
                    }
                    return newBars;
                } else {
                    return []
                }
            })
    },
};

export default defaultExport;
