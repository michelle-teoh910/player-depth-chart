import { createListCollection, Portal, Select } from '@chakra-ui/react';

import { MdFilterListAlt } from 'react-icons/md';

import { useAppSelector } from '../../store/hook';

type Option = { label: string; value: string };

export function SportFilter({
  onChange,
}: {
  onChange: (value: string[]) => void;
}) {
  const sports = useAppSelector((state) => state.sports.sports);

  const sportOptions: { items: Option[] } = createListCollection({
    items: sports.map((sport) => ({
      label: sport.name,
      value: sport.name,
    })),
  });

  return (
    <Select.Root
      collection={sportOptions}
      size="sm"
      width={320}
      onValueChange={(option: { value: string[] }) => onChange(option.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger justifyContent="start">
          <MdFilterListAlt />
          <Select.ValueText placeholder="Select filter" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {sportOptions.items.map((option) => (
              <Select.Item item={option} key={`filter-${option.value}`}>
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
