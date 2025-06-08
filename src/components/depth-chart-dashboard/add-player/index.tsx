import {
  Button,
  CloseButton,
  Dialog as PrimitiveDialog,
  Portal,
} from '@chakra-ui/react';

import { useRef, useState } from 'react';
import { MdGroupAdd } from 'react-icons/md';

import { AddPlayerForm } from './form';

export function AddPlayer() {
  const [open, setOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <PrimitiveDialog.Root
        lazyMount
        open={open}
        onOpenChange={({ open }: { open: boolean }) => setOpen(open)}
      >
        <PrimitiveDialog.Trigger asChild>
          <Button variant="solid" size={{ base: 'sm', md: 'md' }}>
            Add Player <MdGroupAdd />
          </Button>
        </PrimitiveDialog.Trigger>
        <Portal>
          <PrimitiveDialog.Backdrop />
          <PrimitiveDialog.Positioner>
            <PrimitiveDialog.Content ref={contentRef}>
              <PrimitiveDialog.Header>
                <PrimitiveDialog.Title>
                  Enter Player Details
                </PrimitiveDialog.Title>
              </PrimitiveDialog.Header>
              <PrimitiveDialog.Body>
                <AddPlayerForm
                  contentRef={contentRef}
                  onSubmitSuccess={() => setOpen(false)}
                />
              </PrimitiveDialog.Body>
              <PrimitiveDialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </PrimitiveDialog.CloseTrigger>
            </PrimitiveDialog.Content>
          </PrimitiveDialog.Positioner>
        </Portal>
      </PrimitiveDialog.Root>
    </>
  );
}
