import { Config } from "@/types/ConfigTypes";

export const getLoanPageConfigMock = (): Config => ({
  homePage: {
    calculatorTiles: [
      {
        label: "Income Tax Calculator",
        imgSrc: "/images/income-tax.png",
        path: "/income-tax-calculator",
      },
      {
        label: "SIP Calculator",
        imgSrc: "/images/sip.png",
        path: "/sip-calculator",
      },
      {
        label: "Lumpsum Calculator",
        imgSrc: "/images/lumpsum.png",
        path: "/lumpsum-calculator",
      },
      {
        label: "Fixed Deposit (FD) Calculator",
        imgSrc: "/images/fd.png",
        path: "/fd-calculator",
      },
      {
        label: "Recurring Deposit (RD) Calculator",
        imgSrc: "/images/rd.png",
        path: "/rd-calculator",
      },
      {
        label: "Loan Calculator",
        imgSrc: "/images/home-loan.png",
        path: "/loan-emi-calculator",
      },
      {
        label: "Mortgage Calculator",
        imgSrc: "/images/mortgage.png",
        path: "/mortgage-calculator",
      },
      {
        label: "Personal Loan Calculator",
        imgSrc: "/images/personal.png",
        path: "/personal-loan-calculator",
      },
    ],
  },
  incomeTax: {
    budgets: [
      {
        year: 2025,
        financialYear: "2025-26",
        assessmentYear: "2026-27",
        name: "Financial Year 2025-26 (AY 2026-27)",
        regime: "New",
        applyMarginalRelief: true,
        rebate: {
          amount: 1200000,
          type: "absolute",
        },
        standardDeduction: {
          amount: 75000,
          type: "absolute",
        },
        taxes: [
          {
            name: "Health and Education Cess",
            value: 4,
            type: "percent",
          },
          {
            name: "Surcharge",
            type: "slabs",
            slabs: [
              {
                incomeFrom: 0,
                incomeTo: 5000000,
                taxInPercent: 0,
              },
              {
                incomeFrom: 5000000,
                incomeTo: 10000000,
                taxInPercent: 10,
              },
              {
                incomeFrom: 10000000,
                incomeTo: 20000000,
                taxInPercent: 15,
              },
              {
                incomeFrom: 20000000,
                incomeTo: 50000000,
                taxInPercent: 25,
              },
              {
                incomeFrom: 50000000,
                incomeTo: -1,
                taxInPercent: 37,
              },
            ],
          },
        ],
        slabs: [
          {
            incomeFrom: 0,
            incomeTo: 400000,
            taxInPercent: 0,
          },
          {
            incomeFrom: 400000,
            incomeTo: 800000,
            taxInPercent: 5,
          },
          {
            incomeFrom: 800000,
            incomeTo: 1200000,
            taxInPercent: 10,
          },
          {
            incomeFrom: 1200000,
            incomeTo: 1600000,
            taxInPercent: 15,
          },
          {
            incomeFrom: 1600000,
            incomeTo: 2000000,
            taxInPercent: 20,
          },
          {
            incomeFrom: 2000000,
            incomeTo: 2400000,
            taxInPercent: 25,
          },
          {
            incomeFrom: 2400000,
            incomeTo: -1,
            taxInPercent: 30,
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How can I calculate my tax payable?",
        answer:
          "Easily determine your tax payable using our income tax calculator. Simply enter your income details along with the assessment year and tax regime, and our advanced tool will instantly compute your precise icome tax liability.",
      },
      {
        question: "Does everyone have to file their income tax returns?",
        answer:
          "Filing income tax returns is not mandatory if your annual income is below the basic exemption threshold. However, if you fall below this limit and wish to claim a tax refund, you must file your ITR to be eligible for the benefit.",
      },
      {
        question: "Does the income tax calculator compute TDS?",
        answer:
          "Our Income Tax Calculator is specifically designed to calculate your overall tax liability for the assessment year and does not compute Tax Deducted at Source (TDS).",
      },
      {
        question: "How do I calculate surcharge or rebate on income tax?",
        answer:
          "By entering your complete income and deduction details into our Income Tax Calculator, you can automatically compute your total tax liability, including any applicable surcharge, cess, and tax rebate. This comprehensive overview ensures you are fully aware of your tax obligations.",
      },
      {
        question: "How can I calculate income tax on arrear salary?",
        answer:
          "To calculate income tax on arrear salary, simply add your arrear payments in the 'Annual Income' section of our calculator. The tool will factor in these earnings to provide an accurate computation of your overall tax liability.",
      },
      {
        question: "What is the difference between the old and new tax regimes?",
        answer:
          "Under the old tax regime, you can claim various exemptions and deductions such as HRA and Section 80C investments to reduce your taxable income. In contrast, the new tax regime offers lower tax rates while eliminating most exemptions and deductions. Our calculator compares both regimes to help you choose the most tax-efficient option.",
      },
      {
        question:
          "Can I use the Income Tax Calculator if I have income from multiple sources?",
        answer:
          "Absolutely. Our Income Tax Calculator is designed to handle multiple income streams including salary, interest, rental income, and capital gains. Simply input all your income details for a consolidated and accurate tax calculation.",
      },
      {
        question: "Which deductions are allowed in the new tax regime?",
        answer:
          "The new tax regime allows a standard deduction of ₹75,000 for salaried individuals. No other deductions, such as HRA or 80C benefits, are available. For non-salaried income like business or rental income, no deductions are provided under the new regime.",
      },
      {
        question: "Which tax regime is more beneficial for me?",
        answer:
          "As per the 2025 budget, most individuals find the new tax regime more beneficial. However, the choice depends on deductions. If you have significant deductions, the old tax regime might still be better, but such cases have become rare.",
      },
      {
        question: "Why is surcharge added to tax calculations?",
        answer:
          "Surcharge applies when taxable income exceeds ₹50 lakh. The surcharge percentage varies based on income slabs and the selected tax regime.",
      },
    ],
  },
  fixedDeposit: {
    faqs: [
      {
        question: "How can I calculate fixed deposit interest?",
        answer:
          "Use our FD calculator to easily calculate your fixed deposit interest. Simply input the principal amount, interest rate, and tenure, and our tool will compute the interest earned on your FD investment.",
      },
      {
        question: "What is the maturity value of a fixed deposit?",
        answer:
          "The maturity value of a fixed deposit is the amount you will receive at the end of your FD tenure, which includes both the principal and the earned interest. Our FD calculator can help you calculate this value quickly.",
      },
      {
        question: "Is interest on fixed deposits taxable?",
        answer:
          "Yes, interest earned on fixed deposits is subject to tax. It is added to your total income and taxed according to your income tax slab. Our FD calculator does not calculate tax, but it helps you estimate your FD interest.",
      },
      {
        question: "What are the different types of fixed deposits?",
        answer:
          "There are various types of fixed deposits, including regular fixed deposits, tax-saving FD, and senior citizen FD. Each type has different features such as tenure and tax implications. Our calculator can be used for most FD types.",
      },
      {
        question: "Can I prematurely withdraw my fixed deposit?",
        answer:
          "Yes, premature withdrawal of a fixed deposit is allowed, but it usually incurs a penalty. The interest earned will also be lower than expected. Our FD calculator provides results based on the regular tenure but does not account for premature withdrawal.",
      },
      {
        question: "What is the FD interest rate for senior citizens?",
        answer:
          "Senior citizens typically receive a higher interest rate on fixed deposits compared to regular depositors. Check with your bank for the latest senior citizen FD interest rates and use our calculator to estimate the returns.",
      },
      {
        question: "How do I calculate compound interest on fixed deposits?",
        answer:
          "Compound interest on fixed deposits is calculated periodically, such as quarterly or annually. Input the details in our FD calculator, and it will automatically compute the compound interest based on the frequency you choose.",
      },
      {
        question: "Can I choose the FD interest payout frequency?",
        answer:
          "Yes, you can select the interest payout frequency for your fixed deposit. It can be monthly, quarterly, or annually. Our FD calculator allows you to simulate different payout options.",
      },
      {
        question: "What happens if I reinvest the interest earned on FD?",
        answer:
          "Reinvesting the interest earned on your FD will help you accumulate more interest over time through compounding. Our FD calculator calculates interest for the given tenure, but reinvestment will further increase the maturity value.",
      },
      {
        question: "How does FD interest affect my tax liabilities?",
        answer:
          "FD interest is taxable, and the amount will be added to your taxable income. You can calculate the estimated tax payable by using our income tax calculator alongside the FD interest results.",
      },
    ],
  },
  recurringDeposit: {
    faqs: [
      {
        question: "How do I calculate recurring deposit interest?",
        answer:
          "Use our RD calculator to calculate recurring deposit interest. Simply input the monthly deposit amount, interest rate, and tenure, and the calculator will give you an estimate of the interest earned and maturity amount.",
      },
      {
        question: "What is the maturity value of a recurring deposit?",
        answer:
          "The maturity value of a recurring deposit is the total amount you will receive at the end of the tenure, including the principal and earned interest. Our RD calculator helps you determine the maturity value easily.",
      },
      {
        question: "Is recurring deposit interest taxable?",
        answer:
          "Yes, the interest earned on recurring deposits is taxable. It is added to your total income and taxed according to your applicable tax slab. Use our income tax calculator to estimate the tax on RD interest.",
      },
      {
        question: "Can I increase or decrease my RD amount during the tenure?",
        answer:
          "No, the monthly contribution in a recurring deposit is fixed for the entire tenure. However, you can open a new RD with a different amount. Use our RD calculator to calculate the results based on your fixed monthly deposit.",
      },
      {
        question:
          "How do I calculate compound interest on a recurring deposit?",
        answer:
          "The interest on recurring deposits is compounded quarterly. Our RD calculator automatically accounts for this compounding when you input the relevant details.",
      },
      {
        question: "What is the minimum and maximum tenure for an RD?",
        answer:
          "The minimum tenure for a recurring deposit is generally 6 months, and the maximum can go up to 10 years. Check the RD calculator to calculate the interest for various tenure options.",
      },
      {
        question: "Can I withdraw my RD before maturity?",
        answer:
          "Yes, you can withdraw a recurring deposit before its maturity, but it may come with penalties, and you will lose the interest rate benefits. Use our RD calculator to determine the impact of early withdrawal.",
      },
      {
        question: "What happens if I miss an RD installment?",
        answer:
          "If you miss an RD installment, the bank may charge a penalty or may not pay interest on the missed amount. Always ensure timely payments for maximizing returns. Our RD calculator assumes timely payments in the results.",
      },
      {
        question: "How can I check my RD balance?",
        answer:
          "You can check your RD balance by visiting your bank’s website or mobile app. Alternatively, use our RD calculator to estimate the balance and maturity value based on your monthly contributions.",
      },
      {
        question: "How does RD interest impact my tax return?",
        answer:
          "Interest earned on recurring deposits is taxable and will be added to your annual income. Use our income tax calculator to get an estimate of the tax on RD interest.",
      },
    ],
  },
  SIP: {
    faqs: [
      {
        question: "How do I calculate SIP returns?",
        answer:
          "Our SIP calculator helps you calculate SIP returns based on your monthly investment, the expected annual return, and the tenure. Simply input your investment details, and the tool will compute your total returns.",
      },
      {
        question: "What is the maturity value of my SIP investment?",
        answer:
          "The maturity value of your SIP investment is the amount you will receive at the end of the tenure, including the capital invested and the returns generated. Our SIP calculator provides you with this estimate.",
      },
      {
        question: "Is SIP investment tax-free?",
        answer:
          "No, SIP investment is not tax-free. The returns on your SIP are subject to capital gains tax depending on the holding period. Use our income tax calculator to estimate taxes on your SIP returns.",
      },
      {
        question: "What are the benefits of investing in SIP?",
        answer:
          "SIP allows you to invest in mutual funds regularly, helping you average out the cost of your investment. It’s a great strategy for long-term wealth accumulation. Our SIP calculator demonstrates how your SIP grows over time.",
      },
      {
        question: "How do I calculate returns for lump sum SIP investments?",
        answer:
          "For lump sum SIP investments, you need to input the total investment amount and expected returns into the SIP calculator. The tool will estimate the maturity value based on your lump sum contributions.",
      },
      {
        question: "Can SIP be started with a low amount?",
        answer:
          "Yes, you can start SIP with as low as ₹500 per month. Our SIP calculator allows you to simulate returns on low or high SIP investments.",
      },
      {
        question: "What is the SIP interest rate?",
        answer:
          "SIP returns are based on the mutual fund’s historical performance and expected returns, not a fixed interest rate. Use our SIP calculator to estimate potential returns based on the projected rate of return.",
      },
      {
        question: "Can I stop my SIP anytime?",
        answer:
          "Yes, SIP can be stopped at any time. However, doing so may impact your long-term returns. The SIP calculator assumes that your SIP runs for the chosen tenure.",
      },
      {
        question: "What is the SIP return calculation formula?",
        answer:
          "The SIP return calculation is based on the compounding effect of your monthly investments. Our SIP calculator automates this calculation to give you an accurate return estimate.",
      },
      {
        question: "Are SIP returns taxable?",
        answer:
          "SIP returns are subject to capital gains tax. Short-term gains (less than 3 years) are taxed at 15%, and long-term gains are taxed at 10% without indexation. Use our tax calculator to determine the taxes on your SIP returns.",
      },
    ],
  },
  lumpsum: {
    faqs: [
      {
        question: "What is a lumpsum investment in mutual funds?",
        answer:
          "A lumpsum investment in mutual funds refers to investing a large amount of money at once into a particular mutual fund scheme. It is a one-time investment, ideal for investors with a lump sum amount and a long-term investment horizon.",
      },
      {
        question: "How does the lumpsum investment calculator work?",
        answer:
          "Our lumpsum investment calculator helps you estimate the potential returns on your investment by considering factors like the investment amount, duration, expected rate of return, and mutual fund scheme type. It gives you a clear picture of your future investment growth.",
      },
      {
        question:
          "What are the benefits of lumpsum investment in mutual funds?",
        answer:
          "Lumpsum investment in mutual funds offers several benefits, including higher potential returns due to compounding, the ability to invest a significant amount at once, and taking advantage of market movements for long-term growth.",
      },
      {
        question:
          "What is the ideal amount for lumpsum investment in mutual funds?",
        answer:
          "The ideal amount for a lumpsum investment depends on your financial goals, risk tolerance, and investment horizon. Typically, investors with a substantial sum to invest for long-term objectives prefer lumpsum investments in mutual funds.",
      },
      {
        question:
          "Can I use the lumpsum investment calculator for any mutual fund?",
        answer:
          "Yes, our lumpsum investment calculator can be used for any mutual fund. Simply enter the relevant details such as the amount, time horizon, and expected returns, and get an accurate projection for your specific mutual fund scheme.",
      },
      {
        question:
          "How is the return on lumpsum investment in mutual funds calculated?",
        answer:
          "The return on lumpsum investment in mutual funds is calculated based on the rate of return (CAGR) provided by the mutual fund. Our calculator factors in compounding to give you an estimate of the future value of your lumpsum investment.",
      },
      {
        question:
          "What factors should I consider before making a lumpsum investment?",
        answer:
          "Before making a lumpsum investment in mutual funds, consider factors like your investment goals, risk appetite, market conditions, and the past performance of the mutual fund. Our calculator can help you assess potential returns based on these factors.",
      },
      {
        question:
          "Can lumpsum investments in mutual funds be withdrawn anytime?",
        answer:
          "Yes, lumpsum investments in mutual funds can be withdrawn anytime, subject to the mutual fund's redemption rules. However, it's recommended to stay invested for the long term to reap the maximum benefits from market growth and compounding.",
      },
      {
        question:
          "How do I choose the right mutual fund for lumpsum investment?",
        answer:
          "Choosing the right mutual fund for a lumpsum investment depends on factors such as your risk tolerance, investment goals, and time horizon. Equity mutual funds are ideal for long-term capital appreciation, while debt funds are suited for conservative investors seeking stable returns.",
      },
      {
        question:
          "What is the difference between lumpsum and SIP investment in mutual funds?",
        answer:
          "Lumpsum investment involves investing a large sum of money at once, while SIP (Systematic Investment Plan) allows you to invest smaller amounts periodically. Lumpsum investments are ideal for those with a large sum of money, while SIP is suitable for regular, smaller investments.",
      },
    ],
  },
  loanEMI: {
    faqs: [
      {
        question: "How can I calculate my loan EMI?",
        answer:
          "Our loan EMI calculator helps you determine your monthly EMI based on your loan amount, interest rate, and tenure. Simply input the loan details, and the tool will provide the EMI amount.",
      },
      {
        question: "What is an EMI?",
        answer:
          "EMI stands for Equated Monthly Installment, which is the fixed amount paid each month towards repaying a loan. Our loan EMI calculator helps you determine this amount accurately.",
      },
      {
        question: "What is the loan eligibility based on EMI?",
        answer:
          "Loan eligibility depends on your monthly income, existing debt obligations, and the loan EMI. Use our loan EMI calculator to simulate different scenarios and determine the loan amount you are eligible for.",
      },
      {
        question: "Can I prepay my loan EMI?",
        answer:
          "Yes, you can prepay your loan EMI, but it may come with a prepayment penalty or change the loan terms. Our calculator doesn’t account for prepayments but can estimate the total cost of the loan over time.",
      },
      {
        question: "How is interest calculated on a loan?",
        answer:
          "Loan interest is usually calculated either on a reducing balance or flat-rate basis. Our loan EMI calculator uses the reducing balance method to calculate accurate interest payments.",
      },
      {
        question: "Can I reduce my EMI amount?",
        answer:
          "You can reduce your EMI amount by either increasing the loan tenure or lowering the loan amount. Use our loan EMI calculator to check the impact of adjusting these parameters.",
      },
      {
        question: "What happens if I miss an EMI payment?",
        answer:
          "Missing an EMI payment may result in late fees, penalties, and a negative impact on your credit score. Always try to ensure timely EMI payments to avoid these consequences.",
      },
      {
        question: "How does the loan tenure affect EMI?",
        answer:
          "A longer loan tenure results in lower EMI payments but higher total interest paid over the loan's life. Use our EMI calculator to adjust the tenure and find the best balance for your financial goals.",
      },
      {
        question: "Can I change my EMI payment frequency?",
        answer:
          "Some loans allow for flexible EMI payment frequencies (monthly, quarterly, etc.), depending on the lender’s terms. Our EMI calculator assumes monthly payments for standard calculations.",
      },
      {
        question: "Is loan EMI tax-deductible?",
        answer:
          "Loan EMI repayments are not directly tax-deductible, but you may be able to claim deductions on the interest paid if the loan is for specific purposes like home loans. Consult with a tax advisor for more details.",
      },
    ],
  },
});
