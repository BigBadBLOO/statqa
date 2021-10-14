declare interface SelectorOption {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

declare interface GroupedOption {
  readonly label: string;
  readonly options: readonly SelectorOption[];
}