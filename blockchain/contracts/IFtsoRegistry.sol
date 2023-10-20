// IFtsoRegistry Solidity API Interface
interface IFtsoRegistry {
    // Returns the list of supported symbols like BTC, ETH, FLR...
    // @return _supportedSymbols An array of supported symbols
    // @dev This function doesn't revert.

    function getSupportedSymbols() external view returns (string[] memory _supportedSymbols);

    // Returns USD price of the requested symbol, which must be divided by
    // the returned number of decimals, e.g., if decimals is 5, a price of
    // 1234 actually means 0.01234
    // @param _symbol The symbol of the asset to query, e.g., "BTC" or "ETH"
    // @return _price The USD price of the requested symbol
    // @return _timestamp The timestamp when the price information was recorded
    // @return _assetPriceUsdDecimals The number of decimals for the asset's price
    // @dev Method Revert: This function can revert in the following scenarios:
       // If the requested symbol does not exist or is not supported.
       // If there is an issue with retrieving the price data.
        // If the provided _symbol parameter is empty or invalid.
    // @dev The `_timestamp` is in Unix timestamp format (seconds since epoch).
    // @dev Special Values: _symbol: This parameter should contain the symbol for the asset you want to query, such as "BTC" or "ETH."
      // _price: The _price value represents the USD price of the requested symbol. 
     // The actual price is obtained by dividing this value by 10^_assetPriceUsdDecimals. For example, if _price is 1234 and _assetPriceUsdDecimals is 2, the actual price is 12.34 USD..
    function getCurrentPriceWithDecimals(string memory _symbol)
        external
        view
        returns (
            uint256 _price,
            uint256 _timestamp,
            uint256 _assetPriceUsdDecimals
        );
}





