import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockContact } from "../../../../testing";
import { ContactForm } from "../ContactForm";
import type { Props } from "../types";

const renderContactForm = (props?: Partial<Props>) => render((
  <ContactForm
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    error={props?.error || null}
    contact={props?.contact || null}
    isEditMode={props?.isEditMode || false}
  />
), { wrappers: { theme: true } });

describe("ContactForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText, container } = renderContactForm();

    const firstNameField = container.querySelector("input[id=firstName]") as HTMLInputElement;
    expect(await findByText(/First name/i)).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.value).toBe("");

    const lastNameField = container.querySelector("input[id=lastName]") as HTMLInputElement;
    expect(await findByText(/Last name/i)).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField.value).toBe("");

    const positionField = container.querySelector("input[id=position]") as HTMLInputElement;
    expect(await findByText(/position/i)).toBeInTheDocument();
    expect(positionField).toBeInTheDocument();
    expect(positionField.value).toBe("");

    const emailField = container.querySelector("input[id=email]") as HTMLInputElement;
    expect(await findByText(/Email/i)).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(emailField.value).toBe("");

    const phoneField = container.querySelector("input[id=phone]") as HTMLInputElement;
    expect(await findByText(/Phone/i)).toBeInTheDocument();
    expect(phoneField).toBeInTheDocument();
    expect(phoneField.value).toBe("");
  });

  test("render with prefill form", async () => {
    const { findByText, container } = renderContactForm({ contact: mockContact as never });

    const firstNameField = container.querySelector("input[id=firstName]") as HTMLInputElement;
    expect(await findByText(/First name/i)).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.value).toBe("Pylyp");

    const lastNameField = container.querySelector("input[id=lastName]") as HTMLInputElement;
    expect(await findByText(/Last name/i)).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField.value).toBe("Orlyk");

    const positionField = container.querySelector("input[id=position]") as HTMLInputElement;
    expect(await findByText(/position/i)).toBeInTheDocument();
    expect(positionField).toBeInTheDocument();
    expect(positionField.value).toBe("Hetman");

    const emailField = container.querySelector("input[id=email]") as HTMLInputElement;
    expect(await findByText(/Email/i)).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(emailField.value).toBe("pylyp.orlyk@zaporizhian.org");

    const phoneField = container.querySelector("input[id=phone]") as HTMLInputElement;
    expect(await findByText(/Phone/i)).toBeInTheDocument();
    expect(phoneField).toBeInTheDocument();
    expect(phoneField.value).toBe("+442035821980");
  });

  test("should show \"Create\" button", async () => {
    const { findByRole } = renderContactForm();
    expect(await findByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  test("should show \"Save\" button", async () => {
    const { findByRole } = renderContactForm({ isEditMode: true });
    expect(await findByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  test("render error", async () => {
    const { findByText } = renderContactForm({ error: "some error" });
    expect(await findByText(/some error/)).toBeInTheDocument();
  });
});
