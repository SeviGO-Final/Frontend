import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormReport from "../components/elements/forms/formReport";
import api from "../services/api";

jest.mock("../services/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  (api.get as jest.Mock).mockResolvedValue({ data: { data: [] } });
  (api.post as jest.Mock).mockResolvedValue({ data: { data: {} } });
});
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mocked-url");
  global.URL.revokeObjectURL = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("FormReport Component", () => {
  test("should render the form with all fields and buttons", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        data: [{ _id: "1", name: "Category 1", updatedAt: "2023-01-01" }],
      },
    });

    render(<FormReport />);

    // Verify form fields
    expect(
      await screen.findByPlaceholderText("Judul laporan anda..")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Isi laporan anda..")
    ).toBeInTheDocument();
    expect(screen.getByText("Upload Bukti")).toBeInTheDocument();
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
    expect(screen.getByText("CANCEL")).toBeInTheDocument();
  });

  test("should fetch and display categories", async () => {
    const mockCategories = [
      { _id: "1", name: "Category 1", updatedAt: "2023-01-01" },
      { _id: "2", name: "Category 2", updatedAt: "2023-01-02" },
    ];

    (api.get as jest.Mock).mockResolvedValue({
      data: { data: mockCategories },
    });

    render(<FormReport />);

    const categorySelect = await screen.findByRole("combobox");
    expect(categorySelect).toBeInTheDocument();

    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  test("should display error if category is not selected", async () => {
    render(<FormReport />);

    fireEvent.submit(screen.getByText("SUBMIT"));

    // Verify error message
    await waitFor(() => {
      expect(
        screen.getByText("Please, select the category")
      ).toBeInTheDocument();
    });
  });

  test("should call the API on form submit with valid data", async () => {
    const mockCategory = { _id: "1", name: "Category 1" };
    (api.get as jest.Mock).mockResolvedValue({
      data: { data: [mockCategory] },
    });
    render(<FormReport />);

    fireEvent.change(
      await screen.findByPlaceholderText("Judul laporan anda.."),
      { target: { value: "Test Title" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Isi laporan anda.."), {
      target: { value: "Test Content" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: mockCategory._id },
    });

    fireEvent.submit(screen.getByText("SUBMIT"));

    // Verify API call
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/complaints",
        expect.any(FormData)
      );
    });
  });

  test("should display preview image when file is uploaded", async () => {
    render(<FormReport />);

    // Mock file input
    const file = new File(["dummy content"], "evidence.png", {
      type: "image/png",
    });
    const fileInput = screen.getByLabelText(/upload bukti/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Wait for preview image to be displayed
    const previewImage = await screen.findByAltText("Preview Evidence");
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute("src", expect.any(String));
  });
});
