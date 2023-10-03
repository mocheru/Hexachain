import historyProvider from './historyProvider';

const configurationData = {
    supported_resolutions: ['1','5','10','15','30','60','1D', '1W', '1M']
}; 

const datafeedConfig = {
    // This method is used by the Charting Library to get a configuration of your datafeed 
    // (e.g. supported resolutions, exchanges and so on)
    onReady: (callback) => {
        console.log('[onReady]: Method called!!');
        setTimeout(() => callback(configurationData));
    },
    // This method is used by the library to retrieve information about a specific symbol 
    // (exchange, price scale, full symbol etc.).
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) =>{
        console.log('[resolveSymbol]: Method called!!', symbolName); 

         // const response = await axios.get(url); 
        // const coin = response.data.data.ethereum.dexTrades[0].baseCurrency; 
        // console.log(response.data.data.ethereum.dexTrades[0].quotePrice); 
        //console.log(response.data.data.ethereum.dexTrades[0].baseCurrency); 
        // console.log(response);
        // const coin = response.data.data.ethereum.dexTrades[0].baseCurrency; 
        // console.log('coin',coin);
        // if(!coin){
        //     onResolveErrorCallback(); 
        // }else{)

        const symbol = {
            ticker: symbolName,
            name: `Hexachain Token BSC/HEXA`,
            session: '24x7',
            timezone: 'Etc/UTC',
            minmov: 1,
            type: "crypto",
            force_session_rebuild: true,
            format: "price",
            pricescale: 1000000000000000,
            intraday_multipliers: ['1', '5', '10', '15', '30', '60'],
            has_seconds: true,
            has_daily: true,
            has_empty_bars: true,
            has_intraday: true,
            has_no_volume: false,
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions, 
            volume_precision: 1,
            data_status: 'streaming',
        }
        onSymbolResolvedCallback(symbol);
    }, 
    // This method is used by the charting library to get historical data for the symbol. 
    getBars: async(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        let t = { from: periodParams.from, to: periodParams.to }; // Define the 't' variable here

        if (resolution==='1D') {
            resolution = 1440;
        }
        
        historyProvider.getBars(symbolInfo, resolution, t)
            .then(bars => {
                if (bars.length) {
                    onHistoryCallback(bars, {
                        noData: true
                    })
                } else {
                    onHistoryCallback(bars, {
                        noData: true
                    })
                }
            })
            .catch(err => {
                console.log(err);
                onErrorCallback(err);
            });
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeID, onResetCacheNeededCallback)=>{},
    unsubscribeBars: (subscribeID)=>{}
};

export default datafeedConfig;
