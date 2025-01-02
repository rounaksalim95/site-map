import React, { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as LabelPrimitive from '@radix-ui/react-label';

interface InputFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    tooltip?: string;
    min?: number;
    max?: number;
    step?: number;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    tooltip,
    min,
    max,
    step = 1,
}) => {
    return (
        <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
                <LabelPrimitive.Root className="text-sm font-medium">
                    {label}
                </LabelPrimitive.Root>
                {tooltip && (
                    <TooltipPrimitive.Provider delayDuration={200}>
                        <TooltipPrimitive.Root>
                            <TooltipPrimitive.Trigger asChild>
                                <span className="cursor-pointer text-sm text-gray-500">ⓘ</span>
                            </TooltipPrimitive.Trigger>
                            <TooltipPrimitive.Content
                                className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg text-sm max-w-xs text-gray-900 dark:text-gray-100"
                                sideOffset={5}
                            >
                                {tooltip}
                                <TooltipPrimitive.Arrow className="fill-white dark:fill-gray-800" />
                            </TooltipPrimitive.Content>
                        </TooltipPrimitive.Root>
                    </TooltipPrimitive.Provider>
                )}
            </div>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="border rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
};

const BuyVsRentCalculator: React.FC = () => {
    const [homePrice, setHomePrice] = useState(1500000);
    const [closingCostPercent, setClosingCostPercent] = useState(4);
    const [mortgageRate, setMortgageRate] = useState(6.62);
    const [homeInsurance, setHomeInsurance] = useState(250);
    const [hoaFees, setHoaFees] = useState(600);
    const [maintenance, setMaintenance] = useState(17000);
    const [propertyTaxPercent, setPropertyTaxPercent] = useState(1);
    const [rent, setRent] = useState(4500);
    const [rentalInsurance, setRentalInsurance] = useState(7);
    const [rentIncreasePercent, setRentIncreasePercent] = useState(3.6);
    const [investmentReturn, setInvestmentReturn] = useState(10.73);
    const [homeAppreciationRate, setHomeAppreciationRate] = useState(5);

    const calculatedData = useMemo(() => {
        const years = Array.from({ length: 31 }, (_, i) => i);
        const downPayment = homePrice * 0.2;
        const closingCosts = (homePrice * closingCostPercent) / 100;
        const monthlyMortgage = (homePrice - downPayment) *
            (mortgageRate / 1200 * Math.pow(1 + mortgageRate / 1200, 360)) /
            (Math.pow(1 + mortgageRate / 1200, 360) - 1);

        return years.map(year => {
            // Buying scenario
            const yearlyMortgage = monthlyMortgage * 12;
            const yearlyPropertyTax = (homePrice * Math.pow(1 + homeAppreciationRate/100, year)) * (propertyTaxPercent / 100);
            const yearlyHomeInsurance = homeInsurance;
            const yearlyHOA = hoaFees * 12;
            const yearlyMaintenance = maintenance;
            const homeValue = homePrice * Math.pow(1 + homeAppreciationRate/100, year);

            // Renting scenario
            const yearlyRent = rent * Math.pow(1 + rentIncreasePercent / 100, year) * 12;
            const yearlyRentalInsurance = rentalInsurance * 12;

            // Investment returns for renting scenario
            const initialInvestment = downPayment + closingCosts;
            const yearlyInvestmentReturns = initialInvestment * Math.pow(1 + investmentReturn/100, year);
            const monthlySavings = yearlyMortgage + yearlyPropertyTax + yearlyHomeInsurance +
                yearlyHOA + yearlyMaintenance - yearlyRent - yearlyRentalInsurance;
            const additionalInvestments = monthlySavings > 0 ?
                monthlySavings * (Math.pow(1 + investmentReturn/100, year) - 1) / (investmentReturn/100) : 0;

            return {
                year,
                buyingNetWorth: homeValue - (year < 30 ? (homePrice - downPayment) * (1 - year / 30) : 0),
                rentingNetWorth: yearlyInvestmentReturns + additionalInvestments,
            };
        });
    }, [
        homePrice,
        closingCostPercent,
        mortgageRate,
        homeInsurance,
        hoaFees,
        maintenance,
        propertyTaxPercent,
        rent,
        rentalInsurance,
        rentIncreasePercent,
        investmentReturn,
        homeAppreciationRate,
    ]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Buy vs Rent Calculator</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Costs in Buying</h2>
                    <InputField
                        label="Home Price ($)"
                        value={homePrice}
                        onChange={setHomePrice}
                        min={0}
                    />
                    <InputField
                        label="Closing Costs (%)"
                        value={closingCostPercent}
                        onChange={setClosingCostPercent}
                        tooltip="Typically ranges from 2-5% of the purchase price"
                        min={0}
                        max={100}
                        step={0.1}
                    />
                    <InputField
                        label="Fixed Mortgage Rate (%)"
                        value={mortgageRate}
                        onChange={setMortgageRate}
                        tooltip="Currently only considers a 30 year mortgage"
                        min={0}
                        max={100}
                        step={0.01}
                    />
                    <InputField
                        label="Home Insurance ($/year)"
                        value={homeInsurance}
                        onChange={setHomeInsurance}
                        min={0}
                    />
                    <InputField
                        label="HOA Fees ($/month)"
                        value={hoaFees}
                        onChange={setHoaFees}
                        min={0}
                    />
                    <InputField
                        label="Maintenance and Repairs ($/year)"
                        value={maintenance}
                        onChange={setMaintenance}
                        min={0}
                    />
                    <InputField
                        label="Home Appreciation Rate (%)"
                        value={homeAppreciationRate}
                        onChange={setHomeAppreciationRate}
                        tooltip="Historical average is around 5% per year"
                        min={0}
                        max={100}
                        step={0.01}
                    />
                    <InputField
                        label="Property Tax (%)"
                        value={propertyTaxPercent}
                        onChange={setPropertyTaxPercent}
                        tooltip="Varies by state: 0.32% (Hawaii) to 2.23% (New Jersey)"
                        min={0}
                        max={100}
                        step={0.01}
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Costs in Renting</h2>
                    <InputField
                        label="Monthly Rent ($)"
                        value={rent}
                        onChange={setRent}
                        min={0}
                    />
                    <InputField
                        label="Rental Insurance ($/month)"
                        value={rentalInsurance}
                        onChange={setRentalInsurance}
                        min={0}
                    />
                    <InputField
                        label="Yearly Rent Increase (%)"
                        value={rentIncreasePercent}
                        onChange={setRentIncreasePercent}
                        tooltip="Varies drastically depending on whether your rental is rent controlled or not"
                        min={0}
                        max={100}
                        step={0.1}
                    />

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Investment Returns</h2>
                        <InputField
                            label="S&P 500 Annual Return (%)"
                            value={investmentReturn}
                            onChange={setInvestmentReturn}
                            tooltip="Historical S&P 500 average return is around 10.73%"
                            min={0}
                            max={100}
                            step={0.01}
                        />
                    </div>
                </div>
            </div>

            <div className="h-[500px] w-full">
                <ResponsiveContainer>
                    <LineChart
                        data={calculatedData}
                        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            label={{
                                value: 'Years',
                                position: 'bottom',
                                offset: 0
                            }}
                        />
                        <YAxis
                            label={{
                                value: 'Net Worth ($)',
                                angle: -90,
                                position: 'insideLeft',
                                offset: -10
                            }}
                            tickFormatter={(value) => {
                                if (Math.abs(value) >= 1000000) {
                                    return `$${(value / 1000000).toFixed(1)}M`;
                                }
                                return `$${(value / 1000).toFixed(0)}K`;
                            }}
                            width={100}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => {
                                const label = name === "Buying" ? "Buying" : "Renting";
                                return [`$${value.toLocaleString()}`, label];
                            }}
                            labelFormatter={(label) => `Year ${label}`}
                            contentStyle={{
                                backgroundColor: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: 'var(--text-color)'
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                paddingTop: '10px'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="buyingNetWorth"
                            name="Buying"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="rentingNetWorth"
                            name="Renting"
                            stroke="#82ca9d"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BuyVsRentCalculator; 