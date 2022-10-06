/* API Classes */
export interface FiscalYear {
    year: string;
    balanceSheet: BalanceSheet;
    incomeSheet: IncomeSheet;
    cashflowSheet: CashflowSheet;
}

export interface BalanceSheet {
    totalAssets1: number;
    cashEqSti: number;
    cashEq: number;
    sti: number;
    acctsRec: number;
    acctsRecNet: number;
    notesRecNet: number;
    inv: number;
    rawMat: number;
    wip: number;
    finGoods: number;
    othInv: number;
    othStAssets: number;
    derivHedgeAssets1: number;
    taxesReciev: number;
    miscStAssets: number;
    totalCurrAssets: number;
    ppeNet: number;
    ppe: number;
    accDeprec: number;
    ltiReceivables: number;
    ltInvest: number;
    othLtAssets: number;
    totalIntAssets: number;
    goodwill: number;
    othIntAssets: number;
    prepaidExp: number;
    deffTaxAssets: number;
    derivHedgeAssets2: number;
    miscAssets: number;
    totalNonCurrAssets: number;
    totalAssets2: number;
    payablesAccruals: number;
    payables: number;
    accruedTaxes: number;
    intDivsPayables: number;
    othPayablesAccurals: number;
    stDebt: number;
    stBorrowings: number;
    stFinLeases: number;
    stOpLeases: number;
    currLtDebt: number;
    othStLiab: number;
    deffRev1: number;
    derivHedge1: number;
    miscStLiab: number;
    totalCurrLiab: number;
    ltDebt: number;
    ltBorrow: number;
    ltFinLeases: number;
    ltOpLeases: number;
    othLtLiab: number;
    accuredLiab: number;
    pensionLiab: number;
    pensions: number;
    othPostRetBen: number;
    deffRev2: number;
    defTabLiab: number;
    derivHedge: number;
    miscLtLiab: number;
    totalNonCurrLiab: number;
    totalLiab: number;
    prefEquityHybridCap: number;
    shareCapApic: number;
    commonStock: number;
    addPaidCap: number;
    treasuryStock: number;
    re: number;
    othEquity: number;
    equityBeforeMinInt: number;
    minNonControlInt: number;
    totalEquity: number;
    liabAndEquity: number;
}

export interface IncomeSheet {
    rev: number;
    salesServRev: number;
    otherRev: number;
    costOfRev: number;
    cogs: number;
    proft: number;
    otherProfit: number;
    opExp: number;
    sgAndAdmin: number;
    sellAndMark: number;
    genAndAdmin: number;
    rAndD: number;
    depAmort: number;
    othOpExp: number;
    opIncLoss: number;
    nonOpIncLoss: number;
    netIntExp: number;
    intExp: number;
    intInc: number;
    forex: number;
    affiliates: number;
    nonOpInc: number;
    pretaxIncome: number;
    currIncTax: number;
    IncTax: number;
    contOps: number;
    netExtra1: number;
    discOps: number;
    acctChng: number;
    incomeMi: number;
    minInterest: number;
    niInc: number;
    prefDivs: number;
    othAdj: number;
    niAvailCommonGaap: number;
    niAvailCommonAdj: number;
    netAbnormal: number;
    netExtra2: number;
    basicWeightAvgShares: number;
    dilWeightAvgShares: number;
}

export interface CashflowSheet {
    niCf: number;
    depreAmort: number;
    nonCashItems: number;
    stockComp: number;
    defIntComp: number;
    othNonCashAdj: number;
    chgNonCashOp: number;
    chgAcctsRec: number;
    chgInventories: number;
    chgAcctsPayable: number;
    chgOther: number;
    netCashDiscOps1: number;
    cashOpAct: number;
    cashInvestAct1: number;
    chgFixedIntang: number;
    dispFixedIntang: number;
    dispFixedProdAssets: number;
    dispIntagAssets: number;
    acqFixedIntag: number;
    acqFixedProdAssets: number;
    acqIntagAssets: number;
    netChgLtInvest: number;
    decLtInvest: number;
    incLtInvest: number;
    netCashAcqDiv: number;
    cashDivest: number;
    cashAcqSubs: number;
    cashJvs: number;
    othInvestAct: number;
    netCashDiscOps2: number;
    cashInvestAct2: number;
    cashFinAct1: number;
    divsPaid: number;
    cashRepayDebt: number;
    cashStDebt: number;
    cashLtDebt: number;
    repayLtDebt: number;
    cashRepurchEquity: number;
    incCapitalStock: number;
    decCapitalStock: number;
    othFinAct: number;
    netCashDiscOps3: number;
    cashFinAct2: number;
    effectForexRates: number;
    netChgCash: number;
    cashPaidTaxes: number;
    cashPaidInt: number;
}

/* API calls */
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    result: {
        email: string,
        password: string,
        username: string,
        __v: number,
        _id: string
    };
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface SecuritysRequest {
    ticker: string;
}

export interface ReportedRequest {
    ticker: string;
}

export interface ReportedResponse {
    fiscalYears: FiscalYear[];
}

export interface GetScoreCardRequest {
    ticker: string;
}

export interface GetScoreCardResponse {
    FinancialHighlights: FinancialHighlights;
    Solvency: Solvency;
    CapitalStructure: CapitalStructure;
    AssetActivity: AssetActivity;
    LiabilityActivity: LiabilityActivity;
    ProfitabilityAndDividends: ProfitabilityAndDividends;
    Valuation: Valuation;
}

export interface FinancialHighlights {
    MarketPrice: number;
    DCFIntinsicValueNetIncome: number;
    DCFIntinsicValueEBIT: number;
    DCFIntinsicValueFCF: number;
    MarginOfSafetyNI: number;
    MarginOfSafetyNIRating: string;
    MarginOfSafetyEBIT: number;
    MarginOfSafetyEBITRating: string;
    MarginOfSafetyFCF: number;
    MarginOfSafetyFCFRating: string;
    PE: number;
    PERating: string;
    LiquidAssets: number;
    LiquidAssetsRating: string;
    EarningsPower: number;
    EarningsPowerRating: string;
    WeightAvgCostOfCapital: number;
    WeightAvgCostOfCapitalRating: string;
    SustainableGrowthRate: number;
    SustainableGrowthRateRating: string;
    CashConversionCycle: number;
    CashConversionCycleRating;
}

export interface Solvency {
    CashRatio: number;
    CashRatioRating: string;
    CashAndShortTermInvestments: number;
    CashAndShortTermInvestmentsRating: string;
    CashServiceRatio: number;
    CashServiceRatioRating: string;
    InterestServiceRatio: number;
    InterestServiceRatioRating: string;
    DebtServiceRatio: number;
    DebtServiceRatioRating: string;
    CashToShortTermDebtRatio: number;
    CashToShortTermDebtRatioRating: string;
    AcidTestRatio: number;
    AcidTestRatioRating: string;
    QuickRatioDef1: number;
    QuickRatioDef1Rating: string;
    QuickRatioDef2: number;
    QuickRatioDef2Rating: string;
    CurrentRatio: number;
    CurrentRatioRating: string;
    NetWorkingCapitalToAssets: number;
    NetWorkingCapitalToAssetsRating: string;
}

export interface CapitalStructure {
    ChangeInShortTermDebt;
    ChangeInShortTermDebtRating;
    ChangeInLongTermDebt: number;
    ChangeInLongTermDebtRating;
    ChangeInNetDebt: number;
    ChangeInNetDebtRating;
    NetDebt: number;
    NetDebtRating;
    ShortTermObligationsRatio: number;
    ShortTermObligationsRatioRating;
    LongTermDebtRatio: number;
    LongTermDebtRatioRating;
    DebtRatio: number;
    DebtRatioRating: string;
    DebtEquityRatio: number;
    DebtEquityRatioRating: string;
    FixedCoverageChargeRatio: number;
    FixedCoverageChargeRatioRating: string;
    DegreeOfCombinedLeverage: number;
    DegreeOfCombinedLeverageRating: string;
    DegreeOfOperatingLeverage: number;
    DegreeOfOperatingLeverageRating: string;
    DegreeOfFinancialLeverage: number;
    DegreeOfFinancialLeverageRating: string;
    DegreeOfFinancialLeverageRatio: number;
    DegreeOfFinancialLeverageRatioRating: string;
    FinancialLeverageRatio: number;
    FinancialLeverageRatioRating: string;
    EquityRatio: number;
    EquityRatioRating: string;
    EquityMultiplierDef1: number;
    EquityMultiplierDef1Rating: string;
    EquityMultiplierDef2: number;
    EquityMultiplierDef2Rating: string;
    NetAssetValue: number;
    NetAssetValueRating;
    EffectiveInterestRate: number;
    EffectiveInterestRateRating: string;
    DebtCostOfCapital: number;
    DebtCostOfCapitalRating: string;
    EquityCostOfCapital: number;
    EquityCostOfCapitalRating;
    WeightAvgCostOfCapital: number;
    WeightAvgCostOfCapitalRating: string;
}

export interface AssetActivity {
    SalesTurnover: number;
    SalesTurnoverRating: string;
    DaysSalesOutstanding: number;
    DaysSalesOutstandingRating: string;
    InventorySalesTurnover: number;
    InventorySalesTurnoverRating: string;
    DaysSalesInventory: number;
    DaysSalesInventoryRating: string;
    InventoryTurnoverCOGS: number;
    InventoryTurnoverCOGSRating: string;
    DaysInventoryOutstanding: number;
    DaysInventoryOutstandingRating: string;
    CreditorsTurnover: number;
    CreditorsTurnoverRating: string;
    CreditorsDaysOutstanding: number;
    CreditorsDaysOutstandingRating: string;
    AccountsReceivablesTurnover: number;
    AccountsReceivablesTurnoverRating: string;
    DaysReceivablesOutstanding: number;
    DaysReceivablesOutstandingRating: string;
    WorkingCapitalTurnover: number;
    WorkingCapitalTurnoverRating: string;
    DaysWorkingCapital: number;
    DaysWorkingCapitalRating: string;
    AssetTurnover: number;
    AssetTurnoverRating: string;
    AssetTurnRate: number;
    AssetTurnRateRating: string;
    LongTermAssetTurnover: number;
    LongTermAssetTurnoverRating: string;
    LongTermAssetRate: number;
    LongTermAssetRateRating: string;
    CashConversionCycle: number;
    CashConversionCycleRating;
    ReturnOnInvestments: number;
    ReturnOnInvestmentsRating: string;

}

export interface LiabilityActivity {
    PayablesTurnoverCOGS: number;
    PayablesTurnoverCOGSRating: string;
    COGSDaysPayablesOutstanding: number;
    COGSDaysPayablesOutstandingRating: string;
    COSPayablesTurnover: number;
    COSPayablesTurnoverRating: string;
    COSDaysPayablesOutstanding: number;
    COSDaysPayablesOutstandingRating: string;
    LiabilitiesTurnover: number;
    LiabilitiesTurnoverRating: string;
    LiabilitiesTurnoverRate: number;
    LiabilitiesTurnoverRateRating: string;
    ChangeInDebtObligations;
    ChangeInDebtObligationsRating;
    DebtorsPaybackPeriod: number;
    DebtorsPaybackPeriodRating: string;
    BurnRate;
    BurnRateRating: string;
}

export interface ProfitabilityAndDividends {
    Earnings: number;
    EarningsRating: string;
    EBITCashflow: number;
    EBITCashflowRating: string;
    ReturnOnSales: number;
    ReturnOnSalesRating: string;
    ReturnOnEquity: number;
    ReturnOnEquityRating: string;
    DupontROE: number;
    DupontROERating: string;
    ReturnOnAssets: number;
    ReturnOnAssetsRating: string;
    NIReturnOnCapitalEmployed: number;
    NIReturnOnCapitalEmployedRating: string;
    EBITReturnOnCapitalEmployed: number;
    EBITReturnOnCapitalEmployedRating: string;
    PERatio: number;
    PERatioRating: string;
    ThreeYearPERatioAverage: number;
    ThreeYearPERatioAverageRating: string;
    FiveYearPERatioAverage: number;
    FiveYearPERatioAverageRating: string;
    EarningsPower: number;
    EarningsPowerRating: string;
    GrossProfitMargin: number;
    GrossProfitMarginRating: string;
    NetOperatingProfitAfterTax: number;
    NetOperatingProfitAfterTaxRating: string;
    ReturnOnInvestedCapital: number;
    ReturnOnInvestedCapitalRating: string;
    OperatingExpensesRatio: number;
    OperatingExpensesRatioRating: string;
    OperatingProfitRatio: number;
    OperatingProfitRatioRating: string;
    RetentionRatio: number;
    RetentionRatioRating: string;
    DividendPayoutRatio: number;
    DividendPayoutRatioRating: string;
    EarningsYield: number;
    EarningsYieldRating: string;
    DividendYield: number;
    DividendYieldRating: string;
    SustainableGrowthRate: number;
    SustainableGrowthRateRating: string;
}

export interface Valuation {
    MarketValue: number;
    MarketValueRating;
    CashAndEquivalentsToPrice: number;
    CashAndEquivalentsToPriceRating: string;
    NetAssetValueToPrice: number;
    NetAssetValueToPriceRating: string;
    EBITCashFlowToPrice: number;
    EBITCashFlowToPriceRating: string;
    FreeCashFlowToPrice: number;
    FreeCashFlowToPriceRating: string;
    UnleveredFreeCashFlowToPrice: number;
    UnleveredFreeCashFlowToPriceRating: string;
    SalesToPrice: number;
    SalesToPriceRating: string;
    BookValueToPrice: number;
    BookValueToPriceRating: string;
    OriginalGrahamValuation: number;
    OriginalGrahamValuationRating: string;
    RevisedGrahamValuation: number;
    RevisedGrahamValuationRating: string;
    DCFValuation: number;
    DCFValuationRating;
    MarginOfSafetyNI: number;
    MarginOfSafetyNIRating: string;
    MarginOfSafetyEBIT: number;
    MarginOfSafetyEBITRating: string;
    MarginOfSafetyFCF: number;
    MarginOfSafetyFCFRating: string;
    EnterpriseValuation: number;
    EnterpriseValuationRating;
    NetIncomeToEnterpriseValuation: number;
    NetIncomeToEnterpriseValuationRating: string;
    EBITToEnterpriseValuation: number;
    EBITToEnterpriseValuationRating: string;
    BookValue: number;
    BookValueRating;
    BookValuePerShare: number;
    BookValuePerShareRating: string;
    NetIncomeToBookValue: number;
    NetIncomeToBookValueRating: string;
    EBITToBookValue: number;
    EBITToBookValueRating: string;
}

export interface GetIntrinsicValueRequest {
    ticker: string;
}

export interface GetIntrinsicValueResponse {
    recommend: boolean;
    currentPrice: number;
    intrinsicValue: number;
}
