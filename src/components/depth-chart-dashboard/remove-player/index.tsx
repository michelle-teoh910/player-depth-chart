import {
  Button,
  CloseButton,
  Dialog as PrimitiveDialog,
  Portal,
} from '@chakra-ui/react';

import { useRef, useState } from 'react';
import { MdGroupRemove } from 'react-icons/md';

import { RemovePlayerForm } from './form';

export function RemovePlayer() {
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
          <Button variant="outline" size={{ base: 'sm', md: 'md' }}>
            Remove Player <MdGroupRemove />
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
                <RemovePlayerForm
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
