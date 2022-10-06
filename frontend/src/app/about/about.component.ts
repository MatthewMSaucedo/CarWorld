import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    template: `
        <div class="container">
            <div class="gray-box">
                <h2>Stock Market Valuations</h2>
                <h4>the Power of Value Investing</h4>
                <p>
                    This website is designed to empower <em>you</em> with the knowledge required to be a smart,
                    successful value-investor. What is value investing? Value Investing is built on the idea that
                    many companies are being traded for a price that is less than, or in some cases greater than,
                    their true intrinsic value. A value investor will determine this intrinsic value to the best of
                    their ability, and then choose to buy or sell relative to whether or not the value is higher
                    or lower than the current trading price. This works because the theory surrounding this method
                    suggests that actual trading price will enventually rise or fall to meet intrinsic value.
                </p>
            </div>
            <div class="smt-row">
                <div class="gray-box">
                    <h3>How is a Stock Intrinsically Valued?</h3>
                    <p>
                        The valuation method used by this web application to intrinsically value a stock follows
                        the formular presented here to the right. This intrinsic formula was developed by famed investor and
                        scholar Benjamin Graham. Here, EPS refers to earning per share, PE to fair Rate of Return for a no
                        growth stock, g to growth rate of a company's earnings, gr to some coefficient for that growth, 4.4 to
                        the required return, and Y to AAA yield.
                    </p>
                </div>
                <div class="pic">
                    <img src="assets/formula.png" alt="forumla" width="300rem" height="80rem">
                </div>
            </div>
            <div class="smt-row">
                <div class="pic-2">
                    <img src="assets/linReg.png" alt="graph" width="500rem" height="300rem">
                </div>
                <div class="gray-box">
                    <h3>Model Supported by Machine Learning</h3>
                    <p>
                        This web application uses a modified version of Graham's intrinsic value formula. In his forumla, PE is
                        assumed to be 7, and gr to be 1. This application chose to challenge these constants, and through the use
                        of a mulit-variate linear regression machine learning model, different values were selected. A PE of 9 and
                        gr of 2, as well as an added bias of 27.5, were the results of running the regression against decades of
                        historic price data for all 500 companies in the S&P 500.

                    </p>
                </div>
            </div>
            <div class="smt-last-row">
                <div class="gray-box set-width">
                    <h3>How to Use this Web Application</h3>
                    <p>
                        This web application is designed as an eductation tool to be used by anyone looking to make financially-sound
                        investments. This application is not here to tell you what to invest in or not invest in, but rather provide
                        a wealth of data so that you can make that decision for yourself.
                    </p>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    ngOnInit() {}

}
