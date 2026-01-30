# TradingView Charts - Editor Guide

## Overview
Finscann now supports embedded TradingView charts in articles. You can add live, interactive stock/commodity charts by using a simple placeholder syntax in your article content.

## How to Add Charts

### Basic Syntax
To add a chart, use the following format in your article's **summary** or **synopsis** field:

```
{{CHART:EXCHANGE:SYMBOL}}
```

### Important Rules
1. **Always use UPPERCASE** - The placeholder is case-sensitive
2. **No spaces** - Don't add spaces inside the curly braces
3. **Exchange prefix required** - Always include the exchange (NSE, BSE, MCX, etc.)
4. **Valid symbols only** - Use TradingView's official symbols

## Valid Symbol Examples

### NSE (National Stock Exchange) - Stocks
```
{{CHART:NSE:HDFCBANK}}    ✅ HDFC Bank
{{CHART:NSE:RELIANCE}}    ✅ Reliance Industries
{{CHART:NSE:TCS}}         ✅ Tata Consultancy Services
{{CHART:NSE:INFY}}        ✅ Infosys
{{CHART:NSE:WIPRO}}       ✅ Wipro
{{CHART:NSE:ITC}}         ✅ ITC Limited
{{CHART:NSE:SBIN}}        ✅ State Bank of India
{{CHART:NSE:ICICIBANK}}   ✅ ICICI Bank
{{CHART:NSE:AXISBANK}}    ✅ Axis Bank
{{CHART:NSE:BHARTIARTL}}  ✅ Bharti Airtel
```

### NSE - Indices
```
{{CHART:NSE:NIFTY}}       ✅ Nifty 50
{{CHART:NSE:BANKNIFTY}}   ✅ Bank Nifty
{{CHART:NSE:FINNIFTY}}    ✅ Fin Nifty
```

### BSE (Bombay Stock Exchange)
```
{{CHART:BSE:SENSEX}}      ✅ BSE Sensex
```

### MCX (Multi Commodity Exchange)
```
{{CHART:MCX:GOLD1!}}      ✅ Gold Futures
{{CHART:MCX:SILVER1!}}    ✅ Silver Futures
{{CHART:MCX:CRUDEOIL1!}}  ✅ Crude Oil Futures
{{CHART:MCX:NATURALGAS1!}}✅ Natural Gas Futures
{{CHART:MCX:COPPER1!}}    ✅ Copper Futures
```

### Global Markets
```
{{CHART:NASDAQ:AAPL}}     ✅ Apple Inc.
{{CHART:NASDAQ:GOOGL}}    ✅ Google/Alphabet
{{CHART:NASDAQ:MSFT}}     ✅ Microsoft
{{CHART:NYSE:TSLA}}       ✅ Tesla
{{CHART:BINANCE:BTCUSDT}} ✅ Bitcoin/USDT
```

## Example Article Content

### Stock News Example
```markdown
HDFC Bank reported strong quarterly results with a 20% YoY growth in net profit.

{{CHART:NSE:HDFCBANK}}

The bank's stock has been on an upward trajectory, benefiting from improved asset quality and higher interest margins.

Key highlights:
- Net profit: ₹16,512 crore
- NII growth: 18%
- Asset quality improvement
```

### Commodity News Example
```markdown
Gold prices surged to a new high amid global uncertainty.

{{CHART:MCX:GOLD1!}}

The precious metal has gained 5% this month as investors seek safe-haven assets.
```

### Multiple Charts (Use Sparingly)
```markdown
Market Overview: Nifty and Bank Nifty showed divergence today.

{{CHART:NSE:NIFTY}}

While Nifty remained flat, Bank Nifty outperformed.

{{CHART:NSE:BANKNIFTY}}

Banking stocks led the gains with HDFC Bank and ICICI Bank up 2%.
```

## Common Mistakes to Avoid

### ❌ WRONG - Lowercase
```
{{chart:nse:hdfcbank}}    ❌ Won't work
{{CHART:nse:hdfcbank}}    ❌ Won't work
```

### ❌ WRONG - Spaces
```
{{ CHART:NSE:HDFCBANK }}  ❌ Won't work
{{CHART: NSE:HDFCBANK}}   ❌ Won't work
```

### ❌ WRONG - Missing Exchange
```
{{CHART:HDFCBANK}}        ❌ Won't work
```

### ❌ WRONG - Invalid Symbol
```
{{CHART:NSE:RANDOMXYZ}}   ❌ Symbol doesn't exist
```

### ✅ CORRECT
```
{{CHART:NSE:HDFCBANK}}    ✅ Perfect!
```

## Best Practices

### 1. Placement
- Place charts **after** introducing the topic
- Don't start an article with a chart
- Add context before and after the chart

### 2. Relevance
- Only add charts that are **directly relevant** to the article
- For a stock-specific article, use that stock's chart
- For index news, use index charts (NIFTY, BANKNIFTY)
- For commodity news, use commodity charts

### 3. Quantity
- **One chart per article** is usually sufficient
- Maximum **two charts** for comparative analysis
- Avoid chart overload

### 4. Symbol Verification
Before publishing:
1. Visit [TradingView](https://www.tradingview.com)
2. Search for your symbol
3. Verify it exists
4. Copy the exact format shown in the URL

## Chart Features

The embedded charts include:
- ✅ Real-time price data
- ✅ Interactive zoom and pan
- ✅ Technical indicators
- ✅ Multiple timeframes (Daily default)
- ✅ User can switch symbols
- ✅ Mobile responsive

The charts do NOT include:
- ❌ Intraday timeframes (prevents day trading)
- ❌ Comparison tools
- ❌ Screenshot functionality
- ❌ Save/load layouts

## Testing Your Charts

### After Adding a Chart Placeholder:
1. Save the article as draft
2. Preview the article
3. Verify the chart loads correctly
4. Check the symbol is correct
5. Ensure the chart is relevant

### If Chart Doesn't Load:
- Check for typos in the placeholder
- Verify symbol exists on TradingView
- Ensure UPPERCASE format
- Check for extra spaces
- Verify exchange prefix is correct

## Symbol Lookup Guide

### How to Find TradingView Symbols:
1. Go to https://www.tradingview.com
2. Search for your stock/commodity
3. The symbol appears in the URL
   - Example: `https://www.tradingview.com/symbols/NSE-HDFCBANK/`
   - Use: `{{CHART:NSE:HDFCBANK}}`

### For NSE Stocks:
- Format: `NSE:STOCKSYMBOL`
- Example: HDFC Bank → `NSE:HDFCBANK`

### For MCX Commodities:
- Format: `MCX:COMMODITY1!`
- Note the `1!` suffix for futures
- Example: Gold → `MCX:GOLD1!`

## Troubleshooting

### Problem: Chart shows "Symbol not found"
**Solution:**
- Verify symbol exists on TradingView
- Check spelling
- Try without exchange prefix on TradingView first

### Problem: Chart doesn't render
**Solution:**
- Check placeholder syntax (must be exact)
- Clear browser cache
- Check browser console for errors

### Problem: Wrong chart appears
**Solution:**
- Double-check symbol spelling
- Verify exchange prefix (NSE vs BSE)
- Confirm symbol on TradingView.com

## Support

For technical issues or questions about chart integration:
- Contact: finscannquery@gmail.com
- Subject: "TradingView Chart Support"

---

**Remember:** Charts enhance articles but don't replace quality content. Always provide context, analysis, and insights alongside the charts.
