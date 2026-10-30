import { type ComponentType, lazy } from "react"

type Page = { id: string; title: string; component: ComponentType }

// One chunk per page, so the showcase shell loads without every component demo.
const page = <T extends Record<string, ComponentType>>(load: () => Promise<T>, name: keyof T) =>
  lazy(async () => ({ default: (await load())[name] }))

export const pages: [Page, ...Page[]] = [
  {
    id: "actions",
    title: "Buttons & actions",
    component: page(() => import("./actions"), "ActionsPage"),
  },
  { id: "forms", title: "Forms", component: page(() => import("./forms"), "FormsPage") },
  { id: "data", title: "Data display", component: page(() => import("./data"), "DataPage") },
  {
    id: "feedback",
    title: "Feedback",
    component: page(() => import("./feedback"), "FeedbackPage"),
  },
  {
    id: "overlays",
    title: "Overlays & menus",
    component: page(() => import("./overlays"), "OverlaysPage"),
  },
  {
    id: "layout",
    title: "Navigation & layout",
    component: page(() => import("./layout"), "LayoutPage"),
  },
  {
    id: "more-stock",
    title: "More stock components",
    component: page(() => import("./more-stock"), "MoreStockPage"),
  },
  {
    id: "composed-inputs",
    title: "Composed: inputs",
    component: page(() => import("./composed-inputs"), "ComposedInputsPage"),
  },
  {
    id: "composed-data",
    title: "Composed: data & status",
    component: page(() => import("./composed-data"), "ComposedDataPage"),
  },
  { id: "theme", title: "Theme tokens", component: page(() => import("./theme"), "ThemePage") },
  {
    id: "service-form",
    title: "Service form (example)",
    component: page(() => import("./service-form"), "ServiceFormPage"),
  },
]
