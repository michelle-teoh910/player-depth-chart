import {
  Button,
  createListCollection,
  Field,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useTransition, type RefObject } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { addPlayer } from '../../../store/slices/sports';

import DropdownSelect from '../../ui/select';
import { LINEUP_SPOTS } from '../../../utility/constants';

interface FormValues {
  playerName: string;
  position: string;
  sport: string;
  spot: string;
}

type Option = { label: string; value: string };

export function AddPlayerForm({
  contentRef,
  onSubmitSuccess,
}: {
  contentRef: RefObject<HTMLElement | null>;
  onSubmitSuccess: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const sports = useAppSelector((state) => state.sports.sports);
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const selectedSport = form.watch('sport');
  const selectedPosition = form.watch('position');

  const sportOptions: { items: Option[] } = createListCollection({
    items:
      sports.map((sport) => ({
        label: sport.name,
        value: sport.name,
      })) || [],
  });

  const selectedSportData = sports.find(
    (sport) => sport.name === selectedSport
  );

  const positionOptions: { items: Option[] } = createListCollection({
    items:
      selectedSportData?.position?.map((pos) => ({
        label: pos.name,
        value: pos.name,
      })) || [],
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      dispatch(
        addPlayer({
          sportName: data.sport,
          positionName: data.position,
          spot: data.spot,
          playerName: data.playerName,
        })
      );

      onSubmitSuccess();
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.sport}>
          <Field.Label>Sports</Field.Label>
          <Controller
            control={control}
            name="sport"
            render={({ field }) => (
              <DropdownSelect
                defaultValue={[sportOptions.items[0].value]}
                name={field.name}
                options={sportOptions}
                parentRef={contentRef}
                placeholder="Select sport type"
                value={[field.value]}
                onInteractOutside={() => field.onBlur()}
                onValueChange={(option: { value: string[] }) =>
                  field.onChange(option.value[0])
                }
              />
            )}
          />
          <Field.ErrorText>{errors.sport?.message}</Field.ErrorText>
        </Field.Root>

        {positionOptions.items.length > 0 && (
          <Field.Root invalid={!!errors.position}>
            <Field.Label>Position</Field.Label>
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <DropdownSelect
                  name={field.name}
                  options={positionOptions}
                  parentRef={contentRef}
                  placeholder="Select a position"
                  value={[field.value]}
                  onInteractOutside={() => field.onBlur()}
                  onValueChange={(option: { value: string[] }) =>
                    field.onChange(option.value[0])
                  }
                />
              )}
            />
            <Field.ErrorText>{errors.position?.message}</Field.ErrorText>
          </Field.Root>
        )}

        {selectedPosition && (
          <>
            <Field.Root invalid={!!errors.playerName}>
              <Field.Label>Player Name</Field.Label>
              <Input {...register('playerName')} />
              <Field.ErrorText>{errors.playerName?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.spot}>
              <Field.Label>Spot</Field.Label>
              <Controller
                control={control}
                name="spot"
                render={({ field }) => (
                  <DropdownSelect
                    name={field.name}
                    value={[field.value]}
                    options={spotOptions}
                    placeholder="Select a spot"
                    parentRef={contentRef}
                    onInteractOutside={() => field.onBlur()}
                    onValueChange={(option: { value: number[] }) =>
                      field.onChange(option.value[0])
                    }
                  />
                )}
              />
              <Field.ErrorText>{errors.position?.message}</Field.ErrorText>
            </Field.Root>
          </>
        )}

        <Button type="submit" disabled={isPending} loading={isPending}>
          Add Player
        </Button>
      </Stack>
    </form>
  );
}

const spotOptions = createListCollection({
  items: LINEUP_SPOTS.map((spot, index) => {
    return {
      label: spot,
      value: index,
    };
  }),
});
