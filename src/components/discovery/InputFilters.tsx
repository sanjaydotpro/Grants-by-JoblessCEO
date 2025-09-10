"use client";

import React, { useEffect, useState } from "react";
import CustomCombobox from "@/components/ui/custom-combobox";
import { SingleTag } from "@/types/index";
import CustomSlider from "@/components/ui/custom-slider";

const CategoryFilter = ({ filter }: { filter: SingleTag[] }) => (
  <>{filter && <CustomCombobox selectedFilter="category" data={filter} />}</>
);

const FeatureFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>{filter && <CustomCombobox selectedFilter="feature" data={filter} />}</>
  );
};

const IssuerFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>{filter && <CustomCombobox selectedFilter="issuer" data={filter} />}</>
  );
};

const CollaboratorFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      {filter && <CustomCombobox selectedFilter="collaborator" data={filter} />}
    </>
  );
};

const NetworkFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>{filter && <CustomCombobox selectedFilter="network" data={filter} />}</>
  );
};

const EmploymentFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      {filter && <CustomCombobox selectedFilter="employment" data={filter} />}
    </>
  );
};

const IncomeFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      <CustomSlider selectedFilter="income" data={filter} />
    </>
  );
};
const FeesFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      <CustomSlider selectedFilter="fees" data={filter} />
    </>
  );
};

const ValueBackFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      <CustomSlider selectedFilter="valueBack" data={filter} />
    </>
  );
};

const InterestRateFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      <CustomSlider selectedFilter="interestRate" data={filter} />
    </>
  );
};

const AgeFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      <CustomSlider selectedFilter="age" data={filter} />
    </>
  );
};

const CibilScoreFilter = ({ filter }: { filter: SingleTag[] }) => {
  return (
    <>
      <CustomSlider selectedFilter="cibilScore" data={filter} />
    </>
  );
};

export {
  CategoryFilter,
  CollaboratorFilter,
  NetworkFilter,
  FeesFilter,
  ValueBackFilter,
  FeatureFilter,
  EmploymentFilter,
  IncomeFilter,
  IssuerFilter,
  InterestRateFilter,
  AgeFilter,
  CibilScoreFilter,
};
