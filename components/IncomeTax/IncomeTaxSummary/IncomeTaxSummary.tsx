"use client";

import Section from "@/components/Section/Section";
import { formatPrice } from "@/helpers/price";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Budget, CalculatedTaxSlab, ITOtherTax } from "@/types/ConfigTypes";
import { Ref } from "react";
import styles from "./IncomeTaxSummary.module.css";

type Props = {
  income: number;
  budget: Budget;
  taxLiabilityRef: Ref<HTMLDivElement>;
  getTaxCalculationSummary: () => {
    marginalRelief: number;
    rebate: number;
    totalIncomeTax: number;
    incomeAfterDeductions: number;
    applicableTaxSlabs: CalculatedTaxSlab[];
    otherTaxes: ITOtherTax[];
    standardDeduction: number;
  };
};

const IncomeTaxSummary = ({
  income,
  budget,
  taxLiabilityRef,
  getTaxCalculationSummary,
}: Props) => {
  const {
    marginalRelief,
    rebate,
    totalIncomeTax,
    incomeAfterDeductions,
    applicableTaxSlabs,
    otherTaxes,
    standardDeduction,
  } = getTaxCalculationSummary();

  return (
    <Section title="Summary of Tax">
      <h6 className={styles.summaryTitle}>Income Details</h6>
      <span className={styles.summaryDistribution}>
        <span>Annual Income</span>
        <span>₹{formatPrice(income)}</span>
      </span>

      <h6 className={styles.summaryTitle}>Deducations</h6>
      <span className={styles.summaryDistribution}>
        <span>Standard Deducation</span>
        <span className={styles.profit}>
          {`- ₹${formatPrice(standardDeduction)}`}
        </span>
      </span>

      <h6 className={styles.summaryTitle}>Taxable Income</h6>
      <span className={styles.summaryDistribution}>
        <span>Income After Deductions</span>
        <span>₹{formatPrice(incomeAfterDeductions)}</span>
      </span>

      {!!applicableTaxSlabs.length && (
        <>
          <h6 className={styles.summaryTitle}>Tax Slabs Calculation</h6>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tax Slab</TableCell>
                  <TableCell align="right">Tax Rate</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applicableTaxSlabs.map((row) => (
                  <TableRow
                    key={row.taxInPercent}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {`₹${formatPrice(row.incomeFrom)} to ₹${formatPrice(
                        row.incomeTo
                      )}`}
                    </TableCell>
                    <TableCell align="right">{`${row.taxInPercent}%`}</TableCell>
                    <TableCell align="right">
                      {`₹${formatPrice(row.applicableTax)}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <h6 className={styles.summaryTitle}>Income Tax Calculation</h6>
      <span className={styles.summaryDistribution}>
        <span>Taxable Income</span>
        <span>₹{formatPrice(incomeAfterDeductions)}</span>
      </span>
      <span className={styles.summaryDistribution}>
        <span>Applicable Income Tax</span>
        <span className={styles.loss}>-₹{formatPrice(totalIncomeTax)}</span>
      </span>
      {!!rebate && (
        <span className={styles.summaryDistribution}>
          <span>{`Rebate upto ₹${budget.rebate.amount}`}</span>
          <span className={styles.profit}>-₹{formatPrice(rebate)}</span>
        </span>
      )}
      {!!marginalRelief && (
        <span className={styles.summaryDistribution}>
          <span>Marginal Relief</span>
          <span className={styles.profit}>-₹{formatPrice(marginalRelief)}</span>
        </span>
      )}
      {otherTaxes.map(({ name, taxPercent, applicableTax }) => (
        <span key={name} className={styles.summaryDistribution}>
          <span>{`${name} (${taxPercent}%)`}</span>
          <span className={styles.loss}>{`- ₹${formatPrice(
            applicableTax
          )}`}</span>
        </span>
      ))}

      <h6 className={styles.summaryTitle}>Tax Liability</h6>
      <div ref={taxLiabilityRef} className={styles.taxAmoundBanner}>
        ₹{formatPrice(totalIncomeTax)}
      </div>
      <h6 className={styles.summaryTitle}>Income After Tax</h6>
      <span className={styles.summaryDistribution}>
        <span>Yearly Income</span>
        <span>₹{formatPrice(income - totalIncomeTax)}</span>
      </span>
      <span className={styles.summaryDistribution}>
        <span>Average Monthly Income</span>
        <span>₹{formatPrice((income - totalIncomeTax) / 12)}</span>
      </span>
    </Section>
  );
};

export default IncomeTaxSummary;
