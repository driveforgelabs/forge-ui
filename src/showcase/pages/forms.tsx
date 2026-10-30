import * as React from "react"
import { useForm } from "react-hook-form"
import { Combobox } from "@/components/combobox"
import { PhoneInput } from "@/components/phone-input"
import { TagInput } from "@/components/tag-input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Section } from "../section"

const makes = ["Audi", "BMW", "Ford", "Mercedes-Benz", "Renault", "Toyota", "Volkswagen"].map(
  (m) => ({ value: m.toLowerCase(), label: m }),
)

export function FormsPage() {
  const [make, setMake] = React.useState("bmw")
  const [phone, setPhone] = React.useState("")
  const [tags, setTags] = React.useState(["brakes", "urgent"])
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 30))
  const form = useForm({ defaultValues: { plate: "", notes: "" } })

  return (
    <>
      <Section title="Text fields">
        <div className="grid max-w-xl gap-4">
          <div className="grid gap-2">
            <Label htmlFor="n">Customer name</Label>
            <Input id="n" placeholder="Maria Santos" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="e">Email (invalid)</Label>
            <Input id="e" aria-invalid defaultValue="not-an-email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="d">Disabled</Label>
            <Input id="d" disabled defaultValue="Read only" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="t">Notes</Label>
            <Textarea id="t" placeholder="Describe the issue…" />
          </div>
        </div>
      </Section>
      <Section title="Selection">
        <div className="grid max-w-xl gap-4">
          <div className="grid gap-2">
            <Label>Select</Label>
            <Select defaultValue="open">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="progress">In progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Combobox</Label>
            <Combobox
              options={makes}
              value={make}
              onValueChange={setMake}
              placeholder="Vehicle make"
            />
          </div>
          <div className="grid gap-2">
            <Label>Phone input</Label>
            <PhoneInput
              defaultCountry="PT"
              value={phone}
              onChange={(v) => setPhone(v)}
              placeholder="912 345 678"
            />
          </div>
          <div className="grid gap-2">
            <Label>Tag input</Label>
            <TagInput value={tags} onValueChange={setTags} placeholder="Add a tag…" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="c" defaultChecked />
            <Label htmlFor="c">Send confirmation SMS</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="s" defaultChecked />
            <Label htmlFor="s">Notify customer</Label>
          </div>
          <RadioGroup defaultValue="card">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="card" id="r1" />
              <Label htmlFor="r1">Card</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="cash" id="r2" />
              <Label htmlFor="r2">Cash</Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label>Slider</Label>
            <Slider defaultValue={[40]} max={100} />
          </div>
        </div>
      </Section>
      <Section title="Form (react-hook-form)">
        <Form {...form}>
          <form className="grid max-w-xl gap-4" onSubmit={form.handleSubmit(() => undefined)}>
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licence plate</FormLabel>
                  <FormControl>
                    <Input className="font-mono" placeholder="AA-00-BB" {...field} />
                  </FormControl>
                  <FormDescription>Shown on the work order.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit">
              Save
            </Button>
          </form>
        </Form>
      </Section>
      <Section title="Calendar">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-fit"
        />
      </Section>
    </>
  )
}
