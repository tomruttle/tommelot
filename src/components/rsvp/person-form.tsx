import Input from "../form/input";

export default function PersonForm({ nameName, emailName, phoneName }: { nameName: string, emailName: string, phoneName: string }) {
  return (
    <>
      <Input id="name" name={nameName} label="Full Name" />
      <Input id="email" name={emailName} label="Email Address" type="email" />
      <Input id="phone" name={phoneName} label="Phone Number" type="tel" />
    </>
  )
}