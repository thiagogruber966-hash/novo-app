"use client"

import { useState, useEffect } from 'react'
import { Search, TrendingUp, TrendingDown, DollarSign, Bitcoin, Activity, Star, Eye, EyeOff, RefreshCw, ArrowUpRight, ArrowDownRight, Zap, Target, Award, Calendar, Plus, Minus, BarChart3, PieChart, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Dados mock das criptomoedas
const cryptoData = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250.75,
    change24h: 2.45,
    change7d: -1.23,
    marketCap: 847500000000,
    volume24h: 28500000000,
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    rank: 1,
    supply: 19600000,
    maxSupply: 21000000,
    dominance: 52.3
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2650.30,
    change24h: -0.85,
    change7d: 3.12,
    marketCap: 318700000000,
    volume24h: 15200000000,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    rank: 2,
    supply: 120280000,
    maxSupply: null,
    dominance: 19.7
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    price: 315.80,
    change24h: 1.75,
    change7d: -2.45,
    marketCap: 47200000000,
    volume24h: 1800000000,
    image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    rank: 3,
    supply: 149500000,
    maxSupply: 200000000,
    dominance: 2.9
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.45,
    change24h: 5.23,
    change7d: 8.76,
    marketCap: 42800000000,
    volume24h: 2100000000,
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    rank: 4,
    supply: 434800000,
    maxSupply: null,
    dominance: 2.6
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.485,
    change24h: -1.25,
    change7d: 4.32,
    marketCap: 17200000000,
    volume24h: 420000000,
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    rank: 5,
    supply: 35400000000,
    maxSupply: 45000000000,
    dominance: 1.1
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.082,
    change24h: 3.45,
    change7d: -0.87,
    marketCap: 11700000000,
    volume24h: 680000000,
    image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    rank: 6,
    supply: 142800000000,
    maxSupply: null,
    dominance: 0.7
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.875,
    change24h: 2.15,
    change7d: 6.43,
    marketCap: 8100000000,
    volume24h: 340000000,
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    rank: 7,
    supply: 9260000000,
    maxSupply: 10000000000,
    dominance: 0.5
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.25,
    change24h: -0.95,
    change7d: 2.18,
    marketCap: 8000000000,
    volume24h: 280000000,
    image: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    rank: 8,
    supply: 561500000,
    maxSupply: 1000000000,
    dominance: 0.5
  }
]

// Dados mock do portfólio
const portfolioData = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 0.25,
    avgPrice: 41200,
    currentPrice: 43250.75,
    value: 10812.69,
    pnl: 512.69,
    pnlPercent: 4.98
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 2.5,
    avgPrice: 2500,
    currentPrice: 2650.30,
    value: 6625.75,
    pnl: 375.75,
    pnlPercent: 6.01
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    amount: 50,
    avgPrice: 85,
    currentPrice: 98.45,
    value: 4922.50,
    pnl: 672.50,
    pnlPercent: 15.82
  }
]

// Dados mock de valores mensais
const monthlyData = [
  {
    month: 'Janeiro 2024',
    totalValue: 18500.25,
    change: 12.5,
    volume: 45200000000,
    topPerformer: { name: 'Solana', symbol: 'SOL', change: 28.4 },
    worstPerformer: { name: 'Cardano', symbol: 'ADA', change: -8.2 }
  },
  {
    month: 'Fevereiro 2024',
    totalValue: 21200.80,
    change: 14.6,
    volume: 52800000000,
    topPerformer: { name: 'Bitcoin', symbol: 'BTC', change: 18.7 },
    worstPerformer: { name: 'BNB', symbol: 'BNB', change: -5.1 }
  },
  {
    month: 'Março 2024',
    totalValue: 19850.45,
    change: -6.4,
    volume: 48100000000,
    topPerformer: { name: 'Ethereum', symbol: 'ETH', change: 15.2 },
    worstPerformer: { name: 'Dogecoin', symbol: 'DOGE', change: -12.8 }
  },
  {
    month: 'Abril 2024',
    totalValue: 22360.94,
    change: 12.6,
    volume: 56700000000,
    topPerformer: { name: 'Solana', symbol: 'SOL', change: 22.1 },
    worstPerformer: { name: 'Polygon', symbol: 'MATIC', change: -3.4 }
  },
  {
    month: 'Maio 2024',
    totalValue: 20890.32,
    change: -6.6,
    volume: 51200000000,
    topPerformer: { name: 'Chainlink', symbol: 'LINK', change: 9.8 },
    worstPerformer: { name: 'Bitcoin', symbol: 'BTC', change: -11.2 }
  },
  {
    month: 'Junho 2024',
    totalValue: 24150.67,
    change: 15.6,
    volume: 62400000000,
    topPerformer: { name: 'Ethereum', symbol: 'ETH', change: 25.3 },
    worstPerformer: { name: 'Cardano', symbol: 'ADA', change: -2.1 }
  }
]

// Dados mock de notícias
const newsData = [
  {
    id: 1,
    title: "Bitcoin atinge novo recorde histórico acima de $43.000",
    summary: "A principal criptomoeda do mundo continua sua trajetória ascendente com forte demanda institucional.",
    time: "2 horas atrás",
    category: "Bitcoin",
    sentiment: "positive"
  },
  {
    id: 2,
    title: "Ethereum prepara nova atualização para reduzir taxas",
    summary: "A rede Ethereum planeja implementar melhorias significativas no próximo trimestre.",
    time: "4 horas atrás",
    category: "Ethereum",
    sentiment: "positive"
  },
  {
    id: 3,
    title: "Regulamentação de criptomoedas ganha força no Brasil",
    summary: "Banco Central anuncia novas diretrizes para exchanges e carteiras digitais.",
    time: "6 horas atrás",
    category: "Regulamentação",
    sentiment: "neutral"
  },
  {
    id: 4,
    title: "Solana registra crescimento de 8% em volume de transações",
    summary: "A blockchain Solana continua ganhando tração com novos projetos DeFi.",
    time: "8 horas atrás",
    category: "Solana",
    sentiment: "positive"
  }
]

export default function CryptoApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [favorites, setFavorites] = useState<string[]>(['bitcoin', 'ethereum'])
  const [showBalance, setShowBalance] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const filteredCryptos = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(4)}`
    }
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  const getTotalPortfolioValue = () => {
    return portfolioData.reduce((total, asset) => total + asset.value, 0)
  }

  const getTotalPnL = () => {
    return portfolioData.reduce((total, asset) => total + asset.pnl, 0)
  }

  const getTotalPnLPercent = () => {
    const totalValue = getTotalPortfolioValue()
    const totalCost = portfolioData.reduce((total, asset) => total + (asset.amount * asset.avgPrice), 0)
    return totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0
  }

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div 
      className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Header - Mobile Optimized */}
      <header className="bg-gradient-to-r from-slate-900/95 to-gray-900/95 backdrop-blur-sm border-b border-purple-500/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Title and Refresh */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent flex items-center gap-2">
                  <Bitcoin className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                  CryptoTracker
                </h1>
                <p className="text-gray-300 mt-1 text-sm sm:text-base lg:text-lg">Acompanhe suas criptomoedas em tempo real</p>
              </div>
              
              <Button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg self-start sm:self-auto"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Atualizar</span>
                <span className="sm:hidden">Refresh</span>
              </Button>
            </div>
            
            {/* Search - Full width on mobile */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                type="text"
                placeholder="Buscar criptomoeda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400/20 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <Tabs defaultValue="mercado" className="w-full">
          {/* Mobile-First Tab Navigation */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6 sm:mb-8 bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 h-auto p-1">
            <TabsTrigger value="mercado" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Mercado</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3">
              <PieChart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Portfólio</span>
            </TabsTrigger>
            <TabsTrigger value="mensal" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Mensal</span>
            </TabsTrigger>
            <TabsTrigger value="favoritos" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Favoritos</span>
            </TabsTrigger>
            <TabsTrigger value="noticias" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white text-xs sm:text-sm py-2 sm:py-3">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Notícias</span>
            </TabsTrigger>
          </TabsList>

          {/* Aba do Mercado */}
          <TabsContent value="mercado">
            <div className="space-y-6 sm:space-y-8">
              {/* Market Overview Cards - Mobile Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <Card className="bg-gradient-to-br from-orange-600 to-yellow-600 text-white border-0 shadow-2xl">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                    <CardTitle className="text-sm sm:text-lg font-semibold flex items-center gap-1 sm:gap-2">
                      <DollarSign className="w-3 h-3 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Market Cap Total</span>
                      <span className="sm:hidden">Market Cap</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="text-xl sm:text-3xl font-bold mb-1">
                      $1.62T
                    </div>
                    <div className="text-orange-100 text-xs sm:text-sm flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      +2.4% 24h
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                    <CardTitle className="text-sm sm:text-lg font-semibold flex items-center gap-1 sm:gap-2">
                      <Activity className="w-3 h-3 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Volume 24h</span>
                      <span className="sm:hidden">Volume</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="text-xl sm:text-3xl font-bold mb-1">
                      $48.2B
                    </div>
                    <div className="text-purple-100 text-xs sm:text-sm flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      -1.2% 24h
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-0 shadow-2xl">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                    <CardTitle className="text-sm sm:text-lg font-semibold flex items-center gap-1 sm:gap-2">
                      <Bitcoin className="w-3 h-3 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">BTC Dominance</span>
                      <span className="sm:hidden">BTC Dom.</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="text-xl sm:text-3xl font-bold mb-1">
                      52.3%
                    </div>
                    <div className="text-blue-100 text-xs sm:text-sm">
                      Estável
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-600 to-green-600 text-white border-0 shadow-2xl">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                    <CardTitle className="text-sm sm:text-lg font-semibold flex items-center gap-1 sm:gap-2">
                      <Target className="w-3 h-3 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Altcoins</span>
                      <span className="sm:hidden">Alts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="text-xl sm:text-3xl font-bold mb-1">
                      47.7%
                    </div>
                    <div className="text-emerald-100 text-xs sm:text-sm flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      +0.8% 24h
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Crypto List */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 text-white">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                    Top Criptomoedas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-purple-500/20">
                          <th className="text-left py-3 px-4 text-gray-300">#</th>
                          <th className="text-left py-3 px-4 text-gray-300">Nome</th>
                          <th className="text-left py-3 px-4 text-gray-300">Preço</th>
                          <th className="text-left py-3 px-4 text-gray-300 hidden sm:table-cell">24h</th>
                          <th className="text-left py-3 px-4 text-gray-300 hidden md:table-cell">7d</th>
                          <th className="text-left py-3 px-4 text-gray-300 hidden lg:table-cell">Market Cap</th>
                          <th className="text-left py-3 px-4 text-gray-300"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCryptos.map((crypto) => (
                          <tr key={crypto.id} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                            <td className="py-3 px-4 text-gray-300">{crypto.rank}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                                  <span className="text-xs sm:text-sm font-bold text-white">
                                    {crypto.symbol.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-semibold text-white text-xs sm:text-sm">{crypto.name}</div>
                                  <div className="text-gray-400 text-xs">{crypto.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-semibold text-white text-xs sm:text-sm">
                              {formatPrice(crypto.price)}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <span className={`flex items-center gap-1 text-xs sm:text-sm ${
                                crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {crypto.change24h >= 0 ? (
                                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                {Math.abs(crypto.change24h).toFixed(2)}%
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className={`flex items-center gap-1 text-xs sm:text-sm ${
                                crypto.change7d >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {crypto.change7d >= 0 ? (
                                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                {Math.abs(crypto.change7d).toFixed(2)}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300 text-xs sm:text-sm hidden lg:table-cell">
                              {formatMarketCap(crypto.marketCap)}
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(crypto.id)}
                                className="p-1 hover:bg-purple-500/20"
                              >
                                <Star 
                                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                    favorites.includes(crypto.id) 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-400'
                                  }`} 
                                />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba do Portfólio */}
          <TabsContent value="portfolio">
            <div className="space-y-6 sm:space-y-8">
              {/* Portfolio Summary */}
              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                    <span className="flex items-center gap-2">
                      <PieChart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Meu Portfólio
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-white hover:bg-white/20"
                    >
                      {showBalance ? (
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <p className="text-purple-100 text-xs sm:text-sm mb-1">Valor Total</p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {showBalance ? `$${getTotalPortfolioValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-100 text-xs sm:text-sm mb-1">P&L Total</p>
                      <p className={`text-xl sm:text-2xl font-bold flex items-center gap-1 ${
                        getTotalPnL() >= 0 ? 'text-green-200' : 'text-red-200'
                      }`}>
                        {getTotalPnL() >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                        {showBalance ? `$${Math.abs(getTotalPnL()).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-100 text-xs sm:text-sm mb-1">P&L %</p>
                      <p className={`text-xl sm:text-2xl font-bold ${
                        getTotalPnLPercent() >= 0 ? 'text-green-200' : 'text-red-200'
                      }`}>
                        {showBalance ? `${getTotalPnLPercent() >= 0 ? '+' : ''}${getTotalPnLPercent().toFixed(2)}%` : '••••••'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Assets */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 text-white">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    Meus Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                    {portfolioData.map((asset) => (
                      <div key={asset.id} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                            <span className="text-sm sm:text-base font-bold text-white">
                              {asset.symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm sm:text-base">{asset.name}</div>
                            <div className="text-gray-400 text-xs sm:text-sm">
                              {asset.amount} {asset.symbol}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-white text-sm sm:text-base">
                            {showBalance ? `$${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
                          </div>
                          <div className={`text-xs sm:text-sm flex items-center gap-1 justify-end ${
                            asset.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {asset.pnl >= 0 ? (
                              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                            {showBalance ? `${asset.pnlPercent >= 0 ? '+' : ''}${asset.pnlPercent.toFixed(2)}%` : '••••••'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add Asset Button */}
              <div className="text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg text-sm sm:text-base">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Adicionar Ativo
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Nova Aba Mensal */}
          <TabsContent value="mensal">
            <div className="space-y-6 sm:space-y-8">
              {/* Monthly Overview */}
              <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0 shadow-2xl">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    Análise Mensal - 2024
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <p className="text-cyan-100 text-xs sm:text-sm mb-1">Melhor Mês</p>
                      <p className="text-xl sm:text-2xl font-bold">Junho</p>
                      <p className="text-cyan-200 text-xs">+15.6% crescimento</p>
                    </div>
                    <div>
                      <p className="text-cyan-100 text-xs sm:text-sm mb-1">Volume Médio</p>
                      <p className="text-xl sm:text-2xl font-bold">$52.7B</p>
                      <p className="text-cyan-200 text-xs">por mês</p>
                    </div>
                    <div>
                      <p className="text-cyan-100 text-xs sm:text-sm mb-1">Crescimento Anual</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-200">+30.5%</p>
                      <p className="text-cyan-200 text-xs">acumulado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Performance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {monthlyData.map((month, index) => (
                  <Card key={index} className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 text-white hover:bg-slate-900/70 transition-colors">
                    <CardHeader className="p-4 sm:p-6 pb-3">
                      <CardTitle className="text-sm sm:text-base font-semibold text-cyan-300">
                        {month.month}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                      {/* Valor Total */}
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Valor Total do Mercado</p>
                        <p className="text-lg sm:text-xl font-bold text-white">
                          ${month.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <div className={`flex items-center gap-1 text-xs ${
                          month.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {month.change >= 0 ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {Math.abs(month.change).toFixed(1)}% vs mês anterior
                        </div>
                      </div>

                      {/* Volume */}
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Volume Mensal</p>
                        <p className="text-sm font-semibold text-gray-200">
                          {formatMarketCap(month.volume)}
                        </p>
                      </div>

                      {/* Top Performer */}
                      <div className="bg-green-500/10 p-3 rounded-lg">
                        <p className="text-green-400 text-xs mb-1 font-medium">🏆 Melhor Performance</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-semibold">
                            {month.topPerformer.name}
                          </span>
                          <span className="text-green-400 text-sm font-bold">
                            +{month.topPerformer.change}%
                          </span>
                        </div>
                      </div>

                      {/* Worst Performer */}
                      <div className="bg-red-500/10 p-3 rounded-lg">
                        <p className="text-red-400 text-xs mb-1 font-medium">📉 Pior Performance</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-semibold">
                            {month.worstPerformer.name}
                          </span>
                          <span className="text-red-400 text-sm font-bold">
                            {month.worstPerformer.change}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Monthly Insights */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 text-white">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    Insights Mensais
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-cyan-300 mb-3">Tendências Observadas</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Junho foi o melhor mês com crescimento de 15.6%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>Solana teve as melhores performances em Jan e Abr</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Volume médio mensal cresceu 18% no semestre</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Ethereum mostrou consistência com 2 meses de destaque</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-300 mb-3">Próximas Projeções</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Julho pode seguir tendência positiva de Junho</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-400 mt-1">•</span>
                          <span>Bitcoin pode retomar dominância no próximo trimestre</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>Volume institucional deve aumentar no H2</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>Altcoins podem ter correção saudável</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba dos Favoritos */}
          <TabsContent value="favoritos">
            <div className="space-y-6 sm:space-y-8">
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 text-white">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    Criptomoedas Favoritas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {favorites.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-purple-500/20">
                            <th className="text-left py-3 px-4 text-gray-300">Nome</th>
                            <th className="text-left py-3 px-4 text-gray-300">Preço</th>
                            <th className="text-left py-3 px-4 text-gray-300 hidden sm:table-cell">24h</th>
                            <th className="text-left py-3 px-4 text-gray-300 hidden md:table-cell">7d</th>
                            <th className="text-left py-3 px-4 text-gray-300"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cryptoData
                            .filter(crypto => favorites.includes(crypto.id))
                            .map((crypto) => (
                              <tr key={crypto.id} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                                      <span className="text-xs sm:text-sm font-bold text-white">
                                        {crypto.symbol.charAt(0)}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="font-semibold text-white text-xs sm:text-sm">{crypto.name}</div>
                                      <div className="text-gray-400 text-xs">{crypto.symbol}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4 font-semibold text-white text-xs sm:text-sm">
                                  {formatPrice(crypto.price)}
                                </td>
                                <td className="py-3 px-4 hidden sm:table-cell">
                                  <span className={`flex items-center gap-1 text-xs sm:text-sm ${
                                    crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    {crypto.change24h >= 0 ? (
                                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    ) : (
                                      <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    )}
                                    {Math.abs(crypto.change24h).toFixed(2)}%
                                  </span>
                                </td>
                                <td className="py-3 px-4 hidden md:table-cell">
                                  <span className={`flex items-center gap-1 text-xs sm:text-sm ${
                                    crypto.change7d >= 0 ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    {crypto.change7d >= 0 ? (
                                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    ) : (
                                      <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    )}
                                    {Math.abs(crypto.change7d).toFixed(2)}%
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleFavorite(crypto.id)}
                                    className="p-1 hover:bg-purple-500/20"
                                  >
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 p-4 sm:p-6">
                      <Star className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-4">
                        Você ainda não tem criptomoedas favoritas
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Clique na estrela ao lado de qualquer criptomoeda para adicioná-la aos favoritos
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba das Notícias */}
          <TabsContent value="noticias">
            <div className="space-y-6 sm:space-y-8">
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 text-white">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    Últimas Notícias
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  {newsData.map((news) => (
                    <div key={news.id} className="p-4 sm:p-6 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm sm:text-base mb-2 line-clamp-2">
                            {news.title}
                          </h3>
                          <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 mb-3">
                            {news.summary}
                          </p>
                        </div>
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 mt-2 ${
                          news.sentiment === 'positive' ? 'bg-green-400' :
                          news.sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                        }`} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                          {news.category}
                        </Badge>
                        <span className="text-gray-400 text-xs">
                          {news.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}