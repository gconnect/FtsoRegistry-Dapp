"use client"; 
import { useEffect, useState } from "react"
import { getSupportedSymbols, getPriceWithDecimals } from "./utils/interact";

export default function Home() {

  const [balance, setBalance] = useState(0);
  const [symbols, setSymbols] = useState([])
  const [pricelist, setPriceList] = useState<any[]>([])

 

  useEffect(() =>{
    const getLatestPrice = async (symbol: string) => {
      const {latestPrice, formattedDate} = await getPriceWithDecimals(symbol)
      return latestPrice
    }

    const getSymbols = async () => {
      let latestPriceList: any = []
      const supportedSymbols = await getSupportedSymbols()
      setSymbols(supportedSymbols)

      supportedSymbols.forEach((item: any) => {
      const price =  getLatestPrice(item)
      latestPriceList.push(price)
      setPriceList(latestPriceList)
      })
    }
    getSymbols()
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl pb-4">FTSO Registry Price Feeds</h1>
        <table className="border border-1 text-lg">
          <th className="border border-1 p-2">S/N</th>
          <th className="border border-1 p-2 ">Symbol</th>
          <th className="border border-1">Price</th>
          {symbols.map((item, index) =>
           <tr className="border border-1 p-2" key={index}>
            <td className="border border-1 p-2">{index + 1}</td>
            <td className="border border-1 p-2">{item}</td>
            <td className="border border-1 p-2">{pricelist[index]}</td>
         </tr>
          )}
         
        </table>
      </div>
    </main>
  )
}
