import { Component, OnInit, Input } from '@angular/core';
import { SecurityAnalysisService } from '../security-analysis.service';
import { GetScoreCardResponse } from '../../server-communication/app-endpoint.constants';
import { ReportedService } from '../reported/reported.service';

@Component({
    selector: 'app-dashboard',
    template: `
        <div *ngIf="!isLoading" class="dashboard">

            <!-- FINANCIAL HIGHLIGHTS -->
            <div class="score-card">
                <h3>Financial Highlights</h3>
                <div class="col-row">
                    <div class="row-header"><span>Market Price ($)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.MarketPrice != null">
                        {{scoreCards.FinancialHighlights.MarketPrice.toFixed(2)}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>DCF Intrinsic Value Net Income (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.DCFIntinsicValueNetIncome != null">
                        {{scoreCards.FinancialHighlights.DCFIntinsicValueNetIncome.toFixed(2)}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>DCF Intrinsic Value EBIT (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.DCFIntinsicValueEBIT != null">
                        {{scoreCards.FinancialHighlights.DCFIntinsicValueEBIT.toFixed(2)}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>DCF Intrinsic Value FCF (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.DCFIntinsicValueFCF != null">
                        {{scoreCards.FinancialHighlights.DCFIntinsicValueFCF.toFixed(2)}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Margin Of Safety NI (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.MarginOfSafetyNI != null">
                        {{scoreCards.FinancialHighlights.MarginOfSafetyNI.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.MarginOfSafetyNIRating != null">
                        {{scoreCards.FinancialHighlights.MarginOfSafetyNIRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Margin Of Safety EBIT (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.MarginOfSafetyEBIT != null">
                        {{scoreCards.FinancialHighlights.MarginOfSafetyEBIT.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.MarginOfSafetyEBITRating != null">
                        {{scoreCards.FinancialHighlights.MarginOfSafetyEBITRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Margin Of Safety FCF (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.MarginOfSafetyFCF != null">
                        {{scoreCards.FinancialHighlights.MarginOfSafetyFCF.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.MarginOfSafetyFCFRating != null">
                        {{scoreCards.FinancialHighlights.MarginOfSafetyFCFRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>PE</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.PE != null">
                        {{scoreCards.FinancialHighlights.PE.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.PERating != null">
                        {{scoreCards.FinancialHighlights.PERating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Liquid Assets (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.LiquidAssets != null">
                        {{scoreCards.FinancialHighlights.LiquidAssets.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.LiquidAssetsRating != null">
                        {{scoreCards.FinancialHighlights.LiquidAssetsRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Earnings Power (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.EarningsPower != null">
                        {{scoreCards.FinancialHighlights.EarningsPower.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.EarningsPowerRating != null">
                        {{scoreCards.FinancialHighlights.EarningsPowerRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Weighted Avg Cost Of Capital (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.WeightAvgCostOfCapital != null">
                        {{scoreCards.FinancialHighlights.WeightAvgCostOfCapital.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.WeightAvgCostOfCapitalRating != null">
                        {{scoreCards.FinancialHighlights.WeightAvgCostOfCapitalRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Sustainable Growth Rate (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.SustainableGrowthRate != null">
                        {{scoreCards.FinancialHighlights.SustainableGrowthRate.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.SustainableGrowthRateRating != null">
                        {{scoreCards.FinancialHighlights.SustainableGrowthRateRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Cash Conversion Cycle (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.FinancialHighlights.CashConversionCycle != null">
                        {{scoreCards.FinancialHighlights.CashConversionCycle.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.FinancialHighlights.CashConversionCycleRating != null">
                        {{scoreCards.FinancialHighlights.CashConversionCycleRating}}
                    </span>
                </div>
            </div>

            <!-- SOLVENCY -->
            <div class="score-card">
                <h3>Solvency</h3>
                <div class="col-row">
                    <div class="row-header"><span>Cash Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.CashRatio != null">
                        {{scoreCards.Solvency.CashRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.CashRatioRating != null">
                        {{scoreCards.Solvency.CashRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Cash And Short Term Investments (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.CashAndShortTermInvestments != null">
                        {{scoreCards.Solvency.CashAndShortTermInvestments.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.CashAndShortTermInvestmentsRating != null">
                        {{scoreCards.Solvency.CashAndShortTermInvestmentsRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Cash Service Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.CashServiceRatio != null">
                        {{scoreCards.Solvency.CashServiceRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.CashServiceRatioRating != null">
                        {{scoreCards.Solvency.CashServiceRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Interest Service Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.InterestServiceRatio != null">
                        {{scoreCards.Solvency.InterestServiceRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.InterestServiceRatioRating != null">
                        {{scoreCards.Solvency.InterestServiceRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Debt Service Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.DebtServiceRatio != null">
                        {{scoreCards.Solvency.DebtServiceRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.DebtServiceRatioRating != null">
                        {{scoreCards.Solvency.DebtServiceRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Cash To Short Term Debt Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.CashToShortTermDebtRatio != null">
                        {{scoreCards.Solvency.CashToShortTermDebtRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.CashToShortTermDebtRatioRating != null">
                        {{scoreCards.Solvency.CashToShortTermDebtRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Acid Test Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.AcidTestRatio != null">
                        {{scoreCards.Solvency.AcidTestRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.AcidTestRatioRating != null">
                        {{scoreCards.Solvency.AcidTestRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Quick Ratio Def 1</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.QuickRatioDef1 != null">
                        {{scoreCards.Solvency.QuickRatioDef1.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.QuickRatioDef1Rating != null">
                        {{scoreCards.Solvency.QuickRatioDef1Rating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Quick Ratio Def 2</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.QuickRatioDef2 != null">
                        {{scoreCards.Solvency.QuickRatioDef2.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.QuickRatioDef2Rating != null">
                        {{scoreCards.Solvency.QuickRatioDef2Rating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Current Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.CurrentRatio != null">
                        {{scoreCards.Solvency.CurrentRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.CurrentRatioRating != null">
                        {{scoreCards.Solvency.CurrentRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Net Working Capital To Assets (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Solvency.NetWorkingCapitalToAssets != null">
                        {{scoreCards.Solvency.NetWorkingCapitalToAssets.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Solvency.NetWorkingCapitalToAssetsRating != null">
                        {{scoreCards.Solvency.NetWorkingCapitalToAssetsRating}}
                    </span>
                </div>
            </div>

            <!-- CAPITAL STRUCTURE -->
            <div class="score-card">
                <h3>Capital Structure</h3>
                <div class="col-row">
                    <div class="row-header"><span>Change In Short Term Debt (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.ChangeInShortTermDebt != null">
                        {{scoreCards.CapitalStructure.ChangeInShortTermDebt.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.ChangeInShortTermDebtRating != null">
                        {{scoreCards.CapitalStructure.ChangeInShortTermDebtRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Change In Long Term Debt (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.ChangeInLongTermDebt != null">
                        {{scoreCards.CapitalStructure.ChangeInLongTermDebt.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.ChangeInLongTermDebtRating != null">
                        {{scoreCards.CapitalStructure.ChangeInLongTermDebtRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Change In Net Debt (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.ChangeInNetDebt != null">
                        {{scoreCards.CapitalStructure.ChangeInNetDebt.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.ChangeInNetDebtRating != null">
                        {{scoreCards.CapitalStructure.ChangeInNetDebtRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Net Debt ($)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.NetDebt != null">
                        {{scoreCards.CapitalStructure.NetDebt.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.NetDebtRating != null">
                        {{scoreCards.CapitalStructure.NetDebtRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Short Term Obligations Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.ShortTermObligationsRatio != null">
                        {{scoreCards.CapitalStructure.ShortTermObligationsRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.ShortTermObligationsRatioRating != null">
                        {{scoreCards.CapitalStructure.ShortTermObligationsRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Long Term Debt Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.LongTermDebtRatio != null">
                        {{scoreCards.CapitalStructure.LongTermDebtRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.LongTermDebtRatioRating != null">
                        {{scoreCards.CapitalStructure.LongTermDebtRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Debt Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.DebtRatio != null">
                        {{scoreCards.CapitalStructure.DebtRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.DebtRatioRating != null">
                        {{scoreCards.CapitalStructure.DebtRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Debt Equity Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.DebtEquityRatio != null">
                        {{scoreCards.CapitalStructure.DebtEquityRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.DebtEquityRatioRating != null">
                        {{scoreCards.CapitalStructure.DebtEquityRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Fixed Coverage Charge Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.FixedCoverageChargeRatio != null">
                        {{scoreCards.CapitalStructure.FixedCoverageChargeRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.FixedCoverageChargeRatioRating != null">
                        {{scoreCards.CapitalStructure.FixedCoverageChargeRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Degree Of Combined Leverage</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.DegreeOfCombinedLeverage != null">
                        {{scoreCards.CapitalStructure.DegreeOfCombinedLeverage.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.DegreeOfCombinedLeverageRating != null">
                        {{scoreCards.CapitalStructure.DegreeOfCombinedLeverageRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Degree Of Operating Leverage</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.DegreeOfOperatingLeverage != null">
                        {{scoreCards.CapitalStructure.DegreeOfOperatingLeverage.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.DegreeOfOperatingLeverageRating != null">
                        {{scoreCards.CapitalStructure.DegreeOfOperatingLeverageRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Degree Of Financial Leverage</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.DegreeOfFinancialLeverage != null">
                        {{scoreCards.CapitalStructure.DegreeOfFinancialLeverage.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.DegreeOfFinancialLeverageRating != null">
                        {{scoreCards.CapitalStructure.DegreeOfFinancialLeverageRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Degree Of Financial Leverage Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.DegreeOfFinancialLeverageRatio != null">
                        {{scoreCards.CapitalStructure.DegreeOfFinancialLeverageRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.DegreeOfFinancialLeverageRatioRating != null">
                        {{scoreCards.CapitalStructure.DegreeOfFinancialLeverageRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Financial Leverage Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.FinancialLeverageRatio != null">
                        {{scoreCards.CapitalStructure.FinancialLeverageRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.FinancialLeverageRatioRating != null">
                        {{scoreCards.CapitalStructure.FinancialLeverageRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Equity Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.EquityRatio != null">
                        {{scoreCards.CapitalStructure.EquityRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.EquityRatioRating != null">
                        {{scoreCards.CapitalStructure.EquityRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Equity Multiplier Def1</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.EquityMultiplierDef1 != null">
                        {{scoreCards.CapitalStructure.EquityMultiplierDef1.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.EquityMultiplierDef1Rating != null">
                        {{scoreCards.CapitalStructure.EquityMultiplierDef1Rating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Equity Multiplier Def2</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.EquityMultiplierDef2 != null">
                        {{scoreCards.CapitalStructure.EquityMultiplierDef2.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.EquityMultiplierDef2Rating != null">
                        {{scoreCards.CapitalStructure.EquityMultiplierDef2Rating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Net Asset Value (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.NetAssetValue != null">
                        {{scoreCards.CapitalStructure.NetAssetValue.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.NetAssetValueRating != null">
                        {{scoreCards.CapitalStructure.NetAssetValueRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Effective Interest Rate (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.EffectiveInterestRate != null">
                        {{scoreCards.CapitalStructure.EffectiveInterestRate.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.EffectiveInterestRateRating != null">
                        {{scoreCards.CapitalStructure.EffectiveInterestRateRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Debt Cost Of Capital (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.DebtCostOfCapital != null">
                        {{scoreCards.CapitalStructure.DebtCostOfCapital.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.DebtCostOfCapitalRating != null">
                        {{scoreCards.CapitalStructure.DebtCostOfCapitalRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Equity Cost Of Capital (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.EquityCostOfCapital != null">
                        {{scoreCards.CapitalStructure.EquityCostOfCapital.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.EquityCostOfCapitalRating != null">
                        {{scoreCards.CapitalStructure.EquityCostOfCapitalRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Weight Avg Cost Of Capital, WACC (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.CapitalStructure.WeightAvgCostOfCapital != null">
                        {{scoreCards.CapitalStructure.WeightAvgCostOfCapital.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.CapitalStructure.WeightAvgCostOfCapitalRating != null">
                        {{scoreCards.CapitalStructure.WeightAvgCostOfCapitalRating}}
                    </span>
                </div>
            </div>

            <!-- ASSET ACTIVITY -->
            <div class="score-card">
                <h3>Asset Activity</h3>
                <div class="col-row">
                    <div class="row-header"><span>Sales Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.SalesTurnover != null">
                        {{scoreCards.AssetActivity.SalesTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.SalesTurnoverRating != null">
                        {{scoreCards.AssetActivity.SalesTurnoverRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Days Sales Outstanding (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.DaysSalesOutstanding != null">
                        {{scoreCards.AssetActivity.DaysSalesOutstanding.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.DaysSalesOutstandingRating != null">
                        {{scoreCards.AssetActivity.DaysSalesOutstandingRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Inventory Sales Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.InventorySalesTurnover != null">
                        {{scoreCards.AssetActivity.InventorySalesTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.InventorySalesTurnoverRating != null">
                        {{scoreCards.AssetActivity.InventorySalesTurnoverRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Days Sales Inventory (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.DaysSalesInventory != null">
                        {{scoreCards.AssetActivity.DaysSalesInventory.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.DaysSalesInventoryRating != null">
                        {{scoreCards.AssetActivity.DaysSalesInventoryRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Inventory Turnover COGS</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.InventoryTurnoverCOGS != null">
                        {{scoreCards.AssetActivity.InventoryTurnoverCOGS.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.InventoryTurnoverCOGSRating != null">
                        {{scoreCards.AssetActivity.InventoryTurnoverCOGSRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Days Inventory Outstanding (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.DaysInventoryOutstanding != null">
                        {{scoreCards.AssetActivity.DaysInventoryOutstanding.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.DaysInventoryOutstandingRating != null">
                        {{scoreCards.AssetActivity.DaysInventoryOutstandingRating}}
                    </span>
                </div>
                <!--<div class="col-row">
                    <div class="row-header"><span>Creditors Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.CreditorsTurnover != null">
                        {{scoreCards.AssetActivity.CreditorsTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.CreditorsTurnoverRating != null">
                        {{scoreCards.AssetActivity.CreditorsTurnoverRating}}
                    </span>
                </div>-->
                <!--<div class="col-row">
                    <div class="row-header"><span>Creditors Days Outstanding (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.CreditorsDaysOutstanding != null">
                        {{scoreCards.AssetActivity.CreditorsDaysOutstanding.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.CreditorsDaysOutstandingRating != null">
                        {{scoreCards.AssetActivity.CreditorsDaysOutstandingRating}}
                    </span>
                </div>-->
                <!--<div class="col-row">
                    <div class="row-header"><span>Accounts Receivables Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.AccountsReceivablesTurnover != null">
                        {{scoreCards.AssetActivity.AccountsReceivablesTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.AccountsReceivablesTurnoverRating != null">
                        {{scoreCards.AssetActivity.AccountsReceivablesTurnoverRating}}
                    </span>
                </div>-->
                <!--<div class="col-row">
                    <div class="row-header"><span>Days Receivables Outstanding (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.DaysReceivablesOutstanding != null">
                        {{scoreCards.AssetActivity.DaysReceivablesOutstanding.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.DaysReceivablesOutstandingRating != null">
                        {{scoreCards.AssetActivity.DaysReceivablesOutstandingRating}}
                    </span>
                </div>-->
                <div class="col-row">
                    <div class="row-header"><span>Working Capital Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.WorkingCapitalTurnover != null">
                        {{scoreCards.AssetActivity.WorkingCapitalTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.WorkingCapitalTurnoverRating != null">
                        {{scoreCards.AssetActivity.WorkingCapitalTurnoverRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Days Working Capital (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.DaysWorkingCapital != null">
                        {{scoreCards.AssetActivity.DaysWorkingCapital.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.DaysWorkingCapitalRating != null">
                        {{scoreCards.AssetActivity.DaysWorkingCapitalRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Asset Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.AssetTurnover != null">
                        {{scoreCards.AssetActivity.AssetTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.AssetTurnoverRating != null">
                        {{scoreCards.AssetActivity.AssetTurnoverRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Asset Turn Rate (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.AssetTurnRate != null">
                        {{scoreCards.AssetActivity.AssetTurnRate.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.AssetTurnRateRating != null">
                        {{scoreCards.AssetActivity.AssetTurnRateRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Long Term Asset Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.LongTermAssetTurnover != null">
                        {{scoreCards.AssetActivity.LongTermAssetTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.LongTermAssetTurnoverRating != null">
                        {{scoreCards.AssetActivity.LongTermAssetTurnoverRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Long Term Asset Rate (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.LongTermAssetRate != null">
                        {{scoreCards.AssetActivity.LongTermAssetRate.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.LongTermAssetRateRating != null">
                        {{scoreCards.AssetActivity.LongTermAssetRateRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Cash Conversion Cycle (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.CashConversionCycle != null">
                        {{scoreCards.AssetActivity.CashConversionCycle.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.CashConversionCycleRating != null">
                        {{scoreCards.AssetActivity.CashConversionCycleRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Return On Investments, ROI (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.AssetActivity.ReturnOnInvestments != null">
                        {{scoreCards.AssetActivity.ReturnOnInvestments.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.AssetActivity.ReturnOnInvestmentsRating != null">
                        {{scoreCards.AssetActivity.ReturnOnInvestmentsRating}}
                    </span>
                </div>
            </div>

            <!-- LIABILITY ACTIVITY -->
            <div class="score-card">
                <h3>Liability Activity</h3>
                <div class="col-row">
                    <div class="row-header"><span>Payables Turnover, COGS</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.PayablesTurnoverCOGS != null">
                        {{scoreCards.LiabilityActivity.PayablesTurnoverCOGS.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.PayablesTurnoverCOGSRating != null">
                        {{scoreCards.LiabilityActivity.PayablesTurnoverCOGSRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>COGS Days Payables Outstanding (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.COGSDaysPayablesOutstanding != null">
                        {{scoreCards.LiabilityActivity.COGSDaysPayablesOutstanding.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.COGSDaysPayablesOutstandingRating != null">
                        {{scoreCards.LiabilityActivity.COGSDaysPayablesOutstandingRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>COS Payables Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.COSPayablesTurnover != null">
                        {{scoreCards.LiabilityActivity.COSPayablesTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.COSPayablesTurnoverRating != null">
                        {{scoreCards.LiabilityActivity.COSPayablesTurnoverRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>COS Days Payables Outstanding</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.COSDaysPayablesOutstanding != null">
                        {{scoreCards.LiabilityActivity.COSDaysPayablesOutstanding.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.COSDaysPayablesOutstandingRating != null">
                        {{scoreCards.LiabilityActivity.COSDaysPayablesOutstandingRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Liabilities Turnover</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.LiabilitiesTurnover != null">
                        {{scoreCards.LiabilityActivity.LiabilitiesTurnover.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.LiabilitiesTurnoverRating != null">
                        {{scoreCards.LiabilityActivity.LiabilitiesTurnoverRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Liabilities Turnover Rate (Days)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.LiabilitiesTurnoverRate != null">
                        {{scoreCards.LiabilityActivity.LiabilitiesTurnoverRate.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.LiabilitiesTurnoverRateRating != null">
                        {{scoreCards.LiabilityActivity.LiabilitiesTurnoverRateRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Change In Debt Obligations (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.ChangeInDebtObligations != null">
                        {{scoreCards.LiabilityActivity.ChangeInDebtObligations.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.ChangeInDebtObligationsRating != null">
                        {{scoreCards.LiabilityActivity.ChangeInDebtObligationsRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Debtors Payback Period (Years)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.DebtorsPaybackPeriod != null">
                        {{scoreCards.LiabilityActivity.DebtorsPaybackPeriod.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.DebtorsPaybackPeriodRating != null">
                        {{scoreCards.LiabilityActivity.DebtorsPaybackPeriodRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Burn Rate (Years Remaining)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.LiabilityActivity.BurnRate != null">
                        {{scoreCards.LiabilityActivity.BurnRate.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.LiabilityActivity.BurnRateRating != null">
                        {{scoreCards.LiabilityActivity.BurnRateRating}}
                    </span>
                </div>
            </div>

            <!-- PROFITABILITY AND DIVIDENDS -->
            <div class="score-card">
                <h3>Profitability And Dividends</h3>
                <div class="col-row">
                    <div class="row-header"><span>Earnings (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.Earnings != null">
                        {{scoreCards.ProfitabilityAndDividends.Earnings.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.EarningsRating != null">
                        {{scoreCards.ProfitabilityAndDividends.EarningsRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>EBIT Cashflow (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.EBITCashflow != null">
                        {{scoreCards.ProfitabilityAndDividends.EBITCashflow.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.EBITCashflowRating != null">
                        {{scoreCards.ProfitabilityAndDividends.EBITCashflowRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Return On Sales (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnSales != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnSales.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnSalesRating != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnSalesRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Return On Equity (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnEquity != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnEquity.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnEquityRating != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnEquityRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Dupont ROE (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.DupontROE != null">
                        {{scoreCards.ProfitabilityAndDividends.DupontROE.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.DupontROERating != null">
                        {{scoreCards.ProfitabilityAndDividends.DupontROERating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Return On Assets (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnAssets != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnAssets.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnAssetsRating != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnAssetsRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>NI Return On Capital Employed (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.NIReturnOnCapitalEmployed != null">
                        {{scoreCards.ProfitabilityAndDividends.NIReturnOnCapitalEmployed.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.NIReturnOnCapitalEmployedRating != null">
                        {{scoreCards.ProfitabilityAndDividends.NIReturnOnCapitalEmployedRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>EBIT Return On Capital Employed (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.EBITReturnOnCapitalEmployed != null">
                        {{scoreCards.ProfitabilityAndDividends.EBITReturnOnCapitalEmployed.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.EBITReturnOnCapitalEmployedRating != null">
                        {{scoreCards.ProfitabilityAndDividends.EBITReturnOnCapitalEmployedRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>PE Ratio</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.PERatio != null">
                        {{scoreCards.ProfitabilityAndDividends.PERatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.PERatioRating != null">
                        {{scoreCards.ProfitabilityAndDividends.PERatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Three Year PE Ratio Average</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.ThreeYearPERatioAverage != null">
                        {{scoreCards.ProfitabilityAndDividends.ThreeYearPERatioAverage.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.ThreeYearPERatioAverageRating != null">
                        {{scoreCards.ProfitabilityAndDividends.ThreeYearPERatioAverageRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Five Year PE Ratio Average</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.FiveYearPERatioAverage != null">
                        {{scoreCards.ProfitabilityAndDividends.FiveYearPERatioAverage.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.FiveYearPERatioAverageRating != null">
                        {{scoreCards.ProfitabilityAndDividends.FiveYearPERatioAverageRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Earnings Power (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.EarningsPower != null">
                        {{scoreCards.ProfitabilityAndDividends.EarningsPower.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.EarningsPowerRating != null">
                        {{scoreCards.ProfitabilityAndDividends.EarningsPowerRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Gross Profit Margin (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.GrossProfitMargin != null">
                        {{scoreCards.ProfitabilityAndDividends.GrossProfitMargin.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.GrossProfitMarginRating != null">
                        {{scoreCards.ProfitabilityAndDividends.GrossProfitMarginRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Net Operating Profit After Tax (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.NetOperatingProfitAfterTax != null">
                        {{scoreCards.ProfitabilityAndDividends.NetOperatingProfitAfterTax.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.NetOperatingProfitAfterTaxRating != null">
                        {{scoreCards.ProfitabilityAndDividends.NetOperatingProfitAfterTaxRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Return On Invested Capital (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnInvestedCapital != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnInvestedCapital.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.ReturnOnInvestedCapitalRating != null">
                        {{scoreCards.ProfitabilityAndDividends.ReturnOnInvestedCapitalRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Operating Expenses Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.OperatingExpensesRatio != null">
                        {{scoreCards.ProfitabilityAndDividends.OperatingExpensesRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.OperatingExpensesRatioRating != null">
                        {{scoreCards.ProfitabilityAndDividends.OperatingExpensesRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Operating Profit Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.OperatingProfitRatio != null">
                        {{scoreCards.ProfitabilityAndDividends.OperatingProfitRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.OperatingProfitRatioRating != null">
                        {{scoreCards.ProfitabilityAndDividends.OperatingProfitRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Retention Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.RetentionRatio != null">
                        {{scoreCards.ProfitabilityAndDividends.RetentionRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.RetentionRatioRating != null">
                        {{scoreCards.ProfitabilityAndDividends.RetentionRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Dividend Payout Ratio (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.DividendPayoutRatio != null">
                        {{scoreCards.ProfitabilityAndDividends.DividendPayoutRatio.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.DividendPayoutRatioRating != null">
                        {{scoreCards.ProfitabilityAndDividends.DividendPayoutRatioRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Earnings Yield (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.EarningsYield != null">
                        {{scoreCards.ProfitabilityAndDividends.EarningsYield.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.EarningsYieldRating != null">
                        {{scoreCards.ProfitabilityAndDividends.EarningsYieldRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Dividend Yield (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.DividendYield != null">
                        {{scoreCards.ProfitabilityAndDividends.DividendYield.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.DividendYieldRating != null">
                        {{scoreCards.ProfitabilityAndDividends.DividendYieldRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Sustainable Growth Rate (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.ProfitabilityAndDividends.SustainableGrowthRate != null">
                        {{scoreCards.ProfitabilityAndDividends.SustainableGrowthRate.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.ProfitabilityAndDividends.SustainableGrowthRateRating != null">
                        {{scoreCards.ProfitabilityAndDividends.SustainableGrowthRateRating}}
                    </span>
                </div>
            </div>

            <!-- VALUATION -->
            <div class="score-card">
                <h3>Valuation</h3>
                <div class="col-row">
                    <div class="row-header"><span>Market Value ($)</span></div>
                    <span class="normal-value" class="normal-value" *ngIf="scoreCards.Valuation.MarketValue != null">
                        {{scoreCards.Valuation.MarketValue.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.MarketValueRating != null">
                        {{scoreCards.Valuation.MarketValueRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Cash And Equivalents To Price (%)</span></div>
                    <span class="normal-value" class="normal-value"  *ngIf="scoreCards.Valuation.CashAndEquivalentsToPrice != null">
                        {{scoreCards.Valuation.CashAndEquivalentsToPrice.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.CashAndEquivalentsToPriceRating != null">
                        {{scoreCards.Valuation.CashAndEquivalentsToPriceRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Net Asset Value To Price (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.NetAssetValueToPrice != null">
                        {{scoreCards.Valuation.NetAssetValueToPrice.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.NetAssetValueToPriceRating != null">
                        {{scoreCards.Valuation.NetAssetValueToPriceRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>EBIT Cash Flow To Price (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.EBITCashFlowToPrice != null">
                        {{scoreCards.Valuation.EBITCashFlowToPrice.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.EBITCashFlowToPriceRating != null">
                        {{scoreCards.Valuation.EBITCashFlowToPriceRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Free Cash Flow To Price (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.FreeCashFlowToPrice != null">
                        {{scoreCards.Valuation.FreeCashFlowToPrice.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.FreeCashFlowToPriceRating != null">
                        {{scoreCards.Valuation.FreeCashFlowToPriceRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Unlevered Free Cash Flow To Price (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.UnleveredFreeCashFlowToPrice != null">
                        {{scoreCards.Valuation.UnleveredFreeCashFlowToPrice.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.UnleveredFreeCashFlowToPriceRating != null">
                        {{scoreCards.Valuation.UnleveredFreeCashFlowToPriceRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Sales To Price (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.SalesToPrice != null">
                        {{scoreCards.Valuation.SalesToPrice.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.SalesToPriceRating != null">
                        {{scoreCards.Valuation.SalesToPriceRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Book Value To Price (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.BookValueToPrice != null">
                        {{scoreCards.Valuation.BookValueToPrice.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.BookValueToPriceRating != null">
                        {{scoreCards.Valuation.BookValueToPriceRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Original Graham Valuation (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.OriginalGrahamValuation != null">
                        {{scoreCards.Valuation.OriginalGrahamValuation.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.OriginalGrahamValuationRating != null">
                        {{scoreCards.Valuation.OriginalGrahamValuationRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Revised Graham Valuation (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.RevisedGrahamValuation != null">
                        {{reportedService.intrinsicValue}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.RevisedGrahamValuationRating != null">
                        {{scoreCards.Valuation.RevisedGrahamValuationRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>DCF Valuation (Net Income Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.DCFValuation != null">
                        {{scoreCards.Valuation.DCFValuation.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.DCFValuationRating != null">
                        {{scoreCards.Valuation.DCFValuationRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Margin Of Safety (Using Net Income DCF)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.MarginOfSafetyNI != null">
                        {{scoreCards.Valuation.MarginOfSafetyNI.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.MarginOfSafetyNIRating != null">
                        {{scoreCards.Valuation.MarginOfSafetyNIRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Margin Of Safety (Using EBIT DCF)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.MarginOfSafetyEBIT != null">
                        {{scoreCards.Valuation.MarginOfSafetyEBIT.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.MarginOfSafetyEBITRating != null">
                        {{scoreCards.Valuation.MarginOfSafetyEBITRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Margin Of Safety (Using FCF DCF)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.MarginOfSafetyFCF != null">
                        {{scoreCards.Valuation.MarginOfSafetyFCF.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.MarginOfSafetyFCFRating != null">
                        {{scoreCards.Valuation.MarginOfSafetyFCFRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Enterprise Valuation</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.EnterpriseValuation != null">
                        {{scoreCards.Valuation.EnterpriseValuation.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.EnterpriseValuationRating != null">
                        {{scoreCards.Valuation.EnterpriseValuationRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Net Income To Enterprise Valuation (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.NetIncomeToEnterpriseValuation != null">
                        {{scoreCards.Valuation.NetIncomeToEnterpriseValuation.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.NetIncomeToEnterpriseValuationRating != null">
                        {{scoreCards.Valuation.NetIncomeToEnterpriseValuationRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>EBIT To Enterprise Valuation (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.EBITToEnterpriseValuation != null">
                        {{scoreCards.Valuation.EBITToEnterpriseValuation.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.EBITToEnterpriseValuationRating != null">
                        {{scoreCards.Valuation.EBITToEnterpriseValuationRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Book Value ($)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.BookValue != null">
                        {{scoreCards.Valuation.BookValue.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.BookValueRating != null">
                        {{scoreCards.Valuation.BookValueRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Book Value (Per Share)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.BookValuePerShare != null">
                        {{scoreCards.Valuation.BookValuePerShare.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.BookValuePerShareRating != null">
                        {{scoreCards.Valuation.BookValuePerShareRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>Net Income To Book Value (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.NetIncomeToBookValue != null">
                        {{scoreCards.Valuation.NetIncomeToBookValue.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.NetIncomeToBookValueRating != null">
                        {{scoreCards.Valuation.NetIncomeToBookValueRating}}
                    </span>
                </div>
                <div class="col-row">
                    <div class="row-header"><span>EBIT To Book Value (%)</span></div>
                    <span class="normal-value" *ngIf="scoreCards.Valuation.EBITToBookValue != null">
                        {{scoreCards.Valuation.EBITToBookValue.toFixed(2)}}
                    </span>
                    <span *ngIf="scoreCards.Valuation.EBITToBookValueRating != null">
                        {{scoreCards.Valuation.EBITToBookValueRating}}
                    </span>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @Input() public ticker;
    public scoreCards: GetScoreCardResponse;
    public isLoading = true;

    constructor(
        public securityAnalysisService: SecurityAnalysisService,
        public reportedService: ReportedService
        ) {}

    async ngOnInit() {
        this.scoreCards = await this.securityAnalysisService.getScorecards({ticker: this.ticker});
        this.isLoading = false;
        console.log(this.scoreCards);
    }
}
