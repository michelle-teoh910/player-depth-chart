import { Portal, Select, SelectRootProps } from '@chakra-ui/react';

import { type RefObject } from 'react';

type Option = { label: string; value: string };

export default function DropdownSelect({
  options,
  parentRef,
  placeholder = '',
  ...rest
}: Omit<SelectRootProps, 'collection'> & {
  options: { items: Option[] };
  /**
   * Use this only when the dropdown is rendered inside a dialog.
   * See docs: https://www.chakra-ui.com/docs/components/select#within-dialog
   */
  parentRef?: RefObject<HTMLElement | null>;
  placeholder?: string;
  value: string[];
}) {
  return (
    <Select.Root collection={options} {...rest}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal container={parentRef}>
        <Select.Positioner>
          <Select.Content>
            {options.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
