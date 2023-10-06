interface IFtsoRegistry { 

    // Returns the list of supported symbols like BTC, ETH, FLR... 
    /**
     * @dev Returns `_supportedSymbols`, An array of strings representing the supported symbols.
     */
    function getSupportedSymbols() 
        external 
        view 
        returns( 
            string[] memory _supportedSymbols
        ); 

    // Returns USD price of the requested symbol, which must be divided by
    // the returned number of decimals, e.g., if decimals is 5, a price of 
    // 1234 actually means 0.01234

    /**
     * @dev Sets `_symbol` A string representing the symbol for which the price is requested (e.g., "BTC" for Bitcoin).
     * Returns `_price` An unsigned integer representing the current price of the symbol, 
     * `_timestamp` An unsigned integer representing the timestamp of the price data and
     *  `_assetPriceUsdDecimals` An unsigned integer specifying the number of decimals to divide _price to get the actual USD value
     */
    function getCurrentPriceWithDecimals(string memory _symbol) 
        external view 
        returns( 
            uint256 _price, 
            uint256 _timestamp, 
            uint256 _assetPriceUsdDecimals
        ); 
} 


//
