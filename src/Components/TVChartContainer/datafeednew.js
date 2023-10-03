import axios from 'axios'; 
import * as Bitquery from './bitquery';

const lastBarsCache = new Map(); 
const configurationData = {
    supported_resolutions: ['1','5','15','30', '60','1D', '1W', '1M']
}; 
    
export default {
    onReady: (callback) => {
      console.log("[onReady]: Method call");
      callback({});
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      console.log("[searchSymbols]: Method call");
    },
    resolveSymbol: (
      symbolName,
      onSymbolResolvedCallback,
      onResolveErrorCallback
    ) => {
      console.log("[resolveSymbol]: Method call", symbolName);
    },
    getBars: async (
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) => {
     
    },
    subscribeBars: (
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    ) => {
      console.log(
        "[subscribeBars]: Method call with subscribeUID:",
        subscribeUID
      );
    },
    unsubscribeBars: (subscriberUID) => {
      console.log(
        "[unsubscribeBars]: Method call with subscriberUID:",
        subscriberUID
      );
    },
  };