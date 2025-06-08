import { Alert, Button, createListCollection, Stack } from '@chakra-ui/react';
import { useTransition, type RefObject } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { removePlayer } from '../../../store/slices/sports';

import FormControl from '../../ui/form-control';
import DropdownSelect from '../../ui/select';

import { LINEUP_SPOTS } from '../../../utility/constants';

interface FormValues {
  position: string;
  sport: string;
  spot: string;
}

type Option = { label: string; value: string };

export function RemovePlayerForm({
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
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const selectedSport = form.watch('sport');
  const selectedPosition = form.watch('position');

  const sportOptions: { items: Option[] } = createListCollection({
    items: sports.map((sport) => ({
      label: sport.name,
      value: sport.name,
    })),
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

  const selectedPositionData = selectedSportData?.position.find(
    (pos) => pos.name === selectedPosition
  );

  const spotOptions: { items: Option[] } = createListCollection({
    items:
      selectedPositionData?.spots?.map((player, index) => ({
        label: `${player} (${LINEUP_SPOTS[index]})`,
        value: index,
      })) || [],
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      dispatch(
        removePlayer({
          sportName: data.sport,
          positionName: data.position,
          spot: data.spot,
        })
      );

      onSubmitSuccess();
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <FormControl
          errorMessage={errors.sport?.message}
          invalid={!!errors.sport}
          label="Sport"
          required
        >
          <Controller
            control={control}
            name="sport"
            rules={{ required: 'Sport type is required' }}
            render={({ field }) => (
              <DropdownSelect
                name={field.name}
                value={[field.value]}
                onValueChange={(option: { value: string[] }) =>
                  field.onChange(option.value[0])
                }
                onInteractOutside={() => field.onBlur()}
                options={sportOptions}
                parentRef={contentRef}
                placeholder="Select sport type"
              />
            )}
          />
        </FormControl>

        {positionOptions.items.length > 0 && (
          <FormControl
            errorMessage={errors.position?.message}
            invalid={!!errors.position}
            label="Position"
            required
          >
            <Controller
              control={control}
              name="position"
              rules={{ required: 'Position is required' }}
              render={({ field }) => (
                <DropdownSelect
                  name={field.name}
                  value={[field.value]}
                  options={positionOptions}
                  placeholder="Select a position"
                  parentRef={contentRef}
                  onInteractOutside={() => field.onBlur()}
                  onValueChange={(option: { value: string[] }) =>
                    field.onChange(option.value[0])
                  }
                />
              )}
            />
          </FormControl>
        )}

        {selectedPosition ? (
          spotOptions.items.length > 0 ? (
            <FormControl
              errorMessage={errors.spot?.message}
              invalid={!!errors.spot}
              label="Spot"
              required
            >
              <Controller
                control={control}
                name="spot"
                rules={{ required: 'Spot is required' }}
                render={({ field }) => (
                  <DropdownSelect
                    name={field.name}
                    value={[field.value]}
                    options={spotOptions}
                    placeholder="Please select a spot"
                    parentRef={contentRef}
                    onInteractOutside={() => field.onBlur()}
                    onValueChange={(option: { value: number[] }) =>
                      field.onChange(option.value[0])
                    }
                  />
                )}
              />
            </FormControl>
          ) : (
            <Alert.Root status="warning">
              <Alert.Indicator />
              <Alert.Title>
                No spots available for the selected position. Please select a
                different position or add players first.
              </Alert.Title>
            </Alert.Root>
          )
        ) : null}

        <Button type="submit" disabled={isPending} loading={isPending}>
          Remove Player
        </Button>
      </Stack>
    </form>
  );
}
