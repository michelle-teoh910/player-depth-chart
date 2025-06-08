import { Button, createListCollection, Input, Stack } from '@chakra-ui/react';
import { useTransition, type RefObject } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { addPlayer } from '../../../store/slices/sports';

import FormControl from '../../ui/form-control';
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
          </FormControl>
        )}

        {selectedPosition && (
          <>
            <FormControl
              errorMessage={errors.playerName?.message}
              invalid={!!errors.playerName}
              label="Player name"
              required
            >
              <Controller
                control={control}
                name="playerName"
                rules={{ required: 'Player name is required' }}
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>

            <FormControl
              errorMessage={errors.spot?.message}
              invalid={!!errors.spot}
              label="Spot"
              optional
            >
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
            </FormControl>
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
