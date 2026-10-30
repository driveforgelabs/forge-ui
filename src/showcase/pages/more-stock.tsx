import {
  BellIcon,
  BoldIcon,
  ItalicIcon,
  MailIcon,
  PackageOpenIcon,
  UnderlineIcon,
  UserIcon,
} from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Spinner } from "@/components/ui/spinner"
import { Section } from "../section"

export function MoreStockPage() {
  const [otp, setOtp] = React.useState("")
  return (
    <>
      <Section title="Alert dialog (irreversible actions)">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Eliminar cliente</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar Maria Santos?</AlertDialogTitle>
              <AlertDialogDescription>
                Os 12 serviços associados ficam sem cliente. Esta ação não pode ser anulada.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast("Cliente eliminado")}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>

      <Section title="Button group, kbd, spinner">
        <div className="flex flex-wrap items-center gap-4">
          <ButtonGroup>
            <Button variant="outline">
              <BoldIcon />
            </Button>
            <Button variant="outline">
              <ItalicIcon />
            </Button>
            <Button variant="outline">
              <UnderlineIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Guardar</Button>
            <ButtonGroupSeparator />
            <Button variant="outline">Guardar e fechar</Button>
          </ButtonGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <Spinner /> <Spinner className="size-6" />
        </div>
      </Section>

      <Section title="Field (label, description, error)">
        <FieldSet className="max-w-md">
          <FieldLegend>Dados do cliente</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fn">Nome</FieldLabel>
              <Input id="fn" defaultValue="Maria Santos" />
              <FieldDescription>Como aparece nas faturas.</FieldDescription>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="fe">Email</FieldLabel>
              <Input id="fe" aria-invalid defaultValue="maria@" />
              <FieldError>Indique um email válido</FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>
      </Section>

      <Section title="Input group and OTP">
        <div className="grid max-w-md gap-4">
          <InputGroup>
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="email@oficina.pt" aria-label="Email" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>€</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              className="font-mono"
              defaultValue="45.00"
              aria-label="Valor por hora"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>/ hora</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <div className="grid gap-2">
            <span className="text-sm">Código por SMS</span>
            <InputOTP maxLength={6} value={otp} onChange={setOtp} aria-label="Código de 6 dígitos">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </Section>

      <Section title="Item (list rows) and empty">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-2">
              <ItemGroup>
                <Item>
                  <ItemMedia variant="icon">
                    <UserIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Maria Santos</ItemTitle>
                    <ItemDescription>12 serviços · último a 28 Out</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="outline">
                      Abrir
                    </Button>
                  </ItemActions>
                </Item>
                <ItemSeparator />
                <Item>
                  <ItemMedia variant="icon">
                    <BellIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Lembrete de revisão</ItemTitle>
                    <ItemDescription>Enviado por SMS há 2 dias</ItemDescription>
                  </ItemContent>
                </Item>
              </ItemGroup>
            </CardContent>
          </Card>
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageOpenIcon />
              </EmptyMedia>
              <EmptyTitle>Sem peças em stock</EmptyTitle>
              <EmptyDescription>
                Adicione a primeira peça para acompanhar níveis e custos.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">Adicionar peça</Button>
            </EmptyContent>
          </Empty>
        </div>
      </Section>

      <Section title="Menus: menubar, context menu, navigation menu, hover card">
        <div className="grid gap-4">
          <Menubar className="w-fit">
            <MenubarMenu>
              <MenubarTrigger>Ficheiro</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Novo serviço <MenubarShortcut>Ctrl N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Imprimir</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Ver</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Calendário</MenubarItem>
                <MenubarItem>Lista</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-60 gap-1 p-2">
                    <li>
                      <NavigationMenuLink href="#more-stock">Todos os serviços</NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#more-stock">Orçamentos</NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#more-stock">
                  Clientes
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex flex-wrap gap-4">
            <ContextMenu>
              <ContextMenuTrigger className="grid h-24 w-64 place-items-center rounded-md border border-dashed text-sm text-muted-foreground">
                Clique com o botão direito
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  Duplicar <ContextMenuShortcut>Ctrl D</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">Eliminar</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">12-AB-34</Button>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Renault Clio 1.5 dCi · 128 450 km · última revisão em Mai 2026
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </Section>

      <Section title="Pagination, carousel, aspect ratio">
        <Pagination className="mx-0 justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#more-stock" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#more-stock">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#more-stock" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#more-stock" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <Carousel className="mx-12 max-w-xs">
            <CarouselContent>
              {["Frente", "Lado", "Traseira"].map((t) => (
                <CarouselItem key={t}>
                  <AspectRatio
                    ratio={4 / 3}
                    className="grid place-items-center rounded-md bg-muted text-sm text-muted-foreground"
                  >
                    {t}
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="max-w-xs">
            <AspectRatio
              ratio={16 / 9}
              className="grid place-items-center rounded-md border bg-muted text-sm text-muted-foreground"
            >
              16 : 9
            </AspectRatio>
          </div>
        </div>
      </Section>
    </>
  )
}
