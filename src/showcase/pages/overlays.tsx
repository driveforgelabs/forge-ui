import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Section } from "../section"

export function OverlaysPage() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Section title="Dialog">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit customer</DialogTitle>
              <DialogDescription>Changes are saved to the work order.</DialogDescription>
            </DialogHeader>
            <Input defaultValue="Maria Santos" />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>
      <Section title="Sheet and drawer">
        <div className="flex flex-wrap gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow the list of orders.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Quick actions</DrawerTitle>
                <DrawerDescription>Swipe down to close.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Confirm</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </Section>
      <Section title="Menus, popover, tooltip">
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Order</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="text-sm">Popover content with details.</PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Helpful tooltip</TooltipContent>
          </Tooltip>
        </div>
      </Section>
      <Section title="Command">
        <Command className="max-w-md rounded-lg border shadow-xs">
          <CommandInput placeholder="Search actions…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem>New work order</CommandItem>
              <CommandItem>Find customer</CommandItem>
              <CommandItem>Open calendar</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Section>
    </>
  )
}
